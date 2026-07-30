import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SecretLogin from "./components/SecretLogin";
import CinematicIntro from "./components/CinematicIntro";
import HeroSection from "./components/HeroSection";
import MemoryJourney from "./components/MemoryJourney";
import QuizSection from "./components/QuizSection";
import EmotionalMessages from "./components/EmotionalMessages";
import GiftSelection from "./components/GiftSelection";
import GiftReveal from "./components/GiftReveal";
import FinalSurprise from "./components/FinalSurprise";
import MusicToggle from "./components/MusicToggle";
import EasterEgg from "./components/EasterEgg";
import { useAudio } from "./hooks/useAudio";
import "./styles/globals.css";

const STAGES = {
  LOGIN: "login",
  INTRO: "intro",
  JOURNEY: "journey",
  REVEAL: "reveal",
  FINALE: "finale",
};

export default function App() {
  const [stage, setStage] = useState(STAGES.LOGIN);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const audio = useAudio();

  useEffect(() => {
    if (stage === STAGES.JOURNEY || stage === STAGES.FINALE) {
      setShowMusicPrompt(true);
    }
  }, [stage]);

  const handleUnlock = useCallback(() => {
    setStage(STAGES.INTRO);
  }, []);

  const handleIntroDone = useCallback(() => {
    setStage(STAGES.JOURNEY);
    window.scrollTo(0, 0);
  }, []);

  const handleOpenBox = useCallback((gifts) => {
    setSelectedGifts(gifts);
    setStage(STAGES.REVEAL);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleRevealDone = useCallback(() => {
    setStage(STAGES.FINALE);
  }, []);

  const handleReplay = useCallback(() => {
    setSelectedGifts([]);
    setStage(STAGES.LOGIN);
    setShowMusicPrompt(false);
    setRunKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="app-shell" key={runKey}>
      <div className="grain" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {stage === STAGES.LOGIN && (
          <motion.div
            key="login"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SecretLogin onSuccess={handleUnlock} />
          </motion.div>
        )}

        {stage === STAGES.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CinematicIntro onComplete={handleIntroDone} />
          </motion.div>
        )}
      </AnimatePresence>

      {(stage === STAGES.JOURNEY ||
        stage === STAGES.REVEAL ||
        stage === STAGES.FINALE) && (
        <>
          <MusicToggle
            enabled={audio.enabled}
            available={audio.available}
            onToggle={audio.toggle}
            showPrompt={showMusicPrompt && stage === STAGES.JOURNEY}
          />
          <EasterEgg />
        </>
      )}

      {stage === STAGES.JOURNEY && (
        <main>
          <HeroSection />
          <MemoryJourney />
          <QuizSection />
          <EmotionalMessages />
          <GiftSelection onOpenBox={handleOpenBox} />
        </main>
      )}

      {stage === STAGES.REVEAL && (
        <GiftReveal gifts={selectedGifts} onComplete={handleRevealDone} />
      )}

      {stage === STAGES.FINALE && <FinalSurprise onReplay={handleReplay} />}
    </div>
  );
}
