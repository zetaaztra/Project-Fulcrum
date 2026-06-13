import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { journeysTable, journeyEventsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/journey/:entrepreneurId", async (req, res): Promise<void> => {
  const entrepreneurId = parseInt(req.params.entrepreneurId);
  const [row] = await db
    .select()
    .from(journeysTable)
    .where(eq(journeysTable.entrepreneurId, entrepreneurId));

  if (!row) { res.status(404).json({ error: "Not found" }); return; }

  res.json({
    id: row.id,
    entrepreneurId: row.entrepreneurId,
    currentStage: row.currentStage,
    currentApplicationId: row.currentApplicationId ?? null,
    narrativeText: row.narrativeText ?? null,
    progressPercent: row.progressPercent ?? 0,
    daysInStage: row.daysInStage ?? 0,
    totalDaysInJourney: row.totalDaysInJourney ?? 0,
    updatedAt: row.updatedAt.toISOString(),
  });
});

router.get("/journey/:entrepreneurId/events", async (req, res) => {
  const entrepreneurId = parseInt(req.params.entrepreneurId);
  const rows = await db
    .select()
    .from(journeyEventsTable)
    .where(eq(journeyEventsTable.entrepreneurId, entrepreneurId))
    .orderBy(desc(journeyEventsTable.occurredAt))
    .limit(20);

  res.json(
    rows.map((r) => ({
      id: r.id,
      entrepreneurId: r.entrepreneurId,
      eventType: r.eventType,
      title: r.title,
      description: r.description ?? null,
      metadata: r.metadata ?? null,
      occurredAt: r.occurredAt.toISOString(),
    })),
  );
});

export default router;
