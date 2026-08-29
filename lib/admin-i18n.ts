import type { Locale, PutterStatus } from "@/lib/types";

export interface AdminPutterEditorMessages {
  newEyebrow: string;
  newTitle: string;
  editEyebrow: string;
  preview: string;
  previewUnavailable: string;
  identity: string;
  identityIntro: string;
  playingSpecifications: string;
  playingSpecificationsIntro: string;
  collectorDetails: string;
  collectorDetailsIntro: string;
  localizedContent: string;
  localizedContentIntro: string;
  localeEditorHint: string;
  catalogueState: string;
  catalogueStateIntro: string;
  slug: string;
  slugHelp: string;
  brand: string;
  model: string;
  modelFamily: string;
  modelFamilyHelp: string;
  category: string;
  releaseYear: string;
  traditionalChinese: string;
  simplifiedChinese: string;
  english: string;
  title: string;
  subtitle: string;
  overview: string;
  collectorNotes: string;
  conditionNotes: string;
  provenanceText: string;
  includedItems: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
  headMaterial: string;
  headStyle: string;
  finish: string;
  neckType: string;
  alignmentAid: string;
  lengthInches: string;
  loftDegrees: string;
  lieDegrees: string;
  headWeightGrams: string;
  shaft: string;
  grip: string;
  headcover: string;
  paintFill: string;
  coaStatus: string;
  coaHelp: string;
  serialNumber: string;
  conditionScore: string;
  location: string;
  provenanceSummary: string;
  priceMode: string;
  priceAmount: string;
  priceAmountHelp: string;
  currency: string;
  currencyHelp: string;
  featured: string;
  featuredHelp: string;
  published: string;
  publishedHelp: string;
  saving: string;
  save: string;
  saveHint: string;
  priceModes: Record<"hidden" | "amount" | "on_request", string>;
  examples: {
    headStyle: string;
    headMaterial: string;
    finish: string;
    neckType: string;
    alignmentAid: string;
  };
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
    duplicateTitle: string;
    duplicateIntro: string;
    duplicate: string;
    deleteTitle: string;
    deleteIntro: string;
    revealDelete: string;
    confirmationLabel: string;
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
      ownerMark: "Scotty Golden Bell / Owner", metadataTitle: "Owner Archive", published: "Published", draft: "Draft",
      languages: { "zh-hant": "Traditional Chinese", "zh-hans": "Simplified Chinese", en: "English" },
      environments: { production: "Production", development: "Development", test: "Test" },
    },
    login: { privateAccess: "Private access", eyebrow: "Scotty Golden Bell / Owner", title: "Enter the private catalogue.", intro: "Single-owner access. Sessions expire after twelve hours.", password: "Password", verifying: "Verifying…", enter: "Enter archive", invalid: "Invalid credentials.", notConfigured: "Owner access is not configured." },
    nav: { overview: "Overview", putters: "Putters", inquiries: "Inquiries", testimonials: "Testimonials", settings: "Settings", signOut: "Sign out" },
    dashboard: { eyebrow: "Owner overview", title: "Catalogue desk", newPutter: "New putter", published: "Published records", available: "Available", reserved: "Reserved", sold: "Sold", private: "Draft / private", inquiries: "New inquiries", recent: "Recently edited", viewCatalogue: "View catalogue", empty: "No catalogue activity yet. Add the first putter to begin the archive." },
    settings: { eyebrow: "Global configuration", title: "Settings", legend: "Identity and language", contactLegend: "Contact channels", brand: "Brand name", logo: "Logo text", defaultLocale: "Site and admin language", localeHelp: "This language is used for the homepage redirect and owner console. Visitors can still switch languages.", email: "Contact email", location: "Location", whatsappUrl: "WhatsApp URL", wechatId: "WeChat ID", instagramUrl: "Instagram URL", xiaohongshuUrl: "Xiaohongshu URL", optionalHelp: "Leave optional channels empty to hide them from the contact page.", save: "Save settings", saved: "Settings saved. The site and owner console now use the selected default language.", invalid: "Review the settings. Email must be valid, and channel links must begin with http:// or https://.", databaseRequired: "Connect DATABASE_URL to save global settings. Until then, built-in defaults are read-only." },
    statuses: { available: "Available", reserved: "Reserved", sold: "Sold", display_only: "Private collection · Not for sale", private: "Private" },
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
      newEyebrow: "Catalogue / New", newTitle: "New putter", editEyebrow: "Catalogue / Edit", preview: "View public page", previewUnavailable: "Public page unavailable while private",
      identity: "Putter identity", identityIntro: "Use the maker's exact naming. Keep collector shorthand in the model family or visitor-facing copy.",
      playingSpecifications: "Head and playing specifications", playingSpecificationsIntro: "Record the measurements and build details a player or serious collector will look for first.",
      collectorDetails: "Collector details", collectorDetailsIntro: "Document the accompanying pieces, authentication, condition, and internal source record.",
      localizedContent: "Visitor-facing copy", localizedContentIntro: "Write naturally for each audience. Product names such as GSS, Circle T, Timeless, and TourType should normally remain unchanged.", localeEditorHint: "Title, notes, included items, and search copy",
      catalogueState: "Availability, price, and visibility", catalogueStateIntro: "Status describes the putter. Publishing controls whether the record appears on the public site.",
      slug: "Public page address", slugHelp: "The final part of the page URL. Use lowercase words separated by hyphens; change only when necessary.", brand: "Maker", model: "Exact model / configuration", modelFamily: "Model family", modelFamilyHelp: "Useful for grouping related heads, such as Timeless / TourType.", category: "Collection category", releaseYear: "Model year",
      traditionalChinese: "Traditional Chinese", simplifiedChinese: "Simplified Chinese", english: "English",
      title: "Listing title", subtitle: "One-line specification summary", overview: "Overview", collectorNotes: "Collector notes", conditionNotes: "Condition notes", provenanceText: "Provenance shown to visitors", includedItems: "Included items", seoTitle: "Search title", seoDescription: "Search description",
      status: "Availability", headMaterial: "Head material", headStyle: "Head shape", finish: "Finish", neckType: "Neck / hosel", alignmentAid: "Alignment aid", lengthInches: "Length (inches)", loftDegrees: "Loft (degrees)", lieDegrees: "Lie (degrees)", headWeightGrams: "Head weight (grams)", shaft: "Shaft", grip: "Grip", headcover: "Headcover", paintFill: "Paint fill", coaStatus: "Certificate of authenticity", coaHelp: "State whether a COA is included and add its number, for example: Included — A-074011.", serialNumber: "Serial / registry number", conditionScore: "Condition score (0–10)", location: "Current location", provenanceSummary: "Internal source / provenance note",
      priceMode: "Price display", priceAmount: "Price amount", priceAmountHelp: "Enter the normal amount, for example 35000—not cents.", currency: "Currency code", currencyHelp: "Three-letter code such as USD, HKD, CAD, or GBP.",
      featured: "Feature in the catalogue", featuredHelp: "Raises this putter in curated collection views after it is published.", published: "Publish to the website", publishedHelp: "Makes the record visible to visitors unless its availability is Private.", saving: "Saving…", save: "Save putter", saveHint: "Save specifications, visitor copy, visibility, and image order together.",
      priceModes: { hidden: "Hidden", amount: "Show amount", on_request: "On request" },
      examples: { headStyle: "Blade / Newport 2", headMaterial: "GSS / SSS / carbon steel", finish: "Tour satin / black oxide", neckType: "Plumber neck / flow neck", alignmentAid: "Top line / sight dot / naked" },
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
      actions: { title: "Record tools", intro: "Create a complete private copy, or permanently remove this record.", duplicateTitle: "Create a working copy", duplicateIntro: "Copies specifications, translations, and image references into a new private draft. The current record is unchanged.", duplicate: "Duplicate as private draft", deleteTitle: "Permanently delete this putter", deleteIntro: "Deletes the catalogue record and its translations. Images are removed from storage only when no other record uses them.", revealDelete: "Show delete controls", confirmationLabel: "Type the page address to confirm", confirmation: "Type {slug}", delete: "Delete putter permanently" },
      errors: { databaseRequired: "Configure DATABASE_URL before editing catalogue records.", reviewFields: "Review the highlighted fields.", invalidField: "Enter a valid value.", invalidImages: "The image list contains an unapproved path or storage key.", saveFailed: "The record could not be saved. No catalogue changes were applied." },
    } satisfies AdminPutterEditorMessages,
  },
  "zh-hant": {
    common: {
      ownerMark: "Scotty Golden Bell / 藏家", metadataTitle: "藏家管理台", published: "已發布", draft: "草稿",
      languages: { "zh-hant": "繁體中文", "zh-hans": "簡體中文", en: "英文" },
      environments: { production: "正式環境", development: "開發環境", test: "測試環境" },
    },
    login: { privateAccess: "管理員登入", eyebrow: "Scotty Golden Bell / 後台管理", title: "登入管理後台。", intro: "請輸入管理員密碼以繼續。", password: "密碼", verifying: "驗證中…", enter: "登入後台", invalid: "登入資料不正確。", notConfigured: "管理員登入尚未設定。" },
    nav: { overview: "總覽", putters: "推桿管理", inquiries: "客戶查詢", testimonials: "收藏家評語", settings: "設定", signOut: "登出" },
    dashboard: { eyebrow: "收藏總覽", title: "收藏管理台", newPutter: "新增推桿", published: "已發布推桿", available: "可供洽購", reserved: "已預留", sold: "已售出", private: "草稿／未公開", inquiries: "新查詢", recent: "最近編輯", viewCatalogue: "查看目錄", empty: "目前尚無記錄。新增第一支推桿以建立收藏目錄。" },
    settings: { eyebrow: "全域設定", title: "設定", legend: "品牌與語言", contactLegend: "聯絡渠道", brand: "品牌名稱", logo: "標誌文字", defaultLocale: "網站及管理介面語言", localeHelp: "首頁導向及藏家管理介面會使用此語言，訪客仍可自行切換。", email: "聯絡電郵", location: "所在地", whatsappUrl: "WhatsApp 網址", wechatId: "微信 ID", instagramUrl: "Instagram 網址", xiaohongshuUrl: "小紅書網址", optionalHelp: "選填渠道留空後，聯絡頁面便不會顯示。", save: "儲存設定", saved: "設定已儲存，網站及管理介面已使用所選預設語言。", invalid: "請檢查設定。電郵必須有效，而渠道網址必須以 http:// 或 https:// 開頭。", databaseRequired: "請先設定 DATABASE_URL 才能儲存全域設定；目前只會顯示內建預設值。" },
    statuses: { available: "可供洽購", reserved: "已預留", sold: "已售出", display_only: "私人珍藏・非賣品", private: "未公開" },
    putters: { eyebrow: "收藏目錄 / {count} 筆記錄", title: "推桿管理", newPutter: "新增推桿", empty: "尚未加入推桿。請建立第一筆收藏記錄。" },
    inquiries: {
      eyebrow: "客戶查詢 / {count}", title: "客戶查詢", export: "匯出 CSV",
      databaseRequired: "請先設定 DATABASE_URL 才能查看已儲存的查詢。", empty: "目前尚無查詢；新的收藏家訊息會顯示於此。",
      statuses: { new: "新查詢", contacted: "已聯絡", closed: "已結案" },
      contactMethods: { email: "電郵", phone: "電話", whatsapp: "WhatsApp", wechat: "微信" },
      status: "狀態", internalNote: "內部備註 — 不會向訪客顯示", update: "更新",
    },
    testimonials: {
      eyebrow: "信譽內容 / 選填", title: "藏家評語", caution: "切勿發布開發測試資料或虛構藏家評語。",
      add: "新增藏家評語", name: "姓名／縮寫", location: "所在地", locale: "語言", quote: "評語內容",
      publishImmediately: "立即發布", addStatement: "新增評語", empty: "尚未加入藏家評語。",
    },
    putterEditor: {
      newEyebrow: "收藏目錄 / 新增", newTitle: "新增推桿", editEyebrow: "收藏目錄 / 編輯", preview: "查看公開頁面", previewUnavailable: "未公開的草稿尚無公開頁面",
      identity: "推桿識別資料", identityIntro: "依照原廠命名填寫品牌與型號；藏家慣用簡稱可放在系列或訪客文案內。",
      playingSpecifications: "桿頭與實打規格", playingSpecificationsIntro: "優先記錄球手與資深藏家最關心的尺寸、重量及組裝配置。",
      collectorDetails: "收藏資料", collectorDetailsIntro: "記錄隨附配件、認證、品相，以及僅供內部查核的來源。",
      localizedContent: "訪客頁面文案", localizedContentIntro: "三種語言應分別自然撰寫；GSS、Circle T、Timeless、TourType 等正式名稱一般毋須翻譯。", localeEditorHint: "標題、說明、隨附配件與搜尋摘要",
      catalogueState: "供應狀態、價格與公開設定", catalogueStateIntro: "供應狀態描述推桿本身；公開設定則決定訪客能否在網站看到此記錄。",
      slug: "公開頁面網址", slugHelp: "頁面網址最後一段。請使用小寫英文與連字號；非必要請勿更改。", brand: "品牌／製作者", model: "完整型號／配置", modelFamily: "型號系列", modelFamilyHelp: "用於歸類相近桿頭，例如 Timeless / TourType。", category: "收藏分類", releaseYear: "型號年份",
      traditionalChinese: "繁體中文", simplifiedChinese: "簡體中文", english: "英文",
      title: "藏品標題", subtitle: "一行規格摘要", overview: "藏品介紹", collectorNotes: "收藏筆記", conditionNotes: "品相說明", provenanceText: "向訪客顯示的來源紀錄", includedItems: "隨附配件", seoTitle: "搜尋結果標題", seoDescription: "搜尋結果摘要",
      status: "供應狀態", headMaterial: "桿頭材質", headStyle: "桿頭造型", finish: "表面處理", neckType: "桿頸形式", alignmentAid: "瞄準標記", lengthInches: "桿長（吋）", loftDegrees: "傾角（度）", lieDegrees: "Lie 角（度）", headWeightGrams: "桿頭重量（克）", shaft: "桿身", grip: "握把", headcover: "桿頭套", paintFill: "填漆", coaStatus: "原廠認證書（COA）", coaHelp: "請註明是否隨附認證書及編號，例如：隨附 — A-074011。", serialNumber: "序號／登記編號", conditionScore: "品相評分（0–10）", location: "目前所在地", provenanceSummary: "內部來源／查核備註",
      priceMode: "價格顯示方式", priceAmount: "價格金額", priceAmountHelp: "直接輸入正常金額，例如 35000；毋須換算成分。", currency: "貨幣代碼", currencyHelp: "使用三位英文字母，例如 USD、HKD、CAD 或 GBP。",
      featured: "列為精選藏品", featuredHelp: "公開後會在精選與收藏目錄排序中優先顯示。", published: "發布至網站", publishedHelp: "發布後訪客可看到此記錄；供應狀態若為「未公開」則仍不顯示。", saving: "儲存中…", save: "儲存推桿", saveHint: "規格、三語文案、公開設定與圖片次序會一併儲存。",
      priceModes: { hidden: "隱藏價格", amount: "顯示金額", on_request: "歡迎詢價" },
      examples: { headStyle: "Blade / Newport 2", headMaterial: "GSS / SSS / 碳鋼", finish: "Tour Satin / Black Oxide", neckType: "Plumber Neck / Flow Neck", alignmentAid: "頂線 / 瞄準點 / 無標記" },
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
      actions: { title: "記錄工具", intro: "建立完整的私人副本，或永久刪除此筆記錄。", duplicateTitle: "建立工作副本", duplicateIntro: "把規格、三語文案與圖片引用複製成新的私人草稿；目前記錄不會改動。", duplicate: "複製為私人草稿", deleteTitle: "永久刪除此支推桿", deleteIntro: "刪除藏品記錄及三語文案。只有在沒有其他記錄使用圖片時，系統才會從圖庫移除檔案。", revealDelete: "顯示刪除選項", confirmationLabel: "輸入公開頁面網址以確認", confirmation: "輸入 {slug}", delete: "永久刪除推桿" },
      errors: { databaseRequired: "請先設定 DATABASE_URL 才能編輯收藏記錄。", reviewFields: "請檢查標示的欄位。", invalidField: "請輸入有效資料。", invalidImages: "圖片清單包含未核准的路徑或儲存識別碼。", saveFailed: "無法儲存記錄，收藏資料未有任何變更。" },
    } satisfies AdminPutterEditorMessages,
  },
  "zh-hans": {
    common: {
      ownerMark: "Scotty Golden Bell / 藏家", metadataTitle: "藏家管理台", published: "已发布", draft: "草稿",
      languages: { "zh-hant": "繁体中文", "zh-hans": "简体中文", en: "英文" },
      environments: { production: "正式环境", development: "开发环境", test: "测试环境" },
    },
    login: { privateAccess: "管理员登录", eyebrow: "Scotty Golden Bell / 后台管理", title: "登录管理后台。", intro: "请输入管理员密码以继续。", password: "密码", verifying: "验证中…", enter: "登录后台", invalid: "登录信息不正确。", notConfigured: "管理员登录尚未设置。" },
    nav: { overview: "总览", putters: "推杆管理", inquiries: "客户咨询", testimonials: "收藏家评价", settings: "设置", signOut: "退出登录" },
    dashboard: { eyebrow: "收藏总览", title: "收藏管理台", newPutter: "新增推杆", published: "已发布推杆", available: "可供购买", reserved: "已预留", sold: "已售出", private: "草稿／未公开", inquiries: "新咨询", recent: "最近编辑", viewCatalogue: "查看目录", empty: "目前暂无记录。添加第一支推杆以建立收藏目录。" },
    settings: { eyebrow: "全局设置", title: "设置", legend: "品牌与语言", contactLegend: "联系渠道", brand: "品牌名称", logo: "标志文字", defaultLocale: "网站及管理界面语言", localeHelp: "首页跳转及藏家管理界面会使用此语言，访客仍可自行切换。", email: "联系邮箱", location: "所在地", whatsappUrl: "WhatsApp 网址", wechatId: "微信 ID", instagramUrl: "Instagram 网址", xiaohongshuUrl: "小红书网址", optionalHelp: "选填渠道留空后，联系页面便不会显示。", save: "保存设置", saved: "设置已保存，网站及管理界面已使用所选默认语言。", invalid: "请检查设置。邮箱必须有效，渠道网址必须以 http:// 或 https:// 开头。", databaseRequired: "请先设置 DATABASE_URL 才能保存全局设置；目前只会显示内置默认值。" },
    statuses: { available: "可供购买", reserved: "已预留", sold: "已售出", display_only: "私人收藏・非卖品", private: "未公开" },
    putters: { eyebrow: "收藏目录 / {count} 条记录", title: "推杆管理", newPutter: "新增推杆", empty: "尚未添加推杆。请创建第一条收藏记录。" },
    inquiries: {
      eyebrow: "客户咨询 / {count}", title: "客户咨询", export: "导出 CSV",
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
      newEyebrow: "收藏目录 / 新增", newTitle: "新增推杆", editEyebrow: "收藏目录 / 编辑", preview: "查看公开页面", previewUnavailable: "未公开的草稿暂无公开页面",
      identity: "推杆识别资料", identityIntro: "按照原厂命名填写品牌与型号；藏家常用简称可放在系列或访客文案内。",
      playingSpecifications: "杆头与实打规格", playingSpecificationsIntro: "优先记录球手与资深藏家最关心的尺寸、重量及组装配置。",
      collectorDetails: "收藏资料", collectorDetailsIntro: "记录随附配件、认证、品相，以及仅供内部核对的来源。",
      localizedContent: "访客页面文案", localizedContentIntro: "三种语言应分别自然撰写；GSS、Circle T、Timeless、TourType 等正式名称通常无需翻译。", localeEditorHint: "标题、说明、随附配件与搜索摘要",
      catalogueState: "供应状态、价格与公开设置", catalogueStateIntro: "供应状态描述推杆本身；公开设置决定访客能否在网站看到这条记录。",
      slug: "公开页面网址", slugHelp: "页面网址的最后一段。请使用小写英文和连字符；非必要请勿更改。", brand: "品牌／制作者", model: "完整型号／配置", modelFamily: "型号系列", modelFamilyHelp: "用于归类相近杆头，例如 Timeless / TourType。", category: "收藏分类", releaseYear: "型号年份",
      traditionalChinese: "繁体中文", simplifiedChinese: "简体中文", english: "英文",
      title: "藏品标题", subtitle: "一行规格摘要", overview: "藏品介绍", collectorNotes: "收藏笔记", conditionNotes: "品相说明", provenanceText: "向访客显示的来源记录", includedItems: "随附配件", seoTitle: "搜索结果标题", seoDescription: "搜索结果摘要",
      status: "供应状态", headMaterial: "杆头材质", headStyle: "杆头造型", finish: "表面处理", neckType: "杆颈形式", alignmentAid: "瞄准标记", lengthInches: "杆长（英寸）", loftDegrees: "倾角（度）", lieDegrees: "Lie 角（度）", headWeightGrams: "杆头重量（克）", shaft: "杆身", grip: "握把", headcover: "杆头套", paintFill: "填漆", coaStatus: "原厂认证书（COA）", coaHelp: "请注明是否随附认证书及编号，例如：随附 — A-074011。", serialNumber: "序号／登记编号", conditionScore: "品相评分（0–10）", location: "目前所在地", provenanceSummary: "内部来源／核对备注",
      priceMode: "价格显示方式", priceAmount: "价格金额", priceAmountHelp: "直接输入正常金额，例如 35000；无需换算成分。", currency: "货币代码", currencyHelp: "使用三位英文字母，例如 USD、HKD、CAD 或 GBP。",
      featured: "列为精选藏品", featuredHelp: "公开后会在精选与收藏目录排序中优先显示。", published: "发布到网站", publishedHelp: "发布后访客可以看到这条记录；供应状态若为“未公开”则仍不显示。", saving: "保存中…", save: "保存推杆", saveHint: "规格、三语文案、公开设置与图片顺序会一并保存。",
      priceModes: { hidden: "隐藏价格", amount: "显示金额", on_request: "欢迎询价" },
      examples: { headStyle: "Blade / Newport 2", headMaterial: "GSS / SSS / 碳钢", finish: "Tour Satin / Black Oxide", neckType: "Plumber Neck / Flow Neck", alignmentAid: "顶线 / 瞄准点 / 无标记" },
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
      actions: { title: "记录工具", intro: "建立完整的私人副本，或永久删除这条记录。", duplicateTitle: "建立工作副本", duplicateIntro: "将规格、三语文案与图片引用复制成新的私人草稿；当前记录不会改动。", duplicate: "复制为私人草稿", deleteTitle: "永久删除这支推杆", deleteIntro: "删除藏品记录及三语文案。只有在没有其他记录使用图片时，系统才会从图库移除文件。", revealDelete: "显示删除选项", confirmationLabel: "输入公开页面网址以确认", confirmation: "输入 {slug}", delete: "永久删除推杆" },
      errors: { databaseRequired: "请先设置 DATABASE_URL 才能编辑收藏记录。", reviewFields: "请检查标记的字段。", invalidField: "请输入有效内容。", invalidImages: "图片列表包含未获准的路径或存储标识。", saveFailed: "无法保存记录，收藏数据未发生任何更改。" },
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
