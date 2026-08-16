"use client";

import { useState } from "react";
import { CalendarBlank, Clock, Phone } from "@phosphor-icons/react";
import type { Appointment, AppointmentStatus } from "@/types/appointment";
import { StatusDropdown } from "@/components/admin/StatusDropdown";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  new: "bg-primary/10 text-primary",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-200 text-slate-600",
  cancelled: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_OPTIONS: AppointmentStatus[] = [
  "new",
  "confirmed",
  "completed",
  "cancelled",
];

function formatDate(rawDate: Appointment["appointment_date"]) {
  // Neon's driver returns SQL `date` columns as native Date objects, not
  // strings — despite what a naive server-side type might suggest. Handle
  // both so this doesn't silently produce "Invalid Date".
  const date =
    rawDate instanceof Date ? rawDate : new Date(`${rawDate}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AppointmentsView({
  initialAppointments,
}: {
  initialAppointments: Appointment[];
}) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | AppointmentStatus>("all");

  const visibleAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const handleStatusChange = async (
    id: string,
    status: AppointmentStatus
  ) => {
    setUpdatingId(id);
    const previous = appointments;

    // Optimistic update — revert if the request fails.
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );

    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch {
      setAppointments(previous);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex flex-wrap"
        style={{ gap: "10px", marginBottom: "32px" }}
      >
        {(["all", ...STATUS_OPTIONS] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            style={{ padding: "10px 20px" }}
            className={`rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              filter === option
                ? "bg-primary text-white"
                : "bg-white text-slate-600 border border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {option === "all" ? "All" : STATUS_LABELS[option]}
          </button>
        ))}
      </div>

      {visibleAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center">
          <p className="text-slate-800/60 text-sm">
            No appointments here yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {visibleAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6"
            >
              {/* Identity + message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-x-2 flex-wrap mb-1">
                  <p className="font-bold text-slate-800">
                    {appointment.name}
                  </p>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      STATUS_STYLES[appointment.status]
                    }`}
                  >
                    {STATUS_LABELS[appointment.status]}
                  </span>
                </div>
                <p className="flex items-center gap-x-1.5 text-sm text-slate-800/60 mb-1">
                  <Phone className="w-4 h-4" /> {appointment.phone}
                </p>
                <p className="text-sm text-slate-800/70">
                  {appointment.message}
                </p>
              </div>

              {/* Date / time */}
              <div className="flex lg:flex-col gap-4 lg:gap-1 shrink-0 lg:w-48">
                <p className="flex items-center gap-x-1.5 text-sm font-medium text-slate-800">
                  <CalendarBlank className="w-4 h-4 text-primary" />
                  {formatDate(appointment.appointment_date)}
                </p>
                <p className="flex items-center gap-x-1.5 text-sm font-medium text-slate-800">
                  <Clock className="w-4 h-4 text-primary" />
                  {appointment.appointment_time_label}
                </p>
              </div>

              {/* Status control */}
              <div className="shrink-0">
                <StatusDropdown
                  value={appointment.status}
                  disabled={updatingId === appointment.id}
                  onChange={(status) =>
                    handleStatusChange(appointment.id, status)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}