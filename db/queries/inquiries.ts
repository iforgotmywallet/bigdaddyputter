import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { inquiries } from "@/db/schema";
import type { InquiryInput } from "@/lib/validation/inquiry";

export async function storeInquiry(input: InquiryInput) {
  const db = getDb();
  const [created] = await db.insert(inquiries).values({
    putterId: input.putterId || null,
    locale: input.locale,
    name: input.name,
    contactMethod: input.contactMethod,
    contactValue: input.contactValue,
    countryRegion: input.countryRegion || null,
    message: input.message,
    sourceUrl: input.sourceUrl || null,
  }).returning({ id: inquiries.id });
  return created;
}

export async function listInquiries() {
  return getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(250);
}

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "closed", internalNote: string) {
  await getDb().update(inquiries).set({ status, internalNote: internalNote.trim() || null, updatedAt: new Date() }).where(eq(inquiries.id, id));
}

export async function countNewInquiries() {
  const [row] = await getDb().select({ count: sql<number>`count(*)::int` }).from(inquiries).where(eq(inquiries.status, "new"));
  return row?.count ?? 0;
}
