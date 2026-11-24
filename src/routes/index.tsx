import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Hero } from "@/components/landing/Hero";
import { LiveModeToggle } from "@/components/landing/LiveModeToggle";
import { MomentiSection } from "@/components/landing/MomentiSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SocialCards } from "@/components/landing/SocialCards";
import { SpotifySection } from "@/components/landing/SpotifySection";
import { TwitchSection } from "@/components/landing/TwitchSection";
import { getChannelStatus } from "@/lib/channel.functions";
import { resolveIsLive, type LiveMode } from "@/lib/live-status";

// Real status is re-checked every 60s while the page is open.
const channelStatusQuery = queryOptions({
  queryKey: ["channel-status"],
  queryFn: () => getChannelStatus(),
  refetchInterval: 60_000,
  staleTime: 30_000,
});

const TITLE = "DJGIOVY57's Lounge";
const DESCRIPTION =
  "Il punto d'incontro di DJGIOVY57: live su Twitch, playlist Spotify, video su YouTube, community Discord e aggiornamenti su X, Instagram e TikTok. Più il progetto I migliori momenti di Twitch.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { test?: string } =>
    search["test"] !== undefined ? { test: String(search["test"]) } : {},
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(channelStatusQuery),
    ]),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(channelStatusQuery);
  const { test } = Route.useSearch();
  // "auto" = real Twitch status; the toggle can force live/offline for testing.
  const [mode, setMode] = useState<LiveMode>("auto");
  const live = resolveIsLive(mode, data.twitch.live);
  const showToggle = import.meta.env.DEV || test !== undefined;

  return (
    <div className="min-h-screen bg-background">
      <Hero live={live} avatarUrl={data.twitch.avatarUrl} />
      <main className="space-y-20 sm:space-y-28">
        <TwitchSection
          live={live}
          uptime={mode === "auto" ? data.twitch.uptime : null}
          followers={data.twitch.followers}
        />
        {/* Programmazione e Clip nascoste: per riattivarle, reimporta ScheduleSection/ClipsSection,
            ripristina twitchExtrasQuery nel loader e renderizzale qui. */}
        <SpotifySection />
        <SocialCards
          discordMembers={data.discord.members}
          discordOnline={data.discord.online}
        />
        <MomentiSection />
      </main>
      <SiteFooter />
      {showToggle && <LiveModeToggle mode={mode} onChange={setMode} />}
    </div>
  );
}
