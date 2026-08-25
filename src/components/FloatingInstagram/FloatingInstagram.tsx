import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import styles from './FloatingInstagram.module.css';

export const FloatingInstagram: React.FC = () => {
  const handleClick = () => {
    window.open('https://www.instagram.com/grupo_souzarodrigues', '_blank');
  };

  return (
    <motion.div
      className={styles.instagramWrapper}
      drag
      dragConstraints={{ left: -window.innerWidth + 80, right: 0, top: -window.innerHeight + 80, bottom: 0 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      title="Siga no Instagram"
    >
      <div className={styles.iconContainer}>
        <Instagram size={24} color="#FFFFFF" strokeWidth={2} />
      </div>
      <div className={styles.ripple}></div>
    </motion.div>
  );
};
