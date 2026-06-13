# Fulcrum-India

India's Community Intelligence Platform — guides entrepreneurs from idea to funded business through scheme matching, builder connections, document management, and application tracking.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/fulcrum-india run dev` — run the frontend (port 18581)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, wouter, Framer Motion, shadcn/ui, Tailwind, Recharts
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/index.ts` — DB schema (Drizzle ORM)
- `artifacts/api-server/src/routes/` — Express route handlers (one file per domain)
- `artifacts/api-server/src/seed.ts` — seed data (runs once on server start)
- `artifacts/fulcrum-india/src/` — React frontend
  - `pages/` — one file per page (Landing, Login, Journey, Schemes, Documents, Applications, Builders, Messages, Admin, Knowledge, Impact, Settings)
  - `components/layout/` — AppShell, Sidebar, DemoSwitcher
  - `context/AuthContext.tsx` — mock auth (localStorage-based)
  - `index.css` — CSS vars + dark theme

## Architecture decisions

- **Mock auth only** — no real OTP or auth service. Phone+OTP pairs are hardcoded. Session stored in localStorage. `AuthContext` holds session and exposes `login`, `logout`, `switchRole`.
- **Demo accounts**: 9876543210/123456 (Entrepreneur), 9876543211/123456 (Builder), 9876543212/123456 (Coordinator), 9876543213/123456 (Admin), 9876543214/123456 (Super Admin)
- **DB seeded on startup** — `seed.ts` checks if any users exist; if not, inserts all demo data. Safe to run on every restart.
- **Contract-first API** — OpenAPI spec drives Zod validators and React Query hooks via Orval codegen. Always run `codegen` after changing `openapi.yaml`.
- **Codegen collision prevention** — endpoints with BOTH path params AND query params cause `Params` type collisions between Orval's generated `api.ts` and `types/`. Fix: remove optional query params from those endpoints.

## Product

- **Landing page** — marketing page with animated hero, stats, scheme showcase, builder/community sections
- **Login** — 2-step phone + OTP with demo credentials hint
- **Journey** — personalized narrative tracker showing current stage, assigned builder, milestones, recent events
- **Schemes** — AI-matched government funding schemes with match scores, filter/search
- **Documents** — checklist with status badges, builder notes, upload flow
- **Applications** — status tracker with stepper, activity timeline
- **Builders** — directory with ratings, expertise tags, availability, messaging
- **Messages** — two-panel chat with builder
- **Admin** — command center with metrics, district map, live activity feed, alerts
- **Role switcher** — floating pill (bottom-right when logged in) for instant role switching

## User preferences

- Brand is always "Fulcrum-India" (hyphenated, with "India" in primary color as a styled span)
- Dark mode only, no light mode toggle
- Colors: bg #0B0F19, primary #6366F1 (indigo), accent #F59E0B (amber)
- No emojis in UI labels; use Lucide React icons

## Gotchas

- After any `openapi.yaml` change, always run `pnpm --filter @workspace/api-spec run codegen` then `pnpm run typecheck:libs`
- Express 5 route handlers need explicit `: Promise<void>` return type annotation to satisfy TS strict mode — use `{ res.status(404).json({}); return; }` instead of `return res.status(404).json({})`
- The `@workspace/db` lib is composite — after schema changes, run `pnpm run typecheck:libs` before checking server types
- Do NOT add leaf artifacts to root `tsconfig.json` references

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
