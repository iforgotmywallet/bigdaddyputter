import { toNextJsHandler } from "better-auth/next-js";
import { customerAuth } from "@/lib/customer-auth";
import { isCustomerAuthConfigured } from "@/lib/customer-session";
import { isCustomerCredentialRoute } from "@/lib/auth/admin-access";
import { getAdminSession } from "@/lib/auth/session";

const handler = toNextJsHandler(customerAuth);

function unavailable() {
  return Response.json(
    { message: "Customer accounts are not configured." },
    { status: 503 },
  );
}

export function GET(request: Request) {
  return isCustomerAuthConfigured() ? handler.GET(request) : unavailable();
}

export async function POST(request: Request) {
  if (!isCustomerAuthConfigured()) return unavailable();

  if (isCustomerCredentialRoute(new URL(request.url).pathname) && await getAdminSession()) {
    return Response.json(
      {
        code: "ADMIN_SESSION_ACTIVE",
        message: "End the administrator session before signing in or creating a customer account.",
      },
      { status: 403, headers: { "Cache-Control": "private, no-store, max-age=0" } },
    );
  }

  return handler.POST(request);
}
