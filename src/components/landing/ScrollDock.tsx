import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Temporary minimal navigation: only a "back to top" button on every page.
// The full side slider (progress rail + section dots) is kept in git history
// and can be re-enabled later; its helpers live in src/lib/scroll-navigation.ts.
export function ScrollDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > 400));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Torna in cima"
      title="Torna in cima"
      onClick={toTop}
      className={`fixed right-4 bottom-20 z-40 grid h-10 w-10 place-items-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-card backdrop-blur transition hover:border-primary hover:text-primary hover:shadow-glow sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}
