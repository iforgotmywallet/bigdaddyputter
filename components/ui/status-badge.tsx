import type { PutterStatus } from "@/lib/types";

export function StatusBadge({ status, label }: { status: PutterStatus; label: string }) {
  return <span className={`status status-${status}`}><i aria-hidden="true" />{label}</span>;
}
