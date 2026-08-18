import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import {
  CreateContactRequestBody,
  CreateContactRequestResponse,
  GetAdminContentResponse,
  GetAdminOverviewResponse,
  GetSiteContentResponse,
  UpdateAdminContentBody,
  UpdateAdminContentResponse,
} from "@workspace/api-zod";
import {
  contactRequestsTable,
  db,
  siteContentTable,
} from "@workspace/db";
import {
  DEFAULT_HXA_CONTENT,
  contentFromRow,
  type HxaContent,
} from "../lib/hxa-content";
import {
  clearAdminSession,
  hasAdminSession,
  isAdminCredentials,
  requireAdmin,
  setAdminSession,
} from "../lib/admin-auth";

const router: IRouter = Router();

async function getOrCreateContent(): Promise<HxaContent> {
  const [row] = await db.select().from(siteContentTable).limit(1);
  if (row) return contentFromRow(row);

  const [created] = await db
    .insert(siteContentTable)
    .values({ content: DEFAULT_HXA_CONTENT })
    .returning();
  return contentFromRow(created);
}

router.get("/site-content", async (_req, res): Promise<void> => {
  const content = await getOrCreateContent();
  res.json(GetSiteContentResponse.parse(content));
});

router.post("/contact-requests", async (req, res): Promise<void> => {
  const parsed = CreateContactRequestBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact request");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [created] = await db
    .insert(contactRequestsTable)
    .values(parsed.data)
    .returning();
  res.status(201).json(
    CreateContactRequestResponse.parse({
      ...created,
      createdAt: created.createdAt.toISOString(),
    }),
  );
});

router.post("/admin/login", (req, res): void => {
  if (!isAdminCredentials(req.body?.id, req.body?.password)) {
    res.status(401).json({ error: "Invalid admin credentials" });
    return;
  }
  setAdminSession(res);
  res.json({ authenticated: true });
});

router.get("/admin/session", (req, res): void => {
  res.json({ authenticated: hasAdminSession(req) });
});

router.post("/admin/logout", (_req, res): void => {
  clearAdminSession(res);
  res.json({ authenticated: false });
});

router.use("/admin", requireAdmin);

router.get("/admin/overview", async (_req, res): Promise<void> => {
  const content = await getOrCreateContent();
  const latest = await db
    .select()
    .from(contactRequestsTable)
    .orderBy(desc(contactRequestsTable.createdAt))
    .limit(5);
  const [countRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactRequestsTable);

  res.json(
    GetAdminOverviewResponse.parse({
      contentSections: 10,
      serviceCount: content.services.length,
      caseStudyCount: content.caseStudies.length,
      inquiryCount: Number(countRow?.count ?? 0),
      latestInquiries: latest.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
      })),
    }),
  );
});

router.get("/admin/content", async (_req, res): Promise<void> => {
  const content = await getOrCreateContent();
  res.json(GetAdminContentResponse.parse(content));
});

router.put("/admin/content", async (req, res): Promise<void> => {
  const parsed = UpdateAdminContentBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid content update");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [current] = await db.select().from(siteContentTable).limit(1);
  let saved;
  if (current) {
    [saved] = await db
      .update(siteContentTable)
      .set({ content: parsed.data })
      .where(eq(siteContentTable.id, current.id))
      .returning();
  } else {
    [saved] = await db
      .insert(siteContentTable)
      .values({ content: parsed.data })
      .returning();
  }
  res.json(UpdateAdminContentResponse.parse(contentFromRow(saved)));
});

export default router;