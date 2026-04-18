import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const isHomePage = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Destinos', href: '/destinos' },
    { name: 'Pacotes', href: '/pacotes' },
    { name: 'Contato', href: '/contato' },
  ];

  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
   className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ease-in-out ${
    isTransparent 
      ? 'bg-transparent py-2' 
      : 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-white/20 py-3 rounded-3xl'
  }`}
>
        <div className="container px-4 mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className={`p-2 rounded-full transition-colors ${isTransparent ? 'bg-white/20' : 'bg-primary/10'}`}>
                <Plane className={`w-6 h-6 transition-colors ${isTransparent ? 'text-white' : 'text-primary'}`} />
              </div>
              <span className={`text-2xl font-bold font-serif transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
                Dream Travel
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className={`text-sm font-medium transition-colors cursor-pointer hover:text-primary ${
                  isTransparent ? 'text-white/90' : 'text-slate-600'
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
            
            <Button 
              onClick={() => setLocation('/contato')}
              className={`font-semibold rounded-full px-6 transition-all ${
                isTransparent 
                  ? 'bg-white text-primary hover:bg-white/90' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              Falar com Especialista
            </Button>
          </nav>

          {/* Botão Menu Mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-slate-900'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-slate-900'}`} />
            )}
          </button>
        </div>
      </header>

      {/* Menu Mobile Expandido */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span 
                    className="text-2xl font-serif text-slate-900 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <Button 
                onClick={() => {
                  setLocation('/contato');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 bg-primary text-white font-semibold py-6 rounded-xl text-lg"
              >
                Falar com Especialista
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}