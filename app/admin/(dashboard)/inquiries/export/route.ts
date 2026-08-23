import { requireAdmin } from "@/lib/auth/session";
import { hasDatabase } from "@/db/client";
import { listInquiries } from "@/db/queries/inquiries";

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
export async function GET() { await requireAdmin(); const rows = hasDatabase() ? await listInquiries() : []; const header = ["id", "created_at", "status", "name", "contact_method", "contact_value", "country_region", "message", "putter_id", "internal_note"]; const body = rows.map((row) => [row.id, row.createdAt.toISOString(), row.status, row.name, row.contactMethod, row.contactValue, row.countryRegion, row.message, row.putterId, row.internalNote].map(csvCell).join(",")); return new Response([header.join(","), ...body].join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="inquiries-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "private, no-store" } }); }
