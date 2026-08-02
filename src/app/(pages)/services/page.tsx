import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "./components/ServicesGrid";
import { SERVICES } from "@/constants";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.omkapandentalktm.com.np";

export const metadata: Metadata = {
  title: "Our Dental Services | Om Kapan Dental",
  description:
    "Explore the full range of dental treatments at Om Kapan Dental in Kapan Bhrikuti Chowk, Kathmandu — from checkups, scaling, and whitening to implants, root canals, orthodontics, and oral surgery, all delivered with modern, patient-friendly care.",
  keywords: [
    "dental services Kathmandu",
    "dental services kapan",
    "dental services boudha",
    "dental services bhrikuti chowk",
    "dental checkup",
    "dental x-ray Kathmandu",
    "teeth scaling",
    "teeth whitening kapan",
    "teeth whitening boudha",
    "teeth whitening bhrikuti chowk",
    "composite filling",
    "root canal treatment Kathmandu",
    "dental implants kapan",
    "dental implants boudha",
    "dental implants bhrikuti chowk",
    "orthodontic treatment Kathmandu",
    "crowns and bridges Nepal",
    "tooth extraction Kathmandu",
    "gum surgery kapan",
    "gum surgery boudha",
    "gum surgery bhrikuti chowk",
    "pediatric dentistry Kathmandu",
    "oral cancer screening Nepal",
    "Om Kapan Dental services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Dental Services | Om Kapan Dental",
    description:
      "From routine checkups to advanced surgical procedures — see the complete list of treatments offered at Om Kapan Dental, Kapan Bhrikuti Chowk, Kathmandu.",
    type: "website",
    locale: "en_US",
    url: `${baseURL}/services`,
    siteName: "Om Kapan Dental",
    images: [
      {
        url: `${baseURL}/images/preview.webp`,
        width: 1200,
        height: 630,
        alt: "Om Kapan Dental Services",
      },
    ],
  },
};

export default function ServicePage() {
  return (
    <>
      {/* JSON-LD: list of services for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: SERVICES.map((service, index) => ({
              "@type": "MedicalProcedure",
              position: index + 1,
              name: service.name,
            })),
          }),
        }}
      />

      <section className="section mb-32 pt-16 lg:pt-20">
        <div className="container">
          <div className="flex flex-col gap-14 lg:gap-y-16 xl:gap-y-20">
            {/* Page Header */}
            <div className="flex flex-col items-center text-center gap-y-4">
              {/* Eyebrow */}
              <h3 className="text-sm text-primary font-bold">OUR SERVICES</h3>
              {/* Heading */}
              <h1 className="text-slate-800 text-3xl xs:text-4xl lg:text-5xl max-w-2xl leading-snug xs:leading-snug lg:leading-snug font-bold">
                Complete dental care, all under one roof
              </h1>
              {/* Subtitle */}
              <p className="max-w-screen-xs lg:max-w-screen-sm text-[15px] font-medium text-slate-800/70">
                From routine checkups to advanced surgical procedures, our
                experienced team uses modern techniques to keep every
                treatment comfortable, effective, and tailored to you.
              </p>
            </div>

            {/* Full Services Grid */}
            <ServicesGrid />
          </div>
        </div>
      </section>
    </>
  );
}