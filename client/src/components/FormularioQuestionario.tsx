import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palmtree, Mountain, Building, Heart, 
  Users, User, Baby, Calendar, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const QUESTIONS = [
  {
    id: 'vibe',
    question: 'Qual é o clima ideal para a sua próxima viagem?',
    options: [
      { id: 'praia', label: 'Praia & Descanso', icon: Palmtree },
      { id: 'natureza', label: 'Natureza & Aventura', icon: Mountain },
      { id: 'cidade', label: 'Cultura & Cidade', icon: Building },
      { id: 'romance', label: 'Refúgio Romântico', icon: Heart },
    ]
  },
  {
    id: 'company',
    question: 'Quem vai partilhar esta experiência consigo?',
    options: [
      { id: 'casal', label: 'Em Casal', icon: Heart },
      { id: 'familia', label: 'Em Família', icon: Baby },
      { id: 'amigos', label: 'Com Amigos', icon: Users },
      { id: 'solo', label: 'Viajante Solo', icon: User },
    ]
  },
  {
    id: 'duration',
    question: 'Qual a duração perfeita para esta jornada?',
    options: [
      { id: 'curta', label: 'Escapadinha (até 5 dias)', icon: Calendar },
      { id: 'media', label: 'Uma Semana Ideal (7 a 10 dias)', icon: Calendar },
      { id: 'longa', label: 'Imersão Total (Mais de 12 dias)', icon: Calendar },
    ]
  }
];

export default function FormularioQuestionario() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (questionId: string, optionLabel: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
    setTimeout(() => {
      if (currentStep < QUESTIONS.length) {
        setCurrentStep(prev => prev + 1);
      }
    }, 400);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const text = `Olá Jackeline! Sou o(a) *${contactInfo.name}* e gostaria de planear uma viagem exclusiva.\n\n` +
      `✨ *As minhas preferências:*\n` +
      `🌴 Clima: ${answers['vibe']}\n` +
      `👥 Companhia: ${answers['company']}\n` +
      `⏱️ Duração: ${answers['duration']}\n\n` +
      `Podemos conversar sobre as possibilidades?`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5517996077150?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      // Resetar form após envio
      setCurrentStep(0);
      setAnswers({});
      setContactInfo({ name: '', phone: '' });
    }, 1000);
  };

  const progress = ((currentStep) / (QUESTIONS.length + 1)) * 100;

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="concierge">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 rounded-l-[100px] opacity-50 -z-10" />
      
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-4">
            Desenhe a sua <span className="italic text-primary">Jornada</span>
          </h2>
          <p className="text-slate-500 text-lg">Responda a 3 breves perguntas e deixe a nossa curadoria fazer o resto.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-100 p-8 md:p-12 min-h-[450px] flex flex-col relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {currentStep < QUESTIONS.length ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
                    Passo 0{currentStep + 1} de 0{QUESTIONS.length}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-10 leading-tight">
                    {QUESTIONS[currentStep].question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUESTIONS[currentStep].options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = answers[QUESTIONS[currentStep].id] === option.label;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(QUESTIONS[currentStep].id, option.label)}
                          className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                            isSelected 
                              ? 'border-primary bg-primary/5 shadow-md' 
                              : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-primary text-white' : 'bg-white text-slate-400 group-hover:text-slate-600 shadow-sm'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`font-bold text-lg ${isSelected ? 'text-primary' : 'text-slate-700'}`}>
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-md mx-auto w-full text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">
                    Tudo pronto!
                  </h3>
                  <p className="text-slate-500 mb-8">
                    Para quem devemos enviar esta curadoria exclusiva?
                  </p>

                  <form onSubmit={handleFinalSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-2">Como prefere ser chamado?</label>
                      <input 
                        type="text" 
                        required
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                        placeholder="O seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 ml-2">O seu WhatsApp</label>
                      <input 
                        type="tel" 
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800 text-white rounded-2xl mt-4 group shadow-xl shadow-slate-900/10"
                    >
                      {isSubmitting ? 'A processar roteiro...' : 'Falar com a Curadora'}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}