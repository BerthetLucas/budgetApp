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
    <div className="bg-muted/30 min-h-screen">
      <main className={`mx-auto max-w-md px-4 ${paddingBottom}`}>
        <div className="flex items-start justify-between pt-10 pb-6">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
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
