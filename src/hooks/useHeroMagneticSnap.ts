import { RefObject, useCallback, useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO } from '../components/MotionPrimitives';

interface UseHeroMagneticSnapOptions {
  enabled: boolean;
  heroRef: RefObject<HTMLElement | null>;
  detailsRef: RefObject<HTMLElement | null>;
}

export function useHeroMagneticSnap({
  enabled,
  heroRef,
  detailsRef,
}: UseHeroMagneticSnapOptions) {
  const prefersReducedMotion = useReducedMotion();
  const suppressUntilRef = useRef(0);

  const notifyProgrammaticScroll = useCallback((durationMs = 800) => {
    suppressUntilRef.current = performance.now() + durationMs;
  }, []);

  useEffect(() => {
    if (!enabled || prefersReducedMotion || typeof window === 'undefined') {
      return;
    }

    let settleTimer: number | null = null;
    let activeAnimation: ReturnType<typeof animate> | null = null;
    let isTouching = false;
    let isAnimating = false;
    let lastScrollY = window.scrollY;
    let lastDirection: 'down' | 'up' = 'down';

    const cancelSnap = () => {
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
        settleTimer = null;
      }
      if (activeAnimation) {
        activeAnimation.stop();
        activeAnimation = null;
      }
      isAnimating = false;
    };

    const runMagneticSnap = (targetY: number) => {
      const startY = window.scrollY;
      if (Math.abs(targetY - startY) < 2) return;

      cancelSnap();
      isAnimating = true;

      activeAnimation = animate(startY, targetY, {
        duration: 0.52,
        ease: EASE_OUT_EXPO,
        onUpdate: (latest) => {
          window.scrollTo({ top: latest, behavior: 'instant' });
        },
        onComplete: () => {
          isAnimating = false;
          activeAnimation = null;
          lastScrollY = targetY;
        },
        onStop: () => {
          isAnimating = false;
          activeAnimation = null;
        },
      });
    };

    const evaluateSnap = () => {
      if (isTouching || isAnimating) return;
      if (performance.now() < suppressUntilRef.current) return;

      const heroEl = heroRef.current;
      const detailsEl = detailsRef.current;
      if (!heroEl || !detailsEl) return;

      const scrollY = window.scrollY;
      const heroHeight = heroEl.getBoundingClientRect().height;
      const detailsTop = Math.round(detailsEl.getBoundingClientRect().top + scrollY);

      if (heroHeight <= 0 || detailsTop <= 0) return;

      // Only magnetically engage inside the hero-to-details transition window
      if (scrollY <= 2 || scrollY >= detailsTop - 12) return;

      if (lastDirection === 'down') {
        const downThreshold = Math.min(heroHeight * 0.24, 210);
        if (scrollY <= downThreshold) {
          runMagneticSnap(0);
        } else {
          runMagneticSnap(detailsTop);
        }
      } else {
        const upThreshold = detailsTop - Math.min(heroHeight * 0.12, 90);
        if (scrollY <= upThreshold) {
          runMagneticSnap(0);
        } else {
          runMagneticSnap(detailsTop);
        }
      }
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!isAnimating && Math.abs(currentY - lastScrollY) > 1) {
        lastDirection = currentY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentY;
      }

      if (isAnimating || performance.now() < suppressUntilRef.current) return;

      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }
      settleTimer = window.setTimeout(evaluateSnap, 145);
    };

    const handleTouchStart = () => {
      isTouching = true;
      cancelSnap();
    };

    const handleTouchEnd = () => {
      isTouching = false;
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }
      settleTimer = window.setTimeout(evaluateSnap, 120);
    };

    const handleUserInterrupt = () => {
      if (isAnimating) {
        cancelSnap();
      }
    };

    const handleKeyInterrupt = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageDown' ||
        e.key === 'PageUp' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === ' '
      ) {
        cancelSnap();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyInterrupt);

    return () => {
      cancelSnap();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyInterrupt);
    };
  }, [enabled, prefersReducedMotion, heroRef, detailsRef]);

  return { notifyProgrammaticScroll };
}
