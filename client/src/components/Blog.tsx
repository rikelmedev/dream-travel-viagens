import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentsSection from './CommentsSection';

/**
 * Blog Component
 * Design: Minimalismo Contemporâneo
 * - Grid de posts com imagens
 * - Filtros por categoria
 * - Modal para ler post completo
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'viagem' | 'promocao' | 'bate-volta' | 'dica';
  image: string;
  date: string;
  author: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Maldivas em Lua de Mel: Roteiro de 5 Dias Perfeito',
    excerpt: 'Descubra o roteiro ideal para uma lua de mel inesquecível nas Maldivas com as melhores praias e resorts.',
    content: 'As Maldivas são o destino perfeito para lua de mel. Neste post, compartilho meu roteiro de 5 dias que inclui: Dia 1 - Chegada e resort check-in com spa relaxante. Dia 2 - Mergulho no recife de coral. Dia 3 - Passeio de barco ao pôr do sol. Dia 4 - Snorkel noturno. Dia 5 - Praia privada e massagem na praia. Garanto que será inesquecível!',
    category: 'viagem',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    date: '2026-03-25',
    author: 'Jackeline',
    readTime: 5,
  },
  {
    id: '2',
    title: '🎉 PROMOÇÃO: Viagens para Bali com 30% OFF',
    excerpt: 'Aproveite nossa promoção especial de março! Pacotes para Bali com desconto imperdível.',
    content: 'Estamos com uma promoção especial para Bali! Todos os pacotes de viagem para Bali estão com 30% de desconto até o final de março. Inclui: passagem aérea, hospedagem em resort 5 estrelas, tours e atividades. Não perca essa oportunidade! Entre em contato para mais detalhes.',
    category: 'promocao',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    date: '2026-03-20',
    author: 'Jackeline',
    readTime: 3,
  },
  {
    id: '3',
    title: 'Bate e Volta: Gramado em 2 Dias Saindo de São Paulo',
    excerpt: 'Perfeito para quem tem pouco tempo! Confira como aproveitar Gramado em apenas 2 dias.',
    content: 'Gramado é perfeito para um bate e volta! Saindo de São Paulo, você chega em 6 horas. Dia 1: Canela, Cascata do Caracol e Parque Temático. Dia 2: Gramado, Rua Coberta, Chocolate Artesanal e Lago Negro. Dica: leve roupas quentes mesmo em dias quentes! Ótimo para descansar e renovar energias.',
    category: 'bate-volta',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    date: '2026-03-18',
    author: 'Jackeline',
    readTime: 4,
  },
  {
    id: '4',
    title: '💡 Dica: Como Economizar em Viagens Internacionais',
    excerpt: 'Aprenda os melhores truques para economizar em suas viagens internacionais sem perder qualidade.',
    content: 'Aqui estão meus melhores truques para economizar em viagens: 1) Voe em terça ou quarta (mais barato). 2) Reserve hospedagem com cancelamento grátis. 3) Use cartão de crédito com milhas. 4) Viaje na baixa temporada. 5) Procure pacotes all-inclusive. 6) Coma onde os locais comem. Com essas dicas, você economiza até 40% em viagens!',
    category: 'dica',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    date: '2026-03-15',
    author: 'Jackeline',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Alpes Suíços: Esqui e Gastronomia em Harmonia',
    excerpt: 'Combine a adrenalina do esqui com a culinária de classe mundial dos Alpes Suíços.',
    content: 'Os Alpes Suíços oferecem muito mais que esqui! Além das pistas incríveis, você encontra: Fondue tradicional em Zermatt, Raclette em Verbier, Chocolate artesanal em Interlaken. Recomendo: Dia 1-2 Esqui em Verbier, Dia 3 Trem panorâmico Jungfraujoch, Dia 4 Fondue em Zermatt. Experiência gastronômica + adrenalina = perfeito!',
    category: 'viagem',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    date: '2026-03-10',
    author: 'Jackeline',
    readTime: 5,
  },
  {
    id: '6',
    title: 'Promoção: Pacotes para o Carnaval com Entrada Inclusa',
    excerpt: 'Aproveite nossos pacotes especiais para o Carnaval com entrada garantida nos melhores blocos.',
    content: 'Temos pacotes especiais para o Carnaval! Inclui: hospedagem, entrada nos blocos mais famosos, transporte, seguro viagem. Destinos: Rio de Janeiro, Salvador, Recife. Aproveite enquanto há vagas! Contato: whatsapp ou email. Promoção válida até 31 de março.',
    category: 'promocao',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    date: '2026-03-08',
    author: 'Jackeline',
    readTime: 3,
  },
];

const categories = [
  { id: 'all', label: 'Todos', icon: '📰' },
  { id: 'viagem', label: 'Viagens', icon: '✈️' },
  { id: 'promocao', label: 'Promoções', icon: '🎉' },
  { id: 'bate-volta', label: 'Bate e Volta', icon: '🚗' },
  { id: 'dica', label: 'Dicas', icon: '💡' },
];

interface BlogProps {
  onSelectPost?: (post: BlogPost) => void;
}

export default function Blog({ onSelectPost }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts =
    selectedCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4">Blog da Jackeline 📝</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dicas de viagem, promoções exclusivas e histórias incríveis dos destinos que visitei
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon} {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedPost(post);
                  onSelectPost?.(post);
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find((c) => c.id === post.category)?.icon}{' '}
                        {categories.find((c) => c.id === post.category)?.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.readTime} min
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-foreground/70 text-sm mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-primary font-semibold text-sm"
                      whileHover={{ x: 5 }}
                    >
                      Ler mais <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
              />

              {/* Modal */}
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{new Date(selectedPost.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{selectedPost.readTime} min de leitura</span>
                      <span>•</span>
                      <span>Por {selectedPost.author}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      {selectedPost.title}
                    </h2>

                    {/* Content */}
                    <div className="prose prose-sm max-w-none text-foreground/80 mb-8">
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {selectedPost.content}
                      </p>
                    </div>

                    {/* Comments Section */}
                    <CommentsSection
                      postId={selectedPost.id}
                      postTitle={selectedPost.title}
                    />

                    {/* CTA */}
                    <div className="flex gap-4 pt-6 border-t border-border mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPost(null)}
                        className="flex-1"
                      >
                        Fechar
                      </Button>
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        Falar com Jackeline ✈️
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
