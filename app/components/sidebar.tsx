"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LogOut, CalendarDays, History } from "lucide-react";
import { signOut } from "next-auth/react";

export function AppSidebar() {
  const pathname = usePathname();

  const handleSignout = async () => {
    await signOut({
      callbackUrl: "/signin",
      redirect: true,
    });
  };
  return (
    <Sidebar>
      <SidebarHeader className="mt-3 pl-7"></SidebarHeader>
      <SidebarContent className="mt-10 p-4">
        <SidebarGroup>
          <Link href="/">
            <div
              className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg cursor-pointer ${
                pathname === "/" ? "bg-white/10" : "hover:bg-white/10"
              }`}
            >
              <CalendarDays size={14} />
              <span className="font-semibold text-sm">Tasks</span>
            </div>
          </Link>
          <Link href="/previous">
            <div
              className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg cursor-pointer ${
                pathname === "/previous" ? "bg-white/10" : "hover:bg-white/10"
              }`}
            >
              <History size={14} />
              <span className="font-semibold text-sm">Previous Logs</span>
            </div>
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div
          onClick={handleSignout}
          className="flex items-center gap-2 px-3 py-2 text-white rounded-lg cursor-pointer hover:bg-white/10"
        >
          <LogOut size={14} />
          <span className="font-semibold text-sm">Logout</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
