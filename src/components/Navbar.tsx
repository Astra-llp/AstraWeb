import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X, Phone, Mail } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'ml', label: 'മലയാളം' }
];

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Defer menu closing to prevent synchronous setState inside useEffect React warnings
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setLangDropdown(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location]);

  const activeLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const toggleLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangDropdown(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/team', label: t('nav.team') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/instructions', label: t('nav.instructions') },
    { to: '/contact', label: t('nav.contact') }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-white/80 dark:bg-brand-dark/80 border-b border-white/20 dark:border-white/10 shadow-sm'
          : 'bg-white/70 dark:bg-brand-dark/70 border-b border-white/10 dark:border-white/5'
      }`}
    >
      {/* South Zone inspired top contact details bar */}
      <div className="hidden sm:block bg-brand-navy dark:bg-slate-900 text-slate-100/90 dark:text-slate-355 text-[11px] font-sans py-2 border-b border-white/5 dark:border-slate-800/50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-5 rtl:space-x-reverse">
            <a href="tel:8089233554" className="hover:text-brand-secondary dark:hover:text-brand-primary transition-colors flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-brand-secondary shrink-0" />
              <span>{t('nav.callSupport')}: <span className="font-semibold">8089233554 / 7092030885</span></span>
            </a>
            <span className="opacity-20">|</span>
            <a href="mailto:astramedlabs@gmail.com" className="hover:text-brand-secondary dark:hover:text-brand-primary transition-colors flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-brand-secondary shrink-0" />
              <span>{t('contact.cardEmail')}: <span className="font-semibold">astramedlabs@gmail.com</span></span>
            </a>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse font-display uppercase tracking-widest text-[9px] font-bold opacity-80">
            <span>{t('motto.text')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Logo Brand */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="relative shrink-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 80" 
                className="w-12 h-10 transform group-hover:scale-105 transition-transform duration-300"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                
                {/* 3 small sparkle stars above tail */}
                <path d="M 28 10 Q 28 14 32 14 Q 28 14 28 18 Q 28 14 24 14 Q 28 14 28 10 Z" fill="url(#gold-gradient)" />
                <path d="M 52 5 Q 52 8 55 8 Q 52 8 52 11 Q 52 8 49 8 Q 52 8 52 5 Z" fill="url(#gold-gradient)" />
                <path d="M 22 22 Q 22 24 24 24 Q 22 24 22 26 Q 22 24 20 24 Q 22 24 22 22 Z" fill="url(#gold-gradient)" />
                
                {/* Main tilted solid star */}
                <path 
                  d="M 40 20 L 44.5 34 L 59 34 L 47.5 42 L 52 56 L 40 47.5 L 28 56 L 32.5 42 L 21 34 L 35.5 34 Z" 
                  fill="url(#gold-gradient)" 
                />
                
                {/* Tail trail shooting from the star's center to the right */}
                <path 
                  d="M 45 34 C 65 33, 85 32, 98 32 C 85 34, 65 36, 45 36 Z" 
                  fill="url(#gold-gradient)" 
                />
              </svg>
            </div>
            
            <div className="flex flex-col select-none text-left leading-none">
              <span className="font-display font-black text-xl tracking-tight text-[#0B4C8C] dark:text-[#05c396] transition-colors">
                ASTRA
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-sans font-black text-slate-800 dark:text-slate-200 tracking-wide uppercase mt-0.5 whitespace-nowrap">
                MEDICAL CENTER & DIAGNOSTICS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex space-x-7 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1.5 font-display text-sm font-medium tracking-wide transition-all duration-200 hover:text-brand-primary ${
                    isActive
                      ? 'text-brand-primary font-semibold'
                      : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions Block */}
          <div className="hidden lg:flex items-center space-x-3.5 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-150 dark:border-slate-750 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-150 dark:border-slate-750 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer text-xs font-semibold"
              >
                <Globe className="w-3.5 h-3.5 text-brand-primary" />
                <span className="uppercase">{activeLang.code}</span>
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <>
                    {/* Click Out Overlay */}
                    <div className="fixed inset-0 z-10" onClick={() => setLangDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-40 rounded-xl bg-white dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden z-20 py-1"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => toggleLanguage(lang.code)}
                          className={`w-full text-left rtl:text-right px-4 py-2.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            i18n.language === lang.code
                              ? 'bg-brand-primary/5 text-brand-primary font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{lang.label}</span>
                          <span className="text-[9px] opacity-40 uppercase">{lang.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Us CTA */}
            <Link
              to="/contact"
              className="glossy-shine px-4.5 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm transition-all duration-200"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-2.5 rtl:space-x-reverse">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-brand-dark border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-5 space-y-3">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-xl font-display text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-primary/5 text-brand-primary font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Language Selection Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Language / لغة</span>
                </span>
                <div className="grid grid-cols-4 gap-2 px-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        i18n.language === lang.code
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'bg-slate-55 dark:bg-slate-800 text-slate-750 dark:text-slate-350 border border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {lang.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button inside mobile drawer */}
              <div className="pt-2 px-1">
                <Link
                  to="/contact"
                  className="w-full block text-center py-3 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-brand-primary shadow-sm"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
