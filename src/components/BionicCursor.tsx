import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type CursorVariant = 'default' | 'pointer' | 'card' | 'text';

const INTERACTIVE_SELECTOR =
  'button, a, [role="button"], [role="tab"], summary, label[for], [data-cursor="pointer"]';
const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, select, [contenteditable="true"]';
const SURFACE_CARD_SELECTOR = '[data-cursor="card"]';

function resolveCursorVariant(target: EventTarget | null): CursorVariant {
  if (!(target instanceof Element)) return 'default';
  if (target.closest(INTERACTIVE_SELECTOR)) return 'pointer';
  if (target.closest(TEXT_INPUT_SELECTOR)) return 'text';
  if (target.closest(SURFACE_CARD_SELECTOR)) return 'card';
  return 'default';
}

export const BionicCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [pressed, setPressed] = useState(false);

  // Instantaneous hotspot coordinates for zero input lag
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Tight damped spring for the outer bionic reticle
  const ringX = useSpring(rawX, { stiffness: 540, damping: 38, mass: 0.32 });
  const ringY = useSpring(rawY, { stiffness: 540, damping: 38, mass: 0.32 });

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const media = window.matchMedia('(pointer: fine) and (hover: hover)');
    const syncCapability = () => {
      setEnabled(media.matches);
    };

    syncCapability();
    media.addEventListener('change', syncCapability);
    return () => media.removeEventListener('change', syncCapability);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled && visible) {
      root.classList.add('bionic-cursor-active');
    } else {
      root.classList.remove('bionic-cursor-active');
    }
    return () => {
      root.classList.remove('bionic-cursor-active');
    };
  }, [enabled, visible]);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        setVisible(false);
        return;
      }
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      setVariant(resolveCursorVariant(e.target));
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setVisible(false);
        setPressed(false);
      }
    };

    const handleBlur = () => {
      setVisible(false);
      setPressed(false);
    };

    const handleTouchStart = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled || !visible) return null;

  const isPointer = variant === 'pointer';
  const isCard = variant === 'card';
  const isText = variant === 'text';

  const outerSize = isPointer ? 36 : isCard ? 44 : isText ? 22 : 24;
  const outerScale = pressed ? 0.82 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer Spring-Tracked Bionic Reticle */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isText ? 6 : outerSize,
          height: isText ? 22 : outerSize,
          scale: outerScale,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 30,
          mass: 0.4,
        }}
        className="absolute top-0 left-0 flex items-center justify-center will-change-transform"
      >
        {isText ? (
          /* Precision bionic caret bar over text inputs */
          <div className="w-[2px] h-full rounded-full bg-[#3F618E] dark:bg-[#7EB0F2] shadow-[0_0_0_1px_rgba(255,255,255,0.45)] dark:shadow-[0_0_0_1px_rgba(10,12,16,0.6)]" />
        ) : isPointer ? (
          /* Lock-on segmented corner reticle for buttons, links, and tabs */
          <svg
            viewBox="0 0 36 36"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <circle
              cx="18"
              cy="18"
              r="15.5"
              className="fill-[#3F618E]/10 dark:fill-[#7EB0F2]/14 stroke-[#3F618E]/35 dark:stroke-[#7EB0F2]/40"
              strokeWidth="1"
            />
            <path
              d="M9 4.5H5.5C4.95 4.5 4.5 4.95 4.5 5.5V9M27 4.5H30.5C31.05 4.5 31.5 4.95 31.5 5.5V9M31.5 27V30.5C31.5 31.05 31.05 31.5 30.5 31.5H27M9 31.5H5.5C4.95 31.5 4.5 31.05 4.5 30.5V27"
              className="stroke-[#3F618E] dark:stroke-[#7EB0F2]"
              strokeWidth="1.65"
              strokeLinecap="round"
            />
          </svg>
        ) : isCard ? (
          /* Calibrated wide ring for 3D tilt & interactive card surfaces */
          <div className="w-full h-full rounded-full border border-[#3F618E]/55 dark:border-[#7EB0F2]/60 bg-[#3F618E]/6 dark:bg-[#7EB0F2]/10 transition-colors duration-150" />
        ) : (
          /* Quiet default precision ring */
          <div className="w-full h-full rounded-full border-[1.25px] border-[#0B0D11]/38 dark:border-[#F4F6FA]/45 transition-colors duration-150" />
        )}
      </motion.div>

      {/* Instant-Tracking Precision Center Core */}
      {!isText && (
        <motion.div
          style={{
            x: rawX,
            y: rawY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: isPointer ? 6 : isCard ? 5 : 4.5,
            height: isPointer ? 6 : isCard ? 5 : 4.5,
            scale: pressed ? 1.35 : 1,
          }}
          transition={{ duration: 0.12 }}
          className={`absolute top-0 left-0 rounded-full will-change-transform ${
            isPointer || isCard
              ? 'bg-[#3F618E] dark:bg-[#7EB0F2]'
              : 'bg-[#0B0D11] dark:bg-[#F4F6FA]'
          }`}
        />
      )}
    </div>
  );
};
