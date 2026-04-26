import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;
  const navStyles = isTransparent 
    ? "bg-transparent border-transparent pt-6" 
    : "bg-background/80 backdrop-blur-2xl border-b border-border/40 shadow-sm py-4";

  const textColor = isTransparent ? "text-white" : "text-foreground";
  const btnStyles = isTransparent 
    ? "bg-white/10 hover:bg-white/20 text-white border-white/20" 
    : "bg-primary text-white hover:shadow-primary/20 shadow-lg";

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/destinos', label: 'Destinos' },
    { href: '/sobre', label: 'Curadoria' },
    { href: '/blog', label: 'Journal' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ease-in-out px-4 md:px-8 ${navStyles}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO -*/}
        <Link href="/">
          <a className={`font-serif text-2xl md:text-3xl font-bold tracking-tighter transition-colors ${textColor}`}>
            DREAM<span className="font-light italic opacity-80">TRAVEL</span>
          </a>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative group ${textColor} ${location === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all group-hover:w-full" />
                </a>
              </Link>
            ))}
          </div>
          <div className="h-4 w-px bg-current/20" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
              className={`rounded-full h-11 px-8 text-[10px] font-bold uppercase tracking-widest border transition-all ${btnStyles}`}
            >
              Consultoria
            </Button>
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${isTransparent ? 'text-white bg-white/10' : 'text-foreground bg-foreground/5'}`}
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-background/98 backdrop-blur-3xl border-b border-border overflow-hidden"
          >
            <div className="container px-6 py-10 flex flex-col gap-6 pb-[env(safe-area-inset-bottom)]">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a onClick={() => setIsOpen(false)} className="text-3xl font-serif text-foreground/90 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </Link>
              ))}
              <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs mt-4">
                Falar com Jackeline
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}