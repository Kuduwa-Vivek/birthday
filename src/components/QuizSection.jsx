import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";
import styles from "./QuizSection.module.css";

function ConfettiBurst() {
  const bits = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 180,
        y: -40 - Math.random() * 100,
        r: Math.random() * 360,
        c: Math.random() > 0.5 ? "#FF4F9A" : "#8B5CF6",
      })),
    []
  );

  return (
    <div className={styles.confetti} aria-hidden="true">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className={styles.bit}
          style={{ background: b.c }}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{ opacity: 0, x: b.x, y: b.y, rotate: b.r, scale: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function QuizSection() {
  const questions = birthdayConfig.questions || [];
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null); // correct | incorrect
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const q = questions[index];

  const pick = (optionIndex) => {
    if (selected !== null || done) return;
    setSelected(optionIndex);
    const correct = optionIndex === q.correctAnswer;
    setStatus(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const next = () => {
    if (index >= questions.length - 1) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setStatus(null);
  };

  if (!questions.length) return null;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="quiz-title">
      <h2 id="quiz-title" className="section-title">
        Okay… let&apos;s see how well you remember things
      </h2>
      <p className="section-sub">No pressure. Just a little playful curiosity.</p>

      <div className={`glass-panel ${styles.panel}`}>
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.45 }}
            >
              <p className={styles.progress}>
                Question {index + 1} of {questions.length}
              </p>
              <h3 className={styles.question}>{q.question}</h3>

              <motion.div
                className={styles.options}
                animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
              >
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === q.correctAnswer;
                  let stateClass = "";
                  if (selected !== null) {
                    if (isSelected && status === "correct") stateClass = styles.correct;
                    else if (isSelected && status === "incorrect") stateClass = styles.incorrect;
                    else if (isCorrect) stateClass = styles.revealCorrect;
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`${styles.option} ${stateClass}`}
                      onClick={() => pick(i)}
                      disabled={selected !== null}
                      aria-pressed={isSelected}
                    >
                      <span className={styles.optIndex}>{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </motion.div>

              {status === "correct" && <ConfettiBurst />}

              <AnimatePresence>
                {status && (
                  <motion.div
                    className={styles.feedback}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <p>
                      {status === "correct"
                        ? q.correctMessage || "Okay, you actually know this 😌"
                        : q.incorrectMessage || "Nice try 😌"}
                    </p>
                    <button type="button" className="btn-primary" onClick={next}>
                      {index >= questions.length - 1 ? "See verdict →" : "Next question →"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className={styles.result}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
            >
              <p className={styles.verdict}>Official verdict</p>
              <h3>You passed the test ❤️</h3>
              <p className={styles.scoreNote}>
                {score} of {questions.length} remembered — and every answer was charming.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
