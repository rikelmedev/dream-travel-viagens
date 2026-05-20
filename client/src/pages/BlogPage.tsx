import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import PageTransition from '@/components/PageTransition';

const MOCK_POSTS = [
  {
    id: '1',
    title: 'O Segredo Bem Guardado da Costa Amalfitana',
    excerpt: 'Longe das multidões de Positano, descobri uma vila de pescadores onde o tempo parou e o luxo se encontra na simplicidade.',
    category: 'Europa',
    date: '12 Out 2026',
    location: 'Itália',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Safari Lodge: Acordar com Elefantes',
    excerpt: 'A experiência indescritível de tomar o pequeno-almoço na savana sul-africana com a visita inesperada da vida selvagem.',
    category: 'Aventura',
    date: '28 Set 2026',
    location: 'África do Sul',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    featured: false
  },
  {
    id: '3',
    title: 'Gastronomia Estrelada em Tóquio',
    excerpt: 'Um roteiro pelos restaurantes omakase mais exclusivos da capital japonesa, reservados apenas para locais e convidados.',
    category: 'Gastronomia',
    date: '15 Ago 2026',
    location: 'Japão',
    image: 'https://images.unsplash.com/photo-1580828369019-22247b91fb0e?w=800&q=80',
    featured: false
  },
  {
    id: '4',
    title: 'Refúgio de Inverno nos Alpes Suíços',
    excerpt: 'Como é hospedar-se nos chalés mais isolados e luxuosos de Zermatt, com vista privilegiada e ininterrupta para o Matterhorn.',
    category: 'Luxo',
    date: '10 Jul 2026',
    location: 'Suíça',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
    featured: false
  }
];

const CATEGORIES = ['Todos', 'Europa', 'Luxo', 'Aventura', 'Gastronomia'];

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    setSEOHead({
      title: 'Journal da Curadora | Dream Travel',
      description: 'Relatos, dicas e inspirações de viagens de luxo curadas por Jackeline.',
    });
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = activeCategory === 'Todos' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeCategory);

  const featuredPost = MOCK_POSTS.find(p => p.featured);

  return (
    <PageTransition>
      <Layout>
        {/* HERO EDITORIAL */}
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
                Diário de <span className="italic text-[#C18D41] font-light">Viagens</span>
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                Inspire-se com relatos reais e descubra os segredos dos destinos mais fascinantes do mundo, vividos e aprovados em primeira mão.
              </p>
            </motion.div>
          </div>
        </section>

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
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] transition-transform duration-[15s] group-hover:scale-105"
                  />
                  {/* Gradiente de leitura estilo Vogue */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-4xl">
                    <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.3em] mb-6 inline-block">
                      Destaque da Editora
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight group-hover:text-[#C18D41] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl font-light mb-8 line-clamp-2 max-w-2xl leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-white/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-[#C18D41]" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-[#C18D41]" />
                        <span>{featuredPost.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* FILTROS E GRID DE ARTIGOS */}
        <section className="py-16 bg-[#FAF9F6] min-h-screen">
          <div className="container max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* Filtros Minimalistas */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-20">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${
                    activeCategory === category 
                      ? 'bg-[#05070a] text-white shadow-lg shadow-[#05070a]/10' 
                      : 'bg-transparent text-gray-400 hover:text-[#05070a] hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid Editorial */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    key={post.id}
                    onClick={() => setLocation(`/blog/${post.id}`)}
                    className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-700 cursor-pointer flex flex-col h-full border border-gray-100"
                  >
                    <div className="relative h-72 overflow-hidden shrink-0 bg-gray-100">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] transition-transform duration-[10s] group-hover:scale-110"
                      />
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
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-[#C18D41]" />
                          <span>{post.location}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold font-serif text-[#05070a] mb-4 leading-snug group-hover:text-[#C18D41] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                        {post.excerpt}
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

            {filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 text-gray-400"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-20" />
                <p className="text-2xl font-serif italic text-[#05070a]">Nenhum relato encontrado nesta coleção ainda.</p>
              </motion.div>
            )}

          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}