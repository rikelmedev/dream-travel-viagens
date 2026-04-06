import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * CTA Section
 * Design: Minimalismo Contemporâneo
 * - Background colorido com gradiente
 * - Chamada para ação clara
 * - Newsletter signup e consultor
 */

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="py-20 sm:py-32 bg-gradient-to-r from-primary/95 to-primary/85 relative overflow-hidden"
      id="cta-section"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-36 -mb-36" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Title */}
          <motion.h2
            className="text-white mb-4"
            variants={itemVariants}
          >
            Pronto para Sua Próxima Aventura?
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-white/90 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Deixe-nos ajudar você a planejar a viagem dos seus sonhos.
            Receba inspiração, dicas e ofertas exclusivas diretamente na sua caixa de entrada.
          </motion.p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-12 max-w-md mx-auto"
            variants={itemVariants}
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/95 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Email for newsletter"
              />
            </div>
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Inscrever
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.form>

          {/* Success Message */}
          {isSubmitted && (
            <motion.p
              className="text-white/90 text-sm mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ✓ Obrigado! Verifique seu email para confirmar a inscrição.
            </motion.p>
          )}

          {/* Divider */}
          <motion.div
            className="h-px bg-white/20 my-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.button
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Falar com Consultor
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Promoções
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
