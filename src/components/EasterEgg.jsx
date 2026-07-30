import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle, X } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import styles from "./EasterEgg.module.css";

export default function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const egg = birthdayConfig.easterEgg || {};

  const onSparkle = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setOpen(true);
      setClicks(0);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.sparkle}
        onClick={onSparkle}
        aria-label="A tiny sparkle"
        title=""
      >
        <Sparkle size={12} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="egg-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`glass-panel ${styles.panel}`}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45 }}
            >
              <button
                type="button"
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Close secret"
              >
                <X size={18} />
              </button>

              <h2 id="egg-title">{egg.message}</h2>
              <p className={styles.secret}>{egg.secretMessage}</p>

              <div className={styles.media}>
                {!imgFailed && egg.photo && (
                  <img
                    src={egg.photo}
                    alt="Secret funny photo"
                    loading="lazy"
                    onError={() => setImgFailed(true)}
                  />
                )}
                {imgFailed && (
                  <div className="media-fallback">[FUNNY PHOTO]</div>
                )}
                {!videoFailed && egg.video && (
                  <video
                    src={egg.video}
                    controls
                    muted
                    playsInline
                    onError={() => setVideoFailed(true)}
                    aria-label="Secret funny video"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
