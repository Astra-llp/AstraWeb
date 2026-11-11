import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle2, ShieldCheck, ExternalLink, MessageCircle } from 'lucide-react';

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

  const getDepartmentLabel = (code: string) => {
    switch (code) {
      case 'diabetes': return 'Astra Diabetic Foundation & Diabetes Care';
      case 'consultation': return 'General Consultation & Family Physician';
      case 'laboratory': return 'Advanced Diagnostic Laboratory';
      case 'daycare': return 'State-of-the-Art Day Care Center';
      case 'pediatrics': return 'Preventive Pediatric Services';
      case 'diagnostics': return 'Diagnostic Imaging & Health Screening';
      default: return code;
    }
  };

  const handleWhatsAppSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!name.trim() || !phone.trim() || !service) {
      setErrorMsg(t('contact.formErrorRequired'));
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const dept = getDepartmentLabel(service);
    const text = `*New Consultation Request - Astra Medical Center*\n\n` +
      `🏥 *Department:* ${dept}\n` +
      `👤 *Patient Name:* ${name.trim()}\n` +
      `📞 *Phone:* ${phone.trim()}\n` +
      (email.trim() ? `📧 *Email:* ${email.trim()}\n` : '') +
      `📝 *Message / Symptoms:* ${message.trim() || 'General consultation inquiry'}\n\n` +
      `_Sent from Astra Medical Center & Diagnostics website_`;

    const whatsappUrl = `https://wa.me/918089233554?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 300);
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!name.trim() || !phone.trim() || !service) {
      setErrorMsg(t('contact.formErrorRequired'));
      return;
    }

    setErrorMsg('');
    const dept = getDepartmentLabel(service);
    const subject = `Consultation Request: ${name.trim()} (${dept})`;
    const body = `Patient Name: ${name.trim()}\nPhone: ${phone.trim()}\nEmail: ${email.trim() || 'N/A'}\nDepartment: ${dept}\n\nMessage / Symptoms:\n${message.trim() || 'N/A'}\n\nSent from Astra Medical Center & Diagnostics Website`;

    const mailtoUrl = `mailto:astramedlabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmitSuccess(true);
  };

  const contactCards = [
    {
      icon: Phone,
      title: t('contact.cardPhone'),
      details: ["8089233554", "7092030885"],
      link: "tel:8089233554",
      isLatin: true
    },
    {
      icon: Mail,
      title: t('contact.cardEmail'),
      details: ["astramedlabs@gmail.com"],
      link: "mailto:astramedlabs@gmail.com",
      isLatin: true
    },
    {
      icon: MapPin,
      title: t('contact.cardAddress'),
      details: [t('contact.addressValue'), t('contact.plusCode')],
      link: "https://maps.app.goo.gl/vFtvkhToTLgSravf7",
      isLatin: false
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-brand-dark pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden transition-colors duration-500">

      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-navy/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">

        {/* --- PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
            <span className="text-xs font-semibold text-brand-navy dark:text-brand-secondary uppercase font-display">{t('contact.badge')}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white leading-snug">
            {t('contact.title')}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Quick Mobile Action Strip (Call + Directions immediately accessible) */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          <a
            href="tel:8089233554"
            className="medical-card p-3.5 rounded-2xl flex items-center justify-center gap-2 font-display font-bold text-xs uppercase text-brand-navy bg-white border border-slate-200/80 shadow-sm active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 text-brand-primary shrink-0" />
            <span>{t('mobileDock.call')}</span>
          </a>
          <a
            href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
            target="_blank"
            rel="noopener noreferrer"
            className="medical-card p-3.5 rounded-2xl flex items-center justify-center gap-2 font-display font-bold text-xs uppercase text-brand-navy bg-white border border-slate-200/80 shadow-sm active:scale-[0.98]"
          >
            <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
            <span>{t('contact.getDirections')}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* --- CONTACT CARDS & HOURS (Below Form on Mobile, Left Column on Desktop) --- */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="medical-card glossy-shine p-5 sm:p-6 flex items-start space-x-4 hover:-translate-y-1 overflow-hidden text-left"
                  >
                    <div className="p-3 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 dark:border-brand-primary/35 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 font-sans min-w-0">
                      <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase">{card.title}</h4>
                      {card.details.map((detail, dIdx) => (
                        <a
                          key={dIdx}
                          href={card.link}
                          lang={card.isLatin ? 'en' : undefined}
                          className="block text-sm sm:text-base font-semibold text-brand-navy dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors break-words leading-snug"
                        >
                          {detail}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Operating Hours Card */}
            <div className="medical-card glossy-shine p-5 sm:p-6 flex items-start space-x-4 hover:-translate-y-1 overflow-hidden text-left">
              <div className="p-3 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 dark:border-brand-primary/35 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-2 font-sans min-w-0">
                <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase">{t('contact.hours')}</h4>
                <p className="text-sm sm:text-base font-semibold text-brand-navy dark:text-white leading-snug">{t('contact.hoursWeekdays')}</p>
                <p className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400 leading-snug">{t('contact.hoursSunday')}</p>
              </div>
            </div>
          </div>

          {/* --- SECURE APPOINTMENT FORM (First on Mobile, Right Column on Desktop) --- */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="medical-card glossy-shine p-5 sm:p-10 relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy dark:text-white mb-6 text-left leading-snug">
                {t('contact.formTitle')}
              </h3>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">

                {/* 1. Name Input Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 max-w-[calc(100%-2rem)] truncate transition-all duration-300 font-sans text-xs pointer-events-none z-10 ${
                      focusName || name
                        ? 'top-[-9px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
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
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm leading-normal text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    required
                  />
                </div>

                {/* 2. Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 max-w-[calc(100%-2rem)] truncate transition-all duration-300 font-sans text-xs pointer-events-none z-10 ${
                        focusEmail || email
                          ? 'top-[-9px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
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
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm leading-normal text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 max-w-[calc(100%-2rem)] truncate transition-all duration-300 font-sans text-xs pointer-events-none z-10 ${
                        focusPhone || phone
                          ? 'top-[-9px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
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
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm leading-normal text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 3. Department Select */}
                <div className="relative font-sans text-sm text-left">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-4 pr-10 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-brand-navy dark:text-white leading-normal focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>{t('contact.formService')}</option>
                    <option value="diabetes">{t('services.items.diabetes.title')}</option>
                    <option value="consultation">{t('services.items.consultation.title')}</option>
                    <option value="laboratory">{t('services.items.laboratory.title')}</option>
                    <option value="daycare">{t('services.items.daycare.title')}</option>
                    <option value="pediatrics">{t('services.items.pediatrics.title')}</option>
                    <option value="diagnostics">{t('services.items.diagnostics.title')}</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                </div>

                {/* 4. Message Input */}
                <div className="relative">
                  <label
                    className={`absolute left-4 max-w-[calc(100%-2rem)] truncate transition-all duration-300 font-sans text-xs pointer-events-none z-10 ${
                      focusMsg || message
                        ? 'top-[-9px] text-[10px] bg-white dark:bg-brand-cardDark px-1.5 text-brand-primary font-semibold'
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
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans text-sm leading-relaxed text-brand-navy dark:text-white focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                  />
                </div>

                {/* Status Banners */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-500 text-left">
                      {errorMsg}
                    </motion.div>
                  )}
                  {submitSuccess && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 text-left flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                      <div>
                        <span className="font-bold block">{t('contact.formSuccessTitle')}</span>
                        <span className="font-normal text-[11px]">{t('contact.formSuccessMsg')}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dual Action Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 sm:py-4 px-5 rounded-xl font-display font-semibold text-xs uppercase text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-75"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{t('contact.sendWhatsApp')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="py-3.5 sm:py-4 px-5 rounded-xl font-display font-semibold text-xs uppercase text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-200 dark:border-slate-700 cursor-pointer disabled:opacity-75"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-brand-primary" />
                    <span>{t('contact.sendEmail')}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-sans">
                  {t('contact.directDesk')}{' '}
                  <a lang="en" href="tel:8089233554" className="text-brand-primary font-semibold hover:underline">080892 33554</a>
                  {' / '}
                  <a lang="en" href="tel:7092030885" className="text-brand-primary font-semibold hover:underline">70920 30885</a>
                </p>

              </form>
            </div>
          </div>

        </div>

        {/* --- PHYSICAL EMBEDDED GOOGLE MAP --- */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-brand-primary pl-4">
            <div className="text-left space-y-1">
              <span className="text-xs font-bold text-brand-primary uppercase font-display">{t('nav.brandFull')}</span>
              <h3 className="font-display font-bold text-2xl text-brand-navy dark:text-white leading-snug">{t('contact.mapHeading')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                {t('contact.mapSub')}
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/vFtvkhToTLgSravf7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white font-display font-bold text-xs uppercase hover:bg-brand-navy transition-all duration-200 shrink-0 self-start sm:self-auto shadow-sm"
            >
              <span>{t('contact.getDirections')}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Front Building Photo (clean, no overlay tag) */}
            <div className="lg:col-span-5 medical-card glossy-shine overflow-hidden rounded-3xl flex flex-col bg-white dark:bg-brand-cardDark shadow-medical">
              <div className="relative h-56 sm:h-72 lg:flex-1 w-full overflow-hidden">
                <img
                  src="/front.jpg"
                  alt={t('contact.frontTitle')}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-1 text-left">
                <h4 className="font-display font-bold text-base sm:text-lg text-brand-navy dark:text-white leading-snug">
                  {t('contact.frontTitle')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                  {t('contact.frontDesc')}
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="lg:col-span-7 h-72 sm:h-80 lg:h-auto min-h-[280px] sm:min-h-[350px] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-medical bg-slate-100 dark:bg-slate-900 relative">
              <iframe
                title="Astra Medical Center & Diagnostics Google Map"
                src="https://maps.google.com/maps?q=10.3150156,76.1472131&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-95 dark:opacity-85 transition-opacity"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
