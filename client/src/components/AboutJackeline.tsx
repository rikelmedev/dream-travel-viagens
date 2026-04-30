import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AboutJackeline() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* FOTO DA FUNDADORA*/}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-5/12"
          >
            <div className="relative rounded-t-[10rem] rounded-b-[2rem] overflow-hidden border border-border/50 p-2 shadow-2xl bg-white/5">
              <img 
                src="/images/jackeline-perfil.jpg" 
                alt="Jackeline - Curadora Dream Travel" 
                className="w-full h-[600px] object-cover rounded-t-[9.5rem] rounded-b-[1.5rem]"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay rounded-t-[10rem] rounded-b-[2rem]" />
            </div>
          </motion.div>

          {/* TEXTO EDITORIAL */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-7/12 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
              <Sparkles className="w-3 h-3" />
              <span>A Curadora</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] mb-12">
              Transformando Sonhos em <br/>
              <span className="italic font-light text-foreground/70">Destinos Inesquecíveis.</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
              <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:-mt-2">
                Meu nome é Jackeline, e a minha história começou com um sonho: conhecer o mundo. Com o tempo, percebi que esse também é o sonho de muitas pessoas — mas que, muitas vezes, falta orientação, planejamento e segurança para torná-lo real.
              </p>
              
              <p>
                Foi por isso que criei a minha agência: para transformar sonhos em viagens bem planejadas, seguras e inesquecíveis. Aqui, cada detalhe é pensado para que você tenha a melhor experiência possível, sem preocupações.
              </p>

              <p className="italic text-foreground/90 font-serif border-l-2 border-primary/30 pl-6 py-2">
                Do primeiro atendimento até o seu retorno, o meu compromisso é cuidar de tudo para que você apenas aproveite. Mais do que vender viagens, eu entrego tranquilidade, confiança e experiências que marcam a vida.
              </p>

              <p className="font-bold text-foreground/90 pt-4">
                Se você também sonha em conhecer o mundo, eu estou aqui para te ajudar a dar o primeiro passo.
              </p>
            </div>

            {/* Assinatura */}
            <div className="mt-12 pt-8 border-t border-border/40 flex flex-col items-start">
              <span className="font-serif text-4xl text-foreground opacity-90 italic">Jackeline</span>
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold mt-2">Fundadora</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}