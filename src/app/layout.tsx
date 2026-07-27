import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnalyticsWrapper from "@/utils/AnalyticsWrapper";
import { eudoxusSans } from "./fonts";
import Script from "next/script";
import { IconSprite } from "@/components/utility/IconSprite";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.omkapandentalktm.com.np";

export const metadata: Metadata = {
  title: "Om Kapan Dental - Advanced Dental Care in Nepal",
  description:
    "Om Kapan Dental offers comprehensive dental care in Tripureshwor, Kathmandu, Nepal. Expert dentists providing treatments such as dental implants, braces, root canal therapy, cosmetic dentistry, teeth whitening, and preventive oral care in a modern, comfortable clinic.",
  keywords: [
    "Om Kapan Dental",
    "dental clinic",
    "dentist Kathmandu",
    "dentist tripureshwor",
    "dental implants Kathmandu",
    "dental implants tripureshwor",
    "braces Kathmandu",
    "braces tripureshwor",
    "cosmetic dentistry Kathmandu",
    "cosmetic dentistry tripureshwor",
    "root canal Kathmandu",
    "root canal tripureshwor",
    "teeth whitening Kathmandu",
    "teeth whitening tripureshwor",
    "orthodontics Kathmandu",
    "orthodontics tripureshwor",
    "best dentist Kathmandu",
    "best dentist tripureshwor",
    "dental care Nepal",
    "oral surgery Kathmandu",
    "oral surgery tripureshwor",
    "family dentist Kathmandu",
    "family dentist tripureshwor",
    "tooth extraction Kathmandu",
    "tooth extraction tripureshwor",
    "dental checkup Kathmandu",
    "dental checkup tripureshwor",
    "gum treatment Kathmandu",
    "gum treatment tripureshwor",
    "pediatric dentist Kathmandu",
    "pediatric dentist tripureshwor",
    "affordable dental care Kathmandu",
    "affordable dental care tripureshwor",
    "emergency dental Kathmandu",
    "emergency dental tripureshwor",
    "dental hygiene Kathmandu",
    "dental hygiene tripureshwor",
    "Om Kapan Dental Nepal",
  ],
  authors: [{ name: "Om Kapan Dental" }],
  creator: "Om Kapan Dental",
  publisher: "Om Kapan Dental",
  metadataBase: new URL("https://www.omkapandentalktm.com.np"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon.ico",
        sizes: "32x32",
      },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Om Kapan Dental - Advanced Dental Care in Nepal",
    description:
      "Expert dentists in Tripureshwor, Kathmandu offering dental implants, braces, root canals, cosmetic dentistry, and preventive care in a modern, patient-friendly clinic.",
    type: "website",
    locale: "en_US",
    url: `${baseURL}`,
    siteName: "Om Kapan Dental",
    images: [
      {
        url: `${baseURL}/images/preview.webp`,
        width: 1200,
        height: 630,
        alt: "Om Kapan Dental Preview",
      },
    ],
  },
  category: "health",
  classification: "Dental Clinic",
  referrer: "origin-when-cross-origin",
  applicationName: "Om Kapan Dental",
  generator: "Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify("structured_data_from_constants"),
          }}
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${eudoxusSans.variable}`}
        suppressHydrationWarning={true}
      >
        <IconSprite />
        <Preloader />
        <Header />
        {children}
        <Footer />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
