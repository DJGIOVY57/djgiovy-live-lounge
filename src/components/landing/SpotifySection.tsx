import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { SpotifyIcon } from "./BrandIcons";

/** Official Spotify playlist embed (dark theme) with a link to open it in the app. */
export function SpotifySection() {
  return (
    <section id="spotify" aria-labelledby="spotify-title" className="px-5">
      <div className="surface-card mx-auto max-w-5xl p-4 sm:p-7">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <SpotifyIcon className="size-6" />
            </span>
            <div>
              <h2 id="spotify-title" className="font-display text-2xl font-bold text-foreground">
                La mia playlist
              </h2>
              <p className="text-sm text-muted-foreground">I brani che suono e ascolto, su Spotify</p>
            </div>
          </div>
          <Button asChild variant="surface" size="lg" className="self-start sm:self-auto">
            <a href={CREATOR.links.spotify} target="_blank" rel="noopener noreferrer">
              Apri su Spotify <ExternalLink />
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${CREATOR.spotifyPlaylistId}?utm_source=generator&theme=0`}
            title={`Playlist Spotify di ${CREATOR.name}`}
            width="100%"
            height="380"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block w-full"
          />
        </div>
      </div>
    </section>
  );
}
