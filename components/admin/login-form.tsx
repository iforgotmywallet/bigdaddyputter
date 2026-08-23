"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type AdminActionState } from "@/app/admin/actions";
import type { Locale } from "@/lib/types";

const initial: AdminActionState = { status: "idle", message: "" };
interface LoginLabels { password: string; verifying: string; enter: string; }
function LoginButton({ labels }: { labels: LoginLabels }) { const status = useFormStatus(); return <button className="admin-primary" type="submit" disabled={status.pending}>{status.pending ? labels.verifying : labels.enter}</button>; }
export function LoginForm({ locale, labels }: { locale: Locale; labels: LoginLabels }) { const [state, action] = useActionState(loginAction, initial); return <form className="admin-login-form" action={action}><input type="hidden" name="adminLocale" value={locale} /><label><span>{labels.password}</span><input type="password" name="password" autoComplete="current-password" required autoFocus /></label>{state.message ? <p role="alert">{state.message}</p> : null}<LoginButton labels={labels} /></form>; }
