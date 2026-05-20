import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, HelpCircle, ChevronDown, AlertOctagon, HeartPulse, Clock, FileWarning } from 'lucide-react';

export const Instructions: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqIndices = [0, 1, 2, 3];

  const guidelines = [
    {
      icon: Clock,
      title: "Fasting Blood Sugar (FBS)",
      desc: t('instructions.guideline1'),
      iconBg: "bg-brand-primary/10 dark:bg-brand-primary/20",
      iconColor: "text-brand-primary dark:text-brand-secondary"
    },
    {
      icon: AlertOctagon,
      title: "Lipid Profile Screening",
      desc: t('instructions.guideline2'),
      iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: HeartPulse,
      title: "Ultrasound Abdomen & Scan",
      desc: t('instructions.guideline3'),
      iconBg: "bg-teal-50 dark:bg-teal-950/50",
      iconColor: "text-teal-600 dark:text-teal-400"
    },
    {
      icon: FileWarning,
      title: "Thyroid Vitals Screen",
      desc: t('instructions.guideline4'),
      iconBg: "bg-rose-50 dark:bg-rose-950/50",
      iconColor: "text-rose-600 dark:text-rose-400"
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 overflow-hidden transition-colors duration-500">
      
      {/* Premium subtle background graphics for clinical elegance */}
      <div className="absolute top-[10%] left-[-15%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[40%] h-[40%] rounded-full bg-brand-navy/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-semibold tracking-wider text-brand-navy dark:text-brand-secondary uppercase font-display">Clinical Advisory</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white leading-tight">
            {t('instructions.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('instructions.subtitle')}
          </p>
        </div>

        {/* --- CLINICAL PRE-TEST GUIDELINES --- */}
        <div className="space-y-8">
          <div className="text-left rtl:text-right space-y-2 border-l-4 border-brand-primary pl-4 rtl:pl-0 rtl:pr-4">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-display">Diagnostic Preparation</span>
            <h3 className="font-display font-bold text-2xl text-brand-navy dark:text-white">{t('instructions.guidelinesTitle')}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guidelines.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <div
                  key={idx}
                  className="medical-card glossy-shine p-6 hover:shadow-medical-hover transition-all duration-300 text-left rtl:text-right relative overflow-hidden flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl ${guide.iconBg} flex items-center justify-center border border-slate-100/50 dark:border-slate-800 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${guide.iconColor}`} />
                    </div>
                    <h4 className="font-display font-bold text-base text-brand-navy dark:text-white">{guide.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{guide.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- FAQ ACCORDION SECTION --- */}
        <div className="space-y-8">
          <div className="text-left rtl:text-right space-y-2 border-l-4 border-brand-primary pl-4 rtl:pl-0 rtl:pr-4">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-display">Information Desk</span>
            <h3 className="font-display font-bold text-2xl text-brand-navy dark:text-white">{t('instructions.faqTitle')}</h3>
          </div>

          <div className="space-y-4">
            {faqIndices.map((idx) => (
              <div
                key={idx}
                className="medical-card glossy-shine overflow-hidden shadow-medical hover:shadow-medical-hover transition-all duration-300"
              >
                {/* Trigger Heading button */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left rtl:text-right flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-brand-navy dark:text-white hover:text-brand-primary transition-colors"
                >
                  <span className="flex items-center space-x-3 rtl:space-x-reverse">
                    <HelpCircle className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>{t(`instructions.faqs.${idx}.q`)}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-primary shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Animated Dropdown Answer */}
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/40 text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-sans text-left rtl:text-right">
                        {t(`instructions.faqs.${idx}.a`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* --- DEDICATED CALL CTA BANNER --- */}
        <div className="medical-card glossy-shine p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-8 text-left rtl:text-right text-white relative overflow-hidden bg-brand-navy/95 border-brand-navy w-full">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 z-10">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">Have a special diagnostic preparation query?</h3>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Reach out directly to Astra Medical desk at <span className="text-brand-secondary font-bold">8089233554</span> or <span className="text-brand-secondary font-bold">7092030885</span>. A qualified coordinator will guide you.
            </p>
          </div>
          <a
            href="tel:8089233554"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl font-display font-semibold text-sm text-brand-navy bg-white hover:bg-slate-100 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-md shrink-0 text-center z-10"
          >
            Call Coordinator
          </a>
        </div>

      </div>
    </div>
  );
};
