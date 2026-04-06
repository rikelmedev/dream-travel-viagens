import { useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ImageGallery from '@/components/ImageGallery';
import { setSEOHead } from '@/components/SEOHead';

/**
 * DestinationDetailPage
 * Página de detalhe de um destino com galeria de fotos
 */

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  bestTime: string;
  climate: string;
  images: string[];
}

const destinations: Record<string, Destination> = {
  '1': {
    id: '1',
    name: 'Maldivas',
    country: 'Maldivas',
    description: 'Paraíso tropical com praias de areia branca e águas cristalinas',
    fullDescription: 'As Maldivas são um arquipélago de 1.190 ilhas de coral no Oceano Índico. Conhecidas por suas águas cristalinas, recifes de coral vibrantes e resorts de luxo, as Maldivas são o destino perfeito para casais em lua de mel e amantes de mergulho.',
    highlights: [
      'Mergulho e snorkel em recifes de coral',
      'Resorts de luxo com bangalôs sobre a água',
      'Praias de areia branca intocada',
      'Vida marinha abundante',
      'Pôr do sol espetacular',
    ],
    bestTime: 'Novembro a Abril',
    climate: 'Tropical, 26-30°C o ano todo',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
  },
  '2': {
    id: '2',
    name: 'Bali',
    country: 'Indonésia',
    description: 'Ilha exótica com templos, praias e cultura vibrante',
    fullDescription: 'Bali é uma ilha indonésia conhecida por suas praias de areia preta e branca, templos antigos, paisagens de arroz em terraços e vida noturna vibrante. É um destino perfeito para viajantes que buscam cultura, natureza e relaxamento.',
    highlights: [
      'Templos antigos e sagrados',
      'Praias paradisíacas',
      'Paisagens de arroz em terraços',
      'Vida noturna e gastronomia',
      'Ioga e bem-estar',
    ],
    bestTime: 'Abril a Outubro',
    climate: 'Tropical, 25-32°C',
    images: [
      'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
  },
  '3': {
    id: '3',
    name: 'Alpes Suíços',
    country: 'Suíça',
    description: 'Montanhas majestosas, trilhas e paisagens de tirar o fôlego',
    fullDescription: 'Os Alpes Suíços oferecem algumas das paisagens mais espetaculares do mundo. Com picos nevados, vales verdejantes e vilas de conto de fadas, é o destino ideal para caminhadas, esqui e apreciação da natureza.',
    highlights: [
      'Trilhas de montanha espetaculares',
      'Picos nevados',
      'Vilas de conto de fadas',
      'Esqui de classe mundial',
      'Trens panorâmicos',
    ],
    bestTime: 'Junho a Setembro (verão), Dezembro a Março (inverno)',
    climate: 'Temperado, -5 a 20°C',
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    ],
  },
};

export default function DestinationDetailPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/destinos/:id');

  const destination = params?.id ? destinations[params.id] : null;

  useEffect(() => {
    if (destination) {
      setSEOHead({
        title: `${destination.name} | Dream Travel Viagens`,
        description: destination.fullDescription,
        image: destination.images[0],
        url: `https://dreamtravel.com.br/destinos/${destination.id}`,
      });
    }
  }, [destination]);

  if (!match || !destination) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Destino não encontrado</h1>
            <Button onClick={() => setLocation('/destinos')}>Voltar para Destinos</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="container py-6">
          <button
            onClick={() => setLocation('/destinos')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Destinos
          </button>
        </div>

        {/* Header */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 px-4">
          <div className="container">
            <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
              {destination.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{destination.country}</span>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12 px-4">
          <div className="container">
            <ImageGallery images={destination.images} title={destination.name} />
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="container max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">
                  Sobre {destination.name}
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                  {destination.fullDescription}
                </p>

                <h3 className="text-xl font-bold text-foreground mb-4 font-serif">
                  Destaques
                </h3>
                <ul className="space-y-2 mb-8">
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground/70">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar Info */}
              <div className="bg-secondary/5 rounded-lg p-6 h-fit">
                <h3 className="text-lg font-bold text-foreground mb-4">Informações</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Melhor Época
                    </p>
                    <p className="text-foreground">{destination.bestTime}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Clima
                    </p>
                    <p className="text-foreground">{destination.climate}</p>
                  </div>
                </div>

                <Button
                  onClick={() => setLocation('/contato')}
                  className="w-full bg-primary hover:bg-primary/90 text-white mt-6"
                >
                  Montar Roteiro
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Pronto para Visitar {destination.name}?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Deixe nossos consultores criarem o roteiro perfeito para você
            </p>
            <Button
              onClick={() => setLocation('/contato')}
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Fale Conosco
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
