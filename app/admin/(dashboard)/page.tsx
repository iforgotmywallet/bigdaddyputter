import Link from "next/link";
import { getDashboardCounts, getAdminPutters } from "@/db/queries/admin";
import { adminDateLocale, adminStatusLabel } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";

export default async function AdminDashboard() {
  const { locale, messages } = await getAdminLanguage();
  const [counts, recent] = await Promise.all([getDashboardCounts(), getAdminPutters(locale)]);
  const m = messages.dashboard;
  const metrics = [[m.published, counts.total], [m.available, counts.available], [m.reserved, counts.reserved], [m.sold, counts.sold], [m.private, counts.privateCount], [m.inquiries, counts.inquiries]];

  return <>
    <header className="admin-page-header"><div><p className="eyebrow">{m.eyebrow}</p><h1>{m.title}</h1></div><Link className="admin-primary" href="/admin/putters/new">{m.newPutter}</Link></header>
    <div className="admin-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{String(value).padStart(2, "0")}</strong></article>)}</div>
    <section className="admin-section">
      <div className="admin-section-title"><h2>{m.recent}</h2><Link href="/admin/putters">{m.viewCatalogue} →</Link></div>
      {recent.length ? <div className="admin-table">{recent.slice(0, 6).map((putter) => <Link className="admin-table-row" href={`/admin/putters/${putter.id}`} key={putter.id}><span>{putter.brand}</span><strong>{putter.title}</strong><i>{adminStatusLabel(locale, putter.status)}</i><time>{putter.updatedAt.toLocaleDateString(adminDateLocale(locale))}</time></Link>)}</div> : <p className="admin-empty-state">{m.empty}</p>}
    </section>
  </>;
}
