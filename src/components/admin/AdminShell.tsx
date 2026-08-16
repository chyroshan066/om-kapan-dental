"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

interface AdminShellProps {
  email: string;
  children: React.ReactNode;
}

export function AdminShell({ email, children }: AdminShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
          email={email}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 px-4 sm:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}