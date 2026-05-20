import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartPulse, Award, ChevronRight, Stethoscope, ShieldCheck, Star } from 'lucide-react';
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
    { name: "Suresh Kumar", rating: 5, text: "Dr. Rajesh Wilson's diabetes management completely transformed my life. My HbA1c went from 9.2 to 6.1 in months!", tag: "Diabetes Care" },
    { name: "Fathima Hameed", rating: 5, text: "Astra Diagnostics is incredibly rapid. I received my thyroid and lipid reports within 3 hours. Pristine and automated!", tag: "Laboratory" },
    { name: "Dr. Anirudh Mehta", rating: 5, text: "As a doctor myself, I refer my patients to Astra for ultrasound and metabolic screening. Their precision and reports are state-of-the-art.", tag: "Diagnostics" }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [testimonials.length]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-dark transition-colors duration-300">
      
      {/* Light elegant medical gradient header backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-brand-primary/10 via-slate-50/5 to-transparent dark:from-brand-primary/5 dark:to-transparent pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:py-0 overflow-hidden">
        
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
            {/* Elegant Hospital Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              <HeartPulse className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-bold tracking-wider text-brand-primary uppercase font-display">
                {t('hero.badge')}
              </span>
            </div>

            {/* Clear Typography Title */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight">
              {t('hero.title1')}{' '}
              <span className="text-brand-primary">
                {t('hero.title2')}
              </span>
            </h1>

            {/* Simple Trustworthy Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-450 leading-relaxed font-sans max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* CTA Interactions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/services"
                className="group px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy shadow-md flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>{t('hero.ctaServices')}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Right Visuals - Simple Elegant Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Elegant Clean Card */}
            <div className="medical-card glossy-shine relative w-80 h-96 sm:w-96 sm:h-[420px] flex flex-col justify-between p-8 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              {/* Card top */}
              <div className="flex justify-between items-start z-10">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Stethoscope className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] uppercase font-bold tracking-widest text-brand-primary">
                  Clinical Care
                </div>
              </div>

              {/* Card Mid: Doctor Intro */}
              <div className="my-auto space-y-3.5 z-10 text-left rtl:text-right">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-slate-400 uppercase font-bold">Generalist & Consultant</span>
                  <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Dr. Rajesh Wilson</h3>
                  <p className="text-xs text-brand-primary font-display uppercase tracking-wider font-semibold">MBBS, MD., FiCPH (USA)., FIDM (U.K).</p>
                </div>
                <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Experience</span>
                    <span className="font-display font-bold text-slate-900 dark:text-white">16 Years</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Fellowships</span>
                    <span className="font-display font-bold text-slate-900 dark:text-white">U.K. & USA</span>
                  </div>
                </div>
              </div>

              {/* Card bottom */}
              <div className="flex items-center justify-between z-10 border-t border-slate-100 dark:border-slate-800/80 pt-5">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-450 tracking-wider">Astra Diagnostics Live</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Award className="w-4.5 h-4.5 text-brand-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HEALTH TIPS INFINITE TICKER (Light colors) --- */}
      <section className="relative py-4.5 bg-brand-primary/5 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800/80 overflow-hidden select-none z-10">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex space-x-12 animate-marquee-continuous font-display text-xs tracking-wider uppercase font-bold text-slate-600 dark:text-slate-350">
            <span>⚡ {t('instructions.guideline1')}</span>
            <span>✦ {t('instructions.guideline2')}</span>
            <span>⚡ {t('instructions.guideline3')}</span>
            <span>✦ {t('instructions.guideline4')}</span>
            <span>⚡ Astra Medical Center: {t('motto.text')}</span>
            <span>✦ Support Desk: 8089233554 / 7092030885</span>
          </div>
          {/* Duplicated for seamless loop */}
          <div className="flex space-x-12 animate-marquee-continuous font-display text-xs tracking-wider uppercase font-bold text-slate-600 dark:text-slate-350" aria-hidden="true">
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
      <section className="py-16 relative z-10 bg-white dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Stat Item 1 */}
            <div className="bg-slate-50/50 dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl text-center shadow-sm">
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">{t('stats.patients')}</div>
              <Counter value={150000} suffix="+" />
            </div>

            {/* Stat Item 2 */}
            <div className="bg-slate-50/50 dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl text-center shadow-sm">
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">{t('stats.experience')}</div>
              <Counter value={16} suffix="+" />
            </div>

            {/* Stat Item 3 */}
            <div className="bg-slate-50/50 dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl text-center shadow-sm">
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">{t('stats.accuracy')}</div>
              <Counter value={99} suffix=".9%" />
            </div>

            {/* Stat Item 4 */}
            <div className="bg-slate-50/50 dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl text-center shadow-sm">
              <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">{t('stats.doctors')}</div>
              <Counter value={4} suffix="+" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Service 1 */}
            <div className="medical-card glossy-shine p-7 hover:shadow-medical-hover transition-all duration-300 group text-left rtl:text-right">
              <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-5 group-hover:bg-brand-primary/20 transition-colors">
                <HeartPulse className="w-5.5 h-5.5 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2.5 group-hover:text-brand-primary transition-colors">
                {t('services.items.diabetes.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                {t('services.items.diabetes.desc')}
              </p>
              <Link to="/services" className="text-xs font-bold tracking-wider text-slate-500 hover:text-brand-primary dark:text-slate-450 dark:hover:text-brand-primary uppercase flex items-center space-x-1">
                <span>View Guidelines</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="medical-card glossy-shine p-7 hover:shadow-medical-hover transition-all duration-300 group text-left rtl:text-right">
              <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-5 group-hover:bg-brand-primary/20 transition-colors">
                <Stethoscope className="w-5.5 h-5.5 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2.5 group-hover:text-brand-primary transition-colors">
                {t('services.items.diagnostics.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                {t('services.items.diagnostics.desc')}
              </p>
              <Link to="/services" className="text-xs font-bold tracking-wider text-slate-500 hover:text-brand-primary dark:text-slate-450 dark:hover:text-brand-primary uppercase flex items-center space-x-1">
                <span>View Guidelines</span>
                <span>→</span>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="medical-card glossy-shine p-7 hover:shadow-medical-hover transition-all duration-300 group text-left rtl:text-right">
              <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-5 group-hover:bg-brand-primary/20 transition-colors">
                <ShieldCheck className="w-5.5 h-5.5 text-brand-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2.5 group-hover:text-brand-primary transition-colors">
                {t('services.items.laboratory.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-5">
                {t('services.items.laboratory.desc')}
              </p>
              <Link to="/services" className="text-xs font-bold tracking-wider text-slate-500 hover:text-brand-primary dark:text-slate-450 dark:hover:text-brand-primary uppercase flex items-center space-x-1">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-405">
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

                <div className="z-10 text-center space-y-4">
                  {/* clean avatar badge */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[3px] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white dark:bg-brand-cardDark flex items-center justify-center text-brand-primary font-display font-black text-2xl">
                      RW
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Dr. Rajesh Wilson</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-505 font-sans tracking-wide">Consultant Diabetologist & GP</p>
                  </div>
                </div>

                <div className="z-10 border-t border-slate-150 dark:border-slate-800/80 pt-4 flex justify-around text-center text-[10px] sm:text-xs">
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase">Fellow</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-350">U.K. (Diabetes)</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 dark:bg-slate-800" />
                  <div>
                    <span className="block text-[9px] text-slate-400 uppercase">Fellow</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-350">USA (Primary Care)</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SLIDER --- */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/10 relative z-10 border-t border-slate-100 dark:border-slate-850">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-10">
          
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest text-brand-primary uppercase font-display">Patient Testimonials</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
              Words of Gratitude & Success
            </h2>
          </div>

          {/* Testimonial Display Card */}
          <div className="medical-card glossy-shine relative min-h-[200px] p-8 sm:p-10 flex flex-col justify-between text-left rtl:text-right">
            <div className="flex justify-center sm:justify-start space-x-1 text-amber-400 mb-5">
              {[...Array(testimonials[activeSlide].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm sm:text-base text-slate-550 dark:text-slate-300 italic font-sans leading-relaxed mb-5">
              "{testimonials[activeSlide].text}"
            </p>

            <div className="flex flex-col items-start pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <span className="font-display font-bold text-slate-900 dark:text-white text-sm">
                {testimonials[activeSlide].name}
              </span>
              <span className="text-[9px] tracking-wider text-brand-primary uppercase font-bold mt-0.5">
                Patient • {testimonials[activeSlide].tag}
              </span>
            </div>
          </div>

          {/* Slide navigation dot togglers */}
          <div className="flex justify-center space-x-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-7 bg-brand-primary'
                    : 'bg-slate-205 dark:bg-slate-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
