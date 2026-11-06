import { useLanguage } from '../../hooks/useLanguage';

/**
 * Per-simulation copy: pass `{ en, es }` and get the dictionary for the current language
 * (falls back to English). Keeps each lesson's text next to its code.
 */
export const useSimText = <T,>(dict: { en: T; es: T }): T => {
  const { language } = useLanguage();
  return dict[language] ?? dict.en;
};
