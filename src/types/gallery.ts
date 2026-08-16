export type GalleryCategory =
  | "Clinic"
  | "Treatment Rooms"
  | "Equipment"
  | "Our Team";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Clinic",
  "Treatment Rooms",
  "Equipment",
  "Our Team",
];

export interface GalleryImageRecord {
  id: string;
  src: string;
  public_id: string;
  alt: string;
  category: GalleryCategory;
  created_at: string;
}