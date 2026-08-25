import { useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Environments } from './components/Environments/Environments';
import { BeforeAfterSlider } from './components/BeforeAfterSlider/BeforeAfterSlider';
import { ProcessTimeline } from './components/ProcessTimeline/ProcessTimeline';
import { PortfolioGallery } from './components/PortfolioGallery/PortfolioGallery';
import { ContactForm } from './components/ContactForm/ContactForm';
import { AboutSection } from './components/AboutSection/AboutSection';
import { Footer } from './components/Footer/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp/FloatingWhatsApp';
import { FloatingInstagram } from './components/FloatingInstagram/FloatingInstagram';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Inicia sempre no topo e desativa restauração automática
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Arquitetura desacoplada: scroll → targetTime | RAF → video.currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    let targetTime = 0;
    let rafId: number;

    // 1. SCROLL: apenas calcula e grava targetTime (ultra-leve, não bloqueia)
    const onScroll = () => {
      if (!video.duration) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progresso = Math.max(0, Math.min(1, scrollY / maxScroll));
      targetTime = video.duration * progresso;
    };

    // 2. MOTOR RAF: roda a 60fps, aplica o tempo sem suavização (1:1 com o scroll)
    const renderizarVideo = () => {
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }
      rafId = requestAnimationFrame(renderizarVideo);
    };

    const handleMetadata = () => {
      video.pause();
      window.addEventListener('scroll', onScroll, { passive: true });
      rafId = requestAnimationFrame(renderizarVideo);
    };

    if (video.readyState >= 1) {
      video.pause();
      window.addEventListener('scroll', onScroll, { passive: true });
      rafId = requestAnimationFrame(renderizarVideo);
    } else {
      video.addEventListener('loadedmetadata', handleMetadata);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, []);

  return (
    <>
      {/* VÍDEO FIXO DE FUNDO GLOBAL COM SCROLL SCRUBBING + LERP */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <video
          ref={videoRef}
          src="/video-fundo-scrub.mp4"
          muted
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(5, 5, 5, 0.65)' }}></div>
      </div>

      <Navbar />

      <Hero />

      <div ref={mainContentRef} style={{ position: 'relative', zIndex: 5 }}>
        <Environments />
        <BeforeAfterSlider
          beforeImage="/site/IMG-20260723-WA0033.jpg"
          afterImage="/obras/IMG-20260729-WA0064.jpg"
        />
        <ProcessTimeline />
        <PortfolioGallery />
        <ContactForm />
        <AboutSection />
        <Footer />
      </div>

      <FloatingInstagram />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
