import { describe, expect, it } from "vitest";
import { nextFollowerGoal } from "./follower-goal";

describe("nextFollowerGoal", () => {
  it("picks the next milestone above the current count", () => {
    expect(nextFollowerGoal(0)).toEqual({ goal: 100, percent: 0 });
    expect(nextFollowerGoal(620).goal).toBe(750);
    expect(nextFollowerGoal(750).goal).toBe(1000);
    expect(nextFollowerGoal(1200)).toEqual({ goal: 2500, percent: 48 });
  });
});
