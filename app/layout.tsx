import type { Metadata } from "next";
import "@/app/globals.css";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Scotty Golden Bell", template: "%s | Scotty Golden Bell" },
  description: "A private archive of rare and collectible putters in Hong Kong.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
