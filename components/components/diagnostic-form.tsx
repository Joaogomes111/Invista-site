'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';

const questions = [
  {
    category: 'Posicionamento',
    question: 'Sua empresa consegue explicar com clareza por que o cliente deve escolher vocês?',
    options: [
      { label: 'Sim, temos uma proposta clara e reconhecida', value: 2 },
      { label: 'Em parte, mas ainda soa parecida com a concorrência', value: 1 },
      { label: 'Não, cada pessoa explica de um jeito', value: 0 },
    ],
  },
  {
    category: 'Identidade',
    question: 'A marca mantém o mesmo padrão visual em todos os pontos de contato?',
    options: [
      { label: 'Sim, a identidade é consistente', value: 2 },
      { label: 'Na maioria dos materiais', value: 1 },
      { label: 'Não, falta unidade visual', value: 0 },
    ],
  },
  {
    category: 'Conteúdo',
    question: 'As redes sociais seguem um planejamento conectado aos objetivos do negócio?',
    options: [
      { label: 'Sim, temos estratégia e calendário', value: 2 },
      { label: 'Publicamos com alguma frequência, sem plano claro', value: 1 },
      { label: 'Publicamos pouco ou apenas quando sobra tempo', value: 0 },
    ],
  },
  {
    category: 'Mídia',
    question: 'A empresa investe em mídia com públicos, metas e acompanhamento definidos?',
    options: [
      { label: 'Sim, acompanhamos campanhas e objetivos', value: 2 },
      { label: 'Investimos, mas faltam análise e constância', value: 1 },
      { label: 'Não investimos ou apenas impulsionamos posts', value: 0 },
    ],
  },
  {
    category: 'Experiência digital',
    question: 'Seu site explica bem a oferta e conduz o visitante para uma próxima ação?',
    options: [
      { label: 'Sim, ele é atual, claro e gera contatos', value: 2 },
      { label: 'Existe, mas precisa ser atualizado', value: 1 },
      { label: 'Não temos site ou ele não ajuda nas vendas', value: 0 },
    ],
  },
  {
    category: 'Comercial',
    question: 'Os contatos gerados pelo marketing são organizados e acompanhados até a venda?',
    options: [
      { label: 'Sim, sabemos a origem e o resultado dos contatos', value: 2 },
      { label: 'O acompanhamento acontece parcialmente', value: 1 },
      { label: 'Não temos esse controle', value: 0 },
    ],
  },
  {
    category: 'Planejamento',
    question: 'A comunicação tem metas e prioridades definidas para os próximos meses?',
    options: [
      { label: 'Sim, existe um plano compartilhado', value: 2 },
      { label: 'Temos ideias, mas as prioridades mudam muito', value: 1 },
      { label: 'As ações são decididas de última hora', value: 0 },
    ],
  },
  {
    category: 'Resultados',
    question: 'Você recebe uma leitura que conecta comunicação, oportunidades e resultado?',
    options: [
      { label: 'Sim, usamos os dados para tomar decisões', value: 2 },
      { label: 'Vemos métricas, mas falta contexto de negócio', value: 1 },
      { label: 'Não sabemos o que a comunicação está gerando', value: 0 },
    ],
  },
];

function getResult(score: number) {
  if (score >= 13) {
    return {
      level: 'Boa base para ganhar escala',
      text: 'Sua comunicação já tem fundamentos importantes. O próximo salto está em integrar melhor os canais, ampliar consistência e transformar os dados em decisões mais rápidas.',
      action: 'Escala e otimização',
    };
  }
  if (score >= 8) {
    return {
      level: 'Potencial ainda mal aproveitado',
      text: 'Existem boas iniciativas, mas elas ainda trabalham de forma isolada. Um plano integrado pode dar unidade à marca e fazer cada investimento contribuir para o mesmo objetivo.',
      action: 'Integração e planejamento',
    };
  }
  return {
    level: 'A base pede atenção',
    text: 'Sua empresa tem espaço para organizar posicionamento, presença digital e acompanhamento. Estruturar essa base ajuda a evitar ações soltas e cria um caminho mais seguro para crescer.',
    action: 'Base e posicionamento',
  };
}

export function DiagnosticForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<number | undefined>>(
    () => Array.from({ length: questions.length }),
  );
  const [finished, setFinished] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const current = questions[step];
  const score = answers.reduce<number>((total, answer) => total + (answer ?? 0), 0);
  const result = getResult(score);
  const progress = finished ? 100 : ((step + 1) / questions.length) * 100;

  const selectAnswer = (value: number) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[step] = value;
      return next;
    });
  };

  const advance = () => {
    if (answers[step] === undefined) return;
    if (step === questions.length - 1) setFinished(true);
    else setStep((currentStep) => currentStep + 1);
  };

  const restart = () => {
    setAnswers(Array.from({ length: questions.length }));
    setStep(0);
    setFinished(false);
    setName('');
    setCompany('');
  };

  const message = encodeURIComponent(
    `Olá! Fiz o diagnóstico de comunicação da Invista e meu resultado foi “${result.level}” (${score}/16).${name ? ` Meu nome é ${name}.` : ''}${company ? ` Empresa: ${company}.` : ''} Gostaria de conversar sobre os próximos passos.`,
  );

  return (
    <section className="diagnostic-card" aria-live="polite">
      <div className="diagnostic-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {!finished ? (
        <div className="diagnostic-question">
          <div className="diagnostic-step">
            <span>{current.category}</span>
            <span>{String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</span>
          </div>
          <h2>{current.question}</h2>
          <div className="diagnostic-options" role="radiogroup" aria-label={current.question}>
            {current.options.map((option) => {
              const selected = answers[step] === option.value;
              return (
                <label
                  className={selected ? 'selected' : ''}
                  key={option.label}
                >
                  <input
                    type="radio"
                    name={`diagnostic-question-${step}`}
                    value={option.value}
                    checked={selected}
                    onChange={() => selectAnswer(option.value)}
                  />
                  <span>{option.label}</span>
                  <i aria-hidden="true">{selected ? <Check size={17} /> : null}</i>
                </label>
              );
            })}
          </div>
          <div className="diagnostic-navigation">
            <button
              type="button"
              className="diagnostic-back"
              onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))}
              disabled={step === 0}
            >
              <ArrowLeft size={18} /> Voltar
            </button>
            <button
              type="button"
              className="button button-dark"
              onClick={advance}
              disabled={answers[step] === undefined}
            >
              {step === questions.length - 1 ? 'Ver meu resultado' : 'Próxima pergunta'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="diagnostic-result">
          <p className="eyebrow dark">Seu diagnóstico</p>
          <div className="diagnostic-score"><strong>{score}</strong><span>de 16 pontos</span></div>
          <p className="diagnostic-result-label">{result.action}</p>
          <h2>{result.level}</h2>
          <p>{result.text}</p>

          <div className="diagnostic-lead">
            <label>
              Seu nome <span>(opcional)</span>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Como podemos chamar você?" />
            </label>
            <label>
              Empresa <span>(opcional)</span>
              <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Nome da empresa" />
            </label>
          </div>

          <div className="diagnostic-result-actions">
            <a className="button button-dark" href={`https://wa.me/5547996240055?text=${message}`} target="_blank" rel="noreferrer">
              Conversar sobre o resultado <ArrowRight size={18} />
            </a>
            <button type="button" className="diagnostic-restart" onClick={restart}>
              <RotateCcw size={17} /> Refazer diagnóstico
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
