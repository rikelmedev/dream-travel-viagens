import { motion } from 'framer-motion';
import { ArrowRight, Award, HeartHandshake, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function AboutJackeline() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-32 bg-background transition-colors duration-1000 overflow-hidden relative">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-elite border border-border/50">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                alt="Jackeline - Curadora" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-serif text-3xl font-bold">Jackeline</p>
                <p className="text-sm font-light tracking-widest uppercase text-white/80">Fundadora & Curadora</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-8 leading-tight">
              A arte de viajar <br />
              <span className="italic text-primary font-light">com propósito.</span>
            </h2>
            
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 font-light">
              "Acredito que o verdadeiro luxo não está apenas num hotel cinco estrelas, mas sim no acesso ao inacessível. A minha missão é desenhar jornadas que toquem a alma, descobrindo segredos que os guias turísticos não revelam."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Map className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Roteiros à Medida</h4>
                  <p className="text-sm text-foreground/60">Cada viagem é desenhada do zero, respeitando o seu ritmo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Acesso Exclusivo</h4>
                  <p className="text-sm text-foreground/60">Parcerias com as propriedades mais reservadas do mundo.</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setLocation('/blog')}
              className="h-14 rounded-full bg-foreground text-background hover:bg-primary hover:text-white font-bold px-8 shadow-xl transition-all duration-300 group"
            >
              Ler o meu Diário
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}