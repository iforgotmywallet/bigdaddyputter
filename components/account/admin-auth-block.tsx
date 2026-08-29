import Link from "next/link";
import { logoutAdminFromPublicAction } from "@/app/admin/actions";
import type { Locale } from "@/lib/types";

interface AdminAuthBlockProps {
  locale: Locale;
  mode: "login" | "signup";
  labels: {
    badge: string;
    blockedTitle: string;
    blockedIntro: string;
    backToAdmin: string;
    continueLogin: string;
    continueSignup: string;
  };
}

export function AdminAuthBlock({ locale, mode, labels }: AdminAuthBlockProps) {
  const destination = `/${locale}/account/${mode}`;

  return (
    <section className="admin-auth-block">
      <div className="admin-auth-card">
        <p className="admin-auth-kicker"><span aria-hidden="true" />{labels.badge}</p>
        <h1>{labels.blockedTitle}</h1>
        <p>{labels.blockedIntro}</p>
        <div className="admin-auth-card-actions">
          <Link className="button button-outline" href="/admin">{labels.backToAdmin}</Link>
          <form action={logoutAdminFromPublicAction}>
            <input type="hidden" name="adminLocale" value={locale} />
            <input type="hidden" name="destination" value={destination} />
            <button className="button button-light" type="submit">
              {mode === "login" ? labels.continueLogin : labels.continueSignup}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
