import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Award, GraduationCap, Mail, Phone, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  const { t } = useTranslation();

  const qualifications = [
    { code: "MBBS", label: "Bachelor of Medicine, Bachelor of Surgery" },
    { code: "MD", label: "Doctor of Medicine (General Practice)" },
    { code: "FiCPH (USA)", label: t('doctor.credentials.usa') },
    { code: "FIDM (U.K)", label: t('doctor.credentials.uk') }
  ];

  const consultationTimings = [
    { day: "Monday - Friday", hours: "09:00 AM - 01:00 PM, 04:30 PM - 08:30 PM" },
    { day: "Saturday", hours: "09:00 AM - 01:00 PM, 04:30 PM - 07:30 PM" },
    { day: "Sunday", hours: "09:00 AM - 01:00 PM (Emergency Desk Only)" }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 transition-colors duration-300">
      
      {/* Soft overlay gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-slate-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-brand-primary uppercase font-display">Specialist Board</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Our Medical Directorate
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Led by senior clinicians committed to premium diagnostics, diabetes therapy, and dedicated general practice.
          </p>
        </div>

        {/* --- DETAILED DOCTOR PROFILE SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Professional Doctor Profile Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="medical-card glossy-shine w-full max-w-md p-8 flex flex-col justify-between items-center text-center overflow-hidden">
              
              <div className="w-full flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Senior Diabetologist</span>
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <HeartPulse className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Clean Profile Badge */}
              <div className="space-y-4 mb-6">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[3px] flex items-center justify-center shadow-sm">
                  <div className="w-full h-full rounded-full bg-white dark:bg-brand-cardDark flex items-center justify-center text-brand-primary font-display font-black text-2xl">
                    RW
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Dr. Rajesh Wilson</h3>
                  <p className="text-xs text-brand-primary font-display uppercase tracking-wider font-bold">MBBS, MD., FiCPH (USA)., FIDM (U.K).</p>
                </div>
              </div>

              {/* Timing Grid inside Card */}
              <div className="w-full border-t border-slate-200/60 dark:border-slate-800/80 pt-5 space-y-3.5 text-left rtl:text-right">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Consultation Timings</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {consultationTimings.map((time, tIdx) => (
                    <div key={tIdx} className="flex justify-between gap-4 border-b border-slate-100 dark:border-slate-800/50 pb-1.5 last:border-b-0 last:pb-0">
                      <span className="font-semibold text-slate-700 dark:text-slate-350">{time.day}</span>
                      <span className="text-slate-500 dark:text-slate-450 text-right">{time.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Expert Credentials & Fellowship Timelines */}
          <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
              Clinical Director & Chief Consultant
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {t('doctor.bio')}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Dr. Rajesh Wilson leads the clinical protocols at Astra Medical Center & Diagnostics. Under his supervision, all patient diagnostics and diabetology check panels adhere strictly to international standards, incorporating high-accuracy laboratory screenings and custom insulin advisory matrices.
            </p>

            {/* Academic Accolades grid */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Qualifications & Accreditation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualifications.map((qual, idx) => (
                  <div key={idx} className="medical-card glossy-shine p-4 flex items-start space-x-3.5 shadow-sm overflow-hidden">
                    <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0 border border-brand-primary/15">
                      <GraduationCap className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{qual.code}</h4>
                      <p className="text-[11px] text-slate-450 dark:text-slate-500 leading-normal font-sans">{qual.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Accreditation Row */}
            <div className="medical-card glossy-shine p-4.5 flex items-center justify-between gap-4 w-full overflow-hidden">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 border border-brand-primary/15">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left rtl:text-right">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">General Practitioner & Diabetologist</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Clinical directorate with 16 years of dedicated general medical practice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOOK DIRECTLY BANNER --- */}
        <div className="medical-card glossy-shine p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden text-left rtl:text-right text-white bg-slate-900/90 dark:bg-brand-cardDark/90 backdrop-blur-md border border-white/10 w-full">
          <div className="space-y-3.5 z-10">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
              Request a Specialist Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 font-sans leading-relaxed max-w-xl">
              Consult with Dr. Rajesh Wilson for metabolic profiling, thyroid monitoring, or customized insulin management protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 font-sans text-xs text-slate-350">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-primary animate-pulse-slow" />
                <span>Call Support: 8089233554 / 7092030885</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-primary" />
                <span>Email Desk: astramedlabs@gmail.com</span>
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className="w-full md:w-auto px-7 py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-md transition-transform flex items-center justify-center shrink-0 z-10"
          >
            {t('nav.bookNow')}
          </Link>
        </div>

      </div>
    </div>
  );
};
