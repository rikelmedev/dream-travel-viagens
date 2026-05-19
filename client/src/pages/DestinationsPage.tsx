import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { setSEOHead } from "@/components/SEOHead";

export default function DestinationsPage() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSEOHead({
      title: "Destinos Exclusivos | Dream Travel",
      description: "Explore o nosso portfolio de destinos globais com curadoria de alto padrao.",
    });

    fetch("/api/destinations")
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const categories = [
    { id: "all", label: "Colecao Completa" },
    { id: "praia", label: "Refugios Costeiros" },
    { id: "montanha", label: "Retiros Alpinos" },
    { id: "cidade", label: "Imersao Urbana" },
    { id: "aventura", label: "Jornadas Epicas" },
  ];

  const filtered = destinations.filter(
    (d) => selectedCategory === "all" || d.category === selectedCategory || (d.category === undefined && selectedCategory === "all")
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <section className="pt-40 pb-20 px-6 lg:px-12 border-b border-gray-200/50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#C18D41]/50" />
            <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
              Portfolio Global
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#05070a] mb-6 font-serif leading-[1.1]">
            Destinos <span className="italic font-light text-[#C18D41]">Singulares</span>
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
            Descubra os locais mais fascinantes do planeta sob a otica da alta curadoria.
          </p>
        </div>
      </section>

      <section className="py-10 px-6 lg:px-12 sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-gray-200/50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap relative pb-2 ${
                  selectedCategory === cat.id ? "text-[#C18D41]" : "text-gray-400 hover:text-[#05070a]"
                }`}
              >
                {cat.label}
                {selectedCategory === cat.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C18D41]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="container max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-[#C18D41] mb-6" />
              <p className="font-serif text-2xl text-[#05070a] italic">Mapeando coordenados globais...</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {filtered.map((dest) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => setLocation(`/destinos/${dest.id}`)}
                    className="group cursor-pointer flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="relative h-80 overflow-hidden bg-gray-100">
                      <img
                        src={dest.image}
                        alt={dest.title || dest.name}
                        className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
                        <MapPin className="w-3 h-3 text-[#C18D41]" />
                        {dest.location || dest.country || "Explorar"}
                      </div>
                    </div>

                    <div className="p-10 flex flex-col flex-1">
                      <h3 className="text-3xl font-serif font-bold text-[#05070a] mb-4 group-hover:text-[#C18D41] transition-colors">
                        {dest.title || dest.name}
                      </h3>
                      <p className="text-sm font-light text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-3">
                        {dest.description || "Descubra uma experiencia exclusiva com a curadoria detalhada da nossa equipe especialista."}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#05070a]">
                          Aprofundar
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#C18D41] group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}