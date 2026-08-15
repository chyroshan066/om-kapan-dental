import { LogoutButton } from "@/components/utility/LogoutButton";

export function AdminTopbar({ email }: { email: string }) {
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-100 px-4 sm:px-8 py-4">
      <p className="text-sm text-slate-800/60">
        Signed in as <span className="font-bold text-slate-800">{email}</span>
      </p>
      <LogoutButton />
    </div>
  );
}