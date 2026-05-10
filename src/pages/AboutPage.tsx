import type { ReactNode } from 'react';
import BookingButton from '../components/BookingButton';
import { HebrewIcon, MathIcon } from '../components/icons';
import { useLanguage } from '../contexts/LanguageContext';
import { hebrewTopics, mathTopics } from '../data/mockData';

interface Highlight {
  id: 'degree' | 'experience' | 'hebrew' | 'math';
  icon: ReactNode;
}

const highlights: Highlight[] = [
  { id: 'degree', icon: <span className="text-lg leading-none">🎓</span> },
  { id: 'experience', icon: <span className="text-lg leading-none">✦</span> },
  { id: 'hebrew', icon: <HebrewIcon size={22} /> },
  { id: 'math', icon: <MathIcon size={22} /> },
];

const values = [
  { id: 'clarity', icon: '◆' },
  { id: 'pace', icon: '◇' },
  { id: 'confidence', icon: '★' },
] as const;

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container-page section">
      {/* Intro */}
      <header className="mb-16 grid lg:grid-cols-3 gap-10 lg:gap-12 items-start animate-fade-up">
        <div className="lg:col-span-2">
          <span className="eyebrow mb-3">{t('about.eyebrow')}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">{t('about.lead')}</p>
        </div>
        <div className="lg:col-span-1 max-w-xs sm:max-w-sm mx-auto lg:mx-0 w-full">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-3xl bg-brand-gradient opacity-15 blur-2xl"
            />
            <figure className="card relative p-0 overflow-hidden">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt={t('profile.alt')}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="p-4 sm:p-5 text-center sm:text-start">
                <p className="font-display text-lg font-bold text-slate-900 leading-tight">
                  {t('profile.name')}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t('profile.role')}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      {/* Credentials */}
      <section className="mb-16">
        <SectionHeading
          eyebrow={t('about.section.credentials')}
          title={t('about.highlights.title')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <div key={h.id} className="card card-hover flex flex-col h-full">
              <div
                aria-hidden
                className="w-11 h-11 rounded-xl bg-brand-gradient text-white grid place-items-center font-semibold text-lg shadow-soft mb-4"
              >
                {h.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 leading-tight">
                {t(`about.highlight.${h.id}.title`)}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(`about.highlight.${h.id}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mb-16">
        <SectionHeading
          eyebrow={t('about.section.approach')}
          title={t('about.values.title')}
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card lg:col-span-2 space-y-4 text-slate-700 leading-relaxed text-base">
            <p className="text-slate-800">{t('about.approach.lead')}</p>
            <p>{t('about.p1')}</p>
            <p>{t('about.p4')}</p>
          </div>
          <div className="card">
            <ul className="space-y-4">
              {values.map((v) => (
                <li key={v.id} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 grid place-items-center text-sm shrink-0"
                  >
                    {v.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {t(`about.value.${v.id}.title`)}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {t(`about.value.${v.id}.desc`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="mb-16">
        <SectionHeading
          eyebrow={t('about.section.subjects')}
          title={t('about.section.subjects')}
        />
        <div className="card mb-6 space-y-4 text-slate-700 leading-relaxed text-base">
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
          <p className="text-xs text-slate-500 italic">
            {t('common.bagrutNote')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <TopicListCard
            iconClass="bg-brand-gradient"
            iconNode={<HebrewIcon size={18} />}
            title={t('subjects.hebrew.title')}
            topics={hebrewTopics.filter((topic) => topic !== 'general')}
          />
          <TopicListCard
            iconClass="bg-gradient-to-br from-accent-400 to-accent-600"
            iconNode={<MathIcon size={18} />}
            title={t('subjects.math.title')}
            topics={mathTopics.filter((topic) => topic !== 'general')}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="card-feature relative overflow-hidden text-center">
          <div
            aria-hidden
            className="absolute -top-24 -end-24 w-72 h-72 bg-brand-gradient rounded-full opacity-10 blur-3xl"
          />
          <div className="relative max-w-xl mx-auto py-2">
            <span className="eyebrow mb-3">{t('about.section.cta')}</span>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-3 text-slate-900">
              {t('home.cta.book')}
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t('about.section.cta.subtitle')}
            </p>
            <BookingButton labelKey="cta.calendar.long" className="px-8" />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6 pb-3 border-b border-slate-200/70">
      <span className="eyebrow mb-2">{eyebrow}</span>
      <h2 className="text-2xl md:text-3xl font-bold mt-1 text-slate-900 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function TopicListCard({
  iconClass,
  iconNode,
  title,
  topics,
}: {
  iconClass: string;
  iconNode: ReactNode;
  title: string;
  topics: readonly string[];
}) {
  const { t } = useLanguage();
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div
          aria-hidden
          className={`w-10 h-10 rounded-xl ${iconClass} text-white grid place-items-center shadow-soft shrink-0`}
        >
          {iconNode}
        </div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <ul className="grid gap-2.5 text-sm">
        {topics.map((topic) => (
          <li
            key={topic}
            className="flex items-center gap-2.5 text-slate-700"
          >
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"
            />
            {t(`topic.${topic}.title`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
