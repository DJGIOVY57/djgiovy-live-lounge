import { createServerFn } from "@tanstack/react-start";

import { parseStreamMetadata, parseUptimeResponse } from "./live-status";
import { CREATOR } from "./site-config";

/**
 * Live data for the landing page, fetched server-side (no CORS issues, no keys exposed).
 *
 * Sources (public, no API key needed):
 *  - Twitch status/avatar/followers → decapi.me (a public wrapper around the Twitch API)
 *  - Discord member counts          → discord.com/api/v10/invites/<code>?with_counts=true
 *
 * To switch to the official Twitch Helix API later:
 *  1. Save TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET as secrets.
 *  2. Inside the handler, get an app token (POST https://id.twitch.tv/oauth2/token,
 *     grant_type=client_credentials), then call
 *     GET https://api.twitch.tv/helix/streams?user_login=<channel>
 *     with headers "Client-Id" and "Authorization: Bearer <token>".
 *  3. live = response.data.length > 0. Keep the same return shape below.
 */
export type ChannelStatus = {
  twitch: {
    live: boolean;
    uptime: string | null;
    avatarUrl: string | null;
    followers: number | null;
    title: string | null;
    category: string | null;
  };
  discord: {
    members: number | null;
    online: number | null;
  };
  checkedAt: string;
};

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

export const getChannelStatus = createServerFn({ method: "GET" }).handler(
  async (): Promise<ChannelStatus> => {
    const channel = CREATOR.twitchChannel;
    const [uptime, avatar, followers, discord, title, category] = await Promise.allSettled([
      fetchText(`https://decapi.me/twitch/uptime/${channel}`),
      fetchText(`https://decapi.me/twitch/avatar/${channel}`),
      fetchText(`https://decapi.me/twitch/followcount/${channel}`),
      fetchText(
        `https://discord.com/api/v10/invites/${CREATOR.discordInviteCode}?with_counts=true`,
      ),
      fetchText(`https://decapi.me/twitch/title/${channel}`),
      fetchText(`https://decapi.me/twitch/game/${channel}`),
    ]);

    for (const r of [uptime, avatar, followers, discord, title, category]) {
      if (r.status === "rejected") console.error("[channel-status]", r.reason);
    }

    const live =
      uptime.status === "fulfilled"
        ? parseUptimeResponse(uptime.value)
        : { live: false, uptime: null };

    const avatarUrl =
      avatar.status === "fulfilled" && avatar.value.trim().startsWith("https://")
        ? avatar.value.trim()
        : null;

    const followerCount =
      followers.status === "fulfilled" && /^\d+$/.test(followers.value.trim())
        ? Number(followers.value.trim())
        : null;

    let members: number | null = null;
    let online: number | null = null;
    if (discord.status === "fulfilled") {
      try {
        const d = JSON.parse(discord.value) as {
          approximate_member_count?: number;
          approximate_presence_count?: number;
        };
        members = d.approximate_member_count ?? null;
        online = d.approximate_presence_count ?? null;
      } catch (e) {
        console.error("[channel-status] discord parse", e);
      }
    }

    return {
      twitch: {
        live: live.live, uptime: live.uptime, avatarUrl, followers: followerCount,
        title: live.live && title.status === "fulfilled" ? parseStreamMetadata(title.value) : null,
        category: live.live && category.status === "fulfilled" ? parseStreamMetadata(category.value) : null,
      },
      discord: { members, online },
      checkedAt: new Date().toISOString(),
    };
  },
);
