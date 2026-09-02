import type { CategorySpecifications, Locale } from "@/lib/types";

interface CatalogSeedTranslation {
  title: string;
  subtitle: string;
  overview: string;
  collectorNotes: string;
  conditionNotes: string;
  provenanceText: string;
  includedItems: string;
  seoTitle: string;
  seoDescription: string;
}

interface CatalogSeedImage {
  src: string;
  storageKey: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
}

export interface CatalogSeedItem {
  id: string;
  slug: string;
  catalogCategoryId: string;
  brand: string;
  model: string;
  modelFamily?: string;
  releaseYear?: number;
  category: string;
  categorySpecifications: CategorySpecifications;
  status: "available" | "reserved" | "sold" | "display_only" | "private";
  headStyle?: string;
  headMaterial?: string;
  finish?: string;
  neckType?: string;
  alignmentAid?: string;
  lengthInches?: number;
  loftDegrees?: number;
  lieDegrees?: number;
  headWeightGrams?: number;
  shaft?: string;
  grip?: string;
  headcover?: string;
  paintFill?: string;
  coaStatus?: string;
  serialNumber?: string;
  conditionScore: number;
  priceMode: "hidden" | "amount" | "on_request";
  priceCents?: number;
  priceCurrency: string;
  location: string;
  provenanceSummary: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  publishedAt: Date;
  translations: Record<Locale, CatalogSeedTranslation>;
  images: CatalogSeedImage[];
}

export const catalogSeedItems: CatalogSeedItem[] = [
  {
    id: "7edc5309-5e6e-47ff-b12b-c9fe94b169c8",
    slug: "scotty-cameron-tom-kim-gss-timeless-tourtype-circle-t-360g",
    catalogCategoryId: "10000000-0000-4000-8000-000000000001",
    brand: "Scotty Cameron",
    model: "GSS Prototype Timeless TourType Circle T 360G",
    modelFamily: "Timeless / TourType",
    category: "Tour Only",
    categorySpecifications: {},
    status: "available",
    headStyle: "Blade — Timeless TourType",
    headMaterial: "GSS (German Stainless Steel)",
    alignmentAid: "Top line",
    lengthInches: 34,
    headWeightGrams: 360,
    grip: "Tiffany For Tour Use Only Circle T grip",
    headcover: "Camo Bulldog Tiffany Circle T headcover",
    coaStatus: "Included — A-074011",
    conditionScore: 9.5,
    priceMode: "amount",
    priceCents: 3_500_000,
    priceCurrency: "USD",
    location: "Hong Kong",
    provenanceSummary: "https://tourputtergallery.com/shop/scotty-cameron/tour-putters/scotty-cameron-tour-only-tom-kim-style-gss-timeless-tourtype-circle-t-360g-w-top-line-35g-tungsten-sole-weights/",
    isFeatured: true,
    isPublished: true,
    displayOrder: 0,
    publishedAt: new Date("2026-08-29T20:00:37.932Z"),
    translations: {
      en: {
        title: "Scotty Cameron Tour Only GSS Timeless TourType Circle T 360G — Tom Kim Configuration",
        subtitle: "GSS prototype · 34 in · 360 g · top-line alignment · 35G tungsten sole weights",
        overview: "A tour-only GSS prototype built on the Timeless TourType Circle T platform in a Tom Kim-style configuration. The 34-inch build and 360-gram head pair substantial head feel with a clean top-line alignment reference.",
        collectorNotes: "German Stainless Steel construction, a top-line alignment mark, and 35G tungsten Circle T sole weights define the head. These tour details are the key collector features of this example.",
        conditionNotes: "Presented as a collector-grade example. Inspect the face, sole, finish, shaft, grip, and accessories against the current photographs before completing a transaction.",
        provenanceText: "Catalogued from the Tour Putter Gallery source listing. Verify the physical putter, certificate, and accessories before publication.",
        includedItems: "Tiffany For Tour Use Only Circle T grip, Camo Bulldog Tiffany Circle T headcover, and Certificate of Authenticity A-074011.",
        seoTitle: "Tom Kim-Style GSS Circle T 360G | ScottyGoldenBell",
        seoDescription: "Tour Only Scotty Cameron GSS Timeless TourType Circle T putter in a 34-inch, 360-gram Tom Kim-style configuration.",
      },
      "zh-hant": {
        title: "Scotty Cameron Tour Only GSS Timeless TourType Circle T 360G｜Tom Kim 規格",
        subtitle: "GSS 原型桿頭 · 34 吋 · 360 克 · 頂線瞄準 · 35G 鎢製底部配重",
        overview: "這支 Tour Only GSS 原型推桿採用 Timeless TourType Circle T 平台，依 Tom Kim 巡迴賽風格配置。34 吋桿長配合 360 克桿頭，為偏好穩定重量感與清晰瞄準基準的球手而設。",
        collectorNotes: "桿頭以 GSS（German Stainless Steel）製作，頂線作為瞄準標記，桿底配備 35G Tungsten Circle T 配重。這些巡迴賽細節是本件最值得記錄的配置。",
        conditionNotes: "本件按收藏級別記錄；交易前請按最新照片核對桿面、桿底、表面處理、桿身、握把及隨附配件。",
        provenanceText: "資料依據 Tour Putter Gallery 商品記錄整理；正式發布前應再次核對實物、原廠認證書與配件。",
        includedItems: "Tiffany For Tour Use Only Circle T 握把、Camo Bulldog Tiffany Circle T 桿頭套，以及原廠認證書 A-074011。",
        seoTitle: "Tom Kim 規格 GSS Circle T 360G｜ScottyGoldenBell",
        seoDescription: "Scotty Cameron Tour Only GSS Timeless TourType Circle T 推桿，34 吋、360 克 Tom Kim 風格配置。",
      },
      "zh-hans": {
        title: "Scotty Cameron Tour Only GSS Timeless TourType Circle T 360G｜Tom Kim 规格",
        subtitle: "GSS 原型杆头 · 34 英寸 · 360 克 · 顶线瞄准 · 35G 钨制底部配重",
        overview: "这支 Tour Only GSS 原型推杆采用 Timeless TourType Circle T 平台，按照 Tom Kim 巡回赛风格配置。34 英寸杆长配合 360 克杆头，适合偏好稳定重量感与清晰瞄准基准的球手。",
        collectorNotes: "杆头以 GSS（German Stainless Steel）制成，顶线作为瞄准标记，杆底配备 35G Tungsten Circle T 配重。这些巡回赛细节是本件最值得记录的配置。",
        conditionNotes: "本件按收藏级别记录；交易前请根据最新照片核对杆面、杆底、表面处理、杆身、握把及随附配件。",
        provenanceText: "资料根据 Tour Putter Gallery 商品记录整理；正式发布前应再次核对实物、原厂认证书与配件。",
        includedItems: "Tiffany For Tour Use Only Circle T 握把、Camo Bulldog Tiffany Circle T 杆头套，以及原厂认证书 A-074011。",
        seoTitle: "Tom Kim 规格 GSS Circle T 360G｜ScottyGoldenBell",
        seoDescription: "Scotty Cameron Tour Only GSS Timeless TourType Circle T 推杆，34 英寸、360 克 Tom Kim 风格配置。",
      },
    },
    images: [
      {
        src: "https://res.cloudinary.com/vwr9uf68/image/upload/v1788031348/bigdaddyputter/products/733916bf-d88d-49ef-a62e-a6858675e996.jpg",
        storageKey: "bigdaddyputter/products/733916bf-d88d-49ef-a62e-a6858675e996",
        width: 600,
        height: 452,
        alt: { en: "Tom Kim-style GSS Timeless TourType Circle T putter", "zh-hant": "Tom Kim 規格 GSS Timeless TourType Circle T 推桿", "zh-hans": "Tom Kim 规格 GSS Timeless TourType Circle T 推杆" },
      },
      {
        src: "https://res.cloudinary.com/vwr9uf68/image/upload/v1788031373/bigdaddyputter/products/62bc30c6-f5eb-4e1b-9601-dc33313e40d4.jpg",
        storageKey: "bigdaddyputter/products/62bc30c6-f5eb-4e1b-9601-dc33313e40d4",
        width: 600,
        height: 452,
        alt: { en: "Detail view of the GSS Circle T putter", "zh-hant": "GSS Circle T 推桿細節", "zh-hans": "GSS Circle T 推杆细节" },
      },
    ],
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    slug: "scotty-cameron-2026-gentleman-jackpot-open-championship-headcover",
    catalogCategoryId: "10000000-0000-4000-8000-000000000002",
    brand: "Scotty Cameron",
    model: "Gentleman Jackpot Open Championship Blade Headcover",
    modelFamily: "Gentleman Jackpot",
    releaseYear: 2026,
    category: "Limited Release",
    categorySpecifications: {
      releaseEvent: "The Open Championship",
      edition: "Gentleman Jackpot",
      headcoverFit: "Blade putters",
      handedness: "Universal",
      material: "Embroidered exterior",
      colorway: "Multicolor",
      closureType: "Hook-and-loop",
    },
    status: "available",
    conditionScore: 10,
    priceMode: "amount",
    priceCents: 14_995,
    priceCurrency: "USD",
    location: "Hong Kong",
    provenanceSummary: "https://thegolfhub.com/products/new-scotty-cameron-2026-gentleman-jackpot-open-championship-blade-headcover",
    isFeatured: true,
    isPublished: true,
    displayOrder: 1,
    publishedAt: new Date("2026-08-31T12:00:00.000Z"),
    translations: {
      en: {
        title: "2026 Gentleman Jackpot Open Championship Blade Headcover",
        subtitle: "Open Championship edition · blade fit · multicolor embroidery · hook-and-loop closure",
        overview: "A 2026 Open Championship edition putter headcover featuring the Gentleman Jackpot artwork. The blade profile and secure hook-and-loop closure make it a practical display piece that can still be used on the course.",
        collectorNotes: "The tournament theme, colorful character embroidery, and 2026 release date distinguish this limited headcover. Active resale examples have commonly appeared around the $120–$150 range.",
        conditionNotes: "Recorded as new. Confirm the embroidery, seams, lining, closure, and any original packaging against current photographs.",
        provenanceText: "Catalogued from The Golf Hub listing at $149.95, with the broader resale range used only as market context.",
        includedItems: "One Gentleman Jackpot blade putter headcover.",
        seoTitle: "2026 Gentleman Jackpot Headcover | ScottyGoldenBell",
        seoDescription: "Scotty Cameron 2026 Gentleman Jackpot Open Championship blade putter headcover with multicolor embroidery.",
      },
      "zh-hant": {
        title: "2026 英國公開賽 Gentleman Jackpot 刀背型推桿套",
        subtitle: "英國公開賽版本 · 適合刀背型推桿 · 多色刺繡 · 魔術貼開合",
        overview: "這款 2026 英國公開賽限定推桿套以 Gentleman Jackpot 圖案為主題。刀背型剪裁配合穩固的魔術貼開合，既適合收藏展示，也可在球場上實際使用。",
        collectorNotes: "賽事主題、多色角色刺繡與 2026 年份是本件的主要收藏重點；近期二手市場常見叫價約為 120 至 150 美元。",
        conditionNotes: "本件按全新狀態記錄；請按最新照片核對刺繡、縫線、內裡、開合位置及原裝包裝。",
        provenanceText: "資料依據 The Golf Hub 的 149.95 美元商品記錄整理；其他成交區間僅作市場參考。",
        includedItems: "Gentleman Jackpot 刀背型推桿套一個。",
        seoTitle: "2026 Gentleman Jackpot 推桿套｜ScottyGoldenBell",
        seoDescription: "Scotty Cameron 2026 英國公開賽 Gentleman Jackpot 刀背型推桿套，配多色刺繡。",
      },
      "zh-hans": {
        title: "2026 英国公开赛 Gentleman Jackpot 刀背型推杆套",
        subtitle: "英国公开赛版本 · 适合刀背型推杆 · 多色刺绣 · 魔术贴开合",
        overview: "这款 2026 英国公开赛限定推杆套以 Gentleman Jackpot 图案为主题。刀背型剪裁配合稳固的魔术贴开合，既适合收藏展示，也可在球场上实际使用。",
        collectorNotes: "赛事主题、多色角色刺绣与 2026 年份是本件的主要收藏重点；近期二手市场常见报价约为 120 至 150 美元。",
        conditionNotes: "本件按全新状态记录；请根据最新照片核对刺绣、缝线、内衬、开合位置及原装包装。",
        provenanceText: "资料根据 The Golf Hub 的 149.95 美元商品记录整理；其他成交区间仅作市场参考。",
        includedItems: "Gentleman Jackpot 刀背型推杆套一个。",
        seoTitle: "2026 Gentleman Jackpot 推杆套｜ScottyGoldenBell",
        seoDescription: "Scotty Cameron 2026 英国公开赛 Gentleman Jackpot 刀背型推杆套，配多色刺绣。",
      },
    },
    images: [{
      src: "https://res.cloudinary.com/vwr9uf68/image/upload/v1788193150/bigdaddyputter/products/seed-2026-gentleman-jackpot-headcover.jpg",
      storageKey: "bigdaddyputter/products/seed-2026-gentleman-jackpot-headcover",
      width: 1200,
      height: 1600,
      alt: { en: "2026 Gentleman Jackpot Open Championship blade headcover", "zh-hant": "2026 英國公開賽 Gentleman Jackpot 刀背型推桿套", "zh-hans": "2026 英国公开赛 Gentleman Jackpot 刀背型推杆套" },
    }],
  },
  {
    id: "20000000-0000-4000-8000-000000000003",
    slug: "scotty-cameron-2026-scotty-soup-pathfinder-stand-bag",
    catalogCategoryId: "10000000-0000-4000-8000-000000000003",
    brand: "Scotty Cameron",
    model: "Scotty Soup Pathfinder Stand Bag",
    modelFamily: "Pathfinder",
    releaseYear: 2026,
    category: "U.S. Open Limited Release",
    categorySpecifications: {
      productCode: "SC020026",
      releaseDate: "2026-06-15",
      releaseEvent: "U.S. Open",
      edition: "Scotty Soup",
      bagType: "Stand bag",
      colorway: "Liberty Blue",
      dividerTop: "Padded club dividers",
      strapSystem: "Dual padded shoulder straps",
      featureSummary: "Circle T and 7 Point Crown appliqués, glove patch, tee holder, custom zipper pulls, spacious pockets, rain hood, and Scotty Dog towel holder.",
    },
    status: "available",
    conditionScore: 10,
    priceMode: "amount",
    priceCents: 90_000,
    priceCurrency: "USD",
    location: "Hong Kong",
    provenanceSummary: "https://www.ebay.com/itm/128025335613",
    isFeatured: true,
    isPublished: true,
    displayOrder: 2,
    publishedAt: new Date("2026-08-31T12:00:00.000Z"),
    translations: {
      en: {
        title: "2026 U.S. Open Scotty Soup Pathfinder Stand Bag",
        subtitle: "Liberty Blue · Pathfinder stand bag · Circle T details · matching rain hood",
        overview: "Released for the 2026 U.S. Open, this Liberty Blue Pathfinder stand bag carries the playful Scotty Soup alphabet artwork across a practical walking-bag format. It combines a strong collector identity with the storage and carrying features expected by a golfer.",
        collectorNotes: "Circle T and 7 Point Crown appliqués, custom zipper pulls, and the event-specific Scotty Soup design are the defining details. Current resale examples have generally appeared around $850–$925.",
        conditionNotes: "Recorded as new. Confirm the fabric, stand mechanism, dividers, straps, zippers, pockets, and rain hood against current photographs.",
        provenanceText: "Product details follow the official Scotty Cameron archive; the displayed $900 reference value follows the supplied eBay resale listing.",
        includedItems: "Pathfinder stand bag and matching rain hood.",
        seoTitle: "2026 Scotty Soup Pathfinder Stand Bag | ScottyGoldenBell",
        seoDescription: "2026 U.S. Open Scotty Cameron Scotty Soup Pathfinder stand bag in Liberty Blue with Circle T details.",
      },
      "zh-hant": {
        title: "2026 美國公開賽 Scotty Soup Pathfinder 企袋",
        subtitle: "Liberty Blue 配色 · Pathfinder 企袋 · Circle T 細節 · 同款防雨罩",
        overview: "這款 Liberty Blue Pathfinder 企袋為 2026 美國公開賽版本，以活潑的 Scotty Soup 字母圖案貫穿袋身。設計兼顧收藏辨識度與球手落場時所需的收納及背負功能。",
        collectorNotes: "Circle T 與 7 Point Crown 貼飾、訂製拉鏈頭及賽事限定 Scotty Soup 圖案是本件的主要特色；近期二手市場常見叫價約為 850 至 925 美元。",
        conditionNotes: "本件按全新狀態記錄；請按最新照片核對布料、支架、分隔、肩帶、拉鏈、口袋及防雨罩。",
        provenanceText: "產品資料依據 Scotty Cameron 官方歷史檔案整理；頁面所示 900 美元參考價來自指定的 eBay 二手市場記錄。",
        includedItems: "Pathfinder 企袋及同款防雨罩。",
        seoTitle: "2026 Scotty Soup Pathfinder 企袋｜ScottyGoldenBell",
        seoDescription: "2026 美國公開賽 Scotty Cameron Scotty Soup Pathfinder Liberty Blue 企袋，配 Circle T 細節。",
      },
      "zh-hans": {
        title: "2026 美国公开赛 Scotty Soup Pathfinder 支架球包",
        subtitle: "Liberty Blue 配色 · Pathfinder 支架球包 · Circle T 细节 · 同款防雨罩",
        overview: "这款 Liberty Blue Pathfinder 支架球包为 2026 美国公开赛版本，以活泼的 Scotty Soup 字母图案贯穿包身。设计兼顾收藏辨识度与球手下场时所需的收纳及背负功能。",
        collectorNotes: "Circle T 与 7 Point Crown 贴饰、定制拉链头及赛事限定 Scotty Soup 图案是本件的主要特色；近期二手市场常见报价约为 850 至 925 美元。",
        conditionNotes: "本件按全新状态记录；请根据最新照片核对面料、支架、分隔、肩带、拉链、口袋及防雨罩。",
        provenanceText: "产品资料根据 Scotty Cameron 官方历史档案整理；页面所示 900 美元参考价来自指定的 eBay 二手市场记录。",
        includedItems: "Pathfinder 支架球包及同款防雨罩。",
        seoTitle: "2026 Scotty Soup Pathfinder 球包｜ScottyGoldenBell",
        seoDescription: "2026 美国公开赛 Scotty Cameron Scotty Soup Pathfinder Liberty Blue 支架球包，配 Circle T 细节。",
      },
    },
    images: [{
      src: "https://res.cloudinary.com/vwr9uf68/image/upload/v1788193277/bigdaddyputter/products/seed-2026-scotty-soup-pathfinder.jpg",
      storageKey: "bigdaddyputter/products/seed-2026-scotty-soup-pathfinder",
      width: 800,
      height: 600,
      alt: { en: "2026 Scotty Soup Pathfinder stand bag in Liberty Blue", "zh-hant": "2026 Scotty Soup Pathfinder Liberty Blue 企袋", "zh-hans": "2026 Scotty Soup Pathfinder Liberty Blue 支架球包" },
    }],
  },
  {
    id: "20000000-0000-4000-8000-000000000004",
    slug: "scotty-cameron-2026-gallery-circle-t-sss-ball-marker-black-pink",
    catalogCategoryId: "10000000-0000-4000-8000-000000000004",
    brand: "Scotty Cameron",
    model: "Gallery Circle T SSS Ball Marker — Black / Pink",
    modelFamily: "Gallery Circle T",
    releaseYear: 2026,
    category: "Gallery Exclusive",
    categorySpecifications: {
      edition: "Circle T Gallery Exclusive",
      accessoryType: "Ball marker / coin",
      material: "SSS (stainless steel)",
      colorway: "Black / Pink",
      galleryOrigin: "Scotty Cameron Gallery, Encinitas",
    },
    status: "sold",
    conditionScore: 10,
    priceMode: "amount",
    priceCents: 25_000,
    priceCurrency: "USD",
    location: "Hong Kong",
    provenanceSummary: "https://www.ebay.com/itm/157990665391",
    isFeatured: true,
    isPublished: true,
    displayOrder: 3,
    publishedAt: new Date("2026-08-31T12:00:00.000Z"),
    translations: {
      en: {
        title: "2026 Gallery Circle T SSS Ball Marker — Black / Pink",
        subtitle: "Gallery exclusive · SSS construction · black and pink finish · sold reference: $250",
        overview: "A 2026 Scotty Cameron Gallery Circle T ball marker machined in SSS and finished in a high-contrast black and pink colorway. Its compact format and Gallery provenance make it a focused accessory collectible.",
        collectorNotes: "The Circle T identity, SSS material, and Gallery-exclusive origin are the principal collector details. The supplied eBay example sold for $250.",
        conditionNotes: "Recorded as new from the source listing. Confirm both faces, edges, finish, dimensions, and any pouch or packaging against current photographs.",
        provenanceText: "Catalogued from the supplied eBay sold listing, item 157990665391. The $250 amount is a historical sold reference, not a current asking price.",
        includedItems: "One Circle T SSS ball marker / coin. Packaging was not verified from the supplied listing.",
        seoTitle: "2026 Gallery Circle T SSS Ball Marker | ScottyGoldenBell",
        seoDescription: "2026 Scotty Cameron Gallery Circle T SSS ball marker in black and pink, catalogued from a $250 sold example.",
      },
      "zh-hant": {
        title: "2026 Gallery Circle T SSS 高爾夫球標｜黑／粉紅",
        subtitle: "Gallery 限定 · SSS 不鏽鋼 · 黑粉配色 · 250 美元成交參考",
        overview: "這款 2026 Scotty Cameron Gallery Circle T 高爾夫球標以 SSS 不鏽鋼製作，配上對比鮮明的黑色與粉紅色表面處理。小巧實用的尺寸加上 Gallery 來源，使其成為主題清晰的收藏配件。",
        collectorNotes: "Circle T 標誌、SSS 材質與 Gallery 限定來源是本件的主要收藏重點；指定 eBay 記錄的成交價為 250 美元。",
        conditionNotes: "本件按來源記錄列為全新；請按最新照片核對正反兩面、邊緣、表面處理、尺寸，以及是否附有收納袋或包裝。",
        provenanceText: "資料依據指定的 eBay 已成交商品 157990665391 整理；250 美元為歷史成交參考，並非目前叫價。",
        includedItems: "Circle T SSS 高爾夫球標／紀念幣一枚；指定商品記錄未能確認包裝。",
        seoTitle: "2026 Gallery Circle T SSS 高爾夫球標｜ScottyGoldenBell",
        seoDescription: "2026 Scotty Cameron Gallery Circle T SSS 黑粉配色高爾夫球標，參考成交價 250 美元。",
      },
      "zh-hans": {
        title: "2026 Gallery Circle T SSS 高尔夫球标｜黑／粉红",
        subtitle: "Gallery 限定 · SSS 不锈钢 · 黑粉配色 · 250 美元成交参考",
        overview: "这款 2026 Scotty Cameron Gallery Circle T 高尔夫球标以 SSS 不锈钢制成，搭配对比鲜明的黑色与粉红色表面处理。小巧实用的尺寸加上 Gallery 来源，使其成为主题清晰的收藏配件。",
        collectorNotes: "Circle T 标志、SSS 材质与 Gallery 限定来源是本件的主要收藏重点；指定 eBay 记录的成交价为 250 美元。",
        conditionNotes: "本件按来源记录列为全新；请根据最新照片核对正反两面、边缘、表面处理、尺寸，以及是否附有收纳袋或包装。",
        provenanceText: "资料根据指定的 eBay 已成交商品 157990665391 整理；250 美元为历史成交参考，并非当前报价。",
        includedItems: "Circle T SSS 高尔夫球标／纪念币一枚；指定商品记录未能确认包装。",
        seoTitle: "2026 Gallery Circle T SSS 高尔夫球标｜ScottyGoldenBell",
        seoDescription: "2026 Scotty Cameron Gallery Circle T SSS 黑粉配色高尔夫球标，参考成交价 250 美元。",
      },
    },
    images: [],
  },
];
