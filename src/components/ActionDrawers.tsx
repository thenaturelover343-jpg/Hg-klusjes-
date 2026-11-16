import React, { useEffect, useState } from 'react';
import { X, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab } from './TopNav';
import { EASE_OUT_EXPO } from './MotionPrimitives';
import { RippleButton } from './RippleButton';
import { BUSINESS_INFO } from '../data/siteContent';
import { uiSounds } from '../utils/uiSounds';

interface FloatingInputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  value: string;
  onChange: (next: string) => void;
}

export const FloatingInputField: React.FC<FloatingInputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="w-full px-3.5 pt-5 pb-2 rounded-xl bg-white border border-[#CFD6E0] text-sm text-[#0B0D11] focus:outline-none focus:border-[var(--brand-accent)] transition-colors"
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={isFloated ? { y: -9, scale: 0.78 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
        className={`pointer-events-none absolute left-3.5 top-[15px] origin-left text-sm font-medium transition-colors duration-150 ${
          focused
            ? 'text-[var(--brand-accent)]'
            : isFloated
            ? 'text-[#4B5565]'
            : 'text-[#667082]'
        }`}
      >
        {label}
      </motion.label>
    </div>
  );
};

interface FloatingTextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
}

export const FloatingTextareaField: React.FC<FloatingTextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
  rows = 3,
}) => {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="w-full px-3.5 pt-6 pb-2.5 rounded-xl bg-white border border-[#CFD6E0] text-sm text-[#0B0D11] focus:outline-none focus:border-[var(--brand-accent)] transition-colors resize-none"
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={isFloated ? { y: -9, scale: 0.78 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
        className={`pointer-events-none absolute left-3.5 top-[16px] origin-left text-sm font-medium transition-colors duration-150 ${
          focused
            ? 'text-[var(--brand-accent)]'
            : isFloated
            ? 'text-[#4B5565]'
            : 'text-[#667082]'
        }`}
      >
        {label}
      </motion.label>
    </div>
  );
};

interface ContactModalProps {
  open: boolean;
  initialTopic?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  open,
  initialTopic = '',
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open && initialTopic) {
      setMessage(`Aanvraag voor: ${initialTopic}\n`);
    }
  }, [open, initialTopic]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!name.trim()) {
      uiSounds.click();
      setError('Vul je volledige naam in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      uiSounds.click();
      setError('Vul een geldig e-mailadres in.');
      return;
    }
    if (!message.trim()) {
      uiSounds.click();
      setError('Beschrijf kort welke werken je wilt bespreken.');
      return;
    }
    setError('');
    uiSounds.success();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    uiSounds.close();
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setError('');
    onClose();
  };

  const mailtoSubject = encodeURIComponent(`Offerte-aanvraag GH Kluswerken — ${name || 'Klant'}`);
  const mailtoBody = encodeURIComponent(
    `Naam: ${name}\nE-mail: ${email}\nTelefoon: ${phone || 'Niet opgegeven'}\n\nOmschrijving werken:\n${message}`
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            className="w-full max-w-md bg-[#F4F6F9] border border-[#C6CDD8] rounded-2xl p-6 sm:p-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-cyber text-[10px] tracking-[0.06em] text-[var(--brand-accent)] mb-1">
                  GH KLUSWERKEN
                </p>
                <h2 id="contact-modal-title" className="text-lg font-semibold text-[#0B0D11]">
                  Vrijblijvende offerte aanvragen
                </h2>
              </div>
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={resetAndClose}
                aria-label="Sluit venster"
                className="w-9 h-9 rounded-full bg-white border border-[#D4DAE3] text-[#111317] flex items-center justify-center hover:bg-[var(--brand-accent)] hover:text-white transition-colors duration-150 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-5 text-center">
                <CheckCircle2 className="w-10 h-10 text-[var(--brand-accent)] mx-auto mb-3" strokeWidth={1.6} />
                <h3 className="text-base font-semibold text-[#0B0D11] mb-1.5">
                  Aanvraag klaargezet
                </h3>
                <p className="text-sm text-[#454C57] mb-5">
                  Bedankt {name}. Je kan de aanvraag direct via e-mail versturen of ons bellen op{' '}
                  <a href={BUSINESS_INFO.phoneHref} className="font-semibold text-[var(--brand-accent)] hover:underline">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    onPointerEnter={uiSounds.hover}
                    onClick={uiSounds.click}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Verstuur via e-mailapp
                  </a>
                  <RippleButton
                    type="button"
                    onPointerEnter={uiSounds.hover}
                    onClick={resetAndClose}
                    rippleClassName="bg-[#0B0D11]/15"
                    className="px-5 py-2.5 rounded-full bg-white border border-[#CFD6E0] text-[#0B0D11] text-xs font-semibold hover:border-[var(--brand-accent)] transition-all cursor-pointer"
                  >
                    Sluiten
                  </RippleButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                <FloatingInputField
                  id="contact-modal-name"
                  label="Volledige naam"
                  type="text"
                  value={name}
                  onChange={setName}
                />

                <FloatingInputField
                  id="contact-modal-email"
                  label="E-mailadres"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />

                <FloatingInputField
                  id="contact-modal-phone"
                  label="Telefoonnummer (optioneel)"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                />

                <FloatingTextareaField
                  id="contact-modal-message"
                  label="Omschrijving van de werken"
                  value={message}
                  onChange={setMessage}
                />

                {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                <div className="pt-1 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-col gap-1">
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      onPointerEnter={uiSounds.hover}
                      onClick={uiSounds.click}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-accent)] hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                    <a
                      href={BUSINESS_INFO.emailHref}
                      onPointerEnter={uiSounds.hover}
                      onClick={uiSounds.click}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#4B5565] hover:text-[var(--brand-accent)] hover:underline"
                    >
                      <Mail className="w-3 h-3" />
                      {BUSINESS_INFO.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={resetAndClose}
                      className="px-4 py-2.5 rounded-full text-sm font-medium text-[#2C313A] hover:bg-white transition-colors cursor-pointer"
                    >
                      Annuleren
                    </button>
                    <RippleButton
                      type="submit"
                      onPointerEnter={uiSounds.hover}
                      className="group px-6 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-sm font-medium hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
                    >
                      Versturen
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </RippleButton>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface MenuDrawerProps {
  open: boolean;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenContact: () => void;
  onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  open,
  activeTab,
  onSelectTab,
  onOpenContact,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const links: { label: NavTab; summary: string }[] = [
    { label: 'Home', summary: 'GH Kluswerken — Renovatie & afwerking' },
    { label: 'Diensten', summary: 'Bezettingswerken, tegelwerken & opstijgend vocht' },
    { label: 'Realisaties', summary: 'Voorbeelden & technische afwerkingsstandaard' },
    { label: 'Over', summary: 'Wie wij zijn en waarom één aanspreekpunt telt' },
    { label: 'Visie', summary: 'Duurzaam herstel en millimeterprecisie' },
    { label: 'Contact', summary: 'Offerte aanvragen, openingsuren & bereikbaarheid' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Navigatiemenu"
          onClick={() => {
            uiSounds.close();
            onClose();
          }}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="w-full max-w-sm h-full bg-[#ECEFF4] border-l border-[#C6CDD8] p-7 flex flex-col justify-between shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#D5DCE6]">
                <span className="font-cyber text-xs tracking-[0.06em] text-[var(--brand-accent)]">
                  GH KLUSWERKEN
                </span>
                <button
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.close();
                    onClose();
                  }}
                  aria-label="Sluit menu"
                  className="w-9 h-9 rounded-full bg-white border border-[#D4DAE3] text-[#111317] flex items-center justify-center hover:bg-[var(--brand-accent)] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-1.5">
                {links.map((item) => {
                  const active = activeTab === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={() => {
                        uiSounds.nav();
                        onSelectTab(item.label);
                        onClose();
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-white text-[#0B0D11] shadow-xs border-l-2 border-[var(--brand-accent)]'
                          : 'hover:bg-white/75 hover:translate-x-0.5 text-[#1E222A]'
                      }`}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-[#555D6B] mt-0.5">{item.summary}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-[#D5DCE6] space-y-2.5">
              <RippleButton
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.open();
                  onClose();
                  onOpenContact();
                }}
                className="w-full py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Vrijblijvende offerte aanvragen
              </RippleButton>
              <a
                href={BUSINESS_INFO.phoneHref}
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="w-full py-2.5 rounded-full bg-white border border-[#C6CDD8] text-[#0B0D11] text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[var(--brand-accent)] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <a
                href={BUSINESS_INFO.emailHref}
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="w-full py-2 text-center text-[11px] font-medium text-[#4B5565] hover:text-[var(--brand-accent)] flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3 h-3" />
                {BUSINESS_INFO.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
