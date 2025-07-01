import { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

// Global language state for instant updates across all components
let globalLanguage: Language = 'en';
const languageListeners: Array<(lang: Language) => void> = [];

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(globalLanguage);

  useEffect(() => {
    // Subscribe to global language changes
    const listener = (newLang: Language) => {
      setLanguage(newLang);
    };
    languageListeners.push(listener);
    
    // Always start with English on page load
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    
    return () => {
      const index = languageListeners.indexOf(listener);
      if (index > -1) {
        languageListeners.splice(index, 1);
      }
    };
  }, []);

  const toggleLanguage = () => {
    const newLang: Language = globalLanguage === 'en' ? 'ar' : 'en';
    globalLanguage = newLang;
    
    // Update document direction and language
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    // Notify all components instantly
    languageListeners.forEach(listener => listener(newLang));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    toggleLanguage,
    t
  };
}
