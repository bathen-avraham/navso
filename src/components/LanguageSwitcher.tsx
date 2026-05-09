import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../types';

interface Props {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: Props) {
  const { language, setLanguage, t } = useLanguage();

  const Btn = ({ value, label }: { value: Language; label: string }) => {
    const active = language === value;
    return (
      <button
        type="button"
        onClick={() => setLanguage(value)}
        aria-pressed={active}
        data-umami-event="lang-switch"
        data-umami-event-to={value}
        className={[
          'px-3 py-1.5 text-sm rounded-full transition-colors',
          active
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-slate-600 hover:text-brand-700',
        ].join(' ')}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={[
        'inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1',
        className,
      ].join(' ')}
    >
      <Btn value="he" label={t('lang.toggleHe')} />
      <Btn value="en" label={t('lang.toggleEn')} />
    </div>
  );
}
