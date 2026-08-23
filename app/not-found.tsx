import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="content-hero shell"><p className="eyebrow">404 / Archive record not found</p><h1>Nothing is catalogued here.</h1><p><Link className="button button-dark" href="/zh-hant">Return to collection</Link></p></main>;
}
