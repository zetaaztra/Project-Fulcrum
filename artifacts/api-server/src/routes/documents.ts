import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { documentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateDocumentStatusBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/documents/:entrepreneurId", async (req, res) => {
  const entrepreneurId = parseInt(req.params.entrepreneurId);
  const rows = await db
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.entrepreneurId, entrepreneurId));

  res.json(
    rows.map((r) => ({
      id: r.id,
      entrepreneurId: r.entrepreneurId,
      name: r.name,
      docType: r.docType,
      status: r.status,
      fileUrl: r.fileUrl ?? null,
      builderNote: r.builderNote ?? null,
      isRequired: r.isRequired,
      updatedAt: r.updatedAt.toISOString(),
    })),
  );
});

router.patch("/documents/:id/status", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const body = UpdateDocumentStatusBody.parse(req.body);

  const [updated] = await db
    .update(documentsTable)
    .set({ status: body.status as any, builderNote: body.builderNote ?? null })
    .where(eq(documentsTable.id, id))
    .returning();

  if (!updated) { res.status(404).json({ error: "Not found" }); return; }

  res.json({
    id: updated.id,
    entrepreneurId: updated.entrepreneurId,
    name: updated.name,
    docType: updated.docType,
    status: updated.status,
    fileUrl: updated.fileUrl ?? null,
    builderNote: updated.builderNote ?? null,
    isRequired: updated.isRequired,
    updatedAt: updated.updatedAt.toISOString(),
  });
});

export default router;
