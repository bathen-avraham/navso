import type { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { bookingUrl } from '../data/siteConfig';

type Variant = 'primary' | 'secondary';
type Size = 'default' | 'sm';

interface Props {
  /** Translation key for the button label. Defaults to the standard public CTA text. */
  labelKey?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
  /** Render an arrow at the end. Defaults to true on the primary variant. */
  arrow?: boolean;
}

export default function BookingButton({
  labelKey = 'cta.calendar',
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  arrow,
}: Props) {
  const { language, t } = useLanguage();
  // Default: arrow only on the primary variant in English. Hebrew CTAs read
  // more naturally without the trailing "→" character (which doesn't flip in RTL).
  const showArrow = arrow ?? (variant === 'primary' && language === 'en');

  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const sizeClass = size === 'sm' ? 'text-sm py-2 px-4' : '';

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={[base, sizeClass, className].filter(Boolean).join(' ')}
    >
      {children ?? t(labelKey)}
      {showArrow && (
        <span aria-hidden className="text-lg leading-none">
          →
        </span>
      )}
    </a>
  );
}
