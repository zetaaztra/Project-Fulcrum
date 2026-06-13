import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  messagesTable,
  conversationsTable,
  usersTable,
  buildersTable,
} from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { SendMessageBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/messages/conversations", async (req, res) => {
  const rows = await db
    .select({
      id: conversationsTable.id,
      entrepreneurId: conversationsTable.entrepreneurId,
      builderId: conversationsTable.builderId,
      lastMessage: conversationsTable.lastMessage,
      lastMessageAt: conversationsTable.lastMessageAt,
      unreadCount: conversationsTable.unreadCount,
      builderName: usersTable.name,
      builderAvatarUrl: usersTable.avatarUrl,
    })
    .from(conversationsTable)
    .innerJoin(buildersTable, eq(conversationsTable.builderId, buildersTable.id))
    .innerJoin(usersTable, eq(buildersTable.userId, usersTable.id))
    .orderBy(desc(conversationsTable.lastMessageAt));

  res.json(
    rows.map((r) => ({
      ...r,
      lastMessageAt: r.lastMessageAt?.toISOString() ?? null,
    })),
  );
});

router.get("/messages/:conversationId", async (req, res) => {
  const conversationId = parseInt(req.params.conversationId);
  const rows = await db
    .select()
    .from(messagesTable)
    .where(eq(messagesTable.conversationId, conversationId))
    .orderBy(messagesTable.sentAt);

  res.json(
    rows.map((r) => ({
      id: r.id,
      conversationId: r.conversationId,
      senderId: r.senderId,
      content: r.content,
      isRead: r.isRead,
      sentAt: r.sentAt.toISOString(),
    })),
  );
});

router.post("/messages/:conversationId", async (req, res) => {
  const conversationId = parseInt(req.params.conversationId);
  const body = SendMessageBody.parse(req.body);

  const [message] = await db
    .insert(messagesTable)
    .values({
      conversationId,
      senderId: (req.body as { senderId?: number }).senderId ?? 1,
      content: body.content,
    })
    .returning();

  await db
    .update(conversationsTable)
    .set({
      lastMessage: body.content,
      lastMessageAt: new Date(),
    })
    .where(eq(conversationsTable.id, conversationId));

  res.json({
    id: message.id,
    conversationId: message.conversationId,
    senderId: message.senderId,
    content: message.content,
    isRead: message.isRead,
    sentAt: message.sentAt.toISOString(),
  });
});

export default router;
