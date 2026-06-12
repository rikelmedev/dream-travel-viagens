import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Globe, ChevronDown } from 'lucide-react';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import Globe3D from '@/components/Globe3D';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PageTransition from '@/components/PageTransition';
import AboutJackeline from '@/components/AboutJackeline';
import FormularioQuestionario from '@/components/FormularioQuestionario';
import ParallaxHero from '@/components/ParallaxHero';
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
      image: '/images/hero-luxury.jpg',
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
        <ParallaxHero
          formData={formData}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
          onSubmit={handleRequestItinerary}
        />

        {/* ── Prova Social ── */}
        <section className="py-16 bg-[#FAF9F6] border-b border-gray-100">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10+', label: 'Anos de Experiencia' },
                { value: '200+', label: 'Clientes Satisfeitos' },
                { value: '40+', label: 'Destinos Curados' },
                { value: '100%', label: 'Atendimento Personalizado' },
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

        {/* ── Beneficios ── */}
        <section className="py-24 bg-[#FAF9F6]">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">Por que nos escolher</span>
                <div className="h-px w-12 bg-[#C18D41]/50" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#05070a] leading-[1.1]">
                A Diferenca que <br />
                <span className="italic font-light text-[#C18D41]">Voce Merece.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Star, title: 'Curadoria de Alto Padrao', desc: 'Cada destino e cuidadosamente selecionado e testado pela Jackeline antes de ser recomendado. Nenhum detalhe e deixado ao acaso.' },
                { icon: Shield, title: 'Planejamento Seguro', desc: 'Do primeiro atendimento ao seu retorno, acompanhamos cada etapa da sua viagem com suporte 24h e resolucao imediata de imprevistos.' },
                { icon: Globe, title: 'Destinos Exclusivos', desc: 'Acesso a experiencias nao encontradas em agencias comuns — hoteis boutique, roteiros privados e vivencias que so a curadoria permite.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="bg-white rounded-[2rem] p-10 border border-gray-100 hover:border-[#C18D41]/30 hover:shadow-xl transition-all duration-500 group">
                  <div className="w-14 h-14 bg-[#C18D41]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C18D41] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#C18D41] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#05070a] mb-3">{title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Depoimentos ── */}
        <section className="py-24 bg-[#05070a]">
          <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">O que dizem nossos clientes</span>
                <div className="h-px w-12 bg-[#C18D41]/50" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[1.1]">
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
                  className="bg-white/[0.04] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.07] transition-colors">
                  <div className="flex text-[#C18D41] mb-5">
                    {Array.from({ length: stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-white/70 font-light leading-relaxed italic mb-6">"{text}"</p>
                  <div className="border-t border-white/10 pt-5">
                    <p className="font-bold text-white text-sm">{name}</p>
                    <p className="text-[#C18D41] text-[10px] uppercase tracking-widest font-bold mt-1">{local}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-[#FAF9F6]">
          <div className="container px-6 lg:px-12 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">Perguntas Frequentes</span>
                <div className="h-px w-12 bg-[#C18D41]/50" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#05070a] leading-[1.1]">
                Ficou com <span className="italic font-light text-[#C18D41]">Duvidas?</span>
              </h2>
            </div>
            <FAQSection />
          </div>
        </section>

        <Globe3D />
        <FormularioQuestionario />
      </Layout>
    </PageTransition>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'Como funciona o processo de planejamento?', a: 'Tudo comeca com uma conversa. Voce preenche o formulario de consultoria ou entra em contato pelo WhatsApp. A Jackeline entende os seus desejos, orcamento e estilo de viagem, e em seguida monta um roteiro completamente personalizado para voce.' },
    { q: 'Quanto tempo leva para receber meu roteiro?', a: 'Apos a primeira consulta, o roteiro inicial e apresentado em ate 3 dias uteis. Refinamentos e ajustes sao feitos juntos ate ficar exatamente como voce sonha.' },
    { q: 'A Dream Travel trabalha com destinos internacionais?', a: 'Sim. A nossa especialidade sao destinos internacionais de alto nivel — Europa, Asia, Maldivas, Americas e muito mais. Trabalhamos com os melhores parceiros em cada destino para garantir experiencias exclusivas.' },
    { q: 'Qual e o perfil de cliente da Dream Travel?', a: 'Atendemos viajantes que valorizam qualidade, personalizacao e tranquilidade acima do preco. Se voce busca uma viagem bem planejada, segura e cheia de momentos especiais, a Dream Travel e para voce.' },
    { q: 'E possivel incluir pedidos de casamento ou celebracoes especiais?', a: 'Absolutamente. Esse e um dos nossos pontos fortes. Organizamos pedidos de casamento em destinos romanticos, aniversarios em ilhas privadas e celebracoes inesqueciveis com todos os detalhes cuidados.' },
    { q: 'Como funciona o suporte durante a viagem?', a: 'Voce viaja com total seguranca. A Jackeline permanece disponivel durante toda a sua jornada para resolver qualquer imprevisto — de um voo cancelado a uma troca de hotel de ultima hora.' },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#C18D41]/20 transition-colors">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-8 py-6 text-left group">
            <span className="font-serif text-[#05070a] font-bold text-lg pr-4">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 text-[#C18D41] shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} className="px-8 pb-6">
              <p className="text-gray-500 font-light leading-relaxed">{faq.a}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}