import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Award, GraduationCap, Mail, Phone, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  const { t } = useTranslation();

  const qualifications = [
    { code: "MBBS", label: t('team.quals.mbbs') },
    { code: "MD", label: t('team.quals.md') },
    { code: "FiCPH (USA)", label: t('doctor.credentials.usa') },
    { code: "FIDM (U.K)", label: t('doctor.credentials.uk') }
  ];

  const consultationTimings = [
    { day: t('team.timings.0.day'), hours: t('team.timings.0.hours') },
    { day: t('team.timings.1.day'), hours: t('team.timings.1.hours') },
    { day: t('team.timings.2.day'), hours: t('team.timings.2.hours') }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-24 sm:pt-32 pb-16 sm:pb-24 transition-colors duration-300">

      {/* Soft overlay gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-slate-900/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">

        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse shrink-0" />
            <span className="text-xs font-bold text-brand-primary uppercase font-display">{t('team.badge')}</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-snug">
            {t('team.title')}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('team.subtitle')}
          </p>
        </div>

        {/* --- DETAILED DOCTOR PROFILE SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Side: Compact Horizontal Card on Mobile, Tall Portrait Card on Desktop */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="medical-card glossy-shine w-full max-w-md p-5 sm:p-8 flex flex-col justify-between overflow-hidden">

              <div className="hidden lg:flex w-full justify-between items-start mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase">{t('team.roleTag')}</span>
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:text-center gap-4 lg:gap-0 mb-5 lg:mb-6 text-left">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 shrink-0 lg:mx-auto lg:mb-4 rounded-2xl lg:rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-1 shadow-md overflow-hidden">
                  <img
                    src="/dr-rajesh-wilson.jpg"
                    alt="Dr. Rajesh Wilson"
                    className="w-full h-full rounded-[14px] lg:rounded-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase block">{t('team.roleTag')}</span>
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-slate-900 dark:text-white leading-snug">{t('doctor.name')}</h3>
                  <p lang="en" className="text-[11px] sm:text-xs text-brand-primary font-display uppercase font-bold leading-snug">{t('doctor.qualifications')}</p>
                </div>
              </div>

              {/* Timing Grid inside Card */}
              <div className="w-full border-t border-slate-200/60 dark:border-slate-800/80 pt-5 space-y-3.5 text-left">
                <h4 className="font-display font-bold text-xs uppercase text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{t('team.timingsHeading')}</span>
                </h4>
                <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {consultationTimings.map((time, tIdx) => (
                    <div key={tIdx} className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-slate-100 dark:border-slate-800/50 pb-2 last:border-b-0 last:pb-0">
                      <span className="font-semibold text-slate-700 dark:text-slate-400 shrink-0">{time.day}</span>
                      <span className="text-slate-500 dark:text-slate-500 sm:text-right">{time.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Expert Credentials & Fellowship Timelines */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-snug">
              {t('team.directorHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {t('doctor.bio')}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {t('team.directorBio2')}
            </p>

            {/* Academic Accolades grid */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                {t('team.qualificationsHeading')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualifications.map((qual, idx) => (
                  <div key={idx} className="medical-card glossy-shine p-4 flex items-start space-x-3.5 shadow-sm overflow-hidden">
                    <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0 border border-brand-primary/15">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 lang="en" className="font-display font-bold text-sm text-slate-900 dark:text-white">{qual.code}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed font-sans">{qual.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Accreditation Row */}
            <div className="medical-card glossy-shine p-5 flex items-center justify-between gap-4 w-full overflow-hidden">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 border border-brand-primary/15">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">{t('team.expCardTitle')}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('team.expCardDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOOK DIRECTLY BANNER --- */}
        <div className="medical-card glossy-shine p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden text-left border border-slate-100 dark:border-slate-800 w-full">
          <div className="space-y-3.5 z-10 min-w-0 w-full">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
              {t('team.ctaHeading')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-xl">
              {t('team.ctaSub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 font-sans text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-primary animate-pulse-slow shrink-0" />
                <span>{t('team.callSupport')}</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <Mail className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span className="break-all sm:break-normal">{t('team.emailDesk')}</span>
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className="w-full md:w-auto px-7 py-3.5 rounded-xl font-display font-bold text-xs uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-md transition-transform flex items-center justify-center shrink-0 z-10 text-center"
          >
            {t('nav.bookNow')}
          </Link>
        </div>

      </div>
    </div>
  );
};
