import Link from "next/link";

export default function LocalizedNotFound() { return <section className="content-hero shell"><p className="eyebrow">404 / 未找到記錄</p><h1>此處沒有典藏記錄。</h1><p><Link className="button button-dark" href="/zh-hant/collection">返回珍藏</Link></p></section>; }
