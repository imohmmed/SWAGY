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
    
    // Save to localStorage
    localStorage.setItem('swagy-language', newLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Load saved language
    const savedLang = localStorage.getItem('swagy-language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguage(savedLang);
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    }
  }, []);

  return {
    language,
    toggleLanguage,
    t
  };
}
