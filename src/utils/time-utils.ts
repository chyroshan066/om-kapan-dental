import type { TimeValue } from "@/components/utility/Timepicker";

/** Converts a 12-hour TimeValue into minutes-since-midnight (0-1439) for easy range comparisons. */
export function toMinutesOfDay({ hour, minute, period }: TimeValue): number {
  const hour24 = period === "AM" ? hour % 12 : (hour % 12) + 12;
  return hour24 * 60 + minute;
}

export function isWithinBusinessHours(
  time: TimeValue,
  openTime: TimeValue,
  closeTime: TimeValue
): boolean {
  const minutes = toMinutesOfDay(time);
  return minutes >= toMinutesOfDay(openTime) && minutes <= toMinutesOfDay(closeTime);
}

export function formatTimeValue({ hour, minute, period }: TimeValue): string {
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(hour)}:${pad(minute)} ${period}`;
}