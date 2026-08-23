import { setLocalePreferenceAction } from "@/app/actions/locale";
import type { Locale } from "@/lib/types";

const choices: Array<{ value: Locale; short: string; label: string }> = [
  { value: "zh-hant", short: "繁", label: "繁體中文" },
  { value: "zh-hans", short: "简", label: "简体中文" },
  { value: "en", short: "EN", label: "English" },
];

export function AdminLanguageSelector({ locale, returnTo = "/admin/login" }: { locale: Locale; returnTo?: string }) {
  return <form className="admin-language-selector" action={setLocalePreferenceAction} aria-label="Language / 語言 / 语言">
    <input type="hidden" name="returnTo" value={returnTo} />
    {choices.map((choice) => <button key={choice.value} type="submit" name="locale" value={choice.value} aria-label={choice.label} aria-pressed={locale === choice.value} title={choice.label}>{choice.short}</button>)}
  </form>;
}
