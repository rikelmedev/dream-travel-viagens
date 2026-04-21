<section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
  <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDayTime ? 'bg-black/20' : 'bg-slate-950/80'}`} />
  
  <div className="container relative z-10 px-4 flex flex-col items-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-5xl"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
        Curadoria de Viagens de Elite
      </span>
      
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-white leading-[0.9] mb-8 drop-shadow-2xl">
        Onde o Luxo <br />
        <span className="italic font-light text-primary">Encontra a Alma</span>
      </h1>
      
      <p className="text-lg md:text-xl text-white/80 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
        Não apenas destinos. Criamos jornadas sensoriais desenhadas sob medida para o seu estilo de vida.
      </p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-full max-w-6xl bg-background/60 backdrop-blur-3xl p-2 rounded-[2.5rem] shadow-elite border border-white/10"
    >
      <div className="bg-background/90 rounded-[2.2rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="px-4 border-r border-border/50 group">
          <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">Destino</label>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <input type="text" placeholder="Para onde?" className="bg-transparent outline-none text-foreground font-serif text-xl placeholder:text-foreground/20 w-full" />
          </div>
        </div>

        <div className="px-4 border-r border-border/50">
          <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Check-in</label>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <input type="text" placeholder="Data" className="bg-transparent outline-none text-foreground font-serif text-xl w-full" />
          </div>
        </div>

        <div className="px-4">
          <label className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">Viajantes</label>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-foreground font-serif text-xl">02 Adultos</span>
          </div>
        </div>

        <Button className="h-16 rounded-[1.8rem] bg-primary text-white hover:brightness-110 font-bold text-lg shadow-2xl shadow-primary/20 group">
          Começar Jornada
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  </div>

  <img 
    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-hero-ocean-PEs2wkF3LLaDnS8fYBVMWk.webp"
    className="absolute inset-0 w-full h-full object-cover -z-10 scale-105 animate-slow-zoom"
    alt="Experiência Dream Travel"
  />
</section>