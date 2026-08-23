import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_HOURS, createSessionToken, verifySessionToken } from "@/lib/auth/token";

const COOKIE_NAME = "putter_admin_session";
function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters");
  return secret;
}

export async function createAdminSession() {
  const token = await createSessionToken(sessionSecret());
  (await cookies()).set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: ADMIN_SESSION_HOURS * 60 * 60 });
}

export async function clearAdminSession() { (await cookies()).delete(COOKIE_NAME); }

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try { return await verifySessionToken(token, sessionSecret()) ? { role: "owner" } : null; } catch { return null; }
}

export async function requireAdmin() { const session = await getAdminSession(); if (!session) redirect("/admin/login"); return session; }
