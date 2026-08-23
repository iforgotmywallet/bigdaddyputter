"use client";

import { useActionState } from "react";
import { updateCustomerProfileAction, type ProfileActionState } from "@/app/[locale]/account/actions";
import type { CustomerProfile } from "@/db/queries/customers";
import type { Locale } from "@/lib/types";

const initialState: ProfileActionState = { status: "idle", message: "" };

interface ProfileLabels {
  displayName: string; email: string; emailLocked: string; preferredLanguage: string; region: string; phone: string; preferredContact: string;
  contactEmail: string; contactPhone: string; contactWhatsapp: string; contactWechat: string; updatesOptIn: string; saveSettings: string; saving: string;
}

export function CustomerProfileForm({ name, email, profile, locale, labels }: { name: string; email: string; profile: CustomerProfile; locale: Locale; labels: ProfileLabels }) {
  const [state, action, pending] = useActionState(updateCustomerProfileAction, initialState);
  return <form className="profile-form" action={action}>
    {state.message ? <p className={`profile-alert ${state.status}`} role="status">{state.message}</p> : null}
    <div className="profile-fields">
      <label><span>{labels.displayName}</span><input name="name" defaultValue={name} minLength={2} maxLength={80} required />{state.errors?.name ? <small>{state.errors.name}</small> : null}</label>
      <label><span>{labels.email}</span><input value={email} disabled /><small>{labels.emailLocked}</small></label>
      <label><span>{labels.preferredLanguage}</span><select name="preferredLocale" defaultValue={profile.preferredLocale || locale}><option value="zh-hant">繁體中文</option><option value="zh-hans">简体中文</option><option value="en">English</option></select></label>
      <label><span>{labels.region}</span><input name="countryRegion" defaultValue={profile.countryRegion} maxLength={100} autoComplete="country-name" /></label>
      <label><span>{labels.phone}</span><input name="phone" defaultValue={profile.phone} maxLength={40} autoComplete="tel" /></label>
      <label><span>{labels.preferredContact}</span><select name="contactPreference" defaultValue={profile.contactPreference}><option value="email">{labels.contactEmail}</option><option value="phone">{labels.contactPhone}</option><option value="whatsapp">{labels.contactWhatsapp}</option><option value="wechat">{labels.contactWechat}</option></select></label>
    </div>
    <label className="profile-check"><input type="checkbox" name="marketingOptIn" defaultChecked={profile.marketingOptIn} /><span>{labels.updatesOptIn}</span></label>
    <button className="button button-dark" type="submit" disabled={pending}>{pending ? labels.saving : labels.saveSettings}</button>
  </form>;
}
