import { useLanguage } from '../../hooks/useLanguage';

const blogEntries = [
  {
    id: '1',
    titleKey: 'blogTitle1',
    dateKey: 'blogDate1',
    contentKey: 'blogContent1'
  },
  {
    id: '2',
    titleKey: 'blogTitle2',
    dateKey: 'blogDate2', 
    contentKey: 'blogContent2'
  },
  {
    id: '3',
    titleKey: 'blogTitle3',
    dateKey: 'blogDate3',
    contentKey: 'blogContent3'
  },
  {
    id: '4',
    titleKey: 'blogTitle4',
    dateKey: 'blogDate4',
    contentKey: 'blogContent4'
  }
];

const showerThoughts = [
  'showerThought1',
  'showerThought2', 
  'showerThought3',
  'showerThought4',
  'showerThought5'
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
        
        <div className="space-y-4">
          {blogEntries.map((entry) => (
            <div key={entry.id} className="blog-entry">
              <div className="font-bold mb-1">💭 {t(entry.titleKey)}</div>
              <div className="text-xs text-gray-500 mb-2">{t(entry.dateKey)}</div>
              <p className="mb-4 whitespace-pre-line">{t(entry.contentKey)}</p>
              <hr className="border-gray-300" />
            </div>
          ))}
          
          <div className="blog-entry">
            <div className="font-bold mb-1">⚡ {t('showerThoughtsTitle')}</div>
            <div className="text-xs text-gray-500 mb-2">{t('showerThoughtsDate')}</div>
            <ul className="space-y-1 text-xs">
              {showerThoughts.map((thoughtKey, index) => (
                <li key={index}>• {t(thoughtKey)}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-xs text-gray-500">--- {t('endOfFile')} ---</div>
            <div className="blink text-xs mt-2">█</div>
          </div>
        </div>
      </div>
    </div>
  );
}
