import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { entrepreneursTable, usersTable } from "@workspace/db";
import { eq, ilike, or } from "drizzle-orm";

const router: IRouter = Router();

router.get("/entrepreneurs", async (req, res) => {
  const { search, stage, district, community } = req.query as Record<
    string,
    string | undefined
  >;

  let query = db
    .select({
      id: entrepreneursTable.id,
      userId: entrepreneursTable.userId,
      businessName: entrepreneursTable.businessName,
      sector: entrepreneursTable.sector,
      district: entrepreneursTable.district,
      currentStage: entrepreneursTable.currentStage,
      monthlyRevenue: entrepreneursTable.monthlyRevenue,
      employeeCount: entrepreneursTable.employeeCount,
      community: entrepreneursTable.community,
      name: usersTable.name,
      phone: usersTable.phone,
      avatarUrl: usersTable.avatarUrl,
      createdAt: entrepreneursTable.createdAt,
    })
    .from(entrepreneursTable)
    .innerJoin(usersTable, eq(entrepreneursTable.userId, usersTable.id))
    .$dynamic();

  const rows = await query;

  let result = rows;
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        (r.businessName?.toLowerCase().includes(s) ?? false),
    );
  }
  if (stage) result = result.filter((r) => r.currentStage === stage);
  if (district) result = result.filter((r) => r.district === district);
  if (community) result = result.filter((r) => r.community === community);

  res.json(result);
});

router.get("/entrepreneurs/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const [row] = await db
    .select({
      id: entrepreneursTable.id,
      userId: entrepreneursTable.userId,
      businessName: entrepreneursTable.businessName,
      sector: entrepreneursTable.sector,
      district: entrepreneursTable.district,
      state: entrepreneursTable.state,
      currentStage: entrepreneursTable.currentStage,
      assignedBuilderId: entrepreneursTable.assignedBuilderId,
      monthlyRevenue: entrepreneursTable.monthlyRevenue,
      employeeCount: entrepreneursTable.employeeCount,
      loanAmount: entrepreneursTable.loanAmount,
      businessAge: entrepreneursTable.businessAge,
      community: entrepreneursTable.community,
      bio: entrepreneursTable.bio,
      name: usersTable.name,
      phone: usersTable.phone,
      avatarUrl: usersTable.avatarUrl,
      createdAt: entrepreneursTable.createdAt,
    })
    .from(entrepreneursTable)
    .innerJoin(usersTable, eq(entrepreneursTable.userId, usersTable.id))
    .where(eq(entrepreneursTable.id, id));

  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

export default router;
