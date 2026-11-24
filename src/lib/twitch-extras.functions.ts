import { createServerFn } from "@tanstack/react-start";

import type { ScheduleSegment } from "./schedule";
import { CREATOR } from "./site-config";

/**
 * Most-viewed clips and the stream schedule, read server-side from Twitch's public
 * web endpoint (the same one twitch.tv uses, no account or key needed).
 * It is unofficial: on any failure we return empty lists and the sections degrade gracefully.
 * To move to the official Helix API, keep this return shape and swap the fetch.
 */
export type TwitchClip = {
  slug: string;
  title: string;
  views: number;
  thumbnailUrl: string;
  durationSeconds: number;
  createdAt: string;
};

export type TwitchExtras = {
  clips: TwitchClip[];
  schedule: ScheduleSegment[];
  checkedAt: string;
};

const PUBLIC_WEB_CLIENT_ID = "kimne78kx3ncx6brgo4mv6wki5h1ko";

type GqlResponse = {
  data?: {
    user?: {
      clips?: {
        edges?: {
          node?: {
            slug?: string;
            title?: string;
            viewCount?: number;
            thumbnailURL?: string;
            durationSeconds?: number;
            createdAt?: string;
          };
        }[];
      };
      channel?: {
        schedule?: {
          segments?: {
            startAt?: string;
            endAt?: string;
            title?: string;
            categories?: { name?: string }[] | null;
          }[] | null;
        } | null;
      };
    } | null;
  };
};

export const getTwitchExtras = createServerFn({ method: "GET" }).handler(
  async (): Promise<TwitchExtras> => {
    const checkedAt = new Date().toISOString();
    const query = `query {
      user(login: "${CREATOR.twitchChannel}") {
        clips(first: 6, criteria: { period: ALL_TIME }) {
          edges { node { slug title viewCount thumbnailURL durationSeconds createdAt } }
        }
        channel { schedule { segments { startAt endAt title categories { name } } } }
      }
    }`;

    try {
      const res = await fetch("https://gql.twitch.tv/gql", {
        method: "POST",
        headers: { "Client-Id": PUBLIC_WEB_CLIENT_ID, "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`twitch gql → ${res.status}`);
      const json = (await res.json()) as GqlResponse;
      const user = json.data?.user;

      const clips: TwitchClip[] = (user?.clips?.edges ?? []).flatMap(({ node }) =>
        node?.slug && node.thumbnailURL
          ? [
              {
                slug: node.slug,
                title: node.title ?? "",
                views: node.viewCount ?? 0,
                thumbnailUrl: node.thumbnailURL,
                durationSeconds: node.durationSeconds ?? 0,
                createdAt: node.createdAt ?? checkedAt,
              },
            ]
          : [],
      );

      const schedule: ScheduleSegment[] = (user?.channel?.schedule?.segments ?? []).flatMap((s) =>
        s.startAt && s.endAt
          ? [
              {
                startAt: s.startAt,
                endAt: s.endAt,
                title: s.title?.trim() || "Live",
                category: s.categories?.[0]?.name ?? null,
              },
            ]
          : [],
      );

      return { clips, schedule, checkedAt };
    } catch (e) {
      console.error("[twitch-extras]", e);
      return { clips: [], schedule: [], checkedAt };
    }
  },
);
