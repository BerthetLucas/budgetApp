"use client";

import { useState, useOptimistic, useTransition } from "react";
import { Settings2, Folder, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AddCategoryForm } from "./add-category-form";
import { CategoryRow } from "./category-row";
import { deleteCategory } from "@/actions/categories";
import { Category } from "@/types";
import {
  CATEGORY_ICON,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "@/constants/categories";

interface ManageCategoriesDrawerProps {
  initialData: Category[];
}

const DEFAULT_CATEGORIES = [
  ...INCOME_CATEGORIES.map((name) => ({ name, type: "income" as const })),
  ...EXPENSE_CATEGORIES.map((name) => ({ name, type: "expense" as const })),
];

export function ManageCategoriesDrawer({
  initialData,
}: ManageCategoriesDrawerProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [list, removeFromList] = useOptimistic(
    initialData,
    (current, idToRemove: string) =>
      current.filter((item) => item.id !== idToRemove)
  );

  function handleDelete(id: string) {
    startTransition(async () => {
      removeFromList(id);
      await deleteCategory(id);
    });
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="pill" size="pill">
          <Settings2 className="h-4 w-4" />
          Gérer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="flex flex-row items-center justify-between px-4">
            <DrawerTitle>Gérer les catégories</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 border-[#191d17] shadow-[2px_2px_0_0_#191d17]">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <AddCategoryForm />

          <div className="divide-border max-h-80 divide-y overflow-y-auto">
            {DEFAULT_CATEGORIES.map(({ name, type }) => {
              const Icon = CATEGORY_ICON[name] ?? Folder;
              return (
                <div
                  key={`${type}-${name}`}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {type === "income" ? "Revenu" : "Dépense"} · par défaut
                    </p>
                  </div>
                </div>
              );
            })}

            <AnimatePresence>
              {list.map((item) => (
                <CategoryRow
                  key={item.id}
                  category={item}
                  isPending={isPending}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="h-8" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
