import { describe, expect, it } from "vitest";

import { ECOSYSTEM } from "./site-config";

describe("Ecosystem facts", () => {
  it("starts in 2021", () => {
    expect(ECOSYSTEM.startYear).toBe(2021);
  });

  it("has two founded projects", () => {
    expect(ECOSYSTEM.projects).toHaveLength(2);
    expect(ECOSYSTEM.projects.map((project) => project.name)).toEqual(["GAMING HUB", "I migliori momenti di Twitch"]);
  });

  it("connects exactly the seven requested platforms", () => {
    expect(ECOSYSTEM.platforms).toEqual(["Twitch", "YouTube", "Discord", "TikTok", "Spotify", "Instagram", "Twitter/X"]);
    expect(ECOSYSTEM.platforms).toHaveLength(7);
  });

  it("dates Gaming Hub to November 2021", () => {
    expect(ECOSYSTEM.projects.find((project) => project.to === "/gaming-hub")?.founded).toBe("2021-11");
  });

  it("dates Momenti to March 2022", () => {
    expect(ECOSYSTEM.projects.find((project) => project.to === "/momenti")?.founded).toBe("2022-03");
  });
});