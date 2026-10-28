import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, HeartPulse } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          
          {/* Col 1: Brand & Motto */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-wide">
                {t('nav.brand')}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed max-w-sm">
              “{t('motto.text')}”
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-sans leading-relaxed max-w-sm">
              Serving the community with premium diagnostic, diabetology, and general medical diagnostics since 2010. Dedicated clinical accuracy, peer-reviewed charting.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Clinical Portal
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
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Help Desk
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Clinic Timings
              </span>
              <div className="space-y-2 font-sans text-xs">
                <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-800 dark:text-slate-200">Mon – Sat</span>
                    <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">06:30 AM – 07:30 PM</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-amber-600 dark:text-amber-400">
                  <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Sunday</span>
                    <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">07:00 AM – 04:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Astra Desk
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary transition-colors block font-medium"
                  >
                    {t('contact.addressValue')}
                  </a>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                    Plus Code: 848W+2V Perinjanam, Keralam, India
                  </span>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="tel:8089233554" className="hover:text-brand-primary transition-colors">8089233554</a>
                <span>/</span>
                <a href="tel:7092030885" className="hover:text-brand-primary transition-colors">7092030885</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="mailto:astramedlabs@gmail.com" className="hover:text-brand-primary transition-colors">astramedlabs@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-slate-200/60 dark:border-slate-800/60 my-6" />

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div>
            © {currentYear} Astra Medical Center & Diagnostics. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/instructions" className="hover:text-brand-primary transition-colors">Patient Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-brand-primary transition-colors">Emergency Triage</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
