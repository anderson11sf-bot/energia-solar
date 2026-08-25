import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          {/* Marca e Logo Massiva */}
          <div className={styles.brandCol}>
            <div className={styles.logoWrap}>
              <img src="/logo/logo-emblem.png" alt="Grupo Souza Rodrigues" className={styles.logoImg} />
              <div className={styles.brandNameFull}>
                <span className={styles.brandTitle}>GRUPO SOUZA RODRIGUES</span>
                <span className={styles.brandSubtitle}>Engenharia Solar</span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Empresa especializada em engenharia, dimensionamento, venda, instalação, homologação e manutenção preventiva de sistemas de energia solar fotovoltaica.
            </p>
          </div>

          <div>
            <h4 className={styles.colTitle}>Navegação Rápida</h4>
            <ul className={styles.linksList}>
              <li><a className={styles.link} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Início</a></li>
              <li><a className={styles.link} onClick={() => scrollTo('especialidades')}>Especialidades</a></li>
              <li><a className={styles.link} onClick={() => scrollTo('transformacao')}>Antes e Depois</a></li>
              <li><a className={styles.link} onClick={() => scrollTo('processo')}>Nosso Processo</a></li>
              <li><a className={styles.link} onClick={() => scrollTo('portfolio')}>Obras em Campo</a></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Atendimento & Compliance</h4>
            <ul className={styles.linksList}>
              <li>
                <a
                  className={styles.link}
                  href="https://wa.me/5512991389694?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20atendimento%20da%20Souza%20Rodrigues."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: (12) 99138-9694
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href="https://www.instagram.com/gruposouzarodrigues/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram Oficial
                </a>
              </li>
              <li><span className={styles.link}>Atendimento em todo o território nacional</span></li>
            </ul>
          </div>
        </div>

        {/* Compliance Box */}
        <div className={styles.complianceBox}>
          <p>
            <strong>Aviso de Compliance & Isenção de Responsabilidade:</strong> As estimativas de economia apresentadas neste site baseiam-se em médias de irradiação solar e tarifas vigentes, podendo variar conforme localização geográfica, ângulo de inclinação do telhado, sombreamento e padrão de consumo. O Grupo Souza Rodrigues Engenharia Solar atua em estrita conformidade com as Resoluções Normativas nº 482/2012 e nº 1.000/2021 da ANEEL e com a Lei Geral de Proteção de Dados (LGPD nº 13.709/2018).
          </p>
        </div>

        <div className={styles.bottomBar}>
          <span>&copy; {new Date().getFullYear()} Grupo Souza Rodrigues Engenharia Solar. Todos os direitos reservados.</span>
          <span>Engenharia Solar & Dark Glassmorphism Premium.</span>
        </div>
      </div>
    </footer>
  );
};
