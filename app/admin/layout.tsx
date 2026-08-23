import type { Metadata } from "next";

export const metadata: Metadata = { title: { default: "Owner Archive", template: "%s | Owner Archive" }, robots: { index: false, follow: false, noarchive: true } };
export const dynamic = "force-dynamic";
export default function AdminRootLayout({ children }: { children: React.ReactNode }) { return <main id="main" className="admin-root">{children}</main>; }
