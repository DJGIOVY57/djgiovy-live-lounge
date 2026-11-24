import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Inizio" },
  { id: "twitch", label: "Twitch" },
  { id: "spotify", label: "Spotify" },
  { id: "discord", label: "Discord" },
  { id: "community", label: "Community" },
  { id: "momenti", label: "I migliori momenti" },
];

function target(id: string) {
  return id === "top" ? 0 : (document.getElementById(id)?.getBoundingClientRect().top ?? 0) + window.scrollY - 24;
}

// Side navigation: progress rail, section dots (desktop) and up/down buttons.
export function ScrollDock() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let idx = 0;
      SECTIONS.forEach((s, i) => {
        if (target(s.id) - window.innerHeight * 0.4 <= window.scrollY) idx = i;
      });
      if (max - window.scrollY < 4) idx = SECTIONS.length - 1;
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (i: number) => {
    const s = SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1, i))];
    if (s) window.scrollTo({ top: target(s.id), behavior: "smooth" });
  };
  const btn =
    "grid h-9 w-9 place-items-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition hover:border-primary hover:text-primary hover:shadow-[0_0_16px_var(--color-primary)] disabled:pointer-events-none disabled:opacity-30";

  return (
    <nav
      aria-label="Navigazione pagina"
      className="fixed right-3 bottom-20 z-40 flex flex-col items-center gap-2 sm:right-5 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
    >
      <button type="button" aria-label="Sezione precedente" className={btn} disabled={active === 0} onClick={() => go(active - 1)}>
        <ChevronUp className="h-4 w-4" />
      </button>
      <div className="relative hidden flex-col items-center gap-4 py-2 md:flex">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
        <div
          className="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-primary shadow-[0_0_8px_var(--color-primary)]"
          style={{ height: `${progress * 100}%` }}
        />
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.label}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(i)}
            className="group relative grid h-4 w-4 place-items-center"
          >
            <span
              className={`block rounded-full transition-all ${i === active ? "h-3 w-3 bg-primary shadow-[0_0_10px_var(--color-primary)]" : "h-2 w-2 bg-muted-foreground/50 group-hover:bg-primary"}`}
            />
            <span className="pointer-events-none absolute right-6 rounded-md border border-border bg-card px-2 py-1 text-xs whitespace-nowrap text-foreground opacity-0 transition group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        ))}
      </div>
      <div className="relative h-16 w-1 overflow-hidden rounded-full bg-border md:hidden">
        <div className="absolute inset-x-0 top-0 bg-primary shadow-[0_0_8px_var(--color-primary)]" style={{ height: `${progress * 100}%` }} />
      </div>
      <button type="button" aria-label="Sezione successiva" className={btn} disabled={active === SECTIONS.length - 1} onClick={() => go(active + 1)}>
        <ChevronDown className="h-4 w-4" />
      </button>
    </nav>
  );
}
