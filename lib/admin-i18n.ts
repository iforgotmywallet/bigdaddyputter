import type { Locale, PutterStatus } from "@/lib/types";

export interface AdminPutterEditorMessages {
  newEyebrow: string;
  newTitle: string;
  editEyebrow: string;
  preview: string;
  identity: string;
  localizedTitles: string;
  catalogueState: string;
  slug: string;
  brand: string;
  model: string;
  releaseYear: string;
  traditionalChinese: string;
  simplifiedChinese: string;
  english: string;
  status: string;
  headMaterial: string;
  headStyle: string;
  priceMode: string;
  priceCents: string;
  currency: string;
  featured: string;
  published: string;
  saving: string;
  save: string;
  priceModes: Record<"hidden" | "amount" | "on_request", string>;
  photography: {
    legend: string;
    kicker: string;
    title: string;
    intro: string;
    uploadingProgress: string;
    uploading: string;
    drop: string;
    formats: string;
    chooseFiles: string;
    primary: string;
    storedImage: string;
    makePrimary: string;
    moveLeft: string;
    moveRight: string;
    remove: string;
    orderLabel: string;
    empty: string;
    limitError: string;
    fileError: string;
    prepareError: string;
    uploadError: string;
    fileUploadError: string;
  };
  actions: {
    title: string;
    intro: string;
    duplicate: string;
    confirmation: string;
    delete: string;
  };
  errors: {
    databaseRequired: string;
    reviewFields: string;
    invalidField: string;
    invalidImages: string;
    saveFailed: string;
  };
}

const messages = {
  en: {
    common: {
      ownerMark: "TPA / OWNER", metadataTitle: "Owner Archive", published: "Published", draft: "Draft",
      languages: { "zh-hant": "Traditional Chinese", "zh-hans": "Simplified Chinese", en: "English" },
      environments: { production: "Production", development: "Development", test: "Test" },
    },
    login: { privateAccess: "Private access", eyebrow: "The Putter Archive / Owner", title: "Enter the private catalogue.", intro: "Single-owner access. Sessions expire after twelve hours.", password: "Password", verifying: "Verifying…", enter: "Enter archive", invalid: "Invalid credentials.", notConfigured: "Owner access is not configured." },
    nav: { overview: "Overview", putters: "Putters", inquiries: "Inquiries", testimonials: "Testimonials", settings: "Settings", signOut: "Sign out" },
    dashboard: { eyebrow: "Owner overview", title: "Catalogue desk", newPutter: "New putter", published: "Published records", available: "Available", reserved: "Reserved", sold: "Sold", private: "Draft / private", inquiries: "New inquiries", recent: "Recently edited", viewCatalogue: "View catalogue", empty: "No catalogue activity yet. Add the first putter to begin the archive." },
    settings: { eyebrow: "Global configuration", title: "Settings", legend: "Identity and language", contactLegend: "Contact channels", brand: "Brand name", logo: "Logo text", defaultLocale: "Site and admin language", localeHelp: "This language is used for the homepage redirect and owner console. Visitors can still switch languages.", email: "Contact email", location: "Location", whatsappUrl: "WhatsApp URL", wechatId: "WeChat ID", instagramUrl: "Instagram URL", xiaohongshuUrl: "Xiaohongshu URL", optionalHelp: "Leave optional channels empty to hide them from the contact page.", save: "Save settings", saved: "Settings saved. The site and owner console now use the selected default language.", invalid: "Review the settings. Email must be valid, and channel links must begin with http:// or https://.", databaseRequired: "Connect DATABASE_URL to save global settings. Until then, built-in defaults are read-only." },
    statuses: { available: "Available", reserved: "Reserved", sold: "Sold", display_only: "Collection only", private: "Private" },
    putters: { eyebrow: "Catalogue / {count} records", title: "Putters", newPutter: "New putter", empty: "No putters have been added yet. Create the first catalogue record to begin." },
    inquiries: {
      eyebrow: "Correspondence / {count}", title: "Inquiries", export: "Export CSV",
      databaseRequired: "Configure DATABASE_URL to view stored inquiries.", empty: "No inquiries yet. New collector messages will appear here.",
      statuses: { new: "New", contacted: "Contacted", closed: "Closed" },
      contactMethods: { email: "Email", phone: "Phone", whatsapp: "WhatsApp", wechat: "WeChat" },
      status: "Status", internalNote: "Internal note — never shown publicly", update: "Update",
    },
    testimonials: {
      eyebrow: "Credibility / Optional", title: "Testimonials", caution: "Never publish development fixtures or fabricate collector statements.",
      add: "Add testimonial", name: "Name / initials", location: "Location", locale: "Language", quote: "Quote",
      publishImmediately: "Publish immediately", addStatement: "Add statement", empty: "No testimonials have been added yet.",
    },
    putterEditor: {
      newEyebrow: "Catalogue / New", newTitle: "New record", editEyebrow: "Catalogue / Edit", preview: "Preview",
      identity: "Identity", localizedTitles: "Localized titles", catalogueState: "Catalogue state",
      slug: "URL slug", brand: "Brand", model: "Model", releaseYear: "Release year",
      traditionalChinese: "Traditional Chinese", simplifiedChinese: "Simplified Chinese", english: "English",
      status: "Status", headMaterial: "Head material", headStyle: "Head style", priceMode: "Price mode", priceCents: "Price in cents", currency: "Currency",
      featured: "Featured", published: "Published", saving: "Saving…", save: "Save record",
      priceModes: { hidden: "Hidden", amount: "Show amount", on_request: "On request" },
      photography: {
        legend: "Photography", kicker: "Cloudinary product library", title: "Build the visual record.",
        intro: "Upload up to {max} high-resolution product images. The first image becomes the catalogue cover.",
        uploadingProgress: "Uploading {current} of {total}…", uploading: "Uploading…", drop: "Drop product photographs here",
        formats: "JPEG, PNG or WebP · 12 MB maximum each", chooseFiles: "Choose files", primary: "Primary", storedImage: "Stored image",
        makePrimary: "Make primary", moveLeft: "Move image left", moveRight: "Move image right", remove: "Remove", orderLabel: "Product image order",
        empty: "No photographs yet. This record will use the storefront’s empty-image treatment until you upload one.",
        limitError: "A product can have up to {max} images.", fileError: "{name} must be a JPEG, PNG, or WebP image under 12 MB.",
        prepareError: "Could not prepare the upload.", uploadError: "Image upload failed. Please try again.", fileUploadError: "Could not upload {name}.",
      },
      actions: { title: "Record actions", intro: "Duplicated records start private. Deletion requires the exact slug.", duplicate: "Duplicate", confirmation: "Type {slug}", delete: "Delete" },
      errors: { databaseRequired: "Configure DATABASE_URL before editing catalogue records.", reviewFields: "Review the highlighted fields.", invalidField: "Enter a valid value.", invalidImages: "The image list contains an unapproved path or storage key.", saveFailed: "The record could not be saved. No catalogue changes were applied." },
    } satisfies AdminPutterEditorMessages,
  },
  "zh-hant": {
    common: {
      ownerMark: "TPA / 藏家", metadataTitle: "藏家管理台", published: "已發布", draft: "草稿",
      languages: { "zh-hant": "繁體中文", "zh-hans": "簡體中文", en: "英文" },
      environments: { production: "正式環境", development: "開發環境", test: "測試環境" },
    },
    login: { privateAccess: "管理員登入", eyebrow: "推杆典藏 / 後台管理", title: "登入管理後台。", intro: "請輸入管理員密碼以繼續。", password: "密碼", verifying: "驗證中…", enter: "登入後台", invalid: "登入資料不正確。", notConfigured: "管理員登入尚未設定。" },
    nav: { overview: "總覽", putters: "推杆藏品", inquiries: "洽詢", testimonials: "藏家評語", settings: "設定", signOut: "登出" },
    dashboard: { eyebrow: "藏家總覽", title: "典藏管理台", newPutter: "新增推杆", published: "已發布藏品", available: "可供洽詢", reserved: "已預留", sold: "已售出", private: "草稿／私人", inquiries: "新洽詢", recent: "最近編輯", viewCatalogue: "查看目錄", empty: "尚無典藏活動。新增第一支推杆以建立典藏目錄。" },
    settings: { eyebrow: "全域設定", title: "設定", legend: "品牌與語言", contactLegend: "聯絡渠道", brand: "品牌名稱", logo: "標誌文字", defaultLocale: "網站及管理介面語言", localeHelp: "首頁導向及藏家管理介面會使用此語言，訪客仍可自行切換。", email: "聯絡電郵", location: "所在地", whatsappUrl: "WhatsApp 網址", wechatId: "微信 ID", instagramUrl: "Instagram 網址", xiaohongshuUrl: "小紅書網址", optionalHelp: "選填渠道留空後，聯絡頁面便不會顯示。", save: "儲存設定", saved: "設定已儲存，網站及管理介面已使用所選預設語言。", invalid: "請檢查設定。電郵必須有效，而渠道網址必須以 http:// 或 https:// 開頭。", databaseRequired: "請先設定 DATABASE_URL 才能儲存全域設定；目前只會顯示內建預設值。" },
    statuses: { available: "可供洽詢", reserved: "已預留", sold: "已售出", display_only: "僅供典藏", private: "私人" },
    putters: { eyebrow: "典藏目錄 / {count} 筆記錄", title: "推杆藏品", newPutter: "新增推杆", empty: "尚未加入推杆。請建立第一筆典藏記錄。" },
    inquiries: {
      eyebrow: "往來洽詢 / {count}", title: "洽詢", export: "匯出 CSV",
      databaseRequired: "請先設定 DATABASE_URL 才能查看已儲存的洽詢。", empty: "目前尚無洽詢；新的藏家訊息會顯示於此。",
      statuses: { new: "新洽詢", contacted: "已聯絡", closed: "已結案" },
      contactMethods: { email: "電郵", phone: "電話", whatsapp: "WhatsApp", wechat: "微信" },
      status: "狀態", internalNote: "內部備註 — 不會向訪客顯示", update: "更新",
    },
    testimonials: {
      eyebrow: "信譽內容 / 選填", title: "藏家評語", caution: "切勿發布開發測試資料或虛構藏家評語。",
      add: "新增藏家評語", name: "姓名／縮寫", location: "所在地", locale: "語言", quote: "評語內容",
      publishImmediately: "立即發布", addStatement: "新增評語", empty: "尚未加入藏家評語。",
    },
    putterEditor: {
      newEyebrow: "典藏目錄 / 新增", newTitle: "新增藏品", editEyebrow: "典藏目錄 / 編輯", preview: "預覽",
      identity: "基本資料", localizedTitles: "多語言標題", catalogueState: "典藏狀態",
      slug: "網址代稱", brand: "品牌", model: "型號", releaseYear: "推出年份",
      traditionalChinese: "繁體中文", simplifiedChinese: "簡體中文", english: "英文",
      status: "狀態", headMaterial: "桿頭材質", headStyle: "桿頭類型", priceMode: "價格顯示", priceCents: "價格（分）", currency: "貨幣",
      featured: "精選藏品", published: "公開發布", saving: "儲存中…", save: "儲存藏品",
      priceModes: { hidden: "隱藏價格", amount: "顯示金額", on_request: "洽詢報價" },
      photography: {
        legend: "藏品攝影", kicker: "Cloudinary 藏品圖庫", title: "建立完整影像紀錄。",
        intro: "最多可上傳 {max} 張高解析度藏品照片；第一張會作為目錄封面。",
        uploadingProgress: "正在上傳第 {current} 張，共 {total} 張…", uploading: "上傳中…", drop: "將藏品照片拖放到此處",
        formats: "JPEG、PNG 或 WebP · 每張最大 12 MB", chooseFiles: "選擇檔案", primary: "主圖", storedImage: "已儲存圖片",
        makePrimary: "設為主圖", moveLeft: "將圖片向左移", moveRight: "將圖片向右移", remove: "移除", orderLabel: "藏品圖片排序",
        empty: "尚未加入照片；上傳前，網站會以預設空白圖片顯示此藏品。",
        limitError: "每件藏品最多可上傳 {max} 張圖片。", fileError: "{name} 必須是小於 12 MB 的 JPEG、PNG 或 WebP 圖片。",
        prepareError: "目前無法準備上傳。", uploadError: "圖片上傳失敗，請再試一次。", fileUploadError: "無法上傳 {name}。",
      },
      actions: { title: "藏品操作", intro: "複製的藏品會先設為私人；刪除時必須輸入完整網址代稱。", duplicate: "複製", confirmation: "輸入 {slug}", delete: "刪除" },
      errors: { databaseRequired: "請先設定 DATABASE_URL 才能編輯典藏記錄。", reviewFields: "請檢查標示的欄位。", invalidField: "請輸入有效資料。", invalidImages: "圖片清單包含未核准的路徑或儲存識別碼。", saveFailed: "無法儲存記錄，典藏資料未有任何變更。" },
    } satisfies AdminPutterEditorMessages,
  },
  "zh-hans": {
    common: {
      ownerMark: "TPA / 藏家", metadataTitle: "藏家管理台", published: "已发布", draft: "草稿",
      languages: { "zh-hant": "繁体中文", "zh-hans": "简体中文", en: "英文" },
      environments: { production: "正式环境", development: "开发环境", test: "测试环境" },
    },
    login: { privateAccess: "管理员登录", eyebrow: "推杆典藏 / 后台管理", title: "登录管理后台。", intro: "请输入管理员密码以继续。", password: "密码", verifying: "验证中…", enter: "登录后台", invalid: "登录信息不正确。", notConfigured: "管理员登录尚未设置。" },
    nav: { overview: "总览", putters: "推杆藏品", inquiries: "咨询", testimonials: "藏家评价", settings: "设置", signOut: "退出登录" },
    dashboard: { eyebrow: "藏家总览", title: "典藏管理台", newPutter: "新增推杆", published: "已发布藏品", available: "可供咨询", reserved: "已预留", sold: "已售出", private: "草稿／私人", inquiries: "新咨询", recent: "最近编辑", viewCatalogue: "查看目录", empty: "暂无典藏活动。添加第一支推杆以建立典藏目录。" },
    settings: { eyebrow: "全局设置", title: "设置", legend: "品牌与语言", contactLegend: "联系渠道", brand: "品牌名称", logo: "标志文字", defaultLocale: "网站及管理界面语言", localeHelp: "首页跳转及藏家管理界面会使用此语言，访客仍可自行切换。", email: "联系邮箱", location: "所在地", whatsappUrl: "WhatsApp 网址", wechatId: "微信 ID", instagramUrl: "Instagram 网址", xiaohongshuUrl: "小红书网址", optionalHelp: "选填渠道留空后，联系页面便不会显示。", save: "保存设置", saved: "设置已保存，网站及管理界面已使用所选默认语言。", invalid: "请检查设置。邮箱必须有效，渠道网址必须以 http:// 或 https:// 开头。", databaseRequired: "请先设置 DATABASE_URL 才能保存全局设置；目前只会显示内置默认值。" },
    statuses: { available: "可供咨询", reserved: "已预留", sold: "已售出", display_only: "仅供典藏", private: "私人" },
    putters: { eyebrow: "典藏目录 / {count} 条记录", title: "推杆藏品", newPutter: "新增推杆", empty: "尚未添加推杆。请创建第一条典藏记录。" },
    inquiries: {
      eyebrow: "往来咨询 / {count}", title: "咨询", export: "导出 CSV",
      databaseRequired: "请先设置 DATABASE_URL 才能查看已保存的咨询。", empty: "目前暂无咨询；新的藏家消息会显示在这里。",
      statuses: { new: "新咨询", contacted: "已联系", closed: "已结案" },
      contactMethods: { email: "邮箱", phone: "电话", whatsapp: "WhatsApp", wechat: "微信" },
      status: "状态", internalNote: "内部备注 — 不会向访客显示", update: "更新",
    },
    testimonials: {
      eyebrow: "信誉内容 / 选填", title: "藏家评价", caution: "切勿发布开发测试数据或虚构藏家评价。",
      add: "新增藏家评价", name: "姓名／缩写", location: "所在地", locale: "语言", quote: "评价内容",
      publishImmediately: "立即发布", addStatement: "新增评价", empty: "尚未添加藏家评价。",
    },
    putterEditor: {
      newEyebrow: "典藏目录 / 新增", newTitle: "新增藏品", editEyebrow: "典藏目录 / 编辑", preview: "预览",
      identity: "基本资料", localizedTitles: "多语言标题", catalogueState: "典藏状态",
      slug: "网址别名", brand: "品牌", model: "型号", releaseYear: "推出年份",
      traditionalChinese: "繁体中文", simplifiedChinese: "简体中文", english: "英文",
      status: "状态", headMaterial: "杆头材质", headStyle: "杆头类型", priceMode: "价格显示", priceCents: "价格（分）", currency: "货币",
      featured: "精选藏品", published: "公开发布", saving: "保存中…", save: "保存藏品",
      priceModes: { hidden: "隐藏价格", amount: "显示金额", on_request: "咨询报价" },
      photography: {
        legend: "藏品摄影", kicker: "Cloudinary 藏品图库", title: "建立完整影像记录。",
        intro: "最多可上传 {max} 张高分辨率藏品照片；第一张会作为目录封面。",
        uploadingProgress: "正在上传第 {current} 张，共 {total} 张…", uploading: "上传中…", drop: "将藏品照片拖放到此处",
        formats: "JPEG、PNG 或 WebP · 每张最大 12 MB", chooseFiles: "选择文件", primary: "主图", storedImage: "已保存图片",
        makePrimary: "设为主图", moveLeft: "将图片向左移动", moveRight: "将图片向右移动", remove: "移除", orderLabel: "藏品图片排序",
        empty: "尚未添加照片；上传前，网站会以默认空白图片显示此藏品。",
        limitError: "每件藏品最多可上传 {max} 张图片。", fileError: "{name} 必须是小于 12 MB 的 JPEG、PNG 或 WebP 图片。",
        prepareError: "目前无法准备上传。", uploadError: "图片上传失败，请重试。", fileUploadError: "无法上传 {name}。",
      },
      actions: { title: "藏品操作", intro: "复制的藏品会先设为私人；删除时必须输入完整网址别名。", duplicate: "复制", confirmation: "输入 {slug}", delete: "删除" },
      errors: { databaseRequired: "请先设置 DATABASE_URL 才能编辑典藏记录。", reviewFields: "请检查标记的字段。", invalidField: "请输入有效内容。", invalidImages: "图片列表包含未获准的路径或存储标识。", saveFailed: "无法保存记录，典藏数据未发生任何更改。" },
    } satisfies AdminPutterEditorMessages,
  },
} as const;

export function getAdminMessages(locale: Locale) {
  return messages[locale];
}

export function adminStatusLabel(locale: Locale, status: string) {
  const normalized = (["available", "reserved", "sold", "display_only", "private"].includes(status) ? status : "private") as PutterStatus;
  return messages[locale].statuses[normalized];
}

export function adminInquiryStatusLabel(locale: Locale, status: string) {
  const normalized = (["new", "contacted", "closed"].includes(status) ? status : "new") as "new" | "contacted" | "closed";
  return messages[locale].inquiries.statuses[normalized];
}

export function adminContactMethodLabel(locale: Locale, method: string) {
  const normalized = (["email", "phone", "whatsapp", "wechat"].includes(method) ? method : "email") as "email" | "phone" | "whatsapp" | "wechat";
  return messages[locale].inquiries.contactMethods[normalized];
}

export function adminLocaleLabel(locale: Locale, value: string) {
  const normalized = (["zh-hant", "zh-hans", "en"].includes(value) ? value : "en") as Locale;
  return messages[locale].common.languages[normalized];
}

export function adminEnvironmentLabel(locale: Locale, value: string | undefined) {
  const normalized = (["production", "development", "test"].includes(value ?? "") ? value : "development") as "production" | "development" | "test";
  return messages[locale].common.environments[normalized];
}

export function adminDateLocale(locale: Locale) {
  return locale === "zh-hans" ? "zh-CN" : locale === "zh-hant" ? "zh-HK" : "en-HK";
}

export function formatAdminMessage(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((message, [key, value]) => message.replace(`{${key}}`, String(value)), template);
}
