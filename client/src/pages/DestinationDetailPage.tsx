import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, ArrowRight, Star, Loader2, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import { useEffect, useState } from "react";

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [destination, setDestination] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setNotFound(false);

    Promise.all([
      fetch(`/api/destinations/${id}`).then((r) => (r.ok ? r.json() : null)),
      fetch("/api/destinations").then((r) => r.json()).catch(() => []),
    ]).then(([dest, all]) => {
      if (!dest) { setNotFound(true); setIsLoading(false); return; }
      setDestination(dest);
      setRelated(
        Array.isArray(all)
          ? all.filter((d: any) => String(d.id) !== String(id)).slice(0, 3)
          : []
      );
      setIsLoading(false);
    }).catch(() => { setNotFound(true); setIsLoading(false); });
  }, [id]);

  const scrollToForm = () => {
    const encoded = encodeURIComponent(destination?.title ?? "");
    window.location.href = `/?destino=${encoded}#formulario`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05070a] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-6 h-6 animate-spin text-[#C18D41]" />
        <p className="font-serif text-xl text-white/40 italic">Preparando a sua jornada...</p>
      </div>
    );
  }

  if (notFound || !destination) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-6">
          <p className="font-serif text-3xl text-[#05070a]">Destino não encontrado.</p>
          <button
            onClick={() => setLocation("/destinos")}
            className="text-[#C18D41] text-[10px] uppercase tracking-widest font-bold hover:underline"
          >
            Ver todos os destinos
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <PageTransition>
      <Layout>

        {/* ── Hero ── */}
        <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#05070a]">
          <motion.img
            src={destination.image}
            alt={destination.title}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />

          {/* Botão voltar */}
          <button
            onClick={() => setLocation("/destinos")}
            className="absolute top-28 left-8 lg:left-16 z-20 flex items-center gap-2 text-white/60 hover:text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Portfolio
          </button>

          {/* Titulo */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-8 lg:px-16 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-3 h-3 text-[#C18D41]" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.4em] font-bold">
                  {destination.location}
                </span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] text-white leading-[0.88] tracking-tight">
                {destination.title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── Conteúdo ── */}
        <section className="bg-[#FAF9F6] py-24 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

              {/* Coluna esquerda — texto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-px w-8 bg-[#C18D41]/50" />
                  <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                    A Essência do Destino
                  </span>
                </div>

                <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-[#C18D41] first-letter:float-left first-letter:mr-4 first-letter:leading-none first-letter:-mt-2 font-serif text-2xl text-[#05070a]/75 font-light leading-relaxed italic mb-10">
                  {destination.description ||
                    "Uma experiência incomparável, curada pela Jackeline com o nível de atenção ao detalhe que só a Dream Travel oferece."}
                </p>

                {/* Divider + rating/preço */}
                <div className="border-t border-[#05070a]/8 pt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
                  {destination.rating && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star className="w-4 h-4 fill-[#C18D41] text-[#C18D41]" />
                        <span className="font-black text-2xl text-[#05070a] tabular-nums">
                          {destination.rating}
                        </span>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.35em] text-[#05070a]/40 font-bold">
                        Avaliação curadoria
                      </p>
                    </div>
                  )}
                  {destination.price && (
                    <div>
                      <p className="font-black text-2xl text-[#05070a] font-serif mb-2">
                        R$ {destination.price}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.35em] text-[#05070a]/40 font-bold">
                        A partir de / pessoa
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-black text-2xl text-[#05070a] mb-2">100%</p>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-[#05070a]/40 font-bold">
                      Personalizado
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna direita — CTA sticky */}
              <div className="lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-28">
                <div className="bg-[#05070a] rounded-3xl p-8 xl:p-10 relative overflow-hidden">
                  {/* Decoração */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#C18D41]/60 to-transparent" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C18D41]/5 rounded-full blur-3xl pointer-events-none" />

                  <p className="text-[#C18D41] text-[9px] uppercase tracking-[0.4em] font-bold mb-6">
                    Curadoria Dream Travel
                  </p>
                  <h3 className="font-serif text-3xl text-white leading-tight mb-4">
                    Desenhe o seu <br />
                    <span className="italic font-light text-[#C18D41]">roteiro ideal.</span>
                  </h3>
                  <p className="text-white/35 text-sm font-light leading-relaxed mb-8">
                    A Jackeline cria uma experiência à medida especialmente para si neste destino —
                    sem templates, sem roteiros prontos.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={scrollToForm}
                      className="group w-full h-12 bg-[#C18D41] hover:bg-[#A67632] text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                    >
                      Solicitar Roteiro
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <a
                      href={`https://wa.me/5517996077150?text=${encodeURIComponent(`Olá Jackeline! Gostaria de saber mais sobre ${destination.title}. 🌍`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group w-full h-12 border border-white/10 hover:border-[#C18D41]/40 text-white/60 hover:text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Falar no WhatsApp
                    </a>
                  </div>

                  <p className="text-center text-[9px] text-white/20 uppercase tracking-[0.25em] font-bold mt-6">
                    Resposta em até 24h úteis
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Outros destinos ── */}
        {related.length > 0 && (
          <section className="bg-[#05070a] py-24 px-6 lg:px-12">
            <div className="container max-w-7xl mx-auto">

              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-[#C18D41]/50" />
                    <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                      Continue Explorando
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl text-white">
                    Outros <span className="italic font-light text-[#C18D41]">Destinos.</span>
                  </h2>
                </div>
                <button
                  onClick={() => setLocation("/destinos")}
                  className="hidden md:flex items-center gap-2 text-white/30 hover:text-[#C18D41] text-[10px] uppercase tracking-[0.3em] font-bold transition-colors group"
                >
                  Ver todos
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((dest, i) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    onClick={() => setLocation(`/destinos/${dest.id}`)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer h-72"
                  >
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-1.5 mb-2">
                        <MapPin className="w-3 h-3 text-[#C18D41]" />
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">
                          {dest.location}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-white group-hover:text-[#C18D41] transition-colors duration-300">
                        {dest.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>
        )}

      </Layout>
    </PageTransition>
  );
}
