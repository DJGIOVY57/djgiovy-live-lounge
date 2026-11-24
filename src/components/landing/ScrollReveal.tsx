import { useEffect } from "react";

// Fades/slides cards into view as they enter the viewport, staggered among siblings.
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("main section header, main section h2, main .surface-card"),
    ).filter((el, _, all) => !all.some((o) => o !== el && o.contains(el)));
    els.forEach((el) => {
      const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.setProperty("--reveal-delay", `${Math.min(sibs.indexOf(el), 5) * 90}ms`);
      el.classList.add("reveal");
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = e.target;
            t.classList.add("reveal-in");
            // Drop reveal classes afterwards so the card's own hover transitions return.
            window.setTimeout(() => t.classList.remove("reveal", "reveal-in"), 1300);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
