import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-luxury.jpg" 
          alt="Luxury Destination"
          className="h-full w-full object-cover transition-transform duration-[10s] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Conteúdo da Hero */}
      <div className="container relative z-10 flex h-full flex-col justify-center px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="mb-4 block text-sm font-medium tracking-[0.3em] text-primary uppercase">
            Experiências Exclusivas
          </span>
          <h1 className="mb-6 font-serif text-5xl leading-tight text-white md:text-7xl lg:text-8xl">
            Onde seus <br /> 
            <span className="italic text-primary-foreground/90">Sonhos</span> ancoram.
          </h1>
          <p className="mb-8 max-w-lg text-lg text-gray-200 md:text-xl">
            Viagens para destinos inexplorados. Viva o extraordinário com a Dream Travel.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-105">
              Explorar Destinos
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white px-8 py-6 text-base font-semibold text-white hover:bg-white hover:text-black">
              Falar com Consultor
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="h-12 w-[1px] bg-gradient-to-b from-white/80 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;