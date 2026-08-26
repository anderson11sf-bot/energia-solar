import React from 'react';
import styles from './VSLSection.module.css';

export const VSLSection: React.FC = () => {
  return (
    <section className={styles.sectionContainer} id="vsl">
      <div className={styles.header}>
        <span className={styles.badge}>Apresentação Especial</span>
        <h2 className={styles.title}>Por que escolher o Grupo Souza Rodrigues?</h2>
      </div>

      <div className={styles.videoWrapper}>
        <video 
          className={styles.videoPlayer}
          controls
          autoPlay
          muted
          playsInline
          poster="/site/placa-suja.jpg" // fallback poster
        >
          {/* PLACEHOLDER: O caminho do vídeo será substituído assim que o usuário fornecer */}
          <source src="/videos/vsl-lara.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      </div>
    </section>
  );
};
