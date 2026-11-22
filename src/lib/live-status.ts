/**
 * Pure helpers for the live indicator. Kept free of fetch/React so they are
 * easy to test and reuse when switching to the official Twitch Helix API.
 */

/** "auto" follows the real Twitch status; "live"/"offline" force a simulated state for testing. */
export type LiveMode = "auto" | "live" | "offline";

export const LIVE_MODES: readonly LiveMode[] = ["auto", "live", "offline"];

/**
 * Parses the plain-text answer of decapi.me/twitch/uptime/<channel>.
 * Offline → "<channel> is offline". Live → e.g. "1 hour, 4 minutes, 12 seconds".
 * Anything that looks like an error is treated as offline.
 */
export function parseUptimeResponse(text: string): { live: boolean; uptime: string | null } {
  const t = text.trim();
  if (!t || /offline|error|not found|invalid|no user|rate limit/i.test(t)) {
    return { live: false, uptime: null };
  }
  return { live: true, uptime: t };
}

/** Final state shown in the UI: the simulated mode wins over the real status. */
export function resolveIsLive(mode: LiveMode, apiLive: boolean): boolean {
  if (mode === "live") return true;
  if (mode === "offline") return false;
  return apiLive;
}
