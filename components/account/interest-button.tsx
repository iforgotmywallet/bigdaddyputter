"use client";

import Link from "next/link";
import { useActionState } from "react";
import { toggleCustomerInterestAction, type InterestActionState } from "@/app/[locale]/account/actions";
import type { Locale } from "@/lib/types";

export function InterestButton({ putterId, slug, locale, signedIn, initialInterested, labels }: { putterId: string; slug: string; locale: Locale; signedIn: boolean; initialInterested: boolean; labels: { add: string; remove: string; signIn: string } }) {
  const initial: InterestActionState = { status: "idle", message: "", interested: initialInterested };
  const [state, action, pending] = useActionState(toggleCustomerInterestAction, initial);
  if (!signedIn) return <Link className="button interest-button" href={`/${locale}/account/login?next=/${locale}/collection/${slug}`}>{labels.signIn} <span>♡</span></Link>;
  return <form className="interest-form" action={action}>
    <input type="hidden" name="putterId" value={putterId} />
    <input type="hidden" name="slug" value={slug} />
    <input type="hidden" name="locale" value={locale} />
    <button className={`button interest-button ${state.interested ? "is-saved" : ""}`} type="submit" disabled={pending} aria-pressed={state.interested}>{pending ? "…" : state.interested ? labels.remove : labels.add} <span aria-hidden="true">{state.interested ? "♥" : "♡"}</span></button>
    {state.status === "error" ? <p className="interest-error" role="alert">{state.message}</p> : null}
  </form>;
}
