import { sql } from "@/utils/db";
import type { Appointment } from "@/types/appointment";
import { AppointmentsView } from "@/components/admin/AppointmentsView";

export default async function AdminAppointmentsPage() {
  const appointments = (await sql`
    select id, name, phone, message, appointment_date, appointment_time_label,
           appointment_time_minutes, status, created_at
    from appointments
    order by created_at desc
  `) as Appointment[];

  return (
    <div>
      <h1
        className="text-slate-800 text-3xl font-bold"
        style={{ marginBottom: "30px" }}
      >
        Appointments
      </h1>
      <AppointmentsView initialAppointments={appointments} />
    </div>
  );
}