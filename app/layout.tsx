import type { Metadata } from "next";
import "@/app/globals.css";
import { BRAND_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: BRAND_NAME, template: `%s | ${BRAND_NAME}` },
  description: "ScottyGoldenBell is a private Hong Kong collection of putters, headcovers, golf bags, and accessories.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
