import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useLanguage } from '../contexts/LanguageContext';
import {
  emailAddress,
  emailHref,
  phoneIsraelHref,
  whatsappHrefEn,
  whatsappHrefHe,
} from '../data/siteConfig';

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export default function Footer() {
  const { language, t } = useLanguage();
  const year = new Date().getFullYear();

  // Hebrew uses the IL phone (tel:0508866512); English uses the US phone.
  const phoneDisplay = t('contact.phone.value');
  const phoneTel =
    language === 'he' ? phoneIsraelHref : `tel:${digitsOnly(phoneDisplay)}`;
  const whatsappDisplay = t('contact.whatsapp.value');
  const whatsappHref = language === 'he' ? whatsappHrefHe : whatsappHrefEn;

  // Reusable link style — strong enough that nobody mistakes it for plain text.
  const contactLinkClass =
    'font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-4 decoration-brand-300 hover:decoration-brand-600 transition-colors break-all';

  return (
    <footer className="bg-white border-t border-slate-100 mt-24">
      <div className="container-page py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="mb-3">
            <BrandLogo />
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-2">
              {t('brand.tagline')}
            </p>
          </div>
          <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: '/', key: 'nav.home' },
              { to: '/subjects', key: 'nav.subjects' },
              { to: '/booking', key: 'nav.booking' },
              { to: '/about', key: 'nav.about' },
              { to: '/faq', key: 'nav.faq' },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-slate-600 hover:text-brand-700 transition-colors"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            {t('footer.contact')}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-slate-500 shrink-0">{t('contact.phone')}:</span>
              <a
                href={phoneTel}
                dir="ltr"
                title={phoneDisplay}
                data-umami-event="phone-click"
                data-umami-event-loc="footer"
                className={contactLinkClass}
              >
                {phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500 shrink-0">{t('contact.email')}:</span>
              <a
                href={emailHref}
                dir="ltr"
                title={emailAddress}
                data-umami-event="email-click"
                data-umami-event-loc="footer"
                className={contactLinkClass}
              >
                {emailAddress}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500 shrink-0">{t('contact.whatsapp')}:</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                title={whatsappDisplay}
                data-umami-event="whatsapp-click"
                data-umami-event-loc="footer"
                className={contactLinkClass}
              >
                {whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5">
        <div className="container-page text-center text-xs text-slate-500">
          © {year} {t('brand.name')}. {t('footer.copyright')}.
        </div>
      </div>
    </footer>
  );
}
