---
name: HXA content model
description: Durable product and architecture decisions for the HXA AI transformation website.
---

The first HXA CMS uses a single structured content document for public-facing copy and separate records for consultation requests.

**Why:** The marketing site has many related sections but the content is edited together; a document avoids creating a migration for every copy adjustment while consultation requests need independent history and status.

**How to apply:** Keep the public content contract typed through OpenAPI and generated hooks. Add separate tables only when a domain needs independent lifecycle, permissions, search, or reporting.