import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FAQItem({ question, answer, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={[
        'card p-0 overflow-hidden transition-all duration-200',
        open ? 'shadow-lift border-brand-100' : 'hover:border-brand-100',
      ].join(' ')}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start group"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={[
            'font-semibold transition-colors',
            open ? 'text-brand-700' : 'text-slate-900 group-hover:text-brand-700',
          ].join(' ')}
        >
          {question}
        </span>
        <span
          aria-hidden
          className={[
            'shrink-0 w-8 h-8 rounded-full grid place-items-center text-lg leading-none transition-all duration-200',
            open
              ? 'bg-brand-gradient text-white rotate-45'
              : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100',
          ].join(' ')}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1 text-sm text-slate-600 leading-relaxed animate-fade-up">
          {answer}
        </div>
      )}
    </div>
  );
}
