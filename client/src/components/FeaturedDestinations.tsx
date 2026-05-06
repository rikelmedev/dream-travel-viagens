import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    title: "Atol de Baa",
    location: "Maldivas",
    image: "/images/maldivas.jpg",
    price: "8.500",
    rating: 5.0,
    size: "large",
  },
  {
    id: 2,
    title: "Ilha de Capri",
    location: "Itália",
    image: "/images/capri.jpg",
    price: "12.200",
    rating: 4.9,
    size: "medium",
  },
  {
    id: 3,
    title: "Zermatt",
    location: "Suíça",
    image: "/images/zermatt.jpg",
    price: "9.800",
    rating: 4.8,
    size: "small",
  },
  {
    id: 4,
    title: "Quioto",
    location: "Japão",
    image: "/images/kyoto.jpg",
    price: "7.400",
    rating: 5.0,
    size: "small",
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-6 lg:px-12">
        
        {/* Header da Secção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-[#C18D41] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
              Curadoria Dream Travel
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#05070a] leading-tight">
              A Nossa Coleção de <br />
              <span className="italic font-light">Destinos Ímpares</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="ghost" className="group text-[#C18D41] hover:text-[#A67632] p-0 text-sm font-bold tracking-widest uppercase gap-2 transition-all">
              Ver todos os destinos <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative group overflow-hidden rounded-3xl cursor-pointer ${
                dest.size === "large" ? "md:col-span-2 md:row-span-2" : 
                dest.size === "medium" ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"
              }`}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Conteúdo do Card */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/70 mb-1 block">
                      {dest.location}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl mb-1">
                      {dest.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#C18D41]">
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-[10px] font-bold text-white/60">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-widest text-white/50 block">A partir de</span>
                    <span className="text-lg font-serif">€ {dest.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;