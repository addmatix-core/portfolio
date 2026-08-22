---
name: Vercel serverless monorepo adapter
description: How this workspace exposes the shared Express API from the Vercel-hosted frontend.
---

The Vercel frontend serves the shared Express application through a catch-all function under `/api/*`; the function imports the API app without starting a listener.

**Why:** The frontend and API share same-origin requests, Firebase session cookies, PostgreSQL access, and route validation. Keeping one Express app avoids maintaining separate serverless route implementations.

**How to apply:** Keep the API function as a thin adapter and ensure the frontend Vercel project installs the API workspace package so Vercel can bundle its transitive runtime dependencies.