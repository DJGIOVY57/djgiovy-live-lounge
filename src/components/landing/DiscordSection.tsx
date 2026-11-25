import { ArrowUpRight, Gamepad2, Headphones, Search } from "lucide-react";

import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { CREATOR, DISCORD } from "@/lib/site-config";

import { DiscordIcon } from "./BrandIcons";

const PERKS = [
  {
    icon: Search,
    title: "Trova compagni di squadra",
    text: "Cerca altri player con cui fare sessioni, scalare i rank o completare missioni senza finire in squadra con sconosciuti a caso.",
  },
  {
    icon: Headphones,
    title: "Canali vocali dedicati",
    text: "Stanze vocali divise per ogni titolo con audio dedicato, perfette per callout di squadra e coordinazione in tempo reale.",
  },
] as const;

/**
 * Discord gets its own dedicated section (like "I migliori momenti di Twitch")
 * because the Gaming Hub is a standalone project, not just another social link.
 */
export function DiscordSection({
  members,
  online,
}: {
  members: number | null;
  online: number | null;
}) {
  return (
    <section id="discord" aria-labelledby="discord-title" className="px-5">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[calc(var(--radius)+16px)] border border-primary/20 p-5 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary-radial" />

        <div className="relative">
          <div className="mb-8 text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Un mio progetto · {DISCORD.role}
            </p>
            <h2
              id="discord-title"
              className="mt-3 font-display text-3xl font-bold uppercase text-gradient-primary sm:text-4xl"
            >
              {DISCORD.name}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Il server Discord fondato da {CREATOR.name}
            </p>
          </div>

          <article className="surface-card surface-card-interactive flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/40 shadow-glow sm:size-16 sm:rounded-2xl">
                <DiscordIcon className="size-6 sm:size-8" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Il cuore della community
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground">{DISCORD.name}</h3>
                {members !== null ? (
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-primary-glow" />
                      <span className="font-semibold text-foreground">{online ?? 0}</span> online
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-offline" />
                      <span className="font-semibold text-foreground">{members}</span> membri
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <Button asChild variant="glow" size="xl" className="w-full sm:w-auto">
                <a href={CREATOR.links.discord} target="_blank" rel="noopener noreferrer">
                  Entra nel Gaming Hub <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/gaming-hub">Scopri il Gaming Hub</Link>
              </Button>
            </div>
          </article>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {PERKS.map((perk) => (
              <article key={perk.title} className="surface-card flex flex-col p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <perk.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{perk.text}</p>
              </article>
            ))}

            <article className="surface-card flex flex-col p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Gamepad2 className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                Stanze per ogni gioco
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Nel server trovi stanze riservate ai giochi che ci piacciono: entra, chiama e si
                gioca insieme.
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                {DISCORD.games.map((game) => (
                  <li
                    key={game}
                    className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {game}
                  </li>
                ))}
                <li className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {DISCORD.gamesTail}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
