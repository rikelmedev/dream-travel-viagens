import { Link } from 'wouter';
import { Instagram, Facebook, Twitter, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Coluna 1: Sobre a Marca */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6 font-serif">Dream Travel</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Transformando sonhos em experiências inesquecíveis. Nossa missão é desenhar roteiros exclusivos que conectam você à essência de cada destino.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-6 font-serif">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Início</Link>
              </li>
              <li>
                <Link href="/destinos" className="hover:text-primary transition-colors">Destinos</Link>
              </li>
              <li>
                <Link href="/pacotes" className="hover:text-primary transition-colors">Pacotes Especiais</Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-primary transition-colors">Quem Somos</Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-primary transition-colors">Contato</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato Direto */}
          <div className="md:col-span-1">
             <h3 className="text-xl font-bold text-white mb-6 font-serif">Fale Conosco</h3>
             <p className="text-slate-400 mb-6 leading-relaxed">
               Pronto para planejar sua próxima viagem? Nossos consultores estão disponíveis.
             </p>
             <div className="space-y-4">
               <a href="https://wa.me/5517996077150" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                 <Phone className="w-5 h-5 text-primary" />
                 <span>+55 17 99607-7150</span>
               </a>
               <a href="mailto:contato@dreamtravel.com.br" className="flex items-center gap-3 hover:text-primary transition-colors">
                 <Mail className="w-5 h-5 text-primary" />
                 <span>contato@dreamtravel.com.br</span>
               </a>
             </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Dream Travel. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}