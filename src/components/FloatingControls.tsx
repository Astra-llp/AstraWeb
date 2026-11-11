import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp, Phone, Home as HomeIcon, Stethoscope, CalendarCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const FloatingControls: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
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
      {/* 1. Desktop Floating Controls (hidden below lg; WhatsApp is docked cleanly in mobile tab bar) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-center space-y-3">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 15 }}
              onClick={scrollToTop}
              className="p-3.5 rounded-2xl bg-white dark:bg-brand-cardDark text-brand-primary border border-slate-200 dark:border-slate-800 shadow-md hover:bg-brand-primary hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
          aria-label="WhatsApp Desk"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none scale-110" />
          <MessageCircle className="w-6 h-6 relative z-10" />

          <span className="absolute right-14 whitespace-nowrap bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-semibold font-display shadow-sm">
            {t('floating.whatsappTooltip')}
          </span>
        </motion.a>
      </div>

      {/* Discrete Mobile Scroll-to-Top pill (only visible after scrolling down) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="lg:hidden fixed bottom-[78px] right-4 z-40 p-2.5 rounded-full bg-white/95 dark:bg-brand-cardDark/95 backdrop-blur-md text-brand-primary border border-slate-200 dark:border-slate-700 shadow-md cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Native App-Style Mobile Bottom Navigation & Action Dock (< lg) */}
      <nav
        aria-label="Mobile Quick Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-brand-cardDark/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-6px_24px_rgba(15,23,42,0.06)] px-1.5 pt-1.5 pb-[max(0.45rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 items-center max-w-md mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              location.pathname === '/'
                ? 'text-brand-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HomeIcon className="w-[18px] h-[18px] mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight truncate max-w-full px-0.5">{t('mobileDock.home')}</span>
          </Link>

          <Link
            to="/services"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              location.pathname === '/services'
                ? 'text-brand-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="w-[18px] h-[18px] mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight truncate max-w-full px-0.5">{t('mobileDock.services')}</span>
          </Link>

          <a
            href="tel:8089233554"
            className="flex flex-col items-center justify-center py-1 rounded-xl text-slate-600 hover:text-brand-primary active:scale-95 transition-all"
          >
            <Phone className="w-[18px] h-[18px] mb-0.5 text-brand-primary shrink-0" />
            <span className="text-[10px] leading-tight font-semibold truncate max-w-full px-0.5">{t('mobileDock.call')}</span>
          </a>

          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 rounded-xl text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all"
          >
            <MessageCircle className="w-[18px] h-[18px] mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight font-semibold truncate max-w-full px-0.5">{t('mobileDock.whatsapp')}</span>
          </a>

          <Link
            to="/contact"
            className={`flex flex-col items-center justify-center py-1 mx-0.5 rounded-xl transition-all ${
              location.pathname === '/contact'
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-brand-primary text-white shadow-sm'
            }`}
          >
            <CalendarCheck className="w-[18px] h-[18px] mb-0.5 shrink-0" />
            <span className="text-[10px] leading-tight font-bold truncate max-w-full px-0.5">{t('mobileDock.book')}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
