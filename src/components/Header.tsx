"use client";

import { useState } from "react";
import { NAVLINKS } from "@/constants";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showMobileMenu = () => setIsMobileMenuOpen(true);
  const hideMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="h-[100px]">
      <div className="container flex items-center h-full">
        <div className="flex justify-between items-center h-12 w-full">
          {/* Header Logo */}
          <a href="/">
            <img src="/images/logo.svg" alt="Site-Logo" />
          </a>
          {/* Header Menu */}
          <nav className="hidden lg:block">
            <ul className="flex gap-x-10 xl:gap-x-12 text-slate-800 text-sm font-bold child:transition-colors child:delay-75 child-hover:text-primary">
              {NAVLINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Header Button */}
          <a
            className="hidden lg:block h-full w-44 bg-primary text-white text-sm font-bold text-center leading-[3rem] rounded-xl transition-colors hover:bg-indigo-800"
            href="#contact"
          >
            Book appointment
          </a>
          {/* Mobile Menu */}
          <div className="lg:hidden relative">
            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={showMobileMenu}
            >
              <svg className="w-8 h-8">
                <use href="#bars" />
              </svg>
            </button>
            {/* Menu Background Overlay */}
            <div
              id="mobile-menu-overlay"
              className={`${
                isMobileMenuOpen ? "" : "hidden"
              } fixed inset-0 bg-black/40 transition-all z-[999]`}
              onClick={hideMobileMenu}
            />
            {/* Mobile Menu Container */}
            <div
              id="mobile-menu-container"
              className={`w-80 bg-white fixed top-0 ${
                isMobileMenuOpen ? "left-0" : "-left-80"
              } bottom-0 transition-all flex flex-col z-[999]`}
            >
              {/* Logo & Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-b-gray-100/50">
                <img src="/images/logo.svg" alt="logo" />
                <button
                  type="button"
                  id="close-button"
                  onClick={hideMobileMenu}
                >
                  <svg className="w-5 h-5">
                    <use href="#close-mark" />
                  </svg>
                </button>
              </div>
              {/* Mobile Menu Nav */}
              <nav className="p-4 grow">
                {/* Menu List */}
                <ul className="flex flex-col gap-y-5 text-slate-800 text-sm font-medium child:transition-colors child:delay-75 child-hover:text-primary">
                  {NAVLINKS.map((link, index) => (
                    //    Menu Item
                    <li key={index}>
                      <a
                        className="flex items-center gap-x-1"
                        href={link.href}
                        onClick={hideMobileMenu}
                      >
                        <svg className="w-5 h-5">
                          <use href={`#${link.icon}`} />
                        </svg>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Button */}
              <div className="p-4">
                <a
                  className="block w-full h-12 leading-[2.8rem] bg-primary text-white text-sm font-bold text-center rounded-xl transition-colors hover:bg-indigo-800"
                  href="#contact"
                  onClick={hideMobileMenu}
                >
                  Book appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};