import type { Metadata } from 'next';
import { DiagnosticForm } from '@/components/diagnostic-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Diagnóstico de comunicação',
  description: 'Responda oito perguntas e descubra quais pontos da comunicação da sua empresa merecem mais atenção.',
};

export default function DiagnosticPage() {
  return (
    <main className="diagnostic-page">
      <SiteHeader solid />
      <section className="diagnostic-hero">
        <div className="site-shell diagnostic-hero-grid">
          <div>
            <p className="eyebrow dark">Diagnóstico gratuito · cerca de 2 minutos</p>
            <h1>Como está a comunicação da sua empresa?</h1>
          </div>
          <p>Responda oito perguntas objetivas e receba uma leitura inicial sobre posicionamento, presença digital, planejamento e resultados.</p>
        </div>
      </section>
      <section className="diagnostic-tool-section">
        <div className="site-shell">
          <DiagnosticForm />
          <p className="diagnostic-privacy">Suas respostas ficam no seu navegador e só são compartilhadas se você decidir iniciar a conversa pelo WhatsApp.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
