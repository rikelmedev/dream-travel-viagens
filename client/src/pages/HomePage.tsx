import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';

/**
 * HomePage
 * Página inicial do site institucional
 * Design: Minimalismo Contemporâneo
 */

export default function HomePage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: 'Agência de Viagens de Luxo | Dream Travel',
      description: 'Descubra destinos incríveis e crie memórias inesquecíveis com a Dream Travel. Pacotes de viagem personalizados, roteiros exclusivos e suporte 24h.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop',
      url: 'https://dreamtravel.com.br',
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
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center py-20 px-4"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif"
          >
            Transforme Seus Sonhos em Viagens Reais
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Descubra destinos incríveis e crie memórias inesquecíveis com a Dream Travel
          </motion.p>

          {/* Search Widget */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Destino
                </label>
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <input
                    type="text"
                    placeholder="Para onde?"
                    className="flex-1 outline-none text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Data
                </label>
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <input
                    type="date"
                    className="flex-1 outline-none text-foreground"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pessoas
                </label>
                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                  <Users className="w-4 h-4 text-primary" />
                  <select className="flex-1 outline-none text-foreground bg-white">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  onClick={() => setLocation('/destinos')}
                  className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={() => setLocation('/contato')}
              className="w-full bg-accent text-foreground hover:bg-accent/90 font-semibold"
            >
              Falar com um Consultor ✈️
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">
              Destinos em Destaque
            </h2>
            <p className="text-lg text-muted-foreground">
              Conheça alguns dos nossos destinos mais procurados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Maldivas', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop' },
              { name: 'Bali', image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=600&h=400&fit=crop' },
              { name: 'Alpes Suíços', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop' },
            ].map((dest, idx) => (
              <motion.div
                key={idx}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setLocation('/destinos')}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white font-serif">
                    {dest.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => setLocation('/destinos')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Ver Todos os Destinos
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">
              Por Que Escolher a Dream Travel?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Roteiros Exclusivos', desc: 'Experiências únicas personalizadas' },
              { title: 'Suporte 24h', desc: 'Sempre disponível para você' },
              { title: 'Especialistas Locais', desc: 'Conhecimento profundo de cada destino' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                variants={itemVariants}
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Pronto para Sua Próxima Aventura?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato com nossos consultores e comece a planejar sua viagem dos sonhos
          </p>
          <Button
            onClick={() => setLocation('/contato')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
          >
            Fale Conosco Agora
          </Button>
        </div>
      </section>
    </Layout>
  );
}
