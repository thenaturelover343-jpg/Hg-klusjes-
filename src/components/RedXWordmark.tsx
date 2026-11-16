import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO } from './MotionPrimitives';

export const RedXWordmark: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="select-none" aria-label="GH Kluswerken — Uw partner voor renovatie & afwerking">
      {/* Stage 1: Architectural GH House Emblem matching uploaded logo */}
      <div className="inline-flex items-end gap-3 mb-2.5 lg:mb-3">
        <div className="overflow-hidden">
          <motion.svg
            width="92"
            height="72"
            viewBox="0 0 120 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.54, delay: 0.04, ease: EASE_OUT_EXPO }}
            className="w-[74px] h-[58px] sm:w-[86px] sm:h-[68px] text-[var(--brand-accent)] transition-colors duration-200 will-change-transform"
          >
            {/* Pitched Roof with Chimney */}
            <path
              d="M8 39L60 7L112 39"
              stroke="currentColor"
              strokeWidth="5.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M88 14H97V29L88 23V14Z" fill="currentColor" />

            {/* 4-pane window beneath apex */}
            <rect x="52" y="25" width="6.5" height="6.5" rx="0.8" fill="currentColor" />
            <rect x="61.5" y="25" width="6.5" height="6.5" rx="0.8" fill="currentColor" />
            <rect x="52" y="34" width="6.5" height="6.5" rx="0.8" fill="currentColor" />
            <rect x="61.5" y="34" width="6.5" height="6.5" rx="0.8" fill="currentColor" />

            {/* Bold GH Monogram */}
            <text
              x="60"
              y="88"
              textAnchor="middle"
              fill="currentColor"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: '50px',
                letterSpacing: '-0.06em',
              }}
            >
              GH
            </text>
          </motion.svg>
        </div>

        <motion.span
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.44, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="w-8 h-px mb-2 origin-left bg-[var(--brand-accent)]/45 will-change-transform"
          aria-hidden="true"
        />
      </div>

      {/* Stage 2: Staggered word-level mask reveal for KLUSWERKEN */}
      <h1 className="font-ui text-[32px] sm:text-[38px] lg:text-[42px] font-bold tracking-[-0.03em] leading-[0.95] text-[var(--brand-accent)] transition-colors duration-200">
        <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            initial={
              prefersReducedMotion
                ? false
                : { y: '112%', clipPath: 'inset(0 0 100% 0)' }
            }
            animate={{ y: '0%', clipPath: 'inset(0 0 0% 0)' }}
            transition={{
              duration: 0.56,
              delay: 0.18,
              ease: EASE_OUT_EXPO,
            }}
            className="inline-block will-change-transform uppercase"
          >
            Kluswerken
          </motion.span>
        </span>
      </h1>

      {/* Stage 3: Horizontal precision mask wipe on tagline */}
      <div className="overflow-hidden mt-2.5 lg:mt-3">
        <motion.p
          initial={
            prefersReducedMotion
              ? false
              : { clipPath: 'inset(0 100% 0 0)', x: -6, opacity: 0.2 }
          }
          animate={{ clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1 }}
          transition={{ duration: 0.52, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="font-cyber text-[9px] sm:text-[9.5px] leading-relaxed tracking-[0.16em] text-[#454D5B] dark:text-[#A8B2C2] transition-colors duration-200 will-change-transform uppercase"
        >
          Renovatie &amp; Afwerking
        </motion.p>
      </div>
    </div>
  );
};
