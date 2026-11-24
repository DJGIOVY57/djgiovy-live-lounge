import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { activeScrollSection } from "@/lib/scroll-navigation";

const SECTIONS = [
  { id: "top", label: "Inizio" },
  { id: "discord", label: "Gaming Hub" },
  { id: "spotify", label: "Spotify" },
  { id: "twitch", label: "Twitch" },
  { id: "community", label: "Community" },
  { id: "momenti", label: "I migliori momenti" },
  { id: "lounge-community", label: "FAQ e supporto" },
];

function target(id: string) {
  return id === "top" ? 0 : (document.getElementById(id)?.getBoundingClientRect().top ?? 0) + window.scrollY - 24;
}

// Side navigation: progress rail, section dots (desktop) and up/down buttons.
export function ScrollDock({ live = false }: { live?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("custom-scrollbar");
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let idx = activeScrollSection(SECTIONS.map((s) => target(s.id)), window.scrollY);
      if (max - window.scrollY < 4) idx = SECTIONS.length - 1;
      setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.documentElement.classList.remove("custom-scrollbar");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (i: number) => {
    const s = SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1, i))];
    if (s) window.scrollTo({ top: target(s.id), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const btn =
    "grid h-9 w-9 place-items-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition hover:border-primary hover:text-primary hover:shadow-[0_0_16px_var(--color-primary)] disabled:pointer-events-none disabled:opacity-30";

  return (
    <nav
      aria-label="Navigazione pagina"
      className="fixed right-2 bottom-20 z-40 flex flex-col items-center gap-2 rounded-full border border-border bg-card/90 p-1 shadow-card backdrop-blur sm:right-5 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
    >
      <Button variant="ghost" size="icon" aria-label="Sezione precedente" title="Sezione precedente" className={btn} disabled={active === 0} onClick={() => go(active - 1)}>
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Slider.Root orientation="vertical" min={0} max={100} step={0.1} value={[progress * 100]} inverted
        onValueChange={(values) => {
          const value = values[0];
          if (value === undefined) return;
          window.scrollTo({ top: value / 100 * Math.max(0, document.documentElement.scrollHeight - window.innerHeight), behavior: "instant" });
        }}
        className="relative flex h-28 w-9 touch-none select-none justify-center py-2 md:h-40">
        <Slider.Track className="relative h-full w-1 shrink-0 overflow-hidden rounded-full bg-border">
          <Slider.Range className="absolute w-full bg-primary" />
        </Slider.Track>
        <Slider.Thumb aria-label="Scorrimento pagina" aria-valuetext={`${Math.round(progress * 100)}%`} className="block h-7 w-3 rounded-full border border-primary/50 bg-primary shadow-glow outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" />
      </Slider.Root>
      <div className="relative hidden flex-col items-center gap-4 py-2 md:flex">
        {SECTIONS.map((s, i) => (
          <Button
            variant="ghost" size="icon"
            key={s.id}
            type="button"
            aria-label={s.label}
            title={s.id === "twitch" && live ? "Twitch · Live ora" : s.label}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(i)}
            className="group relative grid h-4 w-4 place-items-center"
          >
            <span
              className={`block rounded-full transition-all ${i === active || (s.id === "twitch" && live) ? "h-3 w-3 bg-primary shadow-glow" : "h-2 w-2 bg-muted-foreground/50 group-hover:bg-primary"} ${s.id === "twitch" && live ? "motion-safe:animate-pulse" : ""}`}
            />
            <span className="pointer-events-none absolute right-6 rounded-md border border-border bg-card px-2 py-1 text-xs whitespace-nowrap text-foreground opacity-0 transition group-hover:opacity-100">
              {s.label}{s.id === "twitch" && live ? " · Live ora" : ""}
            </span>
          </Button>
        ))}
      </div>
      <Button variant="ghost" size="icon" aria-label="Sezione successiva" title="Sezione successiva" className={btn} disabled={active === SECTIONS.length - 1} onClick={() => go(active + 1)}>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </nav>
  );
}
