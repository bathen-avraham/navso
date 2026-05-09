import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { getStoredLanguage, setStoredLanguage } from '../utils/storage';

interface LanguageContextValue {
  language: Language;
  dir: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const DEFAULT_LANGUAGE: Language = 'he';

interface ProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: ProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = getStoredLanguage();
    return stored ?? DEFAULT_LANGUAGE;
  });

  const dir = language === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    const title = translations[language]['page.title'];
    if (title) document.title = title;
  }, [language, dir]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next: Language = prev === 'he' ? 'en' : 'he';
      setStoredLanguage(next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language];
      const value = dict[key];
      if (value !== undefined) return value;
      // Fallback to English to avoid blank UI on missing keys.
      const fallback = translations.en[key];
      return fallback ?? key;
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, dir, setLanguage, toggleLanguage, t }),
    [language, dir, setLanguage, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
