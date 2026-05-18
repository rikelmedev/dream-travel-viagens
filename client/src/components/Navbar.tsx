import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
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
    ? "bg-transparent pt-8" 
    : "bg-[#05070a]/90 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl";

  const textColor = "text-white hover:text-[#C18D41]";
  const logoColor = "text-white";

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/destinos', label: 'Destinos' },
    { href: '/sobre', label: 'Curadoria' },
    { href: '/blog', label: 'Journal' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 lg:px-12 ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/">
          <a className={`font-serif text-2xl md:text-3xl font-bold tracking-tighter transition-colors ${logoColor}`}>
            DREAM<span className="font-light italic text-[#C18D41]">TRAVEL</span>
          </a>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative group ${textColor} ${location === link.href ? 'opacity-100' : 'opacity-70'}`}>
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-[#C18D41]"
                    />
                  )}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#C18D41] transition-all duration-500 group-hover:w-full opacity-50" />
                </a>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Button 
              onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
              className="rounded-full h-12 px-8 text-[10px] font-bold uppercase tracking-widest bg-[#C18D41] text-white hover:bg-[#A67632] hover:scale-105 transition-all shadow-lg shadow-[#C18D41]/20 border border-white/10"
            >
              Consultoria
            </Button>
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="lg:hidden flex items-center gap-5">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
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
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#05070a]/98 backdrop-blur-3xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-8 py-16 flex flex-col gap-10 h-full">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={link.href}
                >
                  <Link href={link.href}>
                    <a onClick={() => setIsOpen(false)} className="text-4xl font-serif text-white hover:text-[#C18D41] transition-colors flex items-center gap-4">
                      <span className="text-[#C18D41] text-sm font-sans tracking-widest opacity-50">0{i + 1}</span>
                      {link.label}
                    </a>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Button className="w-full h-16 rounded-2xl bg-[#C18D41] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#A67632] border border-white/10">
                  Falar com Jackeline
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}