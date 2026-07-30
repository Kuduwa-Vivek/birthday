import { useEffect, useMemo, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useScrollProgress";
import styles from "./ParticleBackground.module.css";

/**
 * Lightweight canvas particle field — stars + soft glowing dots.
 */
export default function ParticleBackground({
  density = "normal",
  burst = false,
  burstKey = 0,
  className = "",
}) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  const count = useMemo(() => {
    if (reduced) return 12;
    if (mobile) return density === "heavy" ? 40 : 28;
    if (density === "heavy") return 90;
    if (density === "light") return 35;
    return 60;
  }, [density, mobile, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let particles = [];
    let w = 0;
    let h = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12 - 0.05,
        a: Math.random() * 0.6 + 0.15,
        hue: Math.random() > 0.55 ? 330 : 265,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const explode = () => {
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 2 + Math.random() * 6;
        particles[i].x = cx;
        particles[i].y = cy;
        particles[i].vx = Math.cos(angle) * speed;
        particles[i].vy = Math.sin(angle) * speed;
        particles[i].a = 1;
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (!burst) {
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        } else {
          p.a *= 0.985;
          p.vx *= 0.98;
          p.vy *= 0.98;
        }

        const alpha = p.a * (0.55 + Math.sin(p.pulse) * 0.35);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, 72%, ${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.r > 1.1) {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${alpha * 0.25})`;
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    spawn();
    if (burst) explode();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, burst, burstKey]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
}
