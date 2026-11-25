import { AlphaFloatingPill } from "@/components/landing/BetaIndicators";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { DiscordSection } from "@/components/landing/DiscordSection";
import { Hero } from "@/components/landing/Hero";
import { CommunityStats } from "@/components/landing/CommunityStats";
import { CommunityExtras } from "@/components/landing/CommunityExtras";
import { LiveModeToggle } from "@/components/landing/LiveModeToggle";
import { LiveNotificationBanner } from "@/components/landing/LiveNotificationBanner";
import { MomentiSection } from "@/components/landing/MomentiSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SocialCards } from "@/components/landing/SocialCards";
import { SpotifySection } from "@/components/landing/SpotifySection";
import { TwitchSection } from "@/components/landing/TwitchSection";
import { getChannelStatus } from "@/lib/channel.functions";
import { resolveIsLive, type LiveMode } from "@/lib/live-status";
import { SITE } from "@/lib/site-config";

// Real status is re-checked every 60s while the page is open.
const channelStatusQuery = queryOptions({
  queryKey: ["channel-status"],
  queryFn: () => getChannelStatus(),
  refetchInterval: 60_000,
  refetchOnWindowFocus: "always",
  refetchOnReconnect: "always",
  staleTime: 30_000,
});

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>): { test?: string } =>
    search["test"] !== undefined ? { test: String(search["test"]) } : {},
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(channelStatusQuery),
    ]),
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:image", content: SITE.shareImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: `${SITE.title} — Streamer Affiliato di Twitch e content creator` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: SITE.shareImage },
      { name: "twitter:image:alt", content: `${SITE.title} — Streamer Affiliato di Twitch e content creator` },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
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
      <AlphaFloatingPill />
      {live && <LiveNotificationBanner
        live={live}
        title={mode === "auto" ? data.twitch.title : null}
        category={mode === "auto" ? data.twitch.category : null}
        uptime={mode === "auto" ? data.twitch.uptime : null}
      />}
      <Hero live={live} avatarUrl={data.twitch.avatarUrl} />
      <main className="space-y-20 sm:space-y-28">
        <DiscordSection
          members={data.discord.members}
          online={data.discord.online}
        />
        {/* Programmazione e Clip nascoste: per riattivarle, reimporta ScheduleSection/ClipsSection,
            ripristina twitchExtrasQuery nel loader e renderizzale qui. */}
        <SpotifySection />
        <TwitchSection
          live={live}
          uptime={mode === "auto" ? data.twitch.uptime : null}
          followers={data.twitch.followers}
        />
        <SocialCards />
        <MomentiSection />
        <CommunityStats
          followers={data.twitch.followers}
          members={data.discord.members}
          online={data.discord.online}
        />
        <CommunityExtras />
      </main>
      <SiteFooter />
      <ScrollReveal />
      {showToggle && <LiveModeToggle mode={mode} onChange={setMode} />}
    </div>
  );
}
