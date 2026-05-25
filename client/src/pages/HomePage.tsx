import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Sparkles, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/painel/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FormularioQuestionario from '@/components/FormularioQuestionario';

export default function HomePage() {
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
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
          
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
          
          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mb-12"
            >
              <div className="flex items-center justify-center gap-3 text-[#C18D41] font-bold uppercase tracking-[0.5em] text-[10px] mb-6">
                <div className="h-px w-8 bg-[#C18D41]/50" />
                <span>git addExplore</span>
                <div className="h-px w-8 bg-[#C18D41]/50" />
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-8 drop-shadow-2xl">
                O Mundo, <br />
                <span className="italic font-light text-[#C18D41]">Desenhado Para Si.</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                Curadoria de experiências extraordinárias para viajantes exigentes.
              </p>
            </motion.div>

            {/* FORMULÁRIO  */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full max-w-5xl"
            >
              <form 
                onSubmit={handleRequestItinerary} 
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl lg:rounded-full p-3 flex flex-col lg:flex-row items-center gap-1 shadow-2xl"
              >
                
                {/* Destino */}
                <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all group">
                  <MapPin size={20} className="text-[#C18D41]" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Destino</label>
                    <input required type="text" placeholder="Para onde?" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => setFormData({...formData, destino: e.target.value})} />
                  </div>
                </div>

                <div className="hidden lg:block w-px h-12 bg-white/10 mx-2" />

                {/* Ida */}
                <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all group">
                  <Calendar size={20} className="text-[#C18D41]" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Check-in</label>
                    <input required type="text" placeholder="Data" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => setFormData({...formData, saida: e.target.value})} />
                  </div>
                </div>

                <div className="hidden lg:block w-px h-12 bg-white/10 mx-2" />

                {/* Hóspedes */}
                <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-2xl lg:rounded-full transition-all group">
                  <Users size={20} className="text-[#C18D41]" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Viajantes</label>
                    <input type="text" placeholder="Quantos?" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => setFormData({...formData, hospedes: e.target.value})} />
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="w-full lg:w-auto p-1">
                   <Button type="submit" className="w-full lg:w-auto h-16 px-10 rounded-2xl lg:rounded-full bg-[#C18D41] text-white hover:bg-[#A67632] hover:scale-105 transition-all font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center shadow-xl shadow-[#C18D41]/20 border border-white/10">
                     Explorar
                     <Search className="ml-3 w-4 h-4" />
                   </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <img 
            src="/images/hero-luxury.jpg" 
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[30s] scale-110 hover:scale-105 brightness-110 contrast-110"
            alt="Destino de Luxo Dream Travel"
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