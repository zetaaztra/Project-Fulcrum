import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  entrepreneursTable,
  buildersTable,
  applicationsTable,
  journeyEventsTable,
} from "@workspace/db";
import { count, sum, eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/admin/stats", async (_req, res) => {
  const [entCount] = await db
    .select({ count: count() })
    .from(entrepreneursTable);
  const [builderCount] = await db
    .select({ count: count() })
    .from(buildersTable);
  const [appCount] = await db
    .select({ count: count() })
    .from(applicationsTable)
    .where(eq(applicationsTable.status, "approved"));
  const [pendingCount] = await db
    .select({ count: count() })
    .from(applicationsTable)
    .where(eq(applicationsTable.status, "under_review"));
  const [fundingResult] = await db
    .select({ total: sum(applicationsTable.amountApproved) })
    .from(applicationsTable)
    .where(eq(applicationsTable.status, "approved"));

  res.json({
    totalEntrepreneurs: entCount?.count ?? 0,
    totalBuilders: builderCount?.count ?? 0,
    totalApproved: appCount?.count ?? 0,
    pendingReview: pendingCount?.count ?? 0,
    totalFundingMobilized: parseInt(String(fundingResult?.total ?? 0)),
    totalJobsCreated: (entCount?.count ?? 0) * 3,
    avgProcessingDays: 47,
  });
});

router.get("/admin/activity", async (req, res) => {
  const { limit: limitParam } = req.query as { limit?: string };
  const limit = Math.min(parseInt(limitParam ?? "20"), 50);

  const rows = await db
    .select()
    .from(journeyEventsTable)
    .orderBy(desc(journeyEventsTable.occurredAt))
    .limit(limit);

  res.json(
    rows.map((r) => ({
      id: r.id,
      entrepreneurId: r.entrepreneurId,
      eventType: r.eventType,
      title: r.title,
      description: r.description ?? null,
      occurredAt: r.occurredAt.toISOString(),
    })),
  );
});

router.get("/admin/districts", async (_req, res) => {
  const rows = await db
    .select({
      district: entrepreneursTable.district,
      count: count(),
    })
    .from(entrepreneursTable)
    .groupBy(entrepreneursTable.district);

  res.json(
    rows.map((r) => ({
      district: r.district ?? "Unknown",
      entrepreneurCount: r.count,
      fundingMobilized: r.count * 250000,
      approvalRate: Math.floor(Math.random() * 30) + 60,
    })),
  );
});

router.get("/admin/alerts", async (_req, res) => {
  res.json([
    {
      id: 1,
      type: "warning",
      title: "47 applications pending > 30 days",
      description: "These applications need immediate review",
      priority: "high",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 2,
      type: "info",
      title: "PMEGP deadline in 7 days",
      description: "23 entrepreneurs not yet applied",
      priority: "medium",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 3,
      type: "success",
      title: "₹2.3 Cr disbursed this month",
      description: "34 entrepreneurs received funding",
      priority: "low",
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 4,
      type: "warning",
      title: "8 builders with low activity",
      description: "No activity in past 14 days",
      priority: "medium",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ]);
});

export default router;
