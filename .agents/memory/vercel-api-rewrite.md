---
name: Vercel API rewrite boundary
description: SPA rewrites must exclude API paths when a static Vercel frontend calls a separate backend.
---

Static Vercel SPA rewrites that catch `/api/*` can return `index.html` with a successful status instead of an API error. A generic fetch helper may then treat the HTML string as valid data and crash during rendering.

**Why:** The AddMatix production blank page came from the Vercel catch-all rewrite serving HTML for `/api/site-content`.

**How to apply:** Exclude `/api/` from the SPA rewrite and validate external API payloads before rendering. Deploy the backend separately and configure the frontend with its public API origin for live content and mutations.