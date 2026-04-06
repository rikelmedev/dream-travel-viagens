import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

/**
 * Navbar Component
 * Design: Minimalismo Contemporâneo
 * - Transparente sobre o Hero, tornando-se sólida no scroll
 * - Logotipo à esquerda, links centrais, CTA à direita
 * - Responsivo com menu mobile
 */
export default function Navbar() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destinos', href: '/destinos' },
    { label: 'Pacotes', href: '/pacotes' },
    { label: 'Blog', href: '/blog' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <motion.div
          className="flex-shrink-0 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation('/')}
        >
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-logo_16e9196b.webp"
              alt="Dream Travel"
              className="h-12 w-auto"
            />
            <span className="hidden sm:inline font-bold text-foreground text-lg">
              Dream Travel
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.label}
              onClick={() => setLocation(link.href)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setLocation('/contato')}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Fale Conosco
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden bg-white border-b border-border"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="container py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setLocation(link.href);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => {
              setLocation('/contato');
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-2"
          >
            Fale Conosco
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
