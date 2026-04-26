import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Calendar, Star, CheckCircle2, ArrowLeft, Sparkles, Plane, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import { useEffect } from "react";

const DESTINATIONS_DATA: Record<string, any> = {
  maldivas: {
    title: "Atol de Baa",
    country: "Maldivas",
    heroImage: "/images/maldivas.jpg",
    description: "Um santuário de águas cristalinas e recifes de coral protegidos pela UNESCO. Onde o tempo para e o horizonte se funde com o oceano.",
    highlights: ["Resorts Private Island", "Jantares sob as estrelas", "Mergulho com Raias-Manta"],
    details: "O Atol de Baa oferece uma das experiências mais exclusivas do mundo. Com uma curadoria de resorts que definem o conceito de 'barefoot luxury', cada detalhe é desenhado para a sua desconexão total.",
    duration: "7 a 10 dias",
    season: "Novembro a Abril"
  },
  capri: {
    title: "Ilha de Capri",
    country: "Itália",
    heroImage: "/images/capri.jpg",
    description: "O glamour eterno do Mediterrâneo. Entre rochedos dramáticos e vilas históricas, Capri é o destino de quem busca elegância e sofisticação à beira-mar.",
    highlights: ["Passeios de Riva Privados", "Visita à Gruta Azul", "Aperitivos na Piazzetta"],
    details: "Explore a costa Amalfitana a bordo de um iate privado e perca-se pelas ruelas perfumadas por limoeiros. Uma jornada onde a herança romana encontra a alta-sociedade moderna.",
    duration: "5 a 7 dias",
    season: "Maio a Setembro"
  },
  zermatt: {
    title: "Zermatt",
    country: "Suíça",
    heroImage: "/images/zermatt.jpg",
    description: "Aos pés do Matterhorn, Zermatt redefine o luxo alpino. Um refúgio livre de carros, onde a neve é eterna e o serviço é impecável.",
    highlights: ["Ski-in/Ski-out de Luxo", "Heliskiing Privado", "Gastronomia Michelin na Montanha"],
    details: "Desfrute de spas de classe mundial com vista para os picos nevados e chalés que combinam rusticidade com tecnologia de ponta. O destino definitivo para os amantes do inverno.",
    duration: "6 a 8 dias",
    season: "Dezembro a Março"
  },
  kyoto: {
    title: "Quioto",
    country: "Japão",
    heroImage: "/images/kyoto.jpg",
    description: "O coração espiritual do Japão. Uma imersão profunda em tradições milenares, templos zen e o refinamento absoluto da hospitalidade Omotenashi.",
    highlights: ["Cerimônia do Chá Privada", "Hospedagem em Ryokans de Elite", "Jantares Kaiseki"],
    details: "Caminhe por jardins desenhados há séculos e viva experiências culturais restritas. Quioto não é apenas uma cidade, é uma lição sobre estética e paz interior.",
    duration: "4 a 6 dias",
    season: "Março (Sakura) ou Outubro"
  }
};

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const destination = DESTINATIONS_DATA[id || "maldivas"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!destination) {
    return <div className="h-screen flex items-center justify-center">Destino não encontrado.</div>;
  }

  return (
    <PageTransition>
      <Layout>
        <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
          {/* Hero Background */}
          <div className="absolute inset-0 z-0">
            <img src={destination.heroImage} alt={destination.title} className="w-full h-full object-cover transition-transform duration-[20s] scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40" />
          </div>

          <div className="container relative z-10 px-4 md:px-8">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/destinos')}
              className="text-white mb-8 hover:bg-white/10 rounded-full pl-2"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Voltar ao Portfolio
            </Button>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
                <MapPin className="w-4 h-4" />
                <span>{destination.country}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-none">
                {destination.title}
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Coluna de Texto  */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">A Essência do Destino</h2>
                  <p className="text-xl text-foreground/70 font-light leading-relaxed italic">
                    "{destination.description}"
                  </p>
                  <p className="text-lg text-foreground/80 font-light leading-relaxed">
                    {destination.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground font-serif uppercase tracking-widest text-[10px] mb-1">Melhor Época</h4>
                      <p className="text-foreground/70">{destination.season}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Plane className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground font-serif uppercase tracking-widest text-[10px] mb-1">Tempo Sugerido</h4>
                      <p className="text-foreground/70">{destination.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de Reserva */}
              <div className="lg:col-span-5">
                <div className="sticky top-32 bg-foreground/[0.02] border border-border/40 p-10 rounded-[3rem] backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
                    <Sparkles className="w-4 h-4 fill-primary" />
                    <span>Curadoria Dream Travel</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-8">Experiências Incluídas</h3>
                  
                  <ul className="space-y-6 mb-12">
                    {destination.highlights.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-4 text-foreground/80">
                        <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => window.open(`https://wa.me/5517996077150?text=Olá Jackeline, gostaria de saber mais sobre o roteiro para ${destination.title}`, '_blank')}
                    className="w-full h-16 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-xl shadow-primary/20"
                  >
                    Personalizar Minha Viagem
                  </Button>
                  
                  <p className="text-center text-[9px] uppercase tracking-widest text-foreground/40 mt-6 flex items-center justify-center gap-2">
                    <Info className="w-3 h-3" /> Sem pacotes prontos. 100% sob medida.
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