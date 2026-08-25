import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doctors = await sql`
    select id, name, qualification, nmc_no, img, public_id, display_order, created_at
    from doctors
    order by display_order asc, created_at asc
  `;

  return NextResponse.json({ doctors });
}

// Same split as gallery: the photo itself is uploaded client-side straight
// to Cloudinary (see /api/admin/doctors/upload-signature) so this route
// only ever receives the resulting URL/public_id to persist in Neon.
const createSchema = z.object({
  name: z.string().trim().min(1, "Please enter a name.").max(150),
  qualification: z.string().trim().min(1, "Please enter a qualification.").max(200),
  nmc_no: z.string().trim().min(1, "Please enter an NMC number.").max(30),
  img: z.string().url(),
  public_id: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input." },
      { status: 400 }
    );
  }

  const { name, qualification, nmc_no, img, public_id } = parsed.data;

  // New doctors are appended to the end of the carousel: display_order is
  // computed as one past whatever the current highest value is, rather
  // than being set by the client. The insert...select form runs that
  // aggregate over the existing rows in the same query — coalesce covers
  // the empty-table case (max is null) so the first doctor gets order 0.
  const rows = await sql`
    insert into doctors (name, qualification, nmc_no, img, public_id, display_order)
    select ${name}, ${qualification}, ${nmc_no}, ${img}, ${public_id},
           coalesce(max(display_order), -1) + 1
    from doctors
    returning id, name, qualification, nmc_no, img, public_id, display_order, created_at
  `;

  return NextResponse.json({ doctor: rows[0] });
}