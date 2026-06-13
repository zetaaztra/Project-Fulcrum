---
name: Orval param collision
description: Endpoints with both path params AND query params cause TS2308 Params type collisions in Orval barrel exports.
---

# Orval query+path param collision

When an OpenAPI endpoint has BOTH a path parameter AND a query parameter, Orval generates a `{OperationId}Params` type in two places: `generated/api.ts` and `generated/types/`. The barrel `export *` in `api-zod/src/index.ts` then hits TS2308 (duplicate export).

**Why:** Orval's zod generator creates a separate Params schema for path params, and another for query params, both named `{OperationId}Params`. The types barrel re-exports both.

**How to apply:** If you get TS2308 on a `*Params` type during codegen, find the endpoint in `openapi.yaml` and remove any optional query params from it (or rename the operationId). Prefer path params only for detail endpoints; put filters on list endpoints which have no path params.
