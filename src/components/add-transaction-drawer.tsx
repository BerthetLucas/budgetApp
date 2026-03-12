"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transaction-form";

export function AddTransactionDrawer() {
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
        <div className="max-w-md mx-auto w-full px-4 pb-8">
          <DrawerHeader className="px-0">
            <DrawerTitle>Nouvelle transaction</DrawerTitle>
          </DrawerHeader>
          <TransactionForm onSuccess={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
