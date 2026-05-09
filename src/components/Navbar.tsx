import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import BookingButton from './BookingButton';
import BrandLogo from './BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';

interface NavItem {
  to: string;
  key: string;
}

const navItems: NavItem[] = [
  { to: '/', key: 'nav.home' },
  { to: '/subjects', key: 'nav.subjects' },
  { to: '/booking', key: 'nav.booking' },
  { to: '/about', key: 'nav.about' },
  { to: '/faq', key: 'nav.faq' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Subtle border / shadow once the user has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={[
        'sticky top-0 z-30 transition-all duration-200',
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-soft'
          : 'bg-white/60 backdrop-blur-md border-b border-transparent',
      ].join(' ')}
    >
      <div className="container-page flex items-center justify-between h-16">
        <Link
          to="/"
          aria-label={t('brand.name')}
          className="group inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-90"
        >
          <BrandLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'text-brand-700'
                    : 'text-slate-600 hover:text-brand-700 hover:bg-slate-50',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {t(item.key)}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full bg-brand-gradient"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <BookingButton size="sm" arrow={false} />
        </div>

        <button
          type="button"
          className="md:hidden -me-1 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={[
              'block w-6 h-0.5 bg-slate-700 transition-transform',
              open ? 'translate-y-1.5 rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-6 h-0.5 bg-slate-700 my-1 transition-opacity',
              open ? 'opacity-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-6 h-0.5 bg-slate-700 transition-transform',
              open ? '-translate-y-1.5 -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-up">
          <div className="container-page py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-slate-700 hover:bg-slate-50',
                  ].join(' ')
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <BookingButton
                size="sm"
                arrow={false}
                className="flex-1 justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
