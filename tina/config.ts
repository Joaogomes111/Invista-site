import { defineConfig } from 'tinacms';

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'master';

function createSlug(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || 'local-development',
  token: process.env.TINA_TOKEN || 'local-development',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'blog',
      publicFolder: 'public',
    },
    accept: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Artigos do blog',
        path: 'content/posts',
        format: 'md',
        yamlMaxLineWidth: -1,
        // oxlint-disable-next-line typescript/no-deprecated -- Tina still requires this property for defaults on field-based collections.
        defaultItem: () => ({
          date: new Date().toISOString(),
          category: 'Marketing e negócios',
          draft: false,
        }),
        ui: {
          filename: {
            slugify: (values) => createSlug(values.title),
            description: 'O endereço do artigo é criado automaticamente a partir do título.',
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Data de publicação',
            required: true,
            ui: {
              dateFormat: 'DD/MM/YYYY',
              timeFormat: false,
            },
          },
          {
            type: 'string',
            name: 'category',
            label: 'Categoria',
            required: true,
            options: ['Marketing e negócios', 'Mídia', 'Branding', 'Redes sociais', 'Cases'],
          },
          {
            type: 'image',
            name: 'image',
            label: 'Banner do artigo',
            description: 'Use uma imagem horizontal. JPG, PNG, WebP e AVIF são aceitos.',
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Resumo do card (opcional)',
            description: 'Se ficar vazio, o site usa automaticamente o início do artigo.',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Manter como rascunho',
            description: 'Ative para salvar sem mostrar o artigo no site público.',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Texto do artigo',
            isBody: true,
            parser: {
              type: 'markdown',
            },
            required: true,
            overrides: {
              headingLevels: ['h2', 'h3', 'h4'],
            },
          },
          {
            type: 'string',
            name: 'source',
            label: 'Link da publicação antiga (opcional)',
            description: 'Este campo só precisa ser usado em conteúdos importados.',
          },
        ],
      },
    ],
  },
});
