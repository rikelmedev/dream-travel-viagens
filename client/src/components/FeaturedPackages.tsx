import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const packages = [
  {
    id: '1',
    name: 'Lua de Mel Paradisíaca',
    description: 'Viva momentos inesquecíveis em um paraíso tropical com roteiros exclusivos.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    duration: '7 dias',
    highlight: 'Destaque do Mês',
    location: 'Maldivas',
    size: 'large'
  },
  {
    id: '2',
    name: 'Aventura em Família',
    description: 'Experiências incríveis para todas as idades.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
    duration: '10 dias',
    highlight: 'Mais Vendido',
    location: 'Orlando, EUA',
    size: 'small'
  },
  {
    id: '3',
    name: 'Retiro de Relaxo',
    description: 'Desconecte e recarregue energias.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    duration: '5 dias',
    highlight: 'Oferta',
    location: 'Serra Negra, BR',
    size: 'small'
  },
];

export default function FeaturedPackages() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-24 bg-white" id="pacotes">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Curadoria Dream Travel</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
              Roteiros que contam histórias
            </h2>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/pacotes')}
            className="group text-primary font-bold hover:bg-primary/5"
          >
            Ver catálogo completo 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px]">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              onClick={() => setLocation('/contato')}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                pkg.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2'
              }`}
              whileHover={{ y: -5 }}
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                  {pkg.duration}
                </span>
                <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {pkg.highlight}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{pkg.location}</span>
                </div>
                <h3 className={`font-bold font-serif mb-2 ${pkg.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                  {pkg.name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all">
                  <span>Explorar roteiro</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}