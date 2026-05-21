import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent("Olá Jackeline, estava a explorar o site da Dream Travel e gostaria de iniciar o planeamento de uma viagem exclusiva com a sua curadoria.");
  const whatsappLink = `https://wa.me/5517996077150?text=${whatsappMessage}`;

  return (
    <footer className="relative bg-[#05070a] pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C18D41]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* SECÇÃO 1: O Convite VIP (Newsletter) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#C18D41]/50" />
            <span className="text-[#C18D41] font-bold uppercase tracking-[0.5em] text-[10px]">
              O Círculo Restrito
            </span>
            <div className="h-px w-12 bg-[#C18D41]/50" />
          </div>
          
          <h3 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-[1.1]">
            Inspiração de alto padrão <br/>
            <span className="italic font-light text-[#C18D41]">na sua caixa de entrada.</span>
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-0 w-full max-w-lg bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl hover:border-white/20 transition-colors">
            <input 
              type="email" 
              placeholder="O seu melhor e-mail" 
              className="flex-1 bg-transparent px-8 py-4 text-white focus:outline-none placeholder:text-white/30 font-light text-sm text-center sm:text-left"
            />
            <Button className="rounded-full h-14 px-10 bg-[#C18D41] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#A67632] transition-all shadow-lg shadow-[#C18D41]/20">
              Descobrir
            </Button>
          </div>
        </motion.div>

        {/* SECÇÃO 2: Navegação e Marca */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Marca e Descrição */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 pr-0 md:pr-12"
          >
            <Link href="/">
              <a className="font-serif text-3xl font-bold tracking-tighter text-white block mb-6 hover:text-[#C18D41] transition-colors">
                DREAM<span className="font-light italic text-[#C18D41]">TRAVEL</span>
              </a>
            </Link>
            <p className="text-white/50 font-light text-sm leading-loose mb-10 max-w-sm">
              Curadoria especializada em roteiros sob medida para viajantes que exigem o extraordinário. Sem pacotes prontos, apenas obras de arte globais desenhadas para si.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/70">
              <a href="https://www.instagram.com/dream_travelviagens/" target="_blank" rel="noreferrer" className="hover:text-[#C18D41] transition-colors relative group py-2">
                Instagram
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C18D41] transition-all duration-300 group-hover:w-full" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-[#C18D41] transition-colors relative group py-2">
                WhatsApp
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C18D41] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </motion.div>

          {/* Links de Navegação */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 md:col-start-7"
          >
            <h4 className="font-bold text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-8">Explorar</h4>
            <ul className="space-y-5 text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">
              <li>
                <Link href="/">
                  <a className="hover:text-[#C18D41] transition-colors">Início</a>
                </Link>
              </li>
              <li>
                <Link href="/destinos">
                  <a className="hover:text-[#C18D41] transition-colors">Portfólio Global</a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a className="hover:text-[#C18D41] transition-colors">A Curadora</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="hover:text-[#C18D41] transition-colors">Journal</a>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contato Rápido & Acesso VIP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 flex flex-col justify-between"
          >
            <div>
              <h4 className="font-bold text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-8">Atendimento</h4>
              <ul className="space-y-4">
                <li>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(whatsappLink, '_blank')}
                    className="w-full rounded-full h-14 border-white/10 bg-transparent text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[9px] font-bold"
                  >
                    Falar com Jackeline
                  </Button>
                </li>
              </ul>
            </div>

            {/* Acesso Cliente VIP */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <Link href="/viplogin">
                <a className="flex items-center justify-between group p-4 rounded-2xl bg-white/5 hover:bg-[#C18D41]/10 border border-white/5 hover:border-[#C18D41]/30 transition-all">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1 group-hover:text-[#C18D41]/80 transition-colors">Já é cliente?</span>
                    <span className="block text-xs font-serif text-white group-hover:text-[#C18D41] transition-colors">Acesso ao Roteiro VIP</span>
                  </div>
                  <Lock className="w-4 h-4 text-white/30 group-hover:text-[#C18D41] transition-colors" />
                </a>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* SECÇÃO 3: Assinatura Final */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30"
        >
          <p>&copy; {currentYear} DREAM TRAVEL. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#C18D41] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[#C18D41] transition-colors">Termos</a>
            <Link href="/admin">
              <a className="hover:text-white transition-colors opacity-30 hover:opacity-100">Control Room</a>
            </Link>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}