'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cases } from '@/lib/cases';

export function CasesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = cases[activeIndex];

  const showCase = (index: number) => {
    setActiveIndex((index + cases.length) % cases.length);
  };

  return (
    <div className="cases-showcase">
      <div
        className="case-showcase-card"
        id={`case-panel-${activeCase.slug}`}
        role="tabpanel"
        aria-labelledby={`case-tab-${activeCase.slug}`}
        key={activeCase.slug}
      >
        <Link href={`/cases/${activeCase.slug}/`} className="case-showcase-visual" aria-label={`Ver case ${activeCase.client}`}>
          <Image
            src={activeCase.cover}
            alt={`Projeto desenvolvido para ${activeCase.client}`}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </Link>

        <div className="case-showcase-content">
          <div>
            <p className="case-category">{activeCase.category}</p>
            <p className="case-client">{activeCase.client}</p>
            <h3>{activeCase.title}</h3>
            <p>{activeCase.summary}</p>
          </div>

          <div>
            <div className="case-metrics-preview">
              {activeCase.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
              ))}
            </div>
            <Link href={`/cases/${activeCase.slug}/`} className="text-link">
              Ver case completo <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="case-showcase-controls">
        <div className="case-tabs" role="tablist" aria-label="Escolha um case">
          {cases.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`case-tab-${item.slug}`}
              aria-controls={`case-panel-${item.slug}`}
              aria-selected={activeIndex === index}
              className={activeIndex === index ? 'case-tab is-active' : 'case-tab'}
              onClick={() => showCase(index)}
              key={item.slug}
            >
              <span>{item.client}</span>
              <small>{item.category}</small>
            </button>
          ))}
        </div>

        <div className="case-arrows" aria-label="Navegar pelos cases">
          <button type="button" onClick={() => showCase(activeIndex - 1)} aria-label="Case anterior"><ArrowLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => showCase(activeIndex + 1)} aria-label="Próximo case"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
