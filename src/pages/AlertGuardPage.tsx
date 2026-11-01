import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  PhoneCall,
  Activity,
  CheckCircle2,
  Sliders,
  Bell,
  RefreshCw,
  Info,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { WEATHER_THRESHOLDS, getCurrentWeather } from '../services/weatherService';

export const AlertGuardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const weather = getCurrentWeather();

  // Configurable thresholds state
  const [tempThreshold, setTempThreshold] = useState(WEATHER_THRESHOLDS.HIGH_TEMP_THRESHOLD);
  const [humidityThreshold, setHumidityThreshold] = useState(WEATHER_THRESHOLDS.HIGH_HUMIDITY_THRESHOLD);
  const [rainThreshold, setRainThreshold] = useState(WEATHER_THRESHOLDS.HEAVY_RAINFALL_THRESHOLD);
  const [windThreshold, setWindThreshold] = useState(WEATHER_THRESHOLDS.HIGH_WIND_THRESHOLD);

  // Live test simulator inputs
  const [simTemp, setSimTemp] = useState(weather.temperature);
  const [simHumidity, setSimHumidity] = useState(weather.humidity);

  const isTempTriggered = simTemp > tempThreshold;
  const isHumidityTriggered = simHumidity > humidityThreshold;

  const handleReset = () => {
    setTempThreshold(32);
    setHumidityThreshold(75);
    setRainThreshold(35);
    setWindThreshold(30);
    setSimTemp(weather.temperature);
    setSimHumidity(weather.humidity);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Heading & Status */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                {t('alertGuardTitle')}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{t('updatedJustNow')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('alertGuardTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('alertGuardSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold">{t('allSystemsOperational')}</p>
              <p className="text-[11px] text-green-700">
                {language === 'kn' ? '4 ಹವಾಮಾನ ಸಂವೇದಕಗಳು ನಿರಂತರ ಸಂಪರ್ಕದಲ್ಲಿವೆ' : '4 telemetry parameters monitored continuously'}
              </p>
            </div>
          </div>
        </div>

        {/* Monitored Parameters & Active Trigger Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Temperature Monitor */}
          <div
            className={`bg-white rounded-2xl p-5 border shadow-xs transition-all ${
              isTempTriggered ? 'border-amber-300 ring-2 ring-amber-500/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg ${
                    isTempTriggered ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Thermometer className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-slate-900">
                  {language === 'kn' ? 'ತಾಪಮಾನ' : 'Field Temp'}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isTempTriggered
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isTempTriggered ? 'TRIGGERED' : 'NORMAL'}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-500">{language === 'kn' ? 'ಪ್ರಸ್ತುತ:' : 'Current:'}</span>
              <span className="text-xl font-bold font-mono text-slate-900">{simTemp}°C</span>
            </div>
            <div className="flex items-baseline justify-between text-xs text-slate-500 pt-1">
              <span>{language === 'kn' ? 'ಮಿತಿ ಗಡಿ:' : 'Threshold:'}</span>
              <span className="font-mono font-semibold text-slate-700">&gt; {tempThreshold}°C</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-tight">
              {t('tempThresholdExplain')}
            </p>
          </div>

          {/* 2. Humidity Monitor */}
          <div
            className={`bg-white rounded-2xl p-5 border shadow-xs transition-all ${
              isHumidityTriggered ? 'border-blue-300 ring-2 ring-blue-500/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg ${
                    isHumidityTriggered ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-slate-900">
                  {language === 'kn' ? 'ತೇವಾಂಶ' : 'Humidity'}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isHumidityTriggered
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isHumidityTriggered ? 'TRIGGERED' : 'NORMAL'}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-500">{language === 'kn' ? 'ಪ್ರಸ್ತುತ:' : 'Current:'}</span>
              <span className="text-xl font-bold font-mono text-slate-900">{simHumidity}%</span>
            </div>
            <div className="flex items-baseline justify-between text-xs text-slate-500 pt-1">
              <span>{language === 'kn' ? 'ಮಿತಿ ಗಡಿ:' : 'Threshold:'}</span>
              <span className="font-mono font-semibold text-slate-700">&gt; {humidityThreshold}%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-tight">
              {t('humidityThresholdExplain')}
            </p>
          </div>

          {/* 3. Rainfall Monitor */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <CloudRain className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-slate-900">
                  {language === 'kn' ? '24ಗಂ ಮಳೆ' : '24h Rainfall'}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                NORMAL
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-500">{language === 'kn' ? 'ಪ್ರಸ್ತುತ:' : 'Current:'}</span>
              <span className="text-xl font-bold font-mono text-slate-900">{weather.rainfall} mm</span>
            </div>
            <div className="flex items-baseline justify-between text-xs text-slate-500 pt-1">
              <span>{language === 'kn' ? 'ಮಿತಿ ಗಡಿ:' : 'Threshold:'}</span>
              <span className="font-mono font-semibold text-slate-700">&gt; {rainThreshold} mm</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-tight">
              {t('rainfallThresholdExplain')}
            </p>
          </div>

          {/* 4. Wind Speed Monitor */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-slate-900">
                  {language === 'kn' ? 'ಗಾಳಿಯ ವೇಗ' : 'Wind Speed'}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                NORMAL
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-xs text-slate-500">{language === 'kn' ? 'ಪ್ರಸ್ತುತ:' : 'Current:'}</span>
              <span className="text-xl font-bold font-mono text-slate-900">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-baseline justify-between text-xs text-slate-500 pt-1">
              <span>{language === 'kn' ? 'ಮಿತಿ ಗಡಿ:' : 'Threshold:'}</span>
              <span className="font-mono font-semibold text-slate-700">&gt; {windThreshold} km/h</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100 leading-tight">
              {language === 'kn'
                ? 'ಬಾಳೆ ಮತ್ತು ತೆಂಗಿನ ತೋಟಗಳಲ್ಲಿ ಗಾಳಿಯ ರಕ್ಷಣಾ ಕ್ರಮಗಳಿಗಾಗಿ ಎಚ್ಚರಿಕೆ.'
                : 'Protects fragile crops and sheds against sudden microburst gusts.'}
            </p>
          </div>
        </div>

        {/* Interactive Threshold & Simulation Panel */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-green-600" />
                <span>{language === 'kn' ? 'ಮಿತಿ ಸಂರಚನೆ ಮತ್ತು ಪರೀಕ್ಷೆ' : 'Threshold Sensitivity & Live Simulator'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'kn'
                  ? 'ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಬೆಳೆ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಎಚ್ಚರಿಕೆ ಮಿತಿಗಳನ್ನು ಬದಲಾಯಿಸಿ ಪರೀಕ್ಷಿಸಿ.'
                  : 'Adjust trigger cutoffs to customize alerts for your specific crops (e.g. floriculture vs hardy cereals).'}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'kn' ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset Defaults'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: High Temperature Threshold */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">
                  {language === 'kn' ? 'ಗರಿಷ್ಠ ತಾಪಮಾನ ಮಿತಿ:' : 'High Temperature Threshold:'}
                </label>
                <span className="font-mono font-bold text-amber-700 text-sm">{tempThreshold}°C</span>
              </div>
              <input
                type="range"
                min="28"
                max="40"
                step="1"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(Number(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>28°C (Sensitive)</span>
                <span>32°C (Default)</span>
                <span>40°C (Arid)</span>
              </div>
            </div>

            {/* Slider 2: High Humidity Threshold */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">
                  {language === 'kn' ? 'ಗರಿಷ್ಠ ತೇವಾಂಶ ಮಿತಿ:' : 'High Humidity Threshold:'}
                </label>
                <span className="font-mono font-bold text-blue-700 text-sm">{humidityThreshold}%</span>
              </div>
              <input
                type="range"
                min="65"
                max="90"
                step="1"
                value={humidityThreshold}
                onChange={(e) => setHumidityThreshold(Number(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>65% (Fungus alert)</span>
                <span>75% (Default)</span>
                <span>90% (Saturated)</span>
              </div>
            </div>
          </div>

          {/* Test Live Values */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'kn' ? 'ಪರೀಕ್ಷಾರ್ಥ ಸಂವೇದಕ ನಿಯಂತ್ರಣ' : 'Interactive Value Testing'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {language === 'kn' ? 'ತಾಪಮಾನ ಪರೀಕ್ಷಿಸಿ:' : 'Simulate Temperature (°C):'}
                </label>
                <input
                  type="number"
                  value={simTemp}
                  onChange={(e) => setSimTemp(Number(e.target.value))}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {language === 'kn' ? 'ತೇವಾಂಶ ಪರೀಕ್ಷಿಸಿ:' : 'Simulate Humidity (%):'}
                </label>
                <input
                  type="number"
                  value={simHumidity}
                  onChange={(e) => setSimHumidity(Number(e.target.value))}
                  className="w-full p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Assistance Hotline Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            {t('emergencyHotlines')}
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            {language === 'kn'
              ? 'ತೀವ್ರ ಬೆಳೆ ರೋಗ, ಆಲಿಕಲ್ಲು ಮಳೆ ಅಥವಾ ಹವಾಮಾನ ನಷ್ಟದ ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣವೇ ಅಧಿಕೃತ ಕೃಷಿ ಸಹಾಯವಾಣಿ ಸಂಪರ್ಕಿಸಿ.'
              : 'In case of severe pest damage or microclimate crop loss, contact designated agronomists directly.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-green-600 text-white rounded-lg shrink-0 mt-0.5">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{t('kisanCallCenter')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'kn' ? 'ಕೇಂದ್ರ ಸರ್ಕಾರದ 22 ಭಾಷೆಗಳ ಉಚಿತ ಕೃಷಿ ಸಹಾಯವಾಣಿ' : 'Govt of India free 22-language toll-free agronomist hotline'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{t('raithaKendra')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'kn' ? 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಕೃಷಿ ನಿರ್ದೇಶನಾಲಯ ಸಹಾಯವಾಣಿ' : 'Karnataka State Dept of Agriculture Technical Desk'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
