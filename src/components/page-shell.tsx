import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface PageShellProps {
  label: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  headerAction?: ReactNode;
  paddingBottom?: "pb-20" | "pb-24";
}

export function PageShell({
  label,
  title,
  children,
  footer,
  headerAction,
  paddingBottom = "pb-20",
}: PageShellProps) {
  return (
    <div className="min-h-screen">
      <main
        className={`mx-auto max-w-md px-4 md:max-w-3xl md:px-10 md:pb-10 ${paddingBottom}`}
      >
        <div className="flex items-start justify-between pt-10 pb-6 md:pt-10 md:pb-8">
          <div>
            <p className="text-primary mb-1 text-xs font-medium tracking-widest uppercase">
              {label}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {headerAction}
            <ThemeToggle />
          </div>
        </div>
        {children}
      </main>
      {footer}
    </div>
  );
}
