import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function GiftReveal({ gifts = [], onComplete }) {
  const [step, setStep] = useState(-1); // -1 opening, 0..n-1 gifts
  const [opened, setOpened] = useState(false);
  const [direction, setDirection] = useState(1);

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

  const isFirst = step <= 0;
  const isLast = step >= gifts.length - 1;
  const canNavigate = step >= 0 && gifts.length > 0;

  const goPrev = () => {
    if (!canNavigate || isFirst) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (!canNavigate) return;
    if (isLast) {
      onComplete?.();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      filter: "blur(8px)",
      scale: 0.94,
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      filter: "blur(6px)",
      scale: 0.96,
    }),
  };

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
        <AnimatePresence mode="wait" custom={direction}>
          {step >= 0 && gifts[step] && (
            <motion.article
              key={gifts[step].id}
              className={`glass-panel ${styles.card}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.tag}>
                Gift {step + 1} of {gifts.length}
              </span>
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

      {canNavigate && (
        <div className={styles.nav}>
          <button
            type="button"
            className={`btn-ghost ${styles.navBtn}`}
            onClick={goPrev}
            disabled={isFirst}
            aria-label="Previous gift"
          >
            <ChevronLeft size={18} aria-hidden="true" />
            Previous
          </button>
          <button
            type="button"
            className={`btn-primary ${styles.navBtn}`}
            onClick={goNext}
            aria-label={isLast ? "Continue to final surprise" : "Next gift"}
          >
            {isLast ? "Continue" : "Next"}
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
