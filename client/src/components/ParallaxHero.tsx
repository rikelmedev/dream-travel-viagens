import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { MapPin, Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/painel/button';

const IMAGES = [
  { src: '/images/maldivas.jpg',    label: 'Maldivas', scrollSpeed: 0.18, mx: -20, my: -12 },
  { src: '/images/capri.jpg',       label: 'Capri',    scrollSpeed: 0.30, mx: -10, my: -20 },
  { src: '/images/hero-luxury.jpg', label: '',         scrollSpeed: 0.22, mx:   0, my:  -6 },
  { src: '/images/zermatt.jpg',     label: 'Zermatt',  scrollSpeed: 0.35, mx:  10, my: -18 },
  { src: '/images/kyoto.jpg',       label: 'Kyoto',    scrollSpeed: 0.20, mx:  20, my: -10 },
];

interface ColProps {
  src: string;
  label: string;
  scrollSpeed: number;
  mx: number;
  my: number;
  index: number;
  scrollY: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

function ParallaxColumn({ src, label, scrollSpeed, mx, my, index, scrollY, springX, springY }: ColProps) {
  const scrollYT = useTransform(scrollY, [0, 800], [0, -800 * scrollSpeed]);
  const mouseXT = useTransform(springX, [-0.5, 0.5], [mx, -mx]);
  const mouseYT = useTransform(springY, [-0.5, 0.5], [my, -my]);

  return (
    // Wrapper externo: animacao de entrada (cortina subindo de baixo)
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{
        duration: 1.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex-1 h-full overflow-hidden"
    >
      {/* Inner: paralaxe continuo */}
      <motion.div
        style={{ y: scrollYT, x: mouseXT }}
        className="absolute inset-[-20%] w-[140%] h-[140%]"
      >
        <motion.img
          src={src}
          alt={label}
          style={{ y: mouseYT }}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.35em] text-white/50 whitespace-nowrap pointer-events-none"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

interface ParallaxHeroProps {
  formData: { destino: string; saida: string; volta?: string; hospedes: string };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ParallaxHero({ formData, onChange, onSubmit }: ParallaxHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 55, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 22 });

  // Titulo move ao contrario das colunas para dar ilusao de profundidade
  const titleX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const titleY = useTransform(springY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Grade de colunas com paralaxe independente */}
      <div className="absolute inset-0 flex gap-[2px]">
        {IMAGES.map((img, i) => (
          <ParallaxColumn
            key={img.src}
            {...img}
            index={i}
            scrollY={scrollY}
            springX={springX}
            springY={springY}
          />
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-black/35 to-black/65 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-transparent to-black/55 pointer-events-none" />

      {/* Conteudo central — move levemente com o mouse */}
      <motion.div
        style={{ x: titleX, y: titleY }}
        className="container relative z-20 px-4 md:px-6 flex flex-col items-center"
      >
        <div className="text-center max-w-4xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="flex items-center justify-center gap-3 text-[#C18D41] font-bold uppercase tracking-[0.5em] text-[10px] mb-6"
          >
            <div className="h-px w-8 bg-[#C18D41]/50" />
            <span>Curadoria Exclusiva</span>
            <div className="h-px w-8 bg-[#C18D41]/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-8 drop-shadow-2xl"
          >
            O Mundo, <br />
            <span className="italic font-light text-[#C18D41]">Desenhado Para Si.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.9 }}
            className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
          >
            Curadoria de experiências extraordinárias para viajantes exigentes.
          </motion.p>
        </div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl"
        >
          <form
            onSubmit={onSubmit}
            className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl lg:rounded-full p-3 flex flex-col lg:flex-row items-center gap-1 shadow-2xl"
          >
            <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all">
              <MapPin size={20} className="text-[#C18D41] shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Destino</label>
                <input required type="text" placeholder="Para onde?" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => onChange('destino', e.target.value)} value={formData.destino} />
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-white/10 mx-2 shrink-0" />

            <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all">
              <Calendar size={20} className="text-[#C18D41] shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Check-in</label>
                <input required type="text" placeholder="Data" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => onChange('saida', e.target.value)} value={formData.saida} />
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-white/10 mx-2 shrink-0" />

            <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all">
              <Users size={20} className="text-[#C18D41] shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Viajantes</label>
                <input type="text" placeholder="Quantos?" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => onChange('hospedes', e.target.value)} value={formData.hospedes} />
              </div>
            </div>

            <div className="w-full lg:w-auto p-1 shrink-0">
              <Button type="submit" className="w-full lg:w-auto h-16 px-10 rounded-2xl lg:rounded-full bg-[#C18D41] text-white hover:bg-[#A67632] hover:scale-105 transition-all font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center shadow-xl shadow-[#C18D41]/20 border border-white/10">
                Explorar
                <Search className="ml-3 w-4 h-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
