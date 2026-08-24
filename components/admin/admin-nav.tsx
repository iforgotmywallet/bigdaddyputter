import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { adminEnvironmentLabel } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";

export async function AdminNav() {
  const { locale, messages } = await getAdminLanguage();
  const m = messages.nav;
  return <aside className="admin-nav"><div><Link className="admin-logo" href="/admin">{messages.common.ownerMark}</Link><span className="admin-environment">{adminEnvironmentLabel(locale, process.env.NODE_ENV)} / {locale}</span></div><nav><Link href="/admin">{m.overview}</Link><Link href="/admin/putters">{m.putters}</Link><Link href="/admin/inquiries">{m.inquiries}</Link><Link href="/admin/testimonials">{m.testimonials}</Link><Link href="/admin/settings">{m.settings}</Link></nav><form action={logoutAction}><button type="submit">{m.signOut} ↗</button></form></aside>;
}
