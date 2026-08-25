import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    window.open(
      'https://wa.me/5512991389694?text=' +
        encodeURIComponent('Olá! Gostaria de tirar dúvidas sobre energia solar e solicitar um orçamento.'),
      '_blank'
    );
  };

  return (
    <motion.div
      className={styles.whatsappWrapper}
      drag
      dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 80, bottom: 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
      title="Falar no WhatsApp"
    >
      <div className={styles.iconContainer}>
        <MessageCircle size={30} color="#FFFFFF" strokeWidth={2.2} />
      </div>
      <div className={styles.ripple}></div>
    </motion.div>
  );
};
