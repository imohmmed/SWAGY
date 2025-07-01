import { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    
    // Update document direction and language
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    // Don't save to localStorage - always reset to English on page refresh
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Always start with English on page load
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  return {
    language,
    toggleLanguage,
    t
  };
}
