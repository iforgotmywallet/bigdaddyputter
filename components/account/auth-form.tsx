"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { customerAuthClient } from "@/lib/customer-auth-client";
import type { Locale } from "@/lib/types";

interface AuthLabels {
  name: string;
  email: string;
  password: string;
  login: string;
  signup: string;
  loggingIn: string;
  signingUp: string;
  newHere: string;
  alreadyMember: string;
  createAccount: string;
  useExisting: string;
  configuration: string;
}

export function CustomerAuthForm({
  mode,
  locale,
  labels,
  callbackURL,
  configured,
}: {
  mode: "login" | "signup";
  locale: Locale;
  labels: AuthLabels;
  callbackURL: string;
  configured: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return setError(labels.configuration);
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const result = mode === "signup"
      ? await customerAuthClient.signUp.email({ name: String(form.get("name") ?? "").trim(), email, password })
      : await customerAuthClient.signIn.email({ email, password });
    if (result.error) {
      setError(result.error.message ?? "Unable to continue. Please try again.");
      setPending(false);
      return;
    }
    router.push(callbackURL);
    router.refresh();
  }

  return <form className="customer-auth-form" onSubmit={submit}>
    {mode === "signup" ? <label><span>{labels.name}</span><input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required autoFocus /></label> : null}
    <label><span>{labels.email}</span><input name="email" type="email" autoComplete="email" required autoFocus={mode === "login"} /></label>
    <label><span>{labels.password}</span><input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={10} maxLength={128} required /></label>
    {mode === "signup" ? <p className="auth-hint">Use at least 10 characters.</p> : null}
    {error ? <p className="auth-error" role="alert">{error}</p> : null}
    <button className="button button-dark" type="submit" disabled={pending}>{pending ? (mode === "login" ? labels.loggingIn : labels.signingUp) : (mode === "login" ? labels.login : labels.signup)} <span>↗</span></button>
    <p className="auth-switch">{mode === "login" ? labels.newHere : labels.alreadyMember} <Link href={`/${locale}/account/${mode === "login" ? "signup" : "login"}?next=${encodeURIComponent(callbackURL)}`}>{mode === "login" ? labels.createAccount : labels.useExisting}</Link></p>
  </form>;
}
