import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, ArrowLeft, Loader2, MapPin } from "lucide-react";
import { useLocation } from "wouter";

const FeaturedDestinations = () => {
  const [, setLocation] = useLocation();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  // drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((d) => { setDestinations(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const checkScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 4);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 4);
  };

  const scrollBy = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.pageX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <section className="py-24 bg-[#05070a] overflow-hidden">

      {/* Header */}
      <div className="container px-6 lg:px-12 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
              Curadoria Dream Travel
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              A Nossa Coleção de <br />
              <span className="italic font-light text-[#C18D41]">Destinos Ímpares</span>
            </h2>
          </motion.div>

          {/* Setas de navegacao */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => scrollBy("left")}
              disabled={!canLeft}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-[#C18D41] hover:bg-[#C18D41]/10 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy("right")}
              disabled={!canRight}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-[#C18D41] hover:bg-[#C18D41]/10 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocation("/destinos")}
              className="ml-4 text-white/40 hover:text-[#C18D41] text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 flex items-center gap-2 group"
            >
              Ver todos
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trilho do carrossel */}
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C18D41]" />
        </div>
      ) : (
        <div
          ref={trackRef}
          onScroll={checkScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex overflow-x-auto scrollbar-hide select-none pl-6 lg:pl-20 pb-2"
          style={{ cursor: "grab" }}
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-stretch flex-shrink-0 group"
              onClick={() => !isDragging.current && setLocation(`/destinos/${dest.id}`)}
            >
              {/* Texto vertical — nome do destino */}
              <div className="flex items-center justify-center w-9 flex-shrink-0">
                <span
                  className="text-white/8 group-hover:text-[#C18D41]/25 font-black text-[10px] uppercase tracking-[0.25em] transition-colors duration-700 whitespace-nowrap"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {dest.title}
                </span>
              </div>

              {/* Card */}
              <div className="relative w-64 lg:w-72 h-80 lg:h-96 rounded-2xl overflow-hidden cursor-pointer mr-4 border border-white/5 group-hover:border-[#C18D41]/30 transition-all duration-500">
                <img
                  src={dest.image}
                  alt={dest.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Numero do card */}
                <div className="absolute top-5 right-5 text-white/20 font-black text-2xl tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-[#C18D41] flex-shrink-0" />
                    <span className="text-[9px] uppercase tracking-widest text-white/50 truncate">
                      {dest.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-white mb-3 leading-tight">
                    {dest.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-[#C18D41] text-[#C18D41]" />
                      <span className="text-[10px] text-white/50">{dest.rating}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-white/30 block">A partir de</span>
                      <span className="text-white font-serif text-base">R$ {dest.price}</span>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="mt-4 flex items-center gap-2 text-[#C18D41] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    Ver destino <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Card "Ver todos" no final */}
          <div className="flex-shrink-0 w-40 flex items-center justify-center mr-6 lg:mr-20">
            <button
              onClick={() => setLocation("/destinos")}
              className="group flex flex-col items-center gap-4 text-white/30 hover:text-white transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-full border border-white/15 group-hover:border-[#C18D41] group-hover:bg-[#C18D41]/10 flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em]">Ver Todos</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedDestinations;
