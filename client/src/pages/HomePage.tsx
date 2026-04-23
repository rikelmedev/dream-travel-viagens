import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Sparkles } from 'lucide-react';
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

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { isDayTime } = useTheme();

  // Estado com campos livres para passageiros
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
    // Mensagem formatada para o WhatsApp
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
          <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDayTime ? 'bg-black/30' : 'bg-slate-950/80'}`} />
          
          <div className="container relative z-10 px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mb-12"
            >
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
                    placeholder="Para onde?" 
                    className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-2xl focus:border-primary transition-colors placeholder:text-foreground/10"
                    onChange={(e) => setFormData({...formData, destino: e.target.value})}
                  />
                </div>

                {/* Período */}
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
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
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
                    <input 
                      type="text" 
                      placeholder="Qtd" 
                      className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-xl focus:border-primary transition-colors"
                      onChange={(e) => setFormData({...formData, adultos: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">
                       Crianças
                    </label>
                    <input 
                      type="text" 
                      placeholder="Qtd" 
                      className="w-full bg-transparent border-b border-border/50 py-3 outline-none text-foreground font-serif text-xl focus:border-primary transition-colors"
                      onChange={(e) => setFormData({...formData, criancas: e.target.value})}
                    />
                  </div>
                </div>

                {/* Botão */}
                <div className="lg:col-span-2">
                  <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white hover:brightness-110 font-bold shadow-xl shadow-primary/20 group">
                    Solicitar
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-luxury.jpg')",}} >
  
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
  </div>
        </section>

        <AboutJackeline />
        <FeaturedDestinations />
        <Globe3D />
        <FormularioQuestionario />
      </Layout>
    </PageTransition>
  );
}