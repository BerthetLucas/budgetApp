"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RecurringTransactionForm } from "@/components/settings/recurring-transaction-form/recurring-transaction-form";

interface AddRecurringDrawerProps {
  customCategories?: string[];
}

export function AddRecurringDrawer({ customCategories }: AddRecurringDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="pill" size="pill">
          <Plus className="h-5 w-5" />
          Ajouter
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md px-4 pb-8">
          <DrawerHeader className="flex flex-row items-center justify-between px-0">
            <DrawerTitle>Nouvelle transaction récurrente</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 border-border shadow-[2px_2px_0_0_var(--shadow-hard)]">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <RecurringTransactionForm onSuccess={() => setOpen(false)} customCategories={customCategories} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
