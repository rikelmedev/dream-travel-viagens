import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FeaturedPackages from '@/components/FeaturedPackages';
import FormularioQuestionario from '@/components/FormularioQuestionario';
import SliderHero from '@/components/SliderHero';
import { useLocation } from 'wouter';

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    destino: '',
    saida: '',
    volta: '',
    hospedes: ''
  });

  useEffect(() => {
    setSEOHead({
      title: 'Dream Travel | Curadoria de Viagens Exclusivas',
      description: 'Experiências singulares desenhadas milimetricamente para si.',
    });
    window.scrollTo(0,0);
  }, []);

  const handleRequestItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `✨ *Solicitação de Roteiro Personalizado* ✨\n\n` +
      `📍 *Destino:* ${formData.destino}\n` +
      `📅 *Ida:* ${formData.saida}\n` +
      `📅 *Volta:* ${formData.volta}\n` +
      `👥 *Hóspedes:* ${formData.hospedes || 'Não informado'}\n\n` +
      `Gostaria de iniciar o planejamento desta jornada exclusiva!`;
    
    window.open(`https://wa.me/5517996077150?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <PageTransition>
      <Layout>
        <SliderHero />

        {/* ── Prova Social ── */}
        <section className="py-16 bg-[#FAF9F6] border-b border-gray-100">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10+', label: 'Anos de Curadoria' },
                { value: '200+', label: 'Jornadas Desenhadas' },
                { value: '40+', label: 'Destinos Visitados' },
                { value: '0', label: 'Roteiros Repetidos' },
              ].map(({ value, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                  <p className="text-4xl md:text-5xl font-serif font-bold text-[#C18D41]">{value}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AboutJackeline />
        <FeaturedDestinations />
        <FeaturedPackages />

        {/* ── Beneficios ── */}
        <section className="py-24 bg-[#05070a]">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">

            {/* Header split */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-[#C18D41]/50" />
                  <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">Por que nos escolher</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                  O que nos separa <br />
                  <span className="italic font-light text-[#C18D41]">de todo o resto.</span>
                </h2>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="text-white/40 text-sm font-light max-w-xs leading-relaxed md:text-right">
                Cada viagem é desenhada uma única vez — para uma única pessoa. Nunca repetimos um roteiro.
              </motion.p>
            </div>

            {/* Lista editorial numerada */}
            <div className="divide-y divide-white/8">
              {[
                {
                  num: '01',
                  title: 'Curadoria de Alto Padrao',
                  desc: 'Cada destino e pessoalmente testado pela Jackeline antes de ser recomendado. Nenhum hotel, restaurante ou experiencia entra no portfolio sem passar pelo seu crivo exigente.',
                  tag: 'Selecao pessoal',
                },
                {
                  num: '02',
                  title: 'Presença em Cada Etapa',
                  desc: 'Do primeiro contacto ao seu regresso, a Jackeline acompanha cada momento. Disponível em qualquer fuso horário, para que o único pensamento durante a viagem seja o próximo lugar a descobrir.',
                  tag: 'Suporte contínuo',
                },
                {
                  num: '03',
                  title: 'Destinos Exclusivos',
                  desc: 'Acesso a experiencias que nao existem em agencias comuns: hoteis boutique fora dos roteiros turisticos, jantares privados, transfers em classe executiva e vivencias unicas.',
                  tag: 'Acesso privilegiado',
                },
              ].map(({ num, title, desc, tag }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr_260px] gap-6 md:gap-12 py-10 items-start hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-2xl cursor-default"
                >
                  {/* Numero */}
                  <span className="font-black text-5xl md:text-6xl text-white/10 group-hover:text-[#C18D41]/30 transition-colors duration-500 leading-none tabular-nums select-none">
                    {num}
                  </span>

                  {/* Titulo + descricao */}
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-[#C18D41] transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-white/45 font-light leading-relaxed text-sm max-w-xl">
                      {desc}
                    </p>
                  </div>

                  {/* Tag lateral — visivel apenas em md+ */}
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

        {/* ── Depoimentos ── */}
        <section className="py-24 bg-[#FAF9F6]">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">O que dizem nossos clientes</span>
                <div className="h-px w-12 bg-[#C18D41]/50" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#05070a] leading-[1.1]">
                Historias que <span className="italic font-light text-[#C18D41]">nos Inspiram.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Ana Carolina', local: 'Maldivas', stars: 5, text: 'A Jackeline transformou o nosso aniversario de casamento numa experiencia que nunca esqueceremos. Cada detalhe foi perfeito, desde o resort ate os jantares privados na praia.' },
                { name: 'Roberto e Claudia', local: 'Italia', stars: 5, text: 'Fomos para a Costa Amalfitana sem preocupacao nenhuma. O roteiro foi tao bem pensado que conseguimos viver como locais — restaurantes secretos, trilhas exclusivas e um barco privado.' },
                { name: 'Patricia Souza', local: 'Japao', stars: 5, text: 'Viajar para o Japao era um sonho que parecia impossivel de organizar. A Jackeline tornou tudo simples e magico ao mesmo tempo. Recomendo de olhos fechados.' },
              ].map(({ name, local, stars, text }, i) => (
                <motion.div key={name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-[#C18D41]/20 transition-all duration-500">
                  <div className="flex text-[#C18D41] mb-5">
                    {Array.from({ length: stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-500 font-light leading-relaxed italic mb-6">"{text}"</p>
                  <div className="border-t border-gray-100 pt-5">
                    <p className="font-bold text-[#05070a] text-sm">{name}</p>
                    <p className="text-[#C18D41] text-[10px] uppercase tracking-widest font-bold mt-1">{local}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-[#05070a]">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

              {/* Coluna esquerda — titulo fixo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:w-72 xl:w-96 flex-shrink-0"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#C18D41]/50" />
                  <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">FAQ</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
                  Antes de iniciar <br />
                  <span className="italic font-light text-[#C18D41]">a sua jornada.</span>
                </h2>
                <p className="text-white/35 text-sm font-light leading-relaxed mb-10">
                  As perguntas que os nossos clientes fazem antes de confiar a nós a próxima viagem.
                </p>
                <a
                  href="https://wa.me/5517996077150"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#C18D41] hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 group"
                >
                  Falar com a Jackeline
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              {/* Coluna direita — accordion */}
              <div className="flex-1 divide-y divide-white/8">
                <FAQSection />
              </div>
            </div>
          </div>
        </section>

        <Globe3D />
        <div id="formulario"><FormularioQuestionario /></div>
      </Layout>
    </PageTransition>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'Como funciona o processo de planejamento?', a: 'Tudo comeca com uma conversa. Voce preenche o formulario de consultoria ou entra em contato pelo WhatsApp. A Jackeline entende os seus desejos, orcamento e estilo de viagem, e em seguida monta um roteiro completamente personalizado para voce.' },
    { q: 'Quanto tempo leva para receber meu roteiro?', a: 'Após a primeira consulta, o roteiro inicial é apresentado em até 3 dias. Refinamentos e ajustes são feitos juntos até que cada detalhe esteja exatamente como imaginou.' },
    { q: 'A Dream Travel trabalha com destinos internacionais?', a: 'Sim. A nossa especialidade sao destinos internacionais de alto nivel — Europa, Asia, Maldivas, Americas e muito mais. Trabalhamos com os melhores parceiros em cada destino para garantir experiencias exclusivas.' },
    { q: 'Qual e o perfil de cliente da Dream Travel?', a: 'Atendemos viajantes que colocam a experiência acima do preço. Pessoas que já viajaram antes, sabem o que querem e precisam de alguém que saiba como entregar — sem improvisos, sem templates.' },
    { q: 'E possivel incluir pedidos de casamento ou celebracoes especiais?', a: 'Absolutamente. Esse e um dos nossos pontos fortes. Organizamos pedidos de casamento em destinos romanticos, aniversarios em ilhas privadas e celebracoes inesqueciveis com todos os detalhes cuidados.' },
    { q: 'Como funciona o suporte durante a viagem?', a: 'Voce viaja com total seguranca. A Jackeline permanece disponivel durante toda a sua jornada para resolver qualquer imprevisto — de um voo cancelado a uma troca de hotel de ultima hora.' },
  ];

  return (
    <>
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between py-7 text-left group gap-6"
          >
            <span className={`font-serif text-lg leading-snug transition-colors duration-300 ${open === i ? 'text-[#C18D41]' : 'text-white/80 group-hover:text-white'}`}>
              {faq.q}
            </span>
            <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${open === i ? 'border-[#C18D41] bg-[#C18D41]/10 rotate-45' : 'border-white/20 group-hover:border-white/40'}`}>
              <ChevronDown className={`w-3 h-3 transition-all duration-300 ${open === i ? 'text-[#C18D41] -rotate-45' : 'text-white/40'}`} />
            </span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/40 font-light leading-relaxed pb-7 text-sm max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}