import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play } from "lucide-react";
import styles from "./VideoMemory.module.css";

/**
 * Cinematic video card with intersection-based play/pause.
 * Only one video should play at a time via onPlayRequest.
 */
export default function VideoMemory({
  src,
  caption,
  active = false,
  onPlayRequest,
  layout = "side",
  className = "",
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.4),
      { threshold: [0, 0.4, 0.7] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    if (!inView || !active) {
      video.pause();
      setPlaying(false);
    }
  }, [inView, active, failed]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || failed) return;

    if (playing) {
      video.pause();
      setPlaying(false);
      return;
    }

    onPlayRequest?.();
    try {
      // User-initiated play → allow sound
      video.muted = false;
      video.volume = 1;
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const goFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.card} ${styles[layout] || ""} ${className}`.trim()}
    >
      <div className={styles.frame}>
        {failed ? (
          <div className="media-fallback" role="img" aria-label={caption || "Video placeholder"}>
            [VIDEO]
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>{src}</span>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            playsInline
            loop
            preload="metadata"
            onError={() => setFailed(true)}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            aria-label={caption || "Memory video"}
          />
        )}
        <div className={styles.overlay} aria-hidden="true" />
        {!failed && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.ctrl}
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              className={styles.ctrl}
              onClick={goFullscreen}
              aria-label="Fullscreen video"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        )}
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
