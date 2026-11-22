import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { CREATOR } from "@/lib/site-config";

import { DiscordIcon, XIcon } from "./BrandIcons";

function SocialCard({
  icon,
  title,
  subtitle,
  description,
  extra,
  href,
  cta,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  extra?: ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <article className="surface-card surface-card-interactive flex flex-col p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
          {icon}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm font-medium text-primary">{subtitle}</p>
        </div>
      </div>
      <p className="mt-5 leading-relaxed text-muted-foreground">{description}</p>
      {extra}
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

export function SocialCards({
  discordMembers,
  discordOnline,
}: {
  discordMembers: number | null;
  discordOnline: number | null;
}) {
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
            icon={<DiscordIcon className="size-7" />}
            title="Discord"
            subtitle="Server della community"
            description="Entra nel server per giocare insieme, ricevere le notifiche delle live e partecipare agli eventi."
            extra={
              discordMembers !== null ? (
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-muted-foreground">
                    <span className="size-2 rounded-full bg-primary-glow" />
                    <span className="font-semibold text-foreground">{discordOnline ?? 0}</span>{" "}
                    online
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-muted-foreground">
                    <span className="size-2 rounded-full bg-offline" />
                    <span className="font-semibold text-foreground">{discordMembers}</span> membri
                  </span>
                </div>
              ) : null
            }
            href={CREATOR.links.discord}
            cta="Entra nel server"
          />
          <SocialCard
            icon={<XIcon className="size-6" />}
            title="X (Twitter)"
            subtitle={`@${CREATOR.handle}`}
            description="Aggiornamenti quotidiani, clip delle live, orari delle stream e tutte le novità."
            href={CREATOR.links.x}
            cta="Segui su X"
          />
        </div>
      </div>
    </section>
  );
}
