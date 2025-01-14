import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar";
import TopNavbar from "../components/topNavbar";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <TopNavbar />
        {children}
      </SidebarProvider>
    </>
  );
}
