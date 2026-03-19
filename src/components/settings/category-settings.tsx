import { Category } from "@/types";
import { ManageCategoriesDrawer } from "./manage-categories-drawer";

interface CategorySettingsProps {
  initialData: Category[];
}

export function CategorySettings({ initialData }: CategorySettingsProps) {
  return (
    <div className="bg-card flex items-center justify-between rounded-3xl px-4 py-5">
      <div>
        <h2 className="text-base font-semibold">Catégories</h2>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {initialData.length > 0
            ? `${initialData.length} catégorie${initialData.length > 1 ? "s" : ""} personnalisée${initialData.length > 1 ? "s" : ""}`
            : "Aucune catégorie personnalisée"}
        </p>
      </div>
      <ManageCategoriesDrawer initialData={initialData} />
    </div>
  );
}
