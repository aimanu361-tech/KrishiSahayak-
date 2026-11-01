import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector: React.FC<{ variant?: 'minimal' | 'bordered' }> = ({
  variant = 'bordered',
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center">
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white transition-all ${
          variant === 'bordered'
            ? 'border border-slate-200 shadow-xs hover:border-slate-300'
            : 'hover:bg-slate-100'
        }`}
      >
        <Globe className="w-4 h-4 text-slate-500 shrink-0" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'kn')}
          className="bg-transparent font-medium text-slate-800 cursor-pointer focus:outline-none appearance-none pr-3"
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
        </select>
        <div className="pointer-events-none -ml-2 text-slate-400 text-[10px]">▼</div>
      </div>
    </div>
  );
};
