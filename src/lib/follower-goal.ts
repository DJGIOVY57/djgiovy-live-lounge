/** Next follower milestone ("Road to …") and progress toward it. Pure, tested. */
export function nextFollowerGoal(followers: number): { goal: number; percent: number } {
  const n = Math.max(0, Math.floor(followers));
  const steps = [1, 2.5, 5, 7.5];
  let goal = 100;
  outer: for (let mag = 100; ; mag *= 10) {
    for (const s of steps) {
      const g = s * mag;
      if (g > n) { goal = g; break outer; }
    }
  }
  return { goal, percent: Math.min(100, Math.round((n / goal) * 100)) };
}
