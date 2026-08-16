import { sql } from "@/utils/db";
import type { GalleryImageRecord } from "@/types/gallery";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const images = (await sql`
    select id, src, public_id, alt, category, created_at
    from gallery_images
    order by created_at desc
  `) as GalleryImageRecord[];

  return (
    <div>
      <h1
        className="text-slate-800 text-3xl font-bold"
        style={{ marginBottom: "40px" }}
      >
        Gallery
      </h1>
      <GalleryManager initialImages={images} />
    </div>
  );
}