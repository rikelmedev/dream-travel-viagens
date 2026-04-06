import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

/**
 * Footer Component
 * Design: Minimalismo Contemporâneo
 * - Organizado com sitemap, redes sociais e contato
 * - Links úteis
 * - Copyright
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Destinos',
      links: ['Maldivas', 'Bali', 'Alpes Suíços', 'Caribe', 'Japão', 'Europa'],
    },
    {
      title: 'Empresa',
      links: ['Sobre Nós', 'Blog', 'Carreiras', 'Imprensa', 'Parceiros'],
    },
    {
      title: 'Suporte',
      links: ['Contato', 'FAQ', 'Política de Privacidade', 'Termos de Uso', 'Cancelamentos'],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="container py-16 sm:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-logo_16e9196b.webp"
                alt="Dream Travel"
                className="h-10 w-auto"
              />
              <span className="font-bold text-lg">Dream Travel</span>
            </div>
            <p className="text-white/70 text-sm mb-6">
              Experiências de viagem premium para viajantes exigentes.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+55-11-3000-0000">+55 (11) 3000-0000</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contato@luxurytravel.com">contato@luxurytravel.com</a>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-secondary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <motion.p
            className="text-sm text-white/60"
            variants={itemVariants}
          >
            © {currentYear} Luxury Travel Agency. Todos os direitos reservados.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/10 hover:bg-secondary hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            className="flex items-center gap-2 text-sm text-white/60"
            variants={itemVariants}
          >
            <span>Pagamentos seguros:</span>
            <div className="flex gap-2">
              {['Visa', 'MC', 'Amex'].map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 bg-white/10 rounded text-xs"
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
