"use client";

import Link from "next/link";
import { customerAuthClient } from "@/lib/customer-auth-client";
import type { Locale } from "@/lib/types";

export function AccountNavigation({ locale, profileLabel, signInLabel }: { locale: Locale; profileLabel: string; signInLabel: string }) {
  const { data: session, isPending } = customerAuthClient.useSession();
  return <Link className="account-link" href={`/${locale}/account`} aria-label={session ? profileLabel : signInLabel}>
    <span className="account-dot" aria-hidden="true" />
    {isPending ? "…" : session ? profileLabel : signInLabel}
  </Link>;
}
