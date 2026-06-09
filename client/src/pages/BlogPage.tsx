import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
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
    day: '2-digit', month: 'short', year: 'numeric'
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
      description: 'Relatos, dicas e inspiracoes de viagens de luxo curadas por Jackeline.',
    });
    window.scrollTo(0, 0);

    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
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
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = posts.find(p => p.featured) || posts[0] || null;

  return (
    <PageTransition>
      <Layout>

        {/* HERO */}
        <section className="pt-40 pb-20 bg-[#FAF9F6] border-b border-gray-200/50">
          <div className="container max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#C18D41]/50" />
                <span className="text-[#C18D41] font-bold uppercase tracking-[0.5em] text-[10px] flex items-center gap-3">
                  <BookOpen className="w-3 h-3" /> Journal da Curadora
                </span>
                <div className="h-px w-12 bg-[#C18D41]/50" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#05070a] mb-8 leading-[1.1]">
                Diario de <span className="italic text-[#C18D41] font-light">Viagens</span>
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                Inspire-se com relatos reais e descubra os segredos dos destinos mais fascinantes do mundo, vividos e aprovados em primeira mao.
              </p>
            </motion.div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-[#C18D41]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-400 gap-4">
            <BookOpen className="w-12 h-12 opacity-20" />
            <p className="text-2xl font-serif italic text-[#05070a]">Nenhum relato publicado ainda.</p>
          </div>
        ) : (
          <>
            {/* POST EM DESTAQUE */}
            {featuredPost && activeCategory === 'Todos' && (
              <section className="py-16 bg-[#FAF9F6]">
                <div className="container max-w-7xl mx-auto px-6 lg:px-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    onClick={() => setLocation(`/blog/${featuredPost.id}`)}
                    className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer border border-gray-200"
                  >
                    <div className="aspect-[16/9] md:aspect-[21/8] relative bg-gray-100">
                      {featuredPost.cover_image ? (
                        <img
                          src={featuredPost.cover_image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#05070a] to-[#C18D41]/30" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-4xl">
                        <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.3em] mb-6 inline-block">
                          Destaque da Editora
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight group-hover:text-[#C18D41] transition-colors">
                          {featuredPost.title}
                        </h2>
                        {featuredPost.excerpt && (
                          <p className="text-white/70 text-lg md:text-xl font-light mb-8 line-clamp-2 max-w-2xl leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-white/50">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-[#C18D41]" />
                            <span>{formatDate(featuredPost.created_at)}</span>
                          </div>
                          {featuredPost.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-[#C18D41]" />
                              <span>{featuredPost.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {/* FILTROS */}
            <section className="py-16 bg-[#FAF9F6] min-h-screen">
              <div className="container max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-20">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${
                        activeCategory === category
                          ? 'bg-[#05070a] text-white shadow-lg'
                          : 'bg-transparent text-gray-400 hover:text-[#05070a] hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence mode="popLayout">
                    {filtered.map(post => (
                      <motion.div
                        layout
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setLocation(`/blog/${post.id}`)}
                        className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700 cursor-pointer flex flex-col h-full border border-gray-100"
                      >
                        <div className="relative h-72 overflow-hidden shrink-0 bg-gray-100">
                          {post.cover_image ? (
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#05070a] to-[#C18D41]/20 flex items-center justify-center">
                              <BookOpen className="w-10 h-10 text-white/20" />
                            </div>
                          )}
                          <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-md text-[#05070a] text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-10 flex flex-col flex-1">
                          <div className="flex items-center justify-between text-gray-400 text-[9px] uppercase tracking-widest font-bold mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 text-[#C18D41]" />
                              <span>{formatDate(post.created_at)}</span>
                            </div>
                            {post.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-[#C18D41]" />
                                <span>{post.location}</span>
                              </div>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold font-serif text-[#05070a] mb-4 leading-snug group-hover:text-[#C18D41] transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                            {post.excerpt || post.content.slice(0, 120) + '...'}
                          </p>

                          <div className="mt-auto flex items-center gap-3 text-[#05070a] font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-[#C18D41] transition-colors">
                            <span>Ler relato completo</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 text-gray-400"
                  >
                    <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-20" />
                    <p className="text-2xl font-serif italic text-[#05070a]">Nenhum relato encontrado nesta colecao ainda.</p>
                  </motion.div>
                )}
              </div>
            </section>
          </>
        )}
      </Layout>
    </PageTransition>
  );
}
