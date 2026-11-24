import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Flag, Milestone } from "lucide-react";

import { CustomCursor } from "@/components/landing/CustomCursor";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";
import { MOMENTI_MILESTONES } from "@/lib/momenti-timeline-data";
import { CREATOR, MOMENTI } from "@/lib/site-config";

const TITLE = `Timeline — ${MOMENTI.name}`;
const DESCRIPTION = `Le tappe de ${MOMENTI.name}, il progetto di ${CREATOR.name}: dalla nascita della pagina TikTok all'arrivo su YouTube, Instagram e X.`;

export const Route = createFileRoute("/momenti-timeline")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://djgiovy-live-lounge.lovable.app/momenti-timeline" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://djgiovy-live-lounge.lovable.app/momenti-timeline" }],
  }),
  component: MomentiTimelinePage,
});

function MomentiTimelinePage() {
  return (
    <div className="min-h-screen bg-background" data-cursor-highlight>
      <header className="border-b border-border px-5 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <Link to="/" className="font-display text-lg font-bold text-foreground hover:text-highlight">
            {CREATOR.name}<span className="text-primary">'s Lounge</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/"><ArrowLeft aria-hidden="true" />Torna alla home</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-4 pt-12 sm:pt-20">
        <div className="mb-10 sm:mb-14">
          <div className="mb-5 flex items-center gap-2 text-highlight">
            <Milestone className="size-5" aria-hidden="true" />
            <span className="font-display text-sm font-semibold">La storia del progetto</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-normal text-gradient-highlight sm:text-5xl">
            Timeline
          </h1>
          <p className="mt-3 font-display text-lg font-bold uppercase text-highlight">
            {MOMENTI.name}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Da una pagina TikTok a un progetto con più canali.
          </p>
        </div>

        <ol aria-label="Tappe della storia del progetto" className="ml-2 border-l border-highlight/30">
          {MOMENTI_MILESTONES.map((milestone) => (
            <li key={milestone.date} className="relative pb-12 pl-6 last:pb-4 sm:pl-10">
              <span aria-hidden="true" className="absolute -left-1.5 top-4 size-3 rounded-full bg-highlight shadow-glow-highlight" />
              <article>
                <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg border border-highlight/40 bg-highlight/10 px-3 py-2 font-display text-base font-semibold text-highlight">
                  <Flag className="size-4 shrink-0" aria-hidden="true" />
                  <time dateTime={milestone.date}>
                    {new Intl.DateTimeFormat("it-IT", {
                      day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome",
                    }).format(new Date(`${milestone.date}T12:00:00Z`))}
                  </time>
                </div>
                <p className="mt-6 font-display text-xs font-semibold uppercase tracking-normal text-highlight/70">{milestone.label}</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-normal sm:text-3xl">{milestone.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{milestone.description}</p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Button asChild variant="glow-highlight" size="xl">
            <a href={MOMENTI.links.tiktok} target="_blank" rel="noopener noreferrer">
              Segui il progetto su TikTok <ArrowUpRight />
            </a>
          </Button>
        </div>
      </main>
      <SiteFooter />
      <CustomCursor />
    </div>
  );
}
