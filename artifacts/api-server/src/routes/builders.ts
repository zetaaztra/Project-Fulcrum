import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { buildersTable, usersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/builders", async (req, res) => {
  const { expertise, district, available } = req.query as Record<
    string,
    string | undefined
  >;

  const rows = await db
    .select({
      id: buildersTable.id,
      userId: buildersTable.userId,
      organization: buildersTable.organization,
      district: buildersTable.district,
      expertise: buildersTable.expertise,
      languages: buildersTable.languages,
      bio: buildersTable.bio,
      rating: buildersTable.rating,
      businessesHelped: buildersTable.businessesHelped,
      successRate: buildersTable.successRate,
      totalFundingMobilized: buildersTable.totalFundingMobilized,
      isAvailable: buildersTable.isAvailable,
      isVerified: buildersTable.isVerified,
      name: usersTable.name,
      phone: usersTable.phone,
      avatarUrl: usersTable.avatarUrl,
    })
    .from(buildersTable)
    .innerJoin(usersTable, eq(buildersTable.userId, usersTable.id));

  let result = rows;
  if (expertise) {
    result = result.filter((r) => r.expertise?.includes(expertise) ?? false);
  }
  if (district) result = result.filter((r) => r.district === district);
  if (available === "true") result = result.filter((r) => r.isAvailable);

  res.json(result);
});

router.get("/builders/top", async (req, res) => {
  const rows = await db
    .select({
      id: buildersTable.id,
      userId: buildersTable.userId,
      organization: buildersTable.organization,
      district: buildersTable.district,
      expertise: buildersTable.expertise,
      languages: buildersTable.languages,
      rating: buildersTable.rating,
      businessesHelped: buildersTable.businessesHelped,
      successRate: buildersTable.successRate,
      totalFundingMobilized: buildersTable.totalFundingMobilized,
      isAvailable: buildersTable.isAvailable,
      isVerified: buildersTable.isVerified,
      name: usersTable.name,
      avatarUrl: usersTable.avatarUrl,
    })
    .from(buildersTable)
    .innerJoin(usersTable, eq(buildersTable.userId, usersTable.id))
    .orderBy(desc(buildersTable.businessesHelped))
    .limit(10);

  res.json(rows);
});

router.get("/builders/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const [row] = await db
    .select({
      id: buildersTable.id,
      userId: buildersTable.userId,
      organization: buildersTable.organization,
      district: buildersTable.district,
      state: buildersTable.state,
      expertise: buildersTable.expertise,
      languages: buildersTable.languages,
      bio: buildersTable.bio,
      rating: buildersTable.rating,
      businessesHelped: buildersTable.businessesHelped,
      successRate: buildersTable.successRate,
      totalFundingMobilized: buildersTable.totalFundingMobilized,
      isAvailable: buildersTable.isAvailable,
      isVerified: buildersTable.isVerified,
      name: usersTable.name,
      phone: usersTable.phone,
      avatarUrl: usersTable.avatarUrl,
    })
    .from(buildersTable)
    .innerJoin(usersTable, eq(buildersTable.userId, usersTable.id))
    .where(eq(buildersTable.id, id));

  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

export default router;
