import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DESTINATIONS = [
  {
    id: 'maldivas',
    title: 'Atol de Baa',
    country: 'Maldivas',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-1 md:col-span-2 md:row-span-2', 
    height: 'h-[400px] md:h-[620px]',
  },
  {
    id: 'capri',
    title: 'Ilha de Capri',
    country: 'Itália',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 md:col-span-2 md:row-span-1', 
    height: 'h-[300px]',
  },
  {
    id: 'zermatt',
    title: 'Zermatt',
    country: 'Suíça',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    span: 'col-span-1 md:col-span-1 md:row-span-1', 
    height: 'h-[300px]',
  },
  {
    id: 'kyoto',
    title: 'Quioto',
    country: 'Japão',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    span: 'col-span-1 md:col-span-1 md:row-span-1', 
    height: 'h-[300px]',
  }
];

export default function FeaturedDestinations() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              <Sparkles className="w-4 h-4 fill-primary" />
              <span>O Mundo ao Seu Alcance</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-foreground leading-[1.1]">
              A Nossa Coleção de <br />
              <span className="italic font-light text-foreground/70">Destinos Ímpares</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="outline" 
              onClick={() => setLocation('/destinos')}
              className="rounded-full h-14 px-8 border-border/60 hover:bg-foreground hover:text-background transition-all uppercase tracking-widest text-xs font-bold group"
            >
              Explorar Portfolio
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* GRELHA BENTO BOX EDITORIAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {DESTINATIONS.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => setLocation(`/destinos/${dest.id}`)}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ${dest.span} ${dest.height}`}
            >
              {/* Imagem com zoom suave no Hover */}
              <img 
                src={dest.image} 
                alt={dest.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Conteúdo de Texto */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    <p className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-bold">
                      {dest.country}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-none">
                      {dest.title}
                    </h3>
                    
                    {/* Botão */}
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 -translate-x-4 group-hover:translate-x-0">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}