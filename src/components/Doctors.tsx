// "use client";

// import { useEffect } from "react";
// import { useSectionFade } from "@/hooks/useSectionFade";
// import { DOCTORS } from "@/constants";

// declare global {
//   interface Window {
//     Swiper: any;
//   }
// }

// export const Doctors = () => {
//     const { ref, isVisible } = useSectionFade<HTMLElement>();

//     // Changed: doctor cards now live in a Swiper carousel instead of a
//     // static grid — same init pattern as Testimonial.tsx (polls for the
//     // CDN-loaded Swiper global since it's loaded via <Script> in layout.tsx,
//     // then tears the instance down on unmount).
//     useEffect(() => {
//         let swiperInstance: any;
//         let pollInterval: ReturnType<typeof setInterval> | undefined;

//         const initSwiper = () => {
//             if (typeof window.Swiper === "undefined") return false;

//             swiperInstance = new window.Swiper(".swiper-2", {
//                 direction: "horizontal",
//                 loop: true,
//                 autoplay: {
//                     delay: 3000,
//                     pauseOnMouseEnter: true,
//                 },
//                 slidesPerView: 1,
//                 spaceBetween: 24,
//                 breakpoints: {
//                     640: {
//                         slidesPerView: 2,
//                     },
//                     1024: {
//                         slidesPerView: 3,
//                     },
//                 },
//                 pagination: {
//                     el: ".swiper-pagination",
//                     clickable: true,
//                 },
//                 // Added: manual prev/next arrows alongside the dots, scoped
//                 // to this swiper instance (Swiper resolves these selectors
//                 // relative to its own container, so they won't clash with
//                 // Testimonial's swiper elsewhere on the page).
//                 navigation: {
//                     nextEl: ".doctors-next",
//                     prevEl: ".doctors-prev",
//                 },
//             });
//             return true;
//         };

//         if (!initSwiper()) {
//             pollInterval = setInterval(() => {
//                 if (initSwiper() && pollInterval) clearInterval(pollInterval);
//             }, 100);
//         }

//         return () => {
//             if (pollInterval) clearInterval(pollInterval);
//             swiperInstance?.destroy(true, true);
//         };
//     }, []);

//     return (
//         <section
//             id="dentist"
//             ref={ref}
//             className={`section py-16 ${isVisible ? "" : "section-fade"}`}
//         >
//             <div className="container">
//                 {/* Section Header */}
//                 <div className="flex flex-col items-center gap-y-4 text-center mb-12">
//                     <h4 className="text-sm text-primary font-bold">OUR TEAM</h4>
//                     <p className="text-slate-800 text-4xl leading-snug font-bold sm:max-w-screen-sm">
//                         Meet our dentists
//                     </p>
//                     <p className="max-w-lg text-[15px] font-medium text-slate-800/70">
//                         Every treatment is led by qualified, NMC-registered dentists
//                         committed to safe, patient-first care.
//                     </p>
//                 </div>

//                 {/* Changed: was a 1/2/3-col grid that stacked into 4 rows for
//                     11+ doctors, pushing the section way down. Now a carousel
//                     showing 1/2/3 cards at a time depending on viewport. */}
//                 <div className="swiper swiper-2">
//                     <div className="swiper-wrapper">
//                         {DOCTORS.map((doctor, index) => (
//                             <div key={index} className="swiper-slide p-2">
//                                 <div className="flex flex-col items-center text-center gap-y-3 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-400/20 hover:-translate-y-1">
//                                     {/* Photo */}
//                                     {/* <img
//                                         src={doctor.img}
//                                         alt={doctor.name}
//                                         className="w-28 h-28 rounded-full object-cover border-4 border-primary/10"
//                                     /> */}
//                                     {/* Name */}
//                                     <p className="text-slate-800 text-lg font-bold mt-2">
//                                         {doctor.name}
//                                     </p>
//                                     {/* Qualification */}
//                                     <p className="text-primary text-sm font-bold">
//                                         {doctor.qualification}
//                                     </p>
//                                     {/* NMC No. */}
//                                     <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
//                                         NMC No: {doctor.nmcNo}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Added: pagination dots (Swiper's own bundled CSS positions
//                     these — no extra styling needed, same as Testimonial)
//                     plus prev/next arrows reusing the existing
//                     #arrow-right-circle sprite icon. */}
//                 <div className="flex items-center justify-center gap-x-6 mt-10">
//                     <button
//                         type="button"
//                         aria-label="Previous dentist"
//                         className="doctors-prev flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/20"
//                         style={{ transform: "rotate(180deg)" }}
//                     >
//                         <svg className="w-6 h-6">
//                             <use href="#arrow-right-circle" />
//                         </svg>
//                     </button>
//                     <div className="swiper-pagination" />
//                     <button
//                         type="button"
//                         aria-label="Next dentist"
//                         className="doctors-next flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/20"
//                     >
//                         <svg className="w-6 h-6">
//                             <use href="#arrow-right-circle" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };

















"use client";

import { useEffect } from "react";
import { useSectionFade } from "@/hooks/useSectionFade";
import { DOCTORS } from "@/constants";

declare global {
  interface Window {
    Swiper: any;
  }
}

export const Doctors = () => {
    const { ref, isVisible } = useSectionFade<HTMLElement>();

    // Changed: doctor cards now live in a Swiper carousel instead of a
    // static grid — same init pattern as Testimonial.tsx (polls for the
    // CDN-loaded Swiper global since it's loaded via <Script> in layout.tsx,
    // then tears the instance down on unmount).
    useEffect(() => {
        let swiperInstance: any;
        let pollInterval: ReturnType<typeof setInterval> | undefined;

        const initSwiper = () => {
            if (typeof window.Swiper === "undefined") return false;

            swiperInstance = new window.Swiper(".swiper-2", {
                direction: "horizontal",
                loop: true,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: true,
                },
                // Added defensively: re-measures slide height if this
                // section's layout changes after mount (e.g. images
                // loading in later). Not the fix for the pagination gap —
                // see the .swiper-pagination fix below for that.
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 24,
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                // Added: manual prev/next arrows alongside the dots, scoped
                // to this swiper instance (Swiper resolves these selectors
                // relative to its own container, so they won't clash with
                // Testimonial's swiper elsewhere on the page).
                navigation: {
                    nextEl: ".doctors-next",
                    prevEl: ".doctors-prev",
                },
            });
            return true;
        };

        if (!initSwiper()) {
            pollInterval = setInterval(() => {
                if (initSwiper() && pollInterval) clearInterval(pollInterval);
            }, 100);
        }

        return () => {
            if (pollInterval) clearInterval(pollInterval);
            swiperInstance?.destroy(true, true);
        };
    }, []);

    return (
        <section
            id="dentist"
            ref={ref}
            className={`section py-16 ${isVisible ? "" : "section-fade"} -mb-16`}
        >
            <div className="container">
                {/* Section Header */}
                <div className="flex flex-col items-center gap-y-4 text-center mb-12">
                    <h4 className="text-sm text-primary font-bold">OUR TEAM</h4>
                    <p className="text-slate-800 text-4xl leading-snug font-bold sm:max-w-screen-sm">
                        Meet our dentists
                    </p>
                    <p className="max-w-lg text-[15px] font-medium text-slate-800/70">
                        Every treatment is led by qualified, NMC-registered dentists
                        committed to safe, patient-first care.
                    </p>
                </div>

                {/* Changed: was a 1/2/3-col grid that stacked into 4 rows for
                    11+ doctors, pushing the section way down. Now a carousel
                    showing 1/2/3 cards at a time depending on viewport. */}
                <div className="swiper swiper-2">
                    <div className="swiper-wrapper">
                        {DOCTORS.map((doctor, index) => (
                            <div key={index} className="swiper-slide h-auto p-2">
                                <div className="flex h-full flex-col items-center text-center gap-y-3 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-400/20 hover:-translate-y-1">
                                    {/* Photo */}
                                    <img
                                        src={doctor.img}
                                        alt={doctor.name}
                                        className="w-28 h-28 rounded-full object-cover border-4 border-primary/10"
                                    />
                                    {/* Name + qualification grouped up top; the
                                        badge is pushed to the bottom via
                                        mt-auto so it lines up across cards
                                        even when the qualification text wraps
                                        to two lines on some cards. */}
                                    <div className="flex flex-col items-center gap-y-3">
                                        <p className="text-slate-800 text-lg font-bold mt-2">
                                            {doctor.name}
                                        </p>
                                        <p className="text-primary text-sm font-bold">
                                            {doctor.qualification}
                                        </p>
                                    </div>
                                    <span className="mt-auto bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                                        NMC No: {doctor.nmcNo}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};