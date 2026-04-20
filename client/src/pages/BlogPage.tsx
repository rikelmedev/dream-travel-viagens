import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import PageTransition from '@/components/PageTransition';

const MOCK_POSTS = [
  {
    id: '1',
    title: 'O Segredo Bem Guardado da Costa Amalfitana',
    excerpt: 'Longe das multidões de Positano, descobri uma vila de pescadores onde o tempo parou e o luxo se encontra na simplicidade.',
    category: 'Europa',
    date: '12 Out 2023',
    location: 'Itália',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Safari Lodge: Acordar com Elefantes',
    excerpt: 'A experiência indescritível de tomar café da manhã na savana sul-africana com a visita inesperada da vida selvagem.',
    category: 'Aventura',
    date: '28 Set 2023',
    location: 'África do Sul',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    featured: false
  },
  {
    id: '3',
    title: 'Gastronomia Estrelada em Tóquio',
    excerpt: 'Um roteiro pelos restaurantes omakase mais exclusivos da capital japonesa, reservados apenas para locais.',
    category: 'Gastronomia',
    date: '15 Ago 2023',
    location: 'Japão',
    image: 'https://images.unsplash.com/photo-1580828369019-22247b91fb0e?w=800&q=80',
    featured: false
  },
  {
    id: '4',
    title: 'Refúgio de Inverno nos Alpes Suíços',
    excerpt: 'Como é hospedar-se nos chalés mais isolados e luxuosos de Zermatt, com vista privilegiada para o Matterhorn.',
    category: 'Luxo',
    date: '10 Jul 2023',
    location: 'Suíça',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
    featured: false
  }
];

const CATEGORIES = ['Todos', 'Europa', 'Luxo', 'Aventura', 'Gastronomia'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    setSEOHead({
      title: 'Diário de Viagens | Dream Travel',
      description: 'Relatos, dicas e inspirações de viagens de luxo curadas por Jackeline.',
    });
  }, []);

  const filteredPosts = activeCategory === 'Todos' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeCategory);

  const featuredPost = MOCK_POSTS.find(p => p.featured);

  return (
    <PageTransition>
      <Layout>
        <section className="pt-32 pb-16 bg-slate-50">
          <div className="container px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-widest text-xs mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Journal da Curadora</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                Diário de <span className="italic text-primary">Viagens</span>
              </h1>
              <p className="text-lg text-slate-600 font-light">
                Inspire-se com os relatos reais e descubra os segredos dos destinos mais fascinantes do mundo, vividos e aprovados por Jackeline.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Post em Destaque (Estilo Revista) */}
        {featuredPost && activeCategory === 'Todos' && (
          <section className="py-12 bg-white">
            <div className="container px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer"
              >
                <div className="aspect-[21/9] md:aspect-[21/7] relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-4xl">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
                      Destaque da Editora
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-light mb-8 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span>{featuredPost.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Filtros e Grid de Posts */}
        <section className="py-16 bg-slate-50 min-h-screen">
          <div className="container px-4">
            
            {/* Filtros de Categoria */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-slate-900 text-white shadow-lg scale-105' 
                      : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Grid Assimetrico */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={post.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full border border-slate-100"
                  >
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-slate-400 text-xs font-medium mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{post.location}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
                        <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:origin-right after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-500">
                          Ler relato completo
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-24 text-slate-500">
                <p className="text-xl font-serif">Nenhum relato encontrado nesta categoria ainda.</p>
              </div>
            )}

          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}