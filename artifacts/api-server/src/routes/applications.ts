import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { applicationsTable, schemesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/applications", async (req, res) => {
  const { entrepreneurId, status } = req.query as Record<
    string,
    string | undefined
  >;

  const rows = await db
    .select({
      id: applicationsTable.id,
      entrepreneurId: applicationsTable.entrepreneurId,
      schemeId: applicationsTable.schemeId,
      status: applicationsTable.status,
      amountRequested: applicationsTable.amountRequested,
      amountApproved: applicationsTable.amountApproved,
      subsidyAmount: applicationsTable.subsidyAmount,
      bankName: applicationsTable.bankName,
      branchName: applicationsTable.branchName,
      submittedAt: applicationsTable.submittedAt,
      approvedAt: applicationsTable.approvedAt,
      expectedDate: applicationsTable.expectedDate,
      notes: applicationsTable.notes,
      createdAt: applicationsTable.createdAt,
      schemeName: schemesTable.name,
      schemeMinistry: schemesTable.ministry,
    })
    .from(applicationsTable)
    .innerJoin(schemesTable, eq(applicationsTable.schemeId, schemesTable.id));

  let result = rows;
  if (entrepreneurId)
    result = result.filter(
      (r) => r.entrepreneurId === parseInt(entrepreneurId),
    );
  if (status) result = result.filter((r) => r.status === status);

  res.json(
    result.map((r) => ({
      ...r,
      submittedAt: r.submittedAt?.toISOString() ?? null,
      approvedAt: r.approvedAt?.toISOString() ?? null,
      expectedDate: r.expectedDate?.toISOString() ?? null,
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

router.get("/applications/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const [row] = await db
    .select({
      id: applicationsTable.id,
      entrepreneurId: applicationsTable.entrepreneurId,
      schemeId: applicationsTable.schemeId,
      status: applicationsTable.status,
      amountRequested: applicationsTable.amountRequested,
      amountApproved: applicationsTable.amountApproved,
      subsidyAmount: applicationsTable.subsidyAmount,
      bankName: applicationsTable.bankName,
      branchName: applicationsTable.branchName,
      submittedAt: applicationsTable.submittedAt,
      approvedAt: applicationsTable.approvedAt,
      expectedDate: applicationsTable.expectedDate,
      notes: applicationsTable.notes,
      createdAt: applicationsTable.createdAt,
      schemeName: schemesTable.name,
      schemeMinistry: schemesTable.ministry,
    })
    .from(applicationsTable)
    .innerJoin(schemesTable, eq(applicationsTable.schemeId, schemesTable.id))
    .where(eq(applicationsTable.id, id));

  if (!row) { res.status(404).json({ error: "Not found" }); return; }

  res.json({
    ...row,
    submittedAt: row.submittedAt?.toISOString() ?? null,
    approvedAt: row.approvedAt?.toISOString() ?? null,
    expectedDate: row.expectedDate?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
  });
});

export default router;
