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
        <div className="mb-5 space-y-2 rounded-xl border border-yellow-400 bg-yellow-50 px-4 py-3 text-xs text-yellow-800 dark:border-yellow-500 dark:bg-yellow-950/40 dark:text-yellow-300">
          <p>
            <strong>Projet en développement</strong> — cette application n&apos;est
            pas encore stable. Des pertes de données ou des interruptions de
            service peuvent survenir.
          </p>
          <p>
            Vous pouvez{" "}
            <strong>tester sans créer de compte</strong> via le bouton
            &quot;Accès démo&quot; ci-dessous.
          </p>
        </div>
        {children}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-xs">
        En continuant, vous acceptez nos{" "}
        <Link
          href="/mentions-legales"
          className="hover:text-foreground underline underline-offset-4"
        >
          Conditions d&apos;utilisation
        </Link>
        .
      </p>
    </div>
  );
}
