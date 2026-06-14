import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Loader2, MapPin } from "lucide-react";
import { useLocation } from "wouter";

const DURATIONS = ["5D / 4N", "7D / 6N", "10D / 9N", "4D / 3N", "8D / 7N", "6D / 5N"];

export default function FeaturedPackages() {
  const [, setLocation] = useLocation();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((d) => { setDestinations(Array.isArray(d) ? d.slice(0, 6) : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="py-24 bg-[#FAF9F6] flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-[#C18D41]" />
    </section>
  );

  if (destinations.length === 0) return null;

  const pairs: (typeof destinations)[] = [];
  for (let i = 0; i < destinations.length; i += 2) {
    pairs.push(destinations.slice(i, i + 2));
  }

  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden">
      <div className="container px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
              Experiencias Selecionadas
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#05070a] leading-tight">
              Pacotes <br />
              <span className="italic font-light">em Destaque</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => setLocation("/destinos")}
            className="group flex items-center gap-2 text-[#C18D41] hover:text-[#A67632] text-[10px] font-bold uppercase tracking-[0.3em] transition-colors self-start md:self-auto"
          >
            Ver todos os pacotes
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Grade editorial */}
        <div className="flex flex-col gap-4">
          {pairs.map((pair, pairIdx) => (
            <motion.div
              key={pairIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: pairIdx * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 items-stretch"
            >
              {/* Texto vertical lateral */}
              <div className="hidden lg:flex items-center justify-center w-10 flex-shrink-0">
                <span
                  className="text-[#05070a]/5 font-black text-[11px] uppercase tracking-[0.3em] whitespace-nowrap select-none"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {pair[0]?.title ?? ""}
                </span>
              </div>

              {/* Cards */}
              {pair.map((dest, cardIdx) => (
                <motion.div
                  key={dest.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLocation(`/destinos/${dest.id}`)}
                  className="group relative flex-1 rounded-2xl overflow-hidden cursor-pointer bg-white border border-gray-100 hover:border-[#C18D41]/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Foto */}
                  <div className="relative h-52 lg:h-64 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    <div className="absolute top-4 left-4 bg-[#05070a]/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#C18D41]" />
                      {DURATIONS[(pairIdx * 2 + cardIdx) % DURATIONS.length]}
                    </div>

                    <div className="absolute top-4 right-4 bg-[#C18D41] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      R$ {dest.price}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3 h-3 text-[#C18D41] flex-shrink-0" />
                      <span className="text-[9px] uppercase tracking-widest text-gray-400">{dest.location}</span>
                    </div>
                    <h3 className="font-serif text-xl lg:text-2xl text-[#05070a] mb-2 group-hover:text-[#C18D41] transition-colors duration-300">
                      {dest.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light line-clamp-2 leading-relaxed">
                      {dest.description || "Experiencia exclusiva com curadoria personalizada da equipe Dream Travel."}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#05070a]">
                        Ver detalhes
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C18D41] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Slot vazio se par incompleto */}
              {pair.length === 1 && (
                <div
                  className="flex-1 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#C18D41]/40 transition-colors group"
                  onClick={() => setLocation("/destinos")}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border border-gray-200 group-hover:border-[#C18D41] flex items-center justify-center mx-auto mb-3 transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#C18D41] transition-colors" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-300 group-hover:text-[#C18D41] transition-colors">
                      Explorar mais
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
