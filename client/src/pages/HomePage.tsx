import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FormularioQuestionario from '@/components/FormularioQuestionario';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomePage() {
  const { isDayTime } = useTheme();

  const [formData, setFormData] = useState({
    destino: '',
    saida: '',
    volta: '',
    hospedes: ''
  });

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Curadoria de Viagens Exclusivas',
      description: 'Experiências singulares desenhadas milimetricamente para si.',
      image: '/images/hero-luxury.jpg',
    });
    window.scrollTo(0,0);
  }, []);

  const handleRequestItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `✨ *Solicitação de Roteiro Personalizado* ✨\n\n` +
      `📍 *Destino:* ${formData.destino}\n` +
      `📅 *Ida:* ${formData.saida}\n` +
      `📅 *Volta:* ${formData.volta}\n` +
      `👥 *Hóspedes:* ${formData.hospedes || 'Não informado'}\n\n` +
      `Gostaria de iniciar o planejamento desta jornada exclusiva!`;
    
    window.open(`https://wa.me/5517996077150?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <PageTransition>
      <Layout>
        {/* SECÇÃO HERO */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          
          <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
            isDayTime 
              ? 'bg-gradient-to-b from-black/60 via-black/20 to-black/60' 
              : 'bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90'
          }`} />
          
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mb-12"
            >
              <div className="flex items-center justify-center gap-2 text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-6 drop-shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
                <span>Private Travel Concierge</span>
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold font-serif text-white leading-[0.95] mb-8 drop-shadow-2xl">
                Onde o Luxo <br />
                <span className="italic font-light text-white/90">Encontra a Alma</span>
              </h1>
            </motion.div>

            {/* FORMULÁRIO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-5xl"
            >
              <form 
                onSubmit={handleRequestItinerary} 
                className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] lg:rounded-full p-2 flex flex-col lg:flex-row items-center gap-2 lg:gap-0 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              >
                
                {/* Destino */}
                <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 hover:bg-white/10 rounded-[2rem] lg:rounded-full transition-colors cursor-text group">
                  <MapPin size={18} className="text-white/60 hidden md:block" />
                  <div className="flex-1">
                    <label className="block text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mb-1">Destino</label>
                    <input required type="text" placeholder="Para onde?" className="w-full bg-transparent outline-none text-white font-serif text-lg md:text-xl placeholder:text-white/40" onChange={(e) => setFormData({...formData, destino: e.target.value})} />
                  </div>
                </div>

                <div className="hidden lg:block w-px h-10 bg-white/20" /> 

                {/* Bloco de Datas (Ida e Volta lado a lado) */}
                <div className="w-full lg:w-auto flex flex-row items-center">
                  <div className="flex-1 lg:w-32 px-6 py-4 hover:bg-white/10 rounded-[2rem] lg:rounded-full transition-colors cursor-text group border-r border-white/10 lg:border-none">
                    <label className="block text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mb-1">Ida</label>
                    <input required type="text" placeholder="DD/MM" className="w-full bg-transparent outline-none text-white font-serif text-lg md:text-xl placeholder:text-white/40" onChange={(e) => setFormData({...formData, saida: e.target.value})} />
                  </div>

                  <div className="hidden lg:block w-px h-10 bg-white/20" />

                  <div className="flex-1 lg:w-32 px-6 py-4 hover:bg-white/10 rounded-[2rem] lg:rounded-full transition-colors cursor-text group">
                    <label className="block text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mb-1">Volta</label>
                    <input required type="text" placeholder="DD/MM" className="w-full bg-transparent outline-none text-white font-serif text-lg md:text-xl placeholder:text-white/40" onChange={(e) => setFormData({...formData, volta: e.target.value})} />
                  </div>
                </div>

                <div className="hidden lg:block w-px h-10 bg-white/20" />

                {/* Hóspedes */}
                <div className="w-full lg:w-40 px-6 py-4 hover:bg-white/10 rounded-[2rem] lg:rounded-full transition-colors cursor-text group">
                  <label className="block text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mb-1">Hóspedes</label>
                  <input type="text" placeholder="Quantos?" className="w-full bg-transparent outline-none text-white font-serif text-lg md:text-xl placeholder:text-white/40" onChange={(e) => setFormData({...formData, hospedes: e.target.value})} />
                </div>

                {/* Botão */}
                <div className="w-full lg:w-auto mt-2 lg:mt-0 p-1">
                   <Button type="submit" className="w-full lg:w-auto h-16 px-8 rounded-[2rem] lg:rounded-full bg-primary text-white hover:scale-105 transition-transform font-bold text-xs uppercase tracking-widest flex items-center justify-center shadow-lg shadow-primary/30">
                     Solicitar
                     <Search className="ml-3 w-4 h-4" />
                   </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <img 
            src="/images/hero-luxury.jpg" 
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[20s] scale-110 hover:scale-100"
            alt="Fundo Imersivo Dream Travel"
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