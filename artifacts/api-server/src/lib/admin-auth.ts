import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { firebaseAuth } from "./firebase-admin";

const COOKIE_NAME = "addmatix_admin";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const SESSION_SECRET = process.env.SESSION_SECRET ?? "addmatix-development-session-secret";

function signature(payload: string) {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

function readCookie(request: Request) {
  const header = request.headers.cookie ?? "";
  const entry = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  return entry ? decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)) : null;
}

function validSession(request: Request) {
  const token = readCookie(request);
  if (!token) return false;
  const [payload, providedSignature] = token.split(".");
  if (!payload || !providedSignature) return false;
  const expectedSignature = signature(payload);
  const provided = Buffer.from(providedSignature);
  const expected = Buffer.from(expectedSignature);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return false;
  const [, expiresAt] = payload.split(":");
  return Number(expiresAt) > Date.now();
}

export async function verifyFirebaseAdminToken(idToken: unknown) {
  if (typeof idToken !== "string" || !idToken) return null;

  const decodedToken = await firebaseAuth().verifyIdToken(idToken);
  const email = decodedToken.email?.trim().toLowerCase();
  return email ?? null;
}

export function setAdminSession(response: Response, email: string) {
  const payload = `${email}:${Date.now() + SESSION_TTL_MS}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${COOKIE_NAME}=${encodeURIComponent(`${payload}.${signature(payload)}`)}; HttpOnly; Path=/api; SameSite=Lax${secure}; Max-Age=${SESSION_TTL_MS / 1000}`);
}

export function clearAdminSession(response: Response) {
  response.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; Path=/api; SameSite=Lax; Max-Age=0`);
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (validSession(request)) {
    next();
    return;
  }
  response.status(401).json({ error: "Admin authentication required" });
}

export function hasAdminSession(request: Request) {
  return validSession(request);
}