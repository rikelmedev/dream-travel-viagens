import { motion } from 'framer-motion';
import {
  Globe,
  Headphones,
  MapPin,
  Zap,
  Shield,
  Award,
} from 'lucide-react';

/**
 * Why Choose Us Section
 * Design: Minimalismo Contemporâneo
 * - Layout limpo com ícones e textos
 * - Grid responsivo
 * - Animações suaves de entrada
 */

const benefits = [
  {
    icon: Globe,
    title: 'Roteiros Exclusivos',
    description:
      'Experiências personalizadas criadas por especialistas locais com acesso a lugares únicos.',
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    description:
      'Equipe dedicada disponível a qualquer momento para resolver dúvidas e necessidades.',
  },
  {
    icon: MapPin,
    title: 'Especialistas Locais',
    description:
      'Guias experientes que conhecem cada destino em profundidade e compartilham histórias autênticas.',
  },
  {
    icon: Zap,
    title: 'Planejamento Rápido',
    description:
      'Processo simplificado para reservar sua viagem em poucos cliques com confirmação imediata.',
  },
  {
    icon: Shield,
    title: 'Garantia de Segurança',
    description:
      'Todos os parceiros verificados e segurados para garantir sua tranquilidade durante a viagem.',
  },
  {
    icon: Award,
    title: 'Prêmios e Reconhecimento',
    description:
      'Agência premiada por excelência em serviço e satisfação de clientes há mais de 10 anos.',
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-gray-50" id="diferenciais">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4">Por Que Escolher a Dream Travel? 🙋‍♀️</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A Jackeline e sua equipe transformam sonhos em viagens inesquecíveis.
            Cada detalhe é pensado para oferecer a melhor experiência.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}
