import { describe, expect, it } from "vitest";
import { nextFollowerGoal } from "./follower-goal";

describe("nextFollowerGoal", () => {
  it("current road is 200 followers", () => {
    expect(nextFollowerGoal(176)).toEqual({ goal: 200, percent: 88 });
  });
  it("then moves to the next milestone", () => {
    expect(nextFollowerGoal(200).goal).toBe(500);
    expect(nextFollowerGoal(0).goal).toBe(100);
  });
});
