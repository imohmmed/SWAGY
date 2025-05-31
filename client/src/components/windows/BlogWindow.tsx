import { useLanguage } from '../../hooks/useLanguage';

const blogEntries = [
  {
    id: '1',
    title: 'onDesign',
    date: 'November 2024',
    content: 'designThought'
  },
  {
    id: '2',
    title: 'lateNight',
    date: 'October 2024',
    content: 'codingThought'
  },
  {
    id: '3',
    title: 'retroNostalgia',
    date: 'September 2024',
    content: 'retroThought'
  }
];

const quickThoughts = [
  'Good code is like good music - it has rhythm and flow',
  'User experience is not what you think, it\'s what users feel',
  'The best feature is sometimes the one you don\'t build',
  'Documentation is love letters to your future self',
  'Embrace the bugs - they teach you more than success does'
];

export function BlogWindow() {
  const { t } = useLanguage();

  return (
    <div className="p-4 h-full">
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] h-full p-3 overflow-auto scrollbar font-mono text-sm">
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">
            ideas.txt - Last modified: {new Date().toLocaleDateString()}
          </div>
          <hr className="border-gray-300 mb-4" />
        </div>
        
        <div className="space-y-4">
          {blogEntries.map((entry) => (
            <div key={entry.id} className="blog-entry">
              <div className="font-bold mb-1">💭 {t(entry.title)}</div>
              <div className="text-xs text-gray-500 mb-2">{entry.date}</div>
              <p className="mb-4">{t(entry.content)}</p>
              <hr className="border-gray-300" />
            </div>
          ))}
          
          <div className="blog-entry">
            <div className="font-bold mb-1">⚡ {t('quickThoughts')}</div>
            <div className="text-xs text-gray-500 mb-2">Various dates</div>
            <ul className="space-y-1 text-xs">
              {quickThoughts.map((thought, index) => (
                <li key={index}>• {thought}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-xs text-gray-500">{t('endOfFile')}</div>
            <div className="blink text-xs mt-2">█</div>
          </div>
        </div>
      </div>
    </div>
  );
}
