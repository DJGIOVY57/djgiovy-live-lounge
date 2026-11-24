import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import { CREATOR } from "@/lib/site-config";

import {
  DiscordIcon,
  InstagramIcon,
  SpotifyIcon,
  TikTokIcon,
  TwitchIcon,
  XIcon,
  YouTubeIcon,
} from "./BrandIcons";

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-glow"
    >
      {children}
    </a>
  );
}

export function SiteFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="mt-24 border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">{CREATOR.name}</span>. Tutti i diritti
            riservati.
          </p>
          <nav aria-label="Informazioni sul sito" className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <Button
            asChild
            variant="link"
            size="sm"
            className="h-auto px-0 py-1 text-muted-foreground hover:text-primary"
          >
            <Link to="/changelog">Note di rilascio</Link>
          </Button>
          <Button asChild variant="link" size="sm" className="h-auto px-0 py-1 text-muted-foreground hover:text-primary">
            <Link to="/timeline">Timeline</Link>
          </Button>
          <Button asChild variant="link" size="sm" className="h-auto px-0 py-1 text-muted-foreground hover:text-highlight">
            <Link to="/momenti-timeline">Timeline Momenti</Link>
          </Button>
          </nav>
        </div>
        <nav aria-label="Social" className="flex flex-wrap items-center justify-center gap-3">
          <FooterLink href={CREATOR.links.twitch} label="Twitch">
            <TwitchIcon className="size-5" />
          </FooterLink>
          <FooterLink href={CREATOR.links.discord} label="Discord">
            <DiscordIcon className="size-5" />
          </FooterLink>
          <FooterLink href={CREATOR.links.x} label="X (Twitter)">
            <XIcon className="size-4" />
          </FooterLink>
          <FooterLink href={CREATOR.links.youtube} label="YouTube">
            <YouTubeIcon className="size-5" />
          </FooterLink>
          <FooterLink href={CREATOR.links.spotify} label="Spotify">
            <SpotifyIcon className="size-5" />
          </FooterLink>
          <FooterLink href={CREATOR.links.instagram} label="Instagram">
            <InstagramIcon className="size-5" />
          </FooterLink>
          <FooterLink href={CREATOR.links.tiktok} label="TikTok">
            <TikTokIcon className="size-5" />
          </FooterLink>
        </nav>
      </div>
      {children}
    </footer>
  );
}
