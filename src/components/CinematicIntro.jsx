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

// How long each line stays on screen (ms) — at least 1.5s to read comfortably
const LINE_DURATION_MS = 2000;
const HOLD_AFTER_LAST_MS = 800;

export default function CinematicIntro({ onComplete }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => onComplete?.(), 400);
      return () => clearTimeout(t);
    }

    const timers = [];
    let elapsed = 0;

    LINES.forEach((_, i) => {
      elapsed += LINE_DURATION_MS;
      if (i < LINES.length - 1) {
        timers.push(setTimeout(() => setIndex(i + 1), elapsed));
      } else {
        // Last line already showing — hold it, then finish
        timers.push(setTimeout(() => onComplete?.(), elapsed + HOLD_AFTER_LAST_MS));
      }
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
