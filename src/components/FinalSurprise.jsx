import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";
import { usePrefersReducedMotion } from "../hooks/useScrollProgress";
import styles from "./FinalSurprise.module.css";

const TWIST_LINES = ["You chose one.", "But…", "There was always one more."];

function createHeartbeat() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    let stopped = false;

    const beat = (time) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(55, time);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.12, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.2);
    };

    const schedule = () => {
      if (stopped) return;
      const now = ctx.currentTime;
      beat(now);
      beat(now + 0.22);
      timeout = setTimeout(schedule, 1100);
    };

    let timeout = setTimeout(schedule, 100);
    return () => {
      stopped = true;
      clearTimeout(timeout);
      ctx.close?.();
    };
  } catch {
    return null;
  }
}

export default function FinalSurprise({ onReplay }) {
  const [phase, setPhase] = useState(0);
  // 0-2 twist lines, 3 black+heartbeat, 4 heart expand, 5 name, 6 message, 7 media
  const [imgFailed, setImgFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const stopHeartbeat = useRef(null);

  useEffect(() => {
    if (reduced) {
      setPhase(7);
      return undefined;
    }

    // Phases 0–2 are twist lines — each stays ~2s so they can be read
    const delays = [0, 2000, 4000, 6000, 7500, 9500, 11500, 14000];
    const timers = delays.map((d, i) =>
      setTimeout(() => {
        if (i <= 7) setPhase(i);
      }, d)
    );

    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    if (phase === 3 || phase === 4) {
      if (!stopHeartbeat.current) {
        stopHeartbeat.current = createHeartbeat();
      }
    }
    if (phase >= 5 && stopHeartbeat.current) {
      stopHeartbeat.current();
      stopHeartbeat.current = null;
    }
    return () => {
      if (stopHeartbeat.current) {
        stopHeartbeat.current();
        stopHeartbeat.current = null;
      }
    };
  }, [phase]);

  const finalMedia = birthdayConfig.finalMedia || {};

  return (
    <section className={styles.screen} aria-label="Final surprise">
      <AnimatePresence mode="wait">
        {phase <= 2 && (
          <motion.p
            key={`twist-${phase}`}
            className={styles.twist}
            initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(6px)", y: -10 }}
            transition={{ duration: 0.7 }}
          >
            {TWIST_LINES[phase]}
          </motion.p>
        )}
      </AnimatePresence>

      {phase >= 3 && phase < 5 && (
        <div className={styles.blackout} aria-hidden="true">
          <motion.div
            className={styles.point}
            initial={{ scale: 0.2, opacity: 0.4 }}
            animate={
              phase >= 4
                ? { scale: [1, 8, 14], opacity: [1, 0.85, 0.35], borderRadius: ["50%", "50%", "40%"] }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: phase >= 4 ? 1.6 : 0.8, ease: "easeOut" }}
          />
        </div>
      )}

      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            className={styles.finale}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className={styles.happy}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9 }}
            >
              Happy Birthday, {birthdayConfig.birthdayName}{" "}
              <span aria-hidden="true">❤️</span>
            </motion.h2>

            {phase >= 6 && (
              <motion.p
                className={styles.message}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
              >
                {birthdayConfig.finalMessage}
              </motion.p>
            )}

            {phase >= 7 && (
              <motion.div
                className={styles.mediaBlock}
                initial={{ opacity: 0, scale: 0.96, clipPath: "inset(8% 8% 8% 8%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {finalMedia.type === "video" ? (
                  <video
                    src={finalMedia.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    controls
                    onError={() => setImgFailed(true)}
                    aria-label={finalMedia.alt || "Final memory"}
                  />
                ) : imgFailed ? (
                  <div className="media-fallback">[FINAL PHOTO]</div>
                ) : (
                  <img
                    src={finalMedia.src}
                    alt={finalMedia.alt || "A meaningful moment"}
                    loading="lazy"
                    onError={() => setImgFailed(true)}
                  />
                )}

                <p className={styles.closing}>{birthdayConfig.closingLine}</p>
                <p className={styles.bye}>
                  Happy Birthday <span aria-hidden="true">❤️</span>
                </p>

                {/* <button type="button" className="btn-primary" onClick={onReplay}>
                  Replay the Story
                </button> */}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
