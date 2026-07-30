import { Music, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./MusicToggle.module.css";

export default function MusicToggle({ enabled, available, onToggle, showPrompt }) {
  if (!available) return null;

  return (
    <div className={styles.wrap}>
      <AnimatePresence>
        {showPrompt && !enabled && (
          <motion.button
            type="button"
            className={styles.prompt}
            onClick={onToggle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            aria-label="Turn on the music"
          >
            ♫ Turn on the music
          </motion.button>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={`${styles.toggle} ${enabled ? styles.on : ""}`}
        onClick={onToggle}
        aria-label={enabled ? "Mute background music" : "Play background music"}
        aria-pressed={enabled}
      >
        {enabled ? <Music size={18} /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
