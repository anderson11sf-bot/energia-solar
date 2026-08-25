import React from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Zap } from 'lucide-react';
import styles from './ContactForm.module.css';

export const ContactForm: React.FC = () => {
  const whatsappNumber = "5511999999999";

  const handleWhatsAppClick = () => {
    const defaultMsg = "Olá! Gostaria de solicitar um orçamento para o meu imóvel com a Souza Rodrigues Engenharia Solar.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome');
    const telefone = formData.get('telefone');
    const cidade = formData.get('cidade');
    const tipoImovel = formData.get('tipoImovel');
    const valorConta = formData.get('valorConta');

    const message = `Olá! Gostaria de um orçamento personalizado de Energia Solar.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Cidade:* ${cidade}\n*Tipo de Imóvel:* ${tipoImovel}\n*Valor Médio da Conta:* R$ ${valorConta}/mês`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className={styles.sectionContainer} id="contato">
      <div className={styles.container}>
        <motion.div
          className={styles.textColumn}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>Simulação & Dimensionamento</span>
          <h2 className={styles.title}>
            Pronto para economizar até <span className="text-gradient">95% na conta de luz?</span>
          </h2>
          <p className={styles.subtitle}>
            Preencha os dados do seu imóvel ou fale diretamente com a nossa equipe de engenheiros pelo WhatsApp para receber um estudo de viabilidade gratuito.
          </p>

          <button className={styles.whatsappBtn} onClick={handleWhatsAppClick}>
            <MessageCircle size={22} />
            <span>Falar com o Engenheiro no WhatsApp</span>
          </button>
        </motion.div>

        <motion.div
          className={styles.formColumn}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input name="nome" type="text" placeholder="Como prefere ser chamado?" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Telefone / WhatsApp</label>
              <input name="telefone" type="tel" placeholder="(00) 00000-0000" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Cidade e Estado</label>
              <input name="cidade" type="text" placeholder="Onde será instalada a usina?" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Tipo de Imóvel</label>
              <select name="tipoImovel" required defaultValue="">
                <option value="" disabled>Selecione...</option>
                <option value="Residencial">Residencial / Casa</option>
                <option value="Comercial">Comércio / Empresa</option>
                <option value="Industrial">Indústria / Galpão</option>
                <option value="Rural">Rural / Sítio ou Fazenda</option>
                <option value="Manutenção">Limpeza & Manutenção Preventiva</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Valor Médio da Sua Conta Atual (R$/mês)</label>
              <input name="valorConta" type="number" placeholder="Ex: 850" required min="100" />
            </div>

            <button type="submit" className={styles.submitBtn}>
              <Zap size={18} />
              <span>Receber Estudo de Viabilidade Gratuito</span>
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
