// export type AppointmentStatus = "new" | "confirmed" | "completed" | "cancelled";

// export interface Appointment {
//   id: string;
//   name: string;
//   phone: string;
//   message: string;
//   appointment_date: string; // ISO date, e.g. "2026-08-20"
//   appointment_time_label: string; // e.g. "09:00 AM"
//   appointment_time_minutes: number; // minutes since midnight, for sorting
//   status: AppointmentStatus;
//   created_at: string;
// }
















export type AppointmentStatus = "new" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  message: string;
  // Typed as string | Date rather than just string: Neon's driver (like
  // node-postgres, which it mirrors) auto-parses SQL `date` columns into
  // native JS Date objects. Consumers must handle both — see formatDate()
  // in AppointmentsView.tsx.
  appointment_date: string | Date;
  appointment_time_label: string; // e.g. "09:00 AM"
  appointment_time_minutes: number; // minutes since midnight, for sorting
  status: AppointmentStatus;
  created_at: string;
}