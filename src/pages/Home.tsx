import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartPulse, Award, ChevronRight, ChevronLeft, Stethoscope, ShieldCheck, Star, ExternalLink, Users, Clock, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom useInView hook for performant scroll triggering without third-party dependencies
const useInView = (options?: { triggerOnce?: boolean; threshold?: number | number[] }) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!options?.triggerOnce) {
            setInView(false);
          }
        }
      },
      { threshold: options?.threshold }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options?.triggerOnce, options?.threshold]);

  return { ref, inView };
};

// Simple CountUp helper component
const Counter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = '', duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl text-brand-navy dark:text-brand-secondary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: "Arun Kumar",
      rating: 5,
      meta: "5 reviews · 8 months ago",
      text: "Astra Medical Center & Diagnostics offers Excellent treatment and patients friendly I had a good experience  and The doctors were professional and explained everything clearly about the treatment and the nursing staff were kind, supportive, and attentive throughout my stay. The hospital was clean and well maintained. Overall, I felt safe and well cared.",
      tag: "Google Review"
    },
    {
      name: "Dr Bikie John",
      rating: 5,
      meta: "3 reviews · 2 photos · a year ago",
      text: "I had a truly wonderful experience with Aster medical center & diagnostic which is highlighted with professional, friendly, and efficient staff, minimal wait times, a clean and comfortable environment, and thorough knowledgeable doctors.",
      ownerResponse: "Thank you madam",
      ownerResponseDate: "a year ago",
      tag: "Google Review"
    },
    {
      name: "Mukesh V. D",
      rating: 5,
      meta: "2 reviews · 2 months ago",
      text: "Dr Rajesh Wilson is an amazing doctor. The staff are also very warm and hospitable. The services are excellent and good.",
      tag: "Google Review"
    },
    {
      name: "SREESHMA TP",
      rating: 5,
      meta: "3 reviews · 6 months ago",
      text: "Now i experienced there all staff nurse and doctor very good service for me now my health condition is well ok.",
      ownerResponse: "Thanks a lot Sreshma madam.",
      ownerResponseDate: "6 months ago",
      tag: "Google Review"
    },
    {
      name: "Vishnu Cu",
      rating: 5,
      meta: "1 review · 1 photo · a year ago",
      text: "Very good hospitality of Astra clinic perinjananm and thanks for Dr rajesh Wilson famous diabetics specialist good service.",
      tag: "Google Review"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark transition-colors duration-300">
      
      {/* Light elegant medical gradient header backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-brand-primary/5 dark:to-transparent pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-36 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        
        {/* Premium Clinical Hero Background Image */}
        <div className="absolute right-0 top-0 w-full lg:w-[50%] h-full z-0 opacity-25 lg:opacity-40 dark:opacity-20 pointer-events-none transition-all duration-500">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          {/* Soothing gradient masks to blend cleanly with light/dark theme backgrounds and ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent dark:from-brand-dark dark:via-brand-dark/60 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent dark:from-brand-dark" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left rtl:text-right"
          >

            {/* Clear Typography Title */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight tracking-tight">
              {t('hero.title1')}{' '}
              <span className="text-brand-primary">
                {t('hero.title2')}
              </span>
            </h1>

            {/* Simple Trustworthy Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* Primary & Secondary Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>{t('nav.bookNow') || 'Book Consultation'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider uppercase text-slate-700 dark:text-slate-200 bg-white dark:bg-brand-cardDark hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>{t('hero.ctaServices')}</span>
              </Link>
            </div>

            {/* Clinical Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Dr. Rajesh Wilson (UK & USA Fellow)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>24/7 Automated Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>5.0 ⭐ Patient Rated</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visuals - Simple Elegant Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Elegant Clean Card with low-transparency doctor background and styled stat boxes */}
            <div className="medical-card glossy-shine relative w-full max-w-sm sm:max-w-md min-h-[460px] flex flex-col justify-between p-7 overflow-hidden rounded-[28px] shadow-medical hover:shadow-medical-hover transition-all duration-300 group">
              
              {/* Doctor Photo Watermark Background with low transparency - Full Card Coverage */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                <img 
                  src="/dr-rajesh-wilson.jpg" 
                  alt="Dr. Rajesh Wilson" 
                  className="w-full h-full object-cover object-[center_15%] opacity-35 filter contrast-110"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px]" />
              </div>

              {/* Top Controls Row */}
              <div className="flex justify-between items-center z-10 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary shadow-sm backdrop-blur-sm">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-[10px] uppercase font-bold tracking-widest text-brand-primary shadow-sm backdrop-blur-sm">
                  Clinical Care
                </div>
              </div>

              {/* Doctor Profile Info Box */}
              <div className="z-10 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-center gap-3.5 my-auto">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px] shadow-sm overflow-hidden">
                  <img 
                    src="/dr-rajesh-wilson.jpg" 
                    alt="Dr. Rajesh Wilson" 
                    className="w-full h-full rounded-2xl object-cover object-top"
                  />
                </div>
                <div className="space-y-0.5 text-left rtl:text-right">
                  <span className="text-[10px] tracking-widest text-brand-primary uppercase font-bold block">Senior Consultant</span>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">Dr. Rajesh Wilson</h3>
                  <p className="text-[11px] text-slate-500 font-semibold font-sans">MBBS, MD., FiCPH (USA), FIDM (UK)</p>
                </div>
              </div>

              {/* Experience and Fellowships Boxes */}
              <div className="grid grid-cols-2 gap-3 z-10 text-left rtl:text-right my-4">
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-1">
                  <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Experience</span>
                  <span className="font-display font-bold text-slate-900 text-lg leading-none block">16+ Years</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-1">
                  <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Fellowships</span>
                  <span className="font-display font-bold text-slate-900 text-lg leading-none block">U.K. & USA</span>
                </div>
              </div>

              {/* Bottom Live Status Box */}
              <div className="flex items-center justify-between z-10 p-3 px-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-slate-700 tracking-wide font-sans">Astra Diagnostics Live</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary">
                  <Award className="w-4.5 h-4.5" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HEALTH TIPS INFINITE TICKER (Light colors) --- */}
      <section className="relative py-4.5 bg-brand-primary/5 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800/80 overflow-hidden select-none z-10">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex space-x-12 animate-marquee-continuous font-display text-xs tracking-wider uppercase font-bold text-slate-600 dark:text-slate-400">
            <span>⚡ {t('instructions.guideline1')}</span>
            <span>✦ {t('instructions.guideline2')}</span>
            <span>⚡ {t('instructions.guideline3')}</span>
            <span>✦ {t('instructions.guideline4')}</span>
            <span>⚡ Astra Medical Center: {t('motto.text')}</span>
            <span>✦ Support Desk: 8089233554 / 7092030885</span>
          </div>
          {/* Duplicated for seamless loop */}
          <div className="flex space-x-12 animate-marquee-continuous font-display text-xs tracking-wider uppercase font-bold text-slate-600 dark:text-slate-400" aria-hidden="true">
            <span>⚡ {t('instructions.guideline1')}</span>
            <span>✦ {t('instructions.guideline2')}</span>
            <span>⚡ {t('instructions.guideline3')}</span>
            <span>✦ {t('instructions.guideline4')}</span>
            <span>⚡ Astra Medical Center: {t('motto.text')}</span>
            <span>✦ Support Desk: 8089233554 / 7092030885</span>
          </div>
        </div>
      </section>

      {/* --- STATS COUNTER SECTION --- */}
      <section className="py-16 relative z-10 bg-white dark:bg-brand-dark border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Stat Item 1 */}
            <div className="medical-card glossy-shine p-6 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 mx-auto flex items-center justify-center text-brand-primary mb-3">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-1.5">{t('stats.patients')}</div>
              <Counter value={10} suffix=" Lakh+" />
            </div>

            {/* Stat Item 2 */}
            <div className="medical-card glossy-shine p-6 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 mx-auto flex items-center justify-center text-brand-primary mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-1.5">{t('stats.experience')}</div>
              <Counter value={16} suffix="+" />
            </div>

            {/* Stat Item 3 */}
            <div className="medical-card glossy-shine p-6 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 mx-auto flex items-center justify-center text-brand-primary mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-1.5">{t('stats.accuracy')}</div>
              <Counter value={99} suffix=".9%" />
            </div>

            {/* Stat Item 4 */}
            <div className="medical-card glossy-shine p-6 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 mx-auto flex items-center justify-center text-brand-primary mb-3">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-1.5">{t('stats.doctors')}</div>
              <Counter value={3} suffix="+" />
            </div>
            
          </div>
        </div>
      </section>

      {/* --- CLINICAL SERVICES TEASER (5 main categories) --- */}
      <section className="py-20 bg-slate-50/30 dark:bg-slate-900/10 relative z-10 border-y border-slate-100 dark:border-slate-800/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3 text-left rtl:text-right">
              <div className="text-xs font-bold tracking-widest text-brand-primary uppercase font-display">{t('services.title')}</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                Our Core Medical & Clinical Specialties
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 font-display font-bold text-xs tracking-wider uppercase text-brand-primary hover:text-brand-navy dark:hover:text-white transition-colors"
            >
              <span>{t('services.viewAll')}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* Service 1 */}
            <div className="medical-card glossy-shine p-7 sm:p-8 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left rtl:text-right flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <HeartPulse className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {t('services.items.diabetes.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                  {t('services.items.diabetes.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold tracking-wider text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>View Guidelines</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="medical-card glossy-shine p-7 sm:p-8 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left rtl:text-right flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <Stethoscope className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {t('services.items.diagnostics.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                  {t('services.items.diagnostics.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold tracking-wider text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>View Guidelines</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="medical-card glossy-shine p-7 sm:p-8 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left rtl:text-right flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {t('services.items.laboratory.title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                  {t('services.items.laboratory.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold tracking-wider text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>View Guidelines</span>
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* --- DOCTOR SPOTLIGHT --- */}
      <section className="py-20 relative z-10 bg-white dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Dr. Wilson Credentials Left */}
            <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
              <div className="text-xs font-bold tracking-widest text-brand-primary uppercase font-display">{t('doctor.title')}</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                {t('doctor.name')}
              </h2>
              <div className="text-xs font-bold text-brand-primary tracking-wider uppercase font-display bg-brand-primary/5 border border-brand-primary/15 px-3 py-1.5 rounded-lg inline-block">
                {t('doctor.qualifications')}
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                {t('doctor.bio')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>{t('doctor.credentials.usa')}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>{t('doctor.credentials.uk')}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>{t('doctor.credentials.md')}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/team"
                  className="px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm inline-flex items-center justify-center transition-all duration-200"
                >
                  {t('doctor.viewProfile')}
                </Link>
              </div>
            </div>

            {/* Elegant Doctor Profile Frame Graphic Right */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="medical-card glossy-shine relative w-80 h-96 sm:w-96 sm:h-[400px] p-8 flex flex-col justify-between overflow-hidden shadow-sm">
                
                {/* layout design inside card */}
                <div className="flex justify-between items-start z-10">
                  <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Senior Practitioner</span>
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">16y</div>
                </div>

                <div className="z-10 text-center space-y-3">
                  {/* Doctor photo badge */}
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-1 shadow-md overflow-hidden">
                    <img
                      src="/dr-rajesh-wilson.jpg"
                      alt="Dr. Rajesh Wilson"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Dr. Rajesh Wilson</h3>
                    <p className="text-xs text-brand-primary font-semibold font-sans tracking-wide">Consultant Diabetologist & GP</p>
                  </div>
                </div>

                <div className="z-10 border-t border-slate-200 dark:border-slate-800/80 pt-4 flex justify-around text-center text-[10px] sm:text-xs">
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase">Fellow</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-400">U.K. (Diabetes)</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 dark:bg-slate-800" />
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase">Fellow</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-400">USA (Primary Care)</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SLIDER --- */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/10 relative z-10 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-10">
          
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest text-brand-primary uppercase font-display">Patient Testimonials</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
              Words of Gratitude & Patient Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-lg mx-auto">
              Real experiences and feedback shared by patients on our clinical excellence and healthcare services.
            </p>
          </div>

          {/* Google Reviews Live Summary Scorecard */}
          <div className="medical-card glossy-shine p-6 sm:p-8 max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 text-left rtl:text-right shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Star Distribution Bars Left */}
              <div className="w-full sm:w-3/5 space-y-2 font-sans">
                {[
                  { star: 5, pct: '97%' },
                  { star: 4, pct: '3%' },
                  { star: 3, pct: '0%' },
                  { star: 2, pct: '0%' },
                  { star: 1, pct: '0%' }
                ].map((item) => (
                  <div key={item.star} className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-2.5 text-right font-semibold">{item.star}</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: item.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Score & Stars Right */}
              <div className="w-full sm:w-2/5 flex flex-col items-center sm:items-start pl-0 sm:pl-6 sm:border-l border-slate-100 dark:border-slate-800 text-center sm:text-left rtl:sm:text-right rtl:sm:border-l-0 rtl:sm:border-r rtl:sm:pr-6 rtl:sm:pl-0">
                <span className="font-display font-black text-5xl sm:text-6xl text-slate-900 dark:text-white leading-none">
                  5.0
                </span>
                <div className="flex space-x-1 text-amber-400 my-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  192 reviews on Google
                </span>
                <a
                  href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white transition-colors"
                >
                  <span>Google Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

          {/* Testimonial Display Card */}
          <div className="medical-card glossy-shine relative min-h-[260px] p-8 sm:p-10 flex flex-col justify-between text-left rtl:text-right shadow-sm transition-all duration-300 overflow-hidden">
            {/* Decorative Quote Mark */}
            <Quote className="w-16 h-16 text-brand-primary/10 absolute right-6 top-6 pointer-events-none rotate-180 select-none" />
            <div className="relative z-10">
              {/* Header: Rating & Google Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center space-x-1.5">
                  <div className="flex space-x-0.5 text-amber-400">
                    {[...Array(testimonials[activeSlide].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">5.0</span>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Google Review</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="relative mb-5">
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic font-sans leading-relaxed">
                  "{testimonials[activeSlide].text}"
                </p>
              </div>

              {/* Response from owner if exists */}
              {testimonials[activeSlide].ownerResponse && (
                <div className="mt-4 mb-5 p-3.5 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border-l-2 border-brand-primary text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-brand-primary text-[11px] tracking-wide uppercase">
                      Response from the owner
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {testimonials[activeSlide].ownerResponseDate}
                    </span>
                  </div>
                  <p className="italic text-slate-700 dark:text-slate-200">
                    "{testimonials[activeSlide].ownerResponse}"
                  </p>
                </div>
              )}
            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-display font-bold text-sm">
                  {testimonials[activeSlide].name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-display font-bold text-slate-900 dark:text-white text-sm block">
                    {testimonials[activeSlide].name}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                    {testimonials[activeSlide].meta}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline text-[11px]">Verified Experience</span>
              </div>
            </div>
          </div>

          {/* Slide navigation controls: Prev, Dots, Next */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex justify-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? 'w-7 bg-brand-primary'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
