import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  Phone,
  User as UserIcon,
  MapPin,
  Compass,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Info,
} from 'lucide-react';
import { AuthHeader } from '../components/layout/AuthHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { detectBrowserLocation } from '../services/locationService';

export const RegisterPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cityVillage, setCityVillage] = useState('');

  // Location State
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string>('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string | null>(null);

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccess, setOtpSuccess] = useState<string | null>(null);

  // Form Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // 1. Send OTP Action
  const handleSendOtp = async () => {
    setOtpError(null);
    setOtpSuccess(null);

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setOtpError(t('errPhoneInvalid'));
      return;
    }

    setIsSendingOtp(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSendingOtp(false);
    setOtpSent(true);
    // Explicit demo OTP notification (documented demo mode as required)
    setOtpSuccess(
      language === 'kn'
        ? 'ಡೆಮೊ ಮೋಡ್: ಪರೀಕ್ಷಾರ್ಥ ಒಟಿಪಿ ಸಂಖ್ಯೆ 123456. ನೈಜ SMS ಗೇಟ್‌ವೇ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.'
        : 'DEMO MODE: Simulated verification OTP is 123456. Real SMS gateway is not connected yet.'
    );
    // Conveniently pre-fill or place 123456 in input for smooth experience
    setOtpInput('123456');
  };

  // 2. Verify OTP Action
  const handleVerifyOtp = async () => {
    setOtpError(null);
    if (!otpInput.trim()) {
      setOtpError(t('enterOtp'));
      return;
    }

    setIsVerifyingOtp(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsVerifyingOtp(false);

    if (otpInput.trim() === '123456' || otpInput.trim().length === 6) {
      setIsPhoneVerified(true);
      setOtpSuccess(t('otpVerified'));
    } else {
      setOtpError(t('invalidOtp'));
    }
  };

  // 3. Detect My Location Action
  const handleDetectLocation = async () => {
    setLocationErrorMsg(null);
    setLocationSuccessMsg(null);
    setIsDetectingLocation(true);

    try {
      const result = await detectBrowserLocation();
      setLatitude(result.latitude);
      setLongitude(result.longitude);
      setDetectedAddress(result.fullAddress || '');

      // Auto-fill City / Village if reverse geocoded
      if (result.village && (!cityVillage || cityVillage === '')) {
        const fullLocation = result.district ? `${result.village}, ${result.district}` : result.village;
        setCityVillage(fullLocation);
      }

      setLocationSuccessMsg(
        language === 'kn'
          ? `ಸ್ಥಳ ಯಶಸ್ವಿಯಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ! ಅಕ್ಷಾಂಶ: ${result.latitude}, ರೇಖಾಂಶ: ${result.longitude}`
          : `Coordinates locked: ${result.latitude}, ${result.longitude}`
      );
    } catch (err: any) {
      if (err.code === 'PERMISSION_DENIED') {
        setLocationErrorMsg(t('locationPermissionDenied'));
      } else {
        setLocationErrorMsg(
          err.message || (language === 'kn' ? 'ಸ್ಥಳ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಊರನ್ನು ನೀವೇ ನಮೂದಿಸಿ.' : 'Could not detect location. Please enter manually.')
        );
      }
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // 4. Submit Registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError(t('errNameRequired'));
      return;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError(t('errPhoneInvalid'));
      return;
    }

    // Require successful phone verification
    if (!isPhoneVerified) {
      setFormError(t('otpRequiredError'));
      return;
    }

    if (!password || password.length < 6) {
      setFormError(t('errPasswordLength'));
      return;
    }

    if (!cityVillage.trim()) {
      setFormError(t('errVillageRequired'));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(
        {
          name: fullName.trim(),
          phone: cleanPhone,
          village: cityVillage.trim(),
          latitude: latitude || undefined,
          longitude: longitude || undefined,
          locationAddress: detectedAddress || cityVillage.trim(),
        },
        password
      );

      if (res.success) {
        setFormSuccess(t('regSuccess'));
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      } else {
        setFormError(res.error || 'Registration failed');
      }
    } catch {
      setFormError('An error occurred during account creation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AuthHeader currentPage="register" />

      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-10 transition-all">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t('createAccount')}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              {t('createAccountSubtitle')}
            </p>
          </div>

          {/* Form Level Error / Success */}
          {formError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{formError}</span>
            </div>
          )}
          {formSuccess && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-xs text-green-800 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                1. {t('fullName')} <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 transition-all">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('fullNamePlaceholder')}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* 2 & 3. Phone Number with +91 country code and Send OTP button directly beside it on desktop */}
            <div>
              <label
                htmlFor="reg-phone"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                2. {t('phoneNumber')} &amp; 3. {t('sendOtp')} <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1 flex rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 overflow-hidden transition-all">
                  <span className="inline-flex items-center px-3.5 border-r border-slate-200 bg-slate-100/80 text-xs font-semibold text-slate-600 select-none">
                    🇮🇳 +91
                  </span>
                  <div className="relative flex-1 flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      id="reg-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      disabled={isPhoneVerified}
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value.replace(/\D/g, ''));
                        if (isPhoneVerified) setIsPhoneVerified(false);
                      }}
                      placeholder={t('phonePlaceholder')}
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none disabled:opacity-70"
                      required
                    />
                  </div>
                </div>

                {/* Send OTP button directly beside phone field on desktop */}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || isPhoneVerified || phoneNumber.length !== 10}
                  className="px-4 py-2.5 bg-green-700 hover:bg-green-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 cursor-pointer whitespace-nowrap"
                >
                  {isSendingOtp
                    ? t('sendingOtp')
                    : isPhoneVerified
                    ? '✓ ' + t('otpVerified')
                    : otpSent
                    ? t('resendOtp')
                    : t('sendOtp')}
                </button>
              </div>

              {/* OTP status or error */}
              {otpSuccess && (
                <div className="mt-2 text-xs text-green-700 bg-green-50 p-2.5 rounded-lg border border-green-200 flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600 mt-0.5" />
                  <span>{otpSuccess}</span>
                </div>
              )}
              {otpError && (
                <div className="mt-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{otpError}</span>
                </div>
              )}
            </div>

            {/* 4. Enter OTP field with Verify button */}
            <div className={`transition-all ${otpSent ? 'opacity-100' : 'opacity-85'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="otp-code"
                  className="block text-xs font-semibold text-slate-700"
                >
                  4. {t('enterOtp')} <span className="text-red-500">*</span>
                </label>
                {!isPhoneVerified && otpSent && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200">
                    Demo OTP: 123456
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 transition-all">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="otp-code"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    disabled={isPhoneVerified}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('otpPlaceholder')}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm font-mono tracking-widest text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal bg-transparent focus:outline-none disabled:opacity-70"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp || isPhoneVerified || !otpInput}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 cursor-pointer whitespace-nowrap ${
                    isPhoneVerified
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#16A34A] hover:bg-[#15803D] text-white disabled:bg-slate-200 disabled:text-slate-400'
                  }`}
                >
                  {isVerifyingOtp
                    ? t('verifyingOtp')
                    : isPhoneVerified
                    ? '✓ ' + t('otpVerified')
                    : t('verifyOtp')}
                </button>
              </div>
            </div>

            {/* 5. Password field with show/hide icon */}
            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                5. {t('password')} <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 transition-all">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="reg-password"
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
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'kn' ? 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು' : 'Minimum 6 characters'}
              </p>
            </div>

            {/* 6. City / Village field */}
            <div>
              <label
                htmlFor="village-input"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                6. {t('cityVillage')} <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl border border-slate-300 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20 bg-slate-50/60 transition-all">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="village-input"
                  type="text"
                  value={cityVillage}
                  onChange={(e) => setCityVillage(e.target.value)}
                  placeholder={t('cityVillagePlaceholder')}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {t('manualEntryAllowed')}
              </p>
            </div>

            {/* 7 & 8. Location section showing detected latitude and longitude + Detect My Location button */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    7. {t('locationSection')}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {language === 'kn' ? 'ನಿಖರ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಾಗಿ ಜಿಪಿಎಸ್' : 'Enables precision farm weather alerts'}
                  </p>
                </div>

                {/* 8. Detect My Location Button */}
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-green-700 bg-white hover:bg-green-50 border border-green-300 rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0 disabled:opacity-60"
                >
                  <Compass className={`w-4 h-4 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                  <span>{isDetectingLocation ? t('detectingLocation') : '8. ' + t('detectMyLocation')}</span>
                </button>
              </div>

              {/* Coordinates Display */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    {t('latitude')}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-800">
                    {latitude !== null ? latitude : '—'}
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                    {t('longitude')}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-800">
                    {longitude !== null ? longitude : '—'}
                  </span>
                </div>
              </div>

              {detectedAddress && (
                <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{detectedAddress}</span>
                </div>
              )}

              {locationSuccessMsg && (
                <p className="text-[11px] text-green-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span>{locationSuccessMsg}</span>
                </p>
              )}
              {locationErrorMsg && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{locationErrorMsg}</span>
                </p>
              )}
            </div>

            {/* 9. Green Sign Up button */}
            <button
              type="submit"
              disabled={isSubmitting || !isPhoneVerified}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white shadow-sm transition-all cursor-pointer ${
                isPhoneVerified
                  ? 'bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{isSubmitting ? t('registering') : '9. ' + t('signUpButton')}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>

            {!isPhoneVerified && (
              <p className="text-[11px] text-center text-amber-700 flex items-center justify-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>{t('otpRequiredError')}</span>
              </p>
            )}
          </form>

          {/* Footer: Already have an account? Log in here */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              {t('alreadyHaveAccount')}{' '}
              <Link
                to="/login"
                className="font-bold text-[#16A34A] hover:text-[#15803D] hover:underline transition-colors"
              >
                {t('loginHere')}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
