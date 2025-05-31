import { useLanguage } from '../../hooks/useLanguage';

const downloadItems = [
  {
    id: '1',
    icon: '📄',
    filename: 'Resume_SWAGY_2024.pdf',
    description: 'resumeDesc',
    size: '2.3 MB',
    date: 'Nov 2024'
  },
  {
    id: '2',
    icon: '🗜️',
    filename: 'Project_Assets.zip',
    description: 'assetsDesc',
    size: '15.7 MB',
    date: 'Oct 2024'
  },
  {
    id: '3',
    icon: '📊',
    filename: 'Portfolio_Presentation.pptx',
    description: 'presentationDesc',
    size: '8.9 MB',
    date: 'Nov 2024'
  },
  {
    id: '4',
    icon: '🎨',
    filename: 'Brand_Guidelines.pdf',
    description: 'brandDesc',
    size: '4.2 MB',
    date: 'Sep 2024'
  }
];

const instructions = [
  'Right-click and "Save As" for best results',
  'All files are virus-scanned and safe',
  'Contact me if you need different formats',
  'Files are updated regularly'
];

export function DownloadsWindow() {
  const { t } = useLanguage();

  const handleDownload = (filename: string) => {
    // In a real app, this would trigger the actual download
    alert(`Downloading ${filename}...`);
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
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-sm">{item.filename}</div>
                <div className="text-xs text-gray-600">{t(item.description)}</div>
                <div className="text-xs text-gray-500">
                  Size: {item.size} | Updated: {item.date}
                </div>
              </div>
              <button
                className="win-button px-3 py-1 text-xs"
                onClick={() => handleDownload(item.filename)}
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
