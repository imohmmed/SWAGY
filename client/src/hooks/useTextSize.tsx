import { useState, useEffect } from 'react';

type TextSize = 'small' | 'normal' | 'large' | 'extra-large';

const TEXT_SIZES: TextSize[] = ['small', 'normal', 'large', 'extra-large'];

export function useTextSize() {
  const [currentSize, setCurrentSize] = useState<TextSize>('normal');

  // تطبيق حجم النص على الـ root element
  useEffect(() => {
    const root = document.documentElement;
    
    // إزالة جميع الكلاسات السابقة
    TEXT_SIZES.forEach(size => {
      root.classList.remove(`text-size-${size}`);
    });
    
    // إضافة الكلاس الجديد
    root.classList.add(`text-size-${currentSize}`);
  }, [currentSize]);

  const increaseTextSize = () => {
    const currentIndex = TEXT_SIZES.indexOf(currentSize);
    if (currentIndex < TEXT_SIZES.length - 1) {
      setCurrentSize(TEXT_SIZES[currentIndex + 1]);
    }
  };

  const decreaseTextSize = () => {
    const currentIndex = TEXT_SIZES.indexOf(currentSize);
    if (currentIndex > 0) {
      setCurrentSize(TEXT_SIZES[currentIndex - 1]);
    }
  };

  const resetTextSize = () => {
    setCurrentSize('normal');
  };

  return {
    currentSize,
    increaseTextSize,
    decreaseTextSize,
    resetTextSize,
    canIncrease: currentSize !== 'extra-large',
    canDecrease: currentSize !== 'small'
  };
}