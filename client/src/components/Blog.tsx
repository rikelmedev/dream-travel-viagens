import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/painel/button';
import CommentsSection from './CommentsSection';

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
    title: 'Crônica de Bali: Descontos Especiais de Março',
    excerpt: 'Aproveite nossa curadoria especial de março Pacotes selecionados para Bali com benefícios exclusivos.',
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
    excerpt: 'Perfeito para quem possui pouco tempo Confira como aproveitar o melhor de Gramado em um fim de semana imersivo.',
    content: 'Gramado é perfeito para um bate e volta! Saindo de São Paulo, você chega em 6 hours. Dia 1: Canela, Cascata do Caracol e Parque Temático. Dia 2: Gramado, Rua Coberta, Chocolate Artesanal e Lago Negro. Dica: leve roupas quentes mesmo em dias quentes! Ótimo para descansar e renovar energias.',
    category: 'bate-volta',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    date: '2026-03-18',
    author: 'Jackeline',
    readTime: 4,
  },
  {
    id: '4',
    title: 'Como Otimizar o Planejamento em Viagens Internacionais',
    excerpt: 'Aprenda os melhores segredos para organizar as suas jornadas internacionais mantendo o máximo padrão de conforto.',
    content: 'Aqui estão meus melhores truques para economizar em viagens: 1) Voe em terça ou quarta (mais barato). 2) Reserve hospedagem com cancelamento grátis. 3) Use cartão de crédito com milhas. 4) Viaje na baixa temporada. 5) Procure pacotes all-inclusive. 6) Coma onde os locais comem. Com essas dicas, você economiza até 40% em viagens!',
    category: 'dica',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    date: '2026-03-15',
    author: 'Jackeline',
    readTime: 6,
  },
];

const categories = [
  { id: 'all', label: 'Todos os Artigos' },
  { id: 'viagem', label: 'Destinos' },
  { id: 'promocao', label: 'Oportunidades' },
  { id: 'bate-volta', label: 'Escapadas' },
  { id: 'dica', label: 'Segredos de Viagem' },
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
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-24 bg-white" id="blog">
      <div className="container px-6 lg:px-12">
        
        {/* Título da Seção */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C18D41]/60" />
            <span className="text-[#C18D41] text-xs uppercase tracking-[0.4em] font-bold">
              Diário de Bordo
            </span>
            <div className="h-px w-8 bg-[#C18D41]/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-[#05070a] leading-tight">
            Histórias e <span className="italic font-light text-[#C18D41]">Tendências Globais</span>
          </h2>
        </div>

        {/* Filtros Editoriais de Categorias */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-gray-100 pb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative ${
                selectedCategory === category.id
                  ? 'text-[#C18D41]'
                  : 'text-gray-400 hover:text-[#05070a]'
              }`}
            >
              {category.label}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategoryBorder"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C18D41]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid de Artigos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100/80 hover:border-gray-200 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(5,7,10,0.04)]"
                onClick={() => {
                  setSelectedPost(post);
                  onSelectPost?.(post);
                }}
              >
                {/* Imagem do Artigo */}
                <div className="relative h-64 overflow-hidden bg-gray-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  <span className="absolute bottom-4 left-6 text-[10px] uppercase tracking-widest bg-white/90 backdrop-blur-md text-[#05070a] px-3 py-1.5 rounded-md font-bold shadow-sm">
                    {categories.find((c) => c.id === post.category)?.label}
                  </span>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadados */}
                    <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-gray-400 mb-4 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C18D41]" />
                        {new Date(post.date).toLocaleDateString('pt-PT')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#C18D41]" />
                        {post.readTime} min leitura
                      </span>
                    </div>

                    {/* Título do Artigo */}
                    <h3 className="font-serif text-xl md:text-2xl text-[#05070a] mb-3 leading-snug group-hover:text-[#C18D41] transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Resumo */}
                    <p className="text-gray-500 text-sm font-light tracking-wide leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Botão de Ação */}
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C18D41] group-hover:text-[#A67632] transition-colors pt-4 border-t border-gray-50 mt-auto">
                    Aprofundar Leitura 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedPost && (
            <>
              {/* Plano de Fundo Escuro Translúcido */}
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
              />

              {/* Janela Central do Modal */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-gray-100"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Capa com Botão de Fechar */}
                  <div className="relative h-80 overflow-hidden bg-gray-50">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md rounded-full p-2.5 transition-all shadow-md"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Conteúdo Interno do Artigo */}
                  <div className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">
                      <span>{new Date(selectedPost.date).toLocaleDateString('pt-PT')}</span>
                      <span className="w-1 h-1 bg-[#C18D41] rounded-full" />
                      <span>{selectedPost.readTime} min de imersão</span>
                      <span className="w-1 h-1 bg-[#C18D41] rounded-full" />
                      <span>Por {selectedPost.author}</span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-5xl text-[#05070a] mb-8 leading-tight">
                      {selectedPost.title}
                    </h2>

                    <div className="text-gray-600 font-light text-base tracking-wide leading-relaxed mb-10 whitespace-pre-wrap">
                      {selectedPost.content}
                    </div>

                    {/* Espaço de Comentários Integrado */}
                    <div className="border-t border-gray-100 pt-8 mb-8">
                      <CommentsSection
                        postId={selectedPost.id}
                        postTitle={selectedPost.title}
                      />
                    </div>

                    {/* Ações Inferiores */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPost(null)}
                        className="flex-1 rounded-xl h-12 uppercase tracking-widest text-xs font-bold border-gray-200 text-gray-500 hover:bg-gray-50"
                      >
                        Retornar ao Diário
                      </Button>
                      <Button className="flex-1 rounded-xl h-12 uppercase tracking-widest text-xs font-bold bg-[#C18D41] text-white hover:bg-[#A67632] shadow-lg shadow-[#C18D41]/10">
                        Desenhar Roteiro Conosco
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}