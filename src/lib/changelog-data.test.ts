import { describe, expect, it } from "vitest";

import { CURRENT_RELEASE, RELEASES } from "./changelog-data";
import { MILESTONES } from "./timeline-data";

describe("Site history dates", () => {
  it("records the site birth on 25 October 2021", () => {
    expect(MILESTONES.find((entry) => entry.title === "Nasce il sito di DJGIOVY57")?.date).toBe("2021-10-25");
  });

  it("records the evolution into the Lounge on 23 November 2026", () => {
    expect(MILESTONES.find((entry) => entry.title === "Il sito diventa la Lounge")?.date).toBe("2026-11-23");
  });

  it("records the server founding as DJCORD in November 2021", () => {
    expect(MILESTONES.find((entry) => entry.title === "Nasce il server DJCORD")?.date).toBe(
      "2021-11",
    );
  });

  it("records the rename into GAMING HUB on 1 June 2023", () => {
    expect(MILESTONES.find((entry) => entry.title === "DJCORD diventa GAMING HUB")?.date).toBe(
      "2023-06-01",
    );
  });

  it("dates the first release the day the Lounge began", () => {
    expect(RELEASES[0]?.date).toBe("2026-11-23");
  });

  it("identifies the Lounge as version 2.0", () => {
    expect(CURRENT_RELEASE.version).toBe("2.0");
  });

  it("keeps the Lounge release in Alpha", () => {
    expect(CURRENT_RELEASE.stage).toBe("ALPHA");
  });
});