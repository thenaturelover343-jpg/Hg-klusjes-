import React, { useEffect, useState } from 'react';
import { X, ArrowRight, CheckCircle2, Phone, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab, ThemeMode } from './TopNav';
import { EASE_OUT_EXPO } from './MotionPrimitives';
import { RippleButton } from './RippleButton';
import { uiSounds } from '../utils/uiSounds';

interface FloatingInputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email';
  value: string;
  onChange: (next: string) => void;
}

const FloatingInputField: React.FC<FloatingInputFieldProps> = ({
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
        className="w-full px-3.5 pt-5 pb-2 rounded-xl bg-white dark:bg-[#0B0E14] border border-[#CFD6E0] dark:border-[#2C3545] text-sm text-[#0B0D11] dark:text-white focus:outline-none focus:border-[#3F618E] dark:focus:border-[#7EB0F2] transition-colors"
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={
          isFloated
            ? { y: -9, scale: 0.78 }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
        className={`pointer-events-none absolute left-3.5 top-[15px] origin-left text-sm font-medium transition-colors duration-150 ${
          focused
            ? 'text-[#3F618E] dark:text-[#7EB0F2]'
            : isFloated
            ? 'text-[#4B5565] dark:text-[#98A4B8]'
            : 'text-[#667082] dark:text-[#7F8A9E]'
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
}

const FloatingTextareaField: React.FC<FloatingTextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="w-full px-3.5 pt-6 pb-2.5 rounded-xl bg-white dark:bg-[#0B0E14] border border-[#CFD6E0] dark:border-[#2C3545] text-sm text-[#0B0D11] dark:text-white focus:outline-none focus:border-[#3F618E] dark:focus:border-[#7EB0F2] transition-colors resize-none"
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={
          isFloated
            ? { y: -9, scale: 0.78 }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
        className={`pointer-events-none absolute left-3.5 top-[16px] origin-left text-sm font-medium transition-colors duration-150 ${
          focused
            ? 'text-[#3F618E] dark:text-[#7EB0F2]'
            : isFloated
            ? 'text-[#4B5565] dark:text-[#98A4B8]'
            : 'text-[#667082] dark:text-[#7F8A9E]'
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
      setError('Vul je naam in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      uiSounds.click();
      setError('Vul een geldig e-mailadres in.');
      return;
    }
    if (!message.trim()) {
      uiSounds.click();
      setError('Beschrijf kort welke klus je wilt aanvragen.');
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
    setMessage('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 dark:bg-black/70 backdrop-blur-xs p-4"
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
            className="w-full max-w-md bg-[#F4F6F9] dark:bg-[#131720] border border-[#C6CDD8] dark:border-[#2C3546] rounded-2xl p-6 sm:p-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-cyber text-[10px] tracking-[0.06em] text-[#3F618E] dark:text-[#7EB0F2] mb-1">
                  HG KLUSJES
                </p>
                <h2 id="contact-modal-title" className="text-lg font-semibold text-[#0B0D11] dark:text-white">
                  Vraag je klus aan
                </h2>
              </div>
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={resetAndClose}
                aria-label="Sluit venster"
                className="w-9 h-9 rounded-full bg-white dark:bg-[#1C222E] border border-[#D4DAE3] dark:border-[#343C4A] text-[#111317] dark:text-white flex items-center justify-center hover:bg-[#0B0D11] hover:text-white dark:hover:bg-white dark:hover:text-[#0B0D11] transition-colors duration-150 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-[#3F618E] dark:text-[#7EB0F2] mx-auto mb-3" strokeWidth={1.6} />
                <h3 className="text-base font-semibold text-[#0B0D11] dark:text-white mb-1.5">Aanvraag ontvangen</h3>
                <p className="text-sm text-[#454C57] dark:text-[#C0C8D6] mb-6">
                  We nemen zo snel mogelijk contact op via {email} om een afspraak in te plannen.
                </p>
                <RippleButton
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-full bg-[#3F618E] dark:bg-white text-white dark:text-[#0B0D11] text-sm font-medium hover:bg-[#35537B] dark:hover:bg-[#7EB0F2] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Sluiten
                </RippleButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <FloatingInputField
                  id="contact-name"
                  label="Volledige naam"
                  type="text"
                  value={name}
                  onChange={setName}
                />

                <FloatingInputField
                  id="contact-email"
                  label="E-mailadres"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />

                <FloatingTextareaField
                  id="contact-message"
                  label="Beschrijving van de klus"
                  value={message}
                  onChange={setMessage}
                />

                {error && <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>}

                <div className="pt-1 flex items-center justify-between gap-2.5">
                  <a
                    href="tel:+3200000000"
                    onPointerEnter={uiSounds.hover}
                    onClick={uiSounds.click}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3F618E] dark:text-[#7EB0F2] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Bel ons
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={resetAndClose}
                      className="px-4 py-2.5 rounded-full text-sm font-medium text-[#2C313A] dark:text-[#C5CCD8] hover:bg-white dark:hover:bg-[#1C222E] transition-colors cursor-pointer"
                    >
                      Annuleren
                    </button>
                    <RippleButton
                      type="submit"
                      onPointerEnter={uiSounds.hover}
                      className="group px-6 py-2.5 rounded-full bg-[#0B0D11] dark:bg-white text-white dark:text-[#0B0D11] text-sm font-medium hover:bg-[#1E232D] dark:hover:bg-[#7EB0F2] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
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
  theme: ThemeMode;
  soundEnabled: boolean;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onSelectTab: (tab: NavTab) => void;
  onOpenContact: () => void;
  onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  open,
  activeTab,
  theme,
  soundEnabled,
  onToggleTheme,
  onToggleSound,
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

  const isDark = theme === 'dark';

  const links: { label: NavTab; summary: string }[] = [
    { label: 'Home', summary: 'HG Klusjes — Klusjesman aan huis' },
    { label: 'Over', summary: 'Wie wij zijn en onze manier van werken' },
    { label: 'Diensten', summary: 'Montage, herstellingen en onderhoud aan huis' },
    { label: 'Visie', summary: 'Duurzaam herstellen en zorg voor elke woning' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/35 dark:bg-black/65 backdrop-blur-xs"
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
            className="w-full max-w-sm h-full bg-[#ECEFF4] dark:bg-[#11151E] border-l border-[#C6CDD8] dark:border-[#283040] p-7 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D5DCE6] dark:border-[#242B39]">
                <span className="font-cyber text-xs tracking-[0.06em] text-[#0B0D11] dark:text-white">
                  HG KLUSJES
                </span>
                <button
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.close();
                    onClose();
                  }}
                  aria-label="Sluit menu"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1C222E] border border-[#D4DAE3] dark:border-[#343C4A] text-[#111317] dark:text-white flex items-center justify-center hover:bg-[#0B0D11] hover:text-white dark:hover:bg-white dark:hover:text-[#0B0D11] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
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
                      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-white dark:bg-[#1C2331] text-[#0B0D11] dark:text-white shadow-xs'
                          : 'hover:bg-white/75 dark:hover:bg-[#171C27] hover:translate-x-0.5 text-[#1E222A] dark:text-[#D5DCE6]'
                      }`}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-[#555D6B] dark:text-[#98A2B3] mt-0.5">{item.summary}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-[#D5DCE6] dark:border-[#242B39] space-y-2.5">
              {/* Reversible Theme Toggle Switch */}
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.toggle(isDark);
                  onToggleTheme();
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#181D29] border border-[#D4DAE4] dark:border-[#2C3546] flex items-center justify-between text-xs font-semibold text-[#0B0D11] dark:text-white hover:border-[#9DA4B0] dark:hover:border-[#49556B] transition-colors cursor-pointer"
              >
                <span>Weergave: {isDark ? 'Donker thema' : 'Licht thema'}</span>
                <span className="inline-flex items-center gap-1.5 text-[#3F618E] dark:text-[#7EB0F2]">
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  {isDark ? 'Naar licht' : 'Naar donker'}
                </span>
              </button>

              {/* Reversible Interaction Sound Toggle Switch */}
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={onToggleSound}
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#181D29] border border-[#D4DAE4] dark:border-[#2C3546] flex items-center justify-between text-xs font-semibold text-[#0B0D11] dark:text-white hover:border-[#9DA4B0] dark:hover:border-[#49556B] transition-colors cursor-pointer"
              >
                <span>Geluidseffecten: {soundEnabled ? 'Aan' : 'Uit'}</span>
                <span className="inline-flex items-center gap-1.5 text-[#3F618E] dark:text-[#7EB0F2]">
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  {soundEnabled ? 'Dempen' : 'Inschakelen'}
                </span>
              </button>

              <RippleButton
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.open();
                  onClose();
                  onOpenContact();
                }}
                className="w-full py-3 rounded-full bg-[#0B0D11] dark:bg-white hover:bg-[#1E232D] dark:hover:bg-[#7EB0F2] active:scale-[0.98] text-white dark:text-[#0B0D11] text-xs font-semibold transition-all cursor-pointer"
              >
                Vraag je klus aan
              </RippleButton>
              <a
                href="tel:+3200000000"
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="w-full py-2.5 rounded-full bg-white dark:bg-[#1B212C] border border-[#C6CDD8] dark:border-[#343C4A] text-[#0B0D11] dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#0B0D11] dark:hover:border-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Bel ons
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
