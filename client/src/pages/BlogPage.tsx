import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Camera, Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import PageTransition from '@/components/PageTransition';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  location: string | null;
  content: string;
  status: string | null;
  featured: boolean | null;
  created_at: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

const CATEGORIES = ['Todos', 'Viagem', 'Luxo', 'Aventura', 'Gastronomia', 'Dicas'];

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSEOHead({
      title: 'Blog da Curadora | Dream Travel',
      description: 'Relatos, dicas e inspirações de viagens de luxo curadas por Jackeline.',
    });
    window.scrollTo(0, 0);
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => {
        const published = Array.isArray(data)
          ? data.filter((p: Post) => p.status === 'published')
          : [];
        setPosts(published);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filtered = activeCategory === 'Todos'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const rest = activeCategory === 'Todos'
    ? posts.filter((p) => p.id !== featured?.id)
    : filtered;

  return (
    <PageTransition>
      <Layout>

        {/* ── Hero escuro ── */}
        <section className="bg-[#05070a] pt-36 pb-20 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#C18D41]/50" />
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] text-white leading-[0.88]">
                  Diário de<br />
                  <span className="italic font-light text-[#C18D41]">Viagens.</span>
                </h1>
                <p className="text-white/35 font-light text-sm max-w-sm leading-relaxed lg:text-right lg:pb-2">
                  Relatos reais, bastidores e inspirações das jornadas vividas pela Jackeline ao redor do mundo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filtros sticky ── */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-gray-200/60">
          <div className="container max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative py-5 px-6 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat ? 'text-[#05070a]' : 'text-gray-400 hover:text-[#05070a]'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="journalFilter"
                      className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#C18D41]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Conteúdo ── */}
        <section className="bg-[#FAF9F6] py-16 px-6 lg:px-12 min-h-[60vh]">
          <div className="container max-w-7xl mx-auto">

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                <Loader2 className="w-6 h-6 animate-spin text-[#C18D41]" />
                <p className="font-serif text-xl text-[#05070a]/40 italic">Carregando relatos...</p>
              </div>
            ) : posts.length === 0 ? (
              <EmptyState />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >

                  {/* ── Post destaque — layout magazine ── */}
                  {featured && activeCategory === 'Todos' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="mb-16"
                    >
                      {/* Cabeçalho da seção */}
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#05070a]/40">
                          Em Destaque
                        </span>
                        <div className="flex-1 h-px bg-[#05070a]/8" />
                      </div>

                      {/* Card destaque — imagem esquerda + texto direita */}
                      <div
                        onClick={() => setLocation(`/blog/${featured.id}`)}
                        className="group grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] rounded-2xl overflow-hidden border border-gray-200/80 hover:border-[#C18D41]/30 hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                      >
                        {/* Imagem */}
                        <div className="relative overflow-hidden h-72 lg:h-auto min-h-[320px]">
                          {featured.cover_image ? (
                            <img
                              src={featured.cover_image}
                              alt={featured.title}
                              className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#05070a] to-[#C18D41]/30" />
                          )}
                          {/* Badge destaque sobre a imagem */}
                          <div className="absolute top-5 left-5">
                            <span className="bg-[#C18D41] text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                              Destaque do Journal
                            </span>
                          </div>
                        </div>

                        {/* Texto */}
                        <div className="p-8 md:p-12 flex flex-col justify-between bg-white">
                          <div>
                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                              {featured.category && (
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#C18D41] border border-[#C18D41]/30 px-3 py-1 rounded-full">
                                  {featured.category}
                                </span>
                              )}
                              {featured.created_at && (
                                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                                  <Calendar className="w-3 h-3 text-[#C18D41]" />
                                  {formatDate(featured.created_at)}
                                </span>
                              )}
                              {featured.location && (
                                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                                  <MapPin className="w-3 h-3 text-[#C18D41]" />
                                  {featured.location}
                                </span>
                              )}
                            </div>

                            {/* Título */}
                            <h2 className="font-serif text-3xl md:text-4xl text-[#05070a] leading-tight mb-5 group-hover:text-[#C18D41] transition-colors duration-300">
                              {featured.title}
                            </h2>

                            {/* Excerpt */}
                            {featured.excerpt && (
                              <p className="text-gray-500 font-light text-sm leading-relaxed line-clamp-4">
                                {featured.excerpt}
                              </p>
                            )}
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-3 text-[#C18D41] text-[10px] font-bold uppercase tracking-[0.3em] mt-8 group-hover:gap-4 transition-all duration-300">
                            Ler relato completo
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Grid de posts ── */}
                  {rest.length > 0 && (
                    <>
                      <div className="flex items-center gap-4 mb-10">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#05070a]/40">
                          {activeCategory === 'Todos' ? 'Últimas Histórias' : activeCategory}
                        </span>
                        <div className="flex-1 h-px bg-[#05070a]/8" />
                        <span className="text-[9px] uppercase tracking-widest text-[#05070a]/25 font-bold tabular-nums">
                          {rest.length} {rest.length === 1 ? 'relato' : 'relatos'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rest.map((post, i) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.6 }}
                          >
                            <ArticleCard post={post} onClick={() => setLocation(`/blog/${post.id}`)} />
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Categoria sem posts */}
                  {filtered.length === 0 && activeCategory !== 'Todos' && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                      <Camera className="w-10 h-10 text-[#05070a]/10" />
                      <p className="font-serif text-xl text-[#05070a]/40 italic">
                        Nenhum relato nesta coleção ainda.
                      </p>
                      <button
                        onClick={() => setActiveCategory('Todos')}
                        className="text-[#C18D41] text-[10px] uppercase tracking-widest font-bold hover:underline"
                      >
                        Ver todos os relatos
                      </button>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

      </Layout>
    </PageTransition>
  );
}

/* ── Card de artigo — estilo magazine ── */
function ArticleCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C18D41]/25 hover:shadow-xl transition-all duration-500"
    >
      {/* Imagem */}
      <div className="relative overflow-hidden h-56 bg-gray-100 flex-shrink-0">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#05070a] to-[#C18D41]/20 flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/15" />
          </div>
        )}
        {/* Categoria badge sobre a foto */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-[#05070a] text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Texto */}
      <div className="p-6 flex flex-col flex-1">

        {/* Meta — data + local */}
        <div className="flex items-center gap-4 mb-4">
          {post.created_at && (
            <span className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-gray-400 font-bold">
              <Calendar className="w-2.5 h-2.5 text-[#C18D41]" />
              {formatDate(post.created_at)}
            </span>
          )}
          {post.location && (
            <span className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-gray-400 font-bold">
              <MapPin className="w-2.5 h-2.5 text-[#C18D41]" />
              {post.location}
            </span>
          )}
        </div>

        {/* Divisor dourado */}
        <div className="w-8 h-[2px] bg-[#C18D41]/40 mb-4 group-hover:w-14 transition-all duration-500" />

        {/* Título */}
        <h3 className="font-serif text-xl text-[#05070a] leading-snug mb-3 group-hover:text-[#C18D41] transition-colors duration-300 flex-1">
          {post.title}
        </h3>

        {/* Excerpt */}
        {(post.excerpt || post.content) && (
          <p className="text-gray-400 font-light text-sm leading-relaxed line-clamp-3 mb-5">
            {post.excerpt || post.content.slice(0, 120) + '...'}
          </p>
        )}

        {/* Ler mais */}
        <div className="flex items-center gap-2 text-[#05070a] text-[9px] font-bold uppercase tracking-[0.3em] mt-auto pt-5 border-t border-gray-100 group-hover:text-[#C18D41] transition-colors duration-300">
          Ler relato
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </article>
  );
}

/* ── Estado vazio ── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-40 gap-6 text-center">
      <div className="w-20 h-20 rounded-full border border-[#05070a]/8 flex items-center justify-center">
        <Camera className="w-8 h-8 text-[#05070a]/15" />
      </div>
      <div>
        <p className="font-serif text-2xl text-[#05070a] italic mb-2">
          Nenhum relato publicado ainda.
        </p>
        <p className="text-[#05070a]/35 text-sm font-light">
          Em breve Jackeline compartilhará os bastidores das suas viagens.
        </p>
      </div>
    </div>
  );
}
