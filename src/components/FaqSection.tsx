import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/siteContent';
import { EASE_OUT_EXPO, FadeIn } from './MotionPrimitives';
import { RippleButton } from './RippleButton';
import { uiSounds } from '../utils/uiSounds';

interface FaqSectionProps {
  onRequestJob: (topic?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onRequestJob }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    const nextOpen = openId !== id;
    uiSounds.toggle(nextOpen);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="services-faq-heading"
      className="pt-8 sm:pt-10 border-t border-[#CFD5DF] dark:border-[#242A35]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <FadeIn className="lg:col-span-4">
          <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2.5">
            VEELGESTELDE VRAGEN
          </p>
          <h2
            id="services-faq-heading"
            className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] leading-[1.15] text-[#0B0D11] dark:text-white mb-3 text-balance"
          >
            Duidelijkheid voor elke renovatie &amp; afwerking.
          </h2>
          <p className="text-sm leading-relaxed text-[#3E4552] dark:text-[#B5BECC] mb-6">
            Vragen over bezettingswerk, tegels of vochtbehandeling? Vraag vrijblijvend advies of een plaatsbezoek aan.
          </p>
          <RippleButton
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.open();
              onRequestJob('Vraag over renovatie of offerte');
            }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-white dark:text-[#071326] text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
          >
            Vraag vrijblijvend advies aan
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </RippleButton>
        </FadeIn>

        <div className="lg:col-span-8 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const triggerId = `faq-trigger-${item.id}`;

            return (
              <FadeIn key={item.id} delay={idx * 0.04} y={10}>
                <div
                  className={`rounded-2xl border transition-colors duration-200 ${
                    isOpen
                      ? 'bg-white dark:bg-[#171C27] border-[var(--brand-accent)]/45 shadow-[0_2px_10px_rgba(11,13,17,0.04)]'
                      : 'bg-white/75 dark:bg-[#131720] border-[#D4DAE4] dark:border-[#252C38] hover:bg-white dark:hover:bg-[#181D29] hover:border-[#9DA4B0] dark:hover:border-[#49556B]'
                  }`}
                >
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onPointerEnter={uiSounds.hover}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
                  >
                    <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                      <span className="font-cyber text-[10px] tracking-[0.06em] text-[var(--brand-accent)] shrink-0">
                        {item.index}
                      </span>
                      <span className="text-sm sm:text-[15px] font-semibold text-[#0B0D11] dark:text-white leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? 'bg-[var(--brand-accent)] border-[var(--brand-accent)] text-white dark:text-[#071326]'
                          : 'bg-[#E7EAEE]/60 dark:bg-[#1E2430] border-[#D4DAE4] dark:border-[#343C4A] text-[#0B0D11] dark:text-white'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-0 pl-12 sm:pl-14">
                          <p className="text-xs sm:text-sm leading-relaxed text-[#3E4552] dark:text-[#C5CCD8]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
