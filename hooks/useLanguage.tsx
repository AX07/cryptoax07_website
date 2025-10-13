import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { translations } from '../translations';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getLangFromUrl = (): Language => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang === 'es' || lang === 'en') {
      return lang;
    }
    return 'en'; // Default language
  };

  const [language, setLanguageState] = useState<Language>(getLangFromUrl());

  const setLanguage = useCallback((lang: Language) => {
    if (lang !== language) {
        setLanguageState(lang);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url.toString());
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'es' : 'en');
  }, [language, setLanguage]);

  // Effect to handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setLanguageState(getLangFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }): any => {
    const keys = key.split('.');
    
    // Check if the current language is a valid key in translations
    const currentTranslations = translations[language] || translations.en;
    
    let result: any = currentTranslations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
            if (fallbackResult === undefined) return key;
        }
        result = fallbackResult || key;
        break;
      }
    }
    
    if (typeof result === 'string' && replacements) {
        let strResult = result;
        Object.keys(replacements).forEach(rKey => {
            strResult = strResult.replace(`{{${rKey}}}`, String(replacements[rKey]));
        });
        return strResult;
    }

    return result;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};