"use client";

import { useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { AppointmentStatus } from "@/types/appointment";

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_DOT_STYLES: Record<AppointmentStatus, string> = {
  new: "bg-primary",
  confirmed: "bg-emerald-500",
  completed: "bg-slate-400",
  cancelled: "bg-red-500",
};

const STATUS_OPTIONS: AppointmentStatus[] = [
  "new",
  "confirmed",
  "completed",
  "cancelled",
];

interface StatusDropdownProps {
  value: AppointmentStatus;
  onChange: (status: AppointmentStatus) => void;
  disabled?: boolean;
}

export function StatusDropdown({
  value,
  onChange,
  disabled,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const handleSelect = (status: AppointmentStatus) => {
    onChange(status);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const estimatedPanelHeight = 220;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < estimatedPanelHeight && spaceAbove > spaceBelow);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full sm:w-40" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-x-2 h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-bold text-slate-800 transition-colors hover:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="flex items-center gap-x-2 truncate">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT_STYLES[value]}`}
          />
          {STATUS_LABELS[value]}
        </span>
        <CaretDown className="w-4 h-4 text-slate-400 shrink-0" weight="bold" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 z-20 w-full min-w-[10rem] max-h-56 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl shadow-slate-400/20 ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          role="listbox"
        >
          {STATUS_OPTIONS.map((option) => {
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center justify-between gap-x-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-x-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT_STYLES[option]}`}
                  />
                  {STATUS_LABELS[option]}
                </span>
                {isSelected && <Check className="w-4 h-4" weight="bold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}