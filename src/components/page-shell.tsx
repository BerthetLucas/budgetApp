import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface PageShellProps {
  label: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  paddingBottom?: "pb-20" | "pb-24";
}

export function PageShell({
  label,
  title,
  children,
  footer,
  paddingBottom = "pb-20",
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <main className={`max-w-md mx-auto px-4 ${paddingBottom}`}>
        <div className="pt-10 pb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              {label}
            </p>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          </div>
          <ThemeToggle />
        </div>
        {children}
      </main>
      {footer}
    </div>
  );
}
