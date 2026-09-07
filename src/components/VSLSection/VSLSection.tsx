import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './VSLSection.module.css';

const VIDEOS = [
  { src: '/videos/vsl-video1.mp4', label: 'Por que escolher o Grupo Souza Rodrigues?' },
  { src: '/videos/vsl-video2.mp4', label: 'Conheça nossos projetos e resultados' },
];

const COVER = '/videos/vsl-capa.jpg';

export const VSLSection: React.FC = () => {
  const sectionRef    = useRef<HTMLElement>(null);
  const playerRef     = useRef<HTMLDivElement>(null);
  const videoRefs     = useRef<(HTMLVideoElement | null)[]>([]);

  const [expanded, setExpanded]       = useState(false);   // player aberto?
  const [current, setCurrent]         = useState(0);
  const [playing, setPlaying]         = useState(false);
  const [progress, setProgress]       = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // ── Progresso do vídeo ──────────────────────────────────────────────────
  const updateProgress = useCallback(() => {
    const vid = videoRefs.current[current];
    if (vid?.duration) setProgress((vid.currentTime / vid.duration) * 100);
  }, [current]);

  useEffect(() => {
    const vid = videoRefs.current[current];
    if (!vid) return;
    vid.addEventListener('timeupdate', updateProgress);
    return () => vid.removeEventListener('timeupdate', updateProgress);
  }, [current, expanded, updateProgress]);

  // ── Ao terminar, avança automaticamente ─────────────────────────────────
  const handleEnded = useCallback(() => {
    const next = (current + 1) % VIDEOS.length;
    switchVideo(next);
  }, [current]);

  // ── Abre o player e começa a tocar ──────────────────────────────────────
  const openPlayer = () => {
    if (transitioning) return;
    setTransitioning(true);
    setExpanded(true);
    setTimeout(() => {
      setTransitioning(false);
      const vid = videoRefs.current[current];
      vid?.play().then(() => setPlaying(true)).catch(() => {});
    }, 420);
  };

  // ── Fecha o player ──────────────────────────────────────────────────────
  const closePlayer = useCallback(() => {
    if (transitioning) return;
    const vid = videoRefs.current[current];
    vid?.pause();
    setPlaying(false);
    setTransitioning(true);
    setTimeout(() => {
      setExpanded(false);
      setTransitioning(false);
      setProgress(0);
      if (vid) vid.currentTime = 0;
    }, 380);
  }, [current, transitioning]);

  // ── Play / Pause ────────────────────────────────────────────────────────
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[current];
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  // ── Trocar vídeo ────────────────────────────────────────────────────────
  const switchVideo = (index: number) => {
    if (index === current) return;
    const old = videoRefs.current[current];
    old?.pause(); old && (old.currentTime = 0);
    setPlaying(false); setProgress(0);
    setCurrent(index);
    setTimeout(() => {
      const vid = videoRefs.current[index];
      vid?.play().then(() => setPlaying(true)).catch(() => {});
    }, 50);
  };

  // ── Scrub ────────────────────────────────────────────────────────────────
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const vid = videoRefs.current[current];
    if (!vid?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    vid.currentTime = ((e.clientX - rect.left) / rect.width) * vid.duration;
  };

  // ── IntersectionObserver: fecha ao sair do viewport ──────────────────────
  useEffect(() => {
    if (!playerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && expanded) closePlayer();
      },
      { threshold: 0.1 }
    );
    observer.observe(playerRef.current);
    return () => observer.disconnect();
  }, [expanded, closePlayer]);

  return (
    <section className={styles.section} id="vsl" ref={sectionRef}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <span className={styles.badge}>Apresentação Especial</span>
        <h2 className={styles.title}>Por que escolher o Grupo Souza Rodrigues?</h2>
      </div>

      {/* Player dinâmico */}
      <div className={styles.playerCenter}>
        <div
          ref={playerRef}
          className={`${styles.player} ${expanded ? styles.playerExpanded : styles.playerCollapsed}`}
          onClick={!expanded ? openPlayer : undefined}
        >

          {/* ── ESTADO RECOLHIDO: capa + botão play ─────────────────── */}
          {!expanded && (
            <div className={styles.coverState}>
              <img src={COVER} alt="Capa do vídeo" className={styles.coverImg} />
              <div className={styles.coverOverlay} />
              <button className={styles.bigPlayBtn} aria-label="Reproduzir vídeo">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              </button>
              <div className={styles.coverLabel}>
                <span>▶ Assista agora</span>
                <p>Por que escolher o Grupo Souza Rodrigues?</p>
              </div>
            </div>
          )}

          {/* ── ESTADO EXPANDIDO: player real ────────────────────────── */}
          {expanded && (
            <div className={styles.expandedState}>
              {/* Botão fechar */}
              <button className={styles.closeBtn} onClick={closePlayer} aria-label="Fechar vídeo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              {/* Seletor de vídeos */}
              <div className={styles.videoTabs}>
                {VIDEOS.map((v, i) => (
                  <button
                    key={i}
                    className={`${styles.videoTab} ${i === current ? styles.videoTabActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); switchVideo(i); }}
                  >
                    {i + 1}. {v.label}
                  </button>
                ))}
              </div>

              {/* Vídeos */}
              <div className={styles.videoArea} onClick={togglePlay}>
                {VIDEOS.map((v, i) => (
                  <video
                    key={v.src}
                    ref={el => { videoRefs.current[i] = el; }}
                    className={styles.video}
                    style={{ display: i === current ? 'block' : 'none' }}
                    src={v.src}
                    preload="metadata"
                    playsInline
                    poster={COVER}
                    onEnded={i === current ? handleEnded : undefined}
                  />
                ))}

                {/* Overlay play/pause */}
                <button
                  className={`${styles.playPauseOverlay} ${playing ? styles.playPauseHide : ''}`}
                  onClick={togglePlay}
                  aria-label={playing ? 'Pausar' : 'Reproduzir'}
                >
                  {playing
                    ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    : <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  }
                </button>
              </div>

              {/* Barra de progresso */}
              <div className={styles.progressBar} onClick={handleSeek}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>

              {/* Contador */}
              <p className={styles.videoCounter}>Vídeo {current + 1} de {VIDEOS.length}</p>
            </div>
          )}
        </div>

        {/* Hint de clique (estado recolhido) */}
        {!expanded && (
          <p className={styles.hint}>Clique para assistir</p>
        )}
      </div>
    </section>
  );
};
