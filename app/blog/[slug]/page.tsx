import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { formatPostDate, getAllPosts, getPost, parseMarkdown } from '@/lib/blog';

type PageProps = { params: Promise<{ slug: string }> };

function renderInlineMarkdown(text: string) {
  const tokens = text.split(/(\*\*.+?\*\*|\*.+?\*|`.+?`|\[[^\]]+\]\([^)]+\))/g);

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return <code key={index}>{token.slice(1, -1)}</code>;
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return <a href={link[2]} key={index}>{renderInlineMarkdown(link[1])}</a>;
    }
    return token;
  });
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const blocks = parseMarkdown(post.content);

  return (
    <main className="article-page">
      <SiteHeader solid />
      <article>
        <header className="article-header">
          <div className="article-header-grid site-shell">
            <div className="article-heading">
              <Link href="/blog/" className="back-link"><ArrowLeft size={18} /> Voltar ao blog</Link>
              <div className="blog-meta"><span>{post.category}</span><span>{formatPostDate(post.date)}</span></div>
              <h1>{post.title}</h1>
              <div className="reading-time"><Clock3 size={17} /> {post.readingTime} min de leitura</div>
            </div>
            <div className="article-cover">
              <Image
                src={post.image}
                alt={`Capa do artigo ${post.title}`}
                fill
                priority
                sizes="(max-width: 560px) 84vw, 432px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </header>

        <div className="article-layout site-shell">
          <div className="article-body">
            {blocks.map((block, index) => {
              if (block.type === 'heading') {
                const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4';
                return <Tag key={`${block.text}-${index}`}>{renderInlineMarkdown(block.text)}</Tag>;
              }
              if (block.type === 'list') {
                const List = block.ordered ? 'ol' : 'ul';
                return <List key={`list-${index}`}>{block.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>)}</List>;
              }
              if (block.type === 'image') {
                return (
                  <figure className="article-inline-image" key={`${block.src}-${index}`}>
                    <Image src={block.src} alt={block.alt} width={1600} height={1000} sizes="(max-width: 900px) 92vw, 860px" />
                    {block.alt ? <figcaption>{block.alt}</figcaption> : null}
                  </figure>
                );
              }
              if (block.type === 'quote') {
                return <blockquote key={`quote-${index}`}>{renderInlineMarkdown(block.text)}</blockquote>;
              }
              return <p key={`paragraph-${index}`}>{renderInlineMarkdown(block.text)}</p>;
            })}
          </div>
          <aside className="article-aside">
            <p className="eyebrow dark">Sua empresa pode ir além</p>
            <h2>Transforme boas ideias em estratégia.</h2>
            <p>Converse com a Invista sobre os próximos passos da sua marca.</p>
            <a className="button button-dark" href="https://wa.me/5547996240055" target="_blank" rel="noreferrer">Falar com a equipe</a>
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
