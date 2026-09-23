import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPostSummary } from '@/lib/blog';
import { formatPostDate } from '@/lib/blog';

export function BlogCard({ post, featured = false }: { post: BlogPostSummary; featured?: boolean }) {
  return (
    <article className={`blog-card ${featured ? 'blog-card-featured' : ''}`}>
      <Link href={`/blog/${post.slug}/`} className="blog-card-image" aria-label={`Ler ${post.title}`}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes={featured ? '(max-width: 900px) 100vw, 58vw' : '(max-width: 700px) 100vw, 33vw'}
          style={{ objectFit: 'contain' }}
        />
      </Link>
      <div className="blog-card-body">
        <div className="blog-meta">
          <span>{post.category}</span>
          <span>{formatPostDate(post.date)}</span>
        </div>
        <h2><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}/`} className="text-link">
          Ler artigo <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
