import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './VSLSection.module.css';

const videos = [
  {
    src: '/videos/vsl-video1.mp4',
    label: 'Vídeo 1',
  },
  {
    src: '/videos/vsl-video2.mp4',
    label: 'Vídeo 2',
  },
];

export const VSLSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState<'left' | 'right' | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Quando o índice mudar, reinicia o vídeo atual
  useEffect(() => {
    const vid = videoRefs.current[current];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [current]);

  // Ao terminar o vídeo atual, avança automaticamente
  const handleEnded = useCallback(() => {
    goTo((current + 1) % videos.length, 'left');
  }, [current]);

  const goTo = (index: number, direction: 'left' | 'right') => {
    if (index === current) return;
    setSliding(direction);
    setTimeout(() => {
      setCurrent(index);
      setSliding(null);
    }, 400);
  };

  const prev = () => {
    const index = (current - 1 + videos.length) % videos.length;
    goTo(index, 'right');
  };

  const next = () => {
    const index = (current + 1) % videos.length;
    goTo(index, 'left');
  };

  return (
    <section className={styles.sectionContainer} id="vsl">
      <div className={styles.header}>
        <span className={styles.badge}>Apresentação Especial</span>
        <h2 className={styles.title}>Por que escolher o Grupo Souza Rodrigues?</h2>
      </div>

      <div className={styles.carouselOuter}>
        {/* Botão anterior */}
        <button
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
          onClick={prev}
          aria-label="Vídeo anterior"
        >
          &#8249;
        </button>

        {/* Área do vídeo com animação de slide */}
        <div className={`${styles.videoWrapper} ${sliding === 'left' ? styles.slideOutLeft : ''} ${sliding === 'right' ? styles.slideOutRight : ''}`}>
          {videos.map((video, i) => (
            <video
              key={video.src}
              ref={(el) => { videoRefs.current[i] = el; }}
              className={styles.videoPlayer}
              style={{ display: i === current ? 'block' : 'none' }}
              controls
              playsInline
              muted
              onEnded={i === current ? handleEnded : undefined}
            >
              <source src={video.src} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          className={`${styles.navBtn} ${styles.navBtnRight}`}
          onClick={next}
          aria-label="Próximo vídeo"
        >
          &#8250;
        </button>
      </div>

      {/* Indicadores (dots) */}
      <div className={styles.dots}>
        {videos.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i, i > current ? 'left' : 'right')}
            aria-label={`Ir para vídeo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
