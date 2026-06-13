import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { schemesTable, entrepreneursTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/schemes", async (req, res) => {
  const { sector, community, type, search } = req.query as Record<
    string,
    string | undefined
  >;

  const rows = await db
    .select()
    .from(schemesTable)
    .where(eq(schemesTable.isActive, true));

  let result = rows;
  if (sector) result = result.filter((r) => r.sector === sector);
  if (community) result = result.filter((r) => r.community === community);
  if (type) result = result.filter((r) => r.schemeType === (type as any));
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.ministry.toLowerCase().includes(s),
    );
  }

  res.json(result);
});

router.get("/schemes/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const [row] = await db
    .select()
    .from(schemesTable)
    .where(eq(schemesTable.id, id));

  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.get("/schemes/matches/:entrepreneurId", async (req, res): Promise<void> => {
  const entrepreneurId = parseInt(req.params.entrepreneurId);
  const [entrepreneur] = await db
    .select()
    .from(entrepreneursTable)
    .where(eq(entrepreneursTable.id, entrepreneurId));

  if (!entrepreneur) { res.status(404).json({ error: "Not found" }); return; }

  const schemes = await db
    .select()
    .from(schemesTable)
    .where(eq(schemesTable.isActive, true));

  const matches = schemes.map((scheme) => {
    let score = 60;
    if (
      scheme.community &&
      scheme.community.toLowerCase() ===
        entrepreneur.community?.toLowerCase()
    )
      score += 20;
    if (
      scheme.sector &&
      scheme.sector.toLowerCase() === entrepreneur.sector?.toLowerCase()
    )
      score += 15;
    const loanAmt = entrepreneur.loanAmount ?? 500000;
    if (
      scheme.minFunding <= loanAmt &&
      scheme.maxFunding >= loanAmt
    )
      score += 10;
    score = Math.min(score, 98);

    const reasons: string[] = [];
    if (scheme.community === entrepreneur.community)
      reasons.push(`${scheme.community} community scheme`);
    if (scheme.sector === entrepreneur.sector)
      reasons.push(`Matches ${scheme.sector} sector`);
    reasons.push("Eligible based on profile");

    return {
      id: scheme.id,
      name: scheme.name,
      ministry: scheme.ministry,
      schemeType: scheme.schemeType,
      sector: scheme.sector ?? null,
      community: scheme.community ?? null,
      minFunding: scheme.minFunding,
      maxFunding: scheme.maxFunding,
      subsidyPercent: scheme.subsidyPercent ?? 0,
      interestRate: scheme.interestRate ?? 7.5,
      description: scheme.description ?? null,
      matchScore: score,
      matchReasons: reasons,
      localApplicants: Math.floor(Math.random() * 200) + 50,
      localApproved: Math.floor(Math.random() * 100) + 20,
    };
  });

  matches.sort((a, b) => b.matchScore - a.matchScore);
  res.json(matches.slice(0, 10));
});

export default router;
