import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
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

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Viagens Personalizadas por Jackeline',
      description: 'Descubra destinos incríveis e crie memórias inesquecíveis com a Dream Travel.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-hero-ocean-PEs2wkF3LLaDnS8fYBVMWk.webp',
      url: 'https://dreamtravel.com.br',
    });
    window.scrollTo(0,0);
  }, []);

  const travelCategories = [
    {
      id: 'island',
      name: 'Island Tours',
      description: 'Explore paradisíacos destinos insulares',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      duration: '7 Noites',
    },
    {
      id: 'beach',
      name: 'Beach & Relax',
      description: 'Relaxamento total em praias paradisíacas',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      duration: '5 Noites',
    },
    {
      id: 'adventure',
      name: 'Adventure Tours',
      description: 'Aventuras emocionantes em montanhas e natureza',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      duration: '10 Noites',
    },
    {
      id: 'city',
      name: 'City Tours',
      description: 'Explore cidades cosmopolitas e culturais',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      duration: '3 Noites',
    },
  ];

  return (
    <PageTransition>
      <Layout>
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24">
          <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDayTime ? 'bg-black/20' : 'bg-slate-950/80'}`} />
          
          <div className="container relative z-10 px-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-5xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                Curadoria de Viagens de Elite
              </span>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-white leading-[0.9] mb-8 drop-shadow-2xl">
                Onde o Luxo <br />
                <span className="italic font-light text-primary">Encontra a Alma</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
                Não apenas destinos. Criamos jornadas sensoriais desenhadas sob medida para o seu estilo de vida.
              </p>
            </motion.div>

            {/* CAIXA DE BUSCA*/}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-6xl bg-background/60 backdrop-blur-3xl p-2 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/10 transition-colors duration-1000"
            >
              <div className="bg-background/90 rounded-[2.2rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center transition-colors duration-1000">
                <div className="px-4 border-b md:border-b-0 md:border-r border-border/50 pb-4 md:pb-0 group">
                  <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">Destino</label>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <input type="text" placeholder="Para onde?" className="bg-transparent outline-none text-foreground font-serif text-xl placeholder:text-foreground/20 w-full" />
                  </div>
                </div>

                <div className="px-4 border-b md:border-b-0 lg:border-r border-border/50 pb-4 md:pb-0">
                  <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Check-in</label>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <input type="text" placeholder="Data" className="bg-transparent outline-none text-foreground font-serif text-xl w-full" />
                  </div>
                </div>

                <div className="px-4 pb-4 lg:pb-0">
                  <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Viajantes</label>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-serif text-xl">02 Adultos</span>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    const el = document.getElementById('destinos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-16 rounded-[1.8rem] bg-primary text-white hover:brightness-110 font-bold text-lg shadow-2xl shadow-primary/20 group w-full"
                >
                  Começar Jornada
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>

          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-hero-ocean-PEs2wkF3LLaDnS8fYBVMWk.webp"
            className="absolute inset-0 w-full h-full object-cover -z-10 scale-105"
            alt="Experiência Dream Travel"
          />
        </section>

        {/* 2. CATEGORIAS DE VIAGEM */}
        <section className="py-24 px-4 bg-background transition-colors duration-1000">
          <div className="container max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">Qual é seu estilo de viagem?</h2>
              <p className="text-foreground/60 text-lg">Curadorias exclusivas para diferentes momentos da sua vida</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {travelCategories.map((category, idx) => (
                <motion.div 
                  key={category.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 hover:shadow-2xl transition-all duration-500" 
                  onClick={() => setLocation('/destinos')}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 font-serif">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-3">{category.description}</p>
                    <span className="inline-block bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{category.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. HUMANIZAÇÃO: SOBRE A JACKELINE */}
        <AboutJackeline />

        {/* 4. GLOBO 3D */}
        <section className="py-24 px-4 bg-background transition-colors duration-1000">
          <div className="container max-w-7xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">Explore o Mundo</h2>
              <p className="text-foreground/60 text-lg">Gire o globo e clique para descobrir destinos únicos.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <Globe3D />
            </motion.div>
          </div>
        </section>

        <FeaturedDestinations />

        <FormularioQuestionario />
        
      </Layout>
    </PageTransition>
  );
}