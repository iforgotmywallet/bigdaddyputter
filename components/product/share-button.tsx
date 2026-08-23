"use client";

import { useState } from "react";

export function ShareButton({ label, copied }: { label: string; copied: string }) {
  const [done, setDone] = useState(false);
  return <button className="text-button" type="button" onClick={async () => { await navigator.clipboard.writeText(window.location.href); setDone(true); setTimeout(() => setDone(false), 2000); }}>{done ? copied : label} ↗</button>;
}
