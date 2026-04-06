import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero Section Component
 * Design: Minimalismo Contemporâneo
 * - Background de imagem imersiva
 * - Título impactante com subtítulo
 * - Widget de busca/filtro centralizado
 * - Animações suaves de entrada
 */
export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    people: '2',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchData);
    // TODO: Implementar lógica de busca
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20"
      id="hero"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/hero-tropical-luxury-MPuqr4WrBthDP8yQC4U9Qn.webp)',
        }}
      >
        {/* Overlay gradiente suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Título Principal */}
        <motion.h1
          className="text-white font-bold mb-4 drop-shadow-lg"
          variants={itemVariants}
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          Transforme Seus Sonhos em Viagens Reais ✈️
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md font-light"
          variants={itemVariants}
        >
          Com a Dream Travel, cada viagem é personalizada. Roteiros exclusivos,
          atendimento 24/7 e especialistas locais prontos para criar sua experiência perfeita.
        </motion.p>

        {/* Search Widget */}
        <motion.form
          onSubmit={handleSearch}
          className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Destination Input */}
            <div className="flex items-center gap-3 border-b-2 border-border pb-3 sm:border-b-0 sm:border-r-2">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder="Destino"
                value={searchData.destination}
                onChange={(e) =>
                  setSearchData({ ...searchData, destination: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm"
                aria-label="Destination"
              />
            </div>

            {/* Date Input */}
            <div className="flex items-center gap-3 border-b-2 border-border pb-3 sm:border-b-0 sm:border-r-2">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <input
                type="date"
                value={searchData.date}
                onChange={(e) =>
                  setSearchData({ ...searchData, date: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm"
                aria-label="Date"
              />
            </div>

            {/* People Count */}
            <div className="flex items-center gap-3 border-b-2 border-border pb-3 sm:border-b-0">
              <Users className="w-5 h-5 text-primary flex-shrink-0" />
              <select
                value={searchData.people}
                onChange={(e) =>
                  setSearchData({ ...searchData, people: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-foreground text-sm"
                aria-label="Number of people"
              >
                <option value="1">1 pessoa</option>
                <option value="2">2 pessoas</option>
                <option value="3">3 pessoas</option>
                <option value="4">4 pessoas</option>
                <option value="5+">5+ pessoas</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Montar Meu Roteiro
            </Button>
          </motion.div>
        </motion.form>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-xs font-medium">Deslize para explorar</span>
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
