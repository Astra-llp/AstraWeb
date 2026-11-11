import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 pt-12 sm:pt-16 pb-24 lg:pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-10 mb-10 sm:mb-12">

          {/* Col 1: Brand & Motto */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="relative shrink-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 80"
                  className="w-11 h-9 transform group-hover:scale-105 transition-transform duration-300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="footer-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                  <path d="M 28 10 Q 28 14 32 14 Q 28 14 28 18 Q 28 14 24 14 Q 28 14 28 10 Z" fill="url(#footer-gold-gradient)" />
                  <path d="M 52 5 Q 52 8 55 8 Q 52 8 52 11 Q 52 8 49 8 Q 52 8 52 5 Z" fill="url(#footer-gold-gradient)" />
                  <path d="M 22 22 Q 22 24 24 24 Q 22 24 22 26 Q 22 24 20 24 Q 22 24 22 22 Z" fill="url(#footer-gold-gradient)" />
                  <path
                    d="M 40 20 L 44.5 34 L 59 34 L 47.5 42 L 52 56 L 40 47.5 L 28 56 L 32.5 42 L 21 34 L 35.5 34 Z"
                    fill="url(#footer-gold-gradient)"
                  />
                  <path
                    d="M 45 34 C 65 33, 85 32, 98 32 C 85 34, 65 36, 45 36 Z"
                    fill="url(#footer-gold-gradient)"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                {t('nav.brandFull')}
              </span>
            </Link>
            <p className="text-xs sm:text-sm font-semibold text-brand-primary font-sans leading-relaxed max-w-sm">
              “{t('motto.text')}”
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-sm">
              {t('motto.secondary')}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Col 2 & 3 on mobile side-by-side compact 2-column grid, standard columns on sm/lg */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase text-slate-900 dark:text-white">
                {t('footer.portalTitle')}
              </h4>
              <ul className="space-y-2.5 font-sans text-sm">
                <li>
                  <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.services')}
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.team')}
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.gallery')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Assistance & Timing */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase text-slate-900 dark:text-white">
                {t('footer.helpDeskTitle')}
              </h4>
              <ul className="space-y-2.5 font-sans text-sm">
                <li>
                  <Link to="/instructions" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.instructions')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500 block">
                  {t('footer.timingsTitle')}
                </span>
                <div className="space-y-2 font-sans text-xs">
                  <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-800 dark:text-slate-200">{t('footer.monSat')}</span>
                      <span lang="en" className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{t('footer.monSatHours')}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 text-amber-600 dark:text-amber-400">
                    <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">{t('footer.sunday')}</span>
                      <span lang="en" className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{t('footer.sundayHours')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase text-slate-900 dark:text-white">
              {t('footer.deskTitle')}
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-1" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary transition-colors block font-medium leading-relaxed"
                  >
                    {t('contact.addressValue')}
                  </a>
                  <span lang="en" className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                    {t('footer.plusCode')}
                  </span>
                </div>
              </li>
              <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <a lang="en" href="tel:8089233554" className="hover:text-brand-primary transition-colors">8089233554</a>
                <span>/</span>
                <a lang="en" href="tel:7092030885" className="hover:text-brand-primary transition-colors">7092030885</a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a lang="en" href="mailto:astramedlabs@gmail.com" className="hover:text-brand-primary transition-colors break-all">astramedlabs@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-200/60 dark:border-slate-800/60 my-6" />

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
          <div>
            © <span lang="en">{currentYear}</span> {t('footer.copyright')}
          </div>
          <div className="flex space-x-4">
            <Link to="/instructions" className="hover:text-brand-primary transition-colors">{t('footer.policy')}</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-brand-primary transition-colors">{t('footer.triage')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
