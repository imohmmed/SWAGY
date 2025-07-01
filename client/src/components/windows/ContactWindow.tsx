import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
// Using web-based icons instead of local files
import emailjs from '@emailjs/browser';

export function ContactWindow() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('USOYvdKavaQzL_MWg');
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: 'Shopping website',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // إعداد بيانات الإيميل مع الملفات المرفقة
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'SWAGY',
        to_email: 'it.mohmmed@yahoo.com',
        subject: formData.subject,
        message: formData.message + (attachedFiles.length > 0 ? `\n\nAttached Files: ${attachedFiles.map(f => f.name).join(', ')}` : ''),
      };

      const result = await emailjs.send('service_m5gfafg', 'template_n54wl0n', templateParams);

      if (result.status === 200) {
        alert('تم إرسال الرسالة بنجاح! سأرد عليك قريباً.');
        setFormData({
          email: '',
          name: '',
          subject: 'Shopping website',
          message: ''
        });
        setAttachedFiles([]);
      }
    } catch (error) {
      console.error('خطأ في إرسال الإيميل:', error);
      alert('عذراً، حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClear = () => {
    setFormData({
      email: '',
      name: '',
      subject: 'Shopping website',
      message: ''
    });
    setAttachedFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // حل مشكلة تعليق الكيبورد
  const handleInputFocus = (e: React.FocusEvent) => {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleInputBlur = () => {
    // انتظار قصير قبل العودة للوضع الطبيعي
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="p-4 h-full overflow-auto scrollbar">
      <div className="text-sm font-bold mb-4 flex items-center gap-2">
        <img src="https://win98icons.alexmeub.com/icons/png/modem-3.png" alt="" className="w-4 h-4" draggable={false} />
        Send Email to SWAGY
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">

        
        <div>
          <label className="block text-xs font-bold mb-1">From:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="your.email@example.com"
            className="w-full p-1 win-input"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold mb-1">{t('name')}:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Your Full Name"
            className="w-full p-1 win-input"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold mb-1">{t('subject')}:</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full p-1 win-select"
          >
            <option value="Shopping website">Shopping website</option>
            <option value="Telegram bots">Telegram bots</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-bold mb-1">{t('message')}:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            rows={8}
            placeholder="Type your message here..."
            className="w-full p-2 win-textarea scrollbar"
            required
          />
        </div>

        {/* Display attached files */}
        {attachedFiles.length > 0 && (
          <div className="mt-3">
            <label className="block text-xs font-bold mb-1">Attached Files:</label>
            <div className="space-y-1">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-[rgb(var(--win-light-gray))] p-2 text-xs">
                  <span className="flex items-center gap-2">
                    <img src="https://win98icons.alexmeub.com/icons/png/file_text-0.png" alt="" className="w-4 h-4" draggable={false} />
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="win-button px-4 py-2 text-xs font-bold flex items-center gap-1"
          >
            <img src="https://win98icons.alexmeub.com/icons/png/check-0.png" alt="" className="w-4 h-4" draggable={false} />
            {isSubmitting ? 'Sending...' : t('send')}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="win-button px-4 py-2 text-xs flex items-center gap-1"
          >
            <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" alt="" className="w-4 h-4" draggable={false} />
            {t('clear')}
          </button>
          <button 
            type="button" 
            onClick={handleAttachClick}
            className="win-button px-4 py-2 text-xs flex items-center gap-1"
          >
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="" className="w-4 h-4" draggable={false} />
            Attach File ({attachedFiles.length})
          </button>
        </div>
      </form>
      
      <div className="mt-4 p-3 bg-[rgb(var(--win-light-gray))] border-2 border-[rgb(var(--win-border-dark))]">
        <div className="text-sm font-bold mb-3 flex items-center gap-2">
          <img src="https://win98icons.alexmeub.com/icons/png/tree-0.png" alt="" className="w-4 h-4" draggable={false} />
          {t('contactDescription')}
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#E4405F">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <a 
              href="https://www.instagram.com/it.swagy?igsh=MW02Z2c1bzBqbG5zdg%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Instagram: @it.swagy
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0088CC">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <a 
              href="https://t.me/mohmmed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Telegram: @mohmmed
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
            <a 
              href="https://wa.me/+9647724166086" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              WhatsApp: +9647724166086
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
