import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flag, Milestone } from "lucide-react";

import { CustomCursor } from "@/components/landing/CustomCursor";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";
import { MILESTONES } from "@/lib/timeline-data";

const TITLE = `Timeline — ${CREATOR.name}'s Lounge`;
const DESCRIPTION = `Le tappe della storia del sito di ${CREATOR.name}, dalle origini nel 2021 alla nascita della Lounge.`;

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://djgiovy-live-lounge.lovable.app/timeline" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://djgiovy-live-lounge.lovable.app/timeline" }],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <Link to="/" className="font-display text-lg font-bold text-foreground hover:text-primary">
            {CREATOR.name}<span className="text-primary">'s Lounge</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/"><ArrowLeft aria-hidden="true" />Torna alla home</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-4 pt-12 sm:pt-20">
        <div className="mb-10 sm:mb-14">
          <div className="mb-5 flex items-center gap-2 text-primary">
            <Milestone className="size-5" aria-hidden="true" />
            <span className="font-display text-sm font-semibold">La storia del sito</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-normal sm:text-5xl">Timeline</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Da un’idea iniziale alla Lounge di oggi.
          </p>
        </div>

        <ol aria-label="Tappe della storia del sito" className="ml-2 border-l border-primary/30">
          {MILESTONES.map((milestone) => (
            <li key={milestone.date} className="relative pb-12 pl-6 last:pb-4 sm:pl-10">
              <span aria-hidden="true" className="absolute -left-1.5 top-4 size-3 rounded-full bg-primary shadow-glow" />
              <article>
                <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 font-display text-base font-semibold text-primary">
                  <Flag className="size-4 shrink-0" aria-hidden="true" />
                  <time dateTime={milestone.date}>
                    {new Intl.DateTimeFormat("it-IT", {
                      day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome",
                    }).format(new Date(`${milestone.date}T12:00:00Z`))}
                  </time>
                </div>
                <p className="mt-6 font-display text-xs font-semibold uppercase tracking-normal text-primary/70">{milestone.label}</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-normal sm:text-3xl">{milestone.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{milestone.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
      <CustomCursor />
    </div>
  );
}