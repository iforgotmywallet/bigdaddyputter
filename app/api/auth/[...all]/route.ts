import { toNextJsHandler } from "better-auth/next-js";
import { customerAuth } from "@/lib/customer-auth";
import { isCustomerAuthConfigured } from "@/lib/customer-session";

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

export function POST(request: Request) {
  return isCustomerAuthConfigured() ? handler.POST(request) : unavailable();
}
