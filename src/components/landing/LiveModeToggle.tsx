import { LIVE_MODES, type LiveMode } from "@/lib/live-status";
import { cn } from "@/lib/utils";

const LABELS: Record<LiveMode, string> = { auto: "Reale", live: "Live", offline: "Offline" };

/** Test control: force the live badge on/off. Shown only in preview or with ?test in the URL. */
export function LiveModeToggle({
  mode,
  onChange,
}: {
  mode: LiveMode;
  onChange: (mode: LiveMode) => void;
}) {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-full border border-border bg-card/90 p-1 shadow-card backdrop-blur">
      <span className="px-2 font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Test stato
      </span>
      {LIVE_MODES.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          aria-pressed={mode === m}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200",
            mode === m
              ? "bg-gradient-primary text-primary-foreground shadow-glow"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {LABELS[m]}
        </button>
      ))}
    </div>
  );
}
