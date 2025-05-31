export interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type WindowType = 
  | 'me' 
  | 'projects' 
  | 'music' 
  | 'gallery' 
  | 'blog' 
  | 'downloads' 
  | 'contact' 
  | 'terminal' 
  | 'recycle';

export interface DesktopIcon {
  id: string;
  type: WindowType;
  icon: string;
  label: string;
  position: { x: number; y: number };
}

export type Language = 'en' | 'ar';

export interface Translation {
  [key: string]: string;
}

export interface DragState {
  isDragging: boolean;
  draggedWindow: string | null;
  offset: { x: number; y: number };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'design' | 'creative';
  image: string;
  technologies: string[];
  link?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  thumbnail: string;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isPlaying?: boolean;
}
