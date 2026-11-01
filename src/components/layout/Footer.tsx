import React from 'react';
import { PhoneCall, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { KrishiLogo } from '../common/KrishiLogo';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <KrishiLogo size="md" />
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'kn'
                ? 'ರೈತರಿಗೆ ಅಧಿಕೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣ ಸಲಹೆಗಳನ್ನು ನೀಡುವ ವಿಶ್ವಾಸಾರ್ಹ ವೇದಿಕೆ.'
                : 'Dedicated to empowering rural farmers with localized microclimate advisories, mandi wholesale prices, and proactive disease warnings.'}
            </p>
          </div>

          {/* Col 2: Quick Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {language === 'kn' ? 'ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು' : 'Core Modules'}
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li>{t('navDashboard')}</li>
              <li>{t('marketplaceTitle')}</li>
              <li>{t('cropAlertsTitle')}</li>
              <li>{t('alertGuardTitle')}</li>
              <li>{t('agriNewsTitle')}</li>
            </ul>
          </div>

          {/* Col 3: Farmer Emergency Hotlines */}
          <div className="space-y-2 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t('emergencyHotlines')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-green-50/70 border border-green-200/60 rounded-xl flex items-start gap-2.5">
                <div className="p-2 bg-green-600 text-white rounded-lg shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-950">
                    {language === 'kn' ? 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್' : 'Kisan Call Centre'}
                  </p>
                  <p className="text-xs font-semibold text-green-700 font-mono">1800-180-1551</p>
                  <p className="text-[10px] text-slate-500">
                    {language === 'kn' ? 'ಟೋಲ್ ಫ್ರೀ (ಬೆಳಿಗ್ಗೆ 6 ರಿಂದ ರಾತ್ರಿ 10)' : 'Toll-free 6 AM - 10 PM'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-start gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-950">
                    {language === 'kn' ? 'ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ' : 'Raitha Samparka Kendra'}
                  </p>
                  <p className="text-xs font-semibold text-blue-700 font-mono">080-22212861</p>
                  <p className="text-[10px] text-slate-500">
                    {language === 'kn' ? 'ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆ' : 'Govt of Karnataka Support'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer and Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-green-600" />
            <span>{t('demoNotice')}</span>
          </div>
          <p>© {new Date().getFullYear()} KrishiSahayak. Built for Indian Agriculture.</p>
        </div>
      </div>
    </footer>
  );
};
