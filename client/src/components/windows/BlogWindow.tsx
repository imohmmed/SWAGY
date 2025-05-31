import { useLanguage } from '../../hooks/useLanguage';

const blogEntries = [
  {
    id: '1',
    title: 'Why I Still Design Like It\'s 1998',
    date: 'December 2024',
    content: 'Modern design is cool, but nothing beats a chunky pixel button with a shadow you can trip over. Call it nostalgia... or taste.'
  },
  {
    id: '2',
    title: '2 AM: Me vs One Stupid Semicolon',
    date: 'November 2024',
    content: 'Winner: The semicolon.\nLesson: Always respect the semicolon.'
  },
  {
    id: '3',
    title: 'Who Said Developers Can\'t Be Stylish?',
    date: 'October 2024',
    content: 'I debug in AirPods Max and baggy pants. If the looks are clean, the code is cleaner.'
  },
  {
    id: '4',
    title: 'Retro UIs > Modern Headaches',
    date: 'September 2024',
    content: 'Windows 98 taught me one thing:\nClick, drag, feel happy.\nModern apps?\nClick, wait, crash.'
  }
];

const showerThoughts = [
  'If you can\'t fix the bug, at least fix your look.',
  'My shoes? Too clean to walk.',
  'Coffee ≠ creativity, but music = genius.',
  'Why is it always "localhost:3000" and never "localhost: how are you?"',
  'Fashion rule #1: If it confuses your mom, you\'re doing it right.'
];

export function BlogWindow() {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 h-full">
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] h-full p-3 overflow-auto scrollbar font-mono text-sm">
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">
            ideas.txt - Last modified: {new Date().toLocaleDateString('en-US')}
          </div>
          <hr className="border-gray-300 mb-4" />
        </div>
        
        <div className="space-y-4" dir="ltr">
          {blogEntries.map((entry) => (
            <div key={entry.id} className="blog-entry">
              <div className="font-bold mb-1">💭 {entry.title}</div>
              <div className="text-xs text-gray-500 mb-2">{entry.date}</div>
              <p className="mb-4 whitespace-pre-line">{entry.content}</p>
              <hr className="border-gray-300" />
            </div>
          ))}
          
          <div className="blog-entry">
            <div className="font-bold mb-1">⚡ Shower Thoughts</div>
            <div className="text-xs text-gray-500 mb-2">January 2025</div>
            <ul className="space-y-1 text-xs">
              {showerThoughts.map((thought, index) => (
                <li key={index}>• {thought}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-xs text-gray-500">--- End of File ---</div>
            <div className="blink text-xs mt-2">█</div>
          </div>
        </div>
      </div>
    </div>
  );
}
