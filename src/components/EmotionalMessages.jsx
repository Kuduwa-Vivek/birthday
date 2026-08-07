import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { birthdayConfig } from "../config/birthdayConfig";
import { usePrefersReducedMotion } from "../hooks/useScrollProgress";
import styles from "./EmotionalMessages.module.css";

gsap.registerPlugin(ScrollTrigger);

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function isLongMessage(msg) {
  return (msg || "").length > 90;
}

export default function EmotionalMessages() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const messages = birthdayConfig.emotionalMessages || [];
  const total = messages.length;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track || total === 0 || reduced) return undefined;

    const panels = Array.from(track.querySelectorAll("[data-msg]"));

    gsap.set(panels, {
      autoAlpha: 0,
      y: 16,
      scale: 0.988,
      force3D: true,
    });
    if (panels[0]) {
      gsap.set(panels[0], { autoAlpha: 1, y: 0, scale: 1 });
    }

    // Longer messages get a bit more scroll room so they can be read
    const scrollLength = () => {
      const base = window.innerHeight * 1.2;
      return messages.reduce((sum, msg) => sum + (isLongMessage(msg) ? base * 1.35 : base), 0);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${scrollLength()}`,
        pin: pin,
        scrub: 1.2,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const pos = self.progress * Math.max(total - 1, 1);
          const index = Math.min(total - 1, Math.round(pos));
          setActiveIndex((prev) => (prev === index ? prev : index));

          panels.forEach((panel, i) => {
            const dist = pos - i;
            const closeness = 1 - Math.min(1, Math.abs(dist) / 0.95);
            const opacity = smoothstep(0, 1, closeness);
            const y = dist * -12;
            const scale = 0.98 + opacity * 0.02;

            gsap.set(panel, {
              autoAlpha: opacity,
              y,
              scale,
              force3D: true,
            });
          });
        },
        onRefresh: (self) => {
          const pos = self.progress * Math.max(total - 1, 1);
          setActiveIndex(Math.min(total - 1, Math.round(pos)));
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 250);
    const t2 = setTimeout(refresh, 800);
    window.addEventListener("resize", refresh);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [reduced, total, messages]);

  if (reduced) {
    return (
      <section className={`section ${styles.section}`} aria-labelledby="emotional-title">
        <h2 id="emotional-title" className="section-title">
          Some things deserve to be said.
        </h2>
        <p className="section-sub">Things we don&apos;t say enough.</p>
        <div className={styles.reducedList}>
          {messages.map((msg, i) => (
            <p
              key={i}
              className={`${styles.message} ${styles.visible} ${
                isLongMessage(msg) ? styles.long : styles.short
              }`}
            >
              {msg}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={styles.storySection}
      aria-labelledby="emotional-title"
    >
      <div ref={pinRef} className={styles.pin}>
        <div className={styles.glow} aria-hidden="true" />

        <header className={styles.header}>
          <h2 id="emotional-title" className={styles.title}>
            Some things deserve to be said.
          </h2>
          <p className={styles.sub}>Things we don&apos;t say enough.</p>
        </header>

        <div className={styles.stage}>
          <div ref={trackRef} className={styles.track}>
            {messages.map((msg, i) => (
              <div
                key={i}
                data-msg
                className={`${styles.panel} ${
                  isLongMessage(msg) ? styles.longPanel : styles.shortPanel
                }`}
                aria-hidden={i !== activeIndex}
              >
                <p
                  className={`${styles.message} ${
                    isLongMessage(msg) ? styles.long : styles.short
                  }`}
                >
                  {msg}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.progress} aria-live="polite">
          <span className={styles.counter}>
            {String(activeIndex + 1).padStart(2, "0")}
            <span className={styles.sep}> / </span>
            {String(total).padStart(2, "0")}
          </span>
          <div className={styles.dots} aria-hidden="true">
            {messages.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${
                  i === activeIndex ? styles.dotActive : ""
                } ${i < activeIndex ? styles.dotDone : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
