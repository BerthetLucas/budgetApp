import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col overflow-hidden bg-zinc-950 lg:flex">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/30 blur-3xl" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-purple-500/15 blur-2xl" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white">
              Budget
            </span>
          </div>

          <div className="mt-auto">
            <blockquote className="space-y-3">
              <p className="text-2xl leading-snug font-semibold text-white">
                Prenez le contrôle de vos finances, un budget à la fois.
              </p>
              <footer className="text-sm text-white/50">
                Suivez vos dépenses, anticipez vos revenus.
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="bg-background flex min-h-screen flex-col">
        <div className="flex items-center gap-2 border-b p-6 lg:hidden">
          <div className="bg-foreground/10 flex h-7 w-7 items-center justify-center rounded-md">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Budget</span>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        <p className="text-muted-foreground px-6 pb-6 text-center text-xs">
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
    </div>
  );
}
