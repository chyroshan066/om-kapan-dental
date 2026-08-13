export interface GalleryImage {
    src: string;
    alt: string;
    category: "Clinic" | "Treatment Rooms" | "Equipment" | "Our Team";
}

export const GALLERY_CATEGORIES = [
    "All",
    "Clinic",
    "Treatment Rooms",
    "Equipment",
    "Our Team",
] as const;

export const GALLERY_IMAGES: GalleryImage[] = [
    {
        src: "/images/emergency-desktop.webp",
        alt: "Om Kapan Dental reception area",
        category: "Clinic",
    },
    {
        src: "/images/emergency-mobile.webp",
        alt: "Patient waiting area at Om Kapan Dental",
        category: "Clinic",
    },
    {
        src: "/images/gallery/treatment-room-1.webp",
        alt: "Dental treatment room",
        category: "Treatment Rooms",
    },
    {
        src: "/images/gallery/treatment-room-2.webp",
        alt: "Dental treatment chair and equipment",
        category: "Treatment Rooms",
    },
    {
        src: "/images/gallery/treatment-room-3.webp",
        alt: "Modern dental treatment setup",
        category: "Treatment Rooms",
    },
    {
        src: "/images/gallery/equipment-xray.webp",
        alt: "Digital X-ray equipment",
        category: "Equipment",
    },
    {
        src: "/images/gallery/equipment-sterilization.webp",
        alt: "Sterilization equipment",
        category: "Equipment",
    },
    {
        src: "/images/gallery/team-at-work-1.webp",
        alt: "Dentist attending to a patient",
        category: "Our Team",
    },
    {
        src: "/images/gallery/team-at-work-2.webp",
        alt: "Dental team collaborating on a case",
        category: "Our Team",
    },
];