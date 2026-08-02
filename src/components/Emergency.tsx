"use client";

import { useSectionFade } from "@/hooks/useSectionFade";
import Link from "next/link";

export const Emergency = () => {
  const { ref, isVisible } = useSectionFade<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`section my-20 ${isVisible ? "" : "section-fade"}`}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-x-20 gap-y-12">
          {/* Emergency image */}
          <div>
            <img
              className="hidden lg:block"
              src="/images/emergency-desktop.webp"
              alt="emergency-desktop"
            />
            <img
              className="lg:hidden"
              src="/images/emergency-mobile.webp"
              alt="emergency-mobile"
            />
          </div>
          {/* Emergency Contents */}
          <div className="flex flex-col gap-y-4 text-center lg:text-start">
            {/* Title */}
            {/* <h4 className="text-sm text-primary font-bold">Dental 24H Emergency</h4> */}
            {/* Subtitle */}
            <p className="text-slate-800 text-4xl leading-snug font-bold sm:max-w-screen-sm">
              Dental pain can&apos;t wait, and neither do we.
            </p>
            {/* Description */}
            <p className="max-w-lg lg:max-w-md mx-auto lg:mx-0 text-[15px] font-medium text-slate-800/70">
              Whether it&apos;s a sudden toothache, a broken tooth, or a
              knocked-out crown, our team is ready to see you quickly and get
              you out of pain, right here in Kapan Bhrikuti Chowk.
            </p>
            {/* Button Call to Action */}
            <Link
              className="h-12 w-44 mx-auto bg-primary text-white text-sm font-bold text-center leading-[3rem] mt-6 lg:mt-8 lg:mx-0 rounded-xl transition-colors hover:bg-indigo-800"
              href="#contact"
            >
              Book appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
