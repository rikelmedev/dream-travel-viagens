import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/' || location === '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;
  
  const navBg = isTransparent 
    ? "bg-transparent pt-6" 
    : "bg-background/80 backdrop-blur-2xl border-b border-border/40 py-4 shadow-sm";

  const textColor = isTransparent ? "text-white" : "text-foreground";
  const logoColor = isTransparent ? "text-white" : "text-primary";

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/destinos', label: 'Destinos' },
    { href: '/sobre', label: 'Curadoria' },
    { href: '/blog', label: 'Journal' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-12 ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO EDITORIAL */}
        <Link href="/">
          <a className={`font-serif text-2xl md:text-3xl font-bold tracking-tighter transition-colors ${logoColor}`}>
            DREAM<span className="font-light italic opacity-80">TRAVEL</span>
          </a>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative group ${textColor} ${location === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                </a>
              </Link>
            ))}
          </div>
          <Button 
            onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
            className={`rounded-full h-11 px-8 text-[10px] font-bold uppercase tracking-widest border transition-all ${isTransparent ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-primary text-white'}`}
          >
            Consultoria
          </Button>
        </div>

        {/* BOTÃO MOBILE */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isTransparent ? 'text-white bg-white/10' : 'text-foreground bg-foreground/5'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE EXPANSÍVEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-background/98 backdrop-blur-3xl border-b border-border shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-12 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a onClick={() => setIsOpen(false)} className="text-4xl font-serif text-foreground/90 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </Link>
              ))}
              <Button 
                onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
                className="w-full h-16 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs mt-4 shadow-xl"
              >
                Falar com a Curadora
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}