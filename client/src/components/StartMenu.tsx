import { useLanguage } from '../hooks/useLanguage';
import { WindowType } from '../types';

interface StartMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onMenuAction: (action: string) => void;
}

export function StartMenu({ isVisible, onClose, onMenuAction }: StartMenuProps) {
  const { t } = useLanguage();

  if (!isVisible) return null;

  const handleItemClick = (action: string) => {
    onMenuAction(action);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div
        className="fixed bottom-7 left-0 w-64 bg-[rgb(var(--win-gray))] border-2 border-[rgb(var(--win-border-light))] z-50"
        style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[rgb(var(--win-blue))] to-blue-600 text-white p-2 text-sm font-bold">
          <div>SWAGY</div>
          <div className="text-xs opacity-80">Windows 98</div>
        </div>
        
        {/* Menu Items */}
        <div className="p-1">
          <div
            className="px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs flex items-center gap-2"
            onClick={() => handleItemClick('my-computer')}
          >
            📁 {t('myComputer')}
          </div>
          <div
            className="px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs flex items-center gap-2"
            onClick={() => handleItemClick('run')}
          >
            ▶️ {t('run')}
          </div>
          <div
            className="px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs flex items-center gap-2"
            onClick={() => handleItemClick('settings')}
          >
            ⚙️ {t('settings')}
          </div>
          <hr className="my-1 border-[rgb(var(--win-border-dark))]" />
          <div
            className="px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs flex items-center gap-2"
            onClick={() => handleItemClick('shutdown')}
          >
            🔌 {t('shutdown')}
          </div>
        </div>
      </div>
    </>
  );
}
