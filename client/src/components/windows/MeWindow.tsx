import { useLanguage } from '../../hooks/useLanguage';

export function MeWindow() {
  const { t } = useLanguage();

  return (
    <div className="p-4 h-full overflow-auto scrollbar">
      <div className="space-y-4">
        <div className="text-center mb-6">
          {/* Profile image */}
          <div
            className="w-24 h-24 mx-auto mb-4 border-2 border-[rgb(var(--win-border-dark))]"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <h2 className="text-lg font-bold mb-2">SWAGY</h2>
          <p className="text-sm">Creative Developer & Designer</p>
        </div>
        
        <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] p-3 text-sm">
          <h3 className="font-bold mb-2">{t('aboutMe')}</h3>
          <p className="mb-2">{t('aboutDescription')}</p>
          <p className="mb-2">{t('specializedIn')}</p>
          <ul className="list-disc ml-4 mb-2">
            <li>{t('webDev')}</li>
            <li>{t('uiuxDesign')}</li>
            <li>{t('creativeCoding')}</li>
            <li>{t('retroComputing')}</li>
          </ul>
          <p>{t('currentlyBuilding')}</p>
        </div>
        
        <div className="bg-[rgb(var(--win-light-gray))] border-2 border-[rgb(var(--win-border-dark))] p-3">
          <h3 className="font-bold mb-2">{t('quickStats')}</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>🚀 {t('projects')}</div>
            <div>⭐ {t('experience')}</div>
            <div>💡 {t('ideas')}</div>
            <div>☕ {t('coffee')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
