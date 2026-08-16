import type { Metadata } from "next";
import { sql } from "@/utils/db";
import type { GalleryImageRecord } from "@/types/gallery";
import { GalleryGrid } from "./components/GalleryGrid";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.omkapandentalktm.com.np";

export const metadata: Metadata = {
  title: "Clinic Gallery | Om Kapan Dental",
  description:
    "Take a look inside Om Kapan Dental in Kapan Bhrikuti Chowk, Kathmandu — our clinic interior, treatment rooms, modern equipment, and the team behind your care.",
  keywords: [
    "Om Kapan Dental gallery",
    "dental clinic photos Kathmandu",
    "dental clinic photos kapan",
    "dental clinic photos boudha",
    "dental clinic photos bhrikuti chowk",
    "dental clinic interior Kathmandu",
    "dental treatment room Kathmandu",
    "dental equipment Kathmandu",
    "dentist office photos Nepal",
    "Om Kapan Dental clinic tour",
    "modern dental clinic Kathmandu",
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Clinic Gallery | Om Kapan Dental",
    description:
      "A look inside Om Kapan Dental's clinic, treatment rooms, and equipment in Kapan Bhrikuti Chowk, Kathmandu.",
    type: "website",
    locale: "en_US",
    url: `${baseURL}/gallery`,
    siteName: "Om Kapan Dental",
    images: [
      {
        url: `${baseURL}/images/preview.webp`,
        width: 1200,
        height: 630,
        alt: "Om Kapan Dental Clinic Gallery",
      },
    ],
  },
};

export default async function GalleryPage() {
  const images = (await sql`
    select id, src, public_id, alt, category, resource_type, created_at
    from gallery_images
    order by created_at desc
  `) as GalleryImageRecord[];

  return (
    <section className="section mb-32 pt-16 lg:pt-20">
      <div className="container">
        <div className="flex flex-col gap-14 lg:gap-y-16 xl:gap-y-20">
          {/* Page Header — same pattern as /services */}
          <div className="flex flex-col items-center text-center gap-y-4">
            {/* Eyebrow */}
            <h3 className="text-sm text-primary font-bold">OUR GALLERY</h3>
            {/* Heading */}
            <h1 className="text-slate-800 text-3xl xs:text-4xl lg:text-5xl max-w-2xl leading-snug xs:leading-snug lg:leading-snug font-bold">
              A closer look inside our clinic
            </h1>
            {/* Subtitle */}
            <p className="max-w-screen-xs lg:max-w-screen-sm text-[15px] font-medium text-slate-800/70">
              From our treatment rooms to the equipment and team behind every
              visit — see the space where your care happens.
            </p>
          </div>

          {/* Filterable gallery grid */}
          <GalleryGrid images={images} />
        </div>
      </div>
    </section>
  );
}