export function BudgetSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-44 animate-pulse rounded-3xl bg-foreground/10" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-28 animate-pulse rounded-3xl bg-foreground/10" />
        <div className="h-28 animate-pulse rounded-3xl bg-foreground/10" />
      </div>
      <div className="h-20 animate-pulse rounded-3xl bg-foreground/10" />
    </div>
  );
}
