import { useHydrated } from "@tanstack/react-router";
import { ExternalLink, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { TwitchIcon } from "./BrandIcons";
import { LiveBadge } from "./LiveBadge";

/**
 * Official Twitch player. Twitch requires `parent` to match the domain the page is
 * served from, so it is read from window.location.hostname after hydration —
 * this works on the preview, the published site and any custom domain.
 */
function TwitchPlayer() {
  const hydrated = useHydrated();
  const parent = hydrated ? window.location.hostname : null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background">
      {parent ? (
        <iframe
          src={`https://player.twitch.tv/?channel=${CREATOR.twitchChannel}&parent=${parent}&muted=true&autoplay=false`}
          title={`Player Twitch di ${CREATOR.name}`}
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 size-full"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <TwitchIcon className="size-10 animate-pulse text-primary/60" />
        </div>
      )}
    </div>
  );
}

export function TwitchSection({
  live,
  uptime,
  followers,
}: {
  live: boolean;
  uptime: string | null;
  followers: number | null;
}) {
  return (
    <section id="twitch" aria-labelledby="twitch-title" className="px-5">
      <div className="surface-card mx-auto max-w-5xl p-4 sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <TwitchIcon className="size-6" />
            </span>
            <div>
              <h2 id="twitch-title" className="font-display text-2xl font-bold text-foreground">
                Canale Twitch
              </h2>
              <p className="text-sm text-muted-foreground">
                twitch.tv/{CREATOR.twitchChannel}
                {live && uptime ? ` · in live da ${uptime}` : ""}
              </p>
            </div>
          </div>
          <LiveBadge live={live} className="self-start sm:self-auto" />
        </div>

        <TwitchPlayer />

        <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4 text-primary" />
            {followers !== null ? (
              <span>
                <span className="font-semibold text-foreground">
                  {followers.toLocaleString("it-IT")}
                </span>{" "}
                follower e in crescita
              </span>
            ) : (
              <span>Unisciti alla community</span>
            )}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="glow" size="xl">
              <a href={CREATOR.links.twitch} target="_blank" rel="noopener noreferrer">
                Apri su Twitch <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
