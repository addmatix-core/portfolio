---
name: Imported artifact workflows
description: Imported projects may include artifact service metadata without a registered Replit preview workflow.
---

Imported repositories can contain valid `.replit-artifact/artifact.toml` service definitions while still having no configured workflow or registered preview artifact in the current Replit environment.

**Why:** Firebase Auth changes can build and API-smoke-test successfully, but UI verification and managed restarts remain unavailable until the artifact is registered and its workflow exists.

**How to apply:** Check configured workflows and artifact registration before promising screenshot verification; propose runtime setup separately when it is outside the user’s requested feature.