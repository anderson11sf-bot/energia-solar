import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './VSLSection.module.css';

const VIDEOS = [
  { src: '/videos/vsl-video1.mp4', label: 'Por que escolher o Grupo Souza Rodrigues?' },
  { src: '/videos/vsl-video2.mp4', label: 'Conheça nossos projetos e resultados' },
];

export const VSLSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);       // lazy: só carrega quando visível
  const [playing, setPlaying] = useState(false);
  const [transitioning, setTransitioning] = useState<'prev' | 'next' | null>(null);
  const [progress, setProgress] = useState(0);

  // ─── Lazy Load via IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLoaded(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ─── Progresso do vídeo ──────────────────────────────────────────────────
  const updateProgress = useCallback(() => {
    const vid = videoRefs.current[current];
    if (vid && vid.duration) setProgress((vid.currentTime / vid.duration) * 100);
  }, [current]);

  useEffect(() => {
    const vid = videoRefs.current[current];
    if (!vid) return;
    vid.addEventListener('timeupdate', updateProgress);
    return () => vid.removeEventListener('timeupdate', updateProgress);
  }, [current, loaded, updateProgress]);

  // ─── Auto-avança ao terminar ─────────────────────────────────────────────
  const handleEnded = useCallback(() => {
    navigateTo((current + 1) % VIDEOS.length, 'next');
  }, [current]);

  // ─── Navegação ───────────────────────────────────────────────────────────
  const navigateTo = (index: number, dir: 'prev' | 'next') => {
    if (index === current || transitioning) return;
    const oldVid = videoRefs.current[current];
    if (oldVid) { oldVid.pause(); oldVid.currentTime = 0; }
    setPlaying(false);
    setProgress(0);
    setTransitioning(dir);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(null);
    }, 380);
  };

  const handlePrev = () => navigateTo((current - 1 + VIDEOS.length) % VIDEOS.length, 'prev');
  const handleNext = () => navigateTo((current + 1) % VIDEOS.length, 'next');

  // ─── Play / Pause ────────────────────────────────────────────────────────
  const togglePlay = () => {
    const vid = videoRefs.current[current];
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  // ─── Scrub na barra de progresso ─────────────────────────────────────────
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const vid = videoRefs.current[current];
    if (!vid || !vid.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    vid.currentTime = ratio * vid.duration;
  };

  const wrapClass = [
    styles.playerWrap,
    transitioning === 'next' ? styles.slideOutLeft : '',
    transitioning === 'prev' ? styles.slideOutRight : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={styles.sectionContainer} id="vsl" ref={sectionRef}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <span className={styles.badge}>Apresentação Especial</span>
        <h2 className={styles.title}>Por que escolher o Grupo Souza Rodrigues?</h2>
      </div>

      {/* Layout: seta + player + seta */}
      <div className={styles.carousel}>
        {/* Seta esquerda */}
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={handlePrev} aria-label="Vídeo anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Player */}
        <div className={styles.playerOuter}>
          <div className={wrapClass}>
            {loaded ? (
              <>
                {VIDEOS.map((v, i) => (
                  <video
                    key={v.src}
                    ref={el => { videoRefs.current[i] = el; }}
                    className={styles.video}
                    style={{ display: i === current ? 'block' : 'none' }}
                    src={v.src}
                    preload="metadata"
                    playsInline
                    onEnded={i === current ? handleEnded : undefined}
                    onClick={togglePlay}
                  />
                ))}

                {/* Overlay de play/pause */}
                <button
                  className={`${styles.playBtn} ${playing ? styles.playBtnHide : ''}`}
                  onClick={togglePlay}
                  aria-label={playing ? 'Pausar' : 'Reproduzir'}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  )}
                </button>

                {/* Título do vídeo */}
                <div className={styles.videoLabel}>{VIDEOS[current].label}</div>

                {/* Barra de progresso */}
                <div className={styles.progressBar} onClick={handleSeek} role="progressbar">
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              /* Skeleton enquanto não está visível */
              <div className={styles.skeleton}>
                <div className={styles.skeletonIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <p>Role para carregar o vídeo</p>
              </div>
            )}
          </div>
        </div>

        {/* Seta direita */}
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={handleNext} aria-label="Próximo vídeo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => navigateTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Vídeo ${i + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <p className={styles.counter}>{current + 1} / {VIDEOS.length}</p>
    </section>
  );
};
