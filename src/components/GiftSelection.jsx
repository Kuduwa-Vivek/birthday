import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import GiftCard from "./GiftCard";
import styles from "./GiftSelection.module.css";

export default function GiftSelection({ onOpenBox }) {
  const gifts = birthdayConfig.gifts || [];
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [locked, setLocked] = useState(false);
  const [flying, setFlying] = useState(false);
  const [limitMsg, setLimitMsg] = useState("");
  const [ready, setReady] = useState(false);

  const selectedGifts = useMemo(
    () => gifts.filter((g) => selected.includes(g.id)),
    [gifts, selected]
  );

  const handleSelect = (id) => {
    if (locked || flying) return;

    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((x) => x !== id));
      setRevealed((prev) => prev.filter((x) => x !== id));
      setLimitMsg("");
      setReady(false);
      return;
    }

    if (selected.length >= 3) {
      setLimitMsg("Three wishes only 😌");
      setTimeout(() => setLimitMsg(""), 1800);
      return;
    }

    const next = [...selected, id];
    setSelected(next);
    setRevealed((prev) => [...prev, id]);

    if (next.length === 3) {
      setLocked(true);
      setFlying(true);
      setTimeout(() => {
        setFlying(false);
        setReady(true);
      }, 900);
    }
  };

  const openBox = () => {
    onOpenBox?.(selectedGifts);
  };

  return (
    <section className={`section ${styles.section}`} aria-labelledby="gifts-title">
      <h2 id="gifts-title" className="section-title">
        Your next mission.
      </h2>
      <p className="section-sub">
        Pick exactly 3.
        <br />
        Nine surprises. Only three choices.
      </p>

      <p className={styles.counter} aria-live="polite">
        {selected.length} / 3 selected
      </p>

      <div className={styles.grid}>
        {gifts.slice(0, 9).map((gift, index) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            index={index}
            selected={selected.includes(gift.id)}
            locked={locked}
            revealed={revealed.includes(gift.id)}
            flying={flying && selected.includes(gift.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className={styles.boxArea}>
        <div
          className={`${styles.box} ${ready ? styles.boxReady : ""} ${
            flying ? styles.boxPull : ""
          }`}
          aria-hidden="true"
        >
          <Gift size={28} />
          <span>Birthday Box</span>
        </div>

        <AnimatePresence>
          {limitMsg && (
            <motion.p
              className={styles.limit}
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {limitMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {ready && (
            <motion.div
              className={styles.openWrap}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className={styles.interesting}>Interesting choices…</p>
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
