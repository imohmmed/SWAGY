import { useLanguage } from '../../hooks/useLanguage';

const downloadItems = [
  {
    id: '1',
    icon: 'https://win98icons.alexmeub.com/icons/png/media_player_stream_sun4.png',
    filename: 'Resume_SWAGY_2024.pdf',
    description: 'My official CV — aka "how I look on paper"',
    size: '2.3 MB',
    date: 'Nov 2024',
    downloadUrl: 'https://cdn.shopify.com/s/files/1/0822/7219/0765/files/IMG_6489.jpg?v=1748692855'
  },
  {
    id: '2',
    icon: 'https://win98icons.alexmeub.com/icons/png/paint_file-2.png',
    filename: 'Brand_Guidelines.pdf',
    description: 'Logos, colors, brand rules — basically the SWAGY style guide.',
    size: '4.2 MB',
    date: 'Sep 2024',
    downloadUrl: 'https://cdn.shopify.com/s/files/1/0822/7219/0765/files/Brand_Guidelines_SWAGY.pdf?v=1748693389'
  }
];

const instructions = [
  'Right-click and "Save As" for smooth downloading',
  'All files are clean and virus-free 🧼',
  'Need a different format? Just hit me up',
  'Updated regularly (because I actually care)'
];

export function DownloadsWindow() {
  const { t } = useLanguage();

  const handleDownload = (item: any) => {
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank');
    }
  };

  return (
    <div className="p-4 h-full overflow-auto scrollbar">
      <div className="text-sm font-bold mb-4">📦 {t('availableDownloads')}</div>
      
      <div className="space-y-3">
        {downloadItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border-2 border-[rgb(var(--win-border-dark))] p-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src={item.icon} 
                  alt={item.filename} 
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{item.filename}</div>
                <div className="text-xs text-gray-600">{item.description}</div>
                <div className="text-xs text-gray-500">
                  Size: {item.size} | Updated: {item.date}
                </div>
              </div>
              <button
                className="win-button px-3 py-1 text-xs"
                onClick={() => handleDownload(item)}
              >
                {t('download')}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-[rgb(var(--win-light-gray))] border-2 border-[rgb(var(--win-border-dark))]">
        <div className="text-xs font-bold mb-2">📋 {t('downloadInstructions')}:</div>
        <ul className="text-xs space-y-1 text-gray-700">
          {instructions.map((instruction, index) => (
            <li key={index}>• {instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
