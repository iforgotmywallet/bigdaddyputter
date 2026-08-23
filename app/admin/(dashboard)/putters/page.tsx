import Link from "next/link";
import { getAdminPutters } from "@/db/queries/admin";

export default async function AdminPuttersPage() { const records = await getAdminPutters(); return <><header className="admin-page-header"><div><p className="eyebrow">Catalogue / {records.length} records</p><h1>Putters</h1></div><Link className="admin-primary" href="/admin/putters/new">New putter</Link></header><div className="admin-table admin-putter-table">{records.map((putter) => <Link className="admin-table-row" href={`/admin/putters/${putter.id}`} key={putter.id}><span>{putter.brand}</span><strong>{putter.model}</strong><i>{putter.status}</i><i>{putter.isPublished ? "Published" : "Draft"}</i><time>{putter.updatedAt.toLocaleDateString("en-HK")}</time></Link>)}</div></>; }
