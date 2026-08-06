"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="h-11 px-6 bg-primary text-white text-sm font-bold rounded-xl transition-colors hover:bg-indigo-800 disabled:opacity-60"
    >
      {isLoading ? "Signing out..." : "Log out"}
    </button>
  );
}