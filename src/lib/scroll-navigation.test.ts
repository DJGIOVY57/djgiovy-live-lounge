import { describe, expect, it } from "vitest";
import { activeScrollSection } from "./scroll-navigation";

describe("section navigation", () => {
  it("does not skip Spotify when it is shorter than the viewport", () => {
    expect(activeScrollSection([0, 500, 1000, 1300], 1000)).toBe(2);
  });
  it("selects Twitch after reaching its position", () => {
    expect(activeScrollSection([0, 500, 1000, 1300], 1300)).toBe(3);
  });
});