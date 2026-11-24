import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { CURRENT_RELEASE } from "@/lib/changelog-data";

/** Floating release link in the top-right corner. */
export function AlphaFloatingPill() {
  return (
    <Button
      asChild
      variant="release"
      size="sm"
      className="fixed right-4 top-4 z-40 h-auto gap-1.5 rounded-full px-3 py-1 font-display font-semibold tracking-normal"
    >
      <Link
        to="/changelog"
        aria-label={`${CURRENT_RELEASE.stage} v${CURRENT_RELEASE.version} — Note di rilascio`}
      >
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-release animate-pulse-dot [--pulse-color:var(--color-release)]"
        />
        {CURRENT_RELEASE.stage} v{CURRENT_RELEASE.version}
      </Link>
    </Button>
  );
}
