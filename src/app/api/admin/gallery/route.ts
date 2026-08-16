import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";
import { GALLERY_CATEGORIES } from "@/types/gallery";

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const images = await sql`
    select id, src, public_id, alt, category, resource_type, created_at
    from gallery_images
    order by created_at desc
  `;

  return NextResponse.json({ images });
}

// The actual file upload now happens client-side, directly to Cloudinary
// (see /api/admin/gallery/upload-signature) — this route only ever
// receives already-uploaded metadata to persist in Neon. This is what
// lets large images/videos bypass Vercel's ~4.5MB serverless request
// body limit entirely, since the file itself never touches this route.
const createSchema = z.object({
  src: z.string().url(),
  public_id: z.string().min(1),
  alt: z.string().trim().min(1, "Please enter a description.").max(200),
  category: z.enum(GALLERY_CATEGORIES as [string, ...string[]]),
  resource_type: z.enum(["image", "video"]).default("image"),
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

  const { src, public_id, alt, category, resource_type } = parsed.data;

  const rows = await sql`
    insert into gallery_images (src, public_id, alt, category, resource_type)
    values (${src}, ${public_id}, ${alt}, ${category}, ${resource_type})
    returning id, src, public_id, alt, category, resource_type, created_at
  `;

  return NextResponse.json({ image: rows[0] });
}