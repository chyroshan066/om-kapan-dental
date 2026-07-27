import { CONATACTS, QUICK_LINKS, SOCIAL_LINKS } from "@/constants";
import Link from "next/link";

export const Footer = () => (
  <footer className="bg-[#041434] mt-10">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 xl:gap-x-20 text-white py-16">
        {/* About me in Footer */}
        <div className="sm:col-span-2 lg:col-span-1">
          {/* Logo */}
          <img src="/images/logo.svg" alt="logo-footer" />
          {/* Description */}
          <p className="text-[15px] text-white/70  mt-4">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual
            mockups....
          </p>
          {/* Social in Footer */}
          <div className="mt-8">
            <p className="text-[13px] font-medium text-white/70 mb-4">
              FOLLOW US ON
            </p>
            {/* Socials */}
            <div className="flex items-center gap-x-4 child:transition-colors child:bg-white/90 child-hover:bg-white child:p-2 child:rounded-lg">
              {SOCIAL_LINKS.map((link, index) => (
                <a key={index} href={link.href} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="#1e293b" d={link.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Quick Access in Footer */}
        <div>
          {/* Title */}
          <p className="text-[13px] font-medium text-white/70 mb-6">
            QUICK LINKS
          </p>
          {/* Quick Access List */}
          <ul className="flex flex-col gap-y-4 text-[15px]">
            {QUICK_LINKS.map((link, index) => (
              // Quick Access Item
              <li key={index}>
                <Link className="quick-access-item" href={link.href}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Conact Us in Footer */}
        <div>
          {/* Title */}
          <p className="text-[13px] font-medium text-white/70">
            CONTACT & INFORMATION
          </p>
          {/* Contact Info List */}
          <div className="flex flex-col gap-y-4 mt-6">
            {CONATACTS.map((contact, index) => (
              // Contact Info Item
              <div key={index} className="flex items-center gap-x-4">
                {/* Info Icon */}
                <img
                  className="h-14 w-14"
                  src={contact.img}
                  alt={contact.alt}
                />
                {/* Info Contents */}
                <div>
                  <p className="text-[14px] font-medium text-white/70 mb-1">
                    {contact.name}
                  </p>
                  <p className="font-bold">{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);
