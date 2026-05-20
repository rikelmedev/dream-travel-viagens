import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { setSEOHead } from '@/components/SEOHead';
import PageTransition from '@/components/PageTransition';

const MOCK_ARTICLE = {
  id: 'segredo-costa-amalfitana',
  title: 'O Segredo Bem Guardado da Costa Amalfitana',
  category: 'Europa',
  date: '12 Out 2026',
  location: 'Praiano, Itália',
  author: 'Jackeline',
  image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=80',
  content: `
    <p class="dropcap">Longe das multidões vibrantes de Positano e do glamour por vezes excessivo de Amalfi, existe um refúgio onde o tempo parece ter decidido repousar. Praiano, uma pequena vila encravada nas falésias, foi a minha maior descoberta nesta última curadoria pela Itália.</p>
    
    <h2>A Essência da Calma</h2>
    <p>Diferente das suas vizinhas famosas, aqui não ouvimos o barulho incessante dos motores. Ouvimos o mar. Hospedei-me num hotel boutique que outrora foi um convento do século XVI. A sensação de acordar com o sol a bater na pedra calcária branca e o azul infinito à minha frente é algo que nenhuma fotografia consegue capturar totalmente.</p>
    
    <div class="my-14 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" class="rounded-[2rem] shadow-xl grayscale-[10%] contrast-[1.05]" alt="Vista de Praiano" />
      <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800" class="rounded-[2rem] shadow-xl grayscale-[10%] contrast-[1.05]" alt="Gastronomia Local" />
    </div>

    <h2>Gastronomia sem Filtros</h2>
    <p>Foi em Praiano que comi a melhor pasta al limone da minha vida. Um pequeno restaurante familiar, sem sinalização na porta, onde a nonna Maria cozinha o que o mar entregou naquela manhã. É este tipo de experiência o luxo da autenticidade que eu faço questão de incluir nos roteiros da Dream Travel.</p>
    
    <blockquote>
      Viajar não é sobre acumular quilómetros, é sobre permitir que um lugar mude a nossa frequência interna.
    </blockquote>

    <p>Se procura o burburinho, vá a Capri. Se procura reencontrar a sua paz interior, deixe a nossa equipa desenhar a sua estadia em Praiano.</p>
  `
};

export default function BlogPostPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOHead({
      title: `${MOCK_ARTICLE.title} | Journal Dream Travel`,
      description: "Um relato exclusivo da nossa curadora sobre os encantos escondidos da Europa.",
      image: MOCK_ARTICLE.image
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Layout>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-[#C18D41] z-[60] origin-left"
          style={{ scaleX: 0 }} 
        />

        <div className="min-h-screen bg-[#FAF9F6]">
          <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-[#05070a]">
            <img 
              src={MOCK_ARTICLE.image} 
              className="w-full h-full object-cover grayscale-[10%] contrast-[1.05] transition-transform duration-[15s] hover:scale-105 opacity-80" 
              alt={MOCK_ARTICLE.title} 
            />
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

              <div className="flex items-center gap-4 text-[#C18D41] font-bold text-[9px] uppercase tracking-[0.3em] mb-8">
                <span className="bg-[#C18D41]/10 px-4 py-2 rounded-full border border-[#C18D41]/20">{MOCK_ARTICLE.category}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{MOCK_ARTICLE.date}</span>
                </div>
                <span className="text-gray-300 hidden md:block">•</span>
                <div className="hidden md:flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{MOCK_ARTICLE.location}</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#05070a] leading-[1.1] mb-12">
                {MOCK_ARTICLE.title}
              </h1>

              <div className="flex items-center justify-between py-8 border-y border-gray-100 mb-16">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#C18D41]/30">
                     <img src="/images/jackeline-perfil.jpg" alt="Jackeline" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#05070a] uppercase tracking-widest">Jackeline</p>
                    <p className="text-[10px] text-[#C18D41] uppercase tracking-[0.2em] mt-1 font-bold">Curadora Chefe</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full border-gray-200 text-gray-400 hover:text-[#C18D41] hover:border-[#C18D41]"><Share2 className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-200 text-gray-400 hover:text-[#C18D41] hover:border-[#C18D41]"><Bookmark className="w-4 h-4" /></Button>
                </div>
              </div>

              <div 
                className="prose prose-lg max-w-none 
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#05070a] prose-headings:mt-16 prose-headings:mb-8
                  prose-p:text-gray-500 prose-p:leading-loose prose-p:text-lg
                  prose-blockquote:border-l-[#C18D41] prose-blockquote:bg-[#FAF9F6] prose-blockquote:py-6 prose-blockquote:px-10 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:text-3xl prose-blockquote:font-serif prose-blockquote:text-[#05070a]/80 prose-blockquote:my-14
                  [&_.dropcap]:text-8xl [&_.dropcap]:font-serif [&_.dropcap]:float-left [&_.dropcap]:mr-6 [&_.dropcap]:-mt-4 [&_.dropcap]:text-[#C18D41] [&_.dropcap]:leading-[0.8]"
                dangerouslySetInnerHTML={{ __html: MOCK_ARTICLE.content }}
              />

              <div className="mt-24 p-12 md:p-16 bg-[#05070a] rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#C18D41]/10 blur-[80px] rounded-full" />
                 
                 <div className="flex justify-center mb-6">
                   <div className="h-px w-12 bg-[#C18D41]/50" />
                 </div>
                 
                 <h3 className="text-4xl font-serif font-bold mb-6 relative z-10">Convite Exclusivo</h3>
                 <p className="text-white/60 mb-10 max-w-md mx-auto relative z-10 font-light leading-relaxed">
                   Receba no seu e mail as novas descobertas e roteiros secretos curados pela nossa equipa antes de irem a publico.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto relative z-10 bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10">
                   <input type="email" placeholder="O seu melhor e mail" className="flex-1 bg-transparent border-none px-6 py-4 text-sm focus:outline-none text-white placeholder:text-white/30" />
                   <Button className="bg-[#C18D41] hover:bg-[#A67632] text-white font-bold rounded-full px-10 h-14 uppercase tracking-widest text-[10px] shadow-lg shadow-[#C18D41]/20">Aderir ao Circulo</Button>
                 </div>
              </div>

            </div>
          </article>
        </div>
      </Layout>
    </PageTransition>
  );
}