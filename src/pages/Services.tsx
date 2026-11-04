import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Stethoscope, ShieldCheck, Activity, Bed, Baby, X, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 transition-colors duration-300">
      
      {/* Soft overlay gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-slate-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-brand-primary uppercase font-display">Specialized Panels</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            {t('services.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className="medical-card glossy-shine group relative p-8 hover:shadow-medical-hover hover:border-brand-primary/25 cursor-pointer flex flex-col justify-between min-h-[280px] transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Clean Icon frame */}
                  <div className={`w-12 h-12 rounded-2xl ${service.color} mb-6 flex items-center justify-center border border-slate-100 dark:border-slate-700/60`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2.5 group-hover:text-brand-primary transition-colors">
                    {t(`services.items.${service.id}.title`)}
                  </h3>

                  {/* Service Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    {t(`services.items.${service.id}.desc`)}
                  </p>
                </div>

                {/* Explore Action Label */}
                <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 mt-5 flex justify-between items-center text-xs font-bold tracking-wider uppercase text-slate-500 group-hover:text-brand-primary transition-colors">
                  <span>Explore Guidelines</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- APPOINTMENT DIRECTIVES BANNER --- */}
        <div className="medical-card glossy-shine p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 text-left rtl:text-right w-full overflow-hidden">
          <div className="space-y-2 max-w-xl z-10">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
              Looking to consult with our medical panel?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
              Our automated laboratory desks run smoothly for all metabolic and thyroid panels. Dial our clinical support coordinators or inquire online.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm transition-all duration-200 flex items-center justify-center z-10"
          >
            {t('nav.bookNow')}
          </Link>
        </div>

      </div>

      {/* --- CLINICAL DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Soft backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="medical-card glossy-shine relative w-full max-w-xl p-8 shadow-xl overflow-hidden z-10 flex flex-col justify-between text-left rtl:text-right"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-5">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/15">
                  <HeartPulse className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider text-brand-primary uppercase font-display">Astra Standard Care</span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white leading-tight">
                    {t(`services.items.${selectedService}.title`)}
                  </h2>
                  <div className="h-[2px] w-16 bg-brand-primary rounded-full" />
                </div>

                {/* Protocol text */}
                <div className="space-y-3.5 font-sans text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  <p className="font-bold text-brand-primary uppercase tracking-wider text-[10px]">Clinical Overview</p>
                  <p>{t(`services.items.${selectedService}.full`)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                    *Clinical guidelines follow standard local primary health indices. Consult our senior general practitioner for diagnostic analysis.
                  </p>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm text-center flex items-center justify-center transition-all duration-200"
                >
                  {t('services.bookService')}
                </Link>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-400 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-center flex items-center justify-center cursor-pointer transition-colors"
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
