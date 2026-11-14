import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO } from './MotionPrimitives';

const HEADLINE_TOKENS = ['HG', 'Klusjes'] as const;

export const RedXWordmark: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="select-none" aria-label="HG Klusjes — Klusjesman aan huis">
      {/* Stage 1: Eyebrow code + horizontal calibration hairline */}
      <div className="inline-flex items-center gap-2.5 mb-2.5 lg:mb-3">
        <span className="inline-block overflow-hidden py-0.5">
          <motion.span
            initial={prefersReducedMotion ? false : { y: '115%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.04, ease: EASE_OUT_EXPO }}
            className="inline-block font-cyber text-[10px] sm:text-[10.5px] leading-none tracking-[0.14em] text-[#3F618E] dark:text-[#7EB0F2] transition-colors duration-200 will-change-transform"
          >
            HG
          </motion.span>
        </span>

        <motion.span
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.44, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="w-6 h-px origin-left bg-[#9DA4B0] dark:bg-[#3A4354] will-change-transform"
          aria-hidden="true"
        />
      </div>

      {/* Stage 2: Staggered word-level mask reveal for the primary wordmark */}
      <h1 className="font-ui text-[34px] sm:text-[42px] lg:text-[46px] font-bold tracking-[-0.04em] leading-[0.95] text-[#050608] dark:text-white transition-colors duration-200 flex flex-wrap gap-x-[0.24em]">
        {HEADLINE_TOKENS.map((token, idx) => (
          <span
            key={token}
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              initial={
                prefersReducedMotion
                  ? false
                  : { y: '112%', clipPath: 'inset(0 0 100% 0)' }
              }
              animate={{ y: '0%', clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: 0.56,
                delay: 0.16 + idx * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className="inline-block will-change-transform"
            >
              {token}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Stage 3: Horizontal precision mask wipe on the sub-label */}
      <div className="overflow-hidden mt-2.5 lg:mt-3.5">
        <motion.p
          initial={
            prefersReducedMotion
              ? false
              : { clipPath: 'inset(0 100% 0 0)', x: -6, opacity: 0.2 }
          }
          animate={{ clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1 }}
          transition={{ duration: 0.52, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="font-cyber text-[9.5px] sm:text-[10.5px] lg:text-[11px] leading-none tracking-[0.24em] text-[#454D5B] dark:text-[#A8B2C2] transition-colors duration-200 will-change-transform"
        >
          AAN HUIS
        </motion.p>
      </div>
    </div>
  );
};

