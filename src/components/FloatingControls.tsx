import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FloatingControls: React.FC = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppLink = "https://wa.me/918089233554?text=Hello%20Astra%20Medical%20Center,%20I%20would%20like%20to%20inquire%20about%20your%20medical%20services.";

  return (
    <>
      {/* 1. Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-4">
        {/* Scroll To Top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 15 }}
              onClick={scrollToTop}
              className="p-3.5 rounded-2xl bg-white dark:bg-brand-cardDark text-brand-primary border border-slate-200 dark:border-slate-800 shadow-md hover:bg-brand-primary hover:text-white transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Pulsing WhatsApp Support */}
        <motion.a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
        >
          {/* Subtle ripple rings */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none scale-110" />
          <MessageCircle className="w-6 h-6 relative z-10" />

          {/* Hover balloon tooltip */}
          <span className="absolute right-14 whitespace-nowrap bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-semibold font-display shadow-sm">
            WhatsApp Desk
          </span>
        </motion.a>
      </div>

      {/* 2. Sticky Quick Booking Bar (Mobile Only - visible below lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-brand-cardDark/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 shadow-md px-4 py-3 flex gap-4">
        <a
          href="tel:8089233554"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-display font-bold text-xs tracking-wider uppercase shadow-sm active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-brand-primary" />
          <span>Call Desk</span>
        </a>
        <a
          href="#/contact"
          onClick={() => {
            window.location.hash = "#/contact";
          }}
          className="flex-[1.3] flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-display font-bold text-xs tracking-wider uppercase shadow-md active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t('nav.bookNow')}</span>
        </a>
      </div>
    </>
  );
};
