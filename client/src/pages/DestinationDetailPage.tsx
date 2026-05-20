import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, ArrowLeft, Sparkles, Plane, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import { useEffect, useState } from "react";

const FALLBACK_DATA: Record<string, any> = {
  maldivas: {
    title: "Atol de Baa",
    country: "Maldivas",
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    description: "Um santuário de águas cristalinas e recifes de coral protegidos pela UNESCO. Onde o tempo para e o horizonte se funde com o oceano.",
    highlights: ["Resorts Private Island", "Jantares sob as estrelas", "Mergulho com Raias-Manta"],
    details: "O Atol de Baa oferece uma das experiências mais exclusivas do mundo. Com uma curadoria de resorts que definem o conceito de barefoot luxury, cada detalhe é desenhado para a sua desconexão total.",
    duration: "7 a 10 dias",
    season: "Novembro a Abril"
  },
  capri: {
    title: "Ilha de Capri",
    country: "Itália",
    heroImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80",
    description: "O glamour eterno do Mediterrâneo. Entre rochedos dramáticos e vilas históricas, Capri é o destino de quem busca elegância e sofisticação à beira-mar.",
    highlights: ["Passeios de Riva Privados", "Visita à Gruta Azul", "Aperitivos na Piazzetta"],
    details: "Explore a costa Amalfitana a bordo de um iate privado e perca-se pelas ruelas perfumadas por limoeiros. Uma jornada onde a herança romana encontra a alta-sociedade moderna.",
    duration: "5 a 7 dias",
    season: "Maio a Setembro"
  }
};

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [destination, setDestination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetch(`/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDestination(data);
        setIsLoading(false);
      })
      .catch(() => {
        setDestination(FALLBACK_DATA[id || "maldivas"] || FALLBACK_DATA.maldivas);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#C18D41] mb-6" />
        <p className="font-serif text-2xl text-[#05070a] italic">Preparando a sua jornada...</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <Layout>
        <section className="relative min-h-[85vh] flex items-end pb-20 overflow-hidden bg-[#05070a]">
          <div className="absolute inset-0 z-0">
            <img 
              src={destination.heroImage || destination.image} 
              alt={destination.title || destination.name} 
              className="w-full h-full object-cover transition-transform duration-[20s] scale-110 opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-black/20 to-black/40" />
          </div>

          <div className="container relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/destinos')}
              className="text-white mb-12 hover:bg-white/10 rounded-full pl-2 backdrop-blur-md border border-white/10"
            >
              <ArrowLeft className="mr-3 w-4 h-4" /> Voltar ao Portfolio
            </Button>
            
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center gap-4 text-[#C18D41] font-bold uppercase tracking-[0.5em] text-[10px] mb-6">
                <MapPin className="w-4 h-4" />
                <span>{destination.country}</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#05070a] leading-[1.1]">
                {destination.title || destination.name}
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-[#FAF9F6]">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              <div className="lg:col-span-7 space-y-16">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-12 bg-[#C18D41]/50" />
                    <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                      A Essência do Destino
                    </span>
                  </div>
                  
                  <p className="first-letter:text-8xl first-letter:font-serif first-letter:text-[#C18D41] first-letter:float-left first-letter:mr-6 first-letter:-mt-4 text-2xl text-[#05070a]/80 font-light leading-relaxed italic">
                    {destination.description}
                  </p>
                  
                  <p className="text-lg text-[#05070a]/60 font-light leading-loose pt-6">
                    {destination.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-gray-200">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#C18D41]/10 flex items-center justify-center shrink-0">
                      <Calendar className="text-[#C18D41] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#05070a] font-serif uppercase tracking-widest text-[11px] mb-2">Melhor Época</h4>
                      <p className="text-gray-500 font-light">{destination.season || "Sazonal"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#C18D41]/10 flex items-center justify-center shrink-0">
                      <Plane className="text-[#C18D41] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#05070a] font-serif uppercase tracking-widest text-[11px] mb-2">Tempo Sugerido</h4>
                      <p className="text-gray-500 font-light">{destination.duration || "Personalizado"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="sticky top-32 bg-[#05070a] p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#C18D41] to-transparent" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C18D41]/5 blur-[80px] rounded-full pointer-events-none" />

                  <div className="flex items-center gap-3 text-[#C18D41] font-bold uppercase tracking-[0.3em] text-[9px] mb-8">
                    <Sparkles className="w-4 h-4" />
                    <span>Curadoria Dream Travel</span>
                  </div>
                  <h3 className="text-4xl font-serif font-bold text-white mb-10 leading-tight">Experiências <br/><span className="italic text-[#C18D41] font-light">Exclusivas</span></h3>
                  
                  <ul className="space-y-6 mb-14">
                    {(destination.highlights || []).map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-5 text-white/80">
                        <CheckCircle2 className="text-[#C18D41] w-5 h-5 shrink-0" />
                        <span className="font-light tracking-wide">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => window.open(`https://wa.me/5517996077150?text=Olá Jackeline, gostaria de desenhar o meu roteiro para ${destination.title || destination.name}`, '_blank')}
                    className="w-full h-16 rounded-2xl bg-[#C18D41] text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#A67632] hover:scale-[1.02] transition-all shadow-xl shadow-[#C18D41]/20 border border-white/10"
                  >
                    Desenhar Roteiro Confidencial
                  </Button>
                  
                  <p className="text-center text-[9px] uppercase tracking-[0.2em] text-white/30 mt-8 flex items-center justify-center gap-2 font-bold">
                    <Info className="w-3 h-3" /> 100% Personalizado ao seu perfil
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}