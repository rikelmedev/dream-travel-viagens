import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-luxury.jpg" 
          alt="Luxury Destination"
          className="h-full w-full object-cover transition-transform duration-[10s] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent z-10" />
      </div>

      <div className="container relative z-20 flex h-full flex-col justify-center px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }} 
          className="max-w-2xl text-left" 
        >
          {/* Tagline superior */}
          <span className="mb-4 block text-sm font-medium tracking-[0.4em] text-white/80 uppercase">
            Sua próxima obra-prima
          </span>
          <h1 className="mb-6 font-serif text-5xl leading-tight text-white md:text-7xl lg:text-8xl font-light">
            O Mundo, <br /> 
            <span className="italic">Desenhado Para Si</span>.
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-12">
            <Button size="lg" className="rounded-full px-8 py-7 text-base font-semibold transition-all hover:scale-105 bg-accent text-accent-foreground">
              Explorar Destinos
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/60 px-8 py-7 text-base font-semibold text-white hover:bg-white hover:text-black">
              Falar com Consultor
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Indicador de Scroll Minimalista */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;