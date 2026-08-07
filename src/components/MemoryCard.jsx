import { useState } from "react";
import styles from "./MemoryCard.module.css";
import VideoMemory from "./VideoMemory";

export default function MemoryCard({
  memory,
  index,
  side,
  activeVideoId,
  onVideoPlay,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const isVideo = memory.type === "video";
  const layout = memory.layout || "side";
  const tilt = memory.tilt || 0;

  return (
    <article
      className={`${styles.card} ${styles[layout] || ""} ${
        side === "left" ? styles.fromLeft : styles.fromRight
      }`}
      data-memory={memory.id}
      style={{ "--tilt": `${tilt}deg` }}
    >
      <div className={styles.meta}>
        <span className={styles.label}>{memory.label || `MEMORY ${String(index + 1).padStart(2, "0")}`}</span>
        {memory.date && <span className={styles.date}>{memory.date}</span>}
      </div>

      <div className={`${styles.media} ${layout === "polaroid" ? styles.polaroid : ""}`}>
        {isVideo ? (
          <VideoMemory
            src={memory.media}
            caption={memory.caption}
            layout={layout}
            active={activeVideoId === memory.id}
            onPlayRequest={() => onVideoPlay?.(memory.id)}
          />
        ) : imgFailed ? (
          <div className="media-fallback" role="img" aria-label={memory.caption || "Photo placeholder"}>
            [PHOTO]
            <br />
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>{memory.media}</span>
          </div>
        ) : (
          <img
            src={memory.media}
            alt={memory.caption || `Memory ${index + 1}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {!isVideo && memory.caption && (
        <p className={styles.caption}>{memory.caption}</p>
      )}
      <p className={styles.text}>{memory.text}</p>
    </article>
  );
}
