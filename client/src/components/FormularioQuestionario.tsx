import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/painel/button';

export default function FormularioQuestionario() {
  const [formData, setFormData] = useState({
    destino: '',
    datas: '',
    hospedes: '',
    investimento: '',
    atmosfera: '',
    estadia: '',
    logistica: '',
    detalhes: ''
  });

  const atmosferas = ['Desconexão Absoluta', 'Refúgio Romântico', 'Memórias em Família', 'Aventura e Descoberta'];
  const estadias = ['Resort / Hotel de Luxo', 'Pousada Boutique', 'Villa Privada', 'Apenas Essencial'];
  const logisticas = ['Aéreo e Terrestre', 'Apenas Terrestre', 'Já possuo voos'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const texto = `✨ *Nova Solicitação de Curadoria* ✨\n\n` +
      `📍 *Destino:* ${formData.destino}\n` +
      `📅 *Janela de Tempo:* ${formData.datas}\n` +
      `👥 *Hóspedes:* ${formData.hospedes}\n` +
      `💰 *Expectativa de Investimento:* ${formData.investimento}\n\n` +
      `*Preferências do Roteiro:*\n` +
      `• Atmosfera: ${formData.atmosfera || 'Não especificado'}\n` +
      `• Estilo de Estadia: ${formData.estadia || 'Não especificado'}\n` +
      `• Logística: ${formData.logistica || 'Não especificado'}\n\n` +
      `*Desejos Específicos:*\n${formData.detalhes || 'Nenhum detalhe adicional.'}`;

    const whatsappLink = `https://wa.me/5517996077150?text=${encodeURIComponent(texto)}`;
    window.open(whatsappLink, '_blank');
  };

  const InputSection = ({ label, type = "text", field, placeholder }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">{label}</label>
      <input 
        required 
        type={type} 
        placeholder={placeholder}
        onChange={(e) => setFormData({...formData, [field]: e.target.value})}
        className="w-full bg-transparent border-b border-border/60 py-3 text-lg font-serif text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30 placeholder:font-sans placeholder:text-base"
      />
    </div>
  );

  const SelectionGroup = ({ label, options, field }: any) => (
    <div className="flex flex-col gap-4">
      <label className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt: string) => {
          const isSelected = formData[field as keyof typeof formData] === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setFormData({...formData, [field]: opt})}
              className={`h-12 px-6 rounded-full text-xs font-bold transition-all duration-300 ${
                isSelected 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'border border-border/60 text-foreground/70 hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative" id="consultoria">
      <div className="container px-4 md:px-8 max-w-4xl mx-auto">
        
        {/* Cabeçalho do Formulário */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consultoria Personalizada</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.1]"
          >
            Inicie o Desenho <br />
            <span className="italic font-light text-foreground/70">da Sua Jornada.</span>
          </motion.h2>
        </div>

        {/* O Formulário */}
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          onSubmit={handleSubmit} 
          className="bg-background rounded-[3rem] p-8 md:p-16 shadow-elite border border-border/40"
        >
          <div className="space-y-12">
            
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <InputSection label="Destino ou Região" field="destino" placeholder="Ex: Costa Amalfitana, Maldivas..." />
              <InputSection label="Janela de Tempo" field="datas" placeholder="Ex: 10 a 15 de Novembro" />
              <InputSection label="Número de Hóspedes" field="hospedes" placeholder="Ex: 2 adultos, 1 criança" />
              <InputSection label="Expectativa de Investimento (por pessoa)" field="investimento" placeholder="Ex: R$ 15.000" />
            </div>

            <div className="h-px w-full bg-border/40" />

            {/* Opções de Estilo */}
            <SelectionGroup label="A Atmosfera Desejada" field="atmosfera" options={atmosferas} />
            <SelectionGroup label="Estilo de Estadia" field="estadia" options={estadias} />
            <SelectionGroup label="Necessidades Logísticas" field="logistica" options={logisticas} />

            <div className="h-px w-full bg-border/40" />

            {/* Detalhes Especiais */}
            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">
                Detalhes e Desejos Específicos
              </label>
              <textarea 
                rows={4}
                placeholder="Celebração de bodas? Restrições alimentares? Passeios específicos? Conte-nos tudo."
                onChange={(e) => setFormData({...formData, detalhes: e.target.value})}
                className="w-full bg-transparent border border-border/60 rounded-2xl p-6 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30 font-light resize-none"
              />
            </div>

            {/* Botão de Envio */}
            <div className="pt-4">
              <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                Enviar Solicitação
                <Send className="w-4 h-4" />
              </Button>
              <p className="text-center text-[10px] text-foreground/40 uppercase tracking-widest mt-6 font-bold">
                Retornaremos o contacto em até 24 horas úteis.
              </p>
            </div>

          </div>
        </motion.form>
      </div>
    </section>
  );
}