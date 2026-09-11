import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { WhatsAppButton } from '@/components/whatsapp-button';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://invistacomunicacao.digital'),
  title: {
    default: 'Invista Comunicação — estratégia, criação e resultado',
    template: '%s | Invista Comunicação',
  },
  description: 'Agência de comunicação em Itajaí. Campanhas, branding, redes sociais, mídia digital, sites e eventos para marcas que querem crescer.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Invista Comunicação',
    title: 'Invista Comunicação — estratégia, criação e resultado',
    description: 'Estratégia, criatividade, mídia e execução para colocar marcas em movimento.',
  },
  twitter: { card: 'summary', title: 'Invista Comunicação', description: 'Estratégia, criação e resultado desde 2002.' },
  icons: {
    icon: [{ url: '/favicon-invista.png', type: 'image/png', sizes: '64x64' }],
    shortcut: '/favicon-invista.png',
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'AdvertisingAgency',
  name: 'Invista Comunicação',
  url: 'https://invistacomunicacao.digital',
  telephone: '+55 47 99624-0055',
  foundingDate: '2002',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Alcídes Pereira, 280, sala 01',
    addressLocality: 'Itajaí',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  sameAs: ['https://www.instagram.com/invista.comunicacao/'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
