import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { SpotifyIcon } from "./BrandIcons";

/** Official Spotify playlist embed (dark theme) with a link to open it in the app. */
export function SpotifySection() {
  // The Spotify player is heavy, so it only loads when the visitor asks for it.
  const [active, setActive] = useState(false);
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
                Playlist Spotify
              </h2>
            </div>
          </div>
          <Button asChild variant="surface" size="lg" className="self-start sm:self-auto">
            <a href={CREATOR.links.spotify} target="_blank" rel="noopener noreferrer">
              Apri su Spotify <ExternalLink />
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          {active ? (
          <iframe
            src={`https://open.spotify.com/embed/playlist/${CREATOR.spotifyPlaylistId}?utm_source=generator&theme=0`}
            title={`Playlist Spotify di ${CREATOR.name}`}
            width="100%"
            height="380"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block w-full"
          />
          ) : (
            <div className="flex h-[380px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-card to-background p-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <SpotifyIcon className="size-8" />
              </span>
              <p className="text-sm text-muted-foreground">Ascolta la playlist direttamente qui</p>
              <Button variant="glow" size="lg" onClick={() => setActive(true)}>
                <Play /> Carica il player
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
