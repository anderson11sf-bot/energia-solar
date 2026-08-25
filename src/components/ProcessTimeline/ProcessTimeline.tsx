import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Cpu, Wrench, CheckCircle2 } from 'lucide-react';
import styles from './ProcessTimeline.module.css';

const steps = [
  {
    id: 1,
    title: 'Consultoria & Estudo de Viabilidade',
    desc: 'Análise minuciosa da sua fatura de energia, irradiação solar no local e cálculo exato da economia potencial.',
    icon: <FileText size={22} />
  },
  {
    id: 2,
    title: 'Engenharia & Homologação na Concessionária',
    desc: 'Elaboração do projeto executivo com ART e aprovação técnica ágil sem nenhuma burocracia para você.',
    icon: <Cpu size={22} />
  },
  {
    id: 3,
    title: 'Montagem Estrutural & Fixação Estanque',
    desc: 'Instalação rápida com perfis de alumínio, cabeamento com proteção UV e inversor de alta performance.',
    icon: <Wrench size={22} />
  },
  {
    id: 4,
    title: 'Conexão à Rede & Redução de até 95%',
    desc: 'Troca do medidor bidirecional pela concessionária, aplicativo de monitoramento ativo e conta de luz no valor mínimo.',
    icon: <CheckCircle2 size={22} />
  }
];

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className={styles.sectionContainer} ref={containerRef} id="processo">
      <div className={styles.header}>
        <span className={styles.badge}>Passo a Passo</span>
        <h2 className={styles.title}>Nosso <span className="text-gradient">Processo de Engenharia</span></h2>
        <p className={styles.subtitle}>Do diagnóstico inicial à entrega da sua usina solar gerando economia máxima.</p>
      </div>

      <div className={styles.timelineWrapper}>
        <div className={styles.lineBackground}></div>
        <motion.div className={styles.lineFill} style={{ height: lineHeight }}></motion.div>

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={styles.stepContainer}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className={styles.iconWrapper}>{step.icon}</div>
            <div className={styles.contentCard}>
              <div className={styles.stepNumber}>0{step.id}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
