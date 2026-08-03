import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./GiftCard.module.css";

export default function GiftCard({
  gift,
  index,
  selected,
  locked,
  revealed,
  flying,
  onSelect,
}) {
  const number = String(index + 1).padStart(2, "0");
  const disabled = locked && !selected;

  return (
    <motion.button
      type="button"
      className={`${styles.card} ${selected ? styles.selected : ""} ${
        disabled ? styles.locked : ""
      } ${flying ? styles.flying : ""}`}
      onClick={() => onSelect?.(gift.id)}
      disabled={disabled || flying}
      aria-pressed={selected}
      aria-label={`Mystery gift ${number}${selected ? ", selected" : ""}`}
      whileHover={disabled || flying ? undefined : { rotateX: 6, rotateY: -6, scale: 1.03 }}
      whileTap={disabled || flying ? undefined : { scale: 0.97 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className={styles.sparkle} aria-hidden="true" />
      <div className={`${styles.inner} ${revealed ? styles.flipped : ""}`}>
        <div className={styles.face}>
          <span className={styles.number}>{number}</span>
          <span className={styles.mystery}>Mystery</span>
        </div>
        {/* Title stays hidden during selection; content is shown in GiftReveal */}
        <div className={`${styles.face} ${styles.back}`} aria-hidden="true">
          <span className={styles.mystery}>Mystery</span>
        </div>
      </div>
      {selected && (
        <span className={styles.check} aria-hidden="true">
          <Check size={14} />
        </span>
      )}
    </motion.button>
  );
}
