import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getPostSummaries } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conteúdos sobre marketing, comunicação, branding, mídia e negócios produzidos pela Invista Comunicação.',
};

export default function BlogPage() {
  const posts = getPostSummaries();
  const [featured, ...remaining] = posts;

  return (
    <main className="page-dark">
      <SiteHeader solid />
      <section className="page-intro blog-intro">
        <div className="site-shell">
          <p className="eyebrow">Blog Invista</p>
          <h1>Conteúdo para quem quer comunicar e crescer melhor.</h1>
          <p>Estratégia, tendências e ideias aplicáveis à realidade das empresas.</p>
        </div>
      </section>

      <section className="blog-index-section">
        <div className="site-shell">
          {featured ? <BlogCard post={featured} featured /> : null}
          <div className="blog-index-grid">
            {remaining.map((post) => <BlogCard post={post} key={post.slug} />)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
