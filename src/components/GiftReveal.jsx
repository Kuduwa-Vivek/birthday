import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./GiftReveal.module.css";

function Burst() {
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.cos((Math.PI * 2 * i) / 28) * (80 + Math.random() * 100),
        y: Math.sin((Math.PI * 2 * i) / 28) * (60 + Math.random() * 90),
        c: i % 2 ? "#FF4F9A" : "#8B5CF6",
      })),
    []
  );

  return (
    <div className={styles.burst} aria-hidden="true">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          style={{ background: b.c }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: b.x, y: b.y, scale: 0.2 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function GiftReveal({ gifts, onComplete }) {
  const [step, setStep] = useState(-1); // -1 opening, 0..n gifts, then done
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([30, 40, 30]);
    }

    const t1 = setTimeout(() => setOpened(true), 200);
    const t2 = setTimeout(() => setStep(0), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (step < 0 || !gifts?.length) return undefined;
    if (step < gifts.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), 1600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => onComplete?.(), 1800);
    return () => clearTimeout(t);
  }, [step, gifts, onComplete]);

  return (
    <section className={styles.screen} aria-live="polite" aria-label="Gift reveal">
      <div className={styles.glow} aria-hidden="true" />
      {opened && <Burst />}

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Your Birthday Box</h2>
        <p>Three wishes, revealed.</p>
      </motion.div>

      <div className={styles.stack}>
        <AnimatePresence mode="wait">
          {step >= 0 && gifts[step] && (
            <motion.article
              key={gifts[step].id}
              className={`glass-panel ${styles.card}`}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.94 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)", scale: 0.96 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.tag}>Gift {step + 1}</span>
              <h3>{gifts[step].title}</h3>
              <p>{gifts[step].reveal}</p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.progress} aria-hidden="true">
        {gifts.map((g, i) => (
          <span key={g.id} className={i <= step ? styles.active : ""} />
        ))}
      </div>
    </section>
  );
}
