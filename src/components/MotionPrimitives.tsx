import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-40 pointer-events-none bg-[#9DA4B0]/20 dark:bg-white/10"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full bg-[#3F618E] dark:bg-[#7EB0F2] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  y = 18,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.46, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface PageTransitionProps {
  pageKey: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ pageKey, children }) => {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.26, ease: EASE_OUT_EXPO }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
