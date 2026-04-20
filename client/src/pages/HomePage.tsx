import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations'; // Importação corrigida
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FormularioQuestionario from '@/components/FormularioQuestionario';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [destination, setDestination] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Viagens Personalizadas por Jackeline',
      description: 'Descubra destinos incríveis e crie memórias inesquecíveis com a Dream Travel.',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-hero-ocean-PEs2wkF3LLaDnS8fYBVMWk.webp',
      url: 'https://dreamtravel.com.br',
    });
  }, []);

  const travelCategories = [
    {
      id: 'island',
      name: 'Island Tours',
      description: 'Explore paradisíacos destinos insulares',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-island-tours-EgtvcPsfg92567X9UUgi3Y.webp',
      duration: '7 Noites',
    },
    {
      id: 'beach',
      name: 'Beach & Relax',
      description: 'Relaxamento total em praias paradisíacas',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-beach-tours-buQrQpJpDiqLLioKtpuP8g.webp',
      duration: '5 Noites',
    },
    {
      id: 'adventure',
      name: 'Adventure Tours',
      description: 'Aventuras emocionantes em montanhas e natureza',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-adventure-tours-5yNKN5XEvzC2Bs58ogNdnr.webp',
      duration: '10 Noites',
    },
    {
      id: 'city',
      name: 'City Tours',
      description: 'Explore cidades cosmopolitas e culturais',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-city-tours-VvZwKDuSbJg3zSHnD35eFh.webp',
      duration: '3 Noites',
    },
  ];

  const handleSearch = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <PageTransition>
      <Layout>
        <section
          className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden pt-20"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-hero-ocean-PEs2wkF3LLaDnS8fYBVMWk.webp')`,
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <motion.div className="relative z-10 container text-center text-white px-4 mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif text-white">Descubra o Extraordinário</h1>
            <p className="text-xl md:text-2xl mb-12 font-light text-white/90">Viagens desenhadas sob medida para o seu momento.</p>

            <motion.div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Destino</label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-white">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <input type="text" placeholder="Para onde?" value={destination} onChange={(e) => setDestination(e.target.value)} className="flex-1 outline-none text-slate-900 bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ida</label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-white">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="flex-1 outline-none text-slate-900 text-sm bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Volta</label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-white">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="flex-1 outline-none text-slate-900 text-sm bg-transparent" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" /> Buscar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Adultos</label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-white">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    <select value={adults} onChange={(e) => setAdults(e.target.value)} className="flex-1 outline-none text-slate-900 bg-transparent">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (<option key={num} value={num}>{num} {num === 1 ? 'Adulto' : 'Adultos'}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Crianças</label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-white">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    <select value={children} onChange={(e) => setChildren(e.target.value)} className="flex-1 outline-none text-slate-900 bg-transparent">
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (<option key={num} value={num}>{num} {num === 0 ? 'Crianças' : num === 1 ? 'Criança' : 'Crianças'}</option>))}
                    </select>
                  </div>
                </div>
                <div className="flex items-end">
                  <div className="w-full p-3 bg-secondary/20 rounded-xl text-sm text-slate-900 text-center font-medium border border-secondary/30">
                    Total: {parseInt(adults) + parseInt(children)} Viajantes
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-24 px-4 bg-slate-50">
          <div className="container max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Qual é seu estilo de viagem?</h2>
              <p className="text-slate-600 text-lg">Curadorias exclusivas para diferentes momentos da sua vida</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {travelCategories.map((category) => (
                <motion.div key={category.id} variants={itemVariants} className="group cursor-pointer rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500" onClick={() => setLocation('/destinos')}>
                  <div className="relative h-72 overflow-hidden">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 font-serif">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-3">{category.description}</p>
                    <span className="inline-block bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{category.duration}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <AboutJackeline />

        <section className="py-24 px-4 bg-white">
          <div className="container max-w-7xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Explore o Mundo em Tempo Real</h2>
              <p className="text-slate-600 text-lg">Gire o globo e clique em qualquer país para descobrir destinos únicos.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50">
              <Globe3D />
            </motion.div>
          </div>
        </section>

        <FeaturedDestinations />

        <section className="relative py-32 px-4 bg-cover bg-center text-white" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')`, backgroundAttachment: 'fixed' }}>
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
          <motion.div className="relative z-10 container text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold mb-6 font-serif">Atendimento Exclusivo</h2>
            <p className="text-xl mb-10 text-white/90 font-light">Nossos especialistas estão prontos para desenhar o seu próximo roteiro inesquecível.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setLocation('/contato')} className="bg-primary text-white hover:bg-primary/90 font-semibold px-8 py-6 rounded-xl text-lg">
                Falar com Consultor
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 font-semibold px-8 py-6 rounded-xl text-lg">
                +55 17 99607-7150
              </Button>
            </div>
          </motion.div>
        </section>

        <div id="contact-form">
          <FormularioQuestionario />
        </div>
        
      </Layout>
    </PageTransition>
  );
}