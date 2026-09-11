import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { cases, getCase } from '@/lib/cases';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return { title: `Case ${item.client}`, description: item.summary };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  return (
    <main className="case-page">
      <SiteHeader solid />
      <section className="case-page-hero">
        <div className="site-shell case-page-hero-grid">
          <div className="case-page-intro">
            <Link href="/#cases" className="back-link light"><ArrowLeft size={18} /> Voltar aos cases</Link>
            <p className="eyebrow">{item.category}</p>
            <p className="case-page-client">{item.client}</p>
            <h1>{item.title}</h1>
            <p className="case-page-summary">{item.summary}</p>
          </div>
          <div className="case-cover">
          <Image
            src={item.cover}
            alt={`Case ${item.client}`}
            fill
            priority
            sizes="(max-width: 560px) 84vw, 464px"
            style={{ objectFit: 'contain' }}
          />
          </div>
        </div>
      </section>

      <section className="case-story-section">
        <div className="site-shell case-story-grid">
          <div><p className="eyebrow dark">O desafio</p><h2>{item.challenge}</h2></div>
          <div><p className="eyebrow dark">A resposta</p><p>{item.solution}</p></div>
        </div>
        <div className="site-shell case-services">
          {item.services.map((service) => <span key={service}><Check size={17} /> {service}</span>)}
        </div>
      </section>

      <section className="case-results-section">
        <div className="site-shell">
          <p className="eyebrow">Resultados em contexto</p>
          <div className="case-results-grid">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="result-card">
                <strong>{metric.value}</strong><span>{metric.label}</span>{metric.note ? <small>{metric.note}</small> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-gallery-section">
        <div className="site-shell">
          <div className="section-heading blog-heading"><div><p className="eyebrow dark">O trabalho em detalhes</p><h2>Uma ideia que ganhou forma em diferentes pontos de contato.</h2></div></div>
          <div className="case-gallery">
            {item.images.map((image, index) => (
              <div className="case-gallery-image" key={image}>
                <Image
                  src={image}
                  alt={`Material do case ${item.client}, peça ${index + 1}`}
                  fill
                  sizes="(max-width: 560px) 82vw, (max-width: 1050px) 45vw, 350px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
