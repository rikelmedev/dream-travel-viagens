import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useMapForm } from '@/contexts/MapFormContext';

/**
 * Interactive Map Component
 * Design: Minimalismo Contemporâneo
 * - Google Maps integrado via proxy Manus
 * - Marcadores para cada destino
 * - Interatividade com hover e click
 */

interface Destination {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

const destinations: Destination[] = [
  {
    id: 'maldivas',
    name: 'Maldivas',
    lat: 4.1694,
    lng: 73.5093,
    description: 'Bungalôs sobre água em lagoas cristalinas',
  },
  {
    id: 'bali',
    name: 'Bali',
    lat: -8.6705,
    lng: 115.2126,
    description: 'Templos antigos e praias paradisíacas',
  },
  {
    id: 'alpes',
    name: 'Alpes Suíços',
    lat: 46.8182,
    lng: 8.2275,
    description: 'Montanhas nevadas e resorts de luxo',
  },
];

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const { setSelectedDestinationName, scrollToForm } = useMapForm();

  useEffect(() => {
    // Carregar Google Maps dinamicamente
    if (typeof (window as any).google !== 'undefined') {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=marker';
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const google = (window as any).google;
    if (!google || !google.maps) return;

    const newMap = new google.maps.Map(mapRef.current, {
      zoom: 3,
      center: { lat: 15, lng: 30 },
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#264653' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e0f7ff' }],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f8f8f8' }],
        },
      ],
    });

    setMap(newMap);

    // Adicionar marcadores
    destinations.forEach((destination) => {
      const marker = new google.maps.Marker({
        position: { lat: destination.lat, lng: destination.lng },
        map: newMap,
        title: destination.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#0077B6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        },
      });

      // Info Window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-weight: 700; color: #264653;">
              ${destination.name}
            </h3>
            <p style="margin: 0; font-size: 12px; color: #666;">
              ${destination.description}
            </p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        // Fechar outras info windows
        Object.values(markersRef.current).forEach((m: any) => {
          if (m !== marker) {
            // Resetar ícone
            m.setIcon({
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#0077B6',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 3,
            });
          }
        });

        // Abrir info window
        infoWindow.open(newMap, marker);
        setSelectedDestination(destination.id);

        // Destacar marcador
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 16,
          fillColor: '#E9C46A',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        });

        // Centralizar mapa
        newMap.setCenter(marker.getPosition()!);
        newMap.setZoom(6);

        // Enviar destino ao contexto e scroll para o formulario
        setSelectedDestinationName(destination.name);
        setTimeout(() => scrollToForm(), 300);
      });

      marker.addListener('mouseover', () => {
        if (selectedDestination !== destination.id) {
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: '#00B4D8',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3,
          });
        }
      });

      marker.addListener('mouseout', () => {
        if (selectedDestination !== destination.id) {
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#0077B6',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3,
          });
        }
      });

      markersRef.current[destination.id] = marker;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4">Explore Nossos Destinos no Mapa 🗺️</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clique nos marcadores para conhecer mais sobre cada destino
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Map */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div
              ref={mapRef}
              className="w-full h-96 sm:h-[500px] rounded-2xl shadow-xl border-2 border-border overflow-hidden"
            />
          </motion.div>

          {/* Destinations List */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="font-bold text-foreground mb-6">Destinos</h3>
            {destinations.map((destination) => (
              <motion.button
                key={destination.id}
                onClick={() => {
                  const google = (window as any).google;
                  const marker = markersRef.current[destination.id];
                  if (marker && map && google) {
                    marker.setIcon({
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 16,
                      fillColor: '#E9C46A',
                      fillOpacity: 1,
                      strokeColor: '#FFFFFF',
                      strokeWeight: 3,
                    });
                    setSelectedDestination(destination.id);
                    map.setCenter(marker.getPosition()!);
                    map.setZoom(6);
                    
                    // Enviar destino ao contexto e scroll para o formulario
                    setSelectedDestinationName(destination.name);
                    setTimeout(() => scrollToForm(), 300);
                  }
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedDestination === destination.id
                    ? 'border-secondary bg-secondary/10'
                    : 'border-border hover:border-primary'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {destination.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
