import BookingButton from './BookingButton';
import { useLanguage } from '../contexts/LanguageContext';
import type { PackageOption } from '../types';

interface Props {
  pkg: PackageOption;
  highlighted?: boolean;
}

export default function LessonPackageCard({ pkg, highlighted = false }: Props) {
  const { t } = useLanguage();
  const titleKey = `package.${pkg.id}.title`;
  const descKey = `package.${pkg.id}.desc`;
  const recommendedKey = `package.${pkg.id}.recommended`;

  return (
    <article
      className={[
        'relative card card-hover flex flex-col h-full',
        highlighted ? 'ring-2 ring-brand-500 shadow-lift border-transparent' : '',
      ].join(' ')}
    >
      {highlighted && (
        <span className="absolute -top-3 start-6 inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-gradient text-white shadow-soft">
          ★ {t('package.popular')}
        </span>
      )}

      <h3 className="text-lg font-semibold text-slate-900 mb-2">{t(titleKey)}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
        {t(descKey)}
      </p>

      {/* Price block */}
      <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-4 mb-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-slate-900 leading-none" dir="ltr">
            ₪{pkg.pricePerLesson}
          </span>
          <span className="text-sm text-slate-500">
            {t('package.price.perLesson')}
          </span>
        </div>
        {pkg.totalPrice !== undefined && (
          <p className="text-xs text-slate-500 mt-2">
            {t('package.total')}:{' '}
            <span dir="ltr" className="font-semibold text-slate-700">
              ₪{pkg.totalPrice.toLocaleString('en-US')}
            </span>
          </p>
        )}
        {pkg.bagrutSeason && (
          <p className="text-[11px] text-brand-700 mt-2 font-medium">
            ★ {t('package.bagrutBadge')}
          </p>
        )}
      </div>

      <ul className="text-sm space-y-3 mb-6 pt-4 border-t border-slate-100">
        <li className="flex items-start justify-between gap-3">
          <span className="text-slate-500">{t('package.duration')}</span>
          <span className="font-semibold text-slate-900">
            {pkg.duration} {t('common.minutes')}
          </span>
        </li>
        <li className="flex items-start justify-between gap-3">
          <span className="text-slate-500">{t('package.recommendedFor')}</span>
          <span className="font-semibold text-slate-900 text-end">
            {t(recommendedKey)}
          </span>
        </li>
      </ul>

      <BookingButton
        labelKey="cta.calendar"
        variant={highlighted ? 'primary' : 'secondary'}
        arrow={false}
        className="w-full justify-center"
      />
    </article>
  );
}
