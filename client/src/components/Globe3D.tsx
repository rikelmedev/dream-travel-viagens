import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useMapForm } from '@/contexts/MapFormContext';
import DestinationPopup, { DestinationInfo } from './DestinationPopup';

/**
 * Globe3D Component
 * Design: Globo 3D interativo com Cesium.js
 * - Visualização realista do planeta
 * - Seleção de destinos com clique
 * - Integração com formulário
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

const destinationDetails: { [key: string]: DestinationInfo } = {
  maldivas: {
    id: 'maldivas',
    name: 'Maldivas',
    description: 'Bungalôs sobre água em lagoas cristalinas',
    fullDescription: 'As Maldivas são um paraíso tropical no Oceano Índico, famosas por suas águas cristalinas, recifes de coral vibrantes e resorts de luxo. Perfeito para casais em lua de mel e viajantes em busca de relaxamento absoluto.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    activities: ['Mergulho', 'Snorkel', 'Spa', 'Passeios de barco', 'Pesca'],
    bestSeason: 'Novembro a Março',
    climate: 'Tropical, 24-30°C',
    highlights: [
      'Recifes de coral intactos',
      'Resorts all-inclusive de luxo',
      'Vida marinha exuberante',
      'Praias de areia branca',
    ],
  },
  bali: {
    id: 'bali',
    name: 'Bali',
    description: 'Templos antigos e praias paradisíacas',
    fullDescription: 'Bali é um destino versátil que oferece desde templos antigos e tradições culturais até praias paradisíacas e vida noturna vibrante. Ideal para viajantes que buscam experiências culturais, aventura e relaxamento.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    activities: ['Yoga', 'Surf', 'Trekking', 'Cultura', 'Gastronomia'],
    bestSeason: 'Abril a Outubro',
    climate: 'Tropical, 25-32°C',
    highlights: [
      'Templos hindus milenares',
      'Arrozais em terraços',
      'Praias de areia vulcânica',
      'Vida cultural rica',
    ],
  },
  alpes: {
    id: 'alpes',
    name: 'Alpes Suíços',
    description: 'Montanhas nevadas e resorts de luxo',
    fullDescription: 'Os Alpes Suíços oferecem paisagens de tirar o fôlego com montanhas nevadas, vales verdes e vilas pitorescas. Perfeito para esqui no inverno, trilhas no verão e experiências gastronômicas de classe mundial.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    activities: ['Esqui', 'Trilhas', 'Escalada', 'Gastronomia', 'Fotografia'],
    bestSeason: 'Dezembro a Fevereiro (esqui) ou Junho a Setembro (verão)',
    climate: 'Alpino, -10 a 20°C',
    highlights: [
      'Montanhas de 4000+ metros',
      'Vilas medievais encantadoras',
      'Culinária de classe mundial',
      'Trens panorâmicos',
    ],
  },
};

export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<any>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedPopupDestination, setSelectedPopupDestination] = useState<DestinationInfo | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setSelectedDestinationName, scrollToForm } = useMapForm();
  const entitiesRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    // Esperar Cesium carregar do CDN
    const checkCesium = () => {
      const Cesium = (window as any).Cesium;
      if (!Cesium) {
        setTimeout(checkCesium, 100);
        return;
      }

      if (!containerRef.current) return;

      try {
        // Configurar token de acesso
        Cesium.Ion.defaultAccessToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YzI5MzJjYS1jZWY2LTRhYjItODRmNy1iZjI2YzJhMTY1YzQiLCJpZCI6MjU5OTYsImlhdCI6MTY5Njk0NzI2MH0.9nBr0Aq2_uMJxE5TpVKwLhPvLHqVNKp9Uj3tKpBPvVg';

        // Criar visualizador
        const newViewer = new Cesium.Viewer(containerRef.current, {
          terrainProvider: Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
            'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/ImageServer'
          ),
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
          }),
          animation: true,
          timeline: false,
          fullscreenButton: true,
          baseLayerPicker: false,
          homeButton: true,
          infoBox: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          geocoder: false,
        });

        // Desabilitar créditos
        if (newViewer.cesiumWidget.creditContainer) {
          (newViewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';
        }

        // Adicionar entidades para cada destino
        destinations.forEach((destination) => {
          const entity = newViewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(destination.lng, destination.lat),
            point: {
              pixelSize: 12,
              color: Cesium.Color.fromCssColorString('#0077B6'),
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
            },
            properties: {
              name: destination.name,
              description: destination.description,
              id: destination.id,
            },
          });

          entitiesRef.current[destination.id] = entity;
        });

        // Adicionar handler de clique
        const handler = new Cesium.ScreenSpaceEventHandler(newViewer.canvas);
        handler.setInputAction((click: any) => {
          const pickedObject = newViewer.scene.pick(click.position);
          if (Cesium.defined(pickedObject)) {
            const entity = pickedObject.id;
            if (entity && entity.properties) {
              const destId = entity.properties.id.getValue();
              const destName = entity.properties.name.getValue();

              // Atualizar estado
              setSelectedDestination(destId);

              // Destacar entidade
              entity.point.color = Cesium.Color.fromCssColorString('#E9C46A');
              entity.point.pixelSize = 16;

              // Resetar outras entidades
              Object.entries(entitiesRef.current).forEach(([id, ent]: any) => {
                if (id !== destId) {
                  ent.point.color = Cesium.Color.fromCssColorString('#0077B6');
                  ent.point.pixelSize = 12;
                }
              });

              // Fazer zoom no destino
              newViewer.flyTo(entity, {
                duration: 1.5,
                offset: new Cesium.HeadingPitchRange(0, -45, 2000000),
              });

              // Abrir popup com detalhes
              const details = destinationDetails[destId];
              if (details) {
                setSelectedPopupDestination(details);
                setIsPopupOpen(true);
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        setViewer(newViewer);

        // Zoom inicial
        newViewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(0, 20, 15000000),
          duration: 2,
        });

        return () => {
          handler.destroy();
          newViewer.destroy();
        };
      } catch (error) {
        console.error('Erro ao carregar Cesium:', error);
      }
    };

    checkCesium();
  }, [setSelectedDestinationName, scrollToForm]);

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

  const handleSelectFromPopup = (destName: string) => {
    setSelectedDestinationName(destName);
    setTimeout(() => scrollToForm(), 300);
  };

  return (
    <>
      <DestinationPopup
        destination={selectedPopupDestination}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSelectDestination={handleSelectFromPopup}
      />
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
          <h2 className="mb-4">Explore o Mundo em 3D 🌍</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clique em qualquer destino no globo para conhecer mais e montar seu roteiro
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Globe */}
          <motion.div
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div
              ref={containerRef}
              className="w-full h-96 sm:h-[500px] rounded-2xl shadow-xl border-2 border-border overflow-hidden"
              style={{ position: 'relative' }}
            />
          </motion.div>

          {/* Destinations List */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="font-bold text-foreground mb-6">Destinos</h3>
            {destinations.map((destination) => (
              <motion.button
                key={destination.id}
                onClick={() => {
                  if (viewer) {
                    const Cesium = (window as any).Cesium;
                    const entity = entitiesRef.current[destination.id];
                    if (entity && Cesium) {
                      entity.point.color = Cesium.Color.fromCssColorString('#E9C46A');
                      entity.point.pixelSize = 16;

                      Object.entries(entitiesRef.current).forEach(([id, ent]: any) => {
                        if (id !== destination.id) {
                          ent.point.color = Cesium.Color.fromCssColorString('#0077B6');
                          ent.point.pixelSize = 12;
                        }
                      });

                      viewer.flyTo(entity, {
                        duration: 1.5,
                        offset: new Cesium.HeadingPitchRange(0, -45, 2000000),
                      });

                      setSelectedDestination(destination.id);
                      setSelectedDestinationName(destination.name);
                      setTimeout(() => scrollToForm(), 800);
                    }
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
    </>
  );
}
