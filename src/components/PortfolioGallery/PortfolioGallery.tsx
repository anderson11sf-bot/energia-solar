import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './PortfolioGallery.module.css';

interface GalleryItem {
  id: string;
  type?: 'video' | 'photo';
  title: string;
  tag: string;
  videoSrc?: string;
  poster?: string;
  imageSrc?: string;
  description: string;
}

const initial2x2: GalleryItem[] = [
  {
    id: "vid-1",
    type: "video",
    title: "Medição & Manutenção Preventiva",
    tag: "Aferição Técnica",
    videoSrc: "/videos/VID-20260725-WA0024.mp4",
    poster: "/videos/poster-institucional.webp",
    description: "Aferição de corrente e tensão antes e após a lavagem técnica dos módulos."
  },
  {
    id: "vid-2",
    type: "video",
    title: "Montagem Estrutural em Telhado",
    tag: "Instalação em Campo",
    videoSrc: "/videos/VID-20240831-WA0010.mp4",
    poster: "/videos/poster-obra-1.webp",
    description: "Fixação e ancoragem de perfis de alumínio e cabeamento solar homologado."
  },
  {
    id: "foto-1",
    type: "photo",
    title: "Usinagem e Módulos em Telhado Industrial",
    tag: "Obra Comercial",
    imageSrc: "/obras/IMG-20260729-WA0064.jpg",
    description: "Instalação fotovoltaica de alta potência entregue com homologação completa."
  },
  {
    id: "foto-2",
    type: "photo",
    title: "Inversor String Box e Proteção Elétrica",
    tag: "Execução Técnica",
    imageSrc: "/obras/IMG-20260409-WA0093.jpg",
    description: "Estrutura metálica com vedação estanque contra intempéries e ventos fortes."
  }
];

const galleryPhotos: GalleryItem[] = [
  {
    id: "foto-exp-1",
    type: "photo",
    title: "Instalação Fotovoltaica Residencial",
    tag: "Residencial",
    imageSrc: "/obras/IMG-20240614-WA0069.jpg",
    description: "Painéis monocristalinos de alta eficiência gerando economia imediata."
  },
  {
    id: "foto-exp-2",
    type: "photo",
    title: "Sistema Solar em Campo",
    tag: "Instalação",
    imageSrc: "/obras/IMG-20240819-WA0027.jpg",
    description: "Execução de projeto fotovoltaico com equipe técnica especializada."
  },
  {
    id: "foto-exp-3",
    type: "photo",
    title: "Montagem Estrutural Completa",
    tag: "Infraestrutura",
    imageSrc: "/obras/IMG-20240901-WA0009.jpg",
    description: "Fixação de perfis e cabeamento solar homologado com aterramento."
  },
  {
    id: "foto-exp-4",
    type: "photo",
    title: "Módulos em Telhado Cerâmico",
    tag: "Residencial",
    imageSrc: "/obras/IMG-20240925-WA0071.jpg",
    description: "Ancoragem segura sem risco de infiltrações em telhas cerâmicas."
  },
  {
    id: "foto-exp-5",
    type: "photo",
    title: "Manutenção Preventiva e Aferição",
    tag: "Manutenção",
    imageSrc: "/obras/IMG-20241112-WA0048.jpg",
    description: "Higienização técnica e inspeção de hotspots para máxima geração."
  },
  {
    id: "foto-exp-6",
    type: "photo",
    title: "Instalação de Alta Potência",
    tag: "Comercial",
    imageSrc: "/obras/IMG-20241219-WA0025.jpg",
    description: "Usina solar comercial com homologação completa na concessionária."
  },
  {
    id: "foto-exp-7",
    type: "photo",
    title: "Sistema String e Proteção Elétrica",
    tag: "Execução Técnica",
    imageSrc: "/obras/IMG-20241219-WA0031.jpg",
    description: "String box com proteção elétrica e vedação estanque contra intempéries."
  },
  {
    id: "foto-exp-8",
    type: "photo",
    title: "Entrega de Obra Solar",
    tag: "Entrega Técnica",
    imageSrc: "/obras/IMG-20241220-WA0022.jpg",
    description: "Sistema fotovoltaico ativado com redução imediata na conta de energia."
  },
  {
    id: "foto-exp-9",
    type: "photo",
    title: "Painéis em Telhado Industrial",
    tag: "Industrial",
    imageSrc: "/obras/IMG-20250108-WA0064.jpg",
    description: "Grande instalação com alta potência instalada e geração contínua."
  },
  {
    id: "foto-exp-10",
    type: "photo",
    title: "Cabeamento e Aterramento Técnico",
    tag: "Infraestrutura",
    imageSrc: "/obras/IMG-20260216-WA0018.jpg",
    description: "Passagem de cabos solares com proteção anti-UV e aterramento completo."
  }
];

export const PortfolioGallery: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
    'vid-1': true,
    'vid-2': true
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const allPhotos = [...initial2x2.filter(i => i.type === 'photo'), ...galleryPhotos];

  // Auto-play muted video when in viewport
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSound = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedStates((prev) => ({ ...prev, [id]: vid.muted }));
    }
  };

  const openLightbox = (imageSrc: string) => {
    const index = allPhotos.findIndex(p => p.imageSrc === imageSrc);
    if (index !== -1) setSelectedImageIndex(index);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allPhotos.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  return (
    <section className={styles.sectionContainer} id="portfolio">
      <div className={styles.header}>
        <span className={styles.badge}>Portfólio em Campo</span>
        <h2 className={styles.title}>Obras Reais <span className="text-gradient">Entregues</span></h2>
        <p className={styles.subtitle}>
          Registros autênticos de instalações fotovoltaicas de alta potência e manutenções preventivas realizadas pela nossa equipe técnica.
        </p>
      </div>

      {/* Grid 2x2 Inicial */}
      <div className={styles.grid2x2}>
        {initial2x2.map((item) => (
          <div key={item.id} className={styles.card}>
            <div
              className={styles.mediaContainer}
              onClick={() => item.type === 'photo' && item.imageSrc && openLightbox(item.imageSrc)}
            >
              <span className={styles.tagPill}>{item.tag}</span>

              {item.type === 'video' ? (
                <>
                  <button
                    className={styles.soundBtn}
                    onClick={(e) => toggleSound(item.id, e)}
                    aria-label="Alternar Som"
                  >
                    {mutedStates[item.id] ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <video
                    ref={(el) => (videoRefs.current[item.id] = el)}
                    src={item.videoSrc}
                    poster={item.poster}
                    muted
                    loop
                    playsInline
                    className={styles.videoElement}
                  />
                </>
              ) : (
                <ImageLoader
                  src={item.imageSrc || ''}
                  alt={item.title}
                  className={styles.photoElement}
                  wrapperClassName={styles.mediaContainer}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Galeria Expandida */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.expandedWrap}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.expandedGrid}>
              {galleryPhotos.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={styles.mediaContainer}
                    onClick={() => item.imageSrc && openLightbox(item.imageSrc)}
                  >
                    <span className={styles.tagPill}>{item.tag}</span>
                    <ImageLoader
                      src={item.imageSrc || ''}
                      alt={item.title}
                      className={styles.photoElement}
                      wrapperClassName={styles.mediaContainer}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.expandBtnWrap}>
        <button className={styles.expandBtn} onClick={() => setIsExpanded(!isExpanded)}>
          <span>{isExpanded ? 'Ver Menos Obras' : 'Ver Mais Obras em Campo'}</span>
          <ChevronDown
            size={18}
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          />
        </button>
      </div>

      {/* Lightbox Modal Mesa de Vidro */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className={styles.lightboxDialog} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelectedImageIndex(null)}>
                <X size={28} />
              </button>

              <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={prevLightbox}>
                <ChevronLeft size={24} />
              </button>
              <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={nextLightbox}>
                <ChevronRight size={24} />
              </button>

              <div className={styles.lightboxMediaWrap}>
                <img
                  src={allPhotos[selectedImageIndex].imageSrc}
                  alt={allPhotos[selectedImageIndex].title}
                  className={styles.lightboxImg}
                />
              </div>

              <p className={styles.lightboxCaption}>
                {allPhotos[selectedImageIndex].title} • {allPhotos[selectedImageIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
