import Link from "next/link";
import { CalendarRange, Home, Map, Settings, Shield } from "lucide-react";

const items = [
  { href: "/admin/bookings", label: "Bookings", icon: CalendarRange },
  { href: "/admin/blocks", label: "Calendar", icon: Shield },
  { href: "/admin/guide", label: "Guide", icon: Map },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/en", label: "Site", icon: Home },
];

export function AdminNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-ink/10 bg-shell px-3 py-2 text-sm font-semibold text-ink/75 transition hover:border-ink/30 hover:text-ink"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
