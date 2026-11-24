import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Interactive particle field for the hero: emerald dots drift, link up when close and
 * move away from the mouse / finger. Paused when off-screen; static with reduced motion.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--primary-glow").trim() ||
      "currentColor";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(80, Math.round((width * height) / 14_000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 0.8 + Math.random() * 1.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      for (const d of dots) {
        if (!reduced) {
          if (pointer) {
            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130 && dist > 0) {
              const force = (130 - dist) / 130;
              d.vx += (dx / dist) * force * 0.6;
              d.vy += (dy / dist) * force * 0.6;
            }
          }
          d.vx *= 0.96;
          d.vy *= 0.96;
          // keep a gentle drift
          d.vx += (Math.random() - 0.5) * 0.03;
          d.vy += (Math.random() - 0.5) * 0.03;
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > width) d.vx *= -1;
          if (d.y < 0 || d.y > height) d.vy *= -1;
          d.x = Math.max(0, Math.min(width, d.x));
          d.y = Math.max(0, Math.min(height, d.y));
        }
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]!;
          const b = dots[j]!;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.globalAlpha = (1 - dist / 110) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      if (visible && !reduced) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    };
    const clearPointer = () => {
      pointer = null;
    };

    resize();
    loop();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry?.isIntersecting ?? true;
      if (visible && !wasVisible && !reduced) loop();
      if (!visible) cancelAnimationFrame(frame);
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("pointerup", clearPointer);
    document.addEventListener("pointerleave", clearPointer);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", clearPointer);
      document.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
