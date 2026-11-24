import { ArrowUpRight, MessageCircle, Radio, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { DiscordIcon } from "./BrandIcons";

const PERKS = [
  {
    icon: Users,
    title: "Community sempre attiva",
    text: "Ci ritroviamo anche fuori dalle dirette: chiacchiere, giochi e tanta compagnia.",
  },
  {
    icon: Radio,
    title: "Avvisi live",
    text: "Ricevi la notifica appena vado in onda su Twitch, così non ti perdi nemmeno una diretta.",
  },
  {
    icon: MessageCircle,
    title: "Contatto diretto",
    text: "Il modo più semplice per parlare con me e con gli altri membri della Lounge.",
  },
] as const;

/**
 * Discord gets its own dedicated section (like "I migliori momenti di Twitch")
 * because it's the heart of the community — while staying in the social grid too.
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
              Il cuore della community
            </p>
            <h2
              id="discord-title"
              className="mt-3 font-display text-3xl font-bold uppercase text-gradient-primary sm:text-4xl"
            >
              Server Discord
            </h2>
          </div>

          <article className="surface-card surface-card-interactive flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/40 shadow-glow sm:size-16 sm:rounded-2xl">
                <DiscordIcon className="size-6 sm:size-8" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Entra nella Lounge
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground">Discord</h3>
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
            <Button asChild variant="glow" size="xl" className="w-full sm:w-auto">
              <a href={CREATOR.links.discord} target="_blank" rel="noopener noreferrer">
                Entra nel server <ArrowUpRight />
              </a>
            </Button>
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
          </div>
        </div>
      </div>
    </section>
  );
}
