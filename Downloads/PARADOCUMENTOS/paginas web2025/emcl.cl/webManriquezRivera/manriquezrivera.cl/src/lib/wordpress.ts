// Configuración de WordPress API
const WP_URL = import.meta.env.PUBLIC_WP_URL || 'http://localhost:8888/manriquezrivera';

export interface Service {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  acf?: {
    icono?: string;
    areas_practica?: Array<{
      titulo: string;
      descripcion: string;
      icono: string;
    }>;
    imagen_destacada?: string;
    orden?: number;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

// Obtener todos los servicios
export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/servicio?_embed&per_page=100`
    );
    
    if (!response.ok) {
      console.error('Error fetching services:', response.statusText);
      return [];
    }
    
    const services = await response.json();
    return services;
  } catch (error) {
    console.error('Error connecting to WordPress:', error);
    return [];
  }
}

// Obtener un servicio por slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/servicio?slug=${slug}&_embed`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const services = await response.json();
    return services[0] || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Obtener imagen destacada
export function getFeaturedImage(service: Service): string {
  if (service._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return service._embedded['wp:featuredmedia'][0].source_url;
  }
  return '/images/servicio-default.jpg';
}
