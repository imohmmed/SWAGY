import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import instagramIcon from '@assets/IMG_6441.png';
import whatsappIcon from '@assets/IMG_6442.png';
import telegramIcon from '@assets/IMG_6443.png';
import emailjs from '@emailjs/browser';

export function ContactWindow() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: 'Shopping website',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await emailjs.send(
        import.meta.env.EMAILJS_SERVICE_ID!,
        import.meta.env.EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_name: 'SWAGY',
          to_email: 'it.mohmmed@yahoo.com',
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        alert('تم إرسال الرسالة بنجاح! سأرد عليك قريباً.');
        setFormData({
          email: '',
          name: '',
          subject: 'Shopping website',
          message: ''
        });
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
            rows={8}
            placeholder="Type your message here..."
            className="w-full p-2 win-textarea scrollbar"
            required
          />
        </div>
        
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
          <button type="button" className="win-button px-4 py-2 text-xs flex items-center gap-1">
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="" className="w-4 h-4" draggable={false} />
            Attach File
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
