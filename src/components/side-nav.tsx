"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, Settings2, Wallet, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Accueil", href: "/", icon: LayoutDashboard },
  { label: "Statistiques", href: "/stats", icon: BarChart2 },
  { label: "Budget", href: "/budget", icon: Wallet },
  { label: "Réglages", href: "/settings", icon: Settings2 },
] as const;

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-border fixed top-0 bottom-0 left-0 z-50 hidden w-56 flex-col gap-1 border-r px-3 py-6 md:flex">
      <div className="mb-6 flex items-center gap-2.5 px-3">
        <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold tracking-tight">BudgetApp</span>
      </div>

      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={isActive ? 2.5 : 1.75} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
