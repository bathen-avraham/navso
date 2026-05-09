import SubjectCard from '../components/SubjectCard';
import { useLanguage } from '../contexts/LanguageContext';
import { hebrewTopics, mathTopics, topicInfo } from '../data/mockData';

export default function SubjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="container-page section">
      <header className="mb-12 max-w-3xl animate-fade-up">
        <span className="eyebrow mb-3">{t('subjects.eyebrow')}</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          {t('subjects.title')}
        </h1>
        <p className="section-lead">{t('subjects.subtitle')}</p>
      </header>

      <section className="mb-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-slate-200/70">
          <div>
            <span className="chip mb-2">{t('subject.hebrew.short')}</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              {t('subjects.hebrew.title')}
            </h2>
            <p className="text-slate-600 mt-1">{t('subjects.hebrew.subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hebrewTopics.map((topic) => (
            <SubjectCard
              key={topic}
              topic={topic}
              subject="hebrew"
              info={topicInfo[topic]}
              showDetails
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-slate-200/70">
          <div>
            <span className="chip-accent mb-2">{t('subject.math.short')}</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              {t('subjects.math.title')}
            </h2>
            <p className="text-slate-600 mt-1">{t('subjects.math.subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mathTopics.map((topic) => (
            <SubjectCard
              key={topic}
              topic={topic}
              subject="math"
              info={topicInfo[topic]}
              showDetails
            />
          ))}
        </div>
      </section>
    </div>
  );
}
