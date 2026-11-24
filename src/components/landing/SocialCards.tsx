import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from "./BrandIcons";

function SocialCard({
  icon,
  title,
  subtitle,
  href,
  cta,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  className?: string;
}) {
  return (
    <article className={`surface-card surface-card-interactive flex flex-col p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
          {icon}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm font-medium text-primary">{subtitle}</p>
        </div>
      </div>
      <div className="mt-auto pt-7">
        <Button asChild variant="glow" size="xl" className="w-full">
          <a href={href} target="_blank" rel="noopener noreferrer">
            {cta} <ArrowUpRight />
          </a>
        </Button>
      </div>
    </article>
  );
}

/**
 * Discord is not listed here: it has its own dedicated section (DiscordSection),
 * so the grid keeps only the platforms without a section of their own.
 */
export function SocialCards() {
  return (
    <section id="community" aria-labelledby="community-title" className="px-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Community & social
          </p>
          <h2
            id="community-title"
            className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
          >
            Resta sempre connesso
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <SocialCard
            icon={<YouTubeIcon className="size-7" />}
            title="YouTube"
            subtitle="Canale ufficiale"
            href={CREATOR.links.youtube}
            cta="Iscriviti al canale"
          />
          <SocialCard
            icon={<XIcon className="size-6" />}
            title="X (Twitter)"
            subtitle={`@${CREATOR.handle}`}
            href={CREATOR.links.x}
            cta="Segui su X"
          />
          <SocialCard
            icon={<InstagramIcon className="size-7" />}
            title="Instagram"
            subtitle={`@${CREATOR.handle.toLowerCase()}`}
            href={CREATOR.links.instagram}
            cta="Segui su Instagram"
          />
          <SocialCard
            icon={<TikTokIcon className="size-6" />}
            title="TikTok"
            subtitle={`@${CREATOR.handle.toLowerCase()}`}
            href={CREATOR.links.tiktok}
            cta="Segui su TikTok"
          />
        </div>
      </div>
    </section>
  );
}
