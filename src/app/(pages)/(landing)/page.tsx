import { Emergency } from "@/components/Emergency";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Emergency />
      <Features />
    </>
  );
}
