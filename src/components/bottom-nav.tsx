"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, Settings2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Accueil", href: "/", icon: LayoutDashboard },
  { label: "Statistiques", href: "/stats", icon: BarChart2 },
  { label: "Budget", href: "/budget", icon: Wallet },
  { label: "Réglages", href: "/settings", icon: Settings2 },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-border fixed right-0 bottom-0 left-0 z-50 h-16 border-t md:hidden">
      <div className="mx-auto flex h-full max-w-md items-center">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-full flex-1 flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.75} />
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
