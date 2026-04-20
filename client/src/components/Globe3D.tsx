import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, Loader2, Globe2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Globe from 'react-globe.gl';

// Configuração de Rotas de Luxo (Arcos)
const ARC_DATA = [
  { startLat: -23.5505, startLng: -46.6333, endLat: 48.8566, endLng: 2.3522, color: ['#ffdb58', '#0077B6'] }, // SP -> Paris
  { startLat: -23.5505, startLng: -46.6333, endLat: 25.2048, endLng: 55.2708, color: ['#ffdb58', '#0077B6'] }, // SP -> Dubai
  { startLat: 40.7128, startLng: -74.0060, endLat: -3.2028, endLng: 73.2207, color: ['#0077B6', '#ffdb58'] }, // NY -> Maldivas
  { startLat: 51.5074, startLng: -0.1278, endLat: -33.9249, endLng: 18.4241, color: ['#0077B6', '#ffdb58'] }, // Londres -> Cape Town
];

export default function Globe3D() {
  const globeRef = useRef<any>();
  const [activeLocation, setActiveLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [, setLocation] = useLocation();

  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById('globe-container');
      if (container) {
        setDimensions({ width: container.offsetWidth, height: container.offsetHeight });
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableZoom = false;
      globeRef.current.pointOfView({ altitude: 2.0 });
    }
  }, [dimensions]);

  const fetchRealTimeLocationData = async (lat: number, lng: number) => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView({ lat, lng, altitude: 1.2 }, 1000);
    }
    setIsLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pt-BR`);
      const geo = await res.json();
      if (geo.error) throw new Error();

      const name = geo.address.city || geo.address.state || geo.address.country;
      const wikiRes = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
      const wiki = await wikiRes.json();

      setActiveLocation({
        name,
        country: geo.address.country,
        description: wiki.extract || `Destino exclusivo Dream Travel em ${name}.`,
        image: wiki.thumbnail?.source || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
      });
    } catch {
      setActiveLocation({
        name: "Destino Inexplorado",
        country: "Dream Travel",
        description: "Estamos a preparar uma experiência única para estas coordenadas.",
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="globe-container" className="relative w-full h-[600px] lg:h-[750px] bg-[#020617] rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,119,182,0.15)] border border-white/5">
      
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            
            // TEXTURAS NOTURNAS
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" 
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            
            // ATMOSFERA E BRILHO
            atmosphereColor="#4facfe"
            atmosphereAltitude={0.2}
            
            // ARCOS DE VOO (VIDA AO GLOBO)
            arcsData={ARC_DATA}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={4}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            
            // ANÉIS PULSANTES NOS CLIQUES
            ringsData={activeLocation ? [{ lat: activeLocation.lat, lng: activeLocation.lng }] : []}
            ringColor={() => '#ffdb58'}
            ringMaxRadius={5}
            ringPropagationSpeed={3}
            
            onGlobeClick={({ lat, lng }) => fetchRealTimeLocationData(lat, lng)}
          />
        )}
      </div>

      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Sistemas Online</span>
          </div>
          <h4 className="text-white font-serif text-xl mb-1">Exploração Global</h4>
          <p className="text-white/40 text-xs">Conectando você aos destinos mais remotos.</p>
        </div>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 z-10">
        <Zap className="w-4 h-4 text-[#ffdb58] fill-[#ffdb58] animate-bounce" />
        <span className="text-xs font-bold text-white uppercase tracking-widest">Toque num ponto de luz</span>
      </div>

      <AnimatePresence>
        {(activeLocation || isLoading) && (
          <motion.div
            initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            className="absolute top-6 right-6 bottom-6 w-full max-w-[380px] bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-20"
          >
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <Loader2 className="w-12 h-12 text-[#ffdb58] animate-spin mb-6" />
                <p className="text-white font-serif text-2xl">Rastreando...</p>
              </div>
            ) : (
              <>
                <div className="relative h-64">
                  <img src={activeLocation.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <button 
                    onClick={() => { setActiveLocation(null); globeRef.current.controls().autoRotate = true; }}
                    className="absolute top-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/10 hover:bg-primary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#ffdb58] text-[10px] font-bold uppercase tracking-widest mb-4">
                    <MapPin className="w-3 h-3" />
                    <span>{activeLocation.country}</span>
                  </div>
                  <h3 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">{activeLocation.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">{activeLocation.description}</p>
                  
                  <Button 
                    onClick={() => setLocation('/contato')}
                    className="w-full h-16 bg-white text-slate-900 hover:bg-[#ffdb58] hover:text-slate-900 font-bold rounded-2xl transition-all duration-500 group"
                  >
                    Planear esta Rota
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}