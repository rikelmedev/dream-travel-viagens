import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, Loader2, Globe2, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Globe from 'react-globe.gl';

const ARC_DATA = [
  { startLat: -23.5505, startLng: -46.6333, endLat: 48.8566, endLng: 2.3522, color: ['#C18D41', '#05070a'] },
  { startLat: -23.5505, startLng: -46.6333, endLat: 25.2048, endLng: 55.2708, color: ['#C18D41', '#05070a'] },
  { startLat: 40.7128, startLng: -74.0060, endLat: -3.2028, endLng: 73.2207, color: ['#05070a', '#C18D41'] },
  { startLat: 51.5074, startLng: -0.1278, endLat: -33.9249, endLng: 18.4241, color: ['#05070a', '#C18D41'] },
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
        description: "Estamos a desenhar uma experiência única para estas coordenadas.",
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="globe-container" className="relative w-full h-[600px] lg:h-[750px] rounded-[3rem] overflow-hidden bg-[#FAF9F6] shadow-[0_20px_50px_rgba(5,7,10,0.05)] border border-gray-200">
      
      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            
            // Textura clara e elegante
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" 
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            
            atmosphereColor="#C18D41"
            atmosphereAltitude={0.15}
            
            arcsData={ARC_DATA}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={4}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            
            ringsData={activeLocation ? [{ lat: activeLocation.lat, lng: activeLocation.lng }] : []}
            ringColor={() => '#C18D41'}
            ringMaxRadius={5}
            ringPropagationSpeed={3}
            
            onGlobeClick={({ lat, lng }) => fetchRealTimeLocationData(lat, lng)}
          />
        )}
      </div>

      {/* Interface de Controle */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="backdrop-blur-xl bg-white/70 border border-gray-200/60 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#C18D41]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
              Mapeamento Global
            </span>
          </div>
          <h4 className="font-serif text-2xl mb-1 text-[#05070a]">Curadoria Ativa</h4>
          <p className="text-[11px] font-medium uppercase tracking-widest flex items-center gap-2 text-gray-400">
            <Globe2 className="w-3 h-3 text-[#C18D41]" />
            Satélite Dream Travel
          </p>
        </div>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/80 border border-gray-200/60 px-8 py-4 rounded-full flex items-center gap-3 z-10 shadow-sm">
        <Compass className="w-4 h-4 text-[#C18D41] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#05070a]">Explore o Globo</span>
      </div>

      {/* Painel Lateral */}
      <AnimatePresence>
        {(activeLocation || isLoading) && (
          <motion.div
            initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            className="absolute top-6 right-6 bottom-6 w-full max-w-[400px] backdrop-blur-2xl bg-white/95 rounded-[2.5rem] border border-gray-100 shadow-[0_40px_100px_rgba(5,7,10,0.1)] overflow-hidden flex flex-col z-20"
          >
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mb-6 text-[#C18D41]" />
                <p className="font-serif text-2xl text-[#05070a] italic">Localizando...</p>
              </div>
            ) : (
              <>
                <div className="relative h-72">
                  <img src={activeLocation.image} className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  <button 
                    onClick={() => { setActiveLocation(null); globeRef.current.controls().autoRotate = true; }}
                    className="absolute top-6 right-6 w-10 h-10 backdrop-blur-md bg-white/50 hover:bg-white rounded-full flex items-center justify-center border border-gray-200 text-[#05070a] transition-all shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] mb-4 text-[#C18D41]">
                    <MapPin className="w-3 h-3" />
                    <span>{activeLocation.country}</span>
                  </div>
                  <h3 className="text-4xl font-serif font-bold mb-4 leading-tight text-[#05070a]">
                    {activeLocation.name}
                  </h3>
                  <p className="text-sm font-light leading-relaxed mb-8 flex-1 text-gray-500">
                    {activeLocation.description}
                  </p>
                  
                  <Button 
                    onClick={() => setLocation('/contato')}
                    className="w-full h-14 font-bold uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-500 group bg-[#05070a] text-white hover:bg-[#C18D41] shadow-lg shadow-[#05070a]/10"
                  >
                    Desenhar Roteiro
                    <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
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