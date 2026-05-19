import { motion } from 'framer-motion';

export default function AboutJackeline() {
  return (
    <section className="py-24 md:py-32 bg-[#05070a] relative overflow-hidden" id="sobre">
      
      {/* Linha Divisória de Topo Sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* FOTO DA FUNDADORA COM CORTE EM ARCO */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-5/12"
          >
            <div className="relative rounded-t-[12rem] rounded-b-[2rem] overflow-hidden border border-white/10 p-2 shadow-2xl bg-white/5 group">
              <img 
                src="/images/jackeline-perfil.jpg" 
                alt="Jackeline - Curadora Dream Travel" 
                className="w-full h-[600px] object-cover rounded-t-[11.5rem] rounded-b-[1.5rem] grayscale-[15%] contrast-[1.1] transition-transform duration-[10s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#C18D41]/10 mix-blend-overlay rounded-t-[12rem] rounded-b-[2rem]" />
            </div>
          </motion.div>

          {/* TEXTO EDITORIAL */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-7/12 flex flex-col justify-center"
          >
            {/* Tagline superior */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C18D41]/50" />
              <span className="text-[#C18D41] text-[10px] uppercase tracking-[0.5em] font-bold">
                A Curadora
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-12">
              Transformando Sonhos em <br/>
              <span className="italic font-light text-[#C18D41]">Destinos Inesquecíveis.</span>
            </h2>

            <div className="space-y-8 text-lg text-white/70 font-light leading-relaxed max-w-2xl">
              <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-[#C18D41] first-letter:float-left first-letter:mr-4 first-letter:-mt-2">
                Meu nome é Jackeline, e a minha história começou com um sonho: conhecer o mundo. Com o tempo, percebi que esse também é o sonho de muitas pessoas — mas que, muitas vezes, falta orientação, planejamento e segurança para torná-lo real.
              </p>
              
              <p>
                Foi por isso que criei a minha agência: para transformar sonhos em viagens bem planejadas, seguras e inesquecíveis. Aqui, cada detalhe é pensado para que você tenha a melhor experiência possível, sem preocupações.
              </p>

              {/* Bloco de Citação */}
              <p className="italic text-white/90 font-serif border-l-2 border-[#C18D41]/50 pl-6 py-2 text-xl leading-relaxed">
                "Do primeiro atendimento até o seu retorno, o meu compromisso é cuidar de tudo para que você apenas aproveite. Mais do que vender viagens, eu entrego tranquilidade, confiança e experiências que marcam a vida."
              </p>

              <p className="font-bold text-white/90 pt-4 text-xs uppercase tracking-widest">
                Se você também sonha em conhecer o mundo, eu estou aqui para ajudar a dar o primeiro passo.
              </p>
            </div>

            {/* Assinatura */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-start">
              <span className="font-serif text-5xl text-white opacity-90 italic">Jackeline</span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#C18D41] font-bold mt-4">
                Fundadora
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}