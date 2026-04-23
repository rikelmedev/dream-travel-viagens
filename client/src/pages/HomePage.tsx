import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Baby, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import WeeklyOffers from '@/components/WeeklyOffers';
import FormularioQuestionario from '@/components/FormularioQuestionario';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { isDayTime } = useTheme();

  const [formData, setFormData] = useState({
    destino: '',
    saida: '',
    volta: '',
    adultos: '2',
    criancas: '0'
  });

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Roteiros Desenhados à Mão',
      description: 'Transformamos seus desejos em jornadas exclusivas desenhadas pela Jackeline.',
      image: '/images/hero-luxury.jpg',
    });
    window.scrollTo(0,0);
  }, []);

  const handleRequestItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `✨ *Solicitação de Roteiro Personalizado* ✨\n\n` +
      `📍 *Destino:* ${formData.destino}\n` +
      `📅 *Saída:* ${formData.saida}\n` +
      `📅 *Volta:* ${formData.volta}\n` +
      `👥 *Passageiros:* ${formData.adultos} Adultos e ${formData.criancas} Crianças\n\n` +
      `Gostaria de iniciar o planejamento desta jornada exclusiva!`;
    
    window.open(`https://wa.me/5517996077150?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <PageTransition>
      <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
          <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDayTime ? 'bg-black/30' : 'bg-slate-950/80'}`} />
          
          <div className="container relative z-10 px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mb-12"
            >
              <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
                <Sparkles className="w-4 h-4 fill-primary" />
                <span>Atendimento Private Concierge</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold font-serif text-white leading-[1.1] mb-6 drop-shadow-2xl">
                Seu Roteiro <br />
                <span className="italic font-light text-primary">Desenhado à Mão</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
                Criamos experiências singulares que refletem sua personalidade. Sem pacotes prontos, apenas o extraordinário.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-6xl bg-background/60 backdrop-blur-3xl p-2 rounded-[3rem] shadow-2xl border border-white/10"
            >
              <form onSubmit={handleRequestItinerary} className="bg-background rounded-[2.8rem] p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-end">
                
                {/* Destino */}
                <div className="lg:col-span-3 space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
                    <MapPin className="w-3 h-3 text-primary" /> Destino
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Para onde deseja ir?" 
                    className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-2xl focus:border-primary transition-colors placeholder:text-foreground/10"
                    onChange={(e) => setFormData({...formData, destino: e.target.value})}
                  />
                </div>

                {/* Período (Saída e Volta) */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
                      <Calendar className="w-3 h-3 text-primary" /> Saída
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="DD/MM/AA" 
                      className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-xl focus:border-primary transition-colors"
                      onChange={(e) => setFormData({...formData, saida: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
                       Volta
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="DD/MM/AA" 
                      className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-xl focus:border-primary transition-colors"
                      onChange={(e) => setFormData({...formData, volta: e.target.value})}
                    />
                  </div>
                </div>

                {/* Passageiros */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
                      <Users className="w-3 h-3 text-primary" /> Adultos
                    </label>
                    <select 
                      className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-xl cursor-pointer"
                      onChange={(e) => setFormData({...formData, adultos: e.target.value})}
                    >
                      <option value="1">1 Adulto</option>
                      <option value="2" selected>2 Adultos</option>
                      <option value="3">3 Adultos</option>
                      <option value="4+">4+ Adultos</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
                      <Baby className="w-3 h-3 text-primary" /> Crianças
                    </label>
                    <select 
                      className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-xl cursor-pointer"
                      onChange={(e) => setFormData({...formData, criancas: e.target.value})}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3+</option>
                    </select>
                  </div>
                </div>

                {/* Botão de Orçamento */}
                <div className="lg:col-span-2">
                  <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white hover:brightness-110 font-bold shadow-xl shadow-primary/20 group">
                    Solicitar
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <img 
            src="/images/hero-luxury.jpg" 
            className="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-[10s] scale-105 hover:scale-100"
            alt="Luxury Destination"
          />
        </section>

        <WeeklyOffers />
        <AboutJackeline />
        <FeaturedDestinations />
        <Globe3D />
        <FormularioQuestionario />
      </Layout>
    </PageTransition>
  );
}