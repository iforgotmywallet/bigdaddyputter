import { eq } from "drizzle-orm";
import { catalogSeedItems } from "@/db/catalog-seed-items";
import { getDb } from "@/db/client";
import { catalogCategories, putterImages, putters, putterTranslations, siteSettings } from "@/db/schema";
import { DEFAULT_CATALOG_CATEGORIES, defaultSettings } from "@/lib/constants";
import type { Locale } from "@/lib/types";

const locales: Locale[] = ["zh-hant", "zh-hans", "en"];

async function seedCatalog() {
  const db = getDb();

  for (const category of DEFAULT_CATALOG_CATEGORIES) {
    const categoryValues = {
      nameZhHant: category.name["zh-hant"],
      nameZhHans: category.name["zh-hans"],
      nameEn: category.name.en,
      descriptionZhHant: category.description["zh-hant"],
      descriptionZhHans: category.description["zh-hans"],
      descriptionEn: category.description.en,
      displayOrder: category.displayOrder,
      isDefault: category.isDefault,
      isActive: category.isActive,
      updatedAt: new Date(),
    };
    await db.insert(catalogCategories).values({ id: category.id, slug: category.slug, ...categoryValues })
      .onConflictDoUpdate({ target: catalogCategories.slug, set: categoryValues });
  }

  for (const item of catalogSeedItems) {
    const itemValues = {
      slug: item.slug,
      catalogCategoryId: item.catalogCategoryId,
      brand: item.brand,
      model: item.model,
      modelFamily: item.modelFamily ?? null,
      releaseYear: item.releaseYear ?? null,
      category: item.category,
      categorySpecifications: item.categorySpecifications,
      status: item.status,
      headStyle: item.headStyle ?? null,
      headMaterial: item.headMaterial ?? null,
      finish: item.finish ?? null,
      neckType: item.neckType ?? null,
      alignmentAid: item.alignmentAid ?? null,
      lengthInches: item.lengthInches ?? null,
      loftDegrees: item.loftDegrees ?? null,
      lieDegrees: item.lieDegrees ?? null,
      headWeightGrams: item.headWeightGrams ?? null,
      shaft: item.shaft ?? null,
      grip: item.grip ?? null,
      headcover: item.headcover ?? null,
      paintFill: item.paintFill ?? null,
      coaStatus: item.coaStatus ?? null,
      serialNumber: item.serialNumber ?? null,
      conditionScore: item.conditionScore,
      priceMode: item.priceMode,
      priceCents: item.priceCents ?? null,
      priceCurrency: item.priceCurrency,
      location: item.location,
      provenanceSummary: item.provenanceSummary,
      isFeatured: item.isFeatured,
      isPublished: item.isPublished,
      displayOrder: item.displayOrder,
      publishedAt: item.publishedAt,
      updatedAt: new Date(),
    };
    const [savedItem] = await db.insert(putters).values({ id: item.id, ...itemValues })
      .onConflictDoUpdate({ target: putters.slug, set: itemValues })
      .returning({ id: putters.id });

    const translationMutations = locales.map((locale) => {
      const translation = item.translations[locale];
      return db.insert(putterTranslations).values({ putterId: savedItem.id, locale, ...translation })
        .onConflictDoUpdate({
          target: [putterTranslations.putterId, putterTranslations.locale],
          set: translation,
        });
    });
    const resetImages = db.delete(putterImages).where(eq(putterImages.putterId, savedItem.id));

    if (item.images.length) {
      const insertImages = db.insert(putterImages).values(item.images.map((image, index) => ({
        putterId: savedItem.id,
        src: image.src,
        storageKey: image.storageKey,
        width: image.width,
        height: image.height,
        sortOrder: index,
        isPrimary: index === 0,
        altZhHant: image.alt["zh-hant"],
        altZhHans: image.alt["zh-hans"],
        altEn: image.alt.en,
      })));
      await db.batch([translationMutations[0], translationMutations[1], translationMutations[2], resetImages, insertImages]);
    } else {
      await db.batch([translationMutations[0], translationMutations[1], translationMutations[2], resetImages]);
    }
  }

  // Site settings are editable production data. Seed defaults only for a fresh DB.
  const [existingSettings] = await db.select({ id: siteSettings.id }).from(siteSettings).limit(1);
  if (!existingSettings) {
    await db.insert(siteSettings).values({
      brandName: defaultSettings.brandName,
      logoText: defaultSettings.logoText,
      defaultLocale: defaultSettings.defaultLocale,
      announcementEnabled: defaultSettings.announcementEnabled,
      announcementZhHant: defaultSettings.announcement["zh-hant"],
      announcementZhHans: defaultSettings.announcement["zh-hans"],
      announcementEn: defaultSettings.announcement.en,
      heroTitleZhHant: defaultSettings.heroTitle["zh-hant"],
      heroTitleZhHans: defaultSettings.heroTitle["zh-hans"],
      heroTitleEn: defaultSettings.heroTitle.en,
      heroSubtitleZhHant: defaultSettings.heroSubtitle["zh-hant"],
      heroSubtitleZhHans: defaultSettings.heroSubtitle["zh-hans"],
      heroSubtitleEn: defaultSettings.heroSubtitle.en,
      heroImageSrc: defaultSettings.heroImageSrc,
      ownerImageSrc: defaultSettings.ownerImageSrc,
      contactEmail: defaultSettings.contactEmail,
      location: defaultSettings.location,
    });
  }
}

seedCatalog()
  .then(() => console.log(`Seed complete: ${catalogSeedItems.length} localized catalogue examples are ready.`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
