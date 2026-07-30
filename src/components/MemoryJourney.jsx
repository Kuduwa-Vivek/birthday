import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { birthdayConfig } from "../config/birthdayConfig";
import { usePrefersReducedMotion } from "../hooks/useScrollProgress";
import MemoryCard from "./MemoryCard";
import styles from "./MemoryJourney.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function MemoryJourney() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [activeVideoId, setActiveVideoId] = useState(null);
  const memories = birthdayConfig.memories || [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const cards = section.querySelectorAll("[data-memory]");
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(cards, { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 });
        cards.forEach((card) => {
          card.dataset.revealed = "true";
        });
        if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );
      }

      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;

        gsap.set(card, {
          opacity: 0,
          scale: 0.94,
          x: fromLeft ? -32 : 32,
          y: 28,
        });

        gsap.to(card, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
            toggleActions: "play none none none",
            onEnter: () => {
              card.dataset.revealed = "true";
            },
          },
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();

    const raf = requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 250);
    const t2 = setTimeout(refresh, 800);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const images = section.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", refresh, { once: true });
      img.addEventListener("error", refresh, { once: true });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
          const card = entry.target;
          if (card.dataset.revealed === "true") return;
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          card.dataset.revealed = "true";
        });
      },
      { threshold: [0.15, 0.35] }
    );
    cards.forEach((card) => io.observe(card));

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      io.disconnect();
      ctx.revert();
    };
  }, [reduced, memories.length]);

  return (
    <section ref={sectionRef} className={`section ${styles.section}`} aria-labelledby="memories-title">
      <div className={styles.bgShift} aria-hidden="true" />
      <h2 id="memories-title" className="section-title">
        Some moments deserve to be remembered.
      </h2>
      <p className="section-sub">A quiet walk through the ones that stayed.</p>

      <div className={styles.timeline}>
        <div className={styles.lineTrack} aria-hidden="true">
          <div ref={lineRef} className={styles.lineFill} />
        </div>

        <div className={styles.list}>
          {memories.map((memory, index) => (
            <div key={memory.id} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <MemoryCard
                memory={memory}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
                activeVideoId={activeVideoId}
                onVideoPlay={setActiveVideoId}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
