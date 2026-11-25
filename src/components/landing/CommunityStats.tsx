import { CalendarRange, Crown, Gem, Milestone } from "lucide-react";

import { ECOSYSTEM } from "@/lib/site-config";

type Tile = {
  icon: typeof Milestone;
  value: string;
  valueClass?: string;
  label: string;
  detail: string;
};

/** Quick facts block: the tiles read every value from ECOSYSTEM in site-config. */
export function CommunityStats() {
  const tiles: Tile[] = [
    {
      icon: Milestone,
      value: String(ECOSYSTEM.startYear),
      label: "Anno di partenza",
      detail: "9 dicembre 2020: la prima live su Twitch che ha dato inizio a tutto.",
    },
    {
      icon: Crown,
      value: String(ECOSYSTEM.projects.length),
      label: "Progetti fondati",
      detail: "Gaming Hub & I migliori momenti di Twitch",
    },
    {
      icon: Gem,
      value: "Affiliato",
      valueClass: "text-xl sm:text-2xl",
      label: "Canale Twitch",
      detail: "Riconoscimento ufficiale di Twitch per il canale djgiovy57.",
    },
    {
      icon: CalendarRange,
      value: ECOSYSTEM.yearsLabel,
      label: "Anni di streaming",
      detail: "Dal 2020 a oggi, live dopo live.",
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
        {tiles.map(({ icon: Icon, value, valueClass, label, detail }) => (
          <article key={label} className="surface-card surface-card-interactive flex flex-col gap-3 p-6">
            <span className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className={`font-display font-bold text-gradient-primary ${valueClass ?? "text-4xl"}`}>
                {value}
              </span>
            </span>
            <h3 className="font-display text-sm font-bold uppercase tracking-normal text-foreground">{label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
