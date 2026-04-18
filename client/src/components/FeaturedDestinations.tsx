import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const destinations = [
  {
    id: '1',
    name: 'Maldivas: O Refúgio dos Sonhos',
    description: 'Roteiro exclusivo com bangalôs sobre a água e experiências gastronômicas privativas.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    duration: '7 Noites',
    highlight: 'Destaque Premium',
    location: 'Maldivas',
    size: 'large' 
  },
  {
    id: '2',
    name: 'Safari na África do Sul',
    description: 'Aventura de luxo no Kruger Park com guias especializados.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    duration: '10 Noites',
    highlight: 'Mais Vendido',
    location: 'África do Sul',
    size: 'small'
  },
  {
    id: '3',
    name: 'Verão em Positano',
    description: 'O charme da Costa Amalfitana em hotéis boutique.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    duration: '5 Noites',
    highlight: 'Nova Curadoria',
    location: 'Itália',
    size: 'small'
  },
];

export default function FeaturedDestinations() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-32 bg-slate-50" id="destinos">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Experiências sob medida</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-slate-900">
              Roteiros que <span className="italic text-primary">inspiram</span>
            </h2>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/destinos')}
            className="group text-primary font-bold hover:bg-primary/5 text-lg rounded-full px-6"
          >
            Ver catálogo 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 min-h-[700px]">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              onClick={() => setLocation('/contato')}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15, // Delay em cascata da Skill
                ease: [0.21, 0.47, 0.32, 0.98] // Curva Bezier Premium
              }}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-700 ${
                dest.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2'
              }`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-bold px-4 py-1.5 rounded-full border border-white/20 tracking-widest">
                  {dest.duration}
                </span>
                <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {dest.highlight}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-white/70 text-xs mb-3 font-medium uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{dest.location}</span>
                </div>
                <h3 className={`font-bold font-serif leading-tight mb-4 ${dest.size === 'large' ? 'text-4xl' : 'text-2xl'}`}>
                  {dest.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6 line-clamp-2 max-w-md">
                  {dest.description}
                </p>
                <div className="flex items-center gap-3 text-primary font-bold text-sm tracking-widest overflow-hidden">
                  <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:origin-right after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-500">
                    Descobrir Roteiro
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}