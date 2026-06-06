import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useLocation } from 'wouter';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const ok = login(password);
      if (ok) {
        setLocation('/admin');
      } else {
        setError('Senha incorreta.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-[#C18D41] rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-[#C18D41]/20">
            D
          </div>
          <div>
            <h1 className="font-serif font-bold text-white text-xl">Dream Travel</h1>
            <p className="text-[9px] text-[#C18D41] font-bold uppercase tracking-[0.3em] mt-1">Acesso Restrito</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">
              Senha de Administrador
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#C18D41]/40"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C18D41] hover:bg-[#A67632] text-white rounded-xl h-12 font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
