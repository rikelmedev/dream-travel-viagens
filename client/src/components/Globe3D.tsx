import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ArrowRight, X, Loader2, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

interface LocationData {
  name: string;
  description: string;
  image: string;
  country: string;
}

export default function Globe3D() {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  
  const [activeLocation, setActiveLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  // Função para buscar dados em tempo real da internet
  const fetchRealTimeLocationData = async (lat: number, lng: number) => {
    setIsLoading(true);
    setActiveLocation(null); // Limpa o anterior para mostrar o loading

    try {
      // 1. Descobrir onde o usuário clicou
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pt-BR`
      );
      const geoData = await geoResponse.json();

      if (geoData.error) {
        throw new Error("Oceano ou área não mapeada");
      }

      const locationName = geoData.address.city || geoData.address.town || geoData.address.state || geoData.address.country;
      const countryName = geoData.address.country;

      // 2. Buscar informações e foto real na Wikipedia
      const wikiResponse = await fetch(
        `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(locationName)}`
      );
      const wikiData = await wikiResponse.json();

      setActiveLocation({
        name: locationName,
        country: countryName,
        description: wikiData.extract || `Descubra as maravilhas e roteiros exclusivos que podemos preparar para você em ${locationName}, ${countryName}.`,
        image: wikiData.thumbnail?.source || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'
      });

    } catch (error) {
      console.log("Erro ao buscar local:", error);
      setActiveLocation({
        name: "Águas Internacionais",
        country: "Mundo",
        description: "Explore cruzeiros de luxo e expedições marítimas exclusivas navegando por águas cristalinas.",
        image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=800&q=80'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!cesiumContainer.current || viewerRef.current) return;

    const viewer = new Cesium.Viewer(cesiumContainer.current, {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: true, // Mostra o anel verde onde clicou
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      scene3DOnly: true,
      creditContainer: document.createElement('div'),
    });

    viewer.scene.globe.enableLighting = true;
    viewer.scene.skyAtmosphere.show = true;
    viewer.scene.sun.show = false;
    viewer.scene.moon.show = false;
    viewer.scene.skyBox.show = false;
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#ffffff');

    // Foco inicial
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(-50.0, 0.0, 18000000),
    });

    // Evento de CLIQUE EM QUALQUER LUGAR do globo
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click: any) => {
      // Pega a posição exata da Terra onde o usuário clicou
      const ellipsoid = viewer.scene.globe.ellipsoid;
      const cartesian = viewer.camera.pickEllipsoid(click.position, ellipsoid);

      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const lng = Cesium.Math.toDegrees(cartographic.longitude);
        const lat = Cesium.Math.toDegrees(cartographic.latitude);

        // Voar suavemente para o local clicado
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(lng, lat, 2500000),
          duration: 1.5,
        });

        // Dispara a busca em tempo real
        fetchRealTimeLocationData(lat, lng);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // Rotação automática suave
    viewer.clock.onTick.addEventListener(() => {
      if (!isLoading && !activeLocation) {
        viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0005);
      }
    });

    viewerRef.current = viewer;

    return () => {
      handler.destroy();
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] bg-white rounded-3xl overflow-hidden">
      <div ref={cesiumContainer} className="absolute inset-0 w-full h-full cursor-crosshair" />
      
      {/* Dica de interação */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-slate-100 flex items-center gap-3 pointer-events-none z-10">
        <Globe2 className="w-5 h-5 text-primary animate-pulse" />
        <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">Clique em qualquer país do globo</span>
      </div>

      {/* Painel Interativo em Tempo Real */}
      <AnimatePresence>
        {(activeLocation || isLoading) && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            className="absolute top-6 right-6 bottom-6 w-80 md:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden flex flex-col z-20"
          >
            {isLoading ? (
              // Tela de Carregamento 
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Buscando coordenadas...</h3>
                <p className="text-slate-500 text-sm">Satélites rastreando o destino selecionado em tempo real.</p>
              </div>
            ) : activeLocation ? (
              // Resultado Encontrado
              <>
                <div className="relative h-56 shrink-0">
                  <img 
                    src={activeLocation.image} 
                    alt={activeLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <button 
                    onClick={() => setActiveLocation(null)}
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
                  <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4 leading-tight">
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
                      Solicitar Roteiro para {activeLocation.name.split(' ')[0]}
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