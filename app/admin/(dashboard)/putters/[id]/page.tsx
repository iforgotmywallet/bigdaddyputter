import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePutterAction, duplicatePutterAction } from "@/app/admin/actions";
import { PutterForm } from "@/components/admin/putter-form";
import { getAdminPutterEditor } from "@/db/queries/admin";
import { getAdminLanguage } from "@/lib/admin-language";

export default async function EditPutterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [record, language] = await Promise.all([getAdminPutterEditor(id), getAdminLanguage()]);
  if (!record) notFound();
  const { locale, messages } = language;
  const labels = messages.putterEditor;

  return <>
    <header className="admin-page-header">
      <div><p className="eyebrow">{labels.editEyebrow}</p><h1>{record.brand} {record.model}</h1></div>
      {record.isPublished && record.status !== "private"
        ? <Link className="admin-secondary" href={`/${locale}/collection/${record.slug}`} target="_blank">{labels.preview} ↗</Link>
        : <span className="admin-secondary admin-secondary-disabled" aria-disabled="true">{labels.previewUnavailable}</span>}
    </header>
    <PutterForm data={record} labels={labels} locale={locale} statusLabels={messages.statuses} />
    <section className="admin-record-tools">
      <header><p className="eyebrow">{labels.actions.title}</p><h2>{labels.actions.intro}</h2></header>
      <div className="admin-tool-grid">
        <article className="admin-tool-card">
          <div><h3>{labels.actions.duplicateTitle}</h3><p>{labels.actions.duplicateIntro}</p></div>
          <form action={duplicatePutterAction}><input type="hidden" name="id" value={id} /><button className="admin-secondary" type="submit">{labels.actions.duplicate}</button></form>
        </article>
        <details className="admin-tool-card admin-delete-tool">
          <summary><span><strong>{labels.actions.deleteTitle}</strong><small>{labels.actions.revealDelete}</small></span></summary>
          <p>{labels.actions.deleteIntro}</p>
          <form action={deletePutterAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="slug" value={record.slug} />
            <label><span>{labels.actions.confirmationLabel}</span><input name="confirmation" placeholder={labels.actions.confirmation.replace("{slug}", record.slug)} /></label>
            <button type="submit">{labels.actions.delete}</button>
          </form>
        </details>
      </div>
    </section>
  </>;
}
