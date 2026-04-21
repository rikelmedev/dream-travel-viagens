import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Calendar, Users, ArrowRight, 
  Hotel, Plane, Ship, Car, ShieldCheck, Ticket, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FormularioQuestionario from '@/components/FormularioQuestionario';
import { useTheme } from '@/contexts/ThemeContext';

// Definição das categorias baseadas na CVC
const SEARCH_CATEGORIES = [
  { id: 'pacotes', label: 'Pacotes', icon: Briefcase },
  { id: 'hoteis', label: 'Hotéis', icon: Hotel },
  { id: 'passagens', label: 'Passagens', icon: Plane },
  { id: 'cruzeiros', label: 'Cruzeiros', icon: Ship },
  { id: 'carros', label: 'Carros', icon: Car },
  { id: 'seguro', label: 'Seguro', icon: ShieldCheck },
  { id: 'ingressos', label: 'Ingressos', icon: Ticket },
];

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { isDayTime } = useTheme();
  const [activeTab, setActiveTab] = useState('pacotes');

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Curadoria de Viagens de Luxo',
      description: 'Experiências exclusivas desenhadas pela Jackeline.',
      image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1600&q=80',
    });
    window.scrollTo(0,0);
  }, []);

  return (
    <PageTransition>
      <Layout>
        {/* HERO SECTION */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
          <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDayTime ? 'bg-black/20' : 'bg-slate-950/80'}`} />
          
          <div className="container relative z-10 px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mb-12"
            >
              <h1 className="text-5xl md:text-8xl font-bold font-serif text-white leading-tight mb-6 drop-shadow-2xl">
                Sua próxima <br />
                <span className="italic font-light text-primary">história começa aqui</span>
              </h1>
            </motion.div>

            <div className="w-full max-w-6xl">
              {/* Abas de Categoria */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {SEARCH_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest ${
                        isActive 
                          ? 'bg-background text-primary border-t border-x border-white/10 shadow-lg' 
                          : 'bg-black/20 text-white/60 hover:bg-black/40 backdrop-blur-md'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-white/40'}`} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Caixa de Busca Dinâmica */}
              <motion.div 
                layoutId="searchBox"
                className="bg-background/95 backdrop-blur-3xl p-2 rounded-[2.5rem] rounded-tl-none shadow-2xl border border-white/10"
              >
                <div className="bg-background rounded-[2.2rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                  
                  {/* Campo Destino  */}
                  <div className="px-4 border-b md:border-b-0 md:border-r border-border/50 pb-4 md:pb-0">
                    <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">
                      {activeTab === 'passagens' ? 'Origem / Destino' : 'Onde deseja ir?'}
                    </label>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <input 
                        type="text" 
                        placeholder={activeTab === 'passagens' ? 'Cidade de saída' : 'Cidade, Hotel ou Região'} 
                        className="bg-transparent outline-none text-foreground font-serif text-xl w-full placeholder:text-foreground/20" 
                      />
                    </div>
                  </div>

                  {/* Campo Datas */}
                  <div className="px-4 border-b md:border-b-0 lg:border-r border-border/50 pb-4 md:pb-0">
                    <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Período</label>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <input type="text" placeholder="Ida e Volta" className="bg-transparent outline-none text-foreground font-serif text-xl w-full" />
                    </div>
                  </div>

                  {/* Campo Pessoas / Quartos */}
                  <div className="px-4 pb-4 lg:pb-0">
                    <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Hóspedes</label>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-serif text-xl">02 Pessoas</span>
                    </div>
                  </div>

                  {/* Botão de Ação */}
                  <Button className="h-16 rounded-[1.8rem] bg-primary text-white hover:brightness-110 font-bold text-lg shadow-xl shadow-primary/20 group w-full">
                    Buscar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1600&q=80"
            className="absolute inset-0 w-full h-full object-cover -z-10"
            alt="Fundo Dream Travel"
          />
        </section>

        <AboutJackeline />
        <FeaturedDestinations />
        <Globe3D />
        <FormularioQuestionario />
      </Layout>
    </PageTransition>
  );
}