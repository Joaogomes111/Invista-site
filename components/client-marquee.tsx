import Image from 'next/image';

const clients = [
  { name: 'SBJ Construtora', logo: '/clients/sbj-construtora.webp' },
  { name: 'AVA BPO Financeiro', logo: '/clients/ava-bpo-financeiro.webp' },
  { name: 'ROI Contabilidade', logo: '/clients/roi-contabilidade.webp' },
  { name: 'Camboriú Hotel', logo: '/clients/camboriu-hotel.webp' },
  { name: 'Grupo Baltt', logo: '/clients/grupo-baltt.webp' },
  { name: 'Camvel', logo: '/clients/camvel.webp' },
  { name: 'Marambaia Chevrolet', logo: '/clients/marambaia-chevrolet.webp' },
  {
    name: 'Prefeitura de Balneário Camboriú',
    logo: '/clients/prefeitura-balneario-camboriu.webp',
  },
  { name: 'Mormaii E-Motors', logo: '/clients/mormaii-e-motors.webp' },
  { name: 'Open Trade', logo: '/clients/open-trade.webp' },
  { name: 'Atalaia Tabacaria', logo: '/clients/atalaia-tabacaria.webp' },
  { name: 'Padaria e Confeitaria Rocha', logo: '/clients/padaria-rocha.webp' },
  { name: 'Satori', logo: '/clients/satori.webp' },
  { name: 'Associação Madre Teresa', logo: '/clients/associacao-madre-teresa.webp' },
];

function ClientSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-set" aria-hidden={hidden || undefined}>
      {clients.map((client) => (
        <div className="client-logo-item" key={client.name}>
          <Image
            className="client-logo"
            src={client.logo}
            alt={hidden ? '' : client.name}
            width={260}
            height={86}
          />
        </div>
      ))}
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="clients-strip" id="clientes" aria-label="Clientes da Invista">
      <div className="site-shell clients-intro">
        <p className="eyebrow">Marcas em movimento</p>
        <h2>Empresas que tomaram essa decisão.</h2>
      </div>
      <div className="clients-marquee">
        <div className="marquee-track">
          <ClientSet />
          <ClientSet hidden />
          <ClientSet hidden />
          <ClientSet hidden />
        </div>
      </div>
    </section>
  );
}
