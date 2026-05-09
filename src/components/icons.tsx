/**
 * Small inline SVG icons used as subject/credential indicators.
 *
 * These deliberately don't use Hebrew letters as glyphs — they live next to
 * Hebrew/English content in cards and tables, and a clean educational icon
 * reads better than a single character.
 */

interface IconProps {
  className?: string;
  size?: number;
}

/** Notebook with text lines — used to mark Hebrew language content. */
export function HebrewIcon({ className = '', size = 22 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  );
}

/** Sigma-shape outline — used to mark Math content. */
export function MathIcon({ className = '', size = 22 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 4h12l-7 8 7 8H6l7-8z" />
    </svg>
  );
}
