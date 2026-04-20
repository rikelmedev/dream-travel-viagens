import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Star, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import PageTransition from '@/components/PageTransition';

const MOCK_DESTINATION = {
  id: 'maldivas-premium',
  name: 'Maldivas: O Refúgio dos Sonhos',
  location: 'Atol de Baa, Maldivas',
  duration: '7 Noites / 8 Dias',
  price: 'Sob Consulta',
  rating: '5.0',
  heroImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80'
  ],
  description: `Uma jornada desenhada para transcender a imaginação. Hospede-se num bangalô suspenso sobre águas cristalinas, onde o único som é o do oceano Índico. Este roteiro foi curado pessoalmente pela Jackeline para garantir total privacidade, serviço de mordomo 24h e experiências gastronómicas que celebram a alta culinária local e internacional.`,
  highlights: [
    'Transfer de hidroavião VIP desde Malé',
    'Bangalô Overwater com piscina privativa infinita',
    'Jantar romântico numa ilha deserta exclusiva',
    'Sessão de Spa subaquática para o casal',
    'Mergulho com biólogo marinho privado'
  ],
  itinerary: [
    {
      day: 'Dia 01',
      title: 'A Chegada ao Paraíso',
      desc: 'Receção VIP no aeroporto de Malé, seguida de um voo panorâmico de hidroavião até ao resort. Check-in privativo no seu bangalô e jantar de boas-vindas na praia.'
    },
    {
      day: 'Dia 02 - 06',
      title: 'Dias Livres & Experiências Curadas',
      desc: 'Aproveite o tempo ao seu ritmo. Inclui um dia de cruzeiro ao pôr-do-sol num Dhoni tradicional e um jantar no premiado restaurante subaquático do atol.'
    },
    {
      day: 'Dia 07',
      title: 'Despedida Memorável',
      desc: 'Pequeno-almoço flutuante na sua piscina. Tarde livre no Spa para relaxamento total antes do jantar de despedida sob as estrelas.'
    }
  ]
};

export default function DestinationDetailPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: `${MOCK_DESTINATION.name} | Dream Travel`,
      description: MOCK_DESTINATION.description.substring(0, 150) + '...',
      image: MOCK_DESTINATION.heroImage,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Layout>
        
        <section className="relative h-[70vh] min-h-[600px] w-full bg-slate-900 flex items-end pb-16">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={MOCK_DESTINATION.heroImage} 
              alt={MOCK_DESTINATION.name} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          </div>
          
          <div className="container px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  Curadoria de Luxo
                </span>
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-secondary fill-secondary" />
                  <span>{MOCK_DESTINATION.rating} Excecional</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-4 leading-tight">
                {MOCK_DESTINATION.name}
              </h1>
              <div className="flex items-center gap-6 text-white/80 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{MOCK_DESTINATION.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{MOCK_DESTINATION.duration}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              <div className="lg:col-span-8 space-y-16">
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">A Visão da Especialista</h2>
                  <p className="text-slate-600 text-lg font-light leading-relaxed mb-10">
                    {MOCK_DESTINATION.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1 h-64 rounded-3xl overflow-hidden">
                      <img src={MOCK_DESTINATION.gallery[0]} alt="Galeria" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-4">
                      <div className="h-[120px] rounded-3xl overflow-hidden">
                        <img src={MOCK_DESTINATION.gallery[1]} alt="Galeria" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="h-[120px] rounded-3xl overflow-hidden">
                        <img src={MOCK_DESTINATION.gallery[2]} alt="Galeria" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                >
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-primary" />
                    Experiências Inesquecíveis
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_DESTINATION.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-10 flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-primary" />
                    O Seu Roteiro
                  </h2>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {MOCK_DESTINATION.itinerary.map((item, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300">
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 group-hover:border-primary/20 transition-colors">
                          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">{item.day}</span>
                          <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-32 bg-white p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col">
                  <div className="mb-8">
                    <p className="text-slate-500 font-medium mb-2">Investimento</p>
                    <p className="text-4xl font-serif font-bold text-slate-900">{MOCK_DESTINATION.price}</p>
                    <p className="text-xs text-slate-400 mt-2">*Valor pode variar conforme a época do ano.</p>
                  </div>

                  <div className="space-y-4 mb-8 pt-8 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Duração</span>
                      <span className="text-slate-900">{MOCK_DESTINATION.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-600">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Saída</span>
                      <span className="text-slate-900">Flexível</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setLocation('/contato')}
                    className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800 text-white rounded-2xl group shadow-xl shadow-slate-900/10 mb-4"
                  >
                    Personalizar Roteiro
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <p className="text-center text-xs text-slate-500 font-medium">
                    Sem compromisso. Fale diretamente com a Jackeline.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </Layout>
    </PageTransition>
  );
}