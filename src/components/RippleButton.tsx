import React, { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO } from './MotionPrimitives';

interface RippleInstance {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tailored translucent color classes for the expanding ripple circle */
  rippleClassName?: string;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      children,
      className = '',
      rippleClassName = 'bg-white/30 dark:bg-[#0B0D11]/20',
      onPointerDown,
      onClick,
      disabled,
      type = 'button',
      ...rest
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const nextIdRef = useRef(0);
    const prefersReducedMotion = useReducedMotion();
    const [ripples, setRipples] = useState<RippleInstance[]>([]);

    const assignRef = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    const spawnRipple = useCallback(
      (clientX: number | null, clientY: number | null) => {
        if (prefersReducedMotion || disabled) return;
        const el = internalRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const x = clientX !== null ? clientX - rect.left : rect.width / 2;
        const y = clientY !== null ? clientY - rect.top : rect.height / 2;
        const radius = Math.hypot(
          Math.max(x, rect.width - x),
          Math.max(y, rect.height - y)
        );
        const size = Math.ceil(radius * 2);
        const id = ++nextIdRef.current;

        setRipples((prev) => [...prev.slice(-3), { id, x, y, size }]);
      },
      [prefersReducedMotion, disabled]
    );

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button === 0) {
        spawnRipple(e.clientX, e.clientY);
      }
      onPointerDown?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Keyboard activation (Enter / Space) has detail === 0
      if (e.detail === 0) {
        spawnRipple(null, null);
      }
      onClick?.(e);
    };

    const removeRipple = (id: number) => {
      setRipples((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <button
        ref={assignRef}
        type={type}
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        className={`relative overflow-hidden isolate ${className}`}
        {...rest}
      >
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-0"
          aria-hidden="true"
        >
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.34 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.52, ease: EASE_OUT_EXPO }}
              onAnimationComplete={() => removeRipple(ripple.id)}
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size,
              }}
              className={`absolute rounded-full pointer-events-none will-change-transform ${rippleClassName}`}
            />
          ))}
        </span>
        {children}
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';
