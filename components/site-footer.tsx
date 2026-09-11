import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, AtSign, MapPin, Phone } from 'lucide-react';

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Rua+Alc%C3%ADdes+Pereira%2C+280%2C+Fazenda%2C+Itaja%C3%AD+-+SC';
const mapsEmbedUrl =
  'https://www.google.com/maps?q=Rua+Alc%C3%ADdes+Pereira%2C+280%2C+Fazenda%2C+Itaja%C3%AD+-+SC&output=embed';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contato">
      <div className="site-shell">
        <div className="footer-cta">
          <p className="eyebrow">Um bom briefing pode ser o começo de tudo</p>
          <h2>Vamos colocar sua marca em movimento?</h2>
          <a
            className="button"
            href="https://wa.me/5547996240055?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Invista%20e%20quero%20conversar%20sobre%20minha%20marca."
            target="_blank"
            rel="noreferrer"
          >
            Começar uma conversa <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="footer-grid">
          <div>
            <Image src="/brand/invista-logo.png" alt="Invista Comunicação" width={190} height={58} />
            <p className="footer-note">Comunicação, estratégia e criatividade desde 2002.</p>
          </div>
          <div>
            <p className="footer-title">Navegue</p>
            <Link href="/#servicos">Serviços</Link>
            <Link href="/#cases">Cases</Link>
            <Link href="/blog/">Blog</Link>
          </div>
          <div>
            <p className="footer-title">Contato</p>
            <a href="tel:+5547996240055"><Phone size={16} /> (47) 99624-0055</a>
            <a href="https://www.instagram.com/invista.comunicacao/" target="_blank" rel="noreferrer">
              <AtSign size={16} /> invista.comunicacao
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir endereço da Invista no Google Maps">
              <MapPin size={16} />
              <span>Rua Alcídes Pereira, 280, sala 01<br />Fazenda, Itajaí — SC</span>
            </a>
          </div>
          <div className="footer-map">
            <p className="footer-title">Onde estamos</p>
            <iframe
              src={mapsEmbedUrl}
              title="Localização da Invista Comunicação no Google Maps"
              width="420"
              height="230"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Invista Comunicação</span>
          <span>Sua empresa sempre bem-vista.</span>
        </div>
      </div>
    </footer>
  );
}
