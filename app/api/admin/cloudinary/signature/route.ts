import { createCloudinaryUploadSignature } from "@/lib/images/cloudinary";
import { getAdminSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  if (!(await getAdminSession())) {
    return Response.json({ error: "Admin authentication required." }, { status: 401 });
  }
  try {
    return Response.json(createCloudinaryUploadSignature(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Cloudinary signing failed", error);
    return Response.json({ error: "Cloudinary is not configured." }, { status: 503 });
  }
}
