import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import { useRef } from "react";
import { birthdayConfig } from "../config/birthdayConfig";
import ParticleBackground from "./ParticleBackground";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section ref={ref} className={styles.hero} aria-label="Birthday hero">
      <ParticleBackground density="normal" />
      <div className={styles.glow} aria-hidden="true" />

      <motion.div className={styles.content} style={{ y, opacity, scale }}>
        <motion.div
          className={styles.heartWrap}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Heart className={styles.heart} fill="currentColor" size={22} aria-hidden="true" />
        </motion.div>

        <motion.p
          className={styles.kicker}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          A birthday story hidden just for you
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.55, duration: 1 }}
        >
          {birthdayConfig.heroTitle}
        </motion.h1>

        <motion.h2
          className={styles.name}
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, letterSpacing: "0.12em" }}
          transition={{ delay: 0.9, duration: 1.1 }}
        >
          {birthdayConfig.birthdayName}
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {birthdayConfig.heroJourneyLine || birthdayConfig.heroSubtitle}
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span>Scroll to begin</span>
        <ChevronDown className={styles.arrow} size={20} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
