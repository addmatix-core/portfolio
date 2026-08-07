# HXA AI Transformation

HXA is a premium AI transformation company website with an editable CMS foundation for enterprise services, case studies, insights, FAQs, and consultation requests.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/hxa-ai` — public HXA website and admin content studio
- `artifacts/api-server/src/routes/hxa.ts` — content, CMS, and consultation API routes
- `artifacts/api-server/src/lib/hxa-content.ts` — seeded HXA content and content shape
- `lib/db/src/schema/hxa.ts` — PostgreSQL tables for site content and contact requests
- `lib/api-spec/openapi.yaml` — source of truth for the HXA API contract
- `artifacts/hxa-ai/src/index.css` — HXA visual system and motion utilities

## Architecture decisions

- Public content is stored as one JSON document so the first CMS can edit structured sections without a migration for every copy change.
- Consultation requests are stored separately as durable records and surfaced in the admin overview.
- The frontend uses generated API hooks and query keys for all content reads and mutations.
- The HXA visual system uses a midnight foundation, luminous blue accent, restrained glass surfaces, and typography-led hierarchy.

## Product

- Public marketing site for HXA's AI transformation, software engineering, and digital growth capabilities.
- Admin overview for content health and incoming consultation requests.
- Admin content studio for publishing hero copy, capabilities, case studies, FAQs, and insights.
- Consultation form backed by the API and PostgreSQL.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run API codegen after changing `lib/api-spec/openapi.yaml`.
- Use the managed artifact workflows rather than starting Vite or the API server manually.
- The frontend expects the artifact-provided `BASE_PATH` and `PORT` environment variables.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
