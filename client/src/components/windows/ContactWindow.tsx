import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import instagramIcon from '@assets/IMG_6441.png';
import whatsappIcon from '@assets/IMG_6442.png';
import telegramIcon from '@assets/IMG_6443.png';
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
        to_name: 'MoHmmeD',
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
      // Error sending email
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
        {t('sendEmailTo')}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">

        
        <div>
          <label className="block text-xs font-bold mb-1">{t('from')}</label>
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
            placeholder={t('yourFullName')}
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
            <option value="Shopping website">{t('shoppingWebsite')}</option>
            <option value="Telegram bots">{t('telegramBots')}</option>
            <option value="Other">{t('other')}</option>
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
            placeholder={t('typeMessage')}
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
            {isSubmitting ? t('sending') : t('send')}
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
            <img src={instagramIcon} alt="Instagram" className="w-4 h-4" draggable={false} />
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
            <img src={telegramIcon} alt="Telegram" className="w-4 h-4" draggable={false} />
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
            <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4" draggable={false} />
            <a 
              href="https://wa.me/+9647766699669" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              WhatsApp: +9647766699669
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
