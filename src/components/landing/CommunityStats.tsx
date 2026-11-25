import { Crown, Gamepad2 } from "lucide-react";

import { nextFollowerGoal } from "@/lib/follower-goal";
import { DISCORD } from "@/lib/site-config";

import { DiscordIcon, TwitchIcon } from "./BrandIcons";

/** Compact "dashboard" strip: Twitch + Gaming Hub numbers are live, the rest come from site-config. */
export function CommunityStats({
  followers,
  members,
  online,
}: {
  followers: number | null;
  members: number | null;
  online: number | null;
}) {
  const goal = followers !== null ? nextFollowerGoal(followers) : null;
  const tiles = [
    {
      icon: TwitchIcon,
      value: followers !== null ? String(followers) : "—",
      label: "Follower Twitch",
      detail: goal ? `${goal.percent}% verso i ${goal.goal}` : "In crescita",
      highlight: false,
    },
    {
      icon: DiscordIcon,
      value: members !== null ? String(members) : "—",
      label: `Membri ${DISCORD.name}`,
      detail: online !== null ? `${online} online ora` : "Server Discord",
      highlight: false,
    },
    {
      icon: Gamepad2,
      value: `${DISCORD.games.length}+`,
      label: "Stanze di gioco",
      detail: `${DISCORD.games.slice(0, 3).join(", ")} e altri`,
      highlight: false,
    },
    {
      icon: Crown,
      value: "2",
      label: "Progetti fondati",
      detail: "Gaming Hub & I migliori momenti di Twitch",
      highlight: true,
    },
  ];

  return (
    <section aria-label="La community in numeri" className="px-5">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map(({ icon: Icon, value, label, detail, highlight }) => (
          <article key={label} className="surface-card surface-card-interactive flex flex-col gap-2 p-4 sm:p-5">
            <span
              className={`flex size-9 items-center justify-center rounded-lg ring-1 ${
                highlight ? "bg-highlight/15 text-highlight ring-highlight/40" : "bg-primary/15 text-primary ring-primary/40"
              }`}
            >
              <Icon className="size-4" />
            </span>
            <p
              className={`font-display text-3xl font-bold sm:text-4xl ${
                highlight ? "text-gradient-highlight" : "text-gradient-primary"
              }`}
            >
              {value}
            </p>
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
