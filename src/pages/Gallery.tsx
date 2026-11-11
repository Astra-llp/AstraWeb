import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, X, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: number;
  category: 'diagnostics' | 'labs' | 'suites';
  image: string;
}

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'diagnostics' | 'labs' | 'suites'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Strictly the 4 unique clinic facilities (front, reception, lab waiting area, consultation lounge)
  const galleryItems: GalleryItem[] = [
    { id: 0, category: 'suites', image: '/front.jpg' },
    { id: 1, category: 'suites', image: '/reception.jpg' },
    { id: 2, category: 'labs', image: '/waiting-area.jpg' },
    { id: 3, category: 'diagnostics', image: '/waiting-area-consultation.jpg' }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-24 sm:pt-32 pb-16 sm:pb-24 transition-colors duration-300">

      {/* Soft overlay gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-slate-900/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-10 sm:space-y-12">

        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse shrink-0" />
            <span className="text-xs font-bold text-brand-primary uppercase font-display">{t('gallery.badge')}</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-snug">
            {t('gallery.title')}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* --- DYNAMIC FILTER TRIGGERS (Single horizontal scrollable strip on mobile) --- */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center gap-2 sm:gap-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {[
            { code: 'all', label: t('gallery.filterAll') },
            { code: 'suites', label: t('gallery.filterEntrance') },
            { code: 'labs', label: t('gallery.filterLabs') },
            { code: 'diagnostics', label: t('gallery.filterDiagnostics') }
          ].map((btn) => (
            <button
              key={btn.code}
              onClick={() => setFilter(btn.code as 'all' | 'diagnostics' | 'labs' | 'suites')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase whitespace-nowrap shrink-0 transition-all duration-200 border cursor-pointer ${
                filter === btn.code
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                  : 'bg-white dark:bg-brand-cardDark text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC RESPONSIVE IMAGE GRID (Clean 2x2 showcase, no overlay tags) --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const title = t(`gallery.items.${item.id}.title`);
              const desc = t(`gallery.items.${item.id}.desc`);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setLightboxIndex(item.id)}
                  className="medical-card glossy-shine group cursor-pointer transition-all duration-300 overflow-hidden rounded-2xl shadow-medical hover:shadow-medical-hover flex flex-col bg-white dark:bg-brand-cardDark"
                >
                  {/* Unobstructed photo with zero pill tags */}
                  <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                      <Eye className="w-4 h-4 text-brand-primary" />
                    </div>
                  </div>

                  {/* Clean caption below the photo */}
                  <div className="p-5 sm:p-6 space-y-1.5 text-left flex-1 flex flex-col justify-center">
                    <h3 className="font-display font-bold text-base sm:text-lg leading-snug text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* --- BOTTOM BANNER --- */}
        <div className="medical-card glossy-shine p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-snug">
              {t('gallery.visitHeading')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
              {t('gallery.visitAddress')}
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm transition-all duration-200 shrink-0 flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{t('gallery.visitCta')}</span>
          </Link>
        </div>

      </div>

      {/* --- CLINICAL LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const activeItem = galleryItems.find(item => item.id === lightboxIndex);
          if (!activeItem) return null;

          const title = t(`gallery.items.${activeItem.id}.title`);
          const desc = t(`gallery.items.${activeItem.id}.desc`);

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 bg-white dark:bg-brand-cardDark rounded-3xl shadow-2xl p-4 sm:p-6 flex flex-col space-y-4 text-left"
              >
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors cursor-pointer z-20"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full h-56 sm:h-[420px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
                  <img
                    src={activeItem.image}
                    alt={title}
                    className="w-full h-full object-contain sm:object-cover object-center"
                  />
                </div>

                <div className="space-y-1.5 px-2 text-slate-800 dark:text-slate-200">
                  <span className="text-[11px] font-semibold text-brand-primary block">
                    {t('gallery.tourLabel')}
                  </span>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                    {title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    {desc}
                  </p>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
};
