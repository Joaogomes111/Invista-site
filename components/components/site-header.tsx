import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';

const navigation = [
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Cases', href: '/#cases' },
  { label: 'A Invista', href: '/#sobre' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contato', href: '#contato' },
];

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <header className={`site-header ${solid ? 'site-header-solid' : ''}`}>
      <div className="site-shell flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="Invista Comunicação — página inicial" className="shrink-0">
          <Image src="/brand/invista-logo.png" alt="Invista Comunicação" width={180} height={61} priority />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="button button-small header-diagnostic hidden sm:inline-flex"
          href="/diagnostico/"
        >
          Diagnóstico gratuito <ArrowUpRight size={17} aria-hidden="true" />
        </Link>

        <details className="mobile-menu lg:hidden">
          <summary aria-label="Abrir menu">
            <Menu aria-hidden="true" />
          </summary>
          <nav aria-label="Navegação móvel">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/diagnostico/">Diagnóstico gratuito</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
