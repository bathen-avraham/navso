import HeroSection from '../components/HeroSection';
import HowBookingWorksPreview from '../components/HowBookingWorksPreview';
import LessonPackageCard from '../components/LessonPackageCard';
import SubjectCard from '../components/SubjectCard';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import WhyStudyWithMe from '../components/WhyStudyWithMe';
import { useLanguage } from '../contexts/LanguageContext';
import { hebrewTopics, mathTopics, packageOptions } from '../data/mockData';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />

      <WhyStudyWithMe />

      <section className="section">
        <div className="container-page">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="eyebrow mb-3">{t('home.improve.eyebrow')}</span>
            <h2 className="section-title mt-2 mb-3">{t('home.improve.title')}</h2>
            <p className="section-lead">{t('home.improve.hebrewLead')}</p>
          </div>

          {/* Hebrew is the visual primary: highlighted band with all Hebrew topics. */}
          <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/70 via-white to-white p-5 sm:p-7 mb-8 shadow-soft">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="chip">★ {t('subject.hebrew')}</span>
              <span className="text-sm text-slate-600">
                {t('subjects.hebrew.subtitle')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hebrewTopics
                .filter((topic) => topic !== 'general')
                .map((topic) => (
                  <SubjectCard key={topic} topic={topic} subject="hebrew" />
                ))}
            </div>
          </div>

          {/* Math: balanced section with the same card grid. */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-soft">
            <div className="flex flex-wrap items-baseline gap-2 mb-5">
              <span className="chip-accent">{t('home.improve.mathLabel')}</span>
              <span className="text-sm text-slate-600">
                {t('subjects.math.subtitle')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mathTopics
                .filter((topic) => topic !== 'general')
                .map((topic) => (
                  <SubjectCard key={topic} topic={topic} subject="math" />
                ))}
            </div>
          </div>
        </div>
      </section>

      <HowBookingWorksPreview />

      <section className="section bg-white">
        <div className="container-page">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="eyebrow mb-3">{t('packages.eyebrow')}</span>
            <h2 className="section-title mt-2 mb-3">{t('packages.title')}</h2>
            <p className="section-lead">{t('packages.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packageOptions.map((pkg) => (
              <LessonPackageCard
                key={pkg.id}
                pkg={pkg}
                highlighted={pkg.id === 'fivePack'}
              />
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-8 max-w-2xl mx-auto leading-relaxed">
            {t('packages.pricing.note')}
          </p>
        </div>
      </section>

      <Testimonials />
      <ContactSection />
    </>
  );
}
