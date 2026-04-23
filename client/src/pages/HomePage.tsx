import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Sparkles } from 'lucide-react';
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
        {/* SECÇÃO HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          
          <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
            isDayTime 
              ? 'bg-gradient-to-b from-black/50 via-transparent to-black/40' 
              : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90'
          }`} />
          
          <div className="container relative z-20 px-4 flex flex-col items-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mb-12"
            >
              <h1 className="text-6xl md:text-8xl font-bold font-serif text-white leading-[1.0] mb-8 drop-shadow-2xl">
                Onde o Luxo <br />
                <span className="italic font-light text-primary">Encontra a Sua Alma</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
                Esqueça roteiros genéricos. Criamos jornadas exclusivas que refletem a sua essência.
              </p>
            </motion.div>

            {/* FORMULÁRIO */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-6xl bg-slate-950/20 backdrop-blur-xl p-2.5 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
            >
              <form onSubmit={handleRequestItinerary} className="bg-slate-900/40 rounded-[3rem] p-4 lg:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
                
                {/* Campo: Destino */}
                <div className="lg:col-span-3 group relative px-6 py-4 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <label className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
                    <MapPin className="w-3 h-3 text-primary" /> Destino
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Para onde?" 
                    className="w-full bg-transparent outline-none text-white font-serif text-xl placeholder:text-white/20"
                    onChange={(e) => setFormData({...formData, destino: e.target.value})}
                  />
                </div>

                {/* Bloco: Período */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                  <div className="group px-6 py-4 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <label className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
                      <Calendar className="w-3 h-3 text-primary" /> Saída
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="DD/MM" 
                      className="w-full bg-transparent outline-none text-white font-serif text-xl"
                      onChange={(e) => setFormData({...formData, saida: e.target.value})}
                    />
                  </div>
                  <div className="group px-6 py-4 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
                      Retorno
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="DD/MM" 
                      className="w-full bg-transparent outline-none text-white font-serif text-xl"
                      onChange={(e) => setFormData({...formData, volta: e.target.value})}
                    />
                  </div>
                </div>

                {/* Bloco: Passageiros */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                  <div className="group px-6 py-4 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <label className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
                      <Users className="w-3 h-3 text-primary" /> Adultos
                    </label>
                    <input 
                      type="text" 
                      placeholder="Qtd" 
                      className="w-full bg-transparent outline-none text-white font-serif text-xl"
                      onChange={(e) => setFormData({...formData, adultos: e.target.value})}
                    />
                  </div>
                  <div className="group px-6 py-4 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">
                      Crianças
                    </label>
                    <input 
                      type="text" 
                      placeholder="Qtd" 
                      className="w-full bg-transparent outline-none text-white font-serif text-xl"
                      onChange={(e) => setFormData({...formData, criancas: e.target.value})}
                    />
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="lg:col-span-2 flex items-center p-1">
                  <Button type="submit" className="w-full h-full min-h-[64px] rounded-[2rem] bg-primary text-white hover:scale-[1.02] transition-transform font-bold shadow-xl shadow-primary/20 group text-base uppercase tracking-widest">
                    Solicitar
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <img 
            src="/images/hero-luxury.jpg" 
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[15s] scale-110 hover:scale-100"
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