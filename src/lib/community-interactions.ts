export const SECRET_TAPS = 5;
export const SECRET_TAP_WINDOW = 2_000;

export function advanceSecretTap(previous: { count: number; at: number }, now: number) {
  const count = now - previous.at <= SECRET_TAP_WINDOW ? previous.count + 1 : 1;
  return { count: count >= SECRET_TAPS ? 0 : count, at: now, unlocked: count >= SECRET_TAPS };
}