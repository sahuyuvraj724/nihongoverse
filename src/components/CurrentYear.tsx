"use client";

import { useEffect, useState } from "react";

/* Tiny client component so the footer year is computed in the browser.
   The date is read inside useEffect (not during render) because Next.js
   static prerendering requires deterministic renders.
   The eslint-disable below is intentional: this effect runs once on mount,
   sets state exactly once, and cannot cascade — it is the pattern Next.js
   itself prescribes for client-only values. */

export default function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? "2026"}</>;
}
