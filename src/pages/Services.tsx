import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Stethoscope, ShieldCheck, Activity, Bed, Baby, X, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const Services: React.FC = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const servicesList: ServiceItem[] = [
    { id: 'diabetes', icon: HeartPulse, color: 'text-brand-primary bg-brand-primary/10 dark:bg-slate-800' },
    { id: 'consultation', icon: Stethoscope, color: 'text-brand-primary bg-brand-primary/10 dark:bg-slate-800' },
    { id: 'laboratory', icon: ShieldCheck, color: 'text-brand-primary bg-brand-primary/10 dark:bg-slate-800' },
    { id: 'daycare', icon: Bed, color: 'text-brand-primary bg-brand-primary/10 dark:bg-slate-800' },
    { id: 'pediatrics', icon: Baby, color: 'text-brand-primary bg-brand-primary/10 dark:bg-slate-800' },
    { id: 'diagnostics', icon: Activity, color: 'text-brand-primary bg-brand-primary/10 dark:bg-slate-800' }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-24 sm:pt-32 pb-16 sm:pb-24 transition-colors duration-300">

      {/* Soft overlay gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-slate-900/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 sm:space-y-14">

        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse shrink-0" />
            <span className="text-xs font-bold text-brand-primary uppercase font-display">{t('services.pageBadge')}</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-snug">
            {t('services.title')}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* --- SERVICES GRID (Compact App List Rows on Mobile, 2/3-Col Cards on Tablet/Desktop) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-8">
          {servicesList.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className="medical-card glossy-shine group relative p-4 sm:p-6 md:p-8 hover:shadow-medical-hover hover:border-brand-primary/25 cursor-pointer flex flex-row md:flex-col items-start md:items-stretch justify-between gap-3.5 md:gap-0 min-h-0 md:min-h-[280px] transition-all duration-300 md:hover:-translate-y-1.5 text-left"
              >
                <div className="flex flex-row md:flex-col items-start gap-3.5 md:gap-0 flex-1 min-w-0">
                  <div className={`w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-2xl ${service.color} md:mb-6 flex items-center justify-center border border-slate-100 dark:border-slate-700/60`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2.5 group-hover:text-brand-primary transition-colors leading-snug">
                      {t(`services.items.${service.id}.title`)}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed line-clamp-2 md:line-clamp-none">
                      {t(`services.items.${service.id}.desc`)}
                    </p>
                  </div>
                </div>

                {/* Mobile Chevron */}
                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 self-center md:hidden" />

                {/* Desktop Bottom Action Label */}
                <div className="hidden md:flex pt-5 border-t border-slate-100 dark:border-slate-800/80 mt-5 justify-between items-center text-xs font-bold uppercase text-slate-500 group-hover:text-brand-primary transition-colors">
                  <span>{t('services.exploreGuidelines')}</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- APPOINTMENT DIRECTIVES BANNER --- */}
        <div className="medical-card glossy-shine p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6 text-left w-full overflow-hidden">
          <div className="space-y-2 max-w-xl z-10">
            <h3 className="font-display font-bold text-lg sm:text-2xl text-slate-900 dark:text-white leading-snug">
              {t('services.bannerTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
              {t('services.bannerSub')}
            </p>
          </div>
          <Link
            to="/contact"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm transition-all duration-200 flex items-center justify-center z-10 shrink-0 text-center"
          >
            {t('nav.bookNow')}
          </Link>
        </div>

      </div>

      {/* --- CLINICAL DETAILS MODAL (Slide-up Bottom Sheet on Mobile, Centered Card on Desktop) --- */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="medical-card glossy-shine relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-t-3xl rounded-b-none sm:rounded-[24px] p-6 sm:p-8 shadow-2xl z-10 flex flex-col justify-between text-left"
            >
              {/* Mobile drag handle indicator */}
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 sm:space-y-5 pr-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/15">
                  <HeartPulse className="w-3.5 h-3.5 text-brand-primary animate-pulse shrink-0" />
                  <span className="text-[11px] font-bold text-brand-primary uppercase font-display">{t('nav.brand')}</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                    {t(`services.items.${selectedService}.title`)}
                  </h2>
                  <div className="h-[2px] w-16 bg-brand-primary rounded-full" />
                </div>

                <div className="space-y-3.5 font-sans text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  <p className="font-bold text-brand-primary uppercase text-[11px]">{t('services.clinicalOverview')}</p>
                  <p>{t(`services.items.${selectedService}.full`)}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                    {t('services.disclaimer')}
                  </p>
                </div>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800 mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 pb-[env(safe-area-inset-bottom)]">
                <Link
                  to="/contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3.5 px-4 rounded-xl font-display font-bold text-xs uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm text-center flex items-center justify-center transition-all duration-200"
                >
                  {t('services.bookService')}
                </Link>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3 px-4 rounded-xl font-display font-bold text-xs uppercase text-slate-600 dark:text-slate-400 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-center flex items-center justify-center cursor-pointer transition-colors"
                >
                  {t('services.close')}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
