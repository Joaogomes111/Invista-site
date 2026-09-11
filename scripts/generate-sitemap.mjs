import fs from 'node:fs';
import path from 'node:path';

const baseUrl = 'https://invistacomunicacao.digital';
const projectRoot = process.cwd();
const postsDirectory = path.join(projectRoot, 'content', 'posts');
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');
const today = new Date().toISOString().slice(0, 10);
const cases = ['grupo-baltt', 'ilha-do-campeche', 'feirao-br470'];

const readField = (source, field) => {
  const match = source.match(new RegExp(`^${field}:\\s*["']?([^"'\\r\\n]+)`, 'm'));
  return match?.[1]?.trim() ?? '';
};

const posts = fs
  .readdirSync(postsDirectory)
  .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
  .map((file) => {
    const source = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
    return {
      slug: file.replace(/\.md$/, ''),
      date: readField(source, 'date') || today,
      draft: readField(source, 'draft').toLowerCase() === 'true',
    };
  })
  .filter((post) => !post.draft);

const entry = (url, lastModified, changeFrequency, priority) =>
  `  <url><loc>${url}</loc><lastmod>${lastModified}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority}</priority></url>`;

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  entry(`${baseUrl}/`, today, 'monthly', '1.0'),
  entry(`${baseUrl}/diagnostico`, today, 'yearly', '0.9'),
  entry(`${baseUrl}/blog`, today, 'monthly', '0.8'),
  ...cases.map((slug) => entry(`${baseUrl}/cases/${slug}`, today, 'monthly', '0.8')),
  ...posts.map((post) => entry(`${baseUrl}/blog/${post.slug}`, post.date.slice(0, 10), 'monthly', '0.7')),
  '</urlset>',
  '',
];

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
console.log(`Sitemap atualizado com ${posts.length} artigos e ${cases.length} cases.`);
