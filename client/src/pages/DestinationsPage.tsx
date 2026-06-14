import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Loader2, Star } from "lucide-react";
import { useLocation } from "wouter";
import { setSEOHead } from "@/components/SEOHead";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";

const CATEGORIES = [
  { id: "all", label: "Coleção Completa" },
  { id: "praia", label: "Refúgios Costeiros" },
  { id: "montanha", label: "Retiros Alpinos" },
  { id: "cidade", label: "Imersão Urbana" },
  { id: "aventura", label: "Jornadas Épicas" },
];

export default function DestinationsPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSEOHead({
      title: "Destinos Exclusivos | Dream Travel",
      description: "Explore o nosso portfolio de destinos globais com curadoria de alto padrão.",
    });
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((d) => { setDestinations(Array.isArray(d) ? d : []); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const filtered = destinations.filter(
    (d) => selectedCategory === "all" || d.category === selectedCategory
  );

  return (
    <PageTransition>
      <Layout>

        {/* ── Hero ── */}
        <section className="bg-[#05070a] pt-40 pb-24 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                  Portfolio Global
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.88] tracking-tight">
                  Nossa<br />
                  <span className="italic font-light text-[#C18D41]">Coleção.</span>
                </h1>

                <div className="lg:text-right max-w-sm">
                  <p className="text-white/40 font-light leading-relaxed text-sm mb-8">
                    Cada destino é pessoalmente curado pela Jackeline — testado, vivido e aprovado
                    antes de entrar no portfólio.
                  </p>
                  <div className="flex lg:justify-end items-center gap-8">
                    <div>
                      <p className="font-black text-4xl text-white/15 tabular-nums">
                        {isLoading ? "—" : String(destinations.length).padStart(2, "0")}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-bold mt-1">Destinos</p>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div>
                      <p className="font-black text-4xl text-white/15 tabular-nums">10+</p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-bold mt-1">Anos</p>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div>
                      <p className="font-black text-4xl text-white/15 tabular-nums">5★</p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-bold mt-1">Curadoria</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filtros sticky ── */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-gray-200/60">
          <div className="container max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative py-5 px-6 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "text-[#05070a]"
                      : "text-gray-400 hover:text-[#05070a]"
                  }`}
                >
                  {cat.label}
                  {selectedCategory === cat.id && (
                    <motion.div
                      layoutId="filterLine"
                      className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#C18D41]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid de destinos ── */}
        <section className="bg-[#FAF9F6] py-16 px-6 lg:px-12 min-h-[60vh]">
          <div className="container max-w-7xl mx-auto">

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                <Loader2 className="w-6 h-6 animate-spin text-[#C18D41]" />
                <p className="font-serif text-xl text-[#05070a]/40 italic">Mapeando coordenadas globais...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <p className="font-serif text-2xl text-[#05070a] italic">Sem destinos nesta categoria.</p>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-[#C18D41] text-[10px] uppercase tracking-widest font-bold hover:underline"
                >
                  Ver todos
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Card destaque — primeiro item, largura total */}
                  {filtered[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      onClick={() => setLocation(`/destinos/${filtered[0].id}`)}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer mb-4 h-[55vh] min-h-[400px]"
                    >
                      <img
                        src={filtered[0].image}
                        alt={filtered[0].title}
                        className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                      {/* Badge destaque */}
                      <div className="absolute top-6 left-6 bg-[#C18D41] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Destaque
                      </div>

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-3 h-3 text-[#C18D41]" />
                            <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold">
                              {filtered[0].location || "Destino exclusivo"}
                            </span>
                          </div>
                          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                            {filtered[0].title}
                          </h2>
                          <p className="text-white/50 font-light text-sm mt-3 max-w-xl leading-relaxed line-clamp-2">
                            {filtered[0].description || "Experiência exclusiva com curadoria personalizada."}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                          {filtered[0].price && (
                            <div className="text-right">
                              <span className="text-[8px] uppercase tracking-widest text-white/30 block">A partir de</span>
                              <span className="text-white font-serif text-xl">R$ {filtered[0].price}</span>
                            </div>
                          )}
                          <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-[#C18D41] group-hover:bg-[#C18D41]/10 flex items-center justify-center transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Demais destinos — grade 3 colunas */}
                  {filtered.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filtered.slice(1).map((dest, i) => (
                        <motion.div
                          key={dest.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.6 }}
                          onClick={() => setLocation(`/destinos/${dest.id}`)}
                          className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 lg:h-96"
                        >
                          <img
                            src={dest.image}
                            alt={dest.title}
                            className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                          {/* Número */}
                          <div className="absolute top-5 right-5 text-white/15 font-black text-2xl tabular-nums select-none">
                            {String(i + 2).padStart(2, "0")}
                          </div>

                          {/* Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-1.5 mb-2">
                              <MapPin className="w-3 h-3 text-[#C18D41] flex-shrink-0" />
                              <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">
                                {dest.location || "Destino exclusivo"}
                              </span>
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-3 leading-tight group-hover:text-[#C18D41] transition-colors duration-300">
                              {dest.title}
                            </h3>

                            <div className="flex items-center justify-between">
                              {dest.rating && (
                                <div className="flex items-center gap-1.5">
                                  <Star className="w-3 h-3 fill-[#C18D41] text-[#C18D41]" />
                                  <span className="text-[10px] text-white/40">{dest.rating}</span>
                                </div>
                              )}
                              {dest.price && (
                                <div className="text-right ml-auto">
                                  <span className="text-[8px] uppercase tracking-widest text-white/25 block">A partir de</span>
                                  <span className="text-white font-serif text-sm">R$ {dest.price}</span>
                                </div>
                              )}
                            </div>

                            {/* CTA hover */}
                            <div className="flex items-center gap-2 text-[#C18D41] text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 mt-3">
                              Ver destino <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="bg-[#05070a] py-24 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold mb-6">
                Não encontrou o seu sonho?
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                Criamos o Destino <br />
                <span className="italic font-light text-[#C18D41]">Perfeito para Si.</span>
              </h2>
              <p className="text-white/35 font-light text-sm max-w-md mx-auto mb-10 leading-relaxed">
                Não existe limite geográfico para a nossa curadoria. Diga-nos onde sonha estar
                e nós desenhamos a jornada.
              </p>
              <button
                onClick={() => { window.location.href = '/#formulario'; }}
                className="group inline-flex items-center gap-3 bg-[#C18D41] hover:bg-[#A67632] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Solicitar Curadoria Exclusiva
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

      </Layout>
    </PageTransition>
  );
}
