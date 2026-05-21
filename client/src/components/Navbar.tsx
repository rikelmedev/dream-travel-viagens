import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = !isScrolled;
  
  const navBg = isTransparent 
    ? "bg-transparent pt-8 pb-4" 
    : "bg-[#05070a]/95 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl";

  const textColor = "text-white hover:text-[#C18D41]";
  const logoColor = "text-white";

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/destinos', label: 'Destinos' },
    { href: '/sobre', label: 'Curadoria' },
    { href: '/blog', label: 'Journal' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 lg:px-12 ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/">
          <a className={`font-serif text-2xl md:text-3xl font-bold tracking-tighter transition-colors ${logoColor} relative z-50`}>
            DREAM<span className="font-light italic text-[#C18D41]">TRAVEL</span>
          </a>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative group py-2 ${textColor} ${location === link.href ? 'opacity-100' : 'opacity-70'}`}>
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#C18D41]"
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C18D41] transition-all duration-500 group-hover:w-full opacity-50" />
                </a>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-6 pl-4 border-l border-white/10">
            <Button 
              onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
              className="rounded-full h-12 px-8 text-[10px] font-bold uppercase tracking-widest bg-[#C18D41] text-white hover:bg-[#A67632] hover:scale-105 transition-all shadow-lg shadow-[#C18D41]/20 border border-transparent"
            >
              Atendimento VIP
            </Button>
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="lg:hidden flex items-center gap-5 relative z-50">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU FULLSCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-[#05070a] z-40 flex flex-col"
          >
            {/* Brilho de fundo Menu */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C18D41]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center px-10 pt-20">
              <div className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    key={link.href}
                  >
                    <Link href={link.href}>
                      <a onClick={() => setIsOpen(false)} className={`text-4xl md:text-5xl font-serif transition-colors flex items-center gap-6 group ${location === link.href ? 'text-[#C18D41]' : 'text-white hover:text-gray-300'}`}>
                        <span className="text-[#C18D41] text-xs font-sans tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                        {link.label}
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-16 pt-10 border-t border-white/10"
              >
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-6">Fale com a Curadora</p>
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    window.open('https://wa.me/5517996077150', '_blank');
                  }}
                  className="w-full h-16 rounded-2xl bg-[#C18D41] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#A67632] border border-white/10 shadow-xl shadow-[#C18D41]/20"
                >
                  Consultoria WhatsApp
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}