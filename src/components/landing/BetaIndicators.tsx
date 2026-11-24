/** Floating "ALPHA" pill in the top-right corner. */
export function AlphaFloatingPill() {
  return (
    <div className="fixed right-4 top-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card/80 px-3 py-1 font-display text-xs font-semibold tracking-wider text-primary shadow-glow backdrop-blur">
      <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
      ALPHA v0.1
    </div>
  );
}
