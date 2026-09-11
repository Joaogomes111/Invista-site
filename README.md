# Site da Invista Comunicação

Novo site institucional da Invista, com hero animado em WebGL, apresentação de serviços, cases, clientes, indicadores e blog estático.

## Rodar o projeto

Requisitos: Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos estáticos são gerados em `dist/client`, pasta configurada no `vercel.json` para publicação na Vercel.

## Publicar um artigo novo no blog

O blog tem um painel visual em `/admin/`. Ao rodar `npm run dev`, abra
`http://localhost:3000/admin/`, entre em **Artigos do blog** e clique em **Criar novo**.

O formulário permite preencher título, data e categoria, enviar o banner, colar e formatar
o texto e adicionar outras imagens no meio do conteúdo. O endereço do artigo é criado a
partir do título. O resumo do card é opcional; se ele ficar vazio, o site usa o começo do texto.

Ative **Manter como rascunho** para salvar sem exibir o artigo. Quando a opção estiver
desativada, o card, a página, a data, o tempo de leitura e o sitemap são gerados no padrão do site.

Para usar o painel publicado, conecte o repositório do GitHub em `https://app.tina.io` e
cadastre `NEXT_PUBLIC_TINA_CLIENT_ID` e `TINA_TOKEN` na Vercel. O arquivo `.env.example`
mostra os nomes necessários. Depois disso, as alterações salvas no painel viram commits
no GitHub e acionam uma nova publicação da Vercel.

O arquivo `content/modelo-blog.md` continua disponível como alternativa manual e não
aparece no painel.

## Conteúdo migrado do WordPress

Os dez artigos atuais estão em `content/posts` e seus banners em `public/blog`. O arquivo `content/wordpress-posts.json` guarda o retrato usado na migração.

Se esse JSON for substituído por uma exportação nova da mesma API do WordPress, o comando abaixo recria os arquivos de artigo:

```bash
node scripts/import-wordpress.mjs
```

Esse comando sobrescreve arquivos com o mesmo slug. Faça commit antes de usá-lo caso existam ajustes manuais nos textos migrados.

## Conteúdo principal

- `app/page.tsx`: página inicial e serviços.
- `lib/cases.ts`: textos, métricas e imagens dos cases.
- `content/posts`: artigos do blog.
- `app/globals.css`: identidade visual e responsividade.
- `components/shader-hero.tsx`: animação principal da abertura.

## Próximo passo: diagnóstico

Os botões de diagnóstico já levam para o WhatsApp da Invista. Quando a página de diagnóstico definitiva for incorporada a este projeto, basta trocar esses links pelo novo endereço interno.
