export interface DoctorRecord {
  id: string;
  name: string;
  qualification: string;
  nmc_no: string;
  img: string;
  public_id: string;
  display_order: number;
  created_at: string;
}

// Shape actually needed by the public-facing carousel (Doctors.tsx).
// Kept separate from DoctorRecord so the public component's prop type
// doesn't silently grow every time an admin-only field (public_id,
// display_order, created_at) gets added to the table.
export type PublicDoctor = Pick<
  DoctorRecord,
  "id" | "name" | "qualification" | "nmc_no" | "img"
>;