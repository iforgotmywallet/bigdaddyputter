import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

let client: ReturnType<typeof drizzle<typeof schema>> | undefined;
const placeholderDatabaseUrl = "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!client) {
    // Auth configuration is evaluated during Next.js builds. The Neon client is
    // lazy, so a placeholder keeps schema generation/builds offline while all
    // request-time database operations remain guarded by hasDatabase().
    const sql = neon(process.env.DATABASE_URL || placeholderDatabaseUrl);
    client = drizzle(sql, { schema });
  }
  return client;
}
