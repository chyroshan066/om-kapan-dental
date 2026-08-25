import { sql } from "@/utils/db";
import type { DoctorRecord } from "@/types/doctor";
import { DoctorsManager } from "@/components/admin/DoctorsManager";

export default async function AdminDoctorsPage() {
  const doctors = (await sql`
    select id, name, qualification, nmc_no, img, public_id, display_order, created_at
    from doctors
    order by display_order asc, created_at asc
  `) as DoctorRecord[];

  return (
    <div>
      <h1
        className="text-slate-800 text-3xl font-bold"
        style={{ marginBottom: "40px" }}
      >
        Doctors
      </h1>
      <DoctorsManager initialDoctors={doctors} />
    </div>
  );
}