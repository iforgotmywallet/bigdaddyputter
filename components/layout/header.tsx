"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeLabels } from "@/lib/i18n";
import { locales, type Locale } from "@/lib/types";
import { AccountNavigation } from "@/components/layout/account-navigation";

interface HeaderProps {
  locale: Locale;
  logoText: string;
  announcement?: string;
  labels: { collection: string; newArrivals: string; available: string; archive: string; about: string; contact: string; menu: string; close: string; profile: string; signIn: string };
  customerAuthEnabled: boolean;
}

export function Header({ locale, logoText, announcement, labels, customerAuthEnabled }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.cookie = `site_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [locale]);

  const nav = [
    ["/collection", labels.collection], ["/new-arrivals", labels.newArrivals], ["/available", labels.available],
    ["/archive", labels.archive], ["/about", labels.about], ["/contact", labels.contact],
  ];
  const localeHref = (target: Locale) => pathname.replace(/^\/(zh-hant|zh-hans|en)(?=\/|$)/, `/${target}`);

  return (
    <header className={`site-header ${solid || open ? "is-solid" : ""}`}>
      {announcement ? <div className="announcement">{announcement}</div> : null}
      <div className="header-row shell">
        <Link className="wordmark" href={`/${locale}`} aria-label="The Putter Archive home">{logoText}</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([href, label]) => <Link key={href} className={pathname === `/${locale}${href}` ? "active" : ""} href={`/${locale}${href}`}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          {customerAuthEnabled ? <AccountNavigation locale={locale} profileLabel={labels.profile} signInLabel={labels.signIn} /> : <Link className="account-link" href={`/${locale}/account/login`}><span className="account-dot" aria-hidden="true" />{labels.signIn}</Link>}
          <div className="locale-switcher" aria-label="Language selector">
            {locales.map((item, index) => <span key={item}>{index ? <span aria-hidden="true"> / </span> : null}<Link aria-current={locale === item ? "page" : undefined} href={localeHref(item)}>{localeLabels[item]}</Link></span>)}
          </div>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
            <span>{open ? labels.close : labels.menu}</span><span className="menu-mark" aria-hidden="true">{open ? "×" : "＋"}</span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {nav.map(([href, label], index) => <Link key={href} href={`/${locale}${href}`} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
          <Link href={`/${locale}/account`} onClick={() => setOpen(false)}><span>07</span>{labels.profile}</Link>
        </nav>
        <Link className="button button-light" href={`/${locale}/contact`} onClick={() => setOpen(false)}>{labels.contact}</Link>
      </div>
    </header>
  );
}
