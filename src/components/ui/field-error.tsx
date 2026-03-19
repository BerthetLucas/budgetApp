export function FieldError({ message }: { message?: string }) {
  return (
    <p className="min-h-[1.25rem] text-sm text-destructive">{message ?? ""}</p>
  );
}
