import fs from 'node:fs';
import path from 'node:path';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  source?: string;
  readingTime: number;
  content: string;
};

export type BlogPostSummary = Omit<BlogPost, 'content' | 'source'>;

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function createExcerpt(value: string, limit = 210) {
  const normalized = value
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (normalized.length <= limit) return normalized;
  const shortened = normalized.slice(0, limit).replace(/\s+\S*$/, '');
  return `${shortened}…`;
}

function parseFrontmatter(file: string) {
  const match = file.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string>, content: file };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    try {
      data[key] = JSON.parse(rawValue);
    } catch {
      data[key] = rawValue;
    }
  }

  return { data, content: match[2].trim() };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const posts: Array<BlogPost | null> = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file): BlogPost | null => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
      const { data, content } = parseFrontmatter(raw);
      if (String(data.draft).toLowerCase() === 'true') return null;
      const wordCount = content.split(/\s+/).filter(Boolean).length;

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        category: data.category || 'Conteúdo',
        excerpt: createExcerpt(data.excerpt || content),
        image: data.image || '',
        source: data.source || undefined,
        readingTime: Math.max(1, Math.ceil(wordCount / 220)),
        content,
      };
    });

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map(({ content: _content, source: _source, ...post }) => post);
}

export function formatPostDate(date: string) {
  const normalizedDate = date.slice(0, 10);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${normalizedDate}T12:00:00Z`));
}

export type MarkdownBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'image'; alt: string; src: string }
  | { type: 'quote'; text: string };

export function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let orderedList = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: 'list', ordered: orderedList, items: list });
    list = [];
    orderedList = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const image = line.match(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+["'][^"']*["'])?\)$/);
    if (image) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'image', alt: image[1], src: image[2] });
      continue;
    }
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: heading[1].length as 2 | 3 | 4,
        text: heading[2],
      });
      continue;
    }
    const unorderedItem = line.match(/^[-*+]\s+(.+)$/);
    const orderedItem = line.match(/^\d+[.)]\s+(.+)$/);
    if (unorderedItem || orderedItem) {
      flushParagraph();
      const nextOrdered = Boolean(orderedItem);
      if (list.length && orderedList !== nextOrdered) flushList();
      orderedList = nextOrdered;
      list.push((orderedItem || unorderedItem)?.[1] ?? '');
      continue;
    }
    if (line.startsWith('> ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'quote', text: line.slice(2) });
      continue;
    }
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}
