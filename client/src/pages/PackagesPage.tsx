import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useLocation } from 'wouter';
import { setSEOHead } from '@/components/SEOHead';

 * PackagesPage
 * Página de pacotes de viagem pré-montados
 * Design: Minimalismo Contemporâneo
 */

interface Package {
  id: string;
  name: string;
  destination: string;
  duration: number;
  people: number;
  image: string;
  description: string;
  highlights: string[];
  category: 'lua-de-mel' | 'familia' | 'aventura' | 'relaxo';
}

const packages: Package[] = [
  {
    id: '1',
    name: 'Lua de Mel Maldivas',
    destination: 'Maldivas',
    duration: 7,
    people: 2,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    description: 'Pacote romântico em resort 5 estrelas com atividades exclusivas',
    highlights: ['Resort Luxuoso', 'Mergulho em Coral', 'Jantar na Praia', 'Spa Couples'],
    category: 'lua-de-mel',
  },
  {
    id: '2',
    name: 'Família em Bali',
    destination: 'Bali, Indonésia',
    duration: 10,
    people: 4,
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=600&h=400&fit=crop',
    description: 'Aventura familiar com praias, templos e atividades para crianças',
    highlights: ['Templos Antigos', 'Praias Paradisíacas', 'Parques Aquáticos', 'Passeios Culturais'],
    category: 'familia',
  },
  {
    id: '3',
    name: 'Trekking Patagônia',
    destination: 'Patagônia, Argentina',
    duration: 8,
    people: 6,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    description: 'Expedição de trekking com guias especializados e hospedagem premium',
    highlights: ['Glaciares', 'Trilhas Épicas', 'Paisagens Selvagens', 'Acampamento Luxo'],
    category: 'aventura',
  },
  {
    id: '4',
    name: 'Relaxo Tailândia',
    destination: 'Tailândia',
    duration: 6,
    people: 2,
    image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=600&h=400&fit=crop',
    description: 'Retiro de bem-estar com spas, praias e meditação',
    highlights: ['Spas Tailandeses', 'Praias Privadas', 'Yoga Matinal', 'Gastronomia Local'],
    category: 'relaxo',
  },
];

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'lua-de-mel', label: 'Lua de Mel' },
  { id: 'familia', label: 'Família' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'relaxo', label: 'Relaxo' },
];

export default function PackagesPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: 'Pacotes de Viagem | Dream Travel',
      description: 'Escolha entre nossos pacotes de viagem premontados ou customize o seu. Lua de mel, familia, aventura e relaxo. Tudo incluido com Dream Travel.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=630&fit=crop',
      url: 'https://dreamtravel.com.br/pacotes',
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
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
            Pacotes de Viagem
          </h1>
          <p className="text-lg text-muted-foreground">
            Escolha entre nossos pacotes pré-montados ou customize o seu
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 px-4">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.category.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 font-serif">
                    {pkg.name}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    {pkg.description}
                  </p>

                  {/* Info */}
                  <div className="flex gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{pkg.duration} dias</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Até {pkg.people} pessoas</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="font-semibold text-foreground mb-2">Inclui:</p>
                    <ul className="space-y-1">
                      {pkg.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-foreground/70"
                        >
                          <Check className="w-4 h-4 text-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => setLocation('/contato')}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Solicitar Orçamento
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-secondary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
            Não encontrou o pacote ideal?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Customize seu próprio pacote com nossos consultores
          </p>
          <Button
            onClick={() => setLocation('/contato')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Falar com Consultor
          </Button>
        </div>
      </section>
    </div>
  );
}
