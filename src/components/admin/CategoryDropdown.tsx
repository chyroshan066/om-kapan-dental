"use client";

import { useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { GALLERY_CATEGORIES } from "@/types/gallery";
import type { GalleryCategory } from "@/types/gallery";

interface CategoryDropdownProps {
  value: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
  disabled?: boolean;
}

export function CategoryDropdown({
  value,
  onChange,
  disabled,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const estimatedPanelHeight = 220; // ~4 options + padding
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        style={{ padding: "12px 16px" }}
        className="flex w-full items-center justify-between gap-x-2 rounded-xl border border-gray-200 bg-white text-sm font-bold text-slate-800 transition-colors hover:border-primary disabled:opacity-60"
      >
        <span className="truncate">{value}</span>
        <CaretDown className="w-4 h-4 text-slate-400 shrink-0" weight="bold" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 w-full max-h-56 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl shadow-slate-400/20 ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          role="listbox"
        >
          {GALLERY_CATEGORIES.map((option) => {
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-x-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-gray-50"
                }`}
              >
                {option}
                {isSelected && <Check className="w-4 h-4" weight="bold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}