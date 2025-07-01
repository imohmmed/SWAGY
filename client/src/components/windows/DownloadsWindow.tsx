import { useLanguage } from '../../hooks/useLanguage';

const getDownloadItems = (t: (key: string) => string) => [
  {
    id: '1',
    icon: 'https://win98icons.alexmeub.com/icons/png/media_player_stream_sun4.png',
    filename: t('resumeTitle'),
    title: t('resumeTitle'),
    description: t('resumeDesc'),
    size: t('resumeSize'),
    downloadUrl: 'https://f.top4top.io/p_3469acl2b0.jpeg'
  },
  {
    id: '2',
    icon: 'https://win98icons.alexmeub.com/icons/png/paint_file-2.png',
    filename: t('brandTitle'),
    title: t('brandTitle'),
    description: t('brandGuidelinesDesc'),
    size: t('brandSize'),
    downloadUrl: 'https://cdn.shopify.com/s/files/1/0822/7219/0765/files/Brand_Guidelines_SWAGY.pdf?v=1748693389'
  }
];

const getInstructions = (t: (key: string) => string) => [
  t('rightClickSave'),
  t('filesClean'),
  t('differentFormat'),
  t('updatedRegularly')
];

export function DownloadsWindow() {
  const { t } = useLanguage();
  
  const downloadItems = getDownloadItems(t);
  const instructions = getInstructions(t);

  const handleDownload = async (item: any) => {
    if (item.downloadUrl) {
      try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = item.downloadUrl;
        link.download = item.filename; // Use the filename for download
        link.target = '_blank';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        // Fallback to opening in new tab
        window.open(item.downloadUrl, '_blank');
      }
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
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-xs text-gray-600">{item.description}</div>
                <div className="text-xs text-gray-500">
                  {item.size}
                </div>
              </div>
              <button
                className="win-button px-3 py-1 text-xs"
                onClick={() => handleDownload(item)}
              >
                {t('downloadNow')}
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
