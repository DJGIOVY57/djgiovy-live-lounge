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
});
