import { getDb } from "@/db/client";
import { inquiries, putterImages, putters, putterTranslations, siteSettings, testimonials } from "@/db/schema";
import { defaultSettings } from "@/lib/constants";
import { samplePutters } from "@/lib/data/sample-putters";

async function seed() {
  const db = getDb();
  for (const putter of samplePutters.slice(0, 4)) {
    const [row] = await db.insert(putters).values({
      slug: putter.slug, brand: putter.brand, model: putter.model, modelFamily: putter.modelFamily, releaseYear: putter.releaseYear,
      category: putter.category, status: putter.status, headStyle: putter.headStyle, headMaterial: putter.headMaterial, finish: putter.finish,
      neckType: putter.neckType, alignmentAid: putter.alignmentAid, lengthInches: putter.lengthInches, loftDegrees: putter.loftDegrees,
      lieDegrees: putter.lieDegrees, headWeightGrams: putter.headWeightGrams, shaft: putter.shaft, grip: putter.grip, headcover: putter.headcover,
      paintFill: putter.paintFill, coaStatus: putter.coaStatus, serialNumber: putter.serialNumber, conditionScore: putter.conditionScore,
      priceMode: putter.priceMode, priceCents: putter.priceCents, priceCurrency: putter.priceCurrency, location: putter.location,
      provenanceSummary: putter.provenanceSummary, isFeatured: putter.isFeatured, isPublished: putter.isPublished, displayOrder: putter.displayOrder,
      publishedAt: putter.publishedAt ? new Date(putter.publishedAt) : null,
    }).onConflictDoUpdate({ target: putters.slug, set: { status: putter.status, updatedAt: new Date() } }).returning({ id: putters.id });
    for (const locale of ["zh-hant", "zh-hans", "en"] as const) {
      const translation = putter.translations[locale];
      await db.insert(putterTranslations).values({ putterId: row.id, locale, ...translation }).onConflictDoNothing();
    }
    for (const image of putter.images) {
      await db.insert(putterImages).values({ putterId: row.id, src: image.src, altZhHant: image.alt["zh-hant"], altZhHans: image.alt["zh-hans"], altEn: image.alt.en, width: image.width, height: image.height, sortOrder: image.sortOrder, isPrimary: image.isPrimary }).onConflictDoNothing();
    }
  }
  await db.insert(siteSettings).values({
    brandName: defaultSettings.brandName, logoText: defaultSettings.logoText, defaultLocale: defaultSettings.defaultLocale,
    announcementEnabled: defaultSettings.announcementEnabled, announcementZhHant: defaultSettings.announcement["zh-hant"], announcementZhHans: defaultSettings.announcement["zh-hans"], announcementEn: defaultSettings.announcement.en,
    heroTitleZhHant: defaultSettings.heroTitle["zh-hant"], heroTitleZhHans: defaultSettings.heroTitle["zh-hans"], heroTitleEn: defaultSettings.heroTitle.en,
    heroSubtitleZhHant: defaultSettings.heroSubtitle["zh-hant"], heroSubtitleZhHans: defaultSettings.heroSubtitle["zh-hans"], heroSubtitleEn: defaultSettings.heroSubtitle.en,
    heroImageSrc: defaultSettings.heroImageSrc, ownerImageSrc: defaultSettings.ownerImageSrc, contactEmail: defaultSettings.contactEmail, location: defaultSettings.location,
  });
  for (const locale of ["zh-hant", "zh-hans", "en"]) {
    await db.insert(testimonials).values({ quote: "Development-only placeholder testimonial — do not publish.", name: "DEV ONLY", location: "Test fixture", locale, isPublished: false });
  }
  await db.insert(inquiries).values({ locale: "en", name: "Development Sample", contactMethod: "email", contactValue: "dev@example.com", countryRegion: "Test", message: "Development-only sample inquiry. Delete before production." });
}

seed().then(() => { console.log("Seed complete. Development testimonials remain unpublished."); }).catch((error) => { console.error(error); process.exit(1); });
