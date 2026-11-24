import { describe, expect, it } from "vitest";

import { parseStreamMetadata, parseUptimeResponse, resolveIsLive, shouldShowLiveBanner } from "./live-status";

describe("live notification", () => {
  it("appears during a live and disappears offline", () => {
    expect(shouldShowLiveBanner(true, false)).toBe(true);
    expect(shouldShowLiveBanner(false, false)).toBe(false);
  });

  it("allows closing the current live notification", () => {
    expect(shouldShowLiveBanner(true, true)).toBe(false);
  });

  it("keeps real titles and categories but hides failed responses", () => {
    expect(parseStreamMetadata(" Fortnite ")).toBe("Fortnite");
    expect(parseStreamMetadata("Una live speciale")).toBe("Una live speciale");
    expect(parseStreamMetadata("Error: user not found")).toBeNull();
    expect(parseStreamMetadata("djgiovy57 is offline")).toBeNull();
    expect(parseStreamMetadata(" ")).toBeNull();
  });
});

describe("parseUptimeResponse", () => {
  it("treats the offline message as offline", () => {
    expect(parseUptimeResponse("djgiovy57 is offline")).toEqual({ live: false, uptime: null });
  });

  it("treats an uptime string as live", () => {
    expect(parseUptimeResponse("1 hour, 4 minutes, 12 seconds")).toEqual({
      live: true,
      uptime: "1 hour, 4 minutes, 12 seconds",
    });
  });

  it("treats errors and empty answers as offline", () => {
    expect(parseUptimeResponse("Error: user not found").live).toBe(false);
    expect(parseUptimeResponse("   ").live).toBe(false);
  });
});

describe("resolveIsLive", () => {
  it("follows the real status in auto mode", () => {
    expect(resolveIsLive("auto", true)).toBe(true);
    expect(resolveIsLive("auto", false)).toBe(false);
  });

  it("lets the simulated mode override the real status", () => {
    expect(resolveIsLive("live", false)).toBe(true);
    expect(resolveIsLive("offline", true)).toBe(false);
  });
});
