import React, { useState } from 'react';
import { Sun, Battery, Zap, PenTool, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './KitsFotovoltaicos.module.css';

const kits = [
  { 
    id: 1, 
    maxConsumo: 280, 
    title: "Até 280 kWh", 
    priceApprox: "~R$280/mês",
    panels: 4, 
    inverter: "1 microinversor", 
    cable: "15m", 
    structure: "1 kit", 
    homologation: "1" 
  },
  { 
    id: 2, 
    maxConsumo: 500, 
    title: "Até 500 kWh", 
    priceApprox: "~R$500/mês",
    panels: 8, 
    inverter: "1 inversora 4k", 
    cable: "30m", 
    structure: "2 kits", 
    homologation: "1" 
  },
  { 
    id: 3, 
    maxConsumo: 800, 
    title: "Até 800 kWh", 
    priceApprox: "~R$800/mês",
    panels: 14, 
    inverter: "1 inversora 6.6k", 
    cable: "50m", 
    structure: "4 kits", 
    homologation: "1" 
  },
  { 
    id: 4, 
    maxConsumo: 1000, 
    title: "Até 1000 kWh", 
    priceApprox: "~R$1000/mês",
    panels: 16, 
    inverter: "1 inversora 7.5k", 
    cable: "50m", 
    structure: "5 kits", 
    homologation: "1" 
  }
];

export const KitsFotovoltaicos: React.FC = () => {
  const [consumo, setConsumo] = useState<number>(300);

  const getActiveKitId = (val: number) => {
    if (val <= 280) return 1;
    if (val <= 500) return 2;
    if (val <= 800) return 3;
    return 4;
  };

  const activeKitId = getActiveKitId(consumo);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsumo(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      setConsumo(val);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.sectionContainer} id="kits">
      <div className={styles.header}>
        <span className={styles.badge}>Kits Sugeridos</span>
        <h2 className={styles.title}>Encontre o Kit Ideal</h2>
        <p className={styles.subtitle}>
          Selecione o seu consumo médio mensal para visualizar a configuração recomendada de equipamentos.
        </p>
      </div>

      <div className={styles.interactiveArea}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderHeader}>
            <label htmlFor="consumo-slider">Qual é o seu consumo mensal?</label>
            <div className={styles.inputWrap}>
              <input 
                type="number" 
                value={consumo} 
                onChange={handleInputChange}
                className={styles.consumoInput}
              />
              <span>kWh</span>
            </div>
          </div>
          <input 
            id="consumo-slider"
            type="range" 
            min="100" 
            max="1200" 
            step="10"
            value={consumo} 
            onChange={handleSliderChange}
            className={styles.slider}
          />
          <div className={styles.sliderMarks}>
            <span>100 kWh</span>
            <span>1200+ kWh</span>
          </div>
        </div>
      </div>

      <div className={styles.kitsGrid}>
        {kits.map((kit) => (
          <div 
            key={kit.id} 
            className={`${styles.kitCard} ${kit.id === activeKitId ? styles.activeCard : ''}`}
            onClick={() => setConsumo(kit.maxConsumo - 10)} // clicking a card snaps the slider loosely
          >
            {kit.id === activeKitId && <div className={styles.activeLabel}>Kit Recomendado</div>}
            
            <div className={styles.kitHeader}>
              <h3>{kit.title}</h3>
              <p>{kit.priceApprox}</p>
            </div>
            
            <div className={styles.kitBody}>
              <div className={styles.kitItem}>
                <Sun className={styles.kitIcon} size={18} />
                <span><strong>{kit.panels}</strong> Placas Solares</span>
              </div>
              <div className={styles.kitItem}>
                <Battery className={styles.kitIcon} size={18} />
                <span>{kit.inverter}</span>
              </div>
              <div className={styles.kitItem}>
                <Zap className={styles.kitIcon} size={18} />
                <span>Cabo DC: {kit.cable}</span>
              </div>
              <div className={styles.kitItem}>
                <PenTool className={styles.kitIcon} size={18} />
                <span>Estrutura: {kit.structure}</span>
              </div>
              <div className={styles.kitItem}>
                <CheckCircle className={styles.kitIcon} size={18} />
                <span>Homologação: {kit.homologation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerInfo}>
        <p>Valores sujeitos a avaliação técnica. Fale com a gente para fechar seu orçamento.</p>
        <button className={styles.ctaBtn} onClick={scrollToContact}>
          <span>Falar no WhatsApp</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};
