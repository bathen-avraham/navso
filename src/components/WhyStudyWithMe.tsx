import { useLanguage } from '../contexts/LanguageContext';

const cards = [
  { id: 'c1', icon: '◆' },
  { id: 'c2', icon: '★' },
  { id: 'c3', icon: '✦' },
  { id: 'c4', icon: '◇' },
] as const;

export default function WhyStudyWithMe() {
  const { t } = useLanguage();

  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="eyebrow mb-3">{t('home.why.eyebrow')}</span>
          <h2 className="section-title mt-2 mb-3">{t('home.why.title')}</h2>
          <p className="section-lead">{t('home.why.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <article key={card.id} className="card card-hover flex flex-col h-full">
              <div
                aria-hidden
                className="w-11 h-11 rounded-xl bg-brand-gradient text-white grid place-items-center font-semibold text-lg shadow-soft mb-4"
              >
                {card.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 leading-tight">
                {t(`home.why.${card.id}.title`)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(`home.why.${card.id}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
