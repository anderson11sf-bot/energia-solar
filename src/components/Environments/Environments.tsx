import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './Environments.module.css';

const categories = [
  {
    id: 'residencial',
    label: 'Residencial & Condomínios',
    image: '/site/IMG-20260407-WA0053.jpg',
    desc: 'Projetos sob medida para residências com até 95% de economia imediata na conta de luz e valorização patrimonial.'
  },
  {
    id: 'comercial',
    label: 'Comércio & Empresas',
    image: '/obras/IMG-20260729-WA0064.jpg',
    desc: 'Redução drástica no custo operacional fixo de empresas, comércios e galpões com retorno financeiro acelerado.'
  },
  {
    id: 'industrial',
    label: 'Industrial & Média Tensão',
    image: '/site/IMG-20260721-WA0059.jpg',
    desc: 'Engenharia de alta complexidade, cubículos de proteção, transformadores e usinas de alta performance.'
  },
  {
    id: 'rural',
    label: 'Usinas Rurais & Agro',
    image: '/obras/IMG-20241219-WA0031.jpg',
    desc: 'Energia limpa para irrigação, ordenha, galpões e pivôs centrais com linhas especiais de financiamento agro.'
  },
  {
    id: 'manutencao',
    label: 'Limpeza & Manutenção Preventiva',
    image: '/site/IMG-20260723-WA0033.jpg',
    desc: 'Higienização técnica com água tratada e revisão elétrica para recuperar até 30% da potência perdida por sujeira.'
  }
];

export const Environments: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (sidebarRef.current && activeTabRef.current) {
      const sidebar = sidebarRef.current;
      const tab = activeTabRef.current;
      sidebar.scrollTo({
        left: tab.offsetLeft - sidebar.offsetWidth / 2 + tab.offsetWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  const activeCategory = categories.find(c => c.id === activeTab)!;

  const handleDragEnd = (_e: any, { offset }: PanInfo) => {
    const swipe = offset.x;
    if (swipe < -50) {
      const currentIndex = categories.findIndex(c => c.id === activeTab);
      setActiveTab(categories[(currentIndex + 1) % categories.length].id);
    } else if (swipe > 50) {
      const currentIndex = categories.findIndex(c => c.id === activeTab);
      setActiveTab(categories[currentIndex === 0 ? categories.length - 1 : currentIndex - 1].id);
    }
  };

  return (
    <section className={styles.container} id="especialidades">
      <div className={styles.header}>
        <span className={styles.badge}>Engenharia & Soluções</span>
        <h2 className={styles.title}>Nossas <span className="text-gradient">Especialidades</span></h2>
        <p className={styles.subtitle}>Soluções fotovoltaicas completas do projeto à homologação e manutenção preventiva.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar} ref={sidebarRef}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              ref={activeTab === cat.id ? activeTabRef : null}
              className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className={styles.activeIndicator}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.displayArea}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className={styles.imageWrapper}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <ImageLoader
                src={activeCategory.image}
                alt={activeCategory.label}
                className={styles.image}
                wrapperClassName={styles.imageWrapper}
                style={{ objectFit: 'contain' }}
              />
              <div className={styles.imageOverlay}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className={styles.cardInfo}
                >
                  <h3>{activeCategory.label}</h3>
                  <p>{activeCategory.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
