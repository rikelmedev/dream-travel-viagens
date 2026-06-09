import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useLocation } from 'wouter';
import { setSEOHead } from '@/components/SEOHead';

export default function VipLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ email: '', code: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSEOHead({
      title: 'Acesso VIP | Dream Travel',
      description: 'Área reservada para clientes Dream Travel. Aceda ao seu roteiro personalizado.',
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/vip-codes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: credentials.code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'As credenciais inseridas nao coincidem com os nossos registos de alta curadoria.');
        return;
      }

      localStorage.setItem('vip_client_name', data.client_name);
      localStorage.setItem('vip_code', data.code);
      setLocation('/dashboard');
    } catch {
      setError('Erro de ligacao. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#05070a] relative flex items-center justify-center p-6 overflow-hidden">
      {/* Imagem de Fundo Subtil */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
      
      {/* Brilho Dourado de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C18D41]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 w-full max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Acento Dourado Fino no Topo */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C18D41] to-transparent opacity-50" />

          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-[#C18D41]" />
              <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.4em] font-bold">
                Círculo Restrito
              </span>
              <Sparkles className="w-4 h-4 text-[#C18D41]" />
            </div>
            <h1 className="text-3xl font-serif text-white mb-3">Acesso ao Roteiro</h1>
            <p className="text-white/40 text-sm font-light">
              Insira as suas credenciais para visualizar a sua jornada desenhada à medida.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest transition-colors group-focus-within:text-[#C18D41] block mb-2">
                E-mail do Cliente
              </label>
              <input 
                required
                type="email"
                placeholder="O seu e-mail registado"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#C18D41] transition-all placeholder:text-white/20 font-light"
              />
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest transition-colors group-focus-within:text-[#C18D41] flex items-center justify-between mb-2">
                Código de Acesso
                <Lock className="w-3 h-3" />
              </label>
              <input 
                required
                type="password"
                placeholder="Fornecido pela sua curadora"
                value={credentials.code}
                onChange={(e) => setCredentials({...credentials, code: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#C18D41] transition-all placeholder:text-white/20 font-light tracking-widest"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-400 text-xs font-light tracking-wide text-center"
              >
                {error}
              </motion.p>
            )}

            <div className="pt-4">
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[#C18D41] hover:bg-[#A67632] text-white rounded-xl uppercase tracking-[0.2em] text-[10px] font-bold shadow-lg shadow-[#C18D41]/20 transition-all border border-white/10 disabled:opacity-70 disabled:hover:bg-[#C18D41]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Desbloquear Experiência <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button 
              onClick={() => window.open('https://wa.me/5517996077150', '_blank')}
              className="text-[10px] text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors"
            >
              Dificuldade no acesso? Contacte o Concierge
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}