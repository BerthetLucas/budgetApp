export default function Loading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-md mx-auto px-4 pb-24">
        <div className="pt-10 pb-6">
          <div className="h-3 w-24 bg-muted animate-pulse rounded mb-2" />
          <div className="h-7 w-36 bg-muted animate-pulse rounded" />
        </div>
        <div className="rounded-3xl bg-foreground/10 animate-pulse h-44 mb-4" />
        <div className="space-y-3 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
