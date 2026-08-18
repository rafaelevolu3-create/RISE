"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldHalf, Trophy, Gem, ScrollText } from "lucide-react";

const sideName = process.env.NEXT_PUBLIC_SIDE_NAME || "RISE";

const LINKS = [
  { href: "/", label: "Ranking", icon: Trophy },
  { href: "/epics", label: "Epics", icon: Gem },
  { href: "/regras", label: "Regras", icon: ScrollText },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 -mx-4 mb-2 flex items-center justify-between border-b border-surface-border/70 bg-surface-0/85 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-series-blue/40 bg-series-blue/10 text-series-blue">
          <ShieldHalf size={20} strokeWidth={2.2} />
        </span>
        <span className="font-display text-lg font-semibold tracking-wider text-ink-primary">
          {sideName}
          <span className="text-series-blue"> STATS</span>
        </span>
      </Link>

      <nav className="flex items-center gap-1 rounded-full border border-surface-border bg-surface-2/70 p-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                active
                  ? "bg-series-blue text-white shadow-card"
                  : "text-ink-secondary hover:bg-surface-3 hover:text-ink-primary"
              }`}
            >
              <Icon size={15} strokeWidth={2.2} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
