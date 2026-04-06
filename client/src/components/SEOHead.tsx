/**
 * SEOHead Component
 * Gerencia meta tags e SEO para cada página
 * Usa document.head para adicionar tags dinamicamente
 */

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function setSEOHead({
  title,
  description,
  image = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663146852942/7vU7SskgToGin35SQBrLa4/dream-travel-logo_16e9196b.webp',
  url = 'https://dreamtravel.com.br',
  type = 'website',
}: SEOHeadProps) {
  // Update title
  document.title = `${title} | Dream Travel Viagens`;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    let tag = document.querySelector(
      property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    ) as HTMLMetaElement;

    if (!tag) {
      tag = document.createElement('meta');
      if (property) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  // Standard meta tags
  updateMetaTag('description', description);
  updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  updateMetaTag('keywords', 'viagens, turismo, destinos, pacotes, luxo, dream travel');
  updateMetaTag('author', 'Dream Travel Viagens');
  updateMetaTag('robots', 'index, follow');

  // Open Graph tags
  updateMetaTag('og:title', `${title} | Dream Travel Viagens`, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:image', image, true);
  updateMetaTag('og:url', url, true);
  updateMetaTag('og:type', type, true);
  updateMetaTag('og:site_name', 'Dream Travel Viagens', true);

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', `${title} | Dream Travel Viagens`);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', image);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

export default function SEOHead(props: SEOHeadProps) {
  setSEOHead(props);
  return null;
}
