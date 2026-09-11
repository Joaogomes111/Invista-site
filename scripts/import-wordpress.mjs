import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, 'content', 'wordpress-posts.json');
const postsDir = path.join(projectRoot, 'content', 'posts');
const posts = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

fs.mkdirSync(postsDir, { recursive: true });

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#8211;', '–')
    .replaceAll('&#8212;', '—')
    .replaceAll('&#8216;', '‘')
    .replaceAll('&#8217;', '’')
    .replaceAll('&#8220;', '“')
    .replaceAll('&#8221;', '”')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

const toPlainText = (html) =>
  decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

const toMarkdown = (html) =>
  decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
      .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n')
      .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
      .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
      .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|ul|ol|section)>/gi, '\n\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const jsonValue = (value) => JSON.stringify(value ?? '');

for (const post of posts) {
  const title = toPlainText(post.title.rendered);
  const excerpt = toPlainText(post.excerpt.rendered);
  const date = String(post.date).slice(0, 10);
  const content = toMarkdown(post.content.rendered);
  const output = `---\ntitle: ${jsonValue(title)}\ndate: ${jsonValue(date)}\ncategory: ${jsonValue('Marketing e negócios')}\nexcerpt: ${jsonValue(excerpt)}\nimage: ${jsonValue(`/blog/${post.slug}.webp`)}\nsource: ${jsonValue(post.link)}\n---\n\n${content}\n`;
  fs.writeFileSync(path.join(postsDir, `${post.slug}.md`), output, 'utf8');
}

console.log(`Importados ${posts.length} artigos para content/posts.`);
