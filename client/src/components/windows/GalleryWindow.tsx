import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const galleryImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
    alt: 'Profile Photo 1'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
    alt: 'Landscape Photo'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
    alt: 'Mountain View'
  }
];

export function GalleryWindow() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = galleryImages[currentImageIndex];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="p-2 bg-[rgb(var(--win-light-gray))] border-b-2 border-[rgb(var(--win-border-dark))]">
        <div className="flex items-center gap-2 text-xs">
          <button className="win-button px-2 py-1" onClick={goToPrevious}>
            ◀️ {t('previous')}
          </button>
          <button className="win-button px-2 py-1" onClick={goToNext}>
            ▶️ {t('next')}
          </button>
          <span className="mx-2">
            Image {currentImageIndex + 1} of {galleryImages.length}
          </span>
          <button className="win-button px-2 py-1">{t('zoom')}</button>
          <button className="win-button px-2 py-1">{t('slideshow')}</button>
        </div>
      </div>
      
      {/* Main Image Display */}
      <div className="flex-1 p-4 bg-gray-100 flex items-center justify-center">
        <div className="max-w-full max-h-full border-2 border-[rgb(var(--win-border-dark))]">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="h-20 p-2 bg-[rgb(var(--win-light-gray))] border-t-2 border-[rgb(var(--win-border-dark))] overflow-x-auto">
        <div className="flex gap-2 h-full">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`w-16 h-16 border-2 cursor-pointer ${
                index === currentImageIndex
                  ? 'border-blue-600'
                  : 'border-[rgb(var(--win-border-dark))] hover:border-blue-600'
              }`}
              onClick={() => selectImage(index)}
            >
              <img
                src={image.thumbnail}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
