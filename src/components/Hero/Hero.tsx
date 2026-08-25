import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.stickyWrapper}>
        <motion.div style={{ y: yText, opacity: opacityText }}>
          
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Zap size={14} color="#38BDF8" />
            <span>Engenharia Fotovoltaica de Alta Performance</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforme a Luz do Sol em <span className="text-gradient">Economia Real</span> e Autonomia Energética
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Projetos de engenharia sob medida, homologação ágil e tecnologia fotovoltaica de precisão com até 95% de redução na conta de luz e 25 anos de garantia linear.
          </motion.p>

          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button className={styles.primaryButton} onClick={() => scrollTo('contato')}>
              <span>Solicitar Orçamento Gratuito</span>
              <ArrowRight size={18} />
            </button>
            <button className={styles.secondaryButton} onClick={() => scrollTo('portfolio')}>
              <ShieldCheck size={18} />
              <span>Ver Obras em Campo</span>
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};
