import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Clock, CheckCircle, Search } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { toast } from 'sonner';

/**
 * CommentsModeration Component
 * Design: Minimalismo Contemporâneo
 * - Gerenciamento de comentários
 * - Filtros por status
 * - Ações de aprovação/rejeição
 */

interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
}

const STORAGE_KEY = 'dream-travel-comments';

export default function CommentsModeration() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Carregar comentários
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allComments = JSON.parse(stored);
        setComments(allComments);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    }
  };

  // Filtrar comentários
  const filteredComments = comments.filter((comment) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && !comment.approved) ||
      (filter === 'approved' && comment.approved);

    const matchesSearch =
      searchTerm === '' ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Aprovar comentário
  const handleApprove = (id: string) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, approved: true } : c
    );
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success('Comentário aprovado! ✅');
  };

  // Rejeitar comentário
  const handleReject = (id: string) => {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success('Comentário removido! 🗑️');
  };

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
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-border"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="p-6 border-b border-border" variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Moderação de Comentários
        </h2>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {[
              { id: 'pending', label: 'Pendentes', icon: Clock },
              { id: 'approved', label: 'Aprovados', icon: CheckCircle },
              { id: 'all', label: 'Todos', icon: null },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  filter === btn.id
                    ? 'bg-primary text-white'
                    : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
                }`}
              >
                {btn.icon && <btn.icon className="w-4 h-4" />}
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por autor, email ou conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Comments List */}
      <motion.div
        className="divide-y divide-border"
        variants={containerVariants}
      >
        <AnimatePresence mode="wait">
          {filteredComments.length === 0 ? (
            <motion.div
              key="no-comments"
              variants={itemVariants}
              className="p-8 text-center text-muted-foreground"
            >
              <p>Nenhum comentário encontrado</p>
            </motion.div>
          ) : (
            filteredComments.map((comment) => (
              <motion.div
                key={comment.id}
                variants={itemVariants}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {comment.author}
                      </h3>
                      {comment.approved && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Aprovado
                        </span>
                      )}
                      {!comment.approved && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          Pendente
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {comment.email} •{' '}
                      {new Date(comment.date).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                {/* Comment Content */}
                <p className="text-foreground/80 mb-4 whitespace-pre-wrap">
                  {comment.content}
                </p>

                {/* Post Info */}
                <p className="text-xs text-muted-foreground mb-4">
                  Post ID: <code className="bg-gray-100 px-2 py-1 rounded">{comment.postId}</code>
                </p>

                {/* Actions */}
                {!comment.approved && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(comment.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Aprovar
                    </Button>
                    <Button
                      onClick={() => handleReject(comment.id)}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Rejeitar
                    </Button>
                  </div>
                )}

                {comment.approved && (
                  <Button
                    onClick={() => handleReject(comment.id)}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </Button>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
