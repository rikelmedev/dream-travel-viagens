import { motion } from "framer-motion";
import { Button } from "@/components/painel/button";
import { Input } from "@/components/painel/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-luxury.jpg"
          className="h-full w-full object-cover"
          alt="Estrada nas montanhas"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container relative z-10 px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.5em] mb-4 block font-medium opacity-90">
          </span>
          <h1 className="font-serif text-5xl md:text-7xl mb-12 drop-shadow-lg">
            O Mundo, <br />
            <span className="italic font-light">Desenhado Para Si.</span>
          </h1>

          {/* Barra de Busca Refinada */}
          <div className="mx-auto max-w-5xl bg-white/90 backdrop-blur-md p-2 rounded-full shadow-2xl flex flex-wrap md:flex-nowrap items-center border border-white/20">
            <div className="flex-1 px-6 py-2 text-left border-r border-gray-200">
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Destino</label>
              <input type="text" placeholder="Para onde?" className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 outline-none text-sm" />
            </div>
            <div className="flex-1 px-6 py-2 text-left border-r border-gray-200">
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Ida</label>
              <input type="date" className="w-full bg-transparent text-gray-800 outline-none text-sm" />
            </div>
            <div className="flex-1 px-6 py-2 text-left border-r border-gray-200">
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Volta</label>
              <input type="date" className="w-full bg-transparent text-gray-800 outline-none text-sm" />
            </div>
            <div className="flex-1 px-6 py-2 text-left">
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Hóspedes</label>
              <input type="text" placeholder="Quantas pessoas?" className="w-full bg-transparent text-gray-800 outline-none text-sm" />
            </div>
            <Button className="rounded-full bg-[#C18D41] hover:bg-[#A67632] px-10 py-6 h-auto text-xs font-bold uppercase tracking-widest gap-2">
              SOLICITAR <Search className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;