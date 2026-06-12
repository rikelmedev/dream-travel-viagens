import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/painel/button';

const IMAGES = [
  { src: '/images/maldivas.jpg',     label: 'Maldivas', speed: 0.15 },
  { src: '/images/capri.jpg',        label: 'Capri',    speed: 0.25 },
  { src: '/images/hero-luxury.jpg',  label: '',         speed: 0.2  },
  { src: '/images/zermatt.jpg',      label: 'Zermatt',  speed: 0.3  },
  { src: '/images/kyoto.jpg',        label: 'Kyoto',    speed: 0.18 },
];

interface ParallaxHeroProps {
  formData: { destino: string; saida: string; volta?: string; hospedes: string };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function ParallaxColumn({ src, label, speed, index }: { src: string; label: string; speed: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -600 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative flex-1 h-full overflow-hidden"
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover scale-125"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.3em] text-white/60 whitespace-nowrap"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

export default function ParallaxHero({ formData, onChange, onSubmit }: ParallaxHeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">

      {/* Grade de colunas com paralaxe independente */}
      <div className="absolute inset-0 flex gap-[2px]">
        {IMAGES.map((img, i) => (
          <ParallaxColumn key={img.label} {...img} index={i} />
        ))}
      </div>

      {/* Overlay escuro central para legibilidade do texto */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      {/* Vignette lateral */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* Conteudo central */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-[#C18D41] font-bold uppercase tracking-[0.5em] text-[10px] mb-6"
          >
            <div className="h-px w-8 bg-[#C18D41]/50" />
            <span>Curadoria Exclusiva</span>
            <div className="h-px w-8 bg-[#C18D41]/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-8 drop-shadow-2xl"
          >
            O Mundo, <br />
            <span className="italic font-light text-[#C18D41]">Desenhado Para Si.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
          >
            Curadoria de experiências extraordinárias para viajantes exigentes.
          </motion.p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          <form
            onSubmit={onSubmit}
            className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl lg:rounded-full p-3 flex flex-col lg:flex-row items-center gap-1 shadow-2xl"
          >
            <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all">
              <MapPin size={20} className="text-[#C18D41]" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Destino</label>
                <input required type="text" placeholder="Para onde?" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => onChange('destino', e.target.value)} value={formData.destino} />
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-white/10 mx-2" />

            <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all">
              <Calendar size={20} className="text-[#C18D41]" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Check-in</label>
                <input required type="text" placeholder="Data" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => onChange('saida', e.target.value)} value={formData.saida} />
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-white/10 mx-2" />

            <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all">
              <Users size={20} className="text-[#C18D41]" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Viajantes</label>
                <input type="text" placeholder="Quantos?" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => onChange('hospedes', e.target.value)} value={formData.hospedes} />
              </div>
            </div>

            <div className="w-full lg:w-auto p-1">
              <Button type="submit" className="w-full lg:w-auto h-16 px-10 rounded-2xl lg:rounded-full bg-[#C18D41] text-white hover:bg-[#A67632] hover:scale-105 transition-all font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center shadow-xl shadow-[#C18D41]/20 border border-white/10">
                Explorar
                <Search className="ml-3 w-4 h-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
