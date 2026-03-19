"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <TriangleAlert className="text-destructive mx-auto h-10 w-10" />
        <h2 className="text-lg font-semibold">Une erreur est survenue</h2>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <Button onClick={reset}>Réessayer</Button>
      </div>
    </div>
  );
}
