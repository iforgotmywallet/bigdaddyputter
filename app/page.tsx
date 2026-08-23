import { redirect } from "next/navigation";
import { getSiteSettings } from "@/db/queries/settings";
import { getPreferredLocale } from "@/lib/locale-preference";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const settings = await getSiteSettings();
  redirect(`/${await getPreferredLocale(settings.defaultLocale)}`);
}
