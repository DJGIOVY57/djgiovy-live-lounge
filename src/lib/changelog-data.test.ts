import { describe, expect, it } from "vitest";

import { RELEASES } from "./changelog-data";

describe("Site history dates", () => {
  it("records the site birth on 25 October 2021", () => {
    expect(RELEASES.find((entry) => entry.title === "Nasce il sito di DJGIOVY57")?.date).toBe("2021-10-25");
  });

  it("records the evolution into the Lounge on 23 November 2026", () => {
    expect(RELEASES.find((entry) => entry.title === "Il sito diventa la Lounge")?.date).toBe("2026-11-23");
  });
});