import { useState, useCallback } from 'react';
import { DragState } from '../types';

export function useDrag() {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedWindow: null,
    offset: { x: 0, y: 0 }
  });

  const startDrag = useCallback((windowId: string, clientX: number, clientY: number, windowEl: HTMLElement) => {
    const rect = windowEl.getBoundingClientRect();
    setDragState({
      isDragging: true,
      draggedWindow: windowId,
      offset: {
        x: clientX - rect.left,
        y: clientY - rect.top
      }
    });
  }, []);

  const updateDrag = useCallback((clientX: number, clientY: number, windowEl: HTMLElement) => {
    if (!dragState.isDragging || !dragState.draggedWindow) return;
    
    const newX = clientX - dragState.offset.x;
    const newY = clientY - dragState.offset.y;
    
    // Keep window within bounds
    const windowRect = windowEl.getBoundingClientRect();
    const maxX = window.innerWidth - windowRect.width;
    const maxY = window.innerHeight - windowRect.height - 28; // Account for taskbar
    
    const boundedX = Math.max(0, Math.min(maxX, newX));
    const boundedY = Math.max(0, Math.min(maxY, newY));
    
    windowEl.style.left = `${boundedX}px`;
    windowEl.style.top = `${boundedY}px`;
  }, [dragState]);

  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedWindow: null,
      offset: { x: 0, y: 0 }
    });
  }, []);

  return {
    dragState,
    startDrag,
    updateDrag,
    endDrag
  };
}
