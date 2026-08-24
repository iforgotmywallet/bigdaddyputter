import { PutterForm } from "@/components/admin/putter-form";
import { getSiteSettings } from "@/db/queries/settings";
import { getAdminMessages } from "@/lib/admin-i18n";
import { getPreferredLocale } from "@/lib/locale-preference";

export default async function NewPutterPage() {
  const settings = await getSiteSettings();
  const locale = await getPreferredLocale(settings.defaultLocale);
  const messages = getAdminMessages(locale);

  return <>
    <header className="admin-page-header">
      <div><p className="eyebrow">{messages.putterEditor.newEyebrow}</p><h1>{messages.putterEditor.newTitle}</h1></div>
    </header>
    <PutterForm labels={messages.putterEditor} locale={locale} statusLabels={messages.statuses} />
  </>;
}
