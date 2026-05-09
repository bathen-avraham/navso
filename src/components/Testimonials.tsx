import { useLanguage } from '../contexts/LanguageContext';
import { testimonials } from '../data/mockData';
import type { Testimonial } from '../types';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="section bg-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-brand-50/40 to-white"
      />

      <div className="container-page">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="eyebrow mb-3">★ {t('testimonials.eyebrow')}</span>
          <h2 className="section-title mt-2">{t('testimonials.title')}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((tst, idx) => (
            <TestimonialCard key={tst.id} t={tst} featured={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  t: tst,
  featured,
}: {
  t: Testimonial;
  featured: boolean;
}) {
  const { language } = useLanguage();

  return (
    <article
      className={[
        'card relative overflow-hidden flex flex-col h-full',
        featured
          ? 'lg:row-span-1 ring-1 ring-brand-200 shadow-lift bg-gradient-to-br from-white to-brand-50/40'
          : '',
      ].join(' ')}
    >
      <span
        aria-hidden
        className="absolute top-3 end-5 text-7xl leading-none text-brand-200/70 font-display select-none"
      >
        “
      </span>

      <div className="flex items-center gap-1 mb-4 text-amber-400" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      <p className="text-slate-700 leading-relaxed flex-1 relative z-10">
        {tst.quote[language]}
      </p>

      <footer className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-gradient text-white grid place-items-center font-semibold text-sm">
          {initial(tst.name[language])}
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-slate-900">{tst.name[language]}</p>
          {tst.role && (
            <p className="text-xs text-slate-500 mt-0.5">{tst.role[language]}</p>
          )}
        </div>
      </footer>
    </article>
  );
}

function initial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '·';
  return trimmed.charAt(0);
}
