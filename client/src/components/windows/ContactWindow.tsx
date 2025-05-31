import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export function ContactWindow() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      alert('Message sent successfully! I\'ll get back to you soon.');
      setIsSubmitting(false);
      setFormData({
        email: '',
        name: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 2000);
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
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="p-4 h-full overflow-auto scrollbar">
      <div className="text-sm font-bold mb-4">📧 Send Email to SWAGY</div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-bold mb-1">To:</label>
          <input
            type="text"
            value="swagy@example.com"
            readOnly
            className="w-full p-1 win-input bg-[rgb(var(--win-light-gray))]"
          />
        </div>
        
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
            <option value="General Inquiry">{t('generalInquiry')}</option>
            <option value="Project Collaboration">{t('projectCollaboration')}</option>
            <option value="Job Opportunity">{t('jobOpportunity')}</option>
            <option value="Technical Support">{t('technicalSupport')}</option>
            <option value="Other">{t('other')}</option>
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
            className="win-button px-4 py-2 text-xs font-bold"
          >
            📤 {isSubmitting ? 'Sending...' : t('send')}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="win-button px-4 py-2 text-xs"
          >
            🗑️ {t('clear')}
          </button>
          <button type="button" className="win-button px-4 py-2 text-xs">
            📎 Attach File
          </button>
        </div>
      </form>
      
      <div className="mt-4 p-3 bg-[rgb(var(--win-light-gray))] border-2 border-[rgb(var(--win-border-dark))]">
        <div className="text-xs font-bold mb-2">💬 {t('contactDescription')}</div>
        <div className="space-y-1 text-xs">
          <div>🐦 Twitter: @swagy_dev</div>
          <div>💼 LinkedIn: /in/swagy</div>
          <div>📱 WhatsApp: +1 (555) 123-4567</div>
          <div>💬 Discord: SWAGY#1234</div>
        </div>
      </div>
    </div>
  );
}
