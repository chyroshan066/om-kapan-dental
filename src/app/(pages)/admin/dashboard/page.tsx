import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/utils/auth";
import { LogoutButton } from "@/components/utility/LogoutButton";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  // Belt-and-suspenders: middleware already redirects unauthenticated
  // requests, but this keeps the page safe even if middleware config
  // ever changes.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex-1 bg-gray-50 px-4 py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-slate-800 text-3xl font-bold">
              Admin Dashboard
            </h1>
            <p className="text-slate-800/60 text-sm mt-1">
              Signed in as {session.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-3xl p-8 border">
          <p className="text-slate-800/70 text-sm">
            This is a starting point — wire up whatever the admin needs to
            manage here (appointments, services, blog posts, etc.).
          </p>
        </div>
      </div>
    </div>
  );
}