import { useState, useCallback } from 'react';
import { WindowState, WindowType } from '../types';

const defaultWindowPositions = {
  me: { x: 50, y: 50 },
  projects: { x: 100, y: 100 },
  music: { x: 150, y: 150 },
  blog: { x: 200, y: 200 },
  downloads: { x: 250, y: 250 },
  contact: { x: 300, y: 300 },
  terminal: { x: 350, y: 350 },
  recycle: { x: 400, y: 400 }
};

export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowZIndex, setWindowZIndex] = useState(1000);

  const createWindow = useCallback((type: WindowType): string => {
    const windowId = `${type}-${Date.now()}`;
    const position = defaultWindowPositions[type];
    
    const newWindow: WindowState = {
      id: windowId,
      type,
      title: `${type}Title`,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position,
      size: { width: 600, height: 400 },
      zIndex: windowZIndex + 1
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(windowId);
    setWindowZIndex(prev => prev + 1);
    
    return windowId;
  }, [windowZIndex]);

  const openWindow = useCallback((type: WindowType): string => {
    // Check if window of this type already exists
    const existingWindow = windows.find(w => w.type === type && w.isOpen);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return existingWindow.id;
    }
    
    return createWindow(type);
  }, [windows, createWindow]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    const newZIndex = windowZIndex + 1;
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, isMinimized: false, zIndex: newZIndex }
        : w
    ));
    setActiveWindow(windowId);
    setWindowZIndex(newZIndex);
  }, [windowZIndex]);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);

  const getVisibleWindows = useCallback(() => {
    return windows.filter(w => w.isOpen && !w.isMinimized);
  }, [windows]);

  const getTaskbarWindows = useCallback(() => {
    return windows.filter(w => w.isOpen);
  }, [windows]);

  return {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    getVisibleWindows,
    getTaskbarWindows
  };
}
