// export const Contact = () => (
//     <section className="section py-16">
//             <div className="container">
//                 <div className="flex flex-col lg:flex-row gap-y-6 gap-x-20">
//                     {/* Map image */}
//                     <div className="relative lg:w-1/2">
//                         <iframe
//                             className="block w-full h-[440px] xs:h-[500px] lg:h-[610px] xl:h-[680px] rounded-3xl border-0"
//                             src="https://www.google.com/maps?q=Om+Kapan+Dental,+Bhrikuti+Chowk,+Kathmandu&ll=27.7272936,85.3569785&z=17&output=embed"
//                             loading="lazy"
//                             referrerPolicy="no-referrer-when-downgrade"
//                             allowFullScreen
//                             title="Om Kapan Dental location map"
//                         ></iframe>
//                         {/* Absolute Address */}
//                         <div className="absolute bg-white p-4 bottom-8 left-8 right-8 rounded-3xl flex gap-x-6 items-center">
//                             {/* icon */}
//                             <img className="block w-16 h-16" src="/images/icons/home-icon.webp" alt="home-icon" />
//                             {/* Address */}
//                             <div>
//                                 <p className="text-xs text-primary font-bold mb-1">ADDRESS</p>
//                                 <p className="font-bold text-slate-800 max-w-[260px]">Bhrikuti Chowk, Kathmandu</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="lg:w-1/2 bg-gray-100 px-4 pt-10 pb-4 rounded-3xl lg:bg-transparent lg:p-0 lg:rounded-none">
//                         {/* Contact us info */}
//                         <div className="flex flex-col gap-y-4 text-center lg:text-start">
//                             <h4 className="text-sm text-primary font-bold">BOOK APPOINTMENT</h4>
//                             {/* Subtitle */}
//                             <p className="text-slate-800 text-4xl leading-snug font-bold lg:max-w-screen-sm">Care at Dentalist is pleasure</p>
//                             {/* Description */}
//                             <p className="mx-auto lg:mx-0 text-[15px] font-medium text-slate-800/70">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual</p>
//                         </div>
//                         {/* Contact us form */}
//                         <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7 mt-10 xl:mt-16">
//                             {/* name input */}
//                             <div className="flex flex-col gap-y-2 relative">
//                                 <label className="font-bold text-[13px] text-slate-600/90" htmlFor="name">NAME</label>
//                                 <input className="form-input" id="name" type="text" placeholder="Enter your name..." required />
//                                 <svg className="w-6 h-6 absolute bottom-4 left-4 text-slate-400">
//                                     <use href="#user"></use>
//                                 </svg>
//                             </div>
//                             {/* email input */}
//                             <div className="flex flex-col gap-y-2 relative">
//                                 <label className="font-bold text-[13px] text-slate-600/90" htmlFor="email">EMAIL ADDRESS</label>
//                                 <input className="form-input" id="email" type="email" placeholder="Your email address..." required />
//                                 <svg className="w-6 h-6 absolute bottom-4 left-4 text-slate-400">
//                                     <use href="#envelope"></use>
//                                 </svg>
//                             </div>
//                            {/* messages input */}
//                             <div className="flex flex-col gap-y-2 sm:col-span-2 relative">
//                                 <label className="font-bold text-[13px] text-slate-600/90" htmlFor="message">MESSAGES</label>
//                                 <textarea className="form-input min-h-[234px] max-h-[234px] lg:min-h-[116px] lg:max-h-[116px] xl:min-h-[234px] xl:max-h-[234px]" id="message" placeholder="Enter your messages..." required></textarea>
//                                 <svg className="w-6 h-6 absolute top-[42px] left-4 text-slate-400">
//                                     <use href="#pencil-square"></use>
//                                 </svg>
//                             </div>
//                             {/* Form submit button */}
//                             <div className="flex items-center justify-between sm:col-span-2">
//                                 {/* Phone number */}
//                                 <div className="hidden sm:flex items-center gap-x-4">
//                                     <img className="block w-16 h-16" src="/images/icons/phone-icon.webp" alt="phone-icon.png" />
//                                     <div>
//                                         <p className="text-primary font-bold text-sm">Dental 24H Emergency</p>
//                                         <p className="text-slate-800 font-bold mt-1">01234567890</p>
//                                     </div>
//                                 </div>
//                                 {/* Submit button */}
//                                 <button type="submit" className="h-12 w-full sm:w-44 bg-primary text-white text-sm font-bold text-center leading-[3rem] rounded-xl transition-colors hover:bg-indigo-800">Book an appointment</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
// );


























"use client";

import { useSectionFade } from "@/hooks/useSectionFade";

export const Contact = () => {
    const { ref, isVisible } = useSectionFade<HTMLElement>();

    return (
    <section ref={ref} className={`section py-16 ${isVisible ? "" : "section-fade"}`}>
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-y-6 gap-x-20">
                    {/* Map image */}
                    <div className="relative lg:w-1/2">
                        <iframe
                            className="block w-full h-[440px] xs:h-[500px] lg:h-[610px] xl:h-[680px] rounded-3xl border-0"
                            src="https://www.google.com/maps?q=Om+Kapan+Dental,+Bhrikuti+Chowk,+Kathmandu&ll=27.7272936,85.3569785&z=17&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                            title="Om Kapan Dental location map"
                        ></iframe>
                        {/* Absolute Address */}
                        <div className="absolute bg-white p-4 bottom-8 left-8 right-8 rounded-3xl flex gap-x-6 items-center">
                            {/* icon */}
                            <img className="block w-16 h-16" src="/images/icons/home-icon.webp" alt="home-icon" />
                            {/* Address */}
                            <div>
                                <p className="text-xs text-primary font-bold mb-1">ADDRESS</p>
                                <p className="font-bold text-slate-800 max-w-[260px]">Bhrikuti Chowk, Kathmandu</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-gray-100 px-4 pt-10 pb-4 rounded-3xl lg:bg-transparent lg:p-0 lg:rounded-none">
                        {/* Contact us info */}
                        <div className="flex flex-col gap-y-4 text-center lg:text-start">
                            <h4 className="text-sm text-primary font-bold">BOOK APPOINTMENT</h4>
                            {/* Subtitle */}
                            <p className="text-slate-800 text-4xl leading-snug font-bold lg:max-w-screen-sm">Care at Dentalist is pleasure</p>
                            {/* Description */}
                            <p className="mx-auto lg:mx-0 text-[15px] font-medium text-slate-800/70">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual</p>
                        </div>
                        {/* Contact us form */}
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7 mt-10 xl:mt-16">
                            {/* name input */}
                            <div className="flex flex-col gap-y-2 relative">
                                <label className="font-bold text-[13px] text-slate-600/90" htmlFor="name">NAME</label>
                                <input className="form-input" id="name" type="text" placeholder="Enter your name..." required />
                                <svg className="w-6 h-6 absolute bottom-4 left-4 text-slate-400">
                                    <use href="#user"></use>
                                </svg>
                            </div>
                            {/* email input */}
                            <div className="flex flex-col gap-y-2 relative">
                                <label className="font-bold text-[13px] text-slate-600/90" htmlFor="email">EMAIL ADDRESS</label>
                                <input className="form-input" id="email" type="email" placeholder="Your email address..." required />
                                <svg className="w-6 h-6 absolute bottom-4 left-4 text-slate-400">
                                    <use href="#envelope"></use>
                                </svg>
                            </div>
                           {/* messages input */}
                            <div className="flex flex-col gap-y-2 sm:col-span-2 relative">
                                <label className="font-bold text-[13px] text-slate-600/90" htmlFor="message">MESSAGES</label>
                                <textarea className="form-input min-h-[234px] max-h-[234px] lg:min-h-[116px] lg:max-h-[116px] xl:min-h-[234px] xl:max-h-[234px]" id="message" placeholder="Enter your messages..." required></textarea>
                                <svg className="w-6 h-6 absolute top-[42px] left-4 text-slate-400">
                                    <use href="#pencil-square"></use>
                                </svg>
                            </div>
                            {/* Form submit button */}
                            <div className="flex items-center justify-between sm:col-span-2">
                                {/* Phone number */}
                                <div className="hidden sm:flex items-center gap-x-4">
                                    <img className="block w-16 h-16" src="/images/icons/phone-icon.webp" alt="phone-icon.png" />
                                    <div>
                                        <p className="text-primary font-bold text-sm">Dental 24H Emergency</p>
                                        <p className="text-slate-800 font-bold mt-1">01234567890</p>
                                    </div>
                                </div>
                                {/* Submit button */}
                                <button type="submit" className="h-12 w-full sm:w-44 bg-primary text-white text-sm font-bold text-center leading-[3rem] rounded-xl transition-colors hover:bg-indigo-800">Book an appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};