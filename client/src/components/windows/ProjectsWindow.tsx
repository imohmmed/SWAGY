import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

type ProjectCategory = 'shopping' | 'other-websites' | 'telegram-bots';

const projectCategories = [
  { id: 'shopping', icon: 'https://win98icons.alexmeub.com/icons/png/address_book_users.png', label: 'Shopping Websites' },
  { id: 'other-websites', icon: 'https://win98icons.alexmeub.com/icons/png/msie2-1.png', label: 'Other Websites' },
  { id: 'telegram-bots', icon: 'https://win98icons.alexmeub.com/icons/png/utopia_smiley.png', label: 'Telegram Bots' }
];

const sampleProjects = [
  {
    id: '1',
    title: 'Online Store Platform',
    description: 'Complete e-commerce solution with cart and payment',
    category: 'shopping' as ProjectCategory,
    technologies: ['React', 'Node.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200'
  },
  {
    id: '2',
    title: 'Fashion Boutique',
    description: 'Elegant online fashion store',
    category: 'shopping' as ProjectCategory,
    technologies: ['Vue.js', 'PHP', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Personal showcase website',
    category: 'other-websites' as ProjectCategory,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200'
  },
  {
    id: '4',
    title: 'Business Landing Page',
    description: 'Corporate website with modern design',
    category: 'other-websites' as ProjectCategory,
    technologies: ['React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200'
  },
  {
    id: '5',
    title: 'Customer Support Bot',
    description: 'Automated customer service assistant',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Python', 'Telegram API'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200'
  },
  {
    id: '6',
    title: 'News Aggregator Bot',
    description: 'Daily news updates and summaries',
    category: 'telegram-bots' as ProjectCategory,
    technologies: ['Node.js', 'Telegram Bot API'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200'
  }
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
                  <div className="text-xs text-gray-600 mb-1">{project.description}</div>
                  <div className="text-xs text-gray-500">{project.technologies.join(', ')}</div>
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
