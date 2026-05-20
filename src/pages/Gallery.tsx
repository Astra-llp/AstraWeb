import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, X, HeartPulse } from 'lucide-react';

interface GalleryItem {
  id: number;
  category: 'diagnostics' | 'labs' | 'suites';
  title: string;
  desc: string;
  metric: string;
  color: string;
}

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'diagnostics' | 'labs' | 'suites'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: 'labs',
      title: "Automated Biochemistry Lab",
      desc: "Fully integrated high-throughput analyzer line delivering biochemical profiles in minutes.",
      metric: "Roche Automated Chemistry",
      color: "bg-brand-primary/5 dark:bg-slate-850"
    },
    {
      id: 2,
      category: 'diagnostics',
      title: "Cardiac Diagnostic Suite",
      desc: "Multi-channel ECG and stress profiling bays with real-time cardiovascular telemetry.",
      metric: "12-Channel Telemetry System",
      color: "bg-brand-primary/5 dark:bg-slate-850"
    },
    {
      id: 3,
      category: 'suites',
      title: "Diabetology Consultation Room",
      desc: "Private executive suite designed for specialized metabolic and insulin advisory.",
      metric: "Diabetology Zone",
      color: "bg-brand-primary/5 dark:bg-slate-850"
    },
    {
      id: 4,
      category: 'diagnostics',
      title: "Ultrasound & Imaging Bay",
      desc: "High-resolution organ visualization and vascular blood flow mapping.",
      metric: "4D Doppler Ultrasound",
      color: "bg-brand-primary/5 dark:bg-slate-850"
    },
    {
      id: 5,
      category: 'labs',
      title: "Pathology Screening Desk",
      desc: "Computerized microscopic examination and blood-cell profiling panels.",
      metric: "Pathology Desk",
      color: "bg-brand-primary/5 dark:bg-slate-850"
    },
    {
      id: 6,
      category: 'suites',
      title: "VIP Patient Observation Lounge",
      desc: "Luxury post-diagnostic observation room featuring absolute comfort and medical assistance.",
      metric: "Observation Zone",
      color: "bg-brand-primary/5 dark:bg-slate-850"
    }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 transition-colors duration-300">
      
      {/* Soft overlay gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-slate-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-brand-primary uppercase font-display">Astra Visual Tour</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            {t('gallery.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-405 font-sans leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* --- DYNAMIC FILTER TRIGGERS --- */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            { code: 'all', label: t('gallery.filterAll') },
            { code: 'diagnostics', label: t('gallery.filterDiagnostics') },
            { code: 'labs', label: t('gallery.filterLabs') },
            { code: 'suites', label: t('gallery.filterSuites') }
          ].map(btn => (
            <button
              key={btn.code}
              onClick={() => setFilter(btn.code as 'all' | 'diagnostics' | 'labs' | 'suites')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                filter === btn.code
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm scale-102'
                  : 'bg-white dark:bg-brand-cardDark text-slate-600 dark:text-slate-350 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC RESPONSIVE IMAGE GRID --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setLightboxIndex(item.id)}
                className="medical-card glossy-shine group relative h-72 cursor-pointer transition-all duration-300 overflow-hidden"
              >
                {/* Clinical Clean Room Placeholder Area */}
                <div className={`absolute inset-0 ${item.color} flex flex-col justify-between p-7 group-hover:bg-brand-primary/10 transition-colors`}>
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded bg-brand-primary/10 border border-brand-primary/20 text-[9px] uppercase tracking-wider font-bold text-brand-primary">
                      {item.metric}
                    </span>
                    <HeartPulse className="w-5 h-5 text-brand-primary/30 group-hover:text-brand-primary/80 transition-colors" />
                  </div>

                  <div className="space-y-1.5 text-left rtl:text-right">
                    <h3 className="font-display font-bold text-lg leading-tight text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-450 dark:text-slate-400 font-sans leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Hover Lens Reveal Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-brand-primary/5 backdrop-blur-[2px] transition-all duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-brand-cardDark/90 border border-slate-100 dark:border-slate-700 shadow flex items-center justify-center text-brand-primary">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* --- CLINICAL LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const activeItem = galleryItems.find(item => item.id === lightboxIndex);
          if (!activeItem) return null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Blur backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              />

              {/* Lightbox container card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="medical-card glossy-shine relative w-full max-w-2xl overflow-hidden z-10 p-6 sm:p-8 flex flex-col space-y-6 text-left rtl:text-right text-slate-800 dark:text-white"
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer z-20"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Main Clinical Room Frame */}
                <div className={`h-56 sm:h-72 rounded-2xl ${activeItem.color} border border-slate-100 dark:border-slate-800 shadow-inner relative overflow-hidden flex items-center justify-center p-8`}>
                  <HeartPulse className="w-16 h-16 text-brand-primary/10 animate-pulse" />
                  <div className="absolute top-6 left-6 px-3 py-1 rounded bg-brand-primary/15 text-[10px] font-display font-bold tracking-wider text-brand-primary">
                    {activeItem.metric}
                  </div>
                </div>

                {/* Descriptive content */}
                <div className="space-y-1.5 px-1 text-slate-700 dark:text-slate-300">
                  <span className="text-[9px] text-brand-primary font-display uppercase tracking-widest font-bold">
                    Astra Clinic Facility Tour
                  </span>
                  <h2 className="font-display font-bold text-xl leading-tight">
                    {activeItem.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    {activeItem.desc}
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
