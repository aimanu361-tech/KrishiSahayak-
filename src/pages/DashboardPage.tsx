import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  SunMedium,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Compass,
  ArrowRight,
  Info,
  Calendar,
  Store,
  Newspaper,
  TrendingUp,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  getCurrentWeather,
  getSevenDayForecast,
  WEATHER_THRESHOLDS,
} from '../services/weatherService';
import { SAMPLE_MANDI_DATA } from '../services/mandiService';
import { SAMPLE_CROP_ALERTS } from '../services/alertService';
import { detectBrowserLocation } from '../services/locationService';

export const DashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, updateLocation } = useAuth();

  const [currentWeather, setCurrentWeather] = useState(() => getCurrentWeather(user?.village));
  const [forecast] = useState(() => getSevenDayForecast());
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);

  // Temperature threshold check (default 32°C)
  const isHighTemp = currentWeather.temperature > WEATHER_THRESHOLDS.HIGH_TEMP_THRESHOLD;
  // Humidity threshold check (default 75%)
  const isHighHumidity = currentWeather.humidity > WEATHER_THRESHOLDS.HIGH_HUMIDITY_THRESHOLD;

  // Icon mapping helper
  const renderWeatherIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'SunMedium':
        return <SunMedium className={`${className} text-amber-500`} />;
      case 'Cloud':
        return <Cloud className={`${className} text-slate-500`} />;
      case 'CloudRain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={`${className} text-cyan-500`} />;
      case 'CloudLightning':
        return <CloudLightning className={`${className} text-purple-600`} />;
      default:
        return <SunMedium className={`${className} text-amber-500`} />;
    }
  };

  const handleRefreshLocation = async () => {
    setIsUpdatingLocation(true);
    setLocationNotice(null);
    try {
      const loc = await detectBrowserLocation();
      updateLocation(loc.latitude, loc.longitude, loc.fullAddress, loc.village);
      setLocationNotice(
        language === 'kn' ? 'ಸ್ಥಳ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ!' : 'Location updated with live GPS!'
      );
    } catch {
      setLocationNotice(
        language === 'kn' ? 'ಸ್ಥಳ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ' : 'Could not detect browser location'
      );
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Farmer Welcome & Location Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                {t('farmerDashboard')}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{t('updatedJustNow')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('welcomeFarmer')}, {user?.name || 'Farmer Patil'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-green-600" />
                <span className="font-semibold">{user?.village || 'Pandavapura, Mandya'}</span>
              </div>
              {user?.latitude && user?.longitude && (
                <div className="flex items-center gap-1 font-mono text-slate-500 text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                  <span>GPS: {user.latitude.toFixed(4)}, {user.longitude.toFixed(4)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRefreshLocation}
              disabled={isUpdatingLocation}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-60"
            >
              <Compass className={`w-3.5 h-3.5 text-green-600 ${isUpdatingLocation ? 'animate-spin' : ''}`} />
              <span>{isUpdatingLocation ? t('detectingLocation') : t('detectMyLocation')}</span>
            </button>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl shadow-xs transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t('navMarketplace')}</span>
            </Link>
          </div>
        </div>

        {locationNotice && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center justify-between">
            <span>{locationNotice}</span>
            <button onClick={() => setLocationNotice(null)} className="text-blue-600 font-bold ml-2">×</button>
          </div>
        )}

        {/* SECTION 1: Weather Overview Cards */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <SunMedium className="w-5 h-5 text-green-600" />
              <span>{t('weatherOverview')}</span>
            </h2>
            <span className="text-xs text-slate-500">
              {user?.village ? user.village.split(',')[0] : 'Karnataka Station'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {/* Card 1: Current Temperature */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">{t('currentTemperature')}</span>
                <div className={`p-1.5 rounded-lg ${isHighTemp ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  <Thermometer className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {currentWeather.temperature}
                </span>
                <span className="text-sm font-semibold text-slate-500">°C</span>
              </div>
              <p className={`text-[11px] font-semibold mt-1 ${isHighTemp ? 'text-amber-700' : 'text-green-700'}`}>
                {isHighTemp ? '🔥 ' + (language === 'kn' ? 'ಹೆಚ್ಚಿನ ತಾಪಮಾನ' : 'High Heat Warning') : (language === 'kn' ? 'ಸಾಮಾನ್ಯ' : 'Normal')}
              </p>
            </div>

            {/* Card 2: Humidity */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">{t('humidity')}</span>
                <div className={`p-1.5 rounded-lg ${isHighHumidity ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {currentWeather.humidity}
                </span>
                <span className="text-sm font-semibold text-slate-500">%</span>
              </div>
              <p className={`text-[11px] font-semibold mt-1 ${isHighHumidity ? 'text-blue-700' : 'text-slate-600'}`}>
                {isHighHumidity ? '💧 ' + (language === 'kn' ? 'ಹೆಚ್ಚಿನ ತೇವಾಂಶ' : 'High Humidity') : (language === 'kn' ? 'ಸೂಕ್ತ' : 'Optimal')}
              </p>
            </div>

            {/* Card 3: Wind Speed */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">{t('windSpeed')}</span>
                <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                  <Wind className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {currentWeather.windSpeed}
                </span>
                <span className="text-sm font-semibold text-slate-500">km/h</span>
              </div>
              <p className="text-[11px] text-teal-700 font-semibold mt-1">
                {language === 'kn' ? 'ಮೃದುವಾದ ಗಾಳಿ' : 'Gentle Breeze'}
              </p>
            </div>

            {/* Card 4: Rainfall */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">{t('rainfall')}</span>
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <CloudRain className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {currentWeather.rainfall}
                </span>
                <span className="text-sm font-semibold text-slate-500">mm</span>
              </div>
              <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                {language === 'kn' ? 'ಕಡಿಮೆ ಮಳೆ' : 'Light Showers'}
              </p>
            </div>

            {/* Card 5: Weather Condition */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">{t('weatherCondition')}</span>
                <div className="p-1.5 rounded-lg bg-amber-50">
                  {renderWeatherIcon(currentWeather.iconName, 'w-4 h-4')}
                </div>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {language === 'kn' ? 'ಭಾಗಶಃ ಮೋಡ' : currentWeather.condition}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'kn' ? 'ಮುಂಜಾನೆ ತಂಪಾದ ಹವೆ' : 'Good field conditions'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Public Weather Dashboard (With 32°C Temperature Threshold Alert) */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-amber-600" />
                <span>{t('publicWeatherTitle')}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{t('publicWeatherDesc')}</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
              <span className="text-slate-500">{t('tempThresholdLabel')}:</span>
              <span className="font-bold text-slate-800 font-mono">{WEATHER_THRESHOLDS.HIGH_TEMP_THRESHOLD}°C</span>
            </div>
          </div>

          {/* Warning banner when temperature exceeds 32°C / Normal when not */}
          {isHighTemp ? (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  {language === 'kn' ? 'ಹೆಚ್ಚಿನ ತಾಪಮಾನದ ಮುನ್ಸೂಚನೆ' : 'High Temperature Threshold Exceeded'}
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {t('highTempWarning', {
                    temp: currentWeather.temperature,
                    threshold: WEATHER_THRESHOLDS.HIGH_TEMP_THRESHOLD,
                  })}
                </p>
                <div className="mt-2 text-[11px] text-amber-900 font-medium">
                  • {language === 'kn' ? 'ಶಿಫಾರಸು: ಬೆಳಿಗ್ಗೆ 6:00 - 8:30 ರೊಳಗೆ ಹನಿ ನೀರಾವರಿ ಮಾಡಿ.' : 'Recommended: Run drip irrigation in the early morning.'}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  {language === 'kn' ? 'ಸಾಮಾನ್ಯ ತಾಪಮಾನ ಸ್ಥಿತಿ' : 'Normal Temperature Status'}
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  {t('normalTempStatus', {
                    temp: currentWeather.temperature,
                    threshold: WEATHER_THRESHOLDS.HIGH_TEMP_THRESHOLD,
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block">{language === 'kn' ? 'ಗಾಳಿಯ ಗುಣಮಟ್ಟ' : 'Air Quality (AQI)'}</span>
              <span className="font-bold text-slate-800 text-sm font-mono">48 (Good / ಉತ್ತಮ)</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block">{language === 'kn' ? 'ಯುವಿ ಕಿರಣಗಳ ಸೂಚಿ' : 'UV Index'}</span>
              <span className="font-bold text-slate-800 text-sm font-mono">6 (Moderate / ಮಧ್ಯಮ)</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block">{language === 'kn' ? 'ಮಬ್ಬು / ಇಬ್ಬನಿ ಬಿಂದು' : 'Dew Point'}</span>
              <span className="font-bold text-slate-800 text-sm font-mono">21.8°C</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 block">{language === 'kn' ? 'ವಾತಾವರಣದ ಒತ್ತಡ' : 'Barometric Pressure'}</span>
              <span className="font-bold text-slate-800 text-sm font-mono">1012 hPa</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Farmer Weather Dashboard (7-Day Forecast + High-Humidity Warning) */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>{t('farmerWeatherTitle')}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{t('farmerWeatherDesc')}</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
              <span className="text-slate-500">{t('humidityThresholdLabel')}:</span>
              <span className="font-bold text-slate-800 font-mono">{WEATHER_THRESHOLDS.HIGH_HUMIDITY_THRESHOLD}%</span>
            </div>
          </div>

          {/* High-Humidity Warning Banner (threshold > 75%) */}
          {isHighHumidity ? (
            <div className="p-4 bg-blue-50 border border-blue-300 rounded-xl flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                  {language === 'kn' ? 'ಅಧಿಕ ತೇವಾಂಶ ಎಚ್ಚರಿಕೆ' : 'High Humidity Threshold Alert (>75%)'}
                </h4>
                <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                  {t('highHumidityWarning', {
                    hum: currentWeather.humidity,
                    threshold: WEATHER_THRESHOLDS.HIGH_HUMIDITY_THRESHOLD,
                  })}
                </p>
                <p className="text-[11px] text-blue-800 font-medium mt-1.5">
                  • {language === 'kn' ? 'ರೋಗ ನಿಯಂತ್ರಣ: ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಬೂದಿ ರೋಗ ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿ.' : 'Agronomy Tip: Scout crops for downy mildew spores; improve field ridge aeration.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {t('normalHumidityStatus', {
                  hum: currentWeather.humidity,
                  threshold: WEATHER_THRESHOLDS.HIGH_HUMIDITY_THRESHOLD,
                })}
              </span>
            </div>
          )}

          {/* 7-Day Forecast Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {forecast.map((day, idx) => {
              const isToday = idx === 0;
              const hasHighHumidity = day.humidity > WEATHER_THRESHOLDS.HIGH_HUMIDITY_THRESHOLD;
              return (
                <div
                  key={day.day}
                  className={`p-3.5 rounded-xl border transition-all text-center flex flex-col justify-between ${
                    isToday
                      ? 'bg-green-50/70 border-green-300 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={`font-bold ${isToday ? 'text-green-800' : 'text-slate-800'}`}>
                        {language === 'kn' ? day.dayKn : day.day}
                      </span>
                      <span className="text-[10px] text-slate-400">{day.date}</span>
                    </div>

                    <div className="my-2.5 flex justify-center">
                      {renderWeatherIcon(day.iconName, 'w-8 h-8')}
                    </div>

                    <p className="text-[11px] font-medium text-slate-600 line-clamp-1 mb-2">
                      {language === 'kn' ? day.conditionKn : day.condition}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    {/* Temperature */}
                    <div className="flex justify-between items-center font-mono">
                      <span className="font-bold text-slate-900">{day.maxTemp}°</span>
                      <span className="text-slate-400">{day.minTemp}°</span>
                    </div>

                    {/* Humidity */}
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">{t('humidity')}</span>
                      <span
                        className={`font-semibold font-mono ${
                          hasHighHumidity ? 'text-blue-700' : 'text-slate-600'
                        }`}
                      >
                        {day.humidity}%
                      </span>
                    </div>

                    {/* Rain Prob */}
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">{language === 'kn' ? 'ಮಳೆ' : 'Rain'}</span>
                      <span className="font-semibold text-indigo-600 font-mono">{day.rainProbability}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Quick Action Hub (Marketplace Snapshot + Crop Alerts Snapshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Marketplace Mini Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{t('marketplaceTitle')}</h3>
                    <p className="text-xs text-slate-500">{language === 'kn' ? 'ಇಂದಿನ ಮಂಡಿ ಬೆಲೆಗಳು' : 'APMC daily wholesale spot rates'}</p>
                  </div>
                </div>
                <Link
                  to="/marketplace"
                  className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
                >
                  {t('viewDetails')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {SAMPLE_MANDI_DATA.slice(0, 3).map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">
                        {language === 'kn' ? item.cropNameKn : item.cropName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {language === 'kn' ? item.marketNameKn : item.marketName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 font-mono text-sm">
                        ₹{item.modalPrice.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-slate-400">{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{t('disclaimer')}</span>
              <Link to="/marketplace" className="text-green-600 font-semibold hover:underline">
                {t('all')} →
              </Link>
            </div>
          </div>

          {/* Active Alerts Mini Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{t('cropAlertsTitle')}</h3>
                    <p className="text-xs text-slate-500">{language === 'kn' ? 'ತುರ್ತು ಕೃಷಿ ಎಚ್ಚರಿಕೆಗಳು' : 'Actionable disease & heat mitigation'}</p>
                  </div>
                </div>
                <Link
                  to="/crop-alerts"
                  className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
                >
                  {t('viewDetails')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {SAMPLE_CROP_ALERTS.slice(0, 2).map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 line-clamp-1">
                        {language === 'kn' ? alert.titleKn : alert.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {language === 'kn' ? alert.messageKn : alert.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{language === 'kn' ? '24/7 ಸಕ್ರಿಯ ನಿಗಾವಣೆ' : 'AlertGuard Live Monitoring'}</span>
              <Link to="/alertguard" className="text-green-600 font-semibold hover:underline">
                {t('navAlertGuard')} →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
