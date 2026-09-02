import Link from "next/link";
import { getAdminPutters } from "@/db/queries/admin";
import { getCatalogCategories } from "@/db/queries/categories";
import { adminDateLocale, adminStatusLabel, formatAdminMessage } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";

export default async function AdminPuttersPage() {
  const { locale, messages } = await getAdminLanguage();
  const [records, categories] = await Promise.all([getAdminPutters(locale), getCatalogCategories({ includeInactive: true })]);
  const m = messages.putters;

  return <>
    <header className="admin-page-header"><div><p className="eyebrow">{formatAdminMessage(m.eyebrow, { count: records.length })}</p><h1>{m.title}</h1></div><Link className="admin-primary" href="/admin/putters/new">{m.newPutter}</Link></header>
    {records.length ? <div className="admin-table admin-putter-table">{records.map((putter) => <Link className="admin-table-row" href={`/admin/putters/${putter.id}`} key={putter.id}><span>{putter.brand}</span><strong>{putter.title}</strong><i>{categories.find((category) => category.id === putter.catalogCategoryId)?.name[locale] ?? "—"}</i><i>{adminStatusLabel(locale, putter.status)}</i><i>{putter.isPublished ? messages.common.published : messages.common.draft}</i><time>{putter.updatedAt.toLocaleDateString(adminDateLocale(locale))}</time></Link>)}</div> : <p className="admin-empty-state">{m.empty}</p>}
  </>;
}
