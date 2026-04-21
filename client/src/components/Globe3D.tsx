import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, Loader2, Globe2, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Globe from 'react-globe.gl';

const ARC_DATA = [
  { startLat: -23.5505, startLng: -46.6333, endLat: 48.8566, endLng: 2.3522, color: ['#ffdb58', '#0077B6'] },
  { startLat: -23.5505, startLng: -46.6333, endLat: 25.2048, endLng: 55.2708, color: ['#ffdb58', '#0077B6'] },
  { startLat: 40.7128, startLng: -74.0060, endLat: -3.2028, endLng: 73.2207, color: ['#0077B6', '#ffdb58'] },
  { startLat: 51.5074, startLng: -0.1278, endLat: -33.9249, endLng: 18.4241, color: ['#0077B6', '#ffdb58'] },
];

export default function Globe3D() {
  const globeRef = useRef<any>();
  const [activeLocation, setActiveLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDayTime, setIsDayTime] = useState(true);
  const [, setLocation] = useLocation();

  // NOVO: Detetar a hora local do utilizador
  useEffect(() => {
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour < 18);
  }, []);

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
    <div id="globe-container" className={`relative w-full h-[600px] lg:h-[750px] rounded-[3rem] overflow-hidden transition-colors duration-1000 ${isDayTime ? 'bg-sky-50 shadow-xl border-slate-200' : 'bg-[#020617] shadow-[0_0_80px_rgba(0,119,182,0.15)] border-white/5 border'}`}>
      
      {/* Camada de Fundo Estrelada que só aparece de noite */}
      {!isDayTime && <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />}

      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            
            // INTELIGÊNCIA ARTIFICIAL: Muda a textura consoante a hora
            globeImageUrl={isDayTime 
              ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" 
              : "//unpkg.com/three-globe/example/img/earth-night.jpg"
            }
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            
            atmosphereColor={isDayTime ? "#87CEEB" : "#4facfe"}
            atmosphereAltitude={0.15}
            
            arcsData={ARC_DATA}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={4}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            
            ringsData={activeLocation ? [{ lat: activeLocation.lat, lng: activeLocation.lng }] : []}
            ringColor={() => isDayTime ? '#0077B6' : '#ffdb58'}
            ringMaxRadius={5}
            ringPropagationSpeed={3}
            
            onGlobeClick={({ lat, lng }) => fetchRealTimeLocationData(lat, lng)}
          />
        )}
      </div>

      {/* Interface de Controle que também muda de cor */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className={`backdrop-blur-xl border p-5 rounded-2xl transition-colors ${isDayTime ? 'bg-white/60 border-slate-200' : 'bg-black/40 border-white/10'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isDayTime ? 'bg-primary' : 'bg-emerald-500'}`} />
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>
              Satélite Conectado
            </span>
          </div>
          <h4 className={`font-serif text-xl mb-1 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Exploração Global</h4>
          <p className={`text-xs flex items-center gap-2 ${isDayTime ? 'text-slate-500' : 'text-white/40'}`}>
            {isDayTime ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            Modo {isDayTime ? 'Diurno' : 'Noturno'} Ativado
          </p>
        </div>
      </div>

      <div className={`absolute top-8 left-1/2 -translate-x-1/2 backdrop-blur-md border px-6 py-3 rounded-full flex items-center gap-3 z-10 ${isDayTime ? 'bg-white/80 border-slate-200' : 'bg-white/10 border-white/20'}`}>
        <Zap className={`w-4 h-4 animate-bounce ${isDayTime ? 'text-primary fill-primary' : 'text-[#ffdb58] fill-[#ffdb58]'}`} />
        <span className={`text-xs font-bold uppercase tracking-widest ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Toque num local</span>
      </div>

      {/* Painel Lateral */}
      <AnimatePresence>
        {(activeLocation || isLoading) && (
          <motion.div
            initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            className={`absolute top-6 right-6 bottom-6 w-full max-w-[380px] backdrop-blur-2xl rounded-[2.5rem] border shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-20 ${isDayTime ? 'bg-white/90 border-slate-200' : 'bg-slate-900/80 border-white/10'}`}
          >
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <Loader2 className={`w-12 h-12 animate-spin mb-6 ${isDayTime ? 'text-primary' : 'text-[#ffdb58]'}`} />
                <p className={`font-serif text-2xl ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Rastreando...</p>
              </div>
            ) : (
              <>
                <div className="relative h-64">
                  <img src={activeLocation.image} className="w-full h-full object-cover" alt="" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-white via-transparent to-transparent' : 'from-slate-950 via-transparent to-transparent'}`} />
                  <button 
                    onClick={() => { setActiveLocation(null); globeRef.current.controls().autoRotate = true; }}
                    className={`absolute top-6 right-6 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center border transition-colors ${isDayTime ? 'bg-white/50 border-slate-200 text-slate-900 hover:bg-slate-200' : 'bg-black/50 border-white/10 text-white hover:bg-primary'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-4 ${isDayTime ? 'text-primary' : 'text-[#ffdb58]'}`}>
                    <MapPin className="w-3 h-3" />
                    <span>{activeLocation.country}</span>
                  </div>
                  <h3 className={`text-4xl font-serif font-bold mb-4 leading-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>{activeLocation.name}</h3>
                  <p className={`text-sm leading-relaxed mb-8 flex-1 ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>{activeLocation.description}</p>
                  
                  <Button 
                    onClick={() => setLocation('/contato')}
                    className={`w-full h-16 font-bold rounded-2xl transition-all duration-500 group ${isDayTime ? 'bg-slate-900 text-white hover:bg-primary' : 'bg-white text-slate-900 hover:bg-[#ffdb58]'}`}
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