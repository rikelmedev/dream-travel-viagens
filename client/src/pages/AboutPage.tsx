import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { setSEOHead } from '@/components/SEOHead';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const PILARES = [
  {
    num: '01',
    title: 'Tailor-Made Absoluto',
    desc: 'Não trabalhamos com prateleiras. Cada jornada começa com uma folha em branco, desenhada milimetricamente a partir do seu perfil psicológico de viajante.',
    tag: 'Sem templates',
  },
  {
    num: '02',
    title: 'Acesso Privilegiado',
    desc: 'A nossa chancela global garante upgrades silenciosos, reservas em mesas impossíveis e acesso a experiências que não constam em nenhum catálogo.',
    tag: 'Rede exclusiva',
  },
  {
    num: '03',
    title: 'Concierge Invisível',
    desc: 'Durante a viagem, orquestramos tudo nos bastidores. A sua única responsabilidade é desfrutar do momento presente com total tranquilidade.',
    tag: 'Suporte 24/7',
  },
];

const STATS = [
  { num: '15+', label: 'Anos de expertise' },
  { num: '40+', label: 'Países mapeados' },
  { num: '100%', label: 'Confidencialidade' },
  { num: '24/7', label: 'Suporte dedicado' },
];

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

        {/* ── Hero — escuro, editorial ── */}
        <section className="bg-[#05070a] pt-36 pb-0 px-6 lg:px-12 overflow-hidden">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-end gap-12 lg:gap-20">

              {/* Texto */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2 pb-16 lg:pb-24"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8 bg-[#C18D41]/50" />
                  <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">A Fundadora</span>
                </div>

                <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white leading-[0.88] mb-10">
                  A Arte da<br />
                  <span className="italic font-light text-[#C18D41]">Curadoria.</span>
                </h1>

                <blockquote className="border-l-2 border-[#C18D41]/40 pl-6 mb-10">
                  <p className="text-white/50 font-serif text-lg font-light italic leading-relaxed">
                    "O verdadeiro luxo não reside apenas no destino, mas na ausência absoluta de preocupações durante a jornada."
                  </p>
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C18D41]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C18D41] font-black text-xs">J</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Jackeline</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Head of Travel</p>
                  </div>
                </div>
              </motion.div>

              {/* Foto editorial — ancora no fundo */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2 relative self-end"
              >
                <div className="aspect-[3/4] max-h-[75vh] overflow-hidden rounded-t-[2rem]">
                  <img
                    src="/images/jackeline-perfil.jpg"
                    alt="Jackeline — Curadora Chefe"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/60 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Manifesto — creme ── */}
        <section className="bg-[#FAF9F6] py-24 px-6 lg:px-12">
          <div className="container max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px w-8 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">O Manifesto</span>
              </div>

              <p className="first-letter:text-8xl first-letter:font-serif first-letter:text-[#C18D41] first-letter:float-left first-letter:mr-5 first-letter:leading-none first-letter:-mt-3 text-xl text-[#05070a]/75 font-light leading-loose">
                A minha história começou com uma convicção simples: viajar transforma quem somos. Contudo, ao longo de mais de uma década a explorar os cantos mais recônditos e exclusivos do globo, apercebi-me de uma lacuna no mercado.
              </p>

              <p className="text-xl text-[#05070a]/75 font-light leading-loose">
                Muitos viajantes possuíam os meios para aceder ao extraordinário, mas faltava-lhes o bem mais precioso: o tempo para orquestrar a perfeição e o conhecimento interno para aceder ao inacessível.
              </p>

              <p className="text-xl text-[#05070a]/75 font-light leading-loose">
                Foi desse vazio que nasceu a Dream Travel. Uma boutique de viagens desenhada não para "vender pacotes", mas para esculpir o tempo dos nossos clientes. Cada roteiro que assino é o resultado de uma rede de contactos globais cultivada meticulosamente, permitindo abrir portas que habitualmente permanecem fechadas ao público em geral.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Metodologia — escuro, numerada ── */}
        <section className="bg-[#05070a] py-24 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-[#C18D41]/50" />
                  <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">A Nossa Metodologia</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  Três Pilares,<br />
                  <span className="italic font-light text-[#C18D41]">Uma Obsessão.</span>
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/35 text-sm font-light max-w-xs leading-relaxed md:text-right"
              >
                Os princípios que nos guiam em cada experiência criada.
              </motion.p>
            </div>

            <div className="divide-y divide-white/8">
              {PILARES.map(({ num, title, desc, tag }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr_240px] gap-6 md:gap-12 py-10 items-start hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-2xl cursor-default"
                >
                  <span className="font-black text-5xl md:text-6xl text-white/10 group-hover:text-[#C18D41]/30 transition-colors duration-500 leading-none tabular-nums select-none">
                    {num}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-[#C18D41] transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-white/45 font-light leading-relaxed text-sm max-w-xl">{desc}</p>
                  </div>
                  <div className="hidden md:flex items-start justify-end pt-1">
                    <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-white/20 group-hover:text-[#C18D41]/50 transition-colors duration-300 border border-white/10 group-hover:border-[#C18D41]/30 px-4 py-2 rounded-full">
                      {tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats — creme ── */}
        <section className="bg-[#FAF9F6] py-24 px-6 lg:px-12 border-y border-gray-100">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-[#05070a]/8">
              {STATS.map(({ num, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-center px-4"
                >
                  <p className="font-serif font-bold text-5xl md:text-6xl text-[#C18D41] mb-3 tabular-nums">{num}</p>
                  <p className="text-[9px] uppercase tracking-[0.35em] font-bold text-[#05070a]/40">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — escuro ── */}
        <section className="bg-[#05070a] py-24 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold mb-6">
                Pronto para começar?
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                Dê o Primeiro Passo<br />
                <span className="italic font-light text-[#C18D41]">Rumo à Exceção.</span>
              </h2>
              <p className="text-white/35 font-light text-sm max-w-md mx-auto mb-10 leading-relaxed">
                Agende uma consultoria privada e permita-nos desenhar o seu próximo capítulo pelo mundo.
              </p>
              <button
                onClick={() => { window.location.href = '/#formulario'; }}
                className="group inline-flex items-center gap-3 bg-[#C18D41] hover:bg-[#A67632] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Solicitar Curadoria Privada
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

      </Layout>
    </PageTransition>
  );
}
