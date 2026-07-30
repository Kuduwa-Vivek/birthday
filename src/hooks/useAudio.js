import { useCallback, useEffect, useRef, useState } from "react";
import { birthdayConfig } from "../config/birthdayConfig";

/**
 * Background music control. Gracefully no-ops if the file is missing.
 */
export function useAudio() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = birthdayConfig.musicPath;
    audio.loop = true;
    audio.volume = birthdayConfig.musicVolume ?? 0.28;
    audio.preload = "auto";

    const onCanPlay = () => setReady(true);
    const onError = () => {
      setAvailable(false);
      setReady(false);
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available) return false;
    try {
      await audio.play();
      setEnabled(true);
      return true;
    } catch {
      setEnabled(false);
      return false;
    }
  }, [available]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setEnabled(false);
  }, []);

  const toggle = useCallback(async () => {
    if (enabled) {
      pause();
      return false;
    }
    return play();
  }, [enabled, pause, play]);

  return { enabled, available, ready, play, pause, toggle };
}
