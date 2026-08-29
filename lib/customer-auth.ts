import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "@/db/client";
import * as schema from "@/db/schema";
import { BRAND_NAME } from "@/lib/constants";

export const customerAuth = betterAuth({
  appName: BRAND_NAME,
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "development-only-customer-auth-secret-change-me",
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
  },
  user: {
    modelName: "customerUser",
  },
  session: {
    modelName: "customerSession",
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  account: {
    modelName: "customerAccount",
  },
  verification: {
    modelName: "customerVerification",
  },
  plugins: [nextCookies()],
});

// The Better Auth CLI discovers an export named `auth` when generating schema.
export const auth = customerAuth;
