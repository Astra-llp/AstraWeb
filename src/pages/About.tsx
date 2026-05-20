import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Award, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: ShieldCheck,
      title: "Clinical Accuracy",
      desc: "All diagnostic samples and clinical profiles are peer-reviewed under strict standards of medical excellence."
    },
    {
      icon: HeartPulse,
      title: "Patient Empathy",
      desc: "Guided by our motto 'Empowering Patients, Empowering Lives', we deliver care that is kind, personal, and dedicated."
    },
    {
      icon: Award,
      title: "Senior Expertise",
      desc: "Led by Dr. Rajesh Wilson (16+ years experience) with senior UK and USA diabetes and clinical consultation fellowships."
    },
    {
      icon: Clock,
      title: "Rapid Diagnostics",
      desc: "Fully automated biochemistry and pathology analyzer desks ensure results are ready and communicated within hours."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 transition-colors duration-300">
      
      {/* Soft header gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 to-transparent dark:from-slate-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-brand-primary uppercase font-display">Hospital History</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* --- DUAL GRID PANEL (Intro & Clinical Excellence) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-5 text-left rtl:text-right">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Providing Exceptional Clinical Standards Since 2010
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {t('about.intro')}
            </p>
          </div>

          {/* Simple clinical highlight frame */}
          <div className="md:col-span-5 flex justify-center">
            <div className="medical-card glossy-shine p-8 text-left rtl:text-right space-y-4 w-full">
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">Astra Diagnostics Desk</span>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Empowering Patients, Empowering Lives</h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed">
                We believe that accurate diagnosis is the cornerstone of effective therapy. Under the clinical directorate of Dr. Rajesh Wilson, we combine metabolic diabetology checks with modern laboratory assessments to give you complete trust in your health profile.
              </p>
            </div>
          </div>
        </div>

        {/* --- VISION & MISSION CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
          {/* Vision Card */}
          <div className="medical-card glossy-shine p-8 hover:shadow-medical-hover transition-all duration-300 text-left rtl:text-right">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block mb-2">Our Vision</span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3">{t('about.visionTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{t('about.vision')}</p>
          </div>

          {/* Mission Card */}
          <div className="medical-card glossy-shine p-8 hover:shadow-medical-hover transition-all duration-300 text-left rtl:text-right">
            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block mb-2">Our Mission</span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3">{t('about.missionTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{t('about.mission')}</p>
          </div>
        </div>

        {/* --- WHY CHOOSE US VALUES GRID --- */}
        <div className="space-y-10">
          <div className="text-center space-y-2.5">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Why Choose Astra Medical Center?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-sans max-w-2xl mx-auto">
              Our core values are engineered around patient safety, diagnostic integrity, and dedicated doctor advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="medical-card glossy-shine p-6 hover:shadow-medical-hover transition-all duration-300 text-left rtl:text-right space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/15">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">{val.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- CHRONOLOGICAL TIMELINE --- */}
        <div className="space-y-12">
          <div className="text-center space-y-2.5">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Our Journey of Healthcare Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-sans max-w-2xl mx-auto">
              A decade of clinical milestones and persistent commitments to general practitioner wellness.
            </p>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-8 max-w-3xl mx-auto text-left rtl:text-right rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
            {[0, 1, 2, 3].map((num) => (
              <div key={num} className="relative space-y-2.5 group">
                {/* Timeline connector dot */}
                <div className="absolute -left-[31px] rtl:-right-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-brand-primary bg-white dark:bg-brand-dark group-hover:bg-brand-primary transition-colors" />
                
                <span className="inline-block px-2 py-0.5 rounded bg-brand-primary/10 text-[10px] font-bold text-brand-primary tracking-wide">
                  {t(`about.milestones.${num}.year`)}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {t(`about.milestones.${num}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {t(`about.milestones.${num}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
