/**
 * Pure helpers for the Twitch schedule, the countdown and clip titles.
 * Times are always shown in Italian time so server and browser render the same text.
 */
export const SITE_TIMEZONE = "Europe/Rome";

export type ScheduleSegment = {
  startAt: string;
  endAt: string;
  title: string;
  category: string | null;
};

/** Segments that haven't ended yet, soonest first. */
export function upcomingSegments(segments: ScheduleSegment[], now: number): ScheduleSegment[] {
  return segments
    .filter((s) => Date.parse(s.endAt) > now)
    .sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt));
}

/** The next live: "ongoing" if it already started and hasn't ended, else "upcoming". */
export function nextSegment(
  segments: ScheduleSegment[],
  now: number,
): { segment: ScheduleSegment; status: "ongoing" | "upcoming" } | null {
  const first = upcomingSegments(segments, now)[0];
  if (!first) return null;
  return { segment: first, status: Date.parse(first.startAt) <= now ? "ongoing" : "upcoming" };
}

/** Time left until `target`, split for the countdown display. Never negative. */
export function countdownParts(target: number, now: number) {
  const total = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

/** Calendar day in Italian time, as "YYYY-MM-DD". */
export function romeDayKey(date: number | string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

/** "Oggi" / "Domani" / null, compared in Italian time. */
export function relativeDayLabel(date: string, now: number): "Oggi" | "Domani" | null {
  const key = romeDayKey(date);
  if (key === romeDayKey(now)) return "Oggi";
  if (key === romeDayKey(now + 86_400_000)) return "Domani";
  return null;
}

export function formatDay(date: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: SITE_TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

export function formatTime(date: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: SITE_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Stream titles carry chat commands ("!discord !sub …"): drop them and empty separators.
 * Falls back to a generic label when nothing readable is left.
 */
export function cleanClipTitle(title: string, fallback: string): string {
  const cleaned = title
    .replace(/!\S+/g, " ")
    .split("|")
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter((part) => /[A-Za-z0-9À-ÿ]/.test(part))
    .join(" | ")
    .trim();
  return cleaned || fallback;
}
