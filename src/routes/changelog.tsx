import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Check, History, Palette, Sparkles } from "lucide-react";

import { CustomCursor } from "@/components/landing/CustomCursor";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Button } from "@/components/ui/button";
import { CURRENT_RELEASE, RELEASES } from "@/lib/changelog-data";
import { CREATOR } from "@/lib/site-config";

const TITLE = `Changelog — ${CREATOR.name}'s Lounge`;
const DESCRIPTION = `Novità, miglioramenti e note di rilascio del sito di ${CREATOR.name}.`;

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://djgiovy-live-lounge.lovable.app/changelog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://djgiovy-live-lounge.lovable.app/changelog" }],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
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
            <History className="size-5" aria-hidden="true" />
            <span className="font-display text-sm font-semibold">Note di rilascio</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-normal sm:text-5xl">Changelog</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            La Lounge, un aggiornamento alla volta.
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground/80">
            La numerazione riparte da 2.0: la 1.x è stata l’era del sito su Google Sites,
            raccontata nella{" "}
            <Link to="/timeline" className="text-primary hover:underline">
              timeline
            </Link>
            .
          </p>
        </div>

        <ol aria-label="Cronologia degli aggiornamenti" className="ml-2 border-l border-border">
          {RELEASES.map((release) => (
            <li key={`${release.date}-${release.title}`} className="relative pb-8 pl-6 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute -left-1.5 top-6 size-3 rounded-full bg-release shadow-release"
              />
              <article className="surface-card p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-release/40 bg-release/10 px-3 py-1 font-display text-xs font-semibold text-release">
                    {`${release.stage} v${release.version}`}
                  </span>
                  {release === CURRENT_RELEASE && (
                    <span className="text-xs font-medium text-primary">Versione attuale</span>
                  )}
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold tracking-normal sm:text-3xl">
                  {release.title}
                </h2>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                  <time dateTime={release.date}>
                    {new Intl.DateTimeFormat("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Europe/Rome",
                    }).format(new Date(`${release.date}T12:00:00Z`))}
                  </time>
                </div>
                <div className="mt-8 space-y-7 border-t border-border pt-7">
                  {release.groups.map((group, index) => {
                    const Icon = [Sparkles, Palette, Check][index] ?? Check;
                    return (
                      <section key={group.label}>
                        <h3 className="flex items-center gap-2 font-display text-base font-semibold tracking-normal">
                          <Icon className="size-4 text-primary" aria-hidden="true" />
                          {group.label}
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
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
