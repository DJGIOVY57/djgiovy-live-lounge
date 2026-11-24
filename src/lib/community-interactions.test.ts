import { describe, expect, it } from "vitest";
import { advanceSecretTap } from "./community-interactions";

describe("secret avatar interaction", () => {
  it("opens on the fifth consecutive tap and resets afterward", () => {
    let state = { count: 0, at: 0 };
    for (let tap = 1; tap <= 4; tap++) {
      const result = advanceSecretTap(state, tap * 100);
      expect(result.unlocked).toBe(false);
      state = result;
    }
    const fifth = advanceSecretTap(state, 500);
    expect(fifth.unlocked).toBe(true);
    expect(fifth.count).toBe(0);
    expect(advanceSecretTap(fifth, 600).unlocked).toBe(false);
  });
  it("starts over after a pause longer than two seconds", () => {
    expect(advanceSecretTap({ count: 4, at: 100 }, 2101)).toEqual({ count: 1, at: 2101, unlocked: false });
  });
});