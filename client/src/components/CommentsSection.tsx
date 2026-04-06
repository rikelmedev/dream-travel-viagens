import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * CommentsSection Component
 * Design: Minimalismo Contemporâneo
 * - Sistema de comentários com validação
 * - Persistência em localStorage
 * - Animações suaves
 */

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
}

interface CommentsSectionProps {
  postId: string;
  postTitle: string;
}

const STORAGE_KEY = 'dream-travel-comments';

export default function CommentsSection({ postId, postTitle }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carregar comentários do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allComments = JSON.parse(stored);
        const postComments = allComments.filter(
          (c: Comment) => c.postId === postId && c.approved
        );
        setComments(postComments);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    }
  }, [postId]);

  // Salvar comentário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!formData.author.trim()) {
      toast.error('Por favor, insira seu nome');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Por favor, escreva um comentário');
      return;
    }

    setIsSubmitting(true);

    // Simular delay de processamento
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        postId,
        author: formData.author.trim(),
        email: formData.email.trim(),
        content: formData.content.trim(),
        date: new Date().toISOString(),
        approved: false, // Requer aprovação do admin
      };

      // Salvar no localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      const allComments = stored ? JSON.parse(stored) : [];
      allComments.push(newComment);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));

      // Atualizar estado (apenas comentários aprovados são exibidos)
      // setComments([...comments, newComment]); // Não adiciona até ser aprovado
      setFormData({ author: '', email: '', content: '' });
      setIsSubmitting(false);

      toast.success('Comentário enviado! Aguardando aprovação do administrador. 📝');
    }, 500);
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
      className="mt-8 pt-8 border-t border-border"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="mb-6" variants={itemVariants}>
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Comentários ({comments.length})
        </h3>
        <p className="text-sm text-muted-foreground">
          Compartilhe sua opinião sobre este artigo (comentários requerem aprovação)
        </p>
      </motion.div>

      {/* Comment Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-secondary/5 rounded-lg p-6 mb-8"
        variants={itemVariants}
      >
        <h4 className="font-semibold text-foreground mb-4">Deixe um comentário</h4>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="Seu nome"
              className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="seu@email.com"
              className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Comentário *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Escreva seu comentário aqui..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar Comentário
              </>
            )}
          </Button>
        </div>
      </motion.form>

      {/* Comments List */}
      <motion.div className="space-y-4" variants={containerVariants}>
        <AnimatePresence mode="wait">
          {comments.length === 0 ? (
            <motion.div
              key="no-comments"
              variants={itemVariants}
              className="text-center py-8 text-muted-foreground"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            </motion.div>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg p-4 border border-border hover:border-primary/30 transition-colors"
              >
                {/* Comment Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {comment.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
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
                <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
