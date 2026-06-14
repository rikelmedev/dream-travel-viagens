import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, DollarSign, Send } from 'lucide-react';

const atmosferas = ['Desconexão Absoluta', 'Refúgio Romântico', 'Memórias em Família', 'Aventura e Descoberta'];
const estadias = ['Resort / Hotel de Luxo', 'Pousada Boutique', 'Villa Privada', 'Apenas Essencial'];
const logisticas = ['Aéreo e Terrestre', 'Apenas Terrestre', 'Já possuo voos'];

export default function FormularioQuestionario() {
  const [formData, setFormData] = useState({
    destino: '',
    datas: '',
    hospedes: '',
    investimento: '',
    atmosfera: '',
    estadia: '',
    logistica: '',
    detalhes: '',
  });

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const texto =
      `✨ *Nova Solicitação de Curadoria* ✨\n\n` +
      `📍 *Destino:* ${formData.destino}\n` +
      `📅 *Janela de Tempo:* ${formData.datas}\n` +
      `👥 *Hóspedes:* ${formData.hospedes}\n` +
      `💰 *Investimento:* ${formData.investimento}\n\n` +
      `*Preferências:*\n` +
      `• Atmosfera: ${formData.atmosfera || 'Não especificado'}\n` +
      `• Estadia: ${formData.estadia || 'Não especificado'}\n` +
      `• Logística: ${formData.logistica || 'Não especificado'}\n\n` +
      `*Desejos Específicos:*\n${formData.detalhes || 'Nenhum detalhe adicional.'}`;
    window.open(`https://wa.me/5517996077150?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <section className="bg-[#05070a] py-24 md:py-32" id="consultoria">
      <div className="container px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Layout 2 colunas */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── Coluna esquerda — editorial ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-[400px] xl:w-[460px] flex-shrink-0 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#C18D41]/50" />
              <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                Consultoria Personalizada
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl text-white leading-[0.9] mb-8">
              Inicie o Desenho
              <br />
              <span className="italic font-light text-[#C18D41]">da Sua Jornada.</span>
            </h2>

            <p className="text-white/40 font-light leading-relaxed text-sm mb-10 max-w-sm">
              Preencha o formulário ao lado e a Jackeline entrará em contato em até 24 horas para desenhar
              uma experiência à medida do seu sonho.
            </p>

            {/* Stats editoriais */}
            <div className="space-y-6 mb-12">
              {[
                { num: '24h', label: 'Retorno garantido' },
                { num: '100%', label: 'Roteiro personalizado' },
                { num: '0', label: 'Templates genéricos' },
              ].map(({ num, label }) => (
                <div key={label} className="flex items-center gap-5">
                  <span className="font-black text-3xl text-white/15 w-20 flex-shrink-0 tabular-nums">{num}</span>
                  <div className="h-px flex-1 bg-white/8" />
                  <span className="text-white/35 text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp alternativo */}
            <a
              href="https://wa.me/5517996077150"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#C18D41] hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 group"
            >
              Prefere falar diretamente?
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* ── Coluna direita — formulário ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex-1 min-w-0"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#FAF9F6] rounded-3xl p-8 md:p-12 space-y-10"
            >

              {/* Informações básicas — 2 colunas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field icon={<MapPin className="w-4 h-4 text-[#C18D41]" />} label="Destino ou Região">
                  <input
                    required
                    type="text"
                    placeholder="Ex: Costa Amalfitana, Maldivas..."
                    value={formData.destino}
                    onChange={(e) => set('destino', e.target.value)}
                    className="w-full bg-transparent border-b border-[#05070a]/15 py-3 text-base font-serif text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors placeholder:text-[#05070a]/30 placeholder:font-sans placeholder:text-sm"
                  />
                </Field>

                <Field icon={<Calendar className="w-4 h-4 text-[#C18D41]" />} label="Janela de Tempo">
                  <input
                    required
                    type="text"
                    placeholder="Ex: 10 a 20 de Novembro"
                    value={formData.datas}
                    onChange={(e) => set('datas', e.target.value)}
                    className="w-full bg-transparent border-b border-[#05070a]/15 py-3 text-base font-serif text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors placeholder:text-[#05070a]/30 placeholder:font-sans placeholder:text-sm"
                  />
                </Field>

                <Field icon={<Users className="w-4 h-4 text-[#C18D41]" />} label="Número de Hóspedes">
                  <input
                    required
                    type="text"
                    placeholder="Ex: 2 adultos, 1 criança"
                    value={formData.hospedes}
                    onChange={(e) => set('hospedes', e.target.value)}
                    className="w-full bg-transparent border-b border-[#05070a]/15 py-3 text-base font-serif text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors placeholder:text-[#05070a]/30 placeholder:font-sans placeholder:text-sm"
                  />
                </Field>

                <Field icon={<DollarSign className="w-4 h-4 text-[#C18D41]" />} label="Investimento por Pessoa">
                  <input
                    required
                    type="text"
                    placeholder="Ex: R$ 15.000"
                    value={formData.investimento}
                    onChange={(e) => set('investimento', e.target.value)}
                    className="w-full bg-transparent border-b border-[#05070a]/15 py-3 text-base font-serif text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors placeholder:text-[#05070a]/30 placeholder:font-sans placeholder:text-sm"
                  />
                </Field>
              </div>

              <div className="h-px bg-[#05070a]/8" />

              {/* Seleção de estilo */}
              <PillGroup
                label="A Atmosfera Desejada"
                options={atmosferas}
                value={formData.atmosfera}
                onChange={(v) => set('atmosfera', v)}
              />
              <PillGroup
                label="Estilo de Estadia"
                options={estadias}
                value={formData.estadia}
                onChange={(v) => set('estadia', v)}
              />
              <PillGroup
                label="Necessidades Logísticas"
                options={logisticas}
                value={formData.logistica}
                onChange={(v) => set('logistica', v)}
              />

              <div className="h-px bg-[#05070a]/8" />

              {/* Desejos específicos */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#05070a]/50 uppercase tracking-[0.35em] block">
                  Desejos e Detalhes Especiais
                </label>
                <textarea
                  rows={4}
                  placeholder="Pedido de casamento? Restrições alimentares? Passeios específicos? Conte-nos tudo."
                  value={formData.detalhes}
                  onChange={(e) => set('detalhes', e.target.value)}
                  className="w-full bg-white border border-[#05070a]/10 rounded-2xl p-5 text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors placeholder:text-[#05070a]/30 font-light text-sm resize-none"
                />
              </div>

              {/* Botão enviar */}
              <button
                type="submit"
                className="group w-full h-14 bg-[#05070a] hover:bg-[#C18D41] text-white font-bold text-[10px] uppercase tracking-[0.35em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 hover:scale-[1.01]"
              >
                Enviar Solicitação
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="text-center text-[9px] text-[#05070a]/30 uppercase tracking-[0.3em] font-bold">
                Retornaremos em até 24 horas úteis
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-[10px] font-bold text-[#05070a]/50 uppercase tracking-[0.35em]">{label}</label>
      </div>
      {children}
    </div>
  );
}

function PillGroup({ label, options, value, onChange }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-bold text-[#05070a]/50 uppercase tracking-[0.35em] block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(selected ? '' : opt)}
              className={`h-10 px-5 rounded-full text-xs font-bold transition-all duration-300 ${
                selected
                  ? 'bg-[#05070a] text-white'
                  : 'border border-[#05070a]/15 text-[#05070a]/60 hover:border-[#C18D41]/60 hover:text-[#05070a]'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
