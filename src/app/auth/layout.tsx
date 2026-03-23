import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-2xl">
          <TrendingUp className="h-7 w-7 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight">BudgetApp</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Gérez vos finances simplement
          </p>
        </div>
      </div>

      <div className="bg-card w-full max-w-sm rounded-2xl border border-[#191d17] p-8 shadow-[4px_4px_0_0_#191d17]">
        {children}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-xs">
        En continuant, vous acceptez nos{" "}
        <Link
          href="#"
          className="hover:text-foreground underline underline-offset-4"
        >
          Conditions d&apos;utilisation
        </Link>
        .
      </p>
    </div>
  );
}
