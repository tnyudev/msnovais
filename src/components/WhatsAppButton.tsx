import { MessageCircle } from 'lucide-react';
import { content } from '@/config/content';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const { contact } = content;

  return (
    <motion.a
      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
      aria-label="Entrar em contato via WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          boxShadow: ["0 0 0 0 rgba(37, 211, 102, 0.7)", "0 0 0 20px rgba(37, 211, 102, 0)"]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
        className="absolute inset-0 rounded-full"
        aria-hidden="true"
      />
      <MessageCircle size={32} className="relative z-10" aria-hidden="true" />
    </motion.a>
  );
};

export default WhatsAppButton;
