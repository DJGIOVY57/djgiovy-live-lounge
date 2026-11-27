import { describe, expect, it } from "vitest";

import { ECOSYSTEM } from "./site-config";

describe("Ecosystem facts", () => {
  it("starts in 2020 with the first Twitch live", () => {
    expect(ECOSYSTEM.startYear).toBe(2020);
  });

  it("has two founded projects", () => {
    expect(ECOSYSTEM.projects).toHaveLength(2);
    expect(ECOSYSTEM.projects.map((project) => project.name)).toEqual(["GAMING HUB", "I migliori momenti di Twitch"]);
  });

  it("shows the Twitch affiliate badge and the years of community", () => {
    expect(ECOSYSTEM.twitchAffiliate).toBe(true);
    expect(ECOSYSTEM.yearsLabel).toBe("6+");
  });

  it("dates Gaming Hub to 3 November 2021", () => {
    expect(ECOSYSTEM.projects.find((project) => project.to === "/gaming-hub")?.founded).toBe(
      "2021-11-03",
    );
  });

  it("dates Momenti to March 2022", () => {
    expect(ECOSYSTEM.projects.find((project) => project.to === "/momenti")?.founded).toBe("2022-03");
  });
});