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
    const parts = window.location.pathname.split('/').filter(Boolean);
    const lang = parts[0];
    if (lang === 'es' || lang === 'en') {
      return lang;
    }
    return 'en'; // Default language
  };

  const [language, setLanguageState] = useState<Language>(getLangFromUrl());

  const setLanguage = useCallback((lang: Language) => {
    if (lang !== language) {
        setLanguageState(lang);
        const parts = window.location.pathname.split('/').filter(Boolean);
        let newParts: string[];
        if (parts.length > 0 && (parts[0] === 'en' || parts[0] === 'es')) {
          newParts = [lang, ...parts.slice(1)];
        } else {
          newParts = [lang, ...parts];
        }
        const newPath = `/${newParts.join('/')}`;
        window.history.pushState({}, '', newPath);
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