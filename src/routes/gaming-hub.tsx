import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Headphones, Search, ShieldCheck } from "lucide-react";

import { DiscordIcon } from "@/components/landing/BrandIcons";
import { Button } from "@/components/ui/button";
import { getChannelStatus } from "@/lib/channel.functions";
import { CREATOR, DISCORD, SITE } from "@/lib/site-config";

const PAGE_TITLE = `${DISCORD.name} — Server Discord multigioco`;
const PAGE_DESCRIPTION =
  "Gaming Hub è il server Discord multigioco aperto a tutti i player: stanze dedicate a GTA, FIFA, Fortnite, Minecraft, Rainbow Six Siege e tanti altri giochi.";

const statusQuery = queryOptions({
  queryKey: ["channel-status"],
  queryFn: () => getChannelStatus(),
  staleTime: 30_000,
  refetchInterval: 60_000,
});

export const Route = createFileRoute("/gaming-hub")({
  staticData: { sitemap: true },
  loader: ({ context }) => context.queryClient.ensureQueryData(statusQuery),
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/gaming-hub` },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/gaming-hub` }],
  }),
  component: GamingHubPage,
});

const ROOMS = [
  { name: "GTA V / Online", text: "Sessioni libere, colpi e gare insieme." },
  { name: "EA Sports FC / FIFA", text: "Sfide 1v1, tornei e Ultimate Team." },
  { name: "Fortnite", text: "Ranked, battaglie reali e partite personalizzate." },
  { name: "Minecraft", text: "Survival, creative e mondi condivisi." },
  { name: "Rainbow Six Siege", text: "Partite competitive e callout di squadra." },
  { name: "Multigioco & Novità", text: "Spazio per qualsiasi altro gioco o titolo del momento." },
] as const;

const PERKS = [
  { icon: Headphones, title: "Stanze vocali dedicate", text: "Un canale per ogni gioco, per coordinarsi al meglio durante le partite." },
  { icon: Search, title: "Trova compagni di squadra", text: "Cerca player con cui giocare invece di finire in squadra con sconosciuti a caso." },
  { icon: ShieldCheck, title: "Fair play e moderazione", text: "Un ambiente rispettoso, con moderazione sempre attiva." },
] as const;

const RULES = [
  "Rispetta tutti: niente insulti, discriminazioni o toxicity.",
  "Niente spam né pubblicità non autorizzata.",
  "Usa le stanze giuste per ogni gioco.",
  "Divertirsi prima di tutto.",
] as const;

function GamingHubPage() {
  const { data } = useSuspenseQuery(statusQuery);
  const { members, online } = data.discord;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary-radial" />
      <main className="relative mx-auto w-full max-w-5xl px-5 py-16">
        <header className="flex flex-col items-center text-center">
          <span className="flex size-20 items-center justify-center rounded-3xl bg-primary/15 text-primary ring-1 ring-primary/40 shadow-glow">
            <DiscordIcon className="size-10" />
          </span>
          <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Un progetto di {CREATOR.name} · {DISCORD.role} · Dal novembre 2021
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-gradient-primary sm:text-5xl">
            {DISCORD.name}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Il server Discord multigioco aperto a tutti i player. Trova compagni di squadra, entra
            nelle stanze dedicate e gioca senza limiti.
          </p>
          {members !== null && (
            <p className="mt-4 flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary-glow" />
                <span className="font-semibold text-foreground">{online ?? 0}</span> online
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-offline" />
                <span className="font-semibold text-foreground">{members}</span> membri
              </span>
            </p>
          )}
          <Button asChild variant="glow" size="xl" className="mt-8">
            <a href={CREATOR.links.discord} target="_blank" rel="noopener noreferrer">
              Entra nel Gaming Hub <ArrowUpRight />
            </a>
          </Button>
        </header>

        <section aria-labelledby="rooms-title" className="mt-16">
          <h2 id="rooms-title" className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
            Le stanze gioco
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room) => (
              <li key={room.name} className="surface-card surface-card-interactive p-6">
                <h3 className="font-display text-lg font-bold text-primary">{room.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="perks-title" className="mt-16">
          <h2 id="perks-title" className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
            Perché entrare
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PERKS.map((perk) => (
              <article key={perk.title} className="surface-card p-6">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <perk.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{perk.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="rules-title" className="surface-card mx-auto mt-16 max-w-2xl p-6 sm:p-8">
          <h2 id="rules-title" className="font-display text-2xl font-bold text-foreground">
            Regolamento rapido
          </h2>
          <ol className="mt-4 space-y-3">
            {RULES.map((rule, i) => (
              <li key={rule} className="flex gap-3 text-sm text-muted-foreground">
                <span className="font-display font-bold text-primary">{i + 1}.</span>
                {rule}
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Torna alla Lounge
          </Link>
        </div>
      </main>
    </div>
  );
}
