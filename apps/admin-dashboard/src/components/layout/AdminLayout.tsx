import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/common/Sidebar";
import { UserButton } from "@clerk/react";
import { useBootStrapAuth } from "@/features/auth/useBootstrapAuth";

function AdminLayout() {
  useBootStrapAuth();
  return (
    <div className="min-h-screen bg-secondary/40 text-foreground">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border px-4 backdrop-blur-2xl lg:px-6">
            <div className="ml-auto flex items-center gap-2">
              <UserButton />
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
