import BookingButton from '../components/BookingButton';
import { useLanguage } from '../contexts/LanguageContext';

const stepIds = ['s1', 's2', 's3'] as const;

export default function BookingPage() {
  const { t } = useLanguage();

  return (
    <div className="container-page section">
      <header className="mb-10 max-w-2xl">
        <span className="eyebrow mb-3">{t('booking.eyebrow')}</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {t('booking.title')}
        </h1>
        <p className="section-lead">{t('booking.subtitle')}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="card lg:col-span-2 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -end-20 w-56 h-56 bg-brand-gradient rounded-full opacity-10 blur-2xl"
          />
          <div className="relative">
            <h2 className="text-xl font-semibold text-slate-900 mb-5">
              {t('booking.steps.title')}
            </h2>
            <ol className="space-y-4 mb-7">
              {stepIds.map((id, idx) => (
                <li key={id} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="w-8 h-8 rounded-full bg-brand-gradient text-white grid place-items-center text-sm font-semibold shadow-soft shrink-0"
                  >
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed pt-1">
                    {t(`booking.steps.${id}`)}
                  </p>
                </li>
              ))}
            </ol>
            <BookingButton
              labelKey="cta.calendar.long"
              className="w-full sm:w-auto sm:px-8 text-base"
            />
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              {t('home.cta.calendarHelper')}
            </p>
          </div>
        </div>

        <aside className="card">
          <h3 className="font-semibold text-slate-900 mb-4">
            {t('booking.calendar.aside.title')}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 grid place-items-center text-sm shrink-0"
              >
                ⏱
              </span>
              <p className="text-slate-700 pt-1">
                {t('booking.calendar.aside.duration')}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="w-8 h-8 rounded-lg bg-accent-50 text-accent-600 grid place-items-center text-sm shrink-0"
              >
                ◇
              </span>
              <p className="text-slate-700 pt-1">
                {t('booking.calendar.aside.online')}
              </p>
            </li>
          </ul>
          <p className="text-xs text-slate-500 mt-5 leading-relaxed pt-4 border-t border-slate-100">
            {t('booking.calendar.aside.tz')}
          </p>
        </aside>
      </div>
    </div>
  );
}
