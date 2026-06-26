"use client";

import { usePathname } from "next/navigation";

export function HideOnBooking({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.includes("/booking")) return null;
  return children;
}
