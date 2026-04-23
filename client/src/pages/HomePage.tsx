import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
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
    adultos: '',
    criancas: ''
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
      `👥 *Adultos:* ${formData.adultos || 'Não informado'}\n` +
      `👶 *Crianças:* ${formData.criancas || 'Nenhuma'}\n\n` +
      `Gostaria de iniciar o planejamento desta jornada exclusiva!`;
    
    window.open(`https://wa.me/5517996077150?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <PageTransition>
      <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
          {/* Overlay Dinâmico */}
          <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isDayTime ? 'bg-black/40' : 'bg-slate-950/85'}`} />
          
          <div className="container relative z-20 px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mb-16"
            > 
              <h1 className="text-5xl md:text-8xl font-bold font-serif text-white leading-[1.1] mb-6 drop-shadow-2xl">
                Seu Roteiro <br />
                <span className="italic font-light text-primary">Desenhado à Mão</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
                Criamos experiências singulares que refletem sua personalidade. 
                Sem pacotes prontos, apenas o extraordinário.
              </p>
            </motion.div>

            {/* FORMULÁRIO */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-6xl bg-background/40 backdrop-blur-3xl p-3 rounded-[3.5rem] shadow-2xl border border-white/10"
            >
              <form onSubmit={handleRequestItinerary} className="bg-background rounded-[3rem] p-4 lg:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
                
                {/* Campo: Destino */}
                <div className="lg:col-span-3 group relative px-6 py-4 rounded-3xl bg-foreground/[0.02] border border-transparent hover:border-primary/20 transition-all duration-300">
                  <label className="flex items-center gap-2 text-[9px] font-bold text-foreground/40 uppercase tracking-widest mb-1">
                    <MapPin className="w-3 h-3 text-primary" /> Destino
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Para onde?" 
                    className="w-full bg-transparent outline-none text-foreground font-serif text-xl placeholder:text-foreground/20"
                    onChange={(e) => setFormData({...formData, destino: e.target.value})}
                  />
                </div>

                {/* Bloco: Período */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                  <div className="group px-6 py-4 rounded-3xl bg-foreground/[0.02] border border-transparent hover:border-primary/20 transition-all duration-300">
                    <label className="flex items-center gap-2 text-[9px] font-bold text-foreground/40 uppercase tracking-widest mb-1">
                      <Calendar className="w-3 h-3 text-primary" /> Ida
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="DD/MM" 
                      className="w-full bg-transparent outline-none text-foreground font-serif text-xl"
                      onChange={(e) => setFormData({...formData, saida: e.target.value})}
                    />
                  </div>
                  <div className="group px-6 py-4 rounded-3xl bg-foreground/[0.02] border border-transparent hover:border-primary/20 transition-all duration-300">
                    <label className="flex items-center gap-2 text-[9px] font-bold text-foreground/40 uppercase tracking-widest mb-1 text-center justify-center">
                      Volta
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="DD/MM" 
                      className="w-full bg-transparent outline-none text-foreground font-serif text-xl"
                      onChange={(e) => setFormData({...formData, volta: e.target.value})}
                    />
                  </div>
                </div>

                {/* Bloco: Passageiros */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-2">
                  <div className="group px-6 py-4 rounded-3xl bg-foreground/[0.02] border border-transparent hover:border-primary/20 transition-all duration-300">
                    <label className="flex items-center gap-2 text-[9px] font-bold text-foreground/40 uppercase tracking-widest mb-1">
                      <Users className="w-3 h-3 text-primary" /> Adultos
                    </label>
                    <input 
                      type="text" 
                      placeholder="Qtd" 
                      className="w-full bg-transparent outline-none text-foreground font-serif text-xl"
                      onChange={(e) => setFormData({...formData, adultos: e.target.value})}
                    />
                  </div>
                  <div className="group px-6 py-4 rounded-3xl bg-foreground/[0.02] border border-transparent hover:border-primary/20 transition-all duration-300">
                    <label className="flex items-center gap-2 text-[9px] font-bold text-foreground/40 uppercase tracking-widest mb-1">
                      Crianças
                    </label>
                    <input 
                      type="text" 
                      placeholder="Qtd" 
                      className="w-full bg-transparent outline-none text-foreground font-serif text-xl"
                      onChange={(e) => setFormData({...formData, criancas: e.target.value})}
                    />
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="lg:col-span-2 flex items-center p-1">
                  <Button type="submit" className="w-full h-full min-h-[64px] rounded-[2rem] bg-primary text-white hover:brightness-110 font-bold shadow-xl shadow-primary/20 group text-base">
                    Solicitar
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <img 
            src="/images/hero-luxury.jpg" 
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[10s] scale-105"
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