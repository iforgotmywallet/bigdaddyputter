"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import type { Locale } from "@/lib/types";

const initialState: InquiryState = { status: "idle", message: "", errors: {} };

function SubmitButton({ idle, pending }: { idle: string; pending: string }) {
  const status = useFormStatus();
  return <button className="button button-dark form-submit" type="submit" disabled={status.pending}>{status.pending ? pending : idle}<span>↗</span></button>;
}

interface Labels { name: string; contactMethod: string; contactValue: string; region: string; message: string; consent: string; submit: string; submitting: string; success: string; successAlt: string; error: string; honeypot: string; }

export function InquiryForm({ locale, labels, putterId, productTitle }: { locale: Locale; labels: Labels; putterId?: string; productTitle?: string }) {
  const [state, action] = useActionState(submitInquiry, initialState);
  if (state.status === "success") return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h2>{labels.success}</h2><p>{labels.successAlt}</p></div>;
  return (
    <form className="inquiry-form" action={action} noValidate>
      <input type="hidden" name="locale" value={locale} /><input type="hidden" name="putterId" value={putterId ?? ""} /><input type="hidden" name="sourceUrl" value="" />
      {productTitle ? <div className="attached-product"><span>Object</span><strong>{productTitle}</strong></div> : null}
      {state.status === "error" ? <p className="error-summary" role="alert">{labels.error}</p> : null}
      <div className="form-row">
        <label><span>{labels.name}</span><input name="name" autoComplete="name" aria-invalid={Boolean(state.errors.name)} required />{state.errors.name ? <small>{state.errors.name}</small> : null}</label>
        <label><span>{labels.contactMethod}</span><select name="contactMethod" defaultValue="email"><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option><option value="wechat">WeChat</option></select></label>
      </div>
      <div className="form-row">
        <label><span>{labels.contactValue}</span><input name="contactValue" autoComplete="email" aria-invalid={Boolean(state.errors.contactValue)} required />{state.errors.contactValue ? <small>{state.errors.contactValue}</small> : null}</label>
        <label><span>{labels.region}</span><input name="countryRegion" autoComplete="country-name" /></label>
      </div>
      <label><span>{labels.message}</span><textarea name="message" rows={6} aria-invalid={Boolean(state.errors.message)} defaultValue={productTitle ? `Regarding: ${productTitle}\n\n` : ""} required />{state.errors.message ? <small>{state.errors.message}</small> : null}</label>
      <label className="honeypot" aria-hidden="true"><span>{labels.honeypot}</span><input name="company" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="consent" required /><span>{labels.consent}</span></label>
      <div aria-live="polite">{state.message ? <p className="form-message">{state.message}</p> : null}</div>
      <SubmitButton idle={labels.submit} pending={labels.submitting} />
    </form>
  );
}
