import { cn } from "@/lib/utils";

const BARS = 32;

/**
 * Neon audio-equalizer bars. Durations/delays are derived from the index (not random)
 * so server and browser render identical markup. Bars dance faster while live.
 */
export function Equalizer({ live, className }: { live: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-10 items-end justify-center gap-[3px]", className)}>
      {Array.from({ length: BARS }, (_, i) => {
        const base = 0.75 + ((i * 37) % 11) / 12;
        return (
          <span
            key={i}
            className={cn(
              "h-full w-1 origin-bottom animate-eq rounded-full bg-linear-to-t from-primary to-primary-glow sm:w-1.5",
              live ? "opacity-100" : "opacity-60",
            )}
            style={{
              animationDuration: `${live ? base * 0.6 : base}s`,
              animationDelay: `-${((i * 53) % 17) / 10}s`,
            }}
          />
        );
      })}
    </div>
  );
}
