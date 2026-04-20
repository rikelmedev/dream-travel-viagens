import { useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import PageTransition from '@/components/PageTransition';

const MOCK_ARTICLE = {
  id: 'segredo-costa-amalfitana',
  title: 'O Segredo Bem Guardado da Costa Amalfitana',
  category: 'Europa',
  date: '12 de Outubro, 2023',
  location: 'Praiano, Itália',
  author: 'Jackeline',
  image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=80',
  content: `
    <p class="dropcap">Longe das multidões vibrantes de Positano e do glamour por vezes excessivo de Amalfi, existe um refúgio onde o tempo parece ter decidido repousar. Praiano, uma pequena vila encravada nas falésias, foi a minha maior descoberta nesta última curadoria pela Itália.</p>
    
    <h2>A Essência da Calma</h2>
    <p>Diferente das suas vizinhas famosas, aqui não ouvimos o barulho incessante dos motores. Ouvimos o mar. Hospedei-me num hotel boutique que outrora foi um convento do século XVI. A sensação de acordar com o sol a bater na pedra calcária branca e o azul infinito à minha frente é algo que nenhuma fotografia consegue capturar totalmente.</p>
    
    <div class="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" class="rounded-3xl shadow-lg" alt="Vista de Praiano" />
      <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800" class="rounded-3xl shadow-lg" alt="Gastronomia Local" />
    </div>

    <h2>Gastronomia sem Filtros</h2>
    <p>Foi em Praiano que comi a melhor *Pasta al Limone* da minha vida. Um pequeno restaurante familiar, sem sinalização na porta, onde a "nonna" Maria cozinha o que o mar entregou naquela manhã. É este tipo de experiência — o luxo da autenticidade — que eu faço questão de incluir nos roteiros da Dream Travel.</p>
    
    <blockquote>
      "Viajar não é sobre acumular quilómetros, é sobre permitir que um lugar mude a nossa frequência interna."
    </blockquote>

    <p>Se procura o burburinho, vá a Capri. Se procura reencontrar-se, deixe-me desenhar a sua estadia em Praiano.</p>
  `
};

export default function BlogPostPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: `${MOCK_ARTICLE.title} | Diário Dream Travel`,
      description: "Um relato exclusivo da nossa curadora Jackeline sobre os encantos escondidos da Itália.",
      image: MOCK_ARTICLE.image
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Layout>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
          style={{ scaleX: 0 }} 
        />

        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <img 
            src={MOCK_ARTICLE.image} 
            className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110" 
            alt={MOCK_ARTICLE.title} 
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </section>

        <article className="relative -mt-32 pb-24 px-4">
          <div className="container max-w-3xl mx-auto bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] p-8 md:p-16 border border-slate-50">
            
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/blog')}
              className="mb-8 -ml-2 text-slate-400 hover:text-primary group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar ao Diário
            </Button>

            <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6">
              <span className="bg-primary/10 px-3 py-1 rounded-full">{MOCK_ARTICLE.category}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{MOCK_ARTICLE.date}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 leading-[1.1] mb-8">
              {MOCK_ARTICLE.title}
            </h1>

            <div className="flex items-center justify-between py-8 border-y border-slate-100 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden ring-2 ring-primary/20">
                   <img src="/images/jackeline.jpg" alt="Jackeline" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src='https://ui-avatars.com/api/?name=Jackeline&background=0077B6&color=fff'} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Jackeline</p>
                  <p className="text-xs text-slate-500 italic">Especialista & Curadora</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-full"><Bookmark className="w-4 h-4" /></Button>
              </div>
            </div>

            <div 
              className="prose prose-slate prose-lg max-w-none 
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-justify
                prose-blockquote:border-l-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-serif
                [&_.dropcap]:text-7xl [&_.dropcap]:font-serif [&_.dropcap]:float-left [&_.dropcap]:mr-3 [&_.dropcap]:mt-2 [&_.dropcap]:text-primary [&_.dropcap]:leading-[0.8]"
              dangerouslySetInnerHTML={{ __html: MOCK_ARTICLE.content }}
            />

            <div className="mt-20 p-10 bg-slate-900 rounded-[2.5rem] text-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
               <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Gostou deste relato?</h3>
               <p className="text-slate-400 mb-8 max-w-md mx-auto relative z-10">Receba no seu e-mail as novas descobertas e roteiros secretos curados pela nossa equipa.</p>
               <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
                 <input type="email" placeholder="O seu melhor e-mail" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                 <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-8">Inscrever</Button>
               </div>
            </div>

          </div>
        </article>
      </Layout>
    </PageTransition>
  );
}