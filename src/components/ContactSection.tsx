import type { ReactNode } from 'react';
import BookingButton from './BookingButton';
import { useLanguage } from '../contexts/LanguageContext';
import {
  emailAddress,
  emailHref,
  phoneIsraelHref,
  whatsappHrefEn,
  whatsappHrefHe,
} from '../data/siteConfig';

interface Props {
  compact?: boolean;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export default function ContactSection({ compact = false }: Props) {
  const { language, t } = useLanguage();
  const phoneDisplay = t('contact.phone.value');
  const whatsappDisplay = t('contact.whatsapp.value');
  const phoneTel =
    language === 'he' ? phoneIsraelHref : `tel:${digitsOnly(phoneDisplay)}`;
  const whatsappHref = language === 'he' ? whatsappHrefHe : whatsappHrefEn;

  return (
    <section className={compact ? '' : 'section'}>
      <div className="container-page">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="section-title mb-3">{t('contact.title')}</h2>
          <p className="section-lead">{t('contact.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <ContactCard
            label={t('contact.phone')}
            value={phoneDisplay}
            href={phoneTel}
            icon={<PhoneIcon />}
          />
          <ContactCard
            label={t('contact.email')}
            value={emailAddress}
            href={emailHref}
            icon={<MailIcon />}
          />
          <ContactCard
            label={t('contact.whatsapp')}
            value={whatsappDisplay}
            href={whatsappHref}
            external
            icon={<ChatIcon />}
            accent
            cta={t('contact.whatsapp.cta')}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <BookingButton labelKey="cta.calendar" className="px-8" />
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  accent?: boolean;
  cta?: string;
}

function ContactCard({
  label,
  value,
  href,
  icon,
  external,
  accent,
  cta,
}: ContactCardProps) {
  const externalProps = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
  const tileClass = accent
    ? 'bg-gradient-to-br from-accent-400 to-accent-600'
    : 'bg-brand-gradient';

  return (
    <a
      href={href}
      {...externalProps}
      title={value}
      className="card card-hover flex flex-col items-center text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-white"
    >
      <div
        className={`w-12 h-12 rounded-xl ${tileClass} text-white grid place-items-center mb-4 shadow-soft`}
      >
        {icon}
      </div>
      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1.5">
        {label}
      </p>
      <p
        className="font-semibold text-slate-900 break-all group-hover:text-brand-700 group-hover:underline underline-offset-4 transition-colors"
        dir="ltr"
      >
        {value}
      </p>
      {cta && (
        <span className="mt-4 text-xs font-semibold text-brand-700 inline-flex items-center gap-1">
          {cta}
          <span aria-hidden>→</span>
        </span>
      )}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}
