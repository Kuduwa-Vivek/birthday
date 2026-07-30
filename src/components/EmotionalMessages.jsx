import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { birthdayConfig } from "../config/birthdayConfig";
import { usePrefersReducedMotion } from "../hooks/useScrollProgress";
import styles from "./EmotionalMessages.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function EmotionalMessages() {
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const messages = birthdayConfig.emotionalMessages || [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const items = section.querySelectorAll("[data-msg]");
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0 });
        items.forEach((el) => {
          el.dataset.revealed = "true";
        });
        return;
      }

      items.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 28 });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            toggleActions: "play none none none",
            onEnter: () => {
              el.dataset.revealed = "true";
            },
          },
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 250);
    const t2 = setTimeout(refresh, 800);
    window.addEventListener("resize", refresh);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
          const el = entry.target;
          if (el.dataset.revealed === "true") return;
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          el.dataset.revealed = "true";
        });
      },
      { threshold: [0.15, 0.35] }
    );
    items.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", refresh);
      io.disconnect();
      ctx.revert();
    };
  }, [reduced, messages.length]);

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="emotional-title"
    >
      <h2 id="emotional-title" className="section-title">
        Some things deserve to be said.
      </h2>
      <p className="section-sub">Things we don&apos;t say enough.</p>

      <div className={styles.list}>
        {messages.map((msg, i) => (
          <p key={i} data-msg className={styles.message}>
            {msg}
          </p>
        ))}
      </div>
    </section>
  );
}
