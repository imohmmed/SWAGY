import { useLanguage } from '../../hooks/useLanguage';

const blogEntries = [
  {
    id: '1',
    title: 'لماذا ما زلت أصمم كأنني في عام 1998',
    date: 'ديسمبر 2024',
    content: 'التصميم الحديث رائع، لكن لا شيء يضاهي زر البكسل الضخم والظل الذي يمكنك أن تتعثر عليه. اتصل بها حنينًا... أو ذوقًا'
  },
  {
    id: '2',
    title: 'الساعة الثانية صباحًا: أنا ضد فاصلة منقوطة غبية',
    date: 'نوفمبر 2024',
    content: 'الفائز: الفاصلة المنقوطة.\nالدرس: احترم الفاصلة المنقوطة دائمًا.'
  },
  {
    id: '3',
    title: 'من قال أن المطورين لا يمكن أن يكونوا أنيقين؟',
    date: 'أكتوبر 2024',
    content: 'أقوم بتصحيح الأخطاء في AirPods Max وبناطيل واسعة. إذا كانت المظاهر نظيفة، فالكود أنظف.'
  },
  {
    id: '4',
    title: 'واجهات المستخدم القديمة > صداع حديث',
    date: 'سبتمبر 2024',
    content: 'علمني ويندوز 98 شيئًا واحدًا:\nانقر، اسحب، اشعر بالسعادة.\nالتطبيقات الحديثة؟\nانقر، انتظر، تعطل.'
  }
];

const showerThoughts = [
  'إذا لم تتمكن من إصلاح الخطأ، فعلى الأقل أصلح مظهرك.',
  'حذائي؟ نظيف جدًا للمشي',
  'القهوة ≠ الإبداع، لكن الموسيقى = العبقرية.',
  'لماذا هو دائمًا "localhost:3000" وليس أبدًا "localhost: كيف حالك؟"',
  'قاعدة الموضة رقم 1: إذا كان يربك أمك، فأنت تفعل الصواب.'
];

export function BlogWindow() {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 h-full">
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] h-full p-3 overflow-auto scrollbar font-mono text-sm">
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">
            ideas.txt - آخر تعديل: {new Date().toLocaleDateString('ar')}
          </div>
          <hr className="border-gray-300 mb-4" />
        </div>
        
        <div className="space-y-4" dir="rtl">
          {blogEntries.map((entry) => (
            <div key={entry.id} className="blog-entry">
              <div className="font-bold mb-1">💭 {entry.title}</div>
              <div className="text-xs text-gray-500 mb-2">{entry.date}</div>
              <p className="mb-4 whitespace-pre-line">{entry.content}</p>
              <hr className="border-gray-300" />
            </div>
          ))}
          
          <div className="blog-entry">
            <div className="font-bold mb-1">⚡ أفكار الاستحمام</div>
            <div className="text-xs text-gray-500 mb-2">يناير 2025</div>
            <ul className="space-y-1 text-xs">
              {showerThoughts.map((thought, index) => (
                <li key={index}>• {thought}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-xs text-gray-500">--- نهاية الملف ---</div>
            <div className="blink text-xs mt-2">█</div>
          </div>
        </div>
      </div>
    </div>
  );
}
