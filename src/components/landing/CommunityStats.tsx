import { CalendarRange, Crown, Gem, Milestone } from "lucide-react";

import { ECOSYSTEM } from "@/lib/site-config";

type Tile = {
  icon: typeof Milestone;
  value: string;
  valueClass?: string;
  label: string;
  detail: string;
  highlight: boolean;
};

/** Quick facts block: the tiles read every value from ECOSYSTEM in site-config. */
export function CommunityStats() {
  const tiles: Tile[] = [
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
      icon: Gem,
      value: "Affiliato",
      valueClass: "text-3xl sm:text-[1.75rem]",
      label: "Canale Twitch",
      detail: "Riconoscimento ufficiale di Twitch per il canale djgiovy57.",
      highlight: false,
    },
    {
      icon: CalendarRange,
      value: ECOSYSTEM.yearsLabel,
      label: "Anni di community",
      detail: "Dal 2021 a oggi, cresciuta live dopo live.",
      highlight: false,
    },
  ];

  return (
    <section aria-labelledby="ecosystem-title" className="mx-auto max-w-5xl px-5">
      <header className="mb-6 text-center">
        <h2 id="ecosystem-title" className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Qualche info
        </h2>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ icon: Icon, value, valueClass, label, detail, highlight }) => (
          <article key={label} data-cursor-highlight={highlight || undefined} className={`surface-card flex flex-col gap-3 p-6 ${highlight ? "surface-card-highlight border-highlight/20" : "surface-card-interactive"}`}>
            <div className="flex items-center justify-between gap-4">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ${highlight ? "bg-highlight/15 text-highlight ring-highlight/30" : "bg-primary/15 text-primary ring-primary/30"}`}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className={`text-right font-display font-bold ${valueClass ?? "text-4xl"} ${highlight ? "text-gradient-highlight" : "text-gradient-primary"}`}>
                {value}
              </p>
            </div>
            <h3 className="font-display text-sm font-bold uppercase tracking-normal text-foreground">{label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
