import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { SideNav } from "@/components/side-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SideNav />
      <div className="md:px-16">{children}</div>
      <BottomNav />
    </>
  );
}
