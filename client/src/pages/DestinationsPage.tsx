import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { setSEOHead } from '@/components/SEOHead';

/**
 * DestinationsPage
 * Página de catálogo de destinos
 * Design: Minimalismo Contemporâneo
 */

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  category: 'praia' | 'montanha' | 'cidade' | 'aventura';
  rating: number;
  description: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Maldivas',
    country: 'Maldivas',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    category: 'praia',
    rating: 4.9,
    description: 'Paraíso tropical com praias de areia branca e águas cristalinas',
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonésia',
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=600&h=400&fit=crop',
    category: 'praia',
    rating: 4.8,
    description: 'Ilha exótica com templos, praias e cultura vibrante',
  },
  {
    id: '3',
    name: 'Alpes Suíços',
    country: 'Suíça',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
    category: 'montanha',
    rating: 4.7,
    description: 'Montanhas majestosas, trilhas e paisagens de tirar o fôlego',
  },
  {
    id: '4',
    name: 'Paris',
    country: 'França',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
    category: 'cidade',
    rating: 4.9,
    description: 'A cidade do amor com museus, arte e gastronomia de classe mundial',
  },
  {
    id: '5',
    name: 'Patagônia',
    country: 'Argentina',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'aventura',
    rating: 4.8,
    description: 'Paisagens selvagens, glaciares e trilhas de trekking épicas',
  },
  {
    id: '6',
    name: 'Tailândia',
    country: 'Tailândia',
    image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=600&h=400&fit=crop',
    category: 'praia',
    rating: 4.7,
    description: 'Praias paradisíacas, templos antigos e vida noturna vibrante',
  },
];

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'praia', label: 'Praia' },
  { id: 'montanha', label: 'Montanha' },
  { id: 'cidade', label: 'Cidade' },
  { id: 'aventura', label: 'Aventura' },
];

export default function DestinationsPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSEOHead({
      title: 'Destinos de Viagem | Dream Travel',
      description: 'Explore nossos destinos incriveis ao redor do mundo. Maldivas, Bali, Alpes Suicos, Paris e muito mais. Pacotes personalizados para cada tipo de viagem.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=630&fit=crop',
      url: 'https://dreamtravel.com.br/destinos',
    });
  }, []);

  const filtered = destinations.filter(
    (d) => selectedCategory === 'all' || d.category === selectedCategory
  );

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
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
            Nossos Destinos
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore os melhores destinos do mundo
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {filtered.map((dest) => (
                <motion.div
                  key={dest.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setLocation(`/destinos/${dest.id}`)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-foreground">{dest.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground font-serif">
                        {dest.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{dest.country}</span>
                    </div>

                    <p className="text-foreground/70 text-sm mb-4">
                      {dest.description}
                    </p>

              <div className="space-y-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation(`/destinos/${dest.id}`);
                  }}
                  className="w-full bg-secondary hover:bg-secondary/90 text-foreground"
                >
                  Ver Detalhes
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation('/contato');
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Montar Roteiro
                </Button>
              </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
