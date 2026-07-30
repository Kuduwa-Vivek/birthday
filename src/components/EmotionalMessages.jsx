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
        gsap.set(items, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "top 45%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
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
