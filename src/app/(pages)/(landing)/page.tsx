import { sql } from "@/utils/db";
import type { PublicDoctor } from "@/types/doctor";
import { Branches } from "@/components/Branches";
import { Contact } from "@/components/Contact";
import { Doctors } from "@/components/Doctors";
import { Emergency } from "@/components/Emergency";
import { Expert } from "@/components/Expert";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonial } from "@/components/Testimonial";

export default async function Home() {
  const doctors = (await sql`
    select id, name, qualification, nmc_no, img
    from doctors
    order by display_order asc, created_at asc
  `) as PublicDoctor[];

  return (
    <>
      <Hero />
      <Services />
      <Emergency />
      <Features />
      <Expert />
      <Doctors doctors={doctors} />
      <Testimonial />
      <Branches />
      <Contact />
    </>
  );
}