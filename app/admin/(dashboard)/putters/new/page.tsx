import { PutterForm } from "@/components/admin/putter-form";
import { getCatalogCategories, getDefaultCatalogCategory } from "@/db/queries/categories";
import { getAdminLanguage } from "@/lib/admin-language";

export default async function NewPutterPage() {
  const [{ locale, messages }, categories, defaultCategory] = await Promise.all([getAdminLanguage(), getCatalogCategories(), getDefaultCatalogCategory()]);

  return <>
    <header className="admin-page-header">
      <div><p className="eyebrow">{messages.putterEditor.newEyebrow}</p><h1>{messages.putterEditor.newTitle}</h1></div>
    </header>
    <PutterForm labels={messages.putterEditor} locale={locale} statusLabels={messages.statuses} categories={categories} defaultCategoryId={defaultCategory.id} />
  </>;
}
