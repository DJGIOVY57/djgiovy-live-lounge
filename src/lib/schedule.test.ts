import { describe, expect, it } from "vitest";

import {
  cleanClipTitle,
  countdownParts,
  nextSegment,
  relativeDayLabel,
  romeDayKey,
  upcomingSegments,
  type ScheduleSegment,
} from "./schedule";

const seg = (startAt: string, endAt: string): ScheduleSegment => ({
  startAt,
  endAt,
  title: "LIVE SERALE",
  category: null,
});

const past = seg("2026-11-23T21:30:00Z", "2026-11-24T01:30:00Z");
const tonight = seg("2026-11-24T21:30:00Z", "2026-11-25T01:30:00Z");
const tomorrow = seg("2026-11-25T21:30:00Z", "2026-11-26T01:30:00Z");
const noon = Date.parse("2026-11-24T12:00:00Z");

describe("schedule", () => {
  it("drops lives that already ended and sorts by start", () => {
    expect(upcomingSegments([tomorrow, past, tonight], noon)).toEqual([tonight, tomorrow]);
  });

  it("next live is upcoming before it starts", () => {
    expect(nextSegment([past, tonight], noon)).toEqual({ segment: tonight, status: "upcoming" });
  });

  it("next live is ongoing between start and end", () => {
    const during = Date.parse("2026-11-24T22:00:00Z");
    expect(nextSegment([tonight, tomorrow], during)).toEqual({
      segment: tonight,
      status: "ongoing",
    });
  });

  it("no next live when the schedule is empty", () => {
    expect(nextSegment([past], noon)).toBeNull();
  });

  it("countdown splits days, hours, minutes and seconds", () => {
    const target = noon + 2 * 86_400_000 + 3 * 3_600_000 + 4 * 60_000 + 5_000;
    expect(countdownParts(target, noon)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5 });
  });

  it("countdown never goes negative", () => {
    expect(countdownParts(noon - 1000, noon)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("uses Italian time for the calendar day (23:30 UTC is already tomorrow in Rome)", () => {
    expect(romeDayKey("2026-11-24T23:30:00Z")).toBe("2026-11-25");
  });

  it("labels today and tomorrow in Italian time", () => {
    expect(relativeDayLabel(tonight.startAt, noon)).toBe("Oggi");
    expect(relativeDayLabel(tomorrow.startAt, noon)).toBe("Domani");
    expect(relativeDayLabel("2026-11-28T21:30:00Z", noon)).toBeNull();
  });
});

describe("cleanClipTitle", () => {
  it("removes chat commands and empty separators", () => {
    expect(
      cleanClipTitle("🔴 » [PS4] | TENTIAMO LE 5 CORONE | !discord !sub !prime ツ", "Clip"),
    ).toBe("🔴 » [PS4] | TENTIAMO LE 5 CORONE");
  });

  it("falls back when nothing readable is left", () => {
    expect(cleanClipTitle(".", "Clip di DJGIOVY57")).toBe("Clip di DJGIOVY57");
  });
});
