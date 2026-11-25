import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Flag, Milestone } from "lucide-react";

import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";
import { MOMENTI_MILESTONES } from "@/lib/momenti-timeline-data";
import { CREATOR, MOMENTI, SITE } from "@/lib/site-config";
import { MILESTONES } from "@/lib/timeline-data";

const TITLE = `Timeline — ${CREATOR.name}'s Lounge`;
const DESCRIPTION = `Le tappe del sito di ${CREATOR.name} e de ${MOMENTI.name}, dalla prima live del 2020 alla Lounge di oggi.`;

export const Route = createFileRoute("/timeline")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/timeline` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/timeline` }],
  }),
  component: TimelinePage,
});

type Milestone = {
  readonly date: string;
  readonly title: string;
  readonly label: string;
  readonly description: string;
};

/** Static class sets: one tone per story, so the two blocks never blur together. */
const TONES = {
  primary: {
    text: "text-primary",
    rail: "border-primary/30",
    dot: "bg-primary shadow-glow",
    badge: "border-primary/40 bg-primary/10 text-primary",
    sub: "text-primary/70",
  },
  highlight: {
    text: "text-highlight",
    rail: "border-highlight/30",
    dot: "bg-highlight shadow-glow-highlight",
    badge: "border-highlight/40 bg-highlight/10 text-highlight",
    sub: "text-highlight/70",
  },
} as const;

function formatDate(date: string) {
  // Month-only milestones (e.g. "2021-11") have no day: format year + month only.
  if (!date.includes("-", 5)) {
    return new Intl.DateTimeFormat("it-IT", {
      month: "long",
      year: "numeric",
      timeZone: "Europe/Rome",
    }).format(new Date(`${date}-01T12:00:00Z`));
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  }).format(new Date(`${date}T12:00:00Z`));
}

function HistoryBlock({
  id,
  tone,
  kicker,
  title,
  intro,
  milestones,
  ctaHref,
  ctaLabel,
}: {
  id: string;
  tone: keyof typeof TONES;
  kicker: string;
  title: string;
  intro: string;
  milestones: readonly Milestone[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const t = TONES[tone];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 rounded-[calc(var(--radius)+16px)] border border-border bg-card/40 p-5 sm:p-8"
      data-cursor-highlight={tone === "highlight" ? "" : undefined}
    >
      <div className="mb-8">
        <div className={`mb-3 flex items-center gap-2 ${t.text}`}>
          <Milestone className="size-5" aria-hidden="true" />
          <span className="font-display text-sm font-semibold">{kicker}</span>
        </div>
        <h2
          id={`${id}-title`}
          className="font-display text-2xl font-bold tracking-normal sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      </div>

      <ol aria-label={`Tappe di ${title}`} className={`ml-2 border-l ${t.rail}`}>
        {milestones.map((milestone) => (
          <li key={milestone.date} className="relative pb-12 pl-6 last:pb-2 sm:pl-10">
            <span
              aria-hidden="true"
              className={`absolute -left-1.5 top-4 size-3 rounded-full ${t.dot}`}
            />
            <article>
              <div
                className={`inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg border px-3 py-2 font-display text-base font-semibold ${t.badge}`}
              >
                <Flag className="size-4 shrink-0" aria-hidden="true" />
                <time dateTime={milestone.date}>{formatDate(milestone.date)}</time>
              </div>
              <p className={`mt-6 font-display text-xs font-semibold uppercase tracking-normal ${t.sub}`}>
                {milestone.label}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-normal sm:text-2xl">
                {milestone.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {milestone.description}
              </p>
            </article>
          </li>
        ))}
      </ol>

      {ctaHref && ctaLabel && (
        <div className="mt-8">
          <Button asChild variant="glow-highlight" size="xl">
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel} <ArrowUpRight />
            </a>
          </Button>
        </div>
      )}
    </section>
  );
}

function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="font-display text-lg font-bold text-foreground hover:text-primary"
          >
            {CREATOR.name}
            <span className="text-primary">'s Lounge</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Torna alla home
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-4 pt-12 sm:pt-20">
        <div className="mb-10 sm:mb-14">
          <div className="mb-5 flex items-center gap-2 text-primary">
            <Milestone className="size-5" aria-hidden="true" />
            <span className="font-display text-sm font-semibold">La storia</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-normal sm:text-5xl">Timeline</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Due percorsi sulla stessa pagina: il sito di {CREATOR.name} e il progetto{" "}
            {MOMENTI.name}.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-14">
          <HistoryBlock
            id="sito"
            tone="primary"
            kicker="Il sito"
            title={`${CREATOR.name}'s Lounge`}
            intro="Dalla prima live del 2020 alla Lounge di oggi."
            milestones={MILESTONES}
          />
          <HistoryBlock
            id="momenti"
            tone="highlight"
            kicker="Il progetto"
            title={MOMENTI.name}
            intro="Da una pagina TikTok a un progetto con più canali."
            milestones={MOMENTI_MILESTONES}
            ctaHref={MOMENTI.links.tiktok}
            ctaLabel="Segui il progetto su TikTok"
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
