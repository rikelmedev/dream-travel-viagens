import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/painel/button';

export default function AssistenteVIP() {
  const [step, setStep] = useState(1);
  const [leadData, setLeadData] = useState({
    destino: '',
    nivelExperiencia: '',
    companhia: '',
    urgencia: ''
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else finalizeQualification();
  };

  const finalizeQualification = () => {
    const texto = `🌟 *Solicitação de Acesso VIP* 🌟\n\n` +
      `*Destino Desejado:* ${leadData.destino}\n` +
      `*Padrão da Experiência:* ${leadData.nivelExperiencia}\n` +
      `*Companhia:* ${leadData.companhia}\n` +
      `*Previsão de Viagem:* ${leadData.urgencia}\n\n` +
      `Gostaria de iniciar o desenho deste roteiro com a curadoria Dream Travel.`;

    const whatsappLink = `https://wa.me/5517996077150?text=${encodeURIComponent(texto)}`;
    window.open(whatsappLink, '_blank');
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-12 justify-center">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#C18D41]' : 'bg-white/10'}`} />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[#05070a] relative flex items-center justify-center min-h-[80vh]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c53cd381615a?w=1600&q=80')] bg-cover bg-center opacity-5 mix-blend-luminosity" />
      
      <div className="container relative z-10 px-6 max-w-2xl mx-auto">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-14 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-4 h-4 text-[#C18D41]" />
              <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.4em] font-bold">
                Concierge Digital
              </span>
              <Sparkles className="w-4 h-4 text-[#C18D41]" />
            </div>
          </div>

          <StepIndicator />

          <div className="min-h-[250px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-serif text-white text-center leading-tight">
                    Qual o destino que não sai <br/><span className="text-[#C18D41] italic">da sua mente?</span>
                  </h3>
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Ex: Costa Amalfitana, Maldivas, Alpes..."
                    value={leadData.destino}
                    onChange={(e) => setLeadData({...leadData, destino: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-5 text-white text-lg focus:outline-none focus:border-[#C18D41] transition-all text-center"
                  />
                  <Button 
                    onClick={handleNext} 
                    disabled={!leadData.destino}
                    className="w-full h-14 bg-[#C18D41] hover:bg-[#A67632] text-white rounded-xl uppercase tracking-[0.2em] text-[10px] font-bold disabled:opacity-50 disabled:hover:bg-[#C18D41]"
                  >
                    Continuar <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-serif text-white text-center leading-tight">
                    Qual o padrão de experiência <br/><span className="text-[#C18D41] italic">desejado?</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {['Boutique & Charme Exclusivo', 'Luxo 5 Estrelas Tradicional', 'Ultra Luxo & Villas Privativas'].map((opcao) => (
                      <button
                        key={opcao}
                        onClick={() => { setLeadData({...leadData, nivelExperiencia: opcao}); handleNext(); }}
                        className="w-full py-5 px-6 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-[#C18D41] hover:border-[#C18D41] transition-all text-sm tracking-wide"
                      >
                        {opcao}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-serif text-white text-center leading-tight">
                    Com quem irá partilhar <br/><span className="text-[#C18D41] italic">esta jornada?</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Viagem a Dois', 'Em Família', 'Solo', 'Grupo de Amigos'].map((opcao) => (
                      <button
                        key={opcao}
                        onClick={() => { setLeadData({...leadData, companhia: opcao}); handleNext(); }}
                        className="py-5 px-4 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-[#C18D41] hover:border-[#C18D41] transition-all text-sm tracking-wide text-center"
                      >
                        {opcao}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#C18D41]/20 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#C18D41]" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif text-white leading-tight">
                    Perfil mapeado com <br/><span className="text-[#C18D41] italic">sucesso.</span>
                  </h3>
                  <p className="text-gray-400 font-light text-sm max-w-sm mx-auto">
                    A nossa equipa ira analisar as suas preferencias. Avance para o WhatsApp para receber o atendimento exclusivo da curadora.
                  </p>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={finalizeQualification} 
                      className="w-full h-14 bg-[#C18D41] hover:bg-[#A67632] text-white rounded-xl uppercase tracking-[0.2em] text-[10px] font-bold shadow-lg shadow-[#C18D41]/20"
                    >
                      Aceder ao Atendimento VIP
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}