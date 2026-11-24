import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Replaces the mouse pointer with a glowing emerald dot (desktop/mouse only).
 * Turns yellow over the "I migliori momenti di Twitch" section and grows over clickable items.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setVisible(true);
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const t = e.target instanceof Element ? e.target : null;
      setHovering(!!t?.closest("a, button, [role=button], input, label, select, textarea"));
      setHighlight(!!t?.closest("#momenti"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,box-shadow] duration-200",
          hovering ? "size-7 bg-transparent border-2" : "size-3",
          highlight
            ? hovering
              ? "border-highlight-glow shadow-glow-highlight"
              : "bg-highlight-glow shadow-glow-highlight"
            : hovering
              ? "border-primary-glow shadow-glow"
              : "bg-primary-glow shadow-glow",
        )}
      />
    </div>
  );
}
