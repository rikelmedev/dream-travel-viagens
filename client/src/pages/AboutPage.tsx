import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Gem, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useLocation } from 'wouter';
import { setSEOHead } from '@/components/SEOHead';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

export default function AboutPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: 'A Curadora | Dream Travel',
      description: 'Conheça a história de Jackeline e a metodologia por trás das viagens mais exclusivas do mundo.',
      image: '/images/jackeline-perfil.jpg',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Layout>
        <div className="min-h-screen bg-[#FAF9F6]">
          
          {/* HERO EDITORIAL */}
          <section className="pt-40 pb-20 px-6 lg:px-12 overflow-hidden">
            <div className="container max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                
                {/* Imagem Editorial */}
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="absolute inset-0 bg-[#C18D41]/10 translate-x-4 translate-y-4 rounded-[2.5rem] -z-10" />
                  <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-100">
                    <img 
                      src="/images/jackeline-perfil.jpg" 
                      alt="Jackeline - Curadora Chefe" 
                      className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]"
                      onError={(e) => e.currentTarget.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'}
                    />
                  </div>
                </motion.div>

                {/* Texto Hero */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-12 bg-[#C18D41]/50" />
                    <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                      A Fundadora
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-[#05070a] mb-8 font-serif leading-[1.1]">
                    A Arte da <br />
                    <span className="italic font-light text-[#C18D41]">Curadoria</span>
                  </h1>
                  <p className="text-xl text-gray-500 font-light leading-relaxed mb-10">
                    "O verdadeiro luxo não reside apenas no destino, mas na ausência absoluta de preocupações durante a jornada."
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <img src="/images/assinatura-placeholder.png" alt="Assinatura Jackeline" className="h-12 opacity-40 grayscale" onError={(e) => e.currentTarget.style.display='none'} />
                    <div className="text-[10px] uppercase tracking-widest font-bold text-[#05070a]">
                      Jackeline <br />
                      <span className="text-gray-400 font-normal">Head of Travel</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* O MANIFESTO */}
          <section className="py-24 px-6 lg:px-12 bg-white border-y border-gray-100">
            <div className="container max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="flex justify-center mb-12">
                  <Quote className="w-12 h-12 text-[#C18D41]/20" />
                </div>

                <p className="first-letter:text-8xl first-letter:font-serif first-letter:text-[#C18D41] first-letter:float-left first-letter:mr-6 first-letter:-mt-4 text-xl text-[#05070a]/80 font-light leading-loose text-justify">
                  A minha história começou com uma convicção simples: viajar transforma quem somos. Contudo, ao longo de mais de uma década a explorar os cantos mais recônditos e exclusivos do globo, apercebi-me de uma lacuna no mercado. 
                </p>

                <p className="text-xl text-[#05070a]/80 font-light leading-loose text-justify">
                  Muitos viajantes possuíam os meios para aceder ao extraordinário, mas faltava-lhes o bem mais precioso: o tempo para orquestrar a perfeição e o conhecimento interno para aceder ao inacessível.
                </p>

                <p className="text-xl text-[#05070a]/80 font-light leading-loose text-justify">
                  Foi desse vazio que nasceu a Dream Travel. Uma boutique de viagens desenhada não para "vender pacotes", mas para esculpir o tempo dos nossos clientes. Cada roteiro que assino é o resultado de uma rede de contactos globais cultivada meticulosamente, permitindo abrir portas que habitualmente permanecem fechadas ao público em geral.
                </p>
              </motion.div>
            </div>
          </section>

          {/* OS PILARES (Metodologia) */}
          <section className="py-32 px-6 lg:px-12">
            <div className="container max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-[#05070a] font-serif mb-6">A Nossa Metodologia</h2>
                <p className="text-gray-500 font-light">Os três pilares que sustentam a excelência da Dream Travel.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    icon: Compass,
                    title: 'Tailor-Made Absoluto',
                    desc: 'Não trabalhamos com prateleiras. Cada jornada começa com uma folha em branco, desenhada milimetricamente a partir do seu perfil psicológico de viajante.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Acesso Privilegiado',
                    desc: 'A nossa chancela global garante upgrades silenciosos, reservas em mesas impossíveis e acesso a experiências que não constam em nenhum catálogo.',
                  },
                  {
                    icon: Gem,
                    title: 'Concierge Invisível',
                    desc: 'Durante a viagem, orquestramos tudo nos bastidores. A sua única responsabilidade é desfrutar do momento presente com total tranquilidade.',
                  },
                ].map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 hover:border-[#C18D41]/30 transition-colors group text-center"
                  >
                    <div className="w-16 h-16 bg-[#C18D41]/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                      <value.icon className="w-6 h-6 text-[#C18D41]" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#05070a] mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed">
                      {value.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* STATS EDITORIAL */}
          <section className="py-20 px-6 lg:px-12 bg-[#05070a] text-white">
            <div className="container max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
                {[
                  { number: '15+', label: 'Anos de Expertise' },
                  { number: '40+', label: 'Países Mapeados' },
                  { number: '100%', label: 'Confidencialidade' },
                  { number: '24/7', label: 'Suporte Dedicado' },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center px-4"
                  >
                    <p className="text-4xl md:text-6xl font-serif font-bold text-[#C18D41] mb-4">{stat.number}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-32 px-6 lg:px-12 text-center bg-white relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#C18D41] to-transparent opacity-30" />
            <div className="container max-w-2xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-[#05070a] mb-8 font-serif leading-tight">
                Dê o Primeiro Passo <br/><span className="text-[#C18D41] italic font-light">Rumo à Exceção</span>
              </h2>
              <p className="text-xl text-gray-500 font-light mb-12">
                Agende uma consultoria privada e permita-nos desenhar o seu próximo capítulo pelo mundo.
              </p>
              <Button
                onClick={() => setLocation('/contato')}
                className="h-16 bg-[#05070a] hover:bg-[#C18D41] text-white px-10 rounded-2xl uppercase tracking-[0.2em] text-[10px] font-bold shadow-2xl transition-all duration-500 group"
              >
                Solicitar Curadoria Privada <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </section>
          
        </div>
      </Layout>
    </PageTransition>
  );
}