/** Floating "ALPHA" pill in the top-right corner. */
export function AlphaFloatingPill() {
  return (
    <div className="fixed right-4 top-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-card/80 px-3 py-1 font-display text-xs font-semibold tracking-wider text-amber-400 shadow-[0_0_18px_-2px_rgb(245_158_11/0.6)] backdrop-blur">
      <span className="size-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
      ALPHA v0.1
    </div>
  );
}
