import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import GiftCard from "./GiftCard";
import styles from "./GiftSelection.module.css";

function shuffleGifts(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export default function GiftSelection({ onOpenBox }) {
  const [shuffledGifts] = useState(() =>
    shuffleGifts((birthdayConfig.gifts || []).slice(0, 9))
  );
  const [selectedId, setSelectedId] = useState(null);

  const selectedGifts = useMemo(
    () => shuffledGifts.filter((g) => g.id === selectedId),
    [shuffledGifts, selectedId]
  );

  const ready = selectedId !== null;

  const handleSelect = (id) => {
    // Toggle off if the same card is clicked again
    if (selectedId === id) {
      setSelectedId(null);
      return;
    }

    // Switch selection — keep mystery face, never show title here
    setSelectedId(id);
  };

  const openBox = () => {
    if (!ready) return;
    onOpenBox?.(selectedGifts);
  };

  return (
    <section className={`section ${styles.section}`} aria-labelledby="gifts-title">
      <h2 id="gifts-title" className="section-title">
        Your next mission.
      </h2>
      <p className="section-sub">
        Pick exactly 1.
        <br />
        Nine surprises. Only one choice.
      </p>

      <p className={styles.counter} aria-live="polite">
        {ready ? "1 / 1 selected" : "0 / 1 selected"}
      </p>

      <div className={styles.grid}>
        {shuffledGifts.map((gift, index) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            index={index}
            selected={selectedId === gift.id}
            locked={false}
            revealed={false}
            flying={false}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className={styles.boxArea}>
        <div
          className={`${styles.box} ${ready ? styles.boxReady : ""}`}
          aria-hidden="true"
        >
          <Gift size={28} />
          <span>Birthday Box</span>
        </div>

        <AnimatePresence>
          {ready && (
            <motion.div
              className={styles.openWrap}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className={styles.interesting}>Interesting choice…</p>
              <button type="button" className="btn-primary" onClick={openBox}>
                Open My Birthday Box
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
