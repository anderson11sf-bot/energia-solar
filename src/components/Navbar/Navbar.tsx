import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.brand} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo/logo-emblem.png" alt="Souza Rodrigues" className={styles.logoImage} />
          <span className={styles.brandText}>SOUZA RODRIGUES</span>
        </div>

        <nav className={styles.navLinks}>
          <a className={styles.navLink} onClick={() => scrollToSection('especialidades')}>Especialidades</a>
          <a className={styles.navLink} onClick={() => scrollToSection('transformacao')}>Antes e Depois</a>
          <a className={styles.navLink} onClick={() => scrollToSection('processo')}>Processo</a>
          <a className={styles.navLink} onClick={() => scrollToSection('portfolio')}>Obras em Campo</a>
          <a className={styles.navLink} onClick={() => scrollToSection('contato')}>Simulação</a>
        </nav>

        <button className={styles.ctaBtn} onClick={() => scrollToSection('contato')}>
          <Sparkles size={16} />
          <span>Orçamento Rápido</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
};
