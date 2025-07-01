import { useLanguage } from '../../hooks/useLanguage';
import profileImage from '@assets/profile-picture.png';

export function MeWindow() {
  const { t } = useLanguage();

  return (
    <div className="p-4 h-full overflow-auto scrollbar">
      <div className="space-y-4">
        <div className="text-center mb-6">
          {/* Profile image */}
          <div className="w-24 h-24 mx-auto mb-4 border-2 border-[rgb(var(--win-border-dark))] bg-white p-1" style={{ boxShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            <img 
              src={profileImage} 
              alt="SWAGY Profile" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
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
            <div className="flex items-center gap-1">
              <img src="https://win98icons.alexmeub.com/icons/png/filepack-1.png" alt="" className="w-4 h-4" draggable={false} />
              {t('projects')}
            </div>
            <div className="flex items-center gap-1">
              <img src="https://win98icons.alexmeub.com/icons/png/chm-1.png" alt="" className="w-4 h-4" draggable={false} />
              {t('experience')}
            </div>
            <div className="flex items-center gap-1">
              <img src="https://win98icons.alexmeub.com/icons/png/media_player_stream_sun4.png" alt="" className="w-4 h-4" draggable={false} />
              {t('ideas')}
            </div>
            <div className="flex items-center gap-1">
              <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png" alt="" className="w-4 h-4" draggable={false} />
              {t('music')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
