import { ArrowDown, Radio, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { shouldShowLiveBanner } from "@/lib/live-status";

export function LiveNotificationBanner({ live, title, category, uptime }: {
  live: boolean;
  title: string | null;
  category: string | null;
  uptime: string | null;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (!shouldShowLiveBanner(live, dismissed)) return null;

  function openPlayer() {
    const section = document.getElementById("twitch");
    if (!section) return;
    section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    const heading = document.getElementById("twitch-title");
    heading?.focus({ preventScroll: true });
  }

  return (
    <aside aria-label="Live in corso" className="border-b border-primary/40 bg-primary/10 px-5 pt-16 pb-5 motion-safe:animate-fade-up sm:py-5 sm:pr-44">
      <div className="mx-auto flex max-w-5xl items-start gap-3 sm:items-center sm:gap-5">
        <span className="hidden size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary sm:flex"><Radio aria-hidden="true" className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-display text-xs font-bold text-primary">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-destructive motion-safe:animate-pulse-dot [--pulse-color:var(--color-destructive)]" />
            IN DIRETTA ORA SU TWITCH
          </p>
          <p className="mt-1 break-words font-display text-base font-semibold text-foreground sm:text-lg">{title || "La Lounge è in diretta"}</p>
          {(category || uptime) && <p className="mt-1 break-words text-xs leading-relaxed text-muted-foreground">{[category, uptime ? `In live da ${uptime}` : null].filter(Boolean).join(" · ")}</p>}
          <Button variant="glow" size="sm" onClick={openPlayer} className="mt-3 sm:hidden">Guarda la live <ArrowDown /></Button>
        </div>
        <Button variant="glow" size="sm" onClick={openPlayer} className="hidden shrink-0 sm:inline-flex">Guarda la live <ArrowDown /></Button>
        <Button variant="ghost" size="icon" onClick={() => setDismissed(true)} aria-label="Chiudi avviso live" title="Chiudi avviso live" className="shrink-0 text-muted-foreground"><X /></Button>
      </div>
    </aside>
  );
}