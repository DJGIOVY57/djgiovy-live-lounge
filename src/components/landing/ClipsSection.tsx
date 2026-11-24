import { useHydrated } from "@tanstack/react-router";
import { ExternalLink, Eye, Play } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cleanClipTitle, SITE_TIMEZONE } from "@/lib/schedule";
import { CREATOR } from "@/lib/site-config";
import type { TwitchClip } from "@/lib/twitch-extras.functions";

const dateFmt = new Intl.DateTimeFormat("it-IT", {
  timeZone: SITE_TIMEZONE,
  day: "numeric",
  month: "short",
  year: "numeric",
});

function ClipPlayer({ slug, title }: { slug: string; title: string }) {
  const hydrated = useHydrated();
  if (!hydrated) return null;
  return (
    <iframe
      src={`https://clips.twitch.tv/embed?clip=${slug}&parent=${window.location.hostname}&autoplay=true`}
      title={title}
      allowFullScreen
      className="absolute inset-0 size-full"
    />
  );
}

/** Most-viewed Twitch clips (auto-updated); each opens in an in-page player. */
export function ClipsSection({ clips }: { clips: TwitchClip[] }) {
  const [open, setOpen] = useState<TwitchClip | null>(null);
  if (clips.length === 0) return null;
  const fallback = `Clip di ${CREATOR.name}`;

  return (
    <section id="clip" aria-labelledby="clips-title" className="px-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Dal canale Twitch
            </p>
            <h2
              id="clips-title"
              className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
            >
              Clip più viste
            </h2>
          </div>
          <Button asChild variant="surface" size="lg">
            <a href={CREATOR.links.twitchClips} target="_blank" rel="noopener noreferrer">
              Tutte le clip <ExternalLink />
            </a>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip) => {
            const title = cleanClipTitle(clip.title, fallback);
            return (
              <button
                key={clip.slug}
                type="button"
                onClick={() => setOpen(clip)}
                className="surface-card surface-card-interactive group cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={clip.thumbnailUrl}
                    alt=""
                    loading="lazy"
                    width={480}
                    height={270}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/30 transition-colors group-hover:bg-background/10" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 size-6 fill-current" />
                    </span>
                  </span>
                  <span className="absolute right-2 bottom-2 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-semibold text-foreground">
                    0:{String(clip.durationSeconds).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="size-3.5 text-primary" />
                      {clip.views.toLocaleString("it-IT")}
                    </span>
                    <span>{dateFmt.format(new Date(clip.createdAt))}</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-3xl border-border bg-card p-3 sm:p-4">
          <DialogTitle className="line-clamp-1 pr-8 text-base">
            {open ? cleanClipTitle(open.title, fallback) : ""}
          </DialogTitle>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-background">
            {open && <ClipPlayer slug={open.slug} title={cleanClipTitle(open.title, fallback)} />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
