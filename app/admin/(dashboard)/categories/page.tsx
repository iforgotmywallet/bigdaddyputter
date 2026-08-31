import { saveCatalogCategoryAction } from "@/app/admin/actions";
import { getCatalogCategories } from "@/db/queries/categories";
import { hasDatabase } from "@/db/client";
import { formatAdminMessage } from "@/lib/admin-i18n";
import { getAdminLanguage } from "@/lib/admin-language";
import type { CatalogCategory } from "@/lib/types";

type CategoryLabels = Awaited<ReturnType<typeof getAdminLanguage>>["messages"]["categories"];

function CategoryFields({ category, labels }: { category?: CatalogCategory; labels: CategoryLabels }) {
  return <>
    {category ? <input type="hidden" name="id" value={category.id} /> : null}
    <div className="admin-form-grid">
      <label><span>{labels.slug}</span><input name="slug" defaultValue={category?.slug ?? ""} placeholder="new-category" required /></label>
      <label><span>{labels.nameZhHant}</span><input name="nameZhHant" defaultValue={category?.name["zh-hant"] ?? ""} required /></label>
      <label><span>{labels.nameZhHans}</span><input name="nameZhHans" defaultValue={category?.name["zh-hans"] ?? ""} required /></label>
      <label><span>{labels.nameEn}</span><input name="nameEn" defaultValue={category?.name.en ?? ""} required /></label>
      <label><span>{labels.displayOrder}</span><input type="number" name="displayOrder" min="0" max="999" defaultValue={category?.displayOrder ?? 10} required /></label>
      <span />
      <label className="admin-span-3"><span>{labels.descriptionZhHant}</span><textarea name="descriptionZhHant" defaultValue={category?.description["zh-hant"] ?? ""} rows={2} /></label>
      <label className="admin-span-3"><span>{labels.descriptionZhHans}</span><textarea name="descriptionZhHans" defaultValue={category?.description["zh-hans"] ?? ""} rows={2} /></label>
      <label className="admin-span-3"><span>{labels.descriptionEn}</span><textarea name="descriptionEn" defaultValue={category?.description.en ?? ""} rows={2} /></label>
    </div>
    <div className="admin-checks admin-category-checks">
      <label className="admin-check-card"><input type="checkbox" name="isDefault" defaultChecked={category?.isDefault} /><span><strong>{labels.default}</strong><small>{labels.defaultHelp}</small></span></label>
      <label className="admin-check-card"><input type="checkbox" name="isActive" defaultChecked={category?.isActive ?? true} /><span><strong>{labels.active}</strong></span></label>
    </div>
  </>;
}

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const [categories, { messages }] = await Promise.all([getCatalogCategories({ includeInactive: true }), getAdminLanguage()]);
  const query = await searchParams;
  const m = messages.categories;
  const databaseReady = hasDatabase();
  return <>
    <header className="admin-page-header"><div><p className="eyebrow">{formatAdminMessage(m.eyebrow, { count: categories.length })}</p><h1>{m.title}</h1></div></header>
    <p className="admin-note">{m.intro}</p>
    {query.saved === "1" ? <p className="admin-alert">{m.saved}</p> : null}
    {query.error === "1" ? <p className="admin-alert error">{m.invalid}</p> : null}
    {!databaseReady ? <p className="admin-alert error">{m.databaseRequired}</p> : null}
    <section className="admin-category-section">
      <h2>{m.addTitle}</h2>
      <form className="admin-form admin-category-form" action={saveCatalogCategoryAction}>
        <fieldset disabled={!databaseReady}><CategoryFields labels={m} /></fieldset>
        <button className="admin-primary" type="submit" disabled={!databaseReady}>{m.saveNew}</button>
      </form>
    </section>
    <section className="admin-category-section">
      <h2>{m.editTitle}</h2>
      <div className="admin-category-list">
        {categories.map((category) => <details className="admin-category-record" key={category.id} open={category.isDefault}>
          <summary><strong>{category.name.en}</strong><span>/{category.slug}</span>{category.isDefault ? <b>{m.default}</b> : null}</summary>
          <form className="admin-form admin-category-form" action={saveCatalogCategoryAction}>
            <fieldset disabled={!databaseReady}><CategoryFields category={category} labels={m} /></fieldset>
            <button className="admin-secondary" type="submit" disabled={!databaseReady}>{m.save}</button>
          </form>
        </details>)}
      </div>
    </section>
  </>;
}
