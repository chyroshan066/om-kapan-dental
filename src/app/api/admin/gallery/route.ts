import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/utils/db";
import { getAdminSession } from "@/utils/auth";
import { cloudinary } from "@/utils/cloudinary";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import type { GalleryCategory } from "@/types/gallery";

// Kept comfortably under Vercel's ~4.5MB request body ceiling for
// serverless functions.
const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const images = await sql`
    select id, src, public_id, alt, category, created_at
    from gallery_images
    order by created_at desc
  `;

  return NextResponse.json({ images });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  const alt = formData.get("alt")?.toString().trim();
  const category = formData.get("category")?.toString();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose a photo." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image." }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "Image must be under 4MB." },
      { status: 400 }
    );
  }
  if (!alt) {
    return NextResponse.json(
      { error: "Please enter a description for the photo." },
      { status: 400 }
    );
  }
  if (!category || !GALLERY_CATEGORIES.includes(category as GalleryCategory)) {
    return NextResponse.json({ error: "Please choose a category." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResult = await new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "om-kapan-dental/gallery" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  }).catch(() => null);

  if (!uploadResult) {
    return NextResponse.json(
      { error: "Upload to Cloudinary failed. Please try again." },
      { status: 502 }
    );
  }

  const rows = await sql`
    insert into gallery_images (src, public_id, alt, category)
    values (${uploadResult.secure_url}, ${uploadResult.public_id}, ${alt}, ${category})
    returning id, src, public_id, alt, category, created_at
  `;

  return NextResponse.json({ image: rows[0] });
}