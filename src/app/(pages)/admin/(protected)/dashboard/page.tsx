import { sql } from "@/utils/db";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [{ count: totalCount }] = await sql`
    select count(*)::int as count from appointments
  `;
  const [{ count: newCount }] = await sql`
    select count(*)::int as count from appointments where status = 'new'
  `;

  return (
    <div>
      <h1 className="text-slate-800 text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 max-w-xl">
        <div className="bg-white rounded-3xl p-6 border border-gray-100">
          <p className="text-xs font-bold text-primary mb-2">
            TOTAL APPOINTMENTS
          </p>
          <p className="text-slate-800 text-4xl font-bold">{totalCount}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100">
          <p className="text-xs font-bold text-primary mb-2">NEW REQUESTS</p>
          <p className="text-slate-800 text-4xl font-bold">{newCount}</p>
        </div>
      </div>

      <Link
        href="/admin/appointments"
        className="inline-flex items-center gap-x-2 h-12 px-6 bg-primary text-white text-sm font-bold rounded-xl transition-colors hover:bg-indigo-800"
      >
        View all appointments
      </Link>
    </div>
  );
}