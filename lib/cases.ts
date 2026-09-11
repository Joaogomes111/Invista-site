export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  cover: string;
  images: string[];
  services: string[];
  metrics: { value: string; label: string; note?: string }[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'grupo-baltt',
    client: 'Grupo Baltt',
    title: 'Base digital sólida. Resultado que chegou ao comercial.',
    category: 'Branding, site e performance',
    summary:
      'Em quatro meses, estruturamos a presença digital do Grupo Baltt e conectamos marca, site e mídia à geração de oportunidades reais.',
    challenge:
      'Traduzir para o digital a solidez de uma empresa com mais de 30 anos de mercado e transformar presença em oportunidades comerciais mensuráveis.',
    solution:
      'Fortalecemos a identidade, criamos um site moderno, organizamos os canais e colocamos campanhas de Meta Ads e Google Ads em movimento, com acompanhamento do funil até as vendas registradas.',
    cover: '/cases/baltt-01.webp',
    images: ['/cases/baltt-02.webp', '/cases/baltt-03.webp', '/cases/baltt-04.webp', '/cases/baltt-05.webp'],
    services: ['Identidade e posicionamento', 'Criação de site', 'Meta Ads', 'Google Ads', 'Análise de resultados'],
    metrics: [
      { value: '51', label: 'vendas registradas no ecossistema digital', note: 'Meta Ads, Google Ads e canais orgânicos' },
      { value: 'R$ 195 mil', label: 'em vendas registradas' },
      { value: '4,77x', label: 'ROAS das vendas atribuídas à mídia' },
      { value: '417', label: 'leads via Meta Ads' },
    ],
  },
  {
    slug: 'ilha-do-campeche',
    client: 'SBJ Construtora',
    title: 'Uma marca construída para acompanhar o empreendimento até a entrega.',
    category: 'Branding, campanha e materiais de venda',
    summary:
      'Do conceito visual aos materiais de lançamento, criamos uma comunicação completa para o Residencial Ilha do Campeche.',
    challenge:
      'Criar uma identidade capaz de traduzir arquitetura, natureza e proximidade do mar, dando unidade à comunicação comercial do empreendimento.',
    solution:
      'Desenvolvemos a marca e suas aplicações, materiais impressos, peças de campanha e estratégia de captação para acompanhar todo o ciclo do projeto.',
    cover: '/cases/sbj-01.webp',
    images: ['/cases/sbj-02.webp', '/cases/sbj-03.webp', '/cases/sbj-04.webp', '/cases/sbj-05.webp', '/cases/sbj-06.webp'],
    services: ['Naming e identidade visual', 'Campanha de lançamento', 'Materiais impressos', 'Mídia digital', 'Captação de leads'],
    metrics: [
      { value: '100%', label: 'do empreendimento vendido durante a obra' },
      { value: '360°', label: 'de comunicação, do conceito à entrega' },
      { value: '6º', label: 'empreendimento com identidade desenvolvida pela Invista' },
    ],
  },
  {
    slug: 'feirao-br470',
    client: 'Santander Financiamentos',
    title: 'Uma campanha integrada que movimentou Blumenau.',
    category: 'Campanha 360° e performance',
    summary:
      'Identidade, digital, rádio, TV, conteúdo e ativação trabalhando juntos para conectar lojas, ofertas e consumidores.',
    challenge:
      'Dar escala regional ao Feirão BR470, organizar a comunicação de múltiplos canais e transformar a presença digital em visitas qualificadas ao perfil.',
    solution:
      'Criamos uma campanha 360° com linguagem visual própria, plano de mídia, conteúdo, presença on e offline e acompanhamento dos resultados digitais.',
    cover: '/cases/feirao-01.webp',
    images: ['/cases/feirao-02.webp', '/cases/feirao-03.webp', '/cases/feirao-06.webp'],
    services: ['Conceito de campanha', 'Identidade visual', 'Rádio e TV', 'Conteúdo', 'Mídia digital e ativação'],
    metrics: [
      { value: '366,4 mil', label: 'visualizações' },
      { value: '1,6 mil', label: 'interações' },
      { value: '+729', label: 'novos seguidores' },
      { value: 'R$ 0,36', label: 'por visita paga ao perfil', note: 'Resultados de 28/04 a 27/05/2026' },
    ],
  },
];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}
