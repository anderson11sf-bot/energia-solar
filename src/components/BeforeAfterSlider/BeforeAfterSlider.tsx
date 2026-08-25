import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { ImageLoader } from '../ImageLoader/ImageLoader';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = './SITE/IMG-20260723-WA0033.jpg',
  afterImage = './OBRAS REAIS EM CAMPO/IMG-20260729-WA0064.jpg'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const clipPath = `${sliderPosition}%`;

  return (
    <section className={styles.sectionContainer} id="transformacao">
      <div className={styles.header}>
        <span className={styles.badge}>Eficiência Comprovada</span>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          Transformação <span className="text-gradient">Real de Performance</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.subtitle}
        >
          Deslize o cursor para comparar o impacto da lavagem técnica e engenharia de precisão na geração solar.
        </motion.p>
      </div>

      <div className={styles.sliderContainer}>
        {/* Imagem do Antes */}
        <div className={styles.imageWrapper}>
          <ImageLoader
            src={beforeImage}
            alt="Placas Solares com Poeira e Perda de Eficiência"
            className={styles.image}
            wrapperClassName={styles.imageWrapper}
            draggable={false}
          />
          <span className={styles.labelBefore}>Antes (Poeira & Perda de Até 30%)</span>
        </div>

        {/* Imagem do Depois (com ClipPath) */}
        <div className={styles.imageWrapperAfter} style={{ clipPath: `inset(0 0 0 ${clipPath})` }}>
          <ImageLoader
            src={afterImage}
            alt="Módulos Limpos e Geração de 100% de Potência"
            className={styles.image}
            wrapperClassName={styles.imageWrapperAfter}
            draggable={false}
          />
          <span className={styles.labelAfter}>Depois (100% de Geração Restaurada)</span>
        </div>

        {/* Input Invisível para Arrastar */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'ew-resize',
            zIndex: 30
          }}
          aria-label="Controle de Antes e Depois"
        />

        {/* Barra e Botão Divisor */}
        <div className={styles.sliderHandle} style={{ left: `${sliderPosition}%` }}>
          <div className={styles.handleLine}></div>
          <div className={styles.handleButton}>
            <ArrowLeftRight size={16} color="#050505" />
          </div>
        </div>
      </div>
    </section>
  );
};
