import { AudioLines, Disc3, Megaphone, PartyPopper, Siren, Zap } from "lucide-react";
import { useCallback, useEffect, useState, type ComponentType } from "react";

import { cn } from "@/lib/utils";
import { playPad, type PadId } from "@/lib/soundboard";

const PADS: { id: PadId; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: "airhorn", label: "Airhorn", Icon: Megaphone },
  { id: "scratch", label: "Scratch", Icon: Disc3 },
  { id: "drop", label: "Drop", Icon: AudioLines },
  { id: "siren", label: "Sirena", Icon: Siren },
  { id: "laser", label: "Laser", Icon: Zap },
  { id: "applause", label: "Applausi", Icon: PartyPopper },
];

/** Six glowing DJ pads; keys 1–6 trigger them on desktop. */
export function SoundboardSection() {
  const [active, setActive] = useState<PadId | null>(null);

  const hit = useCallback((id: PadId) => {
    playPad(id);
    setActive(id);
    window.setTimeout(() => setActive((cur) => (cur === id ? null : cur)), 220);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      const pad = PADS[Number(e.key) - 1];
      if (pad) hit(pad.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hit]);

  return (
    <section id="soundboard" aria-labelledby="soundboard-title" className="px-5">
      <div className="surface-card mx-auto max-w-5xl p-5 sm:p-8">
        <div className="mb-6 text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Mini soundboard
          </p>
          <h2
            id="soundboard-title"
            className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
          >
            Fai il DJ anche tu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tocca i pad<span className="hidden sm:inline"> o premi i tasti da 1 a 6</span>. Alza il volume!
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PADS.map(({ id, label, Icon }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => hit(id)}
              className={cn(
                "group relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-primary/15 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95",
                active === id && "scale-95 border-primary-glow bg-primary/30 shadow-glow-strong",
              )}
            >
              <Icon
                className={cn(
                  "size-8 text-primary transition-transform duration-200 group-hover:scale-110 sm:size-9",
                  active === id && "text-primary-glow",
                )}
              />
              <span className="font-display text-sm font-bold uppercase tracking-wider">{label}</span>
              <span className="absolute top-2 right-3 hidden font-display text-xs text-muted-foreground sm:block">
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
