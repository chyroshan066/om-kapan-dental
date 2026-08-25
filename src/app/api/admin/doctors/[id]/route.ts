import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";
import { cloudinary } from "@/utils/cloudinary";

// img/public_id are optional here: editing a doctor's name or
// qualification doesn't require re-uploading their photo. The two are
// only present together, when the admin actually replaced the photo
// (see .refine below) — the client uploads the new file to Cloudinary
// first, same as create, then sends the resulting pair here.
const editSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter a name.").max(150),
    qualification: z
      .string()
      .trim()
      .min(1, "Please enter a qualification.")
      .max(200),
    nmc_no: z.string().trim().min(1, "Please enter an NMC number.").max(30),
    img: z.string().url().optional(),
    public_id: z.string().min(1).optional(),
  })
  .refine((data) => Boolean(data.img) === Boolean(data.public_id), {
    message: "img and public_id must be provided together.",
  });

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = editSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input." },
      { status: 400 }
    );
  }

  const { name, qualification, nmc_no, img, public_id } = parsed.data;

  // If the photo is being replaced, grab the outgoing public_id first so
  // the now-orphaned Cloudinary asset can be cleaned up after the row
  // update succeeds.
  const previous = img
    ? await sql`select public_id from doctors where id = ${id}`
    : null;

  const rows = img
    ? await sql`
        update doctors
        set name = ${name}, qualification = ${qualification}, nmc_no = ${nmc_no},
            img = ${img}, public_id = ${public_id}
        where id = ${id}
        returning id, name, qualification, nmc_no, img, public_id, display_order, created_at
      `
    : await sql`
        update doctors
        set name = ${name}, qualification = ${qualification}, nmc_no = ${nmc_no}
        where id = ${id}
        returning id, name, qualification, nmc_no, img, public_id, display_order, created_at
      `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Doctor not found." }, { status: 404 });
  }

  if (previous && previous[0] && previous[0].public_id !== public_id) {
    // Best-effort — see the same pattern in the gallery DELETE route.
    // The row is already updated; a failed cleanup here shouldn't fail
    // the whole request over an orphaned remote file.
    try {
      await cloudinary.uploader.destroy(previous[0].public_id, {
        resource_type: "image",
      });
    } catch {
      // Intentionally swallowed — see comment above.
    }
  }

  return NextResponse.json({ doctor: rows[0] });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const rows = await sql`
    delete from doctors where id = ${id} returning public_id
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Doctor not found." }, { status: 404 });
  }

  try {
    await cloudinary.uploader.destroy(rows[0].public_id, {
      resource_type: "image",
    });
  } catch {
    // Intentionally swallowed — see comment above.
  }

  return NextResponse.json({ success: true });
}