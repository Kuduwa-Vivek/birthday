import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useScrollProgress";
import styles from "./CinematicIntro.module.css";

const LINES = [
  "Preparing something…",
  "made with memories…",
  "and a little too much love.",
  "Ready?",
];

export default function CinematicIntro({ onComplete }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => onComplete?.(), 400);
      return () => clearTimeout(t);
    }

    const timings = [700, 900, 1000, 900];
    let elapsed = 0;
    const timers = [];

    LINES.forEach((_, i) => {
      elapsed += timings[i];
      timers.push(
        setTimeout(() => {
          if (i < LINES.length - 1) {
            setIndex(i + 1);
          } else {
            setTimeout(() => onComplete?.(), 500);
          }
        }, elapsed)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  return (
    <button
      type="button"
      className={styles.screen}
      onClick={() => onComplete?.()}
      aria-label="Skip intro and continue"
    >
      <div className={styles.heart} aria-hidden="true">
        <div className={styles.heartCore} />
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={styles.spark}
            style={{
              "--a": `${(360 / 18) * i}deg`,
              "--d": `${1.2 + (i % 5) * 0.15}s`,
              "--r": `${40 + (i % 4) * 10}px`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className={styles.line}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {LINES[index]}
        </motion.p>
      </AnimatePresence>

      <span className={styles.skip}>Tap to skip</span>
    </button>
  );
}
