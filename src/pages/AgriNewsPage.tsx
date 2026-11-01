import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  X,
  Share2,
  Bookmark,
  Info,
  ExternalLink,
  Tag,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_AGRI_NEWS } from '../services/newsService';
import { AgriNewsArticle } from '../types';

export const AgriNewsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<AgriNewsArticle | null>(null);

  const categories = [
    { key: 'All', labelEn: 'All Updates', labelKn: 'ಎಲ್ಲಾ ಸುದ್ದಿಗಳು' },
    { key: 'Schemes', labelEn: 'Govt Schemes', labelKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' },
    { key: 'Technology', labelEn: 'Crop Technology', labelKn: 'ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ' },
    { key: 'Markets', labelEn: 'Market Intelligence', labelKn: 'ಮಾರುಕಟ್ಟೆ ವರದಿ' },
  ];

  const filteredArticles = SAMPLE_AGRI_NEWS.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                {t('navAgriNews')}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{t('updatedJustNow')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('agriNewsTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('agriNewsSubtitle')}
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 max-w-sm flex items-start gap-2">
            <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                {language === 'kn' ? 'ಮಾದರಿ ಸುದ್ದಿ ಮಾಹಿತಿ' : 'Curated Agricultural Bulletin'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'kn' ? 'ನೈಜ ಸಮಯದಲ್ಲಿ ಕೃಷಿ ವಾರ್ತೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಲು ಸಿದ್ಧವಾಗಿದೆ.' : 'Sample articles until live Agmarknet / PIB API connection is activated.'}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#16A34A] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {language === 'kn' ? cat.labelKn : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Article Image Container with Zero-Broken-Image Resilience */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={language === 'kn' ? article.titleKn : article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback gradient container if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      {language === 'kn' ? article.categoryKn : article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                    {language === 'kn' ? article.titleKn : article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {language === 'kn' ? article.summaryKn : article.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                  {article.source}
                </span>

                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-800 transition-colors cursor-pointer"
                >
                  <span>{t('readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-150">
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <img
                  src={activeArticle.imageUrl}
                  alt={language === 'kn' ? activeArticle.titleKn : activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-4">
                  <span className="bg-[#16A34A] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {language === 'kn' ? activeArticle.categoryKn : activeArticle.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-700">{activeArticle.source}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {language === 'kn' ? activeArticle.titleKn : activeArticle.title}
                </h2>

                <p className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                  {language === 'kn' ? activeArticle.summaryKn : activeArticle.summary}
                </p>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                  {language === 'kn' ? activeArticle.contentKn : activeArticle.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">KrishiSahayak Agriculture Desk</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
