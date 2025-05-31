import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

type ProjectCategory = 'web' | 'mobile' | 'design' | 'creative';

const projectCategories = [
  { id: 'web', icon: '🌐', label: 'Web Applications' },
  { id: 'mobile', icon: '📱', label: 'Mobile Apps' },
  { id: 'design', icon: '🎨', label: 'UI/UX Design' },
  { id: 'creative', icon: '✨', label: 'Creative Projects' }
];

const sampleProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Modern online shopping experience',
    category: 'web' as ProjectCategory,
    technologies: ['React', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200'
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'Responsive personal portfolio',
    category: 'web' as ProjectCategory,
    technologies: ['HTML', 'CSS', 'JS'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200'
  },
  {
    id: '3',
    title: 'Mobile Game',
    description: 'Addictive puzzle game',
    category: 'mobile' as ProjectCategory,
    technologies: ['Unity', 'C#'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200'
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
        <div className="text-xs font-bold mb-2">📁 Project Categories</div>
        <div className="space-y-1 text-xs">
          {projectCategories.map((category) => (
            <div
              key={category.id}
              className={`p-1 hover:bg-blue-600 hover:text-white cursor-pointer ${
                selectedCategory === category.id ? 'bg-blue-600 text-white' : ''
              }`}
              onClick={() => setSelectedCategory(category.id as ProjectCategory)}
            >
              {category.icon} {category.label}
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
