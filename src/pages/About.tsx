import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Award, ShieldCheck, Clock, Sparkles, Accessibility, Check, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: ShieldCheck,
      title: t('about.values.0.title'),
      desc: t('about.values.0.desc')
    },
    {
      icon: HeartPulse,
      title: t('about.values.1.title'),
      desc: t('about.values.1.desc')
    },
    {
      icon: Award,
      title: t('about.values.2.title'),
      desc: t('about.values.2.desc')
    },
    {
      icon: Clock,
      title: t('about.values.3.title'),
      desc: t('about.values.3.desc')
    }
  ];

  const infraFeatures = [
    {
      icon: Accessibility,
      iconWrap: 'bg-brand-primary/10 text-brand-primary',
      title: t('about.infraFeatures.0.title'),
      desc: t('about.infraFeatures.0.desc')
    },
    {
      icon: Check,
      iconWrap: 'bg-emerald-500/10 text-emerald-600',
      title: t('about.infraFeatures.1.title'),
      desc: t('about.infraFeatures.1.desc')
    },
    {
      icon: HeartPulse,
      iconWrap: 'bg-purple-500/10 text-purple-600',
      title: t('about.infraFeatures.2.title'),
      desc: t('about.infraFeatures.2.desc')
    },
    {
      icon: Clock,
      iconWrap: 'bg-amber-500/10 text-amber-600',
      title: t('about.infraFeatures.3.title'),
      desc: t('about.infraFeatures.3.desc')
    }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-24 sm:pt-32 pb-16 sm:pb-24 transition-colors duration-300">

      {/* Soft header gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 to-transparent dark:from-slate-900/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">

        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse shrink-0" />
            <span className="text-xs font-bold text-brand-primary uppercase font-display">{t('about.pageBadge')}</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-snug">
            {t('about.title')}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* --- DUAL GRID PANEL --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-5 text-left">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-snug">
              {t('about.heading')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {t('about.intro')}
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="medical-card glossy-shine p-7 sm:p-8 text-left space-y-4 w-full">
              <span className="text-[11px] font-bold text-brand-primary uppercase block">{t('nav.brandFull')}</span>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-snug">{t('motto.text')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('about.highlightDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* --- VISION & MISSION CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
          <div className="medical-card glossy-shine p-8 hover:shadow-medical-hover transition-all duration-300 text-left">
            <span className="text-[11px] font-bold text-brand-primary uppercase block mb-2">{t('about.visionBadge')}</span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 leading-snug">{t('about.visionTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{t('about.vision')}</p>
          </div>

          <div className="medical-card glossy-shine p-8 hover:shadow-medical-hover transition-all duration-300 text-left">
            <span className="text-[11px] font-bold text-brand-primary uppercase block mb-2">{t('about.missionBadge')}</span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 leading-snug">{t('about.missionTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{t('about.mission')}</p>
          </div>
        </div>

        {/* --- WHY CHOOSE US VALUES GRID --- */}
        <div className="space-y-10">
          <div className="text-center space-y-2.5">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-snug">
              {t('about.whyUsTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto">
              {t('about.whyUsSub')}
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="medical-card glossy-shine w-[78vw] max-w-[290px] sm:w-auto sm:max-w-none shrink-0 snap-start p-5 sm:p-6 hover:shadow-medical-hover transition-all duration-300 text-left space-y-3.5 sm:space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/15">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">{val.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- CHRONOLOGICAL TIMELINE --- */}
        <div className="space-y-12">
          <div className="text-center space-y-2.5">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-snug">
              {t('about.timelineTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto">
              {t('about.timelineSub')}
            </p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 ml-2 sm:ml-0 space-y-8 max-w-3xl mx-auto text-left">
            {[0, 1, 2, 3].map((num) => (
              <div key={num} className="relative space-y-2 group">
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-brand-primary bg-white dark:bg-brand-dark group-hover:bg-brand-primary transition-colors" />

                <span lang="en" className="inline-block px-2.5 py-0.5 rounded bg-brand-primary/10 text-[11px] font-bold text-brand-primary">
                  {t(`about.milestones.${num}.year`)}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                  {t(`about.milestones.${num}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {t(`about.milestones.${num}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- FACILITY ACCESSIBILITY & INCLUSIVITY --- */}
        <div className="medical-card glossy-shine p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-brand-primary uppercase font-display block mb-1">
                {t('about.facilityBadge')}
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                {t('about.facilityTitle')}
              </h2>
            </div>
            <a
              href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start sm:items-center space-x-1.5 text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white transition-colors leading-snug"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" />
              <span>{t('about.plusCodeLabel')}</span>
            </a>
          </div>

          {/* Real Clinic Facility Photos Preview (clean, no overlay tags) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 group flex flex-col">
              <div className="h-60 sm:h-64 w-full overflow-hidden">
                <img
                  src="/front.jpg"
                  alt={t('about.exteriorTag')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-slate-900 dark:text-white font-display font-bold text-sm sm:text-base leading-snug">
                  {t('about.exteriorSub')}
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 group flex flex-col">
              <div className="h-60 sm:h-64 w-full overflow-hidden">
                <img
                  src="/waiting-area.jpg"
                  alt={t('about.labTag')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-slate-900 dark:text-white font-display font-bold text-sm sm:text-base leading-snug">
                  {t('about.labSub')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infraFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className={`w-8 h-8 rounded-lg ${item.iconWrap} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
