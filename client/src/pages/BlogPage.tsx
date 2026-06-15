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
      title: 'Journal da Curadora | Dream Travel',
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

  return (
    <PageTransition>
      <Layout>

        {/* ── Hero ── */}
        <section className="bg-[#05070a] pt-36 pb-20 px-6 lg:px-12">
          <div className="container max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                  Journal da Curadora
                </span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.88]">
                  Diário de<br />
                  <span className="italic font-light text-[#C18D41]">Viagens.</span>
                </h1>
                <p className="text-white/35 font-light text-sm max-w-sm leading-relaxed lg:text-right lg:pb-3">
                  Relatos reais, bastidores e inspirações das jornadas vividas pela Jackeline ao redor do mundo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filtros sticky ── */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-gray-200/60">
          <div className="container max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
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

        {/* ── Feed ── */}
        <section className="bg-[#FAF9F6] py-12 px-6 lg:px-12 min-h-[60vh]">
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
                  transition={{ duration: 0.35 }}
                >
                  {/* Post em destaque — só na aba "Todos" */}
                  {featured && activeCategory === 'Todos' && (
                    <FeaturedCard post={featured} onClick={() => setLocation(`/blog/${featured.id}`)} />
                  )}

                  {/* Grid de posts */}
                  {filtered.length > 0 && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${featured && activeCategory === 'Todos' ? 'mt-4' : ''}`}>
                      {(activeCategory === 'Todos' ? filtered.slice(1) : filtered).map((post, i) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.5 }}
                        >
                          <PostCard post={post} onClick={() => setLocation(`/blog/${post.id}`)} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                      <Camera className="w-10 h-10 text-[#05070a]/10" />
                      <p className="font-serif text-xl text-[#05070a]/40 italic">
                        Nenhum relato nesta colecão ainda.
                      </p>
                      <button
                        onClick={() => setActiveCategory('Todos')}
                        className="text-[#C18D41] text-[10px] uppercase tracking-widest font-bold hover:underline"
                      >
                        Ver todos
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

/* ── Card destaque ── */
function FeaturedCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer mb-4 h-[55vh] min-h-[380px]"
    >
      {post.cover_image ? (
        <img
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070a] to-[#C18D41]/20" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Badges */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <span className="bg-[#C18D41] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          Destaque
        </span>
        {post.category && (
          <span className="bg-white/10 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/15">
            {post.category}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-5 mb-4 text-[9px] uppercase tracking-widest text-white/40 font-bold">
            {post.created_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#C18D41]" />
                {formatDate(post.created_at)}
              </span>
            )}
            {post.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#C18D41]" />
                {post.location}
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight group-hover:text-[#C18D41] transition-colors duration-300">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-white/45 text-sm font-light mt-3 max-w-2xl leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-[#C18D41] group-hover:bg-[#C18D41]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Card normal — estilo post de feed ── */
function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 lg:h-96"
    >
      {post.cover_image ? (
        <img
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070a] to-[#C18D41]/20 flex items-center justify-center">
          <Camera className="w-10 h-10 text-white/10" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      {/* Categoria badge */}
      {post.category && (
        <div className="absolute top-4 left-4">
          <span className="bg-white/10 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/15">
            {post.category}
          </span>
        </div>
      )}

      {/* Conteúdo */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-3 mb-2 text-[8px] uppercase tracking-widest text-white/35 font-bold">
          {post.created_at && (
            <span className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-[#C18D41]" />
              {formatDate(post.created_at)}
            </span>
          )}
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#C18D41]" />
              {post.location}
            </span>
          )}
        </div>
        <h3 className="font-serif text-xl text-white leading-snug group-hover:text-[#C18D41] transition-colors duration-300 mb-3">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-white/40 text-xs font-light leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 text-[#C18D41] text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          Ler relato <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
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
