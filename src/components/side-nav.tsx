"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, Settings2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Accueil", href: "/", icon: LayoutDashboard },
  { label: "Stats", href: "/stats", icon: BarChart2 },
  { label: "Budget", href: "/budget", icon: Wallet },
  { label: "Réglages", href: "/settings", icon: Settings2 },
] as const;

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-border fixed top-0 bottom-0 left-0 z-50 hidden w-16 flex-col items-center gap-1 border-r py-6 md:flex">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={cn(
              "flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-xl transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.75} />
            <span className="text-[9px] font-medium tracking-wide">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
