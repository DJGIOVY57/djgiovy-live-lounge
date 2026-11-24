import { describe, expect, it } from "vitest";

import { MOMENTI_MILESTONES } from "./momenti-timeline-data";

describe("Momenti project timeline", () => {
  it("lists milestones newest first", () => {
    const dates = MOMENTI_MILESTONES.map((milestone) => milestone.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("uses ISO dates the page can format", () => {
    for (const milestone of MOMENTI_MILESTONES) {
      expect(milestone.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("records the TikTok page birth on 15 March 2022", () => {
    expect(MOMENTI_MILESTONES.find((m) => m.title === "Nasce la pagina TikTok")?.date).toBe("2022-03-15");
  });

  it("records the first milestone two days later, on 17 March 2022", () => {
    expect(MOMENTI_MILESTONES.find((m) => m.title === "La prima clip che fa scattare tutto")?.date).toBe("2022-03-17");
  });
});
