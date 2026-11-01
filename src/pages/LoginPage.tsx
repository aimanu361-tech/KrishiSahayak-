import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Phone, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthHeader } from '../components/layout/AuthHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage(t('errPhoneInvalid'));
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage(t('errPasswordLength'));
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(cleanPhone, password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(t(res.error as any || 'errInvalidCredentials'));
      }
    } catch {
      setErrorMessage(t('errInvalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDemo = () => {
    setPhoneNumber('9876543210');
    setPassword('password123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AuthHeader currentPage="login" />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 p-8 sm:p-10 transition-all">
          {/* Header of Login Card */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t('welcomeBack')}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t('loginSubtitle')}
            </p>
          </div>

          {/* Quick Demo Credentials Info Banner */}
          <div className="mb-6 p-3 bg-green-50/80 border border-green-200 rounded-xl text-xs text-green-900 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{t('demoCredentialsHint')}</p>
                <p className="text-[11px] text-green-700 mt-0.5">
                  {language === 'kn' ? 'ಮೊಬೈಲ್: 9876543210 | ಪಾಸ್‌ವರ್ಡ್: password123' : 'Phone: 9876543210 | Pass: password123'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-[11px] font-bold text-green-700 hover:text-green-800 underline shrink-0 cursor-pointer"
            >
              {language === 'kn' ? 'ತುಂಬಿಸಿ' : 'Auto-fill'}
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Field with +91 Country Code */}
            <div>
              <label
                htmlFor="phone-input"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {t('phoneNumber')}
              </label>
              <div className="relative flex rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 overflow-hidden transition-all">
                <span className="inline-flex items-center px-3.5 border-r border-slate-200 bg-slate-100/80 text-xs font-semibold text-slate-600 select-none">
                  🇮🇳 +91
                </span>
                <div className="relative flex-1 flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('phonePlaceholder')}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Field with Show/Hide Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password-input"
                  className="block text-xs font-semibold text-slate-700"
                >
                  {t('password')}
                </label>
                <button
                  type="button"
                  onClick={() => alert(language === 'kn' ? 'ಡೆಮೊ ಮೋಡ್: ಪಾಸ್‌ವರ್ಡ್ "password123" ಆಗಿದೆ.' : 'Demo Mode: Use "password123" as password.')}
                  className="text-[11px] font-medium text-green-700 hover:text-green-800"
                >
                  {t('forgotPassword')}
                </button>
              </div>
              <div className="relative rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 transition-all">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 cursor-pointer">
                {t('rememberMe')}
              </label>
            </div>

            {/* Full-width Green Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all disabled:opacity-70 cursor-pointer"
            >
              <span>{isLoading ? t('loggingIn') : t('loginButton')}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Footer: Don't have an account? Sign up here */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              {t('dontHaveAccount')}{' '}
              <Link
                to="/register"
                className="font-bold text-[#16A34A] hover:text-[#15803D] hover:underline transition-colors"
              >
                {t('signUpHere')}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
