import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * Testimonials Section
 * Design: Minimalismo Contemporâneo
 * - Cards de depoimentos com foto, nome e avaliação
 * - Layout responsivo
 * - Animações de entrada
 */

const testimonials = [
  {
    id: '1',
    name: 'Marina Silva',
    location: 'São Paulo, Brasil',
    text: 'A viagem para as Maldivas foi absolutamente perfeita. Cada detalhe foi pensado com cuidado. Recomendo fortemente!',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    location: 'Rio de Janeiro, Brasil',
    text: 'O suporte 24/7 foi essencial quando precisei mudar meus planos. Profissionais incríveis e atenciosos.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  },
  {
    id: '3',
    name: 'Ana Costa',
    location: 'Belo Horizonte, Brasil',
    text: 'Bali superou minhas expectativas. Os especialistas locais nos levaram a lugares que nunca encontraria sozinha.',
    rating: 5,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  },
];

export default function Testimonials() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
    <section className="py-20 sm:py-32 bg-white" id="testimonios">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de viajantes que confiaram em nós para criar
            memórias inesquecíveis.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="p-8 bg-gray-50 rounded-lg border border-border hover:border-primary/30 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-border"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
