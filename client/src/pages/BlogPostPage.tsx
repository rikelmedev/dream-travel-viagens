import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/painel/button';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
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
    day: '2-digit', month: 'long', year: 'numeric'
  });
}

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success('Bem-vindo ao Círculo Restrito! Em breve receberá as nossas descobertas.');
    setNewsletterEmail('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/posts/${id}`)
      .then(res => {
        if (res.status === 404) {
          setNotFound(true);
          setIsLoading(false);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setPost(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setNotFound(true);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#C18D41] mb-6" />
        <p className="font-serif text-2xl text-[#05070a] italic">Preparando o relato...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-6">
          <p className="font-serif text-3xl text-[#05070a] italic">Relato nao encontrado.</p>
          <Button
            variant="ghost"
            onClick={() => setLocation('/blog')}
            className="text-gray-400 hover:text-[#05070a] uppercase tracking-widest text-[10px] font-bold rounded-full"
          >
            <ArrowLeft className="w-3 h-3 mr-3" /> Voltar ao Journal
          </Button>
        </div>
      </Layout>
    );
  }

  const paragraphs = post.content.split(/\n\n|\n/).filter(p => p.trim());

  return (
    <PageTransition>
      <Layout>
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#C18D41] z-[60] origin-left"
          style={{ scaleX: 0 }}
        />

        <div className="min-h-screen bg-[#FAF9F6]">
          <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-[#05070a]">
            {post.cover_image ? (
              <img
                src={post.cover_image}
                className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] transition-transform duration-[15s] hover:scale-105 opacity-80"
                alt={post.title}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#05070a] to-[#C18D41]/30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/20 to-transparent" />
          </section>

          <article className="relative -mt-40 pb-24 px-6 lg:px-12">
            <div className="container max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl p-10 md:p-20 border border-gray-100 relative overflow-hidden">

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#C18D41] to-transparent" />

              <Button
                variant="ghost"
                onClick={() => setLocation('/blog')}
                className="mb-12 -ml-4 text-gray-400 hover:text-[#05070a] group uppercase tracking-widest text-[10px] font-bold rounded-full"
              >
                <ArrowLeft className="w-3 h-3 mr-3 group-hover:-translate-x-2 transition-transform" />
                Voltar ao Journal
              </Button>

              <div className="flex flex-wrap items-center gap-4 text-[#C18D41] font-bold text-[9px] uppercase tracking-[0.3em] mb-8">
                {post.category && (
                  <span className="bg-[#C18D41]/10 px-4 py-2 rounded-full border border-[#C18D41]/20">{post.category}</span>
                )}
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                {post.location && (
                  <>
                    <span className="text-gray-300 hidden md:block">•</span>
                    <div className="hidden md:flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{post.location}</span>
                    </div>
                  </>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#05070a] leading-[1.1] mb-12">
                {post.title}
              </h1>

              <div className="flex items-center justify-between py-8 border-y border-gray-100 mb-16">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#C18D41]/30 bg-[#C18D41]/10 flex items-center justify-center">
                    <img
                      src="/images/jackeline-perfil.jpg"
                      alt="Jackeline"
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#05070a] uppercase tracking-widest">Jackeline</p>
                    <p className="text-[10px] text-[#C18D41] uppercase tracking-[0.2em] mt-1 font-bold">Curadora Chefe</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full border-gray-200 text-gray-400 hover:text-[#C18D41] hover:border-[#C18D41]">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-200 text-gray-400 hover:text-[#C18D41] hover:border-[#C18D41]">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className={`text-gray-500 font-light leading-loose text-lg ${
                      i === 0
                        ? 'first-letter:text-8xl first-letter:font-serif first-letter:text-[#C18D41] first-letter:float-left first-letter:mr-6 first-letter:-mt-4 first-letter:leading-[0.8]'
                        : ''
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-24 p-12 md:p-16 bg-[#05070a] rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C18D41]/10 blur-[80px] rounded-full" />

                <div className="flex justify-center mb-6">
                  <div className="h-px w-12 bg-[#C18D41]/50" />
                </div>

                <h3 className="text-4xl font-serif font-bold mb-6 relative z-10">Convite Exclusivo</h3>
                <p className="text-white/60 mb-10 max-w-md mx-auto relative z-10 font-light leading-relaxed">
                  Receba no seu e-mail as novas descobertas e roteiros secretos curados pela nossa equipa antes de irem a público.
                </p>

                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto relative z-10 bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10">
                  <input
                    type="email"
                    required
                    placeholder="O seu melhor e-mail"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none px-6 py-4 text-sm focus:outline-none text-white placeholder:text-white/30"
                  />
                  <Button type="submit" className="bg-[#C18D41] hover:bg-[#A67632] text-white font-bold rounded-full px-10 h-14 uppercase tracking-widest text-[10px] shadow-lg shadow-[#C18D41]/20">
                    Aderir ao Círculo
                  </Button>
                </form>
              </div>

            </div>
          </article>
        </div>
      </Layout>
    </PageTransition>
  );
}
