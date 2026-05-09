import BookingButton from './BookingButton';
import { useLanguage } from '../contexts/LanguageContext';

const stepIds = ['s1', 's2', 's3'] as const;

export default function HowBookingWorksPreview() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container-page">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="eyebrow mb-3">{t('home.how.eyebrow')}</span>
          <h2 className="section-title mt-2 mb-3">{t('home.how.title')}</h2>
          <p className="section-lead">{t('home.how.subtitle')}</p>
        </div>

        <div className="card relative overflow-hidden max-w-4xl mx-auto">
          <div
            aria-hidden
            className="absolute -top-20 -end-20 w-56 h-56 bg-brand-gradient rounded-full opacity-10 blur-2xl"
          />
          <div className="relative grid sm:grid-cols-3 gap-6 mb-7">
            {stepIds.map((id, idx) => (
              <div key={id} className="flex sm:flex-col items-start sm:items-center gap-3 sm:text-center">
                <span
                  aria-hidden
                  className="w-10 h-10 rounded-full bg-brand-gradient text-white grid place-items-center text-sm font-semibold shadow-soft shrink-0"
                >
                  {idx + 1}
                </span>
                <p className="text-slate-800 font-medium leading-snug">
                  {t(`home.how.${id}`)}
                </p>
              </div>
            ))}
          </div>
          <div className="relative flex justify-center">
            <BookingButton labelKey="cta.calendar" className="px-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
