import React from 'react';
import { Link } from 'react-router-dom';
import { KrishiLogo } from '../common/KrishiLogo';
import { LanguageSelector } from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

interface AuthHeaderProps {
  currentPage: 'login' | 'register';
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ currentPage }) => {
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="hover:opacity-95 transition-opacity">
          <KrishiLogo size="md" />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <LanguageSelector variant="bordered" />

          {currentPage === 'login' ? (
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              {t('signUpNavButton')}
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              {t('loginNavButton')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
