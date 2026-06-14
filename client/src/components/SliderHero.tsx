import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

const DESTINATIONS = [
  {
    src: '/images/maldivas.jpg',
    country: 'Oceano Índico',
    name: 'MALDIVAS',
    desc: 'Paraíso de águas cristalinas e bangalôs suspensos sobre o recife de coral.',
  },
  {
    src: '/images/capri.jpg',
    country: 'Itália',
    name: 'CAPRI',
    desc: 'A ilha do sol, do glamour mediterrâneo e da lendária Gruta Azul.',
  },
  {
    src: '/images/zermatt.jpg',
    country: 'Suíça',
    name: 'ZERMATT',
    desc: 'Às sombras do Matterhorn, um refúgio alpino de elegância atemporal.',
  },
  {
    src: '/images/kyoto.jpg',
    country: 'Japão',
    name: 'KYOTO',
    desc: 'Jardins zen, templos milenares e a essência cultural do Japão eterno.',
  },
];

const N = DESTINATIONS.length;

export default function SliderHero() {
  const [current, setCurrent] = useState(0);
  const [, setLocation] = useLocation();

  const goTo = useCallback((index: number) => {
    setCurrent(((index % N) + N) % N);
  }, []);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const dest = DESTINATIONS[current];
  const cards = DESTINATIONS.map((d, i) => ({ ...d, i })).filter((_, i) => i !== current);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-black">

      {/* Fundo — crossfade entre destinos */}
      <AnimatePresence mode="sync">
        <motion.div
          key={dest.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <img src={dest.src} alt={dest.name} className="w-full h-full object-cover" loading="eager" />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10 pointer-events-none" />

      {/* Conteudo esquerdo */}
      <div className="absolute left-10 lg:left-20 top-1/2 -translate-y-1/2 z-20 max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Linha divisora + pais */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#C18D41]" />
              <span className="text-[#C18D41] text-[10px] font-bold uppercase tracking-[0.4em]">
                {dest.country}
              </span>
            </div>

            {/* Titulo grande */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] mb-6 tracking-tight">
              {dest.name}
            </h1>

            {/* Descricao */}
            <p className="text-white/60 text-sm font-light leading-relaxed mb-10 max-w-sm">
              {dest.desc}
            </p>

            {/* Botoes */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLocation('/destinos')}
                className="group flex items-center gap-3 bg-[#C18D41] hover:bg-[#A67632] text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Explorar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full border border-white/20 hover:border-white/50 transition-all duration-300"
              >
                Solicitar Roteiro
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cards de destinos — direita */}
      <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center pr-6 lg:pr-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex gap-4"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {cards.map((card, idx) => (
              <motion.div
                key={card.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => goTo(card.i)}
                className="group relative w-36 lg:w-44 h-56 lg:h-72 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 border border-white/10 hover:border-[#C18D41]/50 transition-all duration-500 hover:scale-[1.03]"
              >
                <img
                  src={card.src}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[#C18D41] text-[8px] uppercase tracking-[0.3em] mb-1">{card.country}</p>
                  <h3 className="text-white text-sm font-bold leading-tight">{card.name}</h3>
                </div>
                {/* Hover indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-[#C18D41] flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegacao inferior */}
      <div className="absolute bottom-8 left-10 lg:left-20 z-20 flex items-center gap-6">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full border border-white/30 hover:border-[#C18D41] hover:bg-[#C18D41]/10 flex items-center justify-center text-white transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full border border-white/30 hover:border-[#C18D41] hover:bg-[#C18D41]/10 flex items-center justify-center text-white transition-all duration-300 group"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Barra de progresso */}
        <div className="flex items-center gap-2">
          {DESTINATIONS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="relative h-[2px] transition-all duration-300" style={{ width: i === current ? 32 : 12 }}>
              <div className="absolute inset-0 bg-white/20 rounded-full" />
              {i === current && (
                <motion.div
                  layoutId="progress-dot"
                  className="absolute inset-0 bg-[#C18D41] rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      <div className="absolute bottom-8 right-10 lg:right-12 z-20 text-white/25 font-black text-5xl tracking-tight select-none">
        {String(current + 1).padStart(2, '0')}
      </div>
    </section>
  );
}
