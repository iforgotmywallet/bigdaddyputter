import Link from "next/link";
import type { Locale } from "@/lib/types";

interface FooterProps { locale: Locale; brandName: string; logoText: string; note: string; rights: string; admin: string; privacy: string; }

export function Footer({ locale, brandName, logoText, note, rights, admin, privacy }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><p className="footer-mark">{logoText}</p><p>{note}</p></div>
        <div className="footer-col"><span>Hong Kong</span><span>22.3193° N</span><span>114.1694° E</span></div>
        <div className="footer-col footer-links"><Link href={`/${locale}/privacy`}>{privacy}</Link><Link href="/admin">{admin}</Link></div>
      </div>
      <div className="shell footer-base"><span>© {new Date().getFullYear()} {brandName}</span><span>{rights}</span></div>
    </footer>
  );
}
