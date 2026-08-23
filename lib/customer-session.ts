import "server-only";

import { headers } from "next/headers";
import { customerAuth } from "@/lib/customer-auth";
import { hasDatabase } from "@/db/client";

export function isCustomerAuthConfigured() {
  return hasDatabase() && Boolean(process.env.BETTER_AUTH_SECRET);
}

export async function getCustomerSession() {
  if (!isCustomerAuthConfigured()) return null;
  try {
    return await customerAuth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("Unable to read customer session", error);
    return null;
  }
}
