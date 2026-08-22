---
name: HXA content model
description: Durable product and architecture decisions for the HXA AI transformation website.
---

The HXA CMS uses a single Firestore `site_content/main` document for public-facing copy and separate `contact_requests` documents for consultation requests.

**Why:** The marketing site has many related sections but the content is edited together; a document avoids creating a migration for every copy adjustment while consultation requests need independent history and status.

**How to apply:** Keep the public content contract typed through OpenAPI and generated hooks. Use Firestore timestamps and stable numeric response IDs for consultation records; do not reintroduce PostgreSQL dependencies for this product.