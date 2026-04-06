import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { setSEOHead } from '@/components/SEOHead';

/**
 * AboutPage
 * Página sobre a Dream Travel e Jackeline
 * Design: Minimalismo Contemporâneo
 */

export default function AboutPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: 'Sobre Dream Travel | Agencia de Viagens de Luxo',
      description: 'Conheca a historia da Dream Travel e de Jackeline. Mais de 15 anos de experiencia em viagens de luxo e experiencias autenticasao redor do mundo.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop',
      url: 'https://dreamtravel.com.br/sobre',
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
            Sobre a Dream Travel
          </h1>
          <p className="text-lg text-muted-foreground">
            Conheça nossa história e missão
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 px-4">
        <div className="container max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-foreground mb-6 font-serif"
            >
              Nossa História
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 mb-4 leading-relaxed"
            >
              A Dream Travel Viagens nasceu de uma paixão: transformar sonhos em realidade.
              Fundada por Jackeline, uma viajante apaixonada com mais de 15 anos de experiência
              no turismo, a agência surgiu com a missão de oferecer experiências de viagem
              autênticas e personalizadas.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 mb-4 leading-relaxed"
            >
              Cada viagem é uma oportunidade de criar memórias inesquecíveis. Por isso, nos
              dedicamos a entender os desejos de cada cliente e montar roteiros que vão além
              das expectativas, com atenção aos detalhes e suporte completo.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 leading-relaxed"
            >
              Hoje, somos referência em viagens de luxo e experiências autênticas, atendendo
              clientes em todo o Brasil e oferecendo destinos em mais de 50 países.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-4 bg-secondary/5">
        <div className="container">
          <motion.h2
            className="text-3xl font-bold text-foreground mb-12 text-center font-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nossos Valores
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Heart,
                title: 'Paixão',
                desc: 'Amamos o que fazemos e isso se reflete em cada detalhe',
              },
              {
                icon: Globe,
                title: 'Autenticidade',
                desc: 'Experiências genuínas que conectam você com o mundo',
              },
              {
                icon: Award,
                title: 'Excelência',
                desc: 'Padrão de qualidade em tudo que oferecemos',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-foreground/70">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Jackeline */}
      <section className="py-12 px-4">
        <div className="container max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-foreground mb-6 font-serif"
            >
              Conheça Jackeline
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="bg-secondary/5 rounded-lg p-8"
            >
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                Jackeline é uma viajante incansável com paixão genuína por descobrir novos
                destinos e conectar pessoas com experiências transformadoras. Com mais de
                15 anos de experiência em turismo de luxo, ela conhece pessoalmente cada
                destino que oferece.
              </p>

              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                Sua filosofia é simples: toda viagem deve ser uma jornada pessoal, não apenas
                um passeio. Por isso, ela se dedica a entender os desejos de cada cliente e
                criar roteiros que superem as expectativas.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed">
                Quando não está planejando viagens, você pode encontrá-la explorando novos
                destinos, fotografando paisagens incríveis ou compartilhando dicas de viagem
                em seu blog.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-primary text-white">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: '1000+', label: 'Clientes Satisfeitos' },
              { number: '50+', label: 'Destinos' },
              { number: '15+', label: 'Anos de Experiência' },
              { number: '24/7', label: 'Suporte' },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
            Pronto para Sua Próxima Aventura?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Entre em contato com Jackeline e comece a planejar sua viagem dos sonhos
          </p>
          <Button
            onClick={() => setLocation('/contato')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Fale Conosco
          </Button>
        </div>
      </section>
    </div>
  );
}
