import { CREATOR } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Live/offline pill. Live → clickable link to the Twitch channel with a pulsing dot. */
export function LiveBadge({ live, className }: { live: boolean; className?: string }) {
  if (live) {
    return (
      <a
        href={CREATOR.links.twitch}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group inline-flex items-center gap-2.5 rounded-full border border-primary/50 bg-primary/15 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-primary-glow shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/25 hover:shadow-glow-strong",
          className,
        )}
        aria-label="Live ora su Twitch, apri il canale"
      >
        <span className="relative flex size-2.5">
          <span className="size-2.5 animate-pulse-dot rounded-full bg-primary-glow" />
        </span>
        Live ora su Twitch
      </a>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-border bg-muted/60 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-offline",
        className,
      )}
    >
      <span className="size-2.5 rounded-full bg-offline" />
      Offline
    </span>
  );
}
