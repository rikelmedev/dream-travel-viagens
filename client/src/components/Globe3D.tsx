import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X, Loader2, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Globe from 'react-globe.gl';

interface LocationData {
  name: string;
  description: string;
  image: string;
  country: string;
}

export default function Globe3D() {
  const globeRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeLocation, setActiveLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [, setLocation] = useLocation();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
      globeRef.current.controls().enableZoom = false; 
      globeRef.current.pointOfView({ altitude: 2.2 });
    }
  }, [dimensions.width]);

  // Inteligência de busca em tempo real (OpenStreetMap + Wikipedia)
  const fetchRealTimeLocationData = useCallback(async (lat: number, lng: number) => {
    // Para a rotação e voa suavemente até ao local clicado
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView({ lat, lng, altitude: 1.2 }, 1200); 
    }

    setIsLoading(true);
    setActiveLocation(null);

    try {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pt-BR`
      );
      const geoData = await geoResponse.json();

      if (geoData.error) throw new Error("Oceano");

      const locationName = geoData.address.city || geoData.address.town || geoData.address.state || geoData.address.country;
      const countryName = geoData.address.country;

      const wikiResponse = await fetch(
        `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(locationName)}`
      );
      const wikiData = await wikiResponse.json();

      setActiveLocation({
        name: locationName,
        country: countryName,
        description: wikiData.extract || `Descubra os roteiros exclusivos que podemos preparar para si em ${locationName}.`,
        image: wikiData.thumbnail?.source || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'
      });
    } catch (error) {
      setActiveLocation({
        name: "Águas Internacionais",
        country: "Mundo",
        description: "Explore cruzeiros de luxo e expedições marítimas exclusivas navegando por águas cristalinas.",
        image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=800&q=80'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-slate-50/50 rounded-[2.5rem] overflow-hidden" ref={containerRef}>
      
      {/* Container do novo Globo 3D Leve */}
      <div className="absolute inset-0 flex items-center justify-center cursor-crosshair">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)" 
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" 
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" 
            onGlobeClick={({ lat, lng }) => fetchRealTimeLocationData(lat, lng)}
            atmosphereColor="#0077B6"
            atmosphereAltitude={0.15}
          />
        )}
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-slate-100 flex items-center gap-3 pointer-events-none z-10">
        <Globe2 className="w-5 h-5 text-primary animate-pulse" />
        <span className="text-xs md:text-sm font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap">
          Clique em qualquer país
        </span>
      </div>

      <AnimatePresence>
        {(activeLocation || isLoading) && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            className="absolute top-4 right-4 md:top-6 md:right-6 bottom-4 md:bottom-6 w-[calc(100%-2rem)] md:w-96 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col z-20"
          >
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Buscando coordenadas...</h3>
                <p className="text-slate-500 text-sm">Acessando satélites em tempo real.</p>
              </div>
            ) : activeLocation ? (
              <>
                <div className="relative h-48 md:h-56 shrink-0">
                  <img 
                    src={activeLocation.image} 
                    alt={activeLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <button 
                    onClick={() => {
                      setActiveLocation(null);
                      if (globeRef.current) globeRef.current.controls().autoRotate = true;
                    }}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Descoberta Dinâmica
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1 overflow-y-auto">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{activeLocation.country}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 mb-4 leading-tight">
                    {activeLocation.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {activeLocation.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Button 
                      onClick={() => setLocation('/contato')}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6 rounded-xl text-md group"
                    >
                      Personalizar Roteiro
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}