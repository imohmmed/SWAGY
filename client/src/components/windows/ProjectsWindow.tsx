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

type ProjectCategory = 'worked-with' | 'other-websites' | 'telegram-bots';

const projectCategories = [
  { id: 'worked-with', icon: 'https://win98icons.alexmeub.com/icons/png/address_book_users.png', label: 'Worked With' },
  { id: 'other-websites', icon: 'https://win98icons.alexmeub.com/icons/png/msie2-1.png', label: 'Live Websites' },
  { id: 'telegram-bots', icon: 'https://win98icons.alexmeub.com/icons/png/utopia_smiley.png', label: 'Telegram Bots' }
];

const sampleProjects = [
  // Worked With section - Companies I collaborated with
  {
    id: '1',
    title: 'Mora',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: moraModaaImage,
    link: 'https://www.instagram.com/mora.modaa?igsh=MXF5NXU2ZHZzZ3AzOQ=='
  },
  {
    id: '2',
    title: 'SLS',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: slsCafeImage,
    link: 'https://www.instagram.com/sls___brand?igsh=MW01Zmt0ZGpjcDE3Mg=='
  },
  {
    id: '3',
    title: 'Pixel Suite',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: pixelSuiteImage,
    link: 'https://www.instagram.com/pixelsuit3?igsh=MXdsb3BzYjdxenp3Yw=='
  },
  {
    id: '4',
    title: 'printday7',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: candyshopaliImage,
    link: 'https://www.instagram.com/printday7?igsh=MWgzamFyZ2x1MnptMw=='
  },
  {
    id: '5',
    title: 'Alali Plus',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: printday7Image,
    link: 'https://www.instagram.com/alaliplus?igsh=MWx1MHg5ajRkcXRxbQ=='
  },
  {
    id: '6',
    title: 'crystal4gift',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: crystalGiftImage,
    link: 'https://www.instagram.com/crystal4gifts?igsh=MTFjYjYwaXpza3Zkbw=='
  },
  {
    id: '7',
    title: 'candyshopali',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: alaliPlusImage,
    link: 'https://www.instagram.com/candyshopali?igsh=MTExY3RzMDdvMG51aw=='
  },
  {
    id: '8',
    title: 'Al Taraf',
    description: '',
    category: 'worked-with' as ProjectCategory,
    technologies: [],
    image: altarafNetImage,
    link: 'https://www.instagram.com/altaraf_company?igsh=dG85aGw0cGxmZmJ0'
  },
  
  // Other Websites section - Full projects with descriptions
  {
    id: '9',
    title: 'Mora Modaa',
    description: 'Fashion? Check. Vibes? Double check. A sleek Shopify store that feels like your closet before Eid — clean, scrollable, and packed with trendy fits.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'Liquid', 'CSS'],
    image: moraModaaImage,
    link: 'https://mora1.com/'
  },
  {
    id: '10',
    title: 'Printday7',
    description: 'Helped PrintDay7 with backend and frontend improvements — solved technical issues, improved performance, and customized features to make the platform run smoother for users.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'E-commerce', 'Food & Beverage'],
    image: printday7WebsiteImage,
    link: 'https://printday7.com/'
  },
  {
    id: '11',
    title: 'Pixel Suite',
    description: 'A digital loot cave for gamers — skins, bundles, and that "add to cart" itch. Dark theme, clean layout, and yeah… built on Shopify because we like life easy.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'JavaScript', 'Dark Theme'],
    image: pixelSuiteImage,
    link: 'https://pixelsuite.vip/'
  },
  {
    id: '12',
    title: 'Crystal for Gift',
    description: 'Gifts that scream "I tried" — with class. A fancy-looking Shopify store serving luxury product vibes and a full Arabic experience. For when flowers just aren\'t enough.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Shopify', 'Arabic RTL', 'Luxury UI'],
    image: crystalGiftImage,
    link: 'https://crystal4gifts.com/'
  },
  {
    id: '13',
    title: 'Altaraf.net',
    description: 'A travel company I co-created that makes vacations feel like music videos. Clean branding, custom website, and golden vibes all the way.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Travel', 'Custom Design', 'Branding'],
    image: altarafNetImage,
    link: 'https://altaraf.net'
  },
  {
    id: '14',
    title: 'Altaraf Links',
    description: 'All the links, none of the drama 🔗\nSimple, clean, and straight to the point — a stylish link hub for Al-Taraf Travel. Think of it like a digital business card, but with ✈️ vibes.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Link Hub', 'Travel', 'Clean Design'],
    image: altarafLinksImage,
    link: 'https://altaraf.link'
  },
  {
    id: '15',
    title: 'Filmora TV',
    description: 'Like Netflix, but with more attitude 🎬\nA streaming platform with personality and style.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Streaming', 'Video Platform', 'Entertainment'],
    image: filmoraTvImage,
    link: 'https://filmora.tv'
  },

  // Telegram Bots section
  {
    id: '16',
    title: 'Quran Bot',
    description: '1. Set your country – Get accurate prayer times based on your location.\n2. Daily prayer times – From Fajr to Isha, always on time.\n3. Azkar & Hadiths – Auto reminders to keep your heart fresh.\n4. Quran access – Read it. Listen to it. Anytime.\n5. Random Ayahs – Spiritual surprises, daily.\n6. Low effort, high reward – You chill, bot does the rest.',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Telegram Bot API', 'Prayer Times', 'Quran API'],
    image: botsMakerImage,
    logo: botsMakerImage,
    link: 'https://t.me/QEGbot'
  },
  {
    id: '17',
    title: 'Bots Maker Bot',
    description: '1. Choose a bot type – Downloader, translator, whatever you need.\n2. Add your token – That\'s it, your bot is live!\n3. Full control – Your name, your bot, your rules.\n4. Broadcast ready – Send messages to your users anytime.\n5. No code needed – Just click and create.\nMake bots like a boss.',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Bot Creation', 'Telegram API', 'Automation'],
    image: quranBotImage,
    logo: quranBotImage,
    link: 'https://t.me/slsbot'
  },
  {
    id: '18',
    title: 'Service Bot',
    description: '1. All-in-one services – Need social media stuff? It\'s all here.\n2. Easy orders – Just pick a service and boom, you\'re done.\n3. Track everything – Orders, prices, account info – all in one place.\n4. Smooth payments – Supports AsiaCell and other methods.',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Social Media Services', 'Payment Integration', 'Order Management'],
    image: serviceBotImage,
    link: 'https://t.me/wowbot'
  },
  {
    id: '19',
    title: 'Customer Service Bot',
    description: '1. Welcome Message – Instantly greets users and guides them clearly.\n2. Job Applications – Allows users to apply for available job positions.\n3. FAQs Support – Quick answers to common questions like delivery, return, payment, etc.\n4. Live Help Option – If the bot doesn\'t solve it, customers can write directly and get a reply ASAP.\n5. Service Menu',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Customer Support', 'FAQ System', 'Job Applications'],
    image: addToCloseFriendsBotImage,
    logo: addToCloseFriendsBotImage,
    link: 'https://t.me/Mora0Bot'
  },
  {
    id: '20',
    title: 'Add to Close Friends Bot',
    description: '1. Main Function – Automatically adds all Instagram followers of a specific account to its Close Friends list.\n2. Who it\'s for – Perfect for creators, private sellers, or anyone who wants to post exclusive stories to all followers.\n3. Automation – No need to add users manually — the bot handles it for you in real time.',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Instagram API', 'Automation', 'Social Media Management'],
    image: hrSystemBotImage,
    logo: hrSystemBotImage,
    link: 'https://t.me/mohmmed'
  },
  {
    id: '21',
    title: 'HR System Bot',
    description: '1. Clock-in/out system – Tracks working hours like a digital fingerprint.\n2. Auto salary calculation – Daily + overtime pay done automatically.\n3. Role management – Add employees & managers with custom access.\n4. Department stats – See how many staff per section (online, store, etc.).\n5. Work reports – View full logs of hours and wages.',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['HR Management', 'Time Tracking', 'Payroll System'],
    image: customerServiceBotImage,
    logo: customerServiceBotImage,
    link: 'https://t.me/mohmmed'
  },
  {
    id: '22',
    title: 'Downloader Bot',
    description: '1. All-in-one downloader – Just send any media link.\n2. Supported sites – YouTube, Instagram, TikTok, Twitter, Facebook, Threads, Pinterest, SoundCloud, Spotify, Deezer, Google Drive, Snapchat, Likee, Kwai.\n3. Instant results – No waiting, just media.\n4. No limits – Download videos, music, reels & more.',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Media Downloader', 'Multi-platform Support', 'File Processing'],
    image: downloaderBotImage,
    link: 'https://t.me/Biobot'
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

  const filteredProjects = selectedCategory
    ? sampleProjects.filter(p => p.category === selectedCategory)
    : sampleProjects;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/3 border-r-2 border-[rgb(var(--win-border-dark))] p-2 bg-[rgb(var(--win-light-gray))]">
        <div className="text-xs font-bold mb-2 flex items-center gap-1">
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_cool-5.png" alt="" className="w-4 h-4" draggable={false} />
          Project Categories
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
              // Worked With - Simple grid layout with logos only
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border-2 border-[rgb(var(--win-border-dark))] p-3 hover:bg-[rgb(var(--win-light-gray))] cursor-pointer"
                    onClick={() => project.link && window.open(project.link, '_blank')}
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
                    <div className="text-xs font-bold text-left">{project.title}</div>
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
                    <div className="text-xs font-bold">{project.title}</div>
                    <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
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
                          Read More
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
                          {selectedCategory === 'telegram-bots' ? 'Open Bot' : 'Visit Website'}
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
            <h3 className="font-bold mb-4">Select a category to view projects</h3>
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
                <span className="text-[11px] truncate">{selectedProject.title} - Details</span>
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
                {selectedProject.description}
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
                  Close
                </button>
                {selectedProject.link && (
                  <button
                    className="win-button px-3 py-1 text-xs font-bold"
                    onClick={() => {
                      window.open(selectedProject.link, '_blank');
                      setSelectedProject(null);
                    }}
                  >
                    {selectedProject.category === 'telegram-bots' ? 'Open Bot' : 'Visit Website'}
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
