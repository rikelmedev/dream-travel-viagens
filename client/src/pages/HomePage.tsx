import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FormularioQuestionario from '@/components/FormularioQuestionario';

export default function HomePage() {
  const [formData, setFormData] = useState({ destino: '', saida: '', volta: '', hospedes: '' });

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Roteiros Desenhados à Mão',
      description: 'Experiências exclusivas de luxo com curadoria da Jackeline.',
      image: '/images/hero-luxury.jpg',
    });
  }, []);

  return (
    <PageTransition>
      <Layout>
        {/* HERO SECTION */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          
          {/* Textura e Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
          <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

          <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mb-12"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
                <Sparkles size={12} className="text-primary fill-primary" />
                <span className="text-[9px] text-white uppercase tracking-[0.4em] font-bold">Experiências Privada</span>
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-serif font-bold text-white leading-[0.9] mb-8">
                Seu Sonho, <br />
                <span className="italic font-light text-white/80">Sob Medida.</span>
              </h1>
            </motion.div>

            {/* FORMULÁRIO RESPONSIVO */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-5xl"
            >
              <form className="bg-slate-900/40 backdrop-blur-3xl border border-white/15 p-2 rounded-[2.5rem] lg:rounded-full flex flex-col lg:flex-row items-center gap-1 shadow-2xl">
                
                {/* Input Destino */}
                <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/5 rounded-full transition-all group">
                  <MapPin size={18} className="text-primary opacity-60" />
                  <div className="flex-1">
                    <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Para onde?</label>
                    <input required type="text" placeholder="Explore o mundo" className="w-full bg-transparent outline-none text-white font-serif text-lg placeholder:text-white/20" onChange={(e) => setFormData({...formData, destino: e.target.value})} />
                  </div>
                </div>

                <div className="hidden lg:block w-px h-10 bg-white/10" />

                {/* Datas e Hóspedes */}
                <div className="w-full lg:w-auto grid grid-cols-2 lg:flex lg:items-center">
                  <div className="px-8 py-4 hover:bg-white/5 rounded-full transition-all cursor-text border-r border-white/5 lg:border-none">
                    <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Ida</label>
                    <input type="text" placeholder="DD/MM" className="w-20 bg-transparent outline-none text-white font-serif text-lg" />
                  </div>
                  <div className="px-8 py-4 hover:bg-white/5 rounded-full transition-all cursor-text">
                    <label className="block text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Volta</label>
                    <input type="text" placeholder="DD/MM" className="w-20 bg-transparent outline-none text-white font-serif text-lg" />
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="w-full lg:w-auto p-1">
                  <Button type="submit" className="w-full lg:w-auto h-16 lg:h-16 px-10 rounded-full bg-primary text-white hover:scale-[1.03] active:scale-95 transition-all font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                    Solicitar Orçamento
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <img src="/images/hero-luxury.jpg" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[20s] scale-110" alt="Fundo Dream Travel" />
        </section>

        {/* Restante das seções adaptadas */}
        <AboutJackeline />
        <FeaturedDestinations />
        <Globe3D />
        <FormularioQuestionario />
      </Layout>
    </PageTransition>
  );
}