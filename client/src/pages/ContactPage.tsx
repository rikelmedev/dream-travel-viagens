import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { toast } from 'sonner';
import { setSEOHead } from '@/components/SEOHead';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

export default function ContactPage() {
  useEffect(() => {
    setSEOHead({
      title: 'Consultoria Privada | Dream Travel',
      description: 'Inicie o diálogo com a nossa curadora e comece a desenhar a sua próxima jornada exclusiva.',
      url: 'https://dreamtravel.com.br/contato',
    });
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor, preencha os campos essenciais para podermos prosseguir.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const whatsappNumber = '5517996077150';
      const message = `🌟 *Solicitação de Consultoria* 🌟\n\n*Nome:* ${formData.name}\n*Email:* ${formData.email}\n*Telefone:* ${formData.phone}\n*Destino/Assunto:* ${formData.subject}\n\n*Visão da Viagem:*\n${formData.message}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
      toast.success('Redirecionando para o nosso Concierge VIP no WhatsApp.');
    }, 800);
  };

  return (
    <PageTransition>
      <Layout>
        <div className="min-h-screen bg-[#FAF9F6] pb-24">
          
          {/* HERO SECTION */}
          <section className="pt-40 pb-16 px-6 lg:px-12 text-center">
            <div className="container max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-12 bg-[#C18D41]/50" />
                  <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Atendimento Exclusivo
                  </span>
                  <div className="h-px w-12 bg-[#C18D41]/50" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-[#05070a] mb-6 font-serif leading-[1.1]">
                  Inicie o seu <br />
                  <span className="italic font-light text-[#C18D41]">Diálogo</span>
                </h1>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                  Permita-nos conhecer a sua visão. A nossa equipa está pronta para transformar os seus desejos num roteiro milimetricamente orquestrado.
                </p>
              </motion.div>
            </div>
          </section>

          {/* SPLIT CONTENT */}
          <section className="py-12 px-6 lg:px-12">
            <div className="container max-w-6xl mx-auto">
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden flex flex-col lg:flex-row">
                
                {/* INFO COLUMN  */}
                <div className="lg:w-2/5 bg-[#05070a] p-12 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C18D41]/10 blur-[80px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 mb-16">
                    <h3 className="text-3xl font-serif font-bold mb-6">Contactos <br/><span className="italic text-[#C18D41] font-light">Diretos</span></h3>
                    <p className="text-white/60 font-light leading-relaxed mb-12">
                      A nossa curadoria atua globalmente, acompanhando os nossos clientes em todos os fusos horários.
                    </p>

                    <div className="space-y-8">
                      <div className="group flex items-start gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C18D41]/20 group-hover:border-[#C18D41]/50 transition-colors">
                          <Phone className="w-4 h-4 text-[#C18D41]" />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">WhatsApp & Telefone</p>
                          <a href="tel:+5517996077150" className="text-lg font-light hover:text-[#C18D41] transition-colors tracking-wide">
                            +55 (17) 99607-7150
                          </a>
                        </div>
                      </div>

                      <div className="group flex items-start gap-5">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#C18D41]/20 group-hover:border-[#C18D41]/50 transition-colors">
                          <Mail className="w-4 h-4 text-[#C18D41]" />
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">E-mail Principal</p>
                          <a href="mailto:jackeline@dreamtravel.com.br" className="text-lg font-light hover:text-[#C18D41] transition-colors tracking-wide">
                            jackeline@dreamtravel.com.br
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-12 border-t border-white/10">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-6">Siga a nossa jornada</p>
                    <div className="flex gap-4">
                      {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                        <a 
                          key={social} 
                          href="#" 
                          className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#C18D41] transition-colors"
                        >
                          {social}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FORM COLUMN */}
                <div className="lg:w-3/5 p-12 md:p-16">
                  <h2 className="text-2xl font-serif font-bold text-[#05070a] mb-10">
                    Solicitar Consultoria
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent border-b border-gray-200 py-4 text-sm font-light text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors peer placeholder-transparent"
                          placeholder="Nome"
                          id="name"
                        />
                        <label htmlFor="name" className="absolute left-0 top-4 text-sm font-light text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#C18D41] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-3 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                          O seu nome
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-transparent border-b border-gray-200 py-4 text-sm font-light text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors peer placeholder-transparent"
                          placeholder="Email"
                          id="email"
                        />
                        <label htmlFor="email" className="absolute left-0 top-4 text-sm font-light text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#C18D41] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-3 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                          E-mail de contacto
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-transparent border-b border-gray-200 py-4 text-sm font-light text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors peer placeholder-transparent"
                          placeholder="Telefone"
                          id="phone"
                        />
                        <label htmlFor="phone" className="absolute left-0 top-4 text-sm font-light text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#C18D41] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-3 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                          Telefone / WhatsApp
                        </label>
                      </div>

                      <div className="relative group">
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-transparent border-b border-gray-200 py-4 text-sm font-light text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors peer placeholder-transparent"
                          placeholder="Assunto"
                          id="subject"
                        />
                        <label htmlFor="subject" className="absolute left-0 top-4 text-sm font-light text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#C18D41] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-3 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                          Destino em mente
                        </label>
                      </div>
                    </div>

                    <div className="relative group pt-4">
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-gray-200 py-4 text-sm font-light text-[#05070a] focus:outline-none focus:border-[#C18D41] transition-colors peer placeholder-transparent resize-none h-32"
                        placeholder="Mensagem"
                        id="message"
                      />
                      <label htmlFor="message" className="absolute left-0 top-4 text-sm font-light text-gray-400 transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#C18D41] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-6 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">
                        Partilhe a sua visão para esta viagem...
                      </label>
                    </div>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto h-16 px-12 bg-[#05070a] hover:bg-[#C18D41] text-white rounded-2xl uppercase tracking-[0.2em] text-[10px] font-bold transition-all shadow-xl shadow-[#05070a]/10 flex items-center justify-center gap-3 group"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            Enviar Pedido <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </section>

        </div>
      </Layout>
    </PageTransition>
  );
}