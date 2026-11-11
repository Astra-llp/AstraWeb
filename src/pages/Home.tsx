import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartPulse, Award, ChevronRight, ChevronLeft, Stethoscope, ShieldCheck, Star, ExternalLink, Users, Clock, Quote, Bed, MapPin } from 'lucide-react';
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

// Simple CountUp helper component with responsive sizing for localized suffixes
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
    <span
      ref={ref}
      className="numeric-counter font-display font-black text-xl sm:text-3xl xl:text-4xl text-brand-navy dark:text-brand-secondary leading-tight block"
    >
      <span lang="en">{count.toLocaleString()}</span>{suffix}
    </span>
  );
};

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: "Arun Kumar",
      rating: 5,
      meta: "5 reviews · 8 months ago",
      text: "Astra Medical Center & Diagnostics offers Excellent treatment and patients friendly I had a good experience and The doctors were professional and explained everything clearly about the treatment and the nursing staff were kind, supportive, and attentive throughout my stay. The hospital was clean and well maintained. Overall, I felt safe and well cared.",
    },
    {
      name: "Dr Bikie John",
      rating: 5,
      meta: "3 reviews · 2 photos · a year ago",
      text: "I had a truly wonderful experience with Aster medical center & diagnostic which is highlighted with professional, friendly, and efficient staff, minimal wait times, a clean and comfortable environment, and thorough knowledgeable doctors.",
      ownerResponse: "Thank you madam",
      ownerResponseDate: "a year ago",
    },
    {
      name: "Mukesh V. D",
      rating: 5,
      meta: "2 reviews · 2 months ago",
      text: "Dr Rajesh Wilson is an amazing doctor. The staff are also very warm and hospitable. The services are excellent and good.",
    },
    {
      name: "SREESHMA TP",
      rating: 5,
      meta: "3 reviews · 6 months ago",
      text: "Now i experienced there all staff nurse and doctor very good service for me now my health condition is well ok.",
      ownerResponse: "Thanks a lot Sreshma madam.",
      ownerResponseDate: "6 months ago",
    },
    {
      name: "Vishnu Cu",
      rating: 5,
      meta: "1 review · 1 photo · a year ago",
      text: "Very good hospitality of Astra clinic perinjananm and thanks for Dr rajesh Wilson famous diabetics specialist good service.",
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

  const isIndic = i18n.language !== 'en';

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark transition-colors duration-300">

      {/* Light elegant medical gradient header backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[560px] bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-brand-primary/5 dark:to-transparent pointer-events-none" />

      {/* --- HERO SECTION (Dedicated Mobile App-First Card vs Desktop Dual-Column) --- */}
      <section className="relative min-h-0 lg:min-h-[88vh] flex items-center pt-24 pb-12 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">

        {/* Premium Clinical Hero Background Image */}
        <div className="absolute right-0 top-0 w-full lg:w-[50%] h-full z-0 opacity-20 lg:opacity-40 dark:opacity-20 pointer-events-none transition-all duration-500">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent dark:from-brand-dark dark:via-brand-dark/60 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-brand-dark" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent dark:from-brand-dark" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 lg:space-y-6 text-center lg:text-left"
          >
            {/* Mobile Location Chip (< lg) */}
            <div className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-bold">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{t('hero.mobileBadge')}</span>
              <span className="opacity-40">•</span>
              <span lang="en">5.0 ⭐</span>
            </div>

            {/* Clear Typography Title */}
            <h1
              className={`font-display font-black text-slate-900 dark:text-white ${
                isIndic
                  ? 'text-[26px] sm:text-4xl lg:text-[2.6rem] xl:text-5xl leading-[1.35]'
                  : 'text-[32px] sm:text-5xl lg:text-[3.25rem] xl:text-6xl leading-[1.12] tracking-tight'
              }`}
            >
              {t('hero.title1')}{' '}
              <span className="text-brand-primary block sm:inline">
                {t('hero.title2')}
              </span>
            </h1>

            {/* Trustworthy Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* Mobile-Only Compact Lead Doctor Strip (< lg) - Keeps Everything Above the Fold */}
            <Link
              to="/team"
              className="lg:hidden medical-card p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5 text-left max-w-md mx-auto active:scale-[0.99] transition-transform"
            >
              <div className="relative w-14 h-14 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px] overflow-hidden shadow-sm">
                  <img
                    src="/dr-rajesh-wilson.jpg"
                    alt="Dr. Rajesh Wilson"
                    className="w-full h-full rounded-[14px] object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-brand-primary uppercase">
                    {t('doctor.seniorConsultant')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    {t('doctor.expValue')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                  {t('doctor.name')}
                </h3>
                <p lang="en" className="text-[10px] text-slate-500 font-semibold truncate">
                  {t('doctor.qualifications')}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </Link>

            {/* Dual Action CTAs */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-center lg:justify-start items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 max-w-md sm:max-w-none mx-auto">
              <Link
                to="/contact"
                className="px-4 sm:px-6 py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 text-center"
              >
                <span>{t('hero.ctaEmergency')}</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </Link>
              <Link
                to="/services"
                className="px-4 sm:px-6 py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm uppercase text-slate-700 dark:text-slate-200 bg-white dark:bg-brand-cardDark hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 text-center"
              >
                <span>{t('hero.ctaServices')}</span>
              </Link>
            </div>

            {/* Clinical Trust Badges */}
            <div className="pt-1 sm:pt-2 grid grid-cols-2 lg:flex lg:flex-wrap justify-items-start items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 max-w-md sm:max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-start sm:items-center gap-1.5">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{t('hero.trustFellow')}</span>
              </div>
              <div className="flex items-start sm:items-center gap-1.5">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{t('hero.trustFoundation')}</span>
              </div>
              <div className="flex items-start sm:items-center gap-1.5">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{t('hero.trustDayCare')}</span>
              </div>
              <div className="flex items-start sm:items-center gap-1.5">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{t('hero.trustRated')}</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Hero Right Visuals - Rich Doctor Showcase Card (hidden on mobile where compact card is used) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex lg:col-span-5 relative justify-center items-center"
          >
            <div className="medical-card glossy-shine relative w-full max-w-md min-h-[450px] flex flex-col justify-between p-7 overflow-hidden rounded-[28px] shadow-medical hover:shadow-medical-hover transition-all duration-300 group">

              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                <img
                  src="/dr-rajesh-wilson.jpg"
                  alt="Dr. Rajesh Wilson"
                  className="w-full h-full object-cover object-[center_15%] opacity-35 filter contrast-110"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px]" />
              </div>

              <div className="flex justify-between items-center z-10 mb-4 gap-2">
                <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary shadow-sm backdrop-blur-sm shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-[11px] uppercase font-bold text-brand-primary shadow-sm backdrop-blur-sm">
                  {t('doctor.cardBadge')}
                </div>
              </div>

              <div className="z-10 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-center gap-3.5 my-auto">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px] shadow-sm overflow-hidden">
                  <img
                    src="/dr-rajesh-wilson.jpg"
                    alt="Dr. Rajesh Wilson"
                    className="w-full h-full rounded-2xl object-cover object-top"
                  />
                </div>
                <div className="space-y-1 text-left min-w-0">
                  <span className="text-[11px] text-brand-primary uppercase font-bold block leading-snug">
                    {t('doctor.seniorConsultant')}
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                    {t('doctor.name')}
                  </h3>
                  <p lang="en" className="text-[11px] text-slate-500 font-semibold font-sans leading-snug">
                    {t('doctor.qualifications')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 z-10 text-left my-4">
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-1.5">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold leading-snug">
                    {t('doctor.expLabel')}
                  </span>
                  <span className="font-display font-bold text-slate-900 text-lg leading-snug block">
                    {t('doctor.expValue')}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-1.5">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold leading-snug">
                    {t('doctor.fellowshipsLabel')}
                  </span>
                  <span lang="en" className="font-display font-bold text-slate-900 text-lg leading-snug block">
                    {t('doctor.fellowshipsValue')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between z-10 p-3 px-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm gap-2">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-slate-700 font-sans leading-snug">
                    {t('doctor.liveStatus')}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary shrink-0">
                  <Award className="w-4 h-4" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HEALTH TIPS INFINITE TICKER --- */}
      <section className="relative py-3.5 sm:py-4 bg-brand-primary/5 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800/80 overflow-hidden select-none z-10">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex items-center space-x-10 sm:space-x-12 animate-marquee-continuous font-display text-[11px] sm:text-xs uppercase font-bold text-slate-600 dark:text-slate-400">
            <span>⚡ {t('hero.tickerBrand')}: {t('motto.text')}</span>
            <span>✦ {t('motto.secondary')}</span>
            <span>⚡ {t('hero.tickerFoundation')}</span>
            <span>✦ {t('hero.tickerDayCare')}</span>
            <span>⚡ {t('instructions.guideline1')}</span>
            <span>✦ {t('hero.tickerSupport')}</span>
          </div>
          <div className="flex items-center space-x-10 sm:space-x-12 animate-marquee-continuous font-display text-[11px] sm:text-xs uppercase font-bold text-slate-600 dark:text-slate-400" aria-hidden="true">
            <span>⚡ {t('hero.tickerBrand')}: {t('motto.text')}</span>
            <span>✦ {t('motto.secondary')}</span>
            <span>⚡ {t('hero.tickerFoundation')}</span>
            <span>✦ {t('hero.tickerDayCare')}</span>
            <span>⚡ {t('instructions.guideline1')}</span>
            <span>✦ {t('hero.tickerSupport')}</span>
          </div>
        </div>
      </section>

      {/* --- STATS COUNTER SECTION --- */}
      <section className="py-10 sm:py-16 relative z-10 bg-white dark:bg-brand-dark border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">

            <div className="medical-card glossy-shine p-4 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 sm:mb-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1.5 sm:mb-2 min-h-[2.2em] flex items-center justify-center leading-snug">
                {t('stats.patients')}
              </div>
              <Counter value={10} suffix={t('stats.lakhSuffix')} />
            </div>

            <div className="medical-card glossy-shine p-4 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 sm:mb-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1.5 sm:mb-2 min-h-[2.2em] flex items-center justify-center leading-snug">
                {t('stats.experience')}
              </div>
              <Counter value={16} suffix="+" />
            </div>

            <div className="medical-card glossy-shine p-4 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 sm:mb-3">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1.5 sm:mb-2 min-h-[2.2em] flex items-center justify-center leading-snug">
                {t('stats.accuracy')}
              </div>
              <Counter value={99} suffix=".9%" />
            </div>

            <div className="medical-card glossy-shine p-4 sm:p-7 rounded-2xl text-center shadow-sm hover:shadow-medical hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 sm:mb-3">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1.5 sm:mb-2 min-h-[2.2em] flex items-center justify-center leading-snug">
                {t('stats.doctors')}
              </div>
              <Counter value={3} suffix="+" />
            </div>

          </div>
        </div>
      </section>

      {/* --- CLINICAL SERVICES TEASER (Horizontal Snap Carousel on Mobile, Grid on Tablet/Desktop) --- */}
      <section className="py-12 sm:py-20 bg-slate-50/30 dark:bg-slate-900/10 relative z-10 border-y border-slate-100 dark:border-slate-800/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3 text-left">
              <div className="text-xs font-bold text-brand-primary uppercase font-display">{t('services.title')}</div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-snug">
                {t('services.teaserHeading')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl">
                {t('services.teaserSub')}
              </p>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="md:hidden text-[11px] font-bold text-slate-400">
                {t('hero.swipeHint')}
              </span>
              <Link
                to="/services"
                className="inline-flex items-center space-x-1.5 font-display font-bold text-xs uppercase text-brand-primary hover:text-brand-navy dark:hover:text-white transition-colors shrink-0"
              >
                <span>{t('services.viewAll')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-3 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible md:mx-0 md:px-0 md:pb-0 items-stretch">

            {/* Service 1: Astra Diabetic Foundation */}
            <div className="medical-card glossy-shine w-[80vw] max-w-[305px] md:w-auto md:max-w-none shrink-0 snap-start p-5 sm:p-7 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-primary/20 transition-colors">
                  <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                  {t('services.items.diabetes.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                  {t('services.items.diabetes.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-3.5 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>{t('services.exploreDetails')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Service 2: General Consultation & Family Physician */}
            <div className="medical-card glossy-shine w-[80vw] max-w-[305px] md:w-auto md:max-w-none shrink-0 snap-start p-5 sm:p-7 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-primary/20 transition-colors">
                  <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                  {t('services.items.consultation.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                  {t('services.items.consultation.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-3.5 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>{t('services.exploreDetails')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Service 3: Advanced Diagnostic Laboratory */}
            <div className="medical-card glossy-shine w-[80vw] max-w-[305px] md:w-auto md:max-w-none shrink-0 snap-start p-5 sm:p-7 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-primary/20 transition-colors">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                  {t('services.items.laboratory.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                  {t('services.items.laboratory.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-3.5 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>{t('services.exploreDetails')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Service 4: State-of-the-Art Day Care Center */}
            <div className="medical-card glossy-shine w-[80vw] max-w-[305px] md:w-auto md:max-w-none shrink-0 snap-start p-5 sm:p-7 hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 group text-left flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-primary/20 transition-colors">
                  <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                  {t('services.items.daycare.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                  {t('services.items.daycare.desc')}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white uppercase flex items-center space-x-1.5 pt-3.5 border-t border-slate-100 dark:border-slate-800 transition-colors">
                <span>{t('services.exploreDetails')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* --- DOCTOR SPOTLIGHT (Clean credential overview on Mobile, paired with Graphic Card on Desktop) --- */}
      <section className="py-12 sm:py-20 relative z-10 bg-white dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Dr. Wilson Credentials Left */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <div className="text-xs font-bold text-brand-primary uppercase font-display">{t('doctor.title')}</div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-snug">
                {t('doctor.name')}
              </h2>
              <div lang="en" className="text-xs font-bold text-brand-primary uppercase font-display bg-brand-primary/5 border border-brand-primary/15 px-3 py-1.5 rounded-lg inline-block">
                {t('doctor.qualifications')}
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                {t('doctor.bio')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
                  <span>{t('doctor.credentials.usa')}</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
                  <span>{t('doctor.credentials.uk')}</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
                  <span>{t('doctor.credentials.md')}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/team"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-sm inline-flex items-center justify-center transition-all duration-200"
                >
                  {t('doctor.viewProfile')}
                </Link>
              </div>
            </div>

            {/* Desktop Doctor Profile Graphic Right (Hidden on Mobile to avoid redundant card repeat) */}
            <div className="hidden lg:flex lg:col-span-5 justify-center">
              <div className="medical-card glossy-shine relative w-full max-w-sm min-h-[390px] p-8 flex flex-col justify-between gap-4 overflow-hidden shadow-sm">

                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{t('doctor.seniorPractitioner')}</span>
                  <div lang="en" className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs shrink-0">16y</div>
                </div>

                <div className="z-10 text-center space-y-3">
                  <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-1 shadow-md overflow-hidden">
                    <img
                      src="/dr-rajesh-wilson.jpg"
                      alt="Dr. Rajesh Wilson"
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-snug">{t('doctor.name')}</h3>
                    <p className="text-xs text-brand-primary font-semibold font-sans leading-snug">{t('doctor.roleShort')}</p>
                  </div>
                </div>

                <div className="z-10 border-t border-slate-200 dark:border-slate-800/80 pt-4 flex justify-around text-center text-xs gap-2">
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase">{t('doctor.fellowLabel')}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-400">{t('doctor.ukDiabetes')}</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 dark:bg-slate-800" />
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase">{t('doctor.fellowLabel')}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-400">{t('doctor.usaPrimaryCare')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CLINICAL FACILITY SHOWCASE (Horizontal Swipe Photo Reel on Mobile, Grid on Desktop) --- */}
      <section className="py-12 sm:py-20 relative z-10 bg-slate-50/40 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div className="space-y-2 sm:space-y-3 text-left max-w-2xl">
              <div className="text-xs font-bold text-brand-primary uppercase font-display">{t('facility.badge')}</div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-snug">
                {t('facility.title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                {t('facility.subtitle')}
              </p>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="md:hidden text-[11px] font-bold text-slate-400">
                {t('hero.swipeHint')}
              </span>
              <Link
                to="/gallery"
                className="inline-flex items-center space-x-1.5 font-display font-bold text-xs uppercase text-brand-primary hover:text-brand-navy dark:hover:text-white transition-colors shrink-0"
              >
                <span>{t('facility.viewGallery')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-3 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">

            <Link
              to="/gallery"
              className="medical-card glossy-shine group w-[78vw] max-w-[295px] sm:w-auto sm:max-w-none shrink-0 snap-start rounded-2xl overflow-hidden shadow-medical hover:shadow-medical-hover transition-all duration-300 flex flex-col bg-white dark:bg-brand-cardDark text-left"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src="/front.jpg"
                  alt={t('facility.cards.front.title')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-1 flex-1 flex flex-col justify-center">
                <h3 className="font-display font-bold text-sm sm:text-base leading-snug text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{t('facility.cards.front.title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-snug">{t('facility.cards.front.sub')}</p>
              </div>
            </Link>

            <Link
              to="/gallery"
              className="medical-card glossy-shine group w-[78vw] max-w-[295px] sm:w-auto sm:max-w-none shrink-0 snap-start rounded-2xl overflow-hidden shadow-medical hover:shadow-medical-hover transition-all duration-300 flex flex-col bg-white dark:bg-brand-cardDark text-left"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src="/reception.jpg"
                  alt={t('facility.cards.reception.title')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-1 flex-1 flex flex-col justify-center">
                <h3 className="font-display font-bold text-sm sm:text-base leading-snug text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{t('facility.cards.reception.title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-snug">{t('facility.cards.reception.sub')}</p>
              </div>
            </Link>

            <Link
              to="/gallery"
              className="medical-card glossy-shine group w-[78vw] max-w-[295px] sm:w-auto sm:max-w-none shrink-0 snap-start rounded-2xl overflow-hidden shadow-medical hover:shadow-medical-hover transition-all duration-300 flex flex-col bg-white dark:bg-brand-cardDark text-left"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src="/waiting-area.jpg"
                  alt={t('facility.cards.lab.title')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-1 flex-1 flex flex-col justify-center">
                <h3 className="font-display font-bold text-sm sm:text-base leading-snug text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{t('facility.cards.lab.title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-snug">{t('facility.cards.lab.sub')}</p>
              </div>
            </Link>

            <Link
              to="/gallery"
              className="medical-card glossy-shine group w-[78vw] max-w-[295px] sm:w-auto sm:max-w-none shrink-0 snap-start rounded-2xl overflow-hidden shadow-medical hover:shadow-medical-hover transition-all duration-300 flex flex-col bg-white dark:bg-brand-cardDark text-left"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src="/waiting-area-consultation.jpg"
                  alt={t('facility.cards.consultation.title')}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 space-y-1 flex-1 flex flex-col justify-center">
                <h3 className="font-display font-bold text-sm sm:text-base leading-snug text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{t('facility.cards.consultation.title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-snug">{t('facility.cards.consultation.sub')}</p>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* --- TESTIMONIALS SLIDER --- */}
      <section className="py-12 sm:py-20 bg-slate-50/50 dark:bg-slate-900/10 relative z-10 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7 sm:space-y-10">

          <div className="space-y-2.5 sm:space-y-3">
            <div className="text-xs font-bold text-brand-primary uppercase font-display">{t('testimonials.badge')}</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-snug">
              {t('testimonials.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-lg mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          {/* Google Reviews Scorecard - Compact horizontal pill on Mobile, Detailed Breakdown on sm+ */}
          <div className="sm:hidden medical-card p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <span lang="en" className="numeric-counter font-display font-black text-3xl text-slate-900 leading-none">
                5.0
              </span>
              <div>
                <div className="flex space-x-0.5 text-amber-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  {t('testimonials.reviewsCount')}
                </span>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-brand-primary/10 text-brand-primary text-[11px] font-bold flex items-center gap-1 shrink-0"
            >
              <span>{t('testimonials.googleProfile')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Desktop / Tablet Scorecard */}
          <div className="hidden sm:block medical-card glossy-shine p-8 max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 text-left shadow-sm">
            <div className="flex flex-row items-center justify-between gap-6">

              <div className="w-3/5 space-y-2 font-sans">
                {[
                  { star: 5, pct: '97%' },
                  { star: 4, pct: '3%' },
                  { star: 3, pct: '0%' },
                  { star: 2, pct: '0%' },
                  { star: 1, pct: '0%' }
                ].map((item) => (
                  <div key={item.star} className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                    <span lang="en" className="w-2.5 text-right font-semibold">{item.star}</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: item.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-2/5 flex flex-col items-start pl-6 border-l border-slate-100 dark:border-slate-800 text-left">
                <span lang="en" className="numeric-counter font-display font-black text-6xl text-slate-900 dark:text-white leading-none">
                  5.0
                </span>
                <div className="flex space-x-1 text-amber-400 my-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t('testimonials.reviewsCount')}
                </span>
                <a
                  href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-brand-primary hover:text-brand-navy dark:hover:text-white transition-colors"
                >
                  <span>{t('testimonials.googleProfile')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

          {/* Testimonial Display Card */}
          <div className="medical-card glossy-shine relative min-h-[210px] sm:min-h-[260px] p-5 sm:p-10 flex flex-col justify-between text-left shadow-sm transition-all duration-300 overflow-hidden">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-brand-primary/10 absolute right-4 sm:right-6 top-4 sm:top-6 pointer-events-none rotate-180 select-none" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex items-center space-x-1.5">
                  <div className="flex space-x-0.5 text-amber-400">
                    {[...Array(testimonials[activeSlide].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span lang="en" className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">5.0</span>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">{t('testimonials.googleReviewTag')}</span>
                </div>
              </div>

              <div className="relative mb-4 sm:mb-5">
                <p lang="en" className="text-xs sm:text-base text-slate-600 dark:text-slate-300 italic font-sans leading-relaxed">
                  "{testimonials[activeSlide].text}"
                </p>
              </div>

              {testimonials[activeSlide].ownerResponse && (
                <div className="mt-3 sm:mt-4 mb-4 sm:mb-5 p-3 sm:p-3.5 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border-l-2 border-brand-primary text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-brand-primary text-[11px] uppercase">
                      {t('testimonials.ownerResponseLabel')}
                    </span>
                    <span lang="en" className="text-[10px] text-slate-400">
                      {testimonials[activeSlide].ownerResponseDate}
                    </span>
                  </div>
                  <p lang="en" className="italic text-slate-700 dark:text-slate-200">
                    "{testimonials[activeSlide].ownerResponse}"
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800/80 gap-2">
              <div className="flex items-center space-x-3">
                <div lang="en" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
                  {testimonials[activeSlide].name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span lang="en" className="font-display font-bold text-slate-900 dark:text-white text-sm block">
                    {testimonials[activeSlide].name}
                  </span>
                  <span lang="en" className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                    {testimonials[activeSlide].meta}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline text-[11px]">{t('testimonials.verified')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
