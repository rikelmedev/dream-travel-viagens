import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

/**
 * Destination Card Component
 * Design: Minimalismo Contemporâneo
 * - Imagem imersiva com overlay suave
 * - Zoom suave no hover
 * - Informações: nome, descrição, preço
 */

interface DestinationCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  delay?: number;
}

export default function DestinationCard({
  id,
  name,
  description,
  price,
  image,
  rating = 4.8,
  delay = 0,
}: DestinationCardProps) {
  return (
    <motion.div
      className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
        {/* Top - Rating */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>

        {/* Bottom - Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-sm text-white/80 mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center gap-1 text-sm text-white/70">
            <MapPin className="w-4 h-4" />
            <span>Experiência única</span>
          </div>
        </motion.div>
      </div>

      {/* Hover CTA */}
      <motion.div
        className="absolute inset-0 bg-primary/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.button
          className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explorar
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
