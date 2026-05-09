import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  /** Visual size of the wordmark. */
  size?: 'sm' | 'md';
}

/**
 * Brand wordmark — the gradient-styled "נבס״ו" / "Navso" text logo.
 * Used in the navbar and footer brand blocks.
 */
export default function BrandLogo({ size = 'md' }: Props) {
  const { t } = useLanguage();
  const text = t('brand.name');
  const sizeClass = size === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <span
      className={[
        'gradient-text font-display font-extrabold tracking-tight leading-none',
        sizeClass,
      ].join(' ')}
    >
      {text}
    </span>
  );
}
