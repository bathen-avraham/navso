import { Link } from 'react-router-dom';
import BookingButton from './BookingButton';
import { useLanguage } from '../contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-soft-gradient" />
      <div className="absolute inset-0 -z-10 hero-grid opacity-70" />
      <div
        aria-hidden
        className="absolute -top-32 end-[-8rem] w-[32rem] h-[32rem] rounded-full bg-accent-300/25 blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 start-[-6rem] w-[28rem] h-[28rem] rounded-full bg-brand-300/30 blur-3xl -z-10"
      />

      <div className="container-page py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <span className="eyebrow mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            {t('home.hero.eyebrow')}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
            {t('home.hero.titleLead')}{' '}
            <span className="gradient-text">{t('home.hero.titleAccent')}</span>{' '}
            {t('home.hero.titleTail')}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-3 mb-3">
            <BookingButton labelKey="home.cta.book" />
            <Link to="/subjects" className="btn-secondary">
              {t('home.cta.viewPackages')}
            </Link>
          </div>
          <p className="text-xs text-slate-500 mb-7 leading-relaxed">
            {t('home.cta.calendarHelper')}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <Badge>{t('home.hero.badge.zoom')}</Badge>
            <Badge>{t('home.hero.badge.bagrut')}</Badge>
            <Badge>{t('home.hero.badge.pace')}</Badge>
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
          <div className="relative max-w-[240px] sm:max-w-[260px] mx-auto lg:max-w-[300px]">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-3xl bg-brand-gradient opacity-20 blur-2xl"
            />
            <figure className="card relative p-0 overflow-hidden">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt={t('profile.alt')}
                  loading="eager"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="p-4 sm:p-5">
                <p className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {t('profile.name')}
                </p>
                <p className="text-sm text-slate-600 mt-1">{t('profile.role')}</p>
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                  {t('profile.tagline')}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-white/70 backdrop-blur border border-slate-200 px-3 py-1.5 rounded-full">
      <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-accent-500" />
      {children}
    </span>
  );
}
