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
      <Link className="admin-secondary" href={`/${locale}/collection/${record.slug}`} target="_blank">{labels.preview} ↗</Link>
    </header>
    <PutterForm data={record} labels={labels} locale={locale} statusLabels={messages.statuses} />
    <section className="admin-danger">
      <div><h2>{labels.actions.title}</h2><p>{labels.actions.intro}</p></div>
      <form action={duplicatePutterAction}><input type="hidden" name="id" value={id} /><button type="submit">{labels.actions.duplicate}</button></form>
      <form action={deletePutterAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="slug" value={record.slug} />
        <input name="confirmation" placeholder={labels.actions.confirmation.replace("{slug}", record.slug)} />
        <button type="submit">{labels.actions.delete}</button>
      </form>
    </section>
  </>;
}
