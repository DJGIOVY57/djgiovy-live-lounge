import { describe, expect, it } from "vitest";

import { parseUptimeResponse, resolveIsLive } from "./live-status";

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
