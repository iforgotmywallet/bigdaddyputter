"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeLabels } from "@/lib/i18n";
import { locales, type Locale } from "@/lib/types";
import { AccountNavigation } from "@/components/layout/account-navigation";
import { logoutAdminFromPublicAction } from "@/app/admin/actions";
import { shouldStartWithSolidHeader } from "@/lib/navigation/header-state";

interface HeaderProps {
  locale: Locale;
  logoText: string;
  announcement?: string;
  labels: { collection: string; newArrivals: string; available: string; archive: string; about: string; contact: string; menu: string; close: string; profile: string; signIn: string };
  utilityLabels: { homeLabel: string; primaryNavigation: string; mobileNavigation: string; languageSelector: string };
  adminSessionLabels: { badge: string; warning: string; openAdmin: string; logout: string };
  customerAuthEnabled: boolean;
}

export function Header({ locale, logoText, announcement, labels, utilityLabels, adminSessionLabels, customerAuthEnabled }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [adminSessionActive, setAdminSessionActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.cookie = `site_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [locale]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/session", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<{ active: boolean }> : { active: false })
      .then((session) => setAdminSessionActive(session.active))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setAdminSessionActive(false);
      });
    return () => controller.abort();
  }, [pathname]);

  const nav = [
    ["/collection", labels.collection], ["/new-arrivals", labels.newArrivals], ["/available", labels.available],
    ["/archive", labels.archive], ["/about", labels.about], ["/contact", labels.contact],
  ];
  const startsSolid = shouldStartWithSolidHeader(pathname, locale);
  const localeHref = (target: Locale) => pathname.replace(/^\/(zh-hant|zh-hans|en)(?=\/|$)/, `/${target}`);

  return (
    <header className={`site-header ${startsSolid || solid || open ? "is-solid" : ""} ${adminSessionActive ? "has-admin-session" : ""}`}>
      {adminSessionActive ? <div className="admin-session-banner" role="status" aria-live="polite">
        <span className="admin-session-badge"><i aria-hidden="true" />{adminSessionLabels.badge}</span>
        <p>{adminSessionLabels.warning}</p>
        <div className="admin-session-actions">
          <Link href="/admin">{adminSessionLabels.openAdmin}</Link>
          <form action={logoutAdminFromPublicAction}>
            <input type="hidden" name="adminLocale" value={locale} />
            <input type="hidden" name="destination" value={`/${locale}`} />
            <button type="submit">{adminSessionLabels.logout}</button>
          </form>
        </div>
      </div> : null}
      {announcement ? <div className="announcement">{announcement}</div> : null}
      <div className="header-row shell">
        <Link className="wordmark" href={`/${locale}`} aria-label={utilityLabels.homeLabel}>{logoText}</Link>
        <nav className="desktop-nav" aria-label={utilityLabels.primaryNavigation}>
          {nav.map(([href, label]) => <Link key={href} className={pathname === `/${locale}${href}` ? "active" : ""} href={`/${locale}${href}`}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          {adminSessionActive ? <Link className="account-link admin-account-link" href="/admin"><span className="account-dot" aria-hidden="true" />{adminSessionLabels.openAdmin}</Link> : customerAuthEnabled ? <AccountNavigation locale={locale} profileLabel={labels.profile} signInLabel={labels.signIn} /> : <Link className="account-link" href={`/${locale}/account/login`}><span className="account-dot" aria-hidden="true" />{labels.signIn}</Link>}
          <div className="locale-switcher" aria-label={utilityLabels.languageSelector}>
            {locales.map((item, index) => <span key={item}>{index ? <span aria-hidden="true"> / </span> : null}<Link aria-current={locale === item ? "page" : undefined} href={localeHref(item)}>{localeLabels[item]}</Link></span>)}
          </div>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
            <span>{open ? labels.close : labels.menu}</span><span className="menu-mark" aria-hidden="true">{open ? "×" : "＋"}</span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label={utilityLabels.mobileNavigation}>
          {nav.map(([href, label], index) => <Link key={href} href={`/${locale}${href}`} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
          <Link href={adminSessionActive ? "/admin" : `/${locale}/account`} onClick={() => setOpen(false)}><span>07</span>{adminSessionActive ? adminSessionLabels.openAdmin : labels.profile}</Link>
        </nav>
        <div className="mobile-menu-footer">
          <div className="mobile-locale-switcher" aria-label={utilityLabels.languageSelector}>
            {locales.map((item) => <Link key={item} aria-current={locale === item ? "page" : undefined} href={localeHref(item)} onClick={() => setOpen(false)}>{localeLabels[item]}</Link>)}
          </div>
          <Link className="button button-light" href={`/${locale}/contact`} onClick={() => setOpen(false)}>{labels.contact}</Link>
        </div>
      </div>
    </header>
  );
}
