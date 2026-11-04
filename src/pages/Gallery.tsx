import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, X, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: number;
  category: 'diagnostics' | 'labs' | 'suites';
  title: string;
  desc: string;
  metric: string;
  image: string;
}

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'diagnostics' | 'labs' | 'suites'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: 'suites',
      title: "Clinic Front Entrance & Exterior",
      desc: "Main entrance and dedicated patient access with official clinical signage on Mathilakam Kakkathiruthi Rd, Perinjanam.",
      metric: "Front Entrance",
      image: "/front.jpg"
    },
    {
      id: 2,
      category: 'suites',
      title: "Patient Registration & Reception Desk",
      desc: "Welcoming wooden reception counter for immediate patient registration, inquiry triage, and appointment booking.",
      metric: "Reception Desk",
      image: "/reception.jpg"
    },
    {
      id: 3,
      category: 'labs',
      title: "Hi-Tech Computerised Lab & ECG Waiting Area",
      desc: "Air-conditioned central corridor featuring computerised laboratory counters, 12-channel ECG, and patient seating.",
      metric: "Hi-Tech Lab & ECG",
      image: "/waiting-area.jpg"
    },
    {
      id: 4,
      category: 'diagnostics',
      title: "Physiotherapy & Consultation Waiting Lounge",
      desc: "Dedicated waiting area for specialist consultations, featuring clinical credentials, AHA certifications, and health advisories.",
      metric: "Consultation Waiting",
      image: "/waiting-area-consultation.jpg"
    },
    {
      id: 5,
      category: 'labs',
      title: "Central Diagnostic Corridor & Aquarium Lounge",
      desc: "Comfortable, clean clinic corridor with relaxing natural aquarium and prompt diagnostic sample processing desk.",
      metric: "Central Corridor",
      image: "/waiting-area.jpg"
    },
    {
      id: 6,
      category: 'suites',
      title: "Patient Support & Enquiries Counter",
      desc: "Attentive front desk team ready to assist patients with appointment scheduling, test reports, and doctor consultations.",
      metric: "Patient Support Desk",
      image: "/reception.jpg"
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
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Real photos of Astra Medical Center & Diagnostics in Perinjanam, Thrissur — featuring our modern front entrance, patient reception, consultation waiting lounge, and hi-tech laboratory corridor.
          </p>
        </div>

        {/* --- DYNAMIC FILTER TRIGGERS --- */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            { code: 'all', label: t('gallery.filterAll') },
            { code: 'suites', label: 'Entrance & Reception' },
            { code: 'labs', label: 'Laboratory & Lobby' },
            { code: 'diagnostics', label: 'Consultation & Waiting' }
          ].map((btn) => (
            <button
              key={btn.code}
              onClick={() => setFilter(btn.code as any)}
              className={`px-5 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                filter === btn.code
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm scale-102'
                  : 'bg-white dark:bg-brand-cardDark text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
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
                className="medical-card glossy-shine group relative h-80 cursor-pointer transition-all duration-300 overflow-hidden rounded-2xl shadow-medical hover:shadow-medical-hover"
              >
                {/* Real Clinic Photo */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-between p-6 text-white" />

                {/* Floating Top Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center justify-between w-[calc(100%-2.5rem)]">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[10px] uppercase tracking-wider font-bold text-brand-primary shadow-sm">
                    {item.metric}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                    <Eye className="w-4 h-4 text-brand-primary" />
                  </div>
                </div>

                {/* Bottom Content Row */}
                <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1.5 text-left rtl:text-right">
                  <h3 className="font-display font-bold text-lg leading-tight text-white drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-200/90 font-sans leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- BOTTOM BANNER --- */}
        <div className="medical-card glossy-shine p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left rtl:text-right">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Visit Us in Person at Perinjanam
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
              Mathilakam Kakkathiruthi Rd, Perinjanam, Thrissur, Kerala 680686
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-brand-primary hover:bg-brand-navy shadow-sm transition-all duration-200 shrink-0 flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Get Directions & Visit</span>
          </Link>
        </div>

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
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
              />

              {/* Lightbox container card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl overflow-hidden z-10 bg-white dark:bg-brand-cardDark rounded-3xl shadow-2xl p-4 sm:p-6 flex flex-col space-y-4 text-left rtl:text-right"
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors cursor-pointer z-20"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main High-Res Image Frame */}
                <div className="w-full h-80 sm:h-[460px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-contain sm:object-cover object-center"
                  />
                </div>

                {/* Descriptive content */}
                <div className="space-y-1.5 px-2 text-slate-800 dark:text-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] uppercase font-bold tracking-wider font-display">
                      {activeItem.metric}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Astra Medical Center & Diagnostics, Perinjanam
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
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
