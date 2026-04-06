import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * DestinationPopup Component
 * Design: Minimalismo Contemporâneo
 * - Pop-up elegante com informações detalhadas
 * - Animações suaves
 * - Integração com formulário
 */

export interface DestinationInfo {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  activities: string[];
  bestSeason: string;
  climate: string;
  highlights: string[];
}

interface DestinationPopupProps {
  destination: DestinationInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (name: string) => void;
}

export default function DestinationPopup({
  destination,
  isOpen,
  onClose,
  onSelectDestination,
}: DestinationPopupProps) {
  if (!destination) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            >
              {/* Header com Imagem */}
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {destination.name}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    {destination.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <motion.div
                className="p-6 sm:p-8"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Full Description */}
                <motion.p
                  className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-8"
                  variants={itemVariants}
                >
                  {destination.fullDescription}
                </motion.p>

                {/* Info Grid */}
                <motion.div
                  className="grid grid-cols-2 gap-4 mb-8"
                  variants={itemVariants}
                >
                  {/* Best Season */}
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground text-sm">
                        Melhor Época
                      </span>
                    </div>
                    <p className="text-foreground/70 text-sm">{destination.bestSeason}</p>
                  </div>

                  {/* Climate */}
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground text-sm">Clima</span>
                    </div>
                    <p className="text-foreground/70 text-sm">{destination.climate}</p>
                  </div>
                </motion.div>

                {/* Highlights */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Destaques
                  </h3>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-foreground/80"
                        variants={itemVariants}
                      >
                        <span className="text-primary font-bold mt-1">•</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Activities */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <h3 className="text-lg font-bold text-foreground mb-4">Atividades</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, index) => (
                      <motion.span
                        key={index}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                        variants={itemVariants}
                      >
                        {activity}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex gap-4 pt-6 border-t border-border"
                  variants={itemVariants}
                >
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => {
                      onSelectDestination(destination.name);
                      onClose();
                    }}
                  >
                    Montar Roteiro ✈️
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
