import { updateInquiryAction } from "@/app/admin/actions";
import Link from "next/link";
import { hasDatabase } from "@/db/client";
import { listInquiries } from "@/db/queries/inquiries";
import { adminContactMethodLabel, adminDateLocale, adminInquiryStatusLabel, formatAdminMessage } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";

const inquiryStatuses = ["new", "contacted", "closed"] as const;

export default async function InquiriesPage() {
  const databaseReady = hasDatabase();
  const [rows, { locale, messages }] = await Promise.all([databaseReady ? listInquiries() : Promise.resolve([]), getAdminLanguage()]);
  const m = messages.inquiries;

  return <>
    <header className="admin-page-header">
      <div><p className="eyebrow">{formatAdminMessage(m.eyebrow, { count: rows.length })}</p><h1>{m.title}</h1></div>
      {rows.length ? <Link className="admin-secondary" href="/admin/inquiries/export">{m.export}</Link> : null}
    </header>
    {!databaseReady ? <p className="admin-alert error">{m.databaseRequired}</p> : null}
    {databaseReady && !rows.length ? <p className="admin-empty-state">{m.empty}</p> : null}
    <div className="inquiry-list">{rows.map((row) => <article key={row.id} className="inquiry-record">
      <header><div><span>{adminInquiryStatusLabel(locale, row.status)}</span><h2>{row.name}</h2></div><time>{row.createdAt.toLocaleString(adminDateLocale(locale))}</time></header>
      <p className="inquiry-contact">{adminContactMethodLabel(locale, row.contactMethod)} / {row.contactValue}{row.countryRegion ? ` · ${row.countryRegion}` : null}</p>
      <p>{row.message}</p>
      <form action={updateInquiryAction}>
        <input type="hidden" name="id" value={row.id} />
        <select name="status" defaultValue={row.status} aria-label={m.status}>{inquiryStatuses.map((status) => <option value={status} key={status}>{adminInquiryStatusLabel(locale, status)}</option>)}</select>
        <textarea name="internalNote" defaultValue={row.internalNote ?? ""} placeholder={m.internalNote} aria-label={m.internalNote} rows={2} />
        <button type="submit">{m.update}</button>
      </form>
    </article>)}</div>
  </>;
}
