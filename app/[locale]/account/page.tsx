import { redirect } from "next/navigation";
import { CustomerProfileForm } from "@/components/account/profile-form";
import { ProductGrid } from "@/components/collection/product-grid";
import { getCustomerInterestIds, getCustomerProfile } from "@/db/queries/customers";
import { getPublishedPutters } from "@/db/queries/putters";
import { getCustomerSession } from "@/lib/customer-session";
import { getMessages, requireLocale } from "@/lib/i18n";
import { signOutCustomerAction } from "@/app/[locale]/account/actions";

export const metadata = { title: "Your profile", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CustomerAccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const session = await getCustomerSession();
  if (!session) redirect(`/${locale}/account/login?next=/${locale}/account`);
  const m = getMessages(locale);
  const [profile, interestIds, allPutters] = await Promise.all([
    getCustomerProfile(session.user.id, locale),
    getCustomerInterestIds(session.user.id),
    getPublishedPutters(),
  ]);
  const interests = interestIds.map((id) => allPutters.find((putter) => putter.id === id)).filter((putter): putter is NonNullable<typeof putter> => Boolean(putter));
  return <div className="account-page">
    <header className="account-hero shell"><div><p className="eyebrow">{m.account.memberProfile}</p><h1>{m.account.greeting}, {session.user.name.split(" ")[0]}.</h1></div><div className="account-identity"><span>{session.user.email}</span><span>{String(interests.length).padStart(2, "0")} {m.account.savedItems}</span><form action={signOutCustomerAction}><input type="hidden" name="locale" value={locale} /><button className="text-button" type="submit">{m.account.signOut} ↗</button></form></div></header>
    <main className="account-content shell">
      <section className="account-interest-section"><div className="section-heading"><div><p className="eyebrow">{m.account.privateList}</p><h2>{m.account.interestTitle}</h2></div><p>{m.account.interestIntro}</p></div>{interests.length ? <ProductGrid putters={interests} locale={locale} /> : <div className="account-empty"><span>♡</span><p>{m.account.emptyInterests}</p><a className="text-link" href={`/${locale}/collection`}>{m.common.explore} →</a></div>}</section>
      <section className="account-settings-section"><div className="account-settings-copy"><p className="eyebrow">{m.account.preferences}</p><h2>{m.account.settingsTitle}</h2><p>{m.account.settingsIntro}</p></div><CustomerProfileForm name={session.user.name} email={session.user.email} profile={profile} locale={locale} labels={m.account} /></section>
    </main>
  </div>;
}
