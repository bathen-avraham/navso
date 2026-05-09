import BookingButton from '../components/BookingButton';
import FAQItem from '../components/FAQItem';
import { useLanguage } from '../contexts/LanguageContext';

const faqIds = ['q7', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <div className="container-page section max-w-3xl">
      <header className="mb-10 text-center animate-fade-up">
        <span className="eyebrow mb-3">{t('faq.eyebrow')}</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {t('faq.title')}
        </h1>
        <p className="section-lead">{t('faq.subtitle')}</p>
      </header>

      <div className="space-y-3">
        {faqIds.map((id, idx) => (
          <FAQItem
            key={id}
            question={t(`faq.${id}.q`)}
            answer={t(`faq.${id}.a`)}
            defaultOpen={idx === 0}
          />
        ))}
      </div>

      <div className="card mt-10 text-center bg-gradient-to-br from-brand-50 to-white">
        <p className="text-sm text-slate-600 mb-4">{t('faq.cta.text')}</p>
        <BookingButton labelKey="home.cta.book" />
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center italic">
        {t('common.bagrutNote')}
      </p>
    </div>
  );
}
