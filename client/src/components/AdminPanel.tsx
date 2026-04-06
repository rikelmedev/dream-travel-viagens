import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Lock, BarChart3, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentsModeration from './CommentsModeration';

/**
 * AdminPanel Component
 * Design: Minimalismo Contemporâneo
 * - Painel de administração com autenticação
 * - Gerenciamento de comentários
 * - Dashboard com estatísticas
 */

interface AdminUser {
  username: string;
  password: string;
}

// Credenciais padrão (em produção, seria um backend)
const ADMIN_CREDENTIALS: AdminUser = {
  username: 'jackeline',
  password: 'dreamtravel2024',
};

const ADMIN_SESSION_KEY = 'dream-travel-admin-session';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar se já está autenticado
  useEffect(() => {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      if (
        username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
      ) {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ username }));
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
      } else {
        setError('Usuário ou senha incorretos');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Painel Admin
            </h1>
            <p className="text-muted-foreground">
              Dream Travel Viagens - Gerenciamento de Comentários
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jackeline"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                className="p-3 rounded-lg bg-red-50 text-red-700 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {isLoading ? 'Autenticando...' : 'Entrar'}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg text-xs text-muted-foreground">
            <p className="font-semibold mb-2">Credenciais de Teste:</p>
            <p>Usuário: <code className="bg-white px-2 py-1 rounded">jackeline</code></p>
            <p>Senha: <code className="bg-white px-2 py-1 rounded">dreamtravel2024</code></p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-white border-b border-border sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Painel de Administração
            </h1>
            <p className="text-sm text-muted-foreground">
              Dream Travel Viagens
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Dashboard Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Total de Comentários
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {(() => {
                      const stored = localStorage.getItem('dream-travel-comments');
                      return stored ? JSON.parse(stored).length : 0;
                    })()}
                  </p>
                </div>
                <MessageSquare className="w-12 h-12 text-primary/20" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Pendentes de Aprovação
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {(() => {
                      const stored = localStorage.getItem('dream-travel-comments');
                      if (!stored) return 0;
                      const comments = JSON.parse(stored);
                      return comments.filter((c: any) => !c.approved).length;
                    })()}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-primary/20" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Aprovados
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {(() => {
                      const stored = localStorage.getItem('dream-travel-comments');
                      if (!stored) return 0;
                      const comments = JSON.parse(stored);
                      return comments.filter((c: any) => c.approved).length;
                    })()}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-green-600/20" />
              </div>
            </div>
          </motion.div>

          {/* Comments Moderation */}
          <CommentsModeration />
        </motion.div>
      </main>
    </div>
  );
}
