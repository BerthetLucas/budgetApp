interface TransactionDescriptionProps {
  description: string | null;
  category: string;
}

export function TransactionDescription({
  description,
  category,
}: TransactionDescriptionProps) {
  if (!description)
    return (
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-tight font-medium">{category}</p>
      </div>
    );

  return (
    <div className="min-w-0 flex-1">
      <p className="text-sm leading-tight font-medium">{category}</p>
      <p className="text-muted-foreground mt-0.5 truncate text-xs">
        {description}
      </p>
    </div>
  );
}
