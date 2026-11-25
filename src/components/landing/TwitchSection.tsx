import { useHydrated } from "@tanstack/react-router";
import { ExternalLink, Maximize2, Minimize2, Play, Target, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { nextFollowerGoal } from "@/lib/follower-goal";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { TwitchIcon } from "./BrandIcons";
import { LiveBadge } from "./LiveBadge";

/**
 * Official Twitch player. Twitch requires `parent` to match the domain the page is
 * served from, so it is read from window.location.hostname after hydration —
 * this works on the preview, the published site and any custom domain.
 */
function TwitchPlayer({ cinema, active, onActivate }: { cinema: boolean; active: boolean; onActivate: () => void }) {
  const hydrated = useHydrated();
  const parent = hydrated && active ? window.location.hostname : null;

  return (
    <div
      className={
        cinema
          ? "fixed left-1/2 top-1/2 z-[60] aspect-video w-[min(94vw,calc(88vh*16/9))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-primary/50 bg-background shadow-glow"
          : "relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background"
      }
    >
      {parent ? (
        <iframe
          src={`https://player.twitch.tv/?channel=${CREATOR.twitchChannel}&parent=${parent}&muted=true&autoplay=false`}
          title={`Player Twitch di ${CREATOR.name}`}
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 size-full"
        />
      ) : active ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <TwitchIcon className="size-10 animate-pulse text-primary/60" />
        </div>
      ) : (
        // Lightweight cover: the heavy Twitch player only loads on request (or automatically when live).
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-card to-background p-4 text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-offline/15 text-offline ring-1 ring-offline/30">
            <TwitchIcon className="size-8" />
          </span>
          <p className="text-sm text-muted-foreground">Al momento sono offline</p>
          <Button variant="glow" size="lg" onClick={onActivate}>
            <Play /> Carica il player
          </Button>
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
  const [cinema, setCinema] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const playerActive = live || cinema || loadRequested;

  useEffect(() => {
    if (!cinema) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCinema(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [cinema]);

  const goal = followers !== null ? nextFollowerGoal(followers) : null;

  return (
    <section id="twitch" aria-labelledby="twitch-title" data-live={live} className="scroll-mt-6 px-5">
      <div className="surface-card mx-auto max-w-5xl p-4 sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className={`flex size-12 items-center justify-center rounded-xl ring-1 ${live ? "bg-primary/15 text-primary ring-primary/30" : "bg-offline/15 text-offline ring-offline/30"}`}>
              <TwitchIcon className={live ? "size-6 motion-safe:animate-pulse" : "size-6"} />
            </span>
            <div>
              <h2 id="twitch-title" tabIndex={-1} className="font-display text-2xl font-bold text-foreground">
                Canale Twitch
              </h2>
              {live && uptime ? (
                <p className="text-sm text-muted-foreground">in live da {uptime}</p>
              ) : null}
            </div>
          </div>
          <LiveBadge live={live} className="self-start sm:self-auto" />
        </div>

        <div className="mb-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setCinema(true)} aria-label="Attiva modalità cinema">
            <Maximize2 /> Modalità cinema
          </Button>
        </div>

        {cinema ? (
          <>
            <button
              type="button"
              aria-label="Chiudi modalità cinema"
              onClick={() => setCinema(false)}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCinema(false)}
              className="fixed right-4 top-4 z-[61]"
            >
              <Minimize2 /> Esci (Esc)
            </Button>
          </>
        ) : null}

        <TwitchPlayer cinema={cinema} active={playerActive} onActivate={() => setLoadRequested(true)} />
        {cinema ? <div className="aspect-video w-full rounded-2xl border border-dashed border-border" /> : null}

        {goal && followers !== null ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-display font-semibold text-foreground">
                <Target className="size-4 text-primary" />
                Road to {goal.goal.toLocaleString("it-IT")} follower
              </span>
              <span className="font-semibold text-primary">{goal.percent}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={goal.goal}
              aria-valuenow={followers}
              aria-label="Traguardo follower"
              className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full rounded-full bg-gradient-primary shadow-glow transition-[width] duration-700"
                style={{ width: `${goal.percent}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4 text-primary" />
            {followers !== null ? (
              <span className="font-semibold text-foreground">
                {followers.toLocaleString("it-IT")}
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
