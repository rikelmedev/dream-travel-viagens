import { Link } from 'wouter';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent("Olá Jackeline, estava a explorar o site da Dream Travel e gostaria de iniciar o planeamento de uma viagem exclusiva com a sua curadoria.");
  const whatsappLink = `https://wa.me/5517996077150?text=${whatsappMessage}`;

  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border/20 relative overflow-hidden">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* SECÇÃO 1: O Convite VIP (Newsletter) */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
            <Sparkles className="w-3 h-3" />
            <span>O Círculo Restrito</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-8">
            Inspiração de alto padrão <br/>
            <span className="italic font-light text-foreground/70">na sua caixa de entrada.</span>
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input 
              type="email" 
              placeholder="O seu melhor e-mail" 
              className="flex-1 bg-transparent border-b border-foreground/20 px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40 font-light"
            />
            <Button className="rounded-full h-12 px-8 bg-primary text-white font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              Descobrir
            </Button>
          </div>
        </div>

        {/* SECÇÃO 2: Navegação e Marca */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Marca e Redes Sociais */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <a className="font-serif text-3xl font-bold tracking-tighter text-foreground block mb-6">
                DREAM<span className="font-light italic opacity-70">TRAVEL</span>
              </a>
            </Link>
            <p className="text-foreground/60 font-light max-w-sm mb-8 leading-relaxed">
              Curadoria especializada em roteiros sob medida para viajantes que exigem o extraordinário. Sem pacotes prontos, apenas obras de arte globais.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-foreground/80">
              <a href="https://www.instagram.com/dream_travelviagens/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors relative group">
                Instagram
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors relative group">
                WhatsApp
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
              </a>
            </div>
          </div>

          {/* Links de Navegação */}
          <div>
            <h4 className="font-bold text-foreground font-serif uppercase tracking-[0.2em] text-[11px] mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm font-light text-foreground/70">
              <li>
                <Link href="/">
                  <a className="hover:text-primary transition-colors relative group inline-block">Início<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" /></a>
                </Link>
              </li>
              <li>
                <Link href="/destinos">
                  <a className="hover:text-primary transition-colors relative group inline-block">Portfólio de Destinos<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" /></a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a className="hover:text-primary transition-colors relative group inline-block">A Curadora<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" /></a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatos Rápido */}
          <div>
            <h4 className="font-bold text-foreground font-serif uppercase tracking-[0.2em] text-[11px] mb-6">Contato</h4>
            <ul className="space-y-4 text-sm font-light text-foreground/70">
              <li className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => window.open(whatsappLink, '_blank')}
                  className="rounded-full h-12 px-6 border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all uppercase tracking-widest text-[9px] font-bold"
                >
                  Falar com Jackeline
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* SECÇÃO 3: Assinatura Final (Direitos Autorais) */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40">
          <p>&copy; {currentYear} DREAM TRAVEL</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Serviço</a>
          </div>
        </div>

      </div>
    </footer>
  );
}