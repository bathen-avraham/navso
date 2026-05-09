import { useLanguage } from '../contexts/LanguageContext';
import { bookingUrl } from '../data/siteConfig';
import type { Subject, Topic, TopicInfo } from '../types';
import { HebrewIcon, MathIcon } from './icons';

interface Props {
  topic: Topic;
  subject: Subject;
  info?: TopicInfo;
  showDetails?: boolean;
}

const subjectAccent: Record<Subject, string> = {
  hebrew: 'bg-brand-gradient',
  math: 'bg-gradient-to-br from-accent-400 to-accent-600',
};

const subjectChip: Record<Subject, string> = {
  hebrew: 'bg-brand-50 text-brand-700 border-brand-100',
  math: 'bg-accent-50 text-accent-700 border-accent-100',
};

const difficultyDot: Record<NonNullable<TopicInfo['difficulty']>, string> = {
  beginner: 'bg-emerald-500',
  intermediate: 'bg-amber-500',
  advanced: 'bg-rose-500',
};

export default function SubjectCard({
  topic,
  subject,
  info,
  showDetails = false,
}: Props) {
  const { language, t } = useLanguage();
  const title = t(`topic.${topic}.title`);
  const desc = t(`topic.${topic}.desc`);

  return (
    <article className="card card-hover flex flex-col h-full group">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          aria-hidden
          className={`w-11 h-11 rounded-xl ${subjectAccent[subject]} grid place-items-center text-white shadow-soft`}
        >
          {subject === 'hebrew' ? (
            <HebrewIcon size={22} />
          ) : (
            <MathIcon size={22} />
          )}
        </div>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider rounded-full border px-2.5 py-1 ${subjectChip[subject]}`}
        >
          {t(`subject.${subject}.short`)}
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 text-lg mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed flex-1">{desc}</p>

      {showDetails && info && (
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-slate-500 mb-1">{t('difficulty.label')}</p>
            <p className="font-semibold text-slate-800 inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className={`w-1.5 h-1.5 rounded-full ${difficultyDot[info.difficulty]}`}
              />
              {t(`difficulty.${info.difficulty}`)}
            </p>
          </div>
          <div>
            <p className="text-slate-500 mb-1">{t('duration.recommended')}</p>
            <p className="font-semibold text-slate-800">
              {info.recommendedDuration} {t('duration.minutes')}
            </p>
          </div>
        </div>
      )}

      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 text-sm font-semibold text-brand-700 hover:text-brand-800 inline-flex items-center gap-1.5 group/link"
      >
        {t('home.cta.book')}
        {language === 'en' && (
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
          >
            →
          </span>
        )}
      </a>
    </article>
  );
}
