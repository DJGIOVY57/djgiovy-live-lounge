import { describe, expect, it } from "vitest";

import { RELEASES } from "./changelog-data";
import { MILESTONES } from "./timeline-data";

describe("Site history dates", () => {
  it("records the site birth on 25 October 2021", () => {
    expect(MILESTONES.find((entry) => entry.title === "Nasce il sito di DJGIOVY57")?.date).toBe("2021-10-25");
  });

  it("records the evolution into the Lounge on 23 November 2026", () => {
    expect(MILESTONES.find((entry) => entry.title === "Il sito diventa la Lounge")?.date).toBe("2026-11-23");
  });

  it("keeps historical milestones out of release notes", () => {
    const historicalDates = new Set<string>(MILESTONES.map((milestone) => milestone.date));
    expect(RELEASES.some((release) => historicalDates.has(release.date))).toBe(false);
    expect(RELEASES.map((release) => release.version)).toEqual(["0.1"]);
  });
});