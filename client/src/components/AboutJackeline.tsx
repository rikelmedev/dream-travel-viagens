import { motion } from 'framer-motion';
import { Award, Heart, Sparkles } from 'lucide-react';

export default function AboutJackeline() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* COLUNA DA IMAGEM */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 max-w-md mx-auto lg:mx-0">
              <img
                src="/images/jackeline-perfil.jpg"
                alt="Jackeline - Curadora Dream Travel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white font-serif text-3xl font-bold mb-1 drop-shadow-md">Jackeline</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] -z-10" />
          </motion.div>

          {/* COLUNA DO TEXTO */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
                <Sparkles className="w-4 h-4 fill-primary" />
                <span>A Alma da Dream Travel</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground leading-[1.1]">
                Viajar é viver o <span className="italic font-light text-primary">extraordinário.</span>
              </h2>
            </div>

            {/* TEXTO SOBRE */}
            <div className="space-y-4 text-foreground/80 font-light text-lg leading-relaxed">
              <p>
                Meu nome é Jackeline, e a minha história começou com um sonho: conhecer o mundo.
              </p>
              <p>
                Com o tempo, percebi que esse também é o sonho de muitas pessoas — mas que, muitas vezes, falta orientação, planejamento e segurança para torná-lo real. Foi por isso que criei a minha agência: para transformar sonhos em viagens bem planejadas, seguras e inesquecíveis.
              </p>
              <p>
                Aqui, cada detalhe é pensado para que você tenha a melhor experiência possível, sem preocupações. Do primeiro atendimento até o seu retorno, o meu compromisso é cuidar de tudo para que você apenas aproveite.
              </p>
              <p>
                Mais do que vender viagens, eu entrego tranquilidade, confiança e experiências que marcam a vida. Se você também sonha em conhecer o mundo, eu estou aqui para te ajudar a dar o primeiro passo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
              <div className="space-y-2">
                <Heart className="w-6 h-6 text-primary" />
                <h4 className="font-bold text-foreground font-serif text-lg">Atenção ao Detalhe</h4>
                <p className="text-sm text-foreground/60 font-light">Acompanhamento 24h, desde o primeiro rascunho até ao seu retorno.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}