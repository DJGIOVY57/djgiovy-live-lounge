import { Link } from "@tanstack/react-router";
import { ArrowRight, Crown, Milestone, Network } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ECOSYSTEM } from "@/lib/site-config";

import { DiscordIcon, TikTokIcon } from "./BrandIcons";

/** Both alternatives stay visible in this draft until the creator chooses one. */
export function CommunityStats() {
  const tiles = [
    {
      icon: Milestone,
      value: String(ECOSYSTEM.startYear),
      label: "Anno di partenza",
      detail: "Dalla prima pagina Google Sites alla Lounge attuale.",
      highlight: false,
    },
    {
      icon: Crown,
      value: String(ECOSYSTEM.projects.length),
      label: "Progetti fondati",
      detail: "Gaming Hub & I migliori momenti di Twitch",
      highlight: true,
    },
    {
      icon: Network,
      value: String(ECOSYSTEM.platforms.length),
      label: "Piattaforme collegate",
      detail: ECOSYSTEM.platforms.join(" · "),
      highlight: false,
    },
  ];

  return (
    <div className="space-y-16 px-5 sm:space-y-20">
      <section aria-labelledby="ecosystem-title" className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <h2 id="ecosystem-title" className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Il percorso e l’ecosistema
          </h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiles.map(({ icon: Icon, value, label, detail, highlight }) => (
            <article key={label} data-cursor-highlight={highlight || undefined} className={`surface-card flex flex-col gap-3 p-6 ${highlight ? "surface-card-highlight border-highlight/20" : "surface-card-interactive"}`}>
              <div className="flex items-center justify-between gap-4">
                <p className={`font-display text-4xl font-bold ${highlight ? "text-gradient-highlight" : "text-gradient-primary"}`}>
                  {value}
                </p>
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ${highlight ? "bg-highlight/15 text-highlight ring-highlight/30" : "bg-primary/15 text-primary ring-primary/30"}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-normal text-foreground">{label}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="projects-title" className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Due progetti · Un unico founder</p>
          <h2 id="projects-title" className="font-display text-2xl font-bold text-foreground sm:text-3xl">Due modi di fare community</h2>
        </header>
        <div className="grid overflow-hidden rounded-2xl border border-border md:grid-cols-2">
          {ECOSYSTEM.projects.map((project) => {
            const Icon = project.highlight ? TikTokIcon : DiscordIcon;
            return (
              <article key={project.to} data-cursor-highlight={project.highlight || undefined} className={`flex min-w-0 flex-col p-6 sm:p-8 ${project.highlight ? "border-t border-border bg-highlight-radial md:border-l md:border-t-0" : "bg-primary-radial"}`}>
                <div className="mb-6 flex items-center gap-3">
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ${project.highlight ? "bg-highlight/15 text-highlight ring-highlight/30 shadow-glow-highlight" : "bg-primary/15 text-primary ring-primary/30 shadow-glow"}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className={`text-sm font-semibold ${project.highlight ? "text-highlight" : "text-primary"}`}>
                    Dal <time dateTime={project.founded}>{project.foundedLabel.toLowerCase()}</time>
                  </p>
                </div>
                <h3 className={`font-display text-2xl font-bold leading-tight ${project.highlight ? "text-gradient-highlight" : "text-gradient-primary"}`}>{project.name}</h3>
                <p className="mb-7 mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <Button asChild variant={project.highlight ? "glow-highlight" : "glow"} className="mt-auto w-full sm:w-fit">
                  <Link to={project.to}>Scopri il progetto <ArrowRight aria-hidden="true" /></Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
