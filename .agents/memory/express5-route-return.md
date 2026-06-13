---
name: Express 5 TS strict route returns
description: Express 5 async route handlers need explicit Promise<void> return type and bare return after early responses.
---

# Express 5 TS strict mode route handlers

TypeScript strict mode (TS7030) complains "not all code paths return a value" in Express 5 async handlers when early exits use `return res.json(...)` (which returns a Response, but the function type expects void).

**Why:** The response object's `.json()` returns `Response`, so early `return res.json(...)` makes TS think some paths return Response while others return undefined.

**Fix:**
```typescript
router.get("/path", async (req, res): Promise<void> => {
  if (!found) { res.status(404).json({ error: "Not found" }); return; }
  res.json(data);
});
```
- Add `: Promise<void>` to the handler signature
- Separate early-exit into two statements: the `res.json()` call, then a bare `return;`
