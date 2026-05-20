import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  // Floating focus state
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusMsg, setFocusMsg] = useState(false);

  // Status flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !service) {
      setErrorMsg("Please fill in Name, Phone Number, and select a Clinical Department.");
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate clinical API transmit latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Clear form fields
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
    }, 2000);
  };

  const contactCards = [
    {
      icon: Phone,
      title: t('contact.cardPhone'),
      details: ["8089233554", "7092030885"],
      link: "tel:8089233554"
    },
    {
      icon: Mail,
      title: t('contact.cardEmail'),
      details: ["astramedlabs@gmail.com"],
      link: "mailto:astramedlabs@gmail.com"
    },
    {
      icon: MapPin,
      title: t('contact.cardAddress'),
      details: [t('contact.addressValue')],
      link: "https://maps.google.com"
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 overflow-hidden transition-colors duration-500">
      
      {/* Premium subtle background graphics for clinical elegance */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-navy/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-semibold tracking-wider text-brand-navy dark:text-brand-secondary uppercase font-display">Secure & Encrypted</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- CONTACT CARDS & HOURS LEFT --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="medical-card glossy-shine p-6 flex items-start space-x-4 rtl:space-x-reverse hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="p-3 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 dark:border-brand-primary/35 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 font-sans">
                      <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">{card.title}</h4>
                      {card.details.map((detail, dIdx) => (
                        <a key={dIdx} href={card.link} className="block text-base font-semibold text-brand-navy dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                          {detail}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Operating Hours Card */}
            <div className="medical-card glossy-shine p-6 flex items-start space-x-4 rtl:space-x-reverse hover:-translate-y-1 overflow-hidden">
              <div className="p-3 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 dark:border-brand-primary/35 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-2 font-sans">
                <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('contact.hours')}</h4>
                <p className="text-base font-semibold text-brand-navy dark:text-white">{t('contact.hoursWeekdays')}</p>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{t('contact.hoursSunday')}</p>
              </div>
            </div>
          </div>

          {/* --- SECURE APPOINTMENT FORM RIGHT --- */}
          <div className="lg:col-span-7">
            <div className="medical-card glossy-shine p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy dark:text-white mb-6 text-left rtl:text-right">
                {t('contact.formTitle')}
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* 1. Name Input Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 font-sans text-xs pointer-events-none ${
                      focusName || name
                        ? 'top-[-8px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
                        : 'top-[16px] text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {t('contact.formName')} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusName(true)}
                    onBlur={() => setFocusName(false)}
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    required
                  />
                </div>

                {/* 2. Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 font-sans text-xs pointer-events-none ${
                        focusEmail || email
                          ? 'top-[-8px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
                          : 'top-[16px] text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusEmail(true)}
                      onBlur={() => setFocusEmail(false)}
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 font-sans text-xs pointer-events-none ${
                        focusPhone || phone
                          ? 'top-[-8px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
                          : 'top-[16px] text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {t('contact.formPhone')} *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => setFocusPhone(true)}
                      onBlur={() => setFocusPhone(false)}
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 3. Department Select */}
                <div className="relative font-sans text-sm text-left rtl:text-right">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>{t('contact.formService')}</option>
                    <option value="diabetes">{t('services.items.diabetes.title')}</option>
                    <option value="diagnostics">{t('services.items.diagnostics.title')}</option>
                    <option value="consultation">{t('services.items.consultation.title')}</option>
                    <option value="laboratory">{t('services.items.laboratory.title')}</option>
                    <option value="preventive">{t('services.items.preventive.title')}</option>
                    <option value="checkups">{t('services.items.checkups.title')}</option>
                  </select>
                  <div className="absolute right-4 rtl:left-4 rtl:right-auto top-[20px] pointer-events-none text-slate-400">▼</div>
                </div>

                {/* 4. Message Input */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 font-sans text-xs pointer-events-none ${
                      focusMsg || message
                        ? 'top-[-8px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
                        : 'top-[16px] text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {t('contact.formMsg')}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusMsg(true)}
                    onBlur={() => setFocusMsg(false)}
                    rows={4}
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                  />
                </div>

                {/* Status Banners */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-500 text-left rtl:text-right">
                      {errorMsg}
                    </motion.div>
                  )}
                  {submitSuccess && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-500 text-left rtl:text-right flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                      <span>{t('contact.formSuccess')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-display font-semibold text-sm tracking-wider uppercase text-white bg-brand-primary hover:bg-brand-navy transition-all duration-300 flex items-center justify-center space-x-2 shadow-medical hover:shadow-medical-hover active:scale-95 disabled:opacity-75"
                >
                  <Send className="w-4 h-4 animate-pulse-slow" />
                  <span>{isSubmitting ? t('contact.formSending') : t('contact.formSubmit')}</span>
                </button>

              </form>
            </div>
          </div>

        </div>

        {/* --- PHYSICAL EMBEDDED GOOGLE MAP --- */}
        <div className="space-y-6">
          <div className="text-left rtl:text-right space-y-2 border-l-4 border-brand-primary pl-4 rtl:pl-0 rtl:pr-4">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-display">Astra Headquarters</span>
            <h3 className="font-display font-bold text-2xl text-brand-navy dark:text-white">Physical Location & Facility Access</h3>
          </div>

          <div className="h-96 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-medical bg-slate-100 dark:bg-slate-900 relative">
            <iframe
              title="Astra Medical Center Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8923055964893!2d77.62235!3d12.97854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzQyLjciTiA3N8KwMzcnMjAuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="opacity-90 dark:opacity-80 transition-opacity"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
