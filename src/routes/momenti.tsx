import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Milestone } from "lucide-react";
import type { ReactNode } from "react";

import { InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from "@/components/landing/BrandIcons";
import { Button } from "@/components/ui/button";
import { MOMENTI, SITE } from "@/lib/site-config";

const PAGE_TITLE = `${MOMENTI.name} — DJGIOVY57`;
const PAGE_DESCRIPTION =
  "Tutti i link ufficiali de I migliori momenti di Twitch, il progetto di DJGIOVY57 dedicato alle clip più belle nate in live: TikTok, Instagram, YouTube e X.";

export const Route = createFileRoute("/momenti")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/momenti` },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/momenti` }],
  }),
  component: MomentiPage,
});

function MomentiLink({
  icon,
  title,
  subtitle,
  href,
  featured = false,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <Button asChild variant="glow-highlight" size="xl" className="w-full justify-start gap-4 px-5">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/15">
          {icon}
        </span>
        <span className="flex min-w-0 flex-col items-start text-left">
          <span className="font-display font-bold leading-tight">{title}</span>
          <span className="truncate text-xs font-medium opacity-80">{subtitle}</span>
        </span>
        {featured && (
          <span className="ml-auto rounded-full bg-background/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            Pagina principale
          </span>
        )}
        {!featured && <ArrowUpRight className="ml-auto size-4 shrink-0 opacity-80" />}
      </a>
    </Button>
  );
}

/**
 * Link-in-bio page for the "I migliori momenti di Twitch" project:
 * the single URL to put in the bio of the project's social profiles.
 */
function MomentiPage() {
  return (
    <div data-cursor-highlight className="relative min-h-screen overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-highlight-radial" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 pr-16 py-16 sm:pr-5">
        <span className="flex size-20 items-center justify-center rounded-3xl bg-highlight/15 text-highlight ring-1 ring-highlight/40 shadow-glow-highlight">
          <TikTokIcon className="size-10" />
        </span>

        <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-highlight">
          Un progetto di DJGIOVY57
        </p>
        <h1 className="mt-3 text-center font-display text-3xl font-bold uppercase leading-tight text-gradient-highlight sm:text-4xl">
          {MOMENTI.name}
        </h1>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Le clip più belle nate in live, raccolte in un unico posto.
        </p>

        <div className="mt-10 flex w-full flex-col gap-4">
          <MomentiLink
            icon={<TikTokIcon className="size-5" />}
            title="TikTok"
            subtitle={`@${MOMENTI.handle}`}
            href={MOMENTI.links.tiktok}
            featured
          />
          <MomentiLink
            icon={<InstagramIcon className="size-5" />}
            title="Instagram"
            subtitle={`@${MOMENTI.handle}`}
            href={MOMENTI.links.instagram}
          />
          <MomentiLink
            icon={<YouTubeIcon className="size-5" />}
            title="YouTube"
            subtitle="Canale ufficiale"
            href={MOMENTI.links.youtube}
          />
          <MomentiLink
            icon={<XIcon className="size-5" />}
            title="X (Twitter)"
            subtitle={`@${MOMENTI.xHandle}`}
            href={MOMENTI.links.x}
          />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            to="/timeline"
            hash="momenti"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-highlight underline-offset-4 transition hover:underline"
          >
            <Milestone className="size-4" aria-hidden="true" />
            Timeline del progetto
          </Link>
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
