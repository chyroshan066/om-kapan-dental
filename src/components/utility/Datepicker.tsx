"use client";

import { useRef, useState } from "react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  formatDisplayDate,
  formatMonthLabel,
  getCalendarDays,
  isSameDay,
  stripTime,
  WEEKDAYS,
} from "@/utils/date-utils";

interface DatePickerProps {
  id?: string;
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  /** Dates before this are disabled. Defaults to today (no past-date booking). */
  minDate?: Date;
  required?: boolean;
}

export const DatePicker = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Select a date...",
  minDate = new Date(),
  required,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // Month currently shown in the grid — starts on the selected date, or today.
  const [viewDate, setViewDate] = useState(() => value ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const minDay = stripTime(minDate);
  const calendarDays = getCalendarDays(viewDate);

  const goToPreviousMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const handleSelectDay = (date: Date) => {
    if (date < minDay) return;
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger button — styled to match the existing .form-input inputs.
          Note: <button> doesn't support the HTML "required" attribute, so
          validation is instead enforced by the hidden input below. */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="form-input flex w-full items-center text-left text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
      </button>
      <CalendarBlank className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 text-slate-400" />
      {/* Added: invisible native input so `required` actually blocks form submission
          when no date has been picked, while staying visually hidden. */}
      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          required
          value={value ? formatDisplayDate(value) : ""}
          onChange={() => {}}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      )}

      {isOpen && (
        <div
          className="absolute z-20 mt-2 w-[300px] rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl shadow-slate-400/20"
          role="dialog"
          aria-label={label ?? "Choose a date"}
        >
          {/* Month navigation */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600/90 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Previous month"
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
            </button>
            <p className="text-sm font-bold text-slate-800">
              {formatMonthLabel(viewDate)}
            </p>
            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600/90 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Next month"
            >
              <CaretRight className="h-4 w-4" weight="bold" />
            </button>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((day) => (
              <span key={day} className="text-[11px] font-bold text-slate-400">
                {day}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
            {calendarDays.map(({ date, isCurrentMonth, isToday }) => {
              const isSelected = isSameDay(date, value);
              const isDisabled = date < minDay;

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDay(date)}
                  className={[
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium transition-colors",
                    isSelected
                      ? "bg-primary text-white"
                      : isToday
                        ? "text-primary ring-1 ring-primary/40"
                        : "text-slate-800",
                    !isCurrentMonth && !isSelected ? "text-slate-800/30" : "",
                    isDisabled
                      ? "cursor-not-allowed text-slate-800/20 hover:bg-transparent"
                      : !isSelected
                        ? "hover:bg-primary/10 hover:text-primary"
                        : "",
                  ].join(" ")}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};