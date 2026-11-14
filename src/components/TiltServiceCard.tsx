import React, { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { ServiceItem } from '../data/siteContent';
import { RippleButton } from './RippleButton';
import { uiSounds } from '../utils/uiSounds';

interface TiltServiceCardProps {
  service: ServiceItem;
  onRequestJob: (topic?: string) => void;
}

export const TiltServiceCard: React.FC<TiltServiceCardProps> = ({
  service,
  onRequestJob,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 24, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [5.5, -5.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-5.5, 5.5]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [15, 85]);
  const lightGlare = useMotionTemplate`radial-gradient(280px circle at ${glareX}% ${glareY}%, rgba(63, 97, 142, 0.1), transparent 72%)`;
  const darkGlare = useMotionTemplate`radial-gradient(280px circle at ${glareX}% ${glareY}%, rgba(126, 176, 242, 0.14), transparent 72%)`;

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    setHovered(true);
    uiSounds.hover(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(Math.max(-0.5, Math.min(0.5, normX)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, normY)));
  };

  const handlePointerLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 950 }} className="h-full">
      <motion.article
        ref={cardRef}
        data-cursor="card"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.2 }}
        className="group relative h-full p-6 sm:p-7 rounded-2xl bg-white/85 dark:bg-[#131720] border border-[#D4DAE4] dark:border-[#252C38] hover:bg-white dark:hover:bg-[#181D29] hover:border-[#9DA4B0] dark:hover:border-[#49556B] hover:shadow-[0_14px_30px_rgba(11,13,17,0.08)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-colors transition-shadow duration-200 flex flex-col justify-between will-change-transform"
      >
        {/* Subtle cursor-following specular surface layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 dark:hidden transition-opacity duration-200"
            style={{ background: lightGlare, opacity: hovered && !prefersReducedMotion ? 1 : 0 }}
          />
          <motion.div
            className="absolute inset-0 hidden dark:block transition-opacity duration-200"
            style={{ background: darkGlare, opacity: hovered && !prefersReducedMotion ? 1 : 0 }}
          />
        </div>

        <div className="relative z-10" style={{ transform: prefersReducedMotion ? undefined : 'translateZ(12px)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#3F618E] dark:text-[#7EB0F2]">
              {service.index} · {service.category}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-[#0B0D11] dark:text-white mb-2">
            {service.title}
          </h2>
          <p className="text-sm text-[#3E4552] dark:text-[#B5BECC] leading-relaxed mb-5">
            {service.summary}
          </p>

          <ul className="space-y-2 mb-6">
            {service.tasks.map((task) => (
              <li
                key={task}
                className="flex items-start gap-2 text-xs text-[#2C313A] dark:text-[#C5CCD8]"
              >
                <Check className="w-3.5 h-3.5 text-[#3F618E] dark:text-[#7EB0F2] shrink-0 mt-0.5" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <RippleButton
          type="button"
          onPointerEnter={uiSounds.hover}
          onClick={() => {
            uiSounds.open();
            onRequestJob(service.title);
          }}
          style={{ transform: prefersReducedMotion ? undefined : 'translateZ(16px)' }}
          className="relative z-10 group/btn w-full py-2.5 px-4 rounded-full bg-[#0B0D11] dark:bg-white hover:bg-[#3F618E] dark:hover:bg-[#7EB0F2] active:scale-[0.98] text-white dark:text-[#0B0D11] text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F618E]"
        >
          Vraag deze klus aan
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </RippleButton>
      </motion.article>
    </div>
  );
};
