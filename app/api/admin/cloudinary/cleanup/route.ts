import { getAdminSession } from "@/lib/auth/session";
import { deleteUnreferencedCloudinaryImages } from "@/lib/images/cloudinary-cleanup";
import { cloudinaryCleanupSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function DELETE(request: Request) {
  if (!(await getAdminSession())) {
    return Response.json({ error: "Admin authentication required." }, { status: 401 });
  }
  const result = cloudinaryCleanupSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return Response.json({ error: "Invalid Cloudinary cleanup request." }, { status: 400 });
  }
  try {
    const cleanup = await deleteUnreferencedCloudinaryImages(result.data.storageKeys);
    return Response.json(cleanup, {
      status: cleanup.failed.length ? 502 : 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Cloudinary cleanup failed", error);
    return Response.json({ error: "Cloudinary cleanup is unavailable." }, { status: 503 });
  }
}
