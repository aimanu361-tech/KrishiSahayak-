import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  User,
  LogOut,
  Download,
  Menu,
  X,
  MapPin,
  ChevronDown,
  LayoutDashboard,
  Store,
  AlertTriangle,
  ShieldCheck,
  Newspaper,
  CheckCircle2,
} from 'lucide-react';
import { KrishiLogo } from '../common/KrishiLogo';
import { LanguageSelector } from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SAMPLE_CROP_ALERTS } from '../../services/alertService';

export const AppHeader: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { to: '/marketplace', label: t('navMarketplace'), icon: Store },
    { to: '/crop-alerts', label: t('navCropAlerts'), icon: AlertTriangle, badge: '2' },
    { to: '/alertguard', label: t('navAlertGuard'), icon: ShieldCheck },
    { to: '/agri-news', label: t('navAgriNews'), icon: Newspaper },
  ];

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        {/* Top bar with Logo, Quick info, Language, Notifs, Profile */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo */}
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="hover:opacity-95 transition-opacity">
                <KrishiLogo size="md" />
              </Link>
            </div>

            {/* Right Tools: Install App, Language, Notifications, Profile, Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Install App button */}
              <button
                onClick={() => setShowInstallModal(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                title="Install KrishiSahayak PWA"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('installApp')}</span>
              </button>

              {/* Language Selector */}
              <LanguageSelector variant="bordered" />

              {/* Notification Bell Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900">
                        {t('notifications')}
                      </span>
                      <span className="text-[11px] text-green-700 font-medium">
                        2 {language === 'kn' ? 'ಹೊಸ ಎಚ್ಚರಿಕೆಗಳು' : 'New Advisories'}
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {SAMPLE_CROP_ALERTS.slice(0, 3).map((alert) => (
                        <Link
                          key={alert.id}
                          to="/crop-alerts"
                          onClick={() => setNotificationsOpen(false)}
                          className="p-3 hover:bg-slate-50 flex items-start gap-2.5 transition-colors block text-left"
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                              alert.severity === 'high'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                              {language === 'kn' ? alert.titleKn : alert.title}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                              {language === 'kn' ? alert.messageKn : alert.message}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {alert.date}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="p-2 border-t border-slate-100 text-center">
                      <Link
                        to="/crop-alerts"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs font-semibold text-green-600 hover:text-green-700"
                      >
                        {t('viewDetails')} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-800 font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'F'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[110px]">
                      {user?.name || 'Farmer'}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[110px]">
                      {user?.village ? user.village.split(',')[0] : 'Karnataka'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-semibold text-sm text-slate-900">{user?.name || 'Farmer'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{user?.phone ? `+91 ${user.phone}` : ''}</p>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{t('farmerRole')}</span>
                      </div>
                      {user?.village && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                          <span className="truncate">{user.village}</span>
                        </div>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar with Green Accent */}
        <div className="hidden md:block bg-[#F8FAFC] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 sm:space-x-2 py-1.5" aria-label="Main Navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#16A34A] text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-[#166534] hover:bg-slate-200/60'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-5 space-y-2 animate-in fade-in duration-150">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowInstallModal(true);
                }}
                className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-lg"
              >
                <Download className="w-4 h-4" />
                <span>{t('installApp')}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-600 px-3 py-2 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('logout')}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Install PWA Modal / Information */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'kn' ? 'ಕೃಷಿ ಸಹಾಯಕ ಆ್ಯಪ್ ಸ್ಥಾಪಿಸಿ' : 'Install KrishiSahayak App'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಹವಾಮಾನ ಮತ್ತು ಮಂಡಿ ದರಗಳಿಗಾಗಿ' : 'Instant offline access for farmers'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'kn'
                ? 'ಕೃಷಿ ಸಹಾಯಕ ಆ್ಯಪ್ ಅನ್ನು ನಿಮ್ಮ ಮೊಬೈಲ್ ಅಥವಾ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ. ಬ್ರೌಸರ್ ಮೆನುವಿನಲ್ಲಿ "Add to Home screen" ಅಥವಾ ವಿಳಾಸ ಪಟ್ಟಿಯಲ್ಲಿರುವ ಇನ್‌ಸ್ಟಾಲ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.'
                : 'Install KrishiSahayak on your home screen for one-tap access to weather advisories, mandi rates, and crop alerts without downloading heavy app store files.'}
            </p>
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 space-y-1 mb-5 border border-slate-200">
              <p>• <strong>Chrome / Android:</strong> Tap ⋮ menu &gt; "Add to Home screen" or "Install App".</p>
              <p>• <strong>iOS / Safari:</strong> Tap Share icon &gt; "Add to Home Screen".</p>
            </div>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full py-2.5 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold rounded-lg shadow-xs"
            >
              {language === 'kn' ? 'ಸರಿ, ಅರ್ಥವಾಯಿತು' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
