import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { birthdayConfig } from "../config/birthdayConfig";
import ParticleBackground from "./ParticleBackground";
import styles from "./SecretLogin.module.css";

const WRONG_MESSAGES = birthdayConfig.wrongPasswordMessages;

export default function SecretLogin({ onSuccess }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [burst, setBurst] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unlocking) return;

    const submitted = value.trim();
    if (!submitted) {
      setError("The key is waiting…");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }

    if (submitted === birthdayConfig.password) {
      setError("");
      setUnlocking(true);
      setBurst(true);
      setTimeout(() => onSuccess?.(), 1400);
      return;
    }

    const next = attempts + 1;
    setAttempts(next);
    setError(WRONG_MESSAGES[(next - 1) % WRONG_MESSAGES.length]);
    setShaking(true);
    setTimeout(() => setShaking(false), 550);
    if (next >= 3) setShowHint(true);
  };

  return (
    <div className={styles.screen} role="dialog" aria-labelledby="login-title">
      <ParticleBackground density="heavy" burst={burst} burstKey={burst ? 1 : 0} />
      <div className={styles.gradient} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <AnimatePresence>
        {!unlocking && (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.eyebrow}>A private invitation</p>
            <h1 id="login-title" className={styles.title}>
              Some memories have a key.
            </h1>
            <p className={styles.subtitle}>Can you find yours?</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <motion.div
                className={`${styles.inputWrap} ${shaking ? styles.shake : ""} ${
                  error ? styles.errorGlow : ""
                }`}
                animate={shaking ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <KeyRound size={18} aria-hidden="true" className={styles.icon} />
                <label htmlFor="memory-key" className="sr-only">
                  Memory password
                </label>
                <input
                  ref={inputRef}
                  id="memory-key"
                  type="password"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder="Enter the key"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    id="login-error"
                    role="alert"
                    className={styles.error}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button type="submit" className={`btn-primary ${styles.unlock}`}>
                Unlock the Memory
              </button>
            </form>

            <div className={styles.hintArea}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setShowHint(true)}
                aria-expanded={showHint}
              >
                Hint?
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    className={styles.hint}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0 }}
                  >
                    {attempts >= 4
                      ? birthdayConfig.passwordHintStrong
                      : birthdayConfig.passwordHint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unlocking && (
          <motion.div
            className={styles.flash}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85, 0] }}
            transition={{ duration: 1.2, times: [0, 0.25, 0.55, 1] }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
