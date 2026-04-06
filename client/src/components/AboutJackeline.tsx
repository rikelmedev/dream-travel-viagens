import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

/**
 * About Jackeline Section
 * Design: Minimalismo Contemporâneo
 * - Apresentação pessoal da proprietária
 * - Espaços reservados para foto e vídeo
 * - Layout elegante e sofisticado
 */

export default function AboutJackeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-20 sm:py-32 bg-white" id="sobre-jackeline">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left: Media Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Foto Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 h-80 flex items-center justify-center border-2 border-border">
              <div className="text-center">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-muted-foreground font-medium">
                  Foto de Jackeline
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Adicione a foto aqui
                </p>
              </div>
            </div>

            {/* Vídeo Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 h-64 flex items-center justify-center border-2 border-border">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-muted-foreground font-medium">
                  Vídeo de Apresentação
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Adicione o vídeo aqui
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
              <Heart className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">
                Conheça a Proprietária
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-foreground">
              Jackeline
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Especialista em viagens personalizadas com mais de 10 anos de experiência.
              Jackeline transforma sonhos em roteiros inesquecíveis, combinando conhecimento
              profundo de destinos com atendimento personalizado e dedicado.
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Experiência Premium
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Mais de uma década criando experiências de viagem memoráveis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Atendimento Personalizado
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cada cliente recebe atenção especial e roteiros sob medida
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Paixão por Viagens
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicada a transformar cada viagem em uma história única
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              className="mt-8 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById('formulario-section')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Falar com Jackeline via WhatsApp
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
