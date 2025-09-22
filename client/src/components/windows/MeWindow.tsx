import { useLanguage } from '../../hooks/useLanguage';
import profileImage from '@assets/3B6EFCC2-C6BC-4D4A-852F-205EA754AD63.jpeg';
import instagramIcon from '@assets/IMG_6441.png';
import whatsappIcon from '@assets/IMG_6442.png';
import telegramIcon from '@assets/IMG_6443.png';

export function MeWindow() {
  const { t } = useLanguage();

  return (
    <div className="p-4 h-full overflow-auto scrollbar">
      <div className="space-y-4">
        <div className="text-center mb-6">
          {/* Profile image */}
          <div className="w-24 h-24 mx-auto mb-1 border-2 border-[rgb(var(--win-border-dark))] bg-white p-1" style={{ boxShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            <img 
              src={profileImage} 
              alt="MoHmmeD Profile" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <h2 className="text-lg font-bold mb-2">{t('swagy')}</h2>
          <p className="text-sm mb-3">{t('engineerModel')}</p>
          
          {/* Social Media Icons */}
          <div className="flex justify-center gap-3 mb-2">
            <a 
              href="https://www.instagram.com/it.swagy?igsh=MW02Z2c1bzBqbG5zdg%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={instagramIcon} alt="Instagram" className="w-6 h-6" draggable={false} />
            </a>
            <a 
              href="https://t.me/mohmmed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={telegramIcon} alt="Telegram" className="w-6 h-6" draggable={false} />
            </a>
            <a 
              href="https://wa.me/+9647766699669" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" draggable={false} />
            </a>
          </div>
        </div>
        
        <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] p-3 text-sm">
          <h3 className="font-bold mb-2">{t('aboutMe')}</h3>
          <div className="mb-2 whitespace-pre-line">
            {t('aboutDescription').split('*').map((part, index) => {
              if (index % 2 === 1) {
                return <strong key={index}>{part}</strong>;
              }
              return part;
            })}
          </div>

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
