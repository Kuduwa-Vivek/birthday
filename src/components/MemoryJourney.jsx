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
        gsap.set(cards, { opacity: 1, x: 0, y: 0, scale: 1 });
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
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.92,
            x: fromLeft ? -48 : 48,
            y: 36,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
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
