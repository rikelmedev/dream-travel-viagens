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
      image: '/client/public/images/jackeline-perfil.jpg',
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
              Meu nome é Jackeline, e a minha história começou com um sonho: conhecer o mundo. 
              Com o tempo, percebi que esse também é o sonho de muitas pessoas — mas que, muitas vezes, falta orientação, planejamento e segurança para torná-lo real.
              Foi por isso que criei a minha agência: para transformar sonhos em viagens bem planejadas, seguras e inesquecíveis.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/70 mb-4 leading-relaxed"
            >
              Aqui, cada detalhe é pensado para que você tenha a melhor experiência possível, sem preocupações. Do primeiro atendimento até o seu retorno, o meu compromisso é cuidar de tudo para que você apenas aproveite.
              Mais do que vender viagens, eu entrego tranquilidade, confiança e experiências que marcam a vida.
              Se você também sonha em conhecer o mundo, eu estou aqui para te ajudar a dar o primeiro passo
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
