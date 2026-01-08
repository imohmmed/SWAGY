import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import moraModaaImage from '@assets/428E9314-85CB-44BA-BEB3-CF8E51606DCB.jpeg';
import pixelSuiteImage from '@assets/E6FA0246-CB67-4C43-B49F-5DC3158A48D9.jpeg';
import crystalGiftImage from '@assets/FEBA9F27-7D4A-48DA-863E-A982DD1C8533.jpeg';
import slsCafeImage from '@assets/0E99AB1D-C087-4E31-B7C2-C8F128BA1884.jpeg';
import altarafLinksImage from '@assets/E4985A71-EE3B-4B5A-9710-74725AFEE3C7.jpeg';
import altarafNetImage from '@assets/altaraf-net-logo.png';
import filmoraTvImage from '@assets/1673C2B9-71D9-4A63-9746-6CA90FAB8EE7.jpeg';
import printday7Image from '@assets/printday7-logo.jpeg';
import printday7WebsiteImage from '@assets/3006175A-6775-46E2-9385-AE938D37F7BE_1751381358892.jpeg';
import alaliPlusImage from '@assets/alaliplus-logo.jpeg';
import candyshopaliImage from '@assets/candyshopali-logo.jpeg';
import swagyLogo from '@assets/IMG_6470_1751373028778.png';
import quranBotImage from '@assets/quran-bot-logo.jpeg';
import botsMakerImage from '@assets/bots-maker-logo.jpeg';
import serviceBotImage from '@assets/service-bot-logo.jpeg';
import customerServiceBotImage from '@assets/customer-service-bot-logo.jpeg';
import addToCloseFriendsBotImage from '@assets/add-to-close-friends-bot-logo.jpeg';
import hrSystemBotImage from '@assets/hr-system-bot-logo.jpeg';
import downloaderBotImage from '@assets/downloader-bot-logo.jpeg';
import instagramIcon from '@assets/IMG_7835_1751388021998.png';
import caravanLogo from '@assets/361705CB-5233-4596-9A94-1D56EECA60D3_1758341736462.jpeg';
import swanDecorationsImage from '@assets/EE78D3F9-BCEA-4AA2-B2B8-DFB6255DA812_1767893193012.jpeg';

type ProjectCategory = 'worked-with' | 'other-websites' | 'telegram-bots';

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  link: string;
  logo?: string;
  instagramLink?: string;
}

const getProjectCategories = (t: (key: string) => string) => [
  { id: 'worked-with', icon: 'https://win98icons.alexmeub.com/icons/png/address_book_users.png', label: t('workedWith') },
  { id: 'other-websites', icon: 'https://win98icons.alexmeub.com/icons/png/msie2-1.png', label: t('liveWebsites') },
  { id: 'telegram-bots', icon: 'https://win98icons.alexmeub.com/icons/png/utopia_smiley.png', label: t('telegramBots') }
];

const getProjects = (t: (key: string) => string) => [
  // Worked With section - Companies I collaborated with
  {
    id: '1',
    title: 'Mora',
    description: t('moraDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: moraModaaImage,
    link: 'https://www.instagram.com/mora.modaa?igsh=MXF5NXU2ZHZzZ3AzOQ==',
    instagramLink: 'https://www.instagram.com/mora.modaa?igsh=MXF5NXU2ZHZzZ3AzOQ=='
  },
  {
    id: '2',
    title: 'SLS',
    description: t('slsDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: slsCafeImage,
    link: 'https://www.instagram.com/sls___brand?igsh=MW01Zmt0ZGpjcDE3Mg==',
    instagramLink: 'https://www.instagram.com/sls___brand?igsh=MW01Zmt0ZGpjcDE3Mg=='
  },
  {
    id: '3',
    title: 'printday7',
    description: t('printday7Desc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: candyshopaliImage,
    link: 'https://www.instagram.com/printday7?igsh=MWgzamFyZ2x1MnptMw==',
    instagramLink: 'https://www.instagram.com/printday7?igsh=MWgzamFyZ2x1MnptMw=='
  },
  {
    id: '4',
    title: 'candyshopali',
    description: t('candyshopaliDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: alaliPlusImage,
    link: 'https://www.instagram.com/candyshopali?igsh=MTExY3RzMDdvMG51aw==',
    instagramLink: 'https://www.instagram.com/candyshopali?igsh=MTExY3RzMDdvMG51aw=='
  },
  {
    id: '5',
    title: 'Alali Plus',
    description: t('alaliPlusDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: printday7Image,
    link: 'https://www.instagram.com/alaliplus?igsh=MWx1MHg5ajRkcXRxbQ==',
    instagramLink: 'https://www.instagram.com/alaliplus?igsh=MWx1MHg5ajRkcXRxbQ=='
  },
  {
    id: '6',
    title: 'crystal4gift',
    description: t('crystal4giftDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: crystalGiftImage,
    link: 'https://www.instagram.com/crystal4gifts?igsh=MTFjYjYwaXpza3Zkbw==',
    instagramLink: 'https://www.instagram.com/crystal4gifts?igsh=MTFjYjYwaXpza3Zkbw=='
  },
  {
    id: '7',
    title: 'Al Taraf',
    description: t('altarafDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: altarafLinksImage,
    link: 'https://www.instagram.com/altaraf_company?igsh=dG85aGw0cGxmZmJ0',
    instagramLink: 'https://www.instagram.com/altaraf_company?igsh=dG85aGw0cGxmZmJ0'
  },
  {
    id: '8',
    title: 'CARAVAN',
    description: t('caravanDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: caravanLogo,
    link: 'https://www.instagram.com/caravan.iq',
    instagramLink: 'https://www.instagram.com/caravan.iq'
  },
  {
    id: '9',
    title: 'Pixel Suite',
    description: t('pixelSuiteDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: pixelSuiteImage,
    link: 'https://www.instagram.com/pixelsuit3?igsh=MXdsb3BzYjdxenp3Yw==',
    instagramLink: 'https://www.instagram.com/pixelsuit3?igsh=MXdsb3BzYjdxenp3Yw=='
  },
  {
    id: '22',
    title: 'Swan Decorations',
    description: t('swanDecorationsDesc'),
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: swanDecorationsImage,
    link: 'https://www.instagram.com/swan.dec.iq?igsh=amtmMTdwZDVoeXB3',
    instagramLink: 'https://www.instagram.com/swan.dec.iq?igsh=amtmMTdwZDVoeXB3'
  },
  
  // Other Websites section - Full projects with descriptions
  {
    id: '10',
    title: 'Mora Modaa',
    description: t('moraModaaFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'Liquid', 'CSS'],
    image: moraModaaImage,
    link: 'https://mora1.com/'
  },
  {
    id: '12',
    title: 'Printday7',
    description: t('printday7FullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'E-commerce', 'Food & Beverage'],
    image: printday7WebsiteImage,
    link: 'https://printday7.com/'
  },
  {
    id: '13',
    title: 'Pixel Suite',
    description: t('pixelSuiteFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'JavaScript', 'Dark Theme'],
    image: pixelSuiteImage,
    link: 'https://pixelsuite.vip/'
  },
  {
    id: '14',
    title: 'Crystal for Gift',
    description: t('crystal4giftFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'Arabic RTL', 'Luxury UI'],
    image: crystalGiftImage,
    link: 'https://crystal4gifts.com/'
  },
  {
    id: '15',
    title: 'Altaraf.net',
    description: t('altarafNetFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Travel', 'Custom Design', 'Branding'],
    image: altarafNetImage,
    link: 'https://altaraf.net'
  },
  {
    id: '16',
    title: 'Altaraf Links',
    description: t('altarafLinksFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Link Hub', 'Travel', 'Clean Design'],
    image: altarafLinksImage,
    link: 'https://altaraf.link'
  },
  {
    id: '17',
    title: 'Filmora TV',
    description: t('filmoraTvFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Streaming', 'Video Platform', 'Entertainment'],
    image: filmoraTvImage,
    link: 'https://filmora.tv'
  },
  {
    id: '21',
    title: 'Swan Decoration',
    description: t('swanDecorationFullDesc'),
    category: 'other-websites' as ProjectCategory,
    technologies: ['Event Design', 'Luxury Decor', 'Custom Website'],
    image: swanDecorationsImage,
    link: 'https://swandeciq.com'
  },

  // Telegram Bots section
  {
    id: '24',
    title: 'Downloader Bot',
    description: t('downloaderBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Media Downloader', 'Multi-platform Support', 'File Processing'],
    image: downloaderBotImage,
    link: 'https://t.me/Biobot'
  },
  {
    id: '18',
    title: 'Quran Bot',
    description: t('quranBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Telegram Bot API', 'Prayer Times', 'Quran API'],
    image: botsMakerImage,
    logo: botsMakerImage,
    link: 'https://t.me/QEGbot'
  },
  {
    id: '19',
    title: 'Bots Maker Bot',
    description: t('botsMakerBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Bot Creation', 'Telegram API', 'Automation'],
    image: quranBotImage,
    logo: quranBotImage,
    link: 'https://t.me/slsbot'
  },
  {
    id: '20',
    title: 'Service Bot',
    description: t('serviceBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Social Media Services', 'Payment Integration', 'Order Management'],
    image: serviceBotImage,
    link: 'https://t.me/wowbot'
  },
  {
    id: '21',
    title: 'Customer Service Bot',
    description: t('customerServiceBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Customer Support', 'FAQ System', 'Job Applications'],
    image: addToCloseFriendsBotImage,
    logo: addToCloseFriendsBotImage,
    link: 'https://t.me/Mora0Bot'
  },
  {
    id: '22',
    title: 'Add to Close Friends Bot',
    description: t('addToCloseFriendsBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Instagram API', 'Automation', 'Social Media Management'],
    image: hrSystemBotImage,
    logo: hrSystemBotImage,
    link: 'https://t.me/mohmmed'
  },
  {
    id: '23',
    title: 'HR System Bot',
    description: t('hrSystemBotDesc'),
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['HR Management', 'Time Tracking', 'Payroll System'],
    image: customerServiceBotImage,
    logo: customerServiceBotImage,
    link: 'https://t.me/mohmmed'
  },

];

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  link: string;
  logo?: string;
}

export function ProjectsWindow() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projectCategories = getProjectCategories(t);
  const sampleProjects = getProjects(t);

  const filteredProjects = selectedCategory
    ? sampleProjects.filter(p => p.category === selectedCategory)
    : sampleProjects;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/3 border-r-2 border-[rgb(var(--win-border-dark))] p-2 bg-[rgb(var(--win-light-gray))]">
        <div className="text-xs font-bold mb-2 flex items-center gap-1">
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png" alt="" className="w-4 h-4" draggable={false} />
          {t('projectCategories') || 'Project Categories'}
        </div>
        <div className="space-y-1 text-xs">
          {projectCategories.map((category) => (
            <div
              key={category.id}
              className={`p-1 hover:bg-blue-600 hover:text-white cursor-pointer flex items-center gap-2 ${
                selectedCategory === category.id ? 'bg-blue-600 text-white' : ''
              }`}
              onClick={() => setSelectedCategory(category.id as ProjectCategory)}
            >
              <img src={category.icon} alt="" className="w-4 h-4" draggable={false} />
              {category.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto scrollbar">
        {selectedCategory ? (
          <div>
            <h3 className="font-bold mb-4">
              {selectedCategory === 'worked-with' ? 'Companies I Worked With' : `${projectCategories.find(c => c.id === selectedCategory)?.label} Projects`}
            </h3>
            {selectedCategory === 'worked-with' ? (
              // Worked With - Simple grid layout with logos and Instagram button
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border-2 border-[rgb(var(--win-border-dark))] p-3 hover:bg-[rgb(var(--win-light-gray))]"
                  >
                    <div
                      className="w-full bg-gray-300 mb-2"
                      style={{
                        aspectRatio: '16/9',
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="text-xs font-bold text-left mb-2">{t(project.title) || project.title}</div>
                    {project.instagramLink && (
                      <button
                        className="win-button px-2 py-1 text-xs flex items-center gap-1"
                        onClick={() => window.open(project.instagramLink, '_blank')}
                        title="Visit Instagram"
                      >
                        <img 
                          src={instagramIcon} 
                          alt="Instagram" 
                          className="w-3 h-3" 
                          draggable={false}
                        />
                        {t('instagram')}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Other categories - Full project layout
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border-2 border-[rgb(var(--win-border-dark))] p-3 hover:bg-[rgb(var(--win-light-gray))]"
                  >
                    <div
                      className="w-full bg-gray-300 mb-2"
                      style={{
                        aspectRatio: '16/9',
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="text-xs font-bold">{t(project.title) || project.title}</div>
                    <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {(() => {
                        const translatedDesc = t(project.description) || project.description;
                        return translatedDesc.length > 100 ? translatedDesc.substring(0, 100) + '...' : translatedDesc;
                      })()}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{project.technologies.join(', ')}</div>
                    <div className="flex gap-2">
                      {project.description && (
                        <button
                          className="win-button px-2 py-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project as Project);
                          }}
                        >
                          {t('readMore')}
                        </button>
                      )}
                      {project.link && (
                        <button
                          className="win-button px-2 py-1 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.link, '_blank');
                          }}
                        >
                          {selectedCategory === 'telegram-bots' ? t('openBot') || 'Open Bot' : t('visitWebsite')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-bold mb-4">{t('selectCategory')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleProjects.map((project) => (
                <div
                  key={project.id}
                  className="border-2 border-[rgb(var(--win-border-dark))] p-3 hover:bg-[rgb(var(--win-light-gray))] cursor-pointer"
                >
                  <div
                    className="w-full bg-gray-300 mb-2"
                    style={{
                      aspectRatio: '16/9',
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="text-xs font-bold">{project.title}</div>
                  <div className="text-xs text-gray-600">{project.technologies.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Windows 98 Style Modal for project details */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
          <div 
            className="win-window w-full max-w-md" 
            style={{ height: 'fit-content', maxHeight: '90vh', overflow: 'visible' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Windows 98 Title Bar */}
            <div className="win-titlebar">
              <div className="flex items-center gap-1">
                <img 
                  src={selectedProject.logo || selectedProject.image}
                  alt="" 
                  className="w-4 h-4 object-cover" 
                  draggable={false}
                />
                <span className="text-[11px] truncate">{t(selectedProject.title) || selectedProject.title} - {t('details') || 'Details'}</span>
              </div>
              <div className="flex gap-1">
                <button
                  className="w-4 h-4 bg-[rgb(var(--win-gray))] border border-[rgb(var(--win-border-light))] border-r-[rgb(var(--win-border-dark))] border-b-[rgb(var(--win-border-dark))] flex items-center justify-center text-black text-xs hover:bg-[rgb(var(--win-light-gray))] leading-none"
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="bg-[rgb(var(--win-gray))] p-2">
              <div
                className="w-full bg-gray-300 border-2 border-[rgb(var(--win-border-dark))] border-r-[rgb(var(--win-border-light))] border-b-[rgb(var(--win-border-light))] mb-2"
                style={{
                  aspectRatio: '16/9',
                  backgroundImage: `url(${selectedProject.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="text-sm whitespace-pre-line leading-snug mb-2">
                {t(selectedProject.description) || selectedProject.description}
              </div>
              
              {selectedProject.technologies.length > 0 && (
                <div className="text-xs text-gray-600 p-1 bg-[rgb(var(--win-light-gray))] border border-[rgb(var(--win-border-dark))] border-r-[rgb(var(--win-border-light))] border-b-[rgb(var(--win-border-light))] mb-2">
                  <strong>Technologies:</strong> {selectedProject.technologies.join(', ')}
                </div>
              )}
              
              {/* Bottom Buttons */}
              <div className="flex gap-2 justify-center">
                <button
                  className="win-button px-3 py-1 text-xs"
                  onClick={() => setSelectedProject(null)}
                >
                  {t('close')}
                </button>
                {selectedProject.link && (
                  <button
                    className="win-button px-3 py-1 text-xs font-bold"
                    onClick={() => {
                      window.open(selectedProject.link, '_blank');
                      setSelectedProject(null);
                    }}
                  >
                    {selectedProject.category === 'telegram-bots' ? t('openBot') : t('visitWebsite')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
