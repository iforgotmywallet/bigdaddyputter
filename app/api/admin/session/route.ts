import { getAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();

  return Response.json(
    { active: Boolean(session) },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
