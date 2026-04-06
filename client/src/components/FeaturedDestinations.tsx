import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';

/**
 * Featured Destinations Section
 * Design: Minimalismo Contemporâneo
 * - Grid assimétrico elegante
 * - Cards com imagens imersivas
 * - Animações de entrada escalonadas
 */

const destinations = [
  {
    id: '1',
    name: 'Maldivas',
    description: 'Bungalôs sobre água em lagoas cristalinas com recifes de coral.',
    price: 8500,
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/destination-maldives-ipFi9vqv44aNq6YXDsczWz.webp',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Bali',
    description: 'Templos antigos, praias paradisíacas e resorts de luxo em meio à natureza.',
    price: 5200,
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/destination-bali-MHJqoM6xYez52SfzFpHvAt.webp',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Alpes Suíços',
    description: 'Montanhas nevadas, resorts de luxo e experiências de esqui exclusivas.',
    price: 9800,
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/destination-alps-mLjHD9tv5bgkGQoeYwTW3S.webp',
    rating: 4.8,
  },
];

export default function FeaturedDestinations() {
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

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="py-20 sm:py-32 bg-white"
      id="destinos"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4">Destinos Que Você Vai Amar 🌍</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desde praias paradisíacas até montanhas nevadas, cada destino é cuidadosamente
            selecionado. Deixe a Jackeline montar seu roteiro personalizado!
          </p>
        </motion.div>

        {/* Grid de Destinos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              {...destination}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <button className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-primary font-semibold rounded-lg transition-colors">
            Montar Meu Roteiro
          </button>
        </motion.div>
      </div>
    </section>
  );
}
