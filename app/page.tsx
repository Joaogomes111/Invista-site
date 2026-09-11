import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { BlogCard } from '@/components/blog-card';
import { CasesShowcase } from '@/components/cases-showcase';
import { ClientMarquee } from '@/components/client-marquee';
import { CountUp } from '@/components/count-up';
import { ShaderHero } from '@/components/shader-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ServicesCarousel } from '@/components/services-carousel';
import { getPostSummaries } from '@/lib/blog';

export default function Home() {
  const latestPosts = getPostSummaries().slice(0, 3);

  return (
    <main>
      <SiteHeader />
      <ShaderHero />
      <ClientMarquee />

      <section className="manifesto-section">
        <div className="site-shell manifesto-grid">
          <div>
            <p className="eyebrow dark">Mais do que ser vista</p>
            <h2>Sua marca precisa ser escolhida.</h2>
          </div>
          <div className="manifesto-copy">
            <p>A Invista une repertório, estratégia e execução para criar uma comunicação que faz sentido para o público e para o negócio.</p>
            <p>Da primeira ideia ao resultado, cuidamos de cada ponto de contato para sua empresa construir presença, confiança e vendas.</p>
            <a href="#servicos" className="text-link dark-link">Conheça nossa forma de trabalhar <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicos">
        <div className="site-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">O que fazemos</p>
              <h2>Uma agência para cada ponto da sua comunicação.</h2>
            </div>
            <p>Estratégia e criação trabalhando juntas, do posicionamento à performance.</p>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      <section className="cases-section" id="cases">
        <div className="site-shell">
          <div className="section-heading cases-heading">
            <div>
              <p className="eyebrow">Projetos que deixam marca</p>
              <h2>Estratégia que aparece nos resultados.</h2>
            </div>
            <p>Cases reais, com desafios, soluções e números que ajudam a contar a história inteira.</p>
          </div>
          <CasesShowcase />
        </div>
      </section>

      <section className="numbers-section" aria-label="Números da Invista">
        <div className="site-shell numbers-grid">
          <div className="number-card"><strong>Desde</strong><span>2002</span><p>construindo marcas e parcerias</p></div>
          <div className="number-card"><strong><CountUp value={220} suffix="+" /></strong><span>clientes</span><p>atendidos ao longo da nossa história</p></div>
          <div className="number-card"><strong><CountUp value={931} suffix="+" /></strong><span>projetos</span><p>concluídos com estratégia e cuidado</p></div>
          <div className="number-card coffee-card"><strong><CountUp value={12} suffix=" mil+" /></strong><span>cafés</span><p>e incontáveis ideias colocadas na mesa</p></div>
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="site-shell about-grid">
          <div className="about-mark" aria-hidden="true"><Image src="/brand/invista-symbol-transparent.webp" alt="" width={388} height={388} /></div>
          <div className="about-copy">
            <p className="eyebrow dark">A Invista</p>
            <h2>Experiência para enxergar o todo. Curiosidade para continuar evoluindo.</h2>
            <p>Desde 2002, a Invista Comunicação aproxima marcas e pessoas com trabalho estratégico, criativo e conectado à realidade de cada cliente.</p>
            <p>Somos uma agência de Itajaí que acredita em parceria próxima, boas perguntas e execução bem-feita — no digital, nos meios tradicionais e nos eventos.</p>
            <a className="button button-dark" href="https://wa.me/5547996240055?text=Ol%C3%A1%2C%20quero%20conhecer%20melhor%20o%20trabalho%20da%20Invista." target="_blank" rel="noreferrer">
              Conhecer a Invista <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="home-blog-section">
        <div className="site-shell">
          <div className="section-heading blog-heading">
            <div><p className="eyebrow dark">Conteúdo para decisões melhores</p><h2>Ideias, tendências e estratégia.</h2></div>
            <Link href="/blog/" className="text-link dark-link">Ver todos os artigos <ArrowRight size={18} /></Link>
          </div>
          <div className="home-blog-grid">{latestPosts.map((post) => <BlogCard post={post} key={post.slug} />)}</div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
