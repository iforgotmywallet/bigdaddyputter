import { createCloudinaryUploadSignature } from "@/lib/images/cloudinary";
import { getAdminSession } from "@/lib/auth/session";
import { hasDatabase } from "@/db/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return Response.json({ error: "Admin authentication required." }, { status: 401 });
  }
  if (!hasDatabase()) {
    return Response.json({ error: "Database configuration required." }, { status: 503 });
  }
  const body = await request.json().catch(() => null) as { count?: unknown } | null;
  const count = body?.count;
  if (!Number.isInteger(count) || Number(count) < 1 || Number(count) > 12) {
    return Response.json({ error: "Upload count must be between 1 and 12." }, { status: 400 });
  }
  try {
    return Response.json({ uploads: Array.from({ length: Number(count) }, createCloudinaryUploadSignature) }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Cloudinary signing failed", error);
    return Response.json({ error: "Cloudinary is not configured." }, { status: 503 });
  }
}
