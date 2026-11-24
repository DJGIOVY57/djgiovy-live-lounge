import { ArrowUpRight, Milestone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { MOMENTI } from "@/lib/site-config";

import { InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from "./BrandIcons";

function MomentiCard({
  icon,
  title,
  subtitle,
  href,
  cta,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="surface-card surface-card-highlight flex flex-col p-6">
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-highlight/15 text-highlight ring-1 ring-highlight/30">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
          <p className="truncate text-sm font-medium text-highlight">{subtitle}</p>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Button asChild variant="glow-highlight" size="xl" className="w-full">
          <a href={href} target="_blank" rel="noopener noreferrer">
            {cta} <ArrowUpRight />
          </a>
        </Button>
      </div>
    </article>
  );
}

/**
 * "I migliori momenti di Twitch": a separate project founded by the creator.
 * Uses the yellow accent (instead of emerald) so it reads as its own brand.
 */
export function MomentiSection() {
  return (
    <section id="momenti" aria-labelledby="momenti-title" className="px-5">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[calc(var(--radius)+16px)] border border-highlight/20 p-5 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-highlight-radial" />

        <div className="relative">
          <div className="mb-8 text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-highlight">
              Un mio progetto · Founder
            </p>
            <h2
              id="momenti-title"
              className="mt-3 font-display text-3xl font-bold uppercase text-gradient-highlight sm:text-4xl"
            >
              {MOMENTI.name}
            </h2>
            <Link
              to="/timeline"
              hash="momenti"
              className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold text-highlight underline-offset-4 transition hover:underline"
            >
              <Milestone className="size-4" aria-hidden="true" />
              Timeline del progetto
            </Link>
          </div>

          {/* TikTok is the main page of the project: featured, full width */}
          <article className="surface-card surface-card-highlight flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl sm:size-16 sm:rounded-2xl bg-highlight/15 text-highlight ring-1 ring-highlight/40 shadow-glow-highlight">
                <TikTokIcon className="size-6 sm:size-8" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-highlight">
                  Pagina principale
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground">TikTok</h3>
                <p className="break-all text-sm font-medium text-highlight">@{MOMENTI.handle}</p>
              </div>
            </div>
            <Button asChild variant="glow-highlight" size="xl" className="w-full sm:w-auto">
              <a href={MOMENTI.links.tiktok} target="_blank" rel="noopener noreferrer">
                Segui su TikTok <ArrowUpRight />
              </a>
            </Button>
          </article>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <MomentiCard
              icon={<InstagramIcon className="size-6" />}
              title="Instagram"
              subtitle={`@${MOMENTI.handle}`}
              href={MOMENTI.links.instagram}
              cta="Segui su Instagram"
            />
            <MomentiCard
              icon={<YouTubeIcon className="size-6" />}
              title="YouTube"
              subtitle="Canale ufficiale"
              href={MOMENTI.links.youtube}
              cta="Iscriviti"
            />
            <MomentiCard
              icon={<XIcon className="size-5" />}
              title="X (Twitter)"
              subtitle={`@${MOMENTI.xHandle}`}
              href={MOMENTI.links.x}
              cta="Segui su X"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
