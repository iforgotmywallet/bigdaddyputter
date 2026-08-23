import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePutterAction, duplicatePutterAction } from "@/app/admin/actions";
import { PutterForm } from "@/components/admin/putter-form";
import { getAdminPutterEditor } from "@/db/queries/admin";

export default async function EditPutterPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const record = await getAdminPutterEditor(id); if (!record) notFound(); return <><header className="admin-page-header"><div><p className="eyebrow">Catalogue / Edit</p><h1>{record.brand} {record.model}</h1></div><Link className="admin-secondary" href={`/en/collection/${record.slug}`} target="_blank">Preview ↗</Link></header><PutterForm data={record} /><section className="admin-danger"><div><h2>Record actions</h2><p>Duplicated records start private. Deletion requires the exact slug.</p></div><form action={duplicatePutterAction}><input type="hidden" name="id" value={id} /><button type="submit">Duplicate</button></form><form action={deletePutterAction}><input type="hidden" name="id" value={id} /><input type="hidden" name="slug" value={record.slug} /><input name="confirmation" placeholder={`Type ${record.slug}`} /><button type="submit">Delete</button></form></section></>; }
