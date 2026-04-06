import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMapForm } from '@/contexts/MapFormContext';

/**
 * Formulário Questionário Dream Travel
 * Design: Conversão focada em leads
 * - Perguntas progressivas (uma por vez)
 * - Emojis e tom amigável
 * - Integração com WhatsApp
 */

interface FormData {
  destino: string;
  datas: string;
  pessoas: string;
  tipoViagem: string;
  hospedagem: string;
  preferencia: string;
  transporte: string;
  orcamento: string;
  especial: string;
}

const QUESTIONS = [
  {
    id: 'destino',
    label: '1️⃣ Destino desejado:',
    placeholder: 'ex: Serra Negra, Gramado, Porto de Galinhas...',
    type: 'text',
  },
  {
    id: 'datas',
    label: '2️⃣ Datas da viagem:',
    placeholder: 'ex: 10 a 15 de novembro',
    type: 'text',
  },
  {
    id: 'pessoas',
    label: '3️⃣ Quantas pessoas vão?',
    placeholder: 'ex: 2',
    type: 'number',
  },
  {
    id: 'tipoViagem',
    label: '4️⃣ Tipo de viagem:',
    type: 'select',
    options: [
      { value: 'relaxar', label: '🌿 Relaxar' },
      { value: 'romantica', label: '🍷 Romântica' },
      { value: 'familia', label: '🎢 Família' },
      { value: 'aventura', label: '🌄 Aventura' },
      { value: 'luxo', label: '💎 Luxo' },
    ],
  },
  {
    id: 'hospedagem',
    label: '5️⃣ Vai precisar de hospedagem?',
    type: 'select',
    options: [
      { value: 'sim', label: '✅ Sim' },
      { value: 'nao', label: '❌ Não' },
    ],
  },
  {
    id: 'preferencia',
    label: '6️⃣ Preferência:',
    type: 'select',
    options: [
      { value: 'hotel', label: '🏨 Hotel / Resort' },
      { value: 'pousada', label: '🏡 Pousada / Chalé' },
      { value: 'economico', label: '💰 Econômico' },
      { value: 'conforto', label: '💎 Conforto' },
    ],
  },
  {
    id: 'transporte',
    label: '7️⃣ Vai precisar de transporte (aéreo ou terrestre)?',
    type: 'select',
    options: [
      { value: 'sim', label: '✈️ Sim' },
      { value: 'nao', label: '🚗 Não' },
    ],
  },
  {
    id: 'orcamento',
    label: '8️⃣ Orçamento aproximado por pessoa:',
    placeholder: 'ex: R$ 3.000',
    type: 'text',
  },
  {
    id: 'especial',
    label: '9️⃣ Quer incluir algo especial?',
    placeholder: 'ex: passeio, vinícola, city tour, gastronomia, etc.',
    type: 'text',
  },
];

export default function FormularioQuestionario() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    destino: '',
    datas: '',
    pessoas: '',
    tipoViagem: '',
    hospedagem: '',
    preferencia: '',
    transporte: '',
    orcamento: '',
    especial: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { selectedDestinationName } = useMapForm();

  // Preencher destino automaticamente quando selecionado no mapa
  useEffect(() => {
    if (selectedDestinationName) {
      setFormData((prev) => ({
        ...prev,
        destino: selectedDestinationName,
      }));
    }
  }, [selectedDestinationName]);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleInputChange = (value: string) => {
    setFormData({
      ...formData,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Montar mensagem para WhatsApp
    const mensagem = `
Olá Jackeline! 💕

Recebi um novo lead da Dream Travel! ✈️

*Informações do Cliente:*
1️⃣ Destino: ${formData.destino}
2️⃣ Datas: ${formData.datas}
3️⃣ Pessoas: ${formData.pessoas}
4️⃣ Tipo de viagem: ${formData.tipoViagem}
5️⃣ Hospedagem: ${formData.hospedagem}
6️⃣ Preferência: ${formData.preferencia}
7️⃣ Transporte: ${formData.transporte}
8️⃣ Orçamento: ${formData.orcamento}
9️⃣ Especial: ${formData.especial}

Preparar roteiro completo! 🌍💖
    `.trim();

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/5517996077150?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setCurrentStep(0);
      setFormData({
        destino: '',
        datas: '',
        pessoas: '',
        tipoViagem: '',
        hospedagem: '',
        preferencia: '',
        transporte: '',
        orcamento: '',
        especial: '',
      });
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 to-secondary/5" id="formulario-section">
      <div className="container max-w-2xl">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Questionário Rápido – Dream Travel ✈️
            </h2>
            <p className="text-muted-foreground">
              Oi! 💕 Pra eu montar seu roteiro perfeito, me responde rapidinho 👇
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Pergunta {currentStep + 1} de {QUESTIONS.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <motion.div
              className="h-2 bg-border rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </motion.div>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key={currentStep}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-foreground mb-4">
                    {currentQuestion.label}
                  </label>

                  {currentQuestion.type === 'text' || currentQuestion.type === 'number' ? (
                    <input
                      type={currentQuestion.type}
                      placeholder={currentQuestion.placeholder}
                      value={formData[currentQuestion.id as keyof FormData]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  ) : (
                    <select
                      value={formData[currentQuestion.id as keyof FormData]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      {currentQuestion.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex-1 px-4 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Voltar
                  </motion.button>

                  {currentStep < QUESTIONS.length - 1 ? (
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Próximo <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-secondary hover:bg-secondary/90 text-primary font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enviar para WhatsApp <Send className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.form>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Perfeito! 🎉
                </h3>
                <p className="text-muted-foreground mb-4">
                  Sua mensagem foi enviada para o WhatsApp da Jackeline!
                </p>
                <p className="text-sm text-muted-foreground">
                  Ela vai responder em breve com seu roteiro personalizado 🌍💖
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Message */}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✈️ Dream Travel – Transformando sonhos em viagens reais!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
