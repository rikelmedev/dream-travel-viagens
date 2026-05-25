import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useLocation } from 'wouter';

const packages = [
  {
    id: '1',
    name: 'Lua de Mel Paradisíaca',
    description: 'Viva momentos inesquecíveis em um paraíso tropical com roteiros exclusivos, desenhados para celebrar o amor.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    duration: '7 dias',
    highlight: 'Destaque',
    location: 'Maldivas',
    size: 'large'
  },
  {
    id: '2',
    name: 'Aventura Exclusiva',
    description: 'Descubra a magia com conforto premium e acesso VIP.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
    duration: '10 dias',
    highlight: 'Premium',
    location: 'Orlando, EUA',
    size: 'small'
  },
  {
    id: '3',
    name: 'Retiro de Silêncio',
    description: 'Desconecte-se do mundo e recarregue energias na montanha.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    duration: '5 dias',
    highlight: 'Bem-estar',
    location: 'Serra Negra, BR',
    size: 'small'
  },
];

export default function FeaturedPackages() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-24 bg-[#05070a]" id="pacotes">
      <div className="container px-6 lg:px-12">
        {/* Header da Secção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-[#C18D41]" />
              <span className="text-[#C18D41] text-xs uppercase tracking-[0.3em] font-bold">
                Jornadas Completas
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-white">
              Roteiros que <br />
              <span className="italic font-light text-[#C18D41]">Contam Histórias</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/pacotes')}
              className="group text-[#C18D41] hover:text-[#A67632] hover:bg-white/5 p-0 text-sm font-bold tracking-widest uppercase gap-2 transition-all h-auto"
            >
              Ver catálogo completo 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setLocation('/contato')}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg ${
                pkg.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 md:row-span-1'
              }`}
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity" />
              
              {/* Badges Flutuantes */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-white/10">
                  {pkg.duration}
                </span>
                <span className="bg-[#C18D41] text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg shadow-[#C18D41]/20">
                  {pkg.highlight}
                </span>
              </div>

              {/* Conteúdo Inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-2 text-[#C18D41] text-[10px] uppercase tracking-widest font-bold mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{pkg.location}</span>
                </div>
                <h3 className={`font-serif mb-3 ${pkg.size === 'large' ? 'text-4xl' : 'text-2xl'}`}>
                  {pkg.name}
                </h3>
                <p className="text-white/60 text-sm font-light tracking-wide line-clamp-2 mb-6 max-w-md">
                  {pkg.description}
                </p>
                <div className="flex items-center gap-2 text-white/80 font-bold text-xs uppercase tracking-widest group-hover:text-[#C18D41] transition-colors">
                  <span>Explorar roteiro</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}