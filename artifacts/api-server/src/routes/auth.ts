import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  LoginBody,
  LoginResponse,
  VerifyOtpBody,
  VerifyOtpResponse,
  GetMeResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const DEMO_ACCOUNTS: Record<string, { otp: string; userId: number }> = {
  "9876543210": { otp: "123456", userId: 1 },
  "9876543211": { otp: "123456", userId: 2 },
  "9876543212": { otp: "123456", userId: 3 },
  "9876543213": { otp: "123456", userId: 4 },
  "9876543214": { otp: "123456", userId: 5 },
};

router.post("/auth/login", async (req, res): Promise<void> => {
  const body = LoginBody.parse(req.body);
  const demo = DEMO_ACCOUNTS[body.phone];
  if (!demo) {
    res.status(400).json({ error: "Phone number not found" });
    return;
  }
  res.json(LoginResponse.parse({ success: true, message: "OTP sent" }));
});

router.post("/auth/verify-otp", async (req, res): Promise<void> => {
  const body = VerifyOtpBody.parse(req.body);
  const demo = DEMO_ACCOUNTS[body.phone];
  if (!demo || demo.otp !== body.otp) {
    res.status(401).json({ error: "Invalid OTP" });
    return;
  }
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, demo.userId));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(
    VerifyOtpResponse.parse({
      token: `mock-token-${user.id}`,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl ?? null,
        district: user.district ?? null,
      },
    }),
  );
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = parseInt(authHeader.replace("Bearer mock-token-", ""));
  if (isNaN(userId)) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(
    GetMeResponse.parse({
      id: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl ?? null,
      district: user.district ?? null,
    }),
  );
});

export default router;
