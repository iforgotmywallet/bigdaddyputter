import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { getSiteSettings } from "@/db/queries/settings";
import { getAdminMessages } from "@/lib/admin-i18n";
import { getPreferredLocale } from "@/lib/locale-preference";

export async function AdminNav() { const settings = await getSiteSettings(); const locale = await getPreferredLocale(settings.defaultLocale); const m = getAdminMessages(locale); return <aside className="admin-nav"><div><Link className="admin-logo" href="/admin">TPA / OWNER</Link><span className="admin-environment">{process.env.NODE_ENV} / {locale}</span></div><nav><Link href="/admin">{m.nav.overview}</Link><Link href="/admin/putters">{m.nav.putters}</Link><Link href="/admin/inquiries">{m.nav.inquiries}</Link><Link href="/admin/testimonials">{m.nav.testimonials}</Link><Link href="/admin/settings">{m.nav.settings}</Link></nav><form action={logoutAction}><button type="submit">{m.nav.signOut} ↗</button></form></aside>; }
