"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquaresFour, CalendarCheck } from "@phosphor-icons/react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: SquaresFour },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white border-r border-gray-100 px-4 py-6">
      <div className="flex items-center gap-x-2 px-2 mb-8">
        <img
          style={{ height: "32px", width: "auto", objectFit: "contain" }}
          src="/images/logo.webp"
          alt="Om Kapan Dental"
        />
        <span className="text-slate-800 font-bold text-base">Admin</span>
      </div>

      <nav className="flex flex-col gap-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5" weight="bold" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}