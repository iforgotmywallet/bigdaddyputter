import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/auth/session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) { await requireAdmin(); return <div className="admin-shell"><AdminNav /><section className="admin-main">{children}</section></div>; }
