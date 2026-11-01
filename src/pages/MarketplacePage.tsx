import React, { useState, useMemo } from 'react';
import {
  Search,
  Store,
  TrendingUp,
  TrendingDown,
  Minus,
  SlidersHorizontal,
  Info,
  Calendar,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_MANDI_DATA } from '../services/mandiService';

export const MarketplacePage: React.FC = () => {
  const { t, language } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<'modalPrice' | 'cropName'>('modalPrice');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = [
    { key: 'All', labelEn: 'All Crops', labelKn: 'ಎಲ್ಲಾ ಬೆಳೆಗಳು' },
    { key: 'Vegetables', labelEn: 'Vegetables', labelKn: 'ತರಕಾರಿಗಳು' },
    { key: 'Cereals', labelEn: 'Cereals & Grains', labelKn: 'ಧಾನ್ಯಗಳು' },
    { key: 'Cash Crops', labelEn: 'Cash Crops', labelKn: 'ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು' },
    { key: 'Pulses', labelEn: 'Pulses & Legumes', labelKn: 'ಕಾಳುಗಳು / ದ್ವಿದಳ ಧಾನ್ಯ' },
  ];

  const filteredMandi = useMemo(() => {
    return SAMPLE_MANDI_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.cropName.toLowerCase().includes(q) ||
        item.cropNameKn.includes(q) ||
        item.marketName.toLowerCase().includes(q) ||
        item.marketNameKn.includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.districtKn.includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortField === 'modalPrice') {
        return sortOrder === 'asc' ? a.modalPrice - b.modalPrice : b.modalPrice - a.modalPrice;
      } else {
        return sortOrder === 'asc'
          ? a.cropName.localeCompare(b.cropName)
          : b.cropName.localeCompare(a.cropName);
      }
    });
  }, [selectedCategory, searchTerm, sortField, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Title & Demo Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                {t('navMarketplace')}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{t('updatedJustNow')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('marketplaceTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('marketplaceSubtitle')}
            </p>
          </div>

          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-sm">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{t('disclaimer')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'kn'
                    ? 'ಬೆಳೆ, ಮಂಡಿ ಅಥವಾ ಜಿಲ್ಲೆಯ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ...'
                    : 'Search by crop, mandi, or district (e.g. Tomato, Mandya)...'
                }
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-green-600 focus:outline-none"
              />
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                {language === 'kn' ? 'ವಿಂಗಡಿಸಿ:' : 'Sort:'}
              </span>
              <button
                onClick={() => {
                  if (sortField === 'modalPrice') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('modalPrice');
                    setSortOrder('desc');
                  }
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                  sortField === 'modalPrice'
                    ? 'bg-green-50 text-green-700 border-green-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{language === 'kn' ? 'ಬೆಲೆ' : 'Price'}</span>
                <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {language === 'kn' ? cat.labelKn : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mandi Rates Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              {language === 'kn' ? 'ಎಪಿಎಂಸಿ ದೈನಂದಿನ ಸಗಟು ದರಗಳು' : 'APMC Mandi Quotations'} (
              {filteredMandi.length})
            </h3>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>25 Oct 2026</span>
            </span>
          </div>

          {filteredMandi.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold">{t('noMandiFound')}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-xs text-green-700 font-bold hover:underline"
              >
                {language === 'kn' ? 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ' : 'Clear search filters'}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">{t('cropName')}</th>
                    <th className="py-3 px-4">{t('marketName')}</th>
                    <th className="py-3 px-4 font-mono">{t('minPrice')}</th>
                    <th className="py-3 px-4 font-mono">{t('maxPrice')}</th>
                    <th className="py-3 px-4 font-mono font-bold text-slate-900">{t('modalPrice')}</th>
                    <th className="py-3 px-4">{t('unit')}</th>
                    <th className="py-3 px-4">{t('priceTrend')}</th>
                    <th className="py-3 px-4 text-right sm:pr-6">{t('date')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMandi.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Crop Name */}
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span>{language === 'kn' ? row.cropNameKn : row.cropName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {language === 'kn' ? row.categoryKn : row.category}
                          </span>
                        </div>
                      </td>

                      {/* Mandi & District */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <div>
                            <p className="font-medium">
                              {language === 'kn' ? row.marketNameKn : row.marketName}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {language === 'kn' ? row.districtKn : row.district}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Min Price */}
                      <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600">
                        ₹{row.minPrice.toLocaleString()}
                      </td>

                      {/* Max Price */}
                      <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600">
                        ₹{row.maxPrice.toLocaleString()}
                      </td>

                      {/* Modal Price (Key benchmark) */}
                      <td className="py-3.5 px-4 font-mono tabular-nums font-extrabold text-sm text-green-700">
                        ₹{row.modalPrice.toLocaleString()}
                      </td>

                      {/* Unit */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-medium">
                        {language === 'kn' ? row.unitKn : row.unit}
                      </td>

                      {/* Trend */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-mono text-xs font-semibold">
                          {row.priceTrend === 'up' && (
                            <>
                              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-green-700">+{row.changePercent}%</span>
                            </>
                          )}
                          {row.priceTrend === 'down' && (
                            <>
                              <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                              <span className="text-rose-700">{row.changePercent}%</span>
                            </>
                          )}
                          {row.priceTrend === 'stable' && (
                            <>
                              <Minus className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-500">0.0%</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 sm:pr-6 text-right whitespace-nowrap text-slate-500 text-[11px]">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
