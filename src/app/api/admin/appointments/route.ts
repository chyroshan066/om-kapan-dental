import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointments = await sql`
    select id, name, phone, message, appointment_date, appointment_time_label,
           appointment_time_minutes, status, created_at
    from appointments
    order by appointment_date asc, appointment_time_minutes asc
  `;

  return NextResponse.json({ appointments });
}