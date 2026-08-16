import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";
import { cloudinary } from "@/utils/cloudinary";
import { GALLERY_CATEGORIES } from "@/types/gallery";

const editSchema = z.object({
  alt: z.string().trim().min(1, "Please enter a description.").max(200),
  category: z.enum(
    GALLERY_CATEGORIES as [string, ...string[]]
  ),
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

  const rows = await sql`
    update gallery_images
    set alt = ${parsed.data.alt}, category = ${parsed.data.category}
    where id = ${id}
    returning id, src, public_id, alt, category, created_at
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  return NextResponse.json({ image: rows[0] });
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
    delete from gallery_images where id = ${id} returning public_id
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  // DB row is already gone at this point — if the Cloudinary deletion
  // fails, we don't want to block/fail the whole request over an orphaned
  // remote file. Worth revisiting with a cleanup job if this matters later.
  try {
    await cloudinary.uploader.destroy(rows[0].public_id);
  } catch {
    // Intentionally swallowed — see comment above.
  }

  return NextResponse.json({ success: true });
}