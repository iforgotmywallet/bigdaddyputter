import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_HOURS = 12;
function key(secret: string) { if (secret.length < 32) throw new Error("Session secret must contain at least 32 characters"); return new TextEncoder().encode(secret); }
export function createSessionToken(secret: string) { return new SignJWT({ role: "owner" }).setProtectedHeader({ alg: "HS256" }).setSubject("collection-owner").setIssuedAt().setExpirationTime(`${ADMIN_SESSION_HOURS}h`).sign(key(secret)); }
export async function verifySessionToken(token: string, secret: string) { try { const result = await jwtVerify(token, key(secret), { algorithms: ["HS256"], subject: "collection-owner" }); return result.payload.role === "owner"; } catch { return false; } }
