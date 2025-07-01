import { useState, useCallback } from 'react';

interface FontScaleState {
  [windowId: string]: number;
}

export function useFontScale() {
  const [fontScales, setFontScales] = useState<FontScaleState>({});

  const getFontScale = useCallback((windowId: string): number => {
    return fontScales[windowId] || 1;
  }, [fontScales]);

  const increaseFontSize = useCallback((windowId: string) => {
    setFontScales(prev => ({
      ...prev,
      [windowId]: Math.min((prev[windowId] || 1) + 0.2, 2.5)
    }));
  }, []);

  const decreaseFontSize = useCallback((windowId: string) => {
    setFontScales(prev => ({
      ...prev,
      [windowId]: Math.max((prev[windowId] || 1) - 0.2, 0.6)
    }));
  }, []);

  const resetFontSize = useCallback((windowId: string) => {
    setFontScales(prev => ({
      ...prev,
      [windowId]: 1
    }));
  }, []);

  return {
    getFontScale,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  };
}