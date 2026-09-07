import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './VSLSection.module.css';

const VIDEOS = [
  { src: '/videos/vsl-video1.mp4', label: 'Por que escolher o Grupo Souza Rodrigues?' },
  { src: '/videos/vsl-video2.mp4', label: 'Conheça nossos projetos e resultados' },
];

const POSTER = '/videos/vsl-capa.jpg';

export const VSLSection: React.FC = () => {
  const sectionRef    = useRef<HTMLElement>(null);
  const playerRef     = useRef<HTMLDivElement>(null);
  const videoRefs     = useRef<(HTMLVideoElement | null)[]>([]);

  const [expanded, setExpanded]       = useState(false);
  const [current,  setCurrent]        = useState(0);
  const [playing,  setPlaying]        = useState(false);
  const [progress, setProgress]       = useState(0);
  const [transitioning, setTrans]     = useState<'prev' | 'next' | null>(null);

  // ─── Auto-fecha quando sai do viewport ──────────────────────────────────
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && expanded) {
          handleCollapse();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(player);
    return () => observer.disconnect();
  }, [expanded]);

  // ─── Progresso do vídeo ──────────────────────────────────────────────────
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

  // ─── Abre o player ──────────────────────────────────────────────────────
  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => {
      const vid = videoRefs.current[current];
      vid?.play().then(() => setPlaying(true)).catch(() => {});
    }, 420); // aguarda animação de abertura
  };

  // ─── Fecha o player ─────────────────────────────────────────────────────
  const handleCollapse = () => {
    const vid = videoRefs.current[current];
    if (vid) { vid.pause(); vid.currentTime = 0; }
    setPlaying(false);
    setProgress(0);
    setExpanded(false);
  };

  // ─── Play / Pause inline ────────────────────────────────────────────────
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[current];
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else            { vid.pause(); setPlaying(false); }
  };

  // ─── Ao terminar o vídeo, avança ────────────────────────────────────────
  const handleEnded = useCallback(() => {
    navigateTo((current + 1) % VIDEOS.length, 'next');
  }, [current]);

  // ─── Navegação entre vídeos ─────────────────────────────────────────────
  const navigateTo = (index: number, dir: 'prev' | 'next') => {
    if (index === current || transitioning) return;
    const oldVid = videoRefs.current[current];
    if (oldVid) { oldVid.pause(); oldVid.currentTime = 0; }
    setPlaying(false);
    setProgress(0);
    setTrans(dir);
    setTimeout(() => {
      setCurrent(index);
      setTrans(null);
      setTimeout(() => {
        const newVid = videoRefs.current[index];
        newVid?.play().then(() => setPlaying(true)).catch(() => {});
      }, 50);
    }, 350);
  };

  // ─── Barra de progresso clicável ────────────────────────────────────────
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const vid = videoRefs.current[current];
    if (!vid?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    vid.currentTime = ((e.clientX - rect.left) / rect.width) * vid.duration;
  };

  const wrapClass = [
    styles.videoWrap,
    transitioning === 'next' ? styles.slideOutLeft : '',
    transitioning === 'prev' ? styles.slideOutRight : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={styles.section} id="vsl" ref={sectionRef}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <span className={styles.badge}>Apresentação Especial</span>
        <h2 className={styles.title}>Por que escolher o Grupo Souza Rodrigues?</h2>
      </div>

      {/* Player dinâmico */}
      <div
        ref={playerRef}
        className={`${styles.player} ${expanded ? styles.playerExpanded : styles.playerCollapsed}`}
      >

        {/* ══ ESTADO RECOLHIDO: capa + botão play ══ */}
        {!expanded && (
          <button className={styles.thumbnail} onClick={handleExpand} aria-label="Abrir player de vídeo">
            <img src={POSTER} alt="Capa do vídeo" className={styles.posterImg} />
            <div className={styles.posterOverlay} />
            {/* Botão play grande */}
            <span className={styles.bigPlayBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            <span className={styles.thumbnailLabel}>Assista agora</span>
          </button>
        )}

        {/* ══ ESTADO EXPANDIDO: carrossel de vídeos ══ */}
        {expanded && (
          <div className={styles.expandedInner}>
            {/* Barra superior com seleção de vídeo + fechar */}
            <div className={styles.topBar}>
              <div className={styles.tabRow}>
                {VIDEOS.map((v, i) => (
                  <button
                    key={i}
                    className={`${styles.tab} ${i === current ? styles.tabActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); navigateTo(i, i > current ? 'next' : 'prev'); }}
                  >
                    <span className={styles.tabNum}>{i + 1}</span>
                    <span className={styles.tabLabel}>{v.label}</span>
                  </button>
                ))}
              </div>
              {/* Botão fechar */}
              <button className={styles.closeBtn} onClick={handleCollapse} aria-label="Fechar player">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Área do vídeo + setas */}
            <div className={styles.videoRow}>
              {/* Seta esquerda */}
              <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={(e) => { e.stopPropagation(); navigateTo((current - 1 + VIDEOS.length) % VIDEOS.length, 'prev'); }}
                aria-label="Vídeo anterior"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Wrapper do vídeo */}
              <div className={styles.videoOuter}>
                <div className={wrapClass}>
                  {VIDEOS.map((v, i) => (
                    <video
                      key={v.src}
                      ref={el => { videoRefs.current[i] = el; }}
                      className={styles.video}
                      style={{ display: i === current ? 'block' : 'none' }}
                      src={v.src}
                      preload="metadata"
                      playsInline
                      poster={POSTER}
                      onEnded={i === current ? handleEnded : undefined}
                      onClick={togglePlay}
                    />
                  ))}

                  {/* Play/Pause overlay */}
                  <button
                    className={`${styles.playOverlay} ${playing ? styles.playOverlayHidden : ''}`}
                    onClick={togglePlay}
                    aria-label={playing ? 'Pausar' : 'Reproduzir'}
                  >
                    {playing
                      ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      : <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                    }
                  </button>

                  {/* Barra de progresso */}
                  <div className={styles.progressBar} onClick={handleSeek}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Seta direita */}
              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={(e) => { e.stopPropagation(); navigateTo((current + 1) % VIDEOS.length, 'next'); }}
                aria-label="Próximo vídeo"
              >
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
                  onClick={(e) => { e.stopPropagation(); navigateTo(i, i > current ? 'next' : 'prev'); }}
                  aria-label={`Vídeo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
