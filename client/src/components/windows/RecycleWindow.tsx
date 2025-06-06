import { useLanguage } from '../../hooks/useLanguage';

export function RecycleWindow() {
  const { t } = useLanguage();

  const handleEmptyBin = () => {
    alert('Recycle Bin is already empty!');
  };

  const handleProperties = () => {
    alert('Recycle Bin Properties:\nLocation: Desktop\nSize: 0 bytes\nContains: 0 files');
  };

  return (
    <div className="p-4 h-full text-center overflow-auto scrollbar">
      <div className="mb-4">
        <img 
          src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" 
          alt="Recycle Bin" 
          className="w-16 h-16 mx-auto mb-2"
          draggable={false}
        />
      </div>
      <div className="text-lg font-bold mb-4">{t('recycleTitle')}</div>
      
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] p-4 text-sm">
        <div className="mb-4">
          <div className="font-bold mb-2">{t('recycleStatus')}</div>
          <div>{t('recycleEmpty')}</div>
        </div>
        
        <div className="text-xs text-gray-600 italic mb-4">
          {t('recycleQuote')}
        </div>
        
        <div className="space-y-2">
          <button
            className="win-button px-4 py-2 text-xs w-full"
            onClick={handleEmptyBin}
          >
            {t('emptyBin')}
          </button>
          <button
            className="win-button px-4 py-2 text-xs w-full"
            onClick={handleProperties}
          >
            {t('properties')}
          </button>
        </div>
      </div>
    </div>
  );
}
