import React from "react";
import { motion } from "framer-motion";
import styles from "./AboutSection.module.css";

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.sectionContainer} id="sobre">
      <div className={styles.inner}>

        {/* Coluna de Texto */}
        <motion.div
          className={styles.textCol}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>Quem Somos</span>
          <h2 className={styles.title}>
            Souza Rodrigues <span className="text-gradient">Engenharia Solar</span>
          </h2>

          <p className={styles.lead}>
            Ha mais de <strong>9 anos</strong>, a Souza Rodrigues Engenharia Solar transforma a relacao
            de residencias e empresas com a energia. Especializada em projetos fotovoltaicos sob medida,
            a empresa ja superou a marca de <strong>100 instalacoes concluidas</strong>, consolidando-se
            como uma referencia solida e confiavel no setor de energia solar.
          </p>

          <h3 className={styles.subTitle}>Nossa Trajetoria</h3>
          <p className={styles.text}>
            Fundada com o proposito de tornar a energia solar acessivel, eficiente e segura, a Souza Rodrigues
            Engenharia Solar construiu sua reputacao sobre tres pilares: excelencia tecnica, transparencia no
            relacionamento com o cliente e compromisso com resultados. Ao longo de quase uma decada de atuacao,
            a empresa acompanhou de perto a evolucao da tecnologia fotovoltaica no Brasil, atualizando
            constantemente seus processos, equipamentos e metodologias de projeto.
          </p>

          <h3 className={styles.subTitle}>O Que Nos Move</h3>
          <p className={styles.text}>
            Cada instalacao representa mais do que um sistema de geracao de energia - representa economia real,
            sustentabilidade e autonomia energetica para quem confia em nosso trabalho. Da primeira visita
            tecnica a ativacao final do sistema, cada etapa e conduzida com rigor de engenharia e atencao aos
            detalhes que fazem a diferenca no resultado final.
          </p>

          <h3 className={styles.subTitle}>Numeros que Contam Nossa Historia</h3>
          <ul className={styles.statsList}>
            <li><span className={styles.statIcon}>+</span>9 anos de experiencia no mercado de energia solar</li>
            <li><span className={styles.statIcon}>+</span>100 instalacoes residenciais e comerciais entregues</li>
            <li><span className={styles.statIcon}>*</span>Equipe tecnica em projeto, dimensionamento e execucao</li>
            <li><span className={styles.statIcon}>v</span>Compromisso com qualidade, seguranca e prazos</li>
          </ul>

          <div className={styles.buttonRow}>
            <a
              href="https://wa.me/5512991389694"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsApp}
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/grupo_souzarodrigues"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnInstagram}
            >
              Instagram
            </a>
          </div>
        </motion.div>

        {/* Coluna da Foto */}
        <motion.div
          className={styles.photoCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className={styles.photoFrame}>
            <img
              src="/foto-dono.jpg"
              alt="Fundador da Souza Rodrigues Engenharia Solar"
              className={styles.founderPhoto}
            />
            <div className={styles.photoOverlay}>
              <span className={styles.founderBadge}>Fundador e Engenheiro Responsavel</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>9+</span>
              <span className={styles.statLabel}>Anos no Mercado</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Instalacoes</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
