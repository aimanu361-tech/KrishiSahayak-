import React, { useState } from 'react';
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  CloudRain,
  Bug,
  CheckCircle2,
  Calendar,
  Filter,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_CROP_ALERTS } from '../services/alertService';
import { CropAlertItem } from '../types';

export const CropAlertsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeFilterCrop, setActiveFilterCrop] = useState<string>('all');

  const filteredAlerts = SAMPLE_CROP_ALERTS.filter((item) => {
    const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;
    const matchesCrop =
      activeFilterCrop === 'all' ||
      item.affectedCrops.some((c) => c.toLowerCase().includes(activeFilterCrop.toLowerCase())) ||
      item.affectedCropsKn.some((c) => c.includes(activeFilterCrop));
    return matchesSeverity && matchesCrop;
  });

  const getAlertIcon = (type: CropAlertItem['type']) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-amber-600" />;
      case 'humidity':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'rainfall':
        return <CloudRain className="w-5 h-5 text-indigo-600" />;
      case 'pest':
        return <Bug className="w-5 h-5 text-rose-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {t('cropAlertsTitle')}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{t('updatedJustNow')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('cropAlertsTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('cropAlertsSubtitle')}
            </p>
          </div>

          {/* Quick Status Pill */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">
                {SAMPLE_CROP_ALERTS.length} {language === 'kn' ? 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು' : 'Active Field Advisories'}
              </p>
              <p className="text-[11px] text-amber-800">
                {language === 'kn' ? 'ಬೆಳೆ ರಕ್ಷಣೆಗೆ ಮುಂಜಾಗ್ರತಾ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ' : 'Review prevention protocols below'}
              </p>
            </div>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-700">{t('filterBySeverity')}:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedSeverity('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedSeverity === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t('all')}
            </button>
            <button
              onClick={() => setSelectedSeverity('high')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                selectedSeverity === 'high'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <span>{t('severityHigh')}</span>
            </button>
            <button
              onClick={() => setSelectedSeverity('medium')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                selectedSeverity === 'medium'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <span>{t('severityMedium')}</span>
            </button>
          </div>
        </div>

        {/* Reusable Alert Cards List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-6 border shadow-xs transition-all ${
                alert.severity === 'high'
                  ? 'border-amber-200 hover:border-amber-300 ring-1 ring-amber-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header: Type icon, Title, Severity Badge, Date */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      alert.severity === 'high'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {language === 'kn' ? alert.titleKn : alert.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{alert.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      alert.severity === 'high'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {alert.severity === 'high' ? t('severityHigh') : t('severityMedium')}
                  </span>
                </div>
              </div>

              {/* Message */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                {language === 'kn' ? alert.messageKn : alert.message}
              </p>

              {/* Affected Crops */}
              <div className="mb-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-500">{t('affectedCrops')}:</span>
                {(language === 'kn' ? alert.affectedCropsKn : alert.affectedCrops).map((crop) => (
                  <span
                    key={crop}
                    className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium"
                  >
                    {crop}
                  </span>
                ))}
              </div>

              {/* Recommended Action Box */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>{t('recommendedAction')}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(language === 'kn' ? alert.adviceKn : alert.advice).map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
