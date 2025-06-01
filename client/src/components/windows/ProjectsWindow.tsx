import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import moraModaaImage from '@assets/428E9314-85CB-44BA-BEB3-CF8E51606DCB.jpeg';
import pixelSuiteImage from '@assets/E6FA0246-CB67-4C43-B49F-5DC3158A48D9.jpeg';
import crystalGiftImage from '@assets/FEBA9F27-7D4A-48DA-863E-A982DD1C8533.jpeg';
import slsCafeImage from '@assets/0E99AB1D-C087-4E31-B7C2-C8F128BA1884.jpeg';
import altarafLinksImage from '@assets/E4985A71-EE3B-4B5A-9710-74725AFEE3C7.jpeg';
import filmoraTvImage from '@assets/1673C2B9-71D9-4A63-9746-6CA90FAB8EE7.jpeg';

type ProjectCategory = 'shopping' | 'other-websites' | 'telegram-bots';

const projectCategories = [
  { id: 'shopping', icon: 'https://win98icons.alexmeub.com/icons/png/address_book_users.png', label: 'Shopping Websites' },
  { id: 'other-websites', icon: 'https://win98icons.alexmeub.com/icons/png/msie2-1.png', label: 'Other Websites' },
  { id: 'telegram-bots', icon: 'https://win98icons.alexmeub.com/icons/png/utopia_smiley.png', label: 'Telegram Bots' }
];

const sampleProjects = [
  {
    id: '1',
    title: 'Mora Modaa',
    description: 'Fashion? Check. Vibes? Double check. A sleek Shopify store that feels like your closet before Eid — clean, scrollable, and packed with trendy fits.',
    category: 'shopping' as ProjectCategory,
    technologies: ['Shopify', 'Liquid', 'CSS'],
    image: moraModaaImage,
    link: 'https://mora1.com/'
  },
  {
    id: '2',
    title: 'SLS Cafe',
    description: 'Not just a coffee shop — it\'s a whole mood ☕\nBuilt to feel like your second home (but with better lighting). Clean layout, cozy colors, and the kind of website that makes you want to order a latte at 2AM.',
    category: 'shopping' as ProjectCategory,
    technologies: ['Shopify', 'E-commerce', 'Food & Beverage'],
    image: slsCafeImage,
    link: 'https://slscafe.com/'
  },
  {
    id: '3',
    title: 'Pixel Suite',
    description: 'A digital loot cave for gamers — skins, bundles, and that "add to cart" itch. Dark theme, clean layout, and yeah… built on Shopify because we like life easy.',
    category: 'shopping' as ProjectCategory,
    technologies: ['Shopify', 'JavaScript', 'Dark Theme'],
    image: pixelSuiteImage,
    link: 'https://pixelsuite.vip/'
  },
  {
    id: '4',
    title: 'Crystal for Gift',
    description: 'Gifts that scream "I tried" — with class. A fancy-looking Shopify store serving luxury product vibes and a full Arabic experience. For when flowers just aren\'t enough.',
    category: 'shopping' as ProjectCategory,
    technologies: ['Shopify', 'Arabic RTL', 'Luxury UI'],
    image: crystalGiftImage,
    link: 'https://crystal4gifts.com/'
  },
  {
    id: '5',
    title: 'Altaraf.net',
    description: 'A travel company I co-created that makes vacations feel like music videos. Clean branding, custom website, and golden vibes all the way.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Travel', 'Custom Design', 'Branding'],
    image: altarafLinksImage,
    link: 'https://altaraf.net'
  },
  {
    id: '6',
    title: 'Altaraf Links',
    description: 'All the links, none of the drama 🔗\nSimple, clean, and straight to the point — a stylish link hub for Al-Taraf Travel. Think of it like a digital business card, but with ✈️ vibes.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Link Hub', 'Travel', 'Clean Design'],
    image: altarafLinksImage,
    link: 'https://altaraf.link'
  },
  {
    id: '7',
    title: 'Filmora TV',
    description: 'Like Netflix, but with more attitude 🎬\nA streaming platform with personality and style.',
    category: 'other-websites' as ProjectCategory,
    technologies: ['Streaming', 'Video Platform', 'Entertainment'],
    image: filmoraTvImage,
    link: 'https://filmora.tv'
  },

];

export function ProjectsWindow() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);

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
              {projectCategories.find(c => c.id === selectedCategory)?.label} Projects
            </h3>
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
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="text-xs font-bold">{project.title}</div>
                  <div className="text-xs text-gray-600 mb-1">{project.description}</div>
                  <div className="text-xs text-gray-500 mb-1">{project.technologies.join(', ')}</div>
                  {project.link && (
                    <div className="text-xs text-blue-600 hover:underline">
                      Visit Website →
                    </div>
                  )}
                </div>
              ))}
            </div>
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
                    className="w-full h-20 bg-gray-300 mb-2"
                    style={{
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
    </div>
  );
}
