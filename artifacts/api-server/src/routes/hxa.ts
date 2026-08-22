import { Router, type IRouter } from "express";
import { Timestamp } from "firebase-admin/firestore";
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
  DEFAULT_HXA_CONTENT,
  contentFromData,
  type HxaContent,
} from "../lib/hxa-content";
import { firestore } from "../lib/firebase-admin";
import {
  clearAdminSession,
  hasAdminSession,
  requireAdmin,
  setAdminSession,
  verifyFirebaseAdminToken,
} from "../lib/admin-auth";

const router: IRouter = Router();

async function getOrCreateContent(): Promise<HxaContent> {
  const contentRef = firestore().collection("site_content").doc("main");
  const snapshot = await contentRef.get();
  if (snapshot.exists) return contentFromData(snapshot.data()?.content);

  await contentRef.set({
    content: DEFAULT_HXA_CONTENT,
    updatedAt: Timestamp.now(),
  });
  return contentFromData(DEFAULT_HXA_CONTENT);
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

  const createdAt = Timestamp.now();
  const id = Date.now();
  await firestore().collection("contact_requests").doc(String(id)).set({
    ...parsed.data,
    id,
    status: "new",
    createdAt,
  });
  res.status(201).json(
    CreateContactRequestResponse.parse({
      ...parsed.data,
      id,
      status: "new",
      createdAt: createdAt.toDate().toISOString(),
    }),
  );
});

router.post("/admin/login", async (req, res): Promise<void> => {
  try {
    const email = await verifyFirebaseAdminToken(req.body?.idToken);
    if (!email) {
      res.status(403).json({ error: "This Firebase account is not authorized for the admin panel." });
      return;
    }
    setAdminSession(res, email);
    res.json({ authenticated: true, email });
  } catch (error) {
    req.log.warn({ err: error }, "Firebase admin authentication failed");
    res.status(401).json({ error: "Unable to verify Firebase sign-in." });
    return;
  }
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
  const contacts = firestore().collection("contact_requests");
  const [latestSnapshot, totalSnapshot] = await Promise.all([
    contacts.orderBy("createdAt", "desc").limit(5).get(),
    contacts.count().get(),
  ]);

  res.json(
    GetAdminOverviewResponse.parse({
      contentSections: 10,
      serviceCount: content.services.length,
      caseStudyCount: content.caseStudies.length,
       inquiryCount: totalSnapshot.data().count,
       latestInquiries: latestSnapshot.docs.map((doc) => {
         const data = doc.data();
         return {
           id: Number(data.id ?? doc.id),
           name: String(data.name ?? ""),
           email: String(data.email ?? ""),
           company: String(data.company ?? ""),
           service: String(data.service ?? ""),
           message: String(data.message ?? ""),
           status: String(data.status ?? "new"),
           createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
         };
       }),
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

  await firestore().collection("site_content").doc("main").set({
    content: parsed.data,
    updatedAt: Timestamp.now(),
  }, { merge: true });
  res.json(UpdateAdminContentResponse.parse(contentFromData(parsed.data)));
});

export default router;