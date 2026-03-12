export function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}
