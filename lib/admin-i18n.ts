import type { Locale, PutterStatus } from "@/lib/types";

const messages = {
  en: {
    login: { privateAccess: "Private access", eyebrow: "The Putter Archive / Owner", title: "Enter the private catalogue.", intro: "Single-owner access. Sessions expire after twelve hours.", password: "Password", verifying: "Verifying…", enter: "Enter archive", invalid: "Invalid credentials.", notConfigured: "Owner access is not configured." },
    nav: { overview: "Overview", putters: "Putters", inquiries: "Inquiries", testimonials: "Testimonials", settings: "Settings", signOut: "Sign out" },
    dashboard: { eyebrow: "Owner overview", title: "Catalogue desk", newPutter: "New putter", published: "Published records", available: "Available", reserved: "Reserved", sold: "Sold", private: "Draft / private", inquiries: "New inquiries", recent: "Recently edited", viewCatalogue: "View catalogue" },
    settings: { eyebrow: "Global configuration", title: "Settings", legend: "Identity, contact and language", brand: "Brand name", logo: "Logo text", defaultLocale: "Site and admin language", localeHelp: "This language is used for the homepage redirect and owner console. Visitors can still switch languages.", email: "Contact email", location: "Location", save: "Save settings", saved: "Settings saved. The site and owner console now use the selected default language.", databaseRequired: "Connect DATABASE_URL to save global settings. Until then, built-in defaults are read-only." },
    statuses: { available: "Available", reserved: "Reserved", sold: "Sold", display_only: "Collection only", private: "Private" },
  },
  "zh-hant": {
    login: { privateAccess: "管理員登入", eyebrow: "推杆典藏 / 後台管理", title: "登入管理後台。", intro: "請輸入管理員密碼以繼續。", password: "密碼", verifying: "驗證中…", enter: "登入後台", invalid: "登入資料不正確。", notConfigured: "管理員登入尚未設定。" },
    nav: { overview: "總覽", putters: "推杆藏品", inquiries: "洽詢", testimonials: "藏家評語", settings: "設定", signOut: "登出" },
    dashboard: { eyebrow: "藏家總覽", title: "典藏管理台", newPutter: "新增推杆", published: "已發布藏品", available: "可供洽詢", reserved: "已預留", sold: "已售出", private: "草稿／私人", inquiries: "新洽詢", recent: "最近編輯", viewCatalogue: "查看目錄" },
    settings: { eyebrow: "全域設定", title: "設定", legend: "品牌、聯絡與語言", brand: "品牌名稱", logo: "標誌文字", defaultLocale: "網站及管理介面語言", localeHelp: "首頁導向及藏家管理介面會使用此語言，訪客仍可自行切換。", email: "聯絡電郵", location: "所在地", save: "儲存設定", saved: "設定已儲存，網站及管理介面已使用所選預設語言。", databaseRequired: "請先設定 DATABASE_URL 才能儲存全域設定；目前只會顯示內建預設值。" },
    statuses: { available: "可供洽詢", reserved: "已預留", sold: "已售出", display_only: "僅供典藏", private: "私人" },
  },
  "zh-hans": {
    login: { privateAccess: "管理员登录", eyebrow: "推杆典藏 / 后台管理", title: "登录管理后台。", intro: "请输入管理员密码以继续。", password: "密码", verifying: "验证中…", enter: "登录后台", invalid: "登录信息不正确。", notConfigured: "管理员登录尚未设置。" },
    nav: { overview: "总览", putters: "推杆藏品", inquiries: "咨询", testimonials: "藏家评价", settings: "设置", signOut: "退出登录" },
    dashboard: { eyebrow: "藏家总览", title: "典藏管理台", newPutter: "新增推杆", published: "已发布藏品", available: "可供咨询", reserved: "已预留", sold: "已售出", private: "草稿／私人", inquiries: "新咨询", recent: "最近编辑", viewCatalogue: "查看目录" },
    settings: { eyebrow: "全局设置", title: "设置", legend: "品牌、联系与语言", brand: "品牌名称", logo: "标志文字", defaultLocale: "网站及管理界面语言", localeHelp: "首页跳转及藏家管理界面会使用此语言，访客仍可自行切换。", email: "联系邮箱", location: "所在地", save: "保存设置", saved: "设置已保存，网站及管理界面已使用所选默认语言。", databaseRequired: "请先设置 DATABASE_URL 才能保存全局设置；目前只会显示内置默认值。" },
    statuses: { available: "可供咨询", reserved: "已预留", sold: "已售出", display_only: "仅供典藏", private: "私人" },
  },
} as const;

export function getAdminMessages(locale: Locale) {
  return messages[locale];
}

export function adminStatusLabel(locale: Locale, status: string) {
  const normalized = (["available", "reserved", "sold", "display_only", "private"].includes(status) ? status : "private") as PutterStatus;
  return messages[locale].statuses[normalized];
}
