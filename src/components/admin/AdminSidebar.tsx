"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  CalendarCheck,
  Images,
  IdentificationBadge,
  X,
} from "@phosphor-icons/react";
import { useClickOutside } from "@/hooks/useClickOutside";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: SquaresFour },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
  { name: "Doctors", href: "/admin/doctors", icon: IdentificationBadge },
  { name: "Gallery", href: "/admin/gallery", icon: Images },
];

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string | null;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
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
  );
}

function SidebarBrand() {
  return (
    <div className="flex items-center gap-x-2 px-2">
      <img
        style={{ height: "32px", width: "auto", objectFit: "contain" }}
        src="/images/logo.webp"
        alt="Om Kapan Dental"
      />
      <span className="text-slate-800 font-bold text-base">Admin</span>
    </div>
  );
}

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isMobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const mobileSidebarRef = useRef<HTMLElement>(null);

  useClickOutside(mobileSidebarRef, onClose, isMobileOpen);

  return (
    <>
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white border-r border-gray-100 px-4 py-6">
        <div className="mb-8">
          <SidebarBrand />
        </div>
        <SidebarNav pathname={pathname} />
      </aside>

      <div
        className={`${
          isMobileOpen ? "" : "hidden"
        } fixed inset-0 bg-black/40 transition-all z-40 md:hidden pointer-events-none`}
      />
      <aside
        ref={mobileSidebarRef}
        className={`w-72 bg-white fixed top-0 ${
          isMobileOpen ? "left-0" : "-left-72"
        } bottom-0 z-50 flex flex-col px-4 py-6 border-r border-gray-100 transition-all md:hidden`}
      >
        <div className="flex items-center justify-between mb-8">
          <SidebarBrand />
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" weight="bold" />
          </button>
        </div>
        <SidebarNav pathname={pathname} onNavigate={onClose} />
      </aside>
    </>
  );
}