'use client';

import { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Share2,
} from 'lucide-react';

const services = [
  { icon: Megaphone, title: 'Campanhas publicitárias', text: 'Conceito, planejamento de mídia e execução integrada para sua marca aparecer com consistência em todos os canais.' },
  { icon: Palette, title: 'Branding & design', text: 'Marcas, identidades visuais e materiais que traduzem a essência do negócio e sustentam seu posicionamento.' },
  { icon: Share2, title: 'Redes sociais', text: 'Estratégia editorial, criação e gestão de conteúdo para construir presença, relacionamento e lembrança.' },
  { icon: ChartNoAxesCombined, title: 'Mídia & performance', text: 'Meta Ads, Google Ads, análise de dados e otimização contínua para transformar investimento em oportunidade.' },
  { icon: MonitorSmartphone, title: 'Sites & landing pages', text: 'Experiências digitais rápidas e estratégicas, pensadas para posicionar, explicar e converter.' },
  { icon: CalendarDays, title: 'Eventos & ativações', text: 'Planejamento, comunicação e execução para aproximar marcas e pessoas em experiências que ficam na memória.' },
];

export function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToService = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, services.length - 1));
    const track = trackRef.current;
    const card = track?.children.item(nextIndex) as HTMLElement | null;

    if (!track || !card) return;

    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setActiveIndex(nextIndex);
  };

  const updateActiveService = () => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const nearestIndex = cards.reduce((nearest, card, index) => {
      const nearestDistance = Math.abs(cards[nearest].offsetLeft - track.scrollLeft);
      const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      return currentDistance < nearestDistance ? index : nearest;
    }, 0);

    setActiveIndex(nearestIndex);
  };

  return (
    <div className="services-carousel">
      <div className="services-grid" ref={trackRef} onScroll={updateActiveService}>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="service-card" key={service.title}>
              <div className="service-card-top"><Icon aria-hidden="true" /></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          );
        })}
      </div>

      <div className="services-carousel-controls" aria-label="Navegar pelos serviços">
        <span className="services-carousel-progress" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
        </span>
        <button
          className="services-carousel-button"
          type="button"
          aria-label="Ver serviço anterior"
          disabled={activeIndex === 0}
          onClick={() => goToService(activeIndex - 1)}
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <button
          className="services-carousel-button services-carousel-button-next"
          type="button"
          aria-label="Ver próximo serviço"
          disabled={activeIndex === services.length - 1}
          onClick={() => goToService(activeIndex + 1)}
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
