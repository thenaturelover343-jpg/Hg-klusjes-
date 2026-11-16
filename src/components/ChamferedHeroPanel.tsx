import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ChamferedHeroPanelProps {
  animationSrc?: string;
  videoSrc?: string;
  hasOverlayContent?: boolean;
  children?: React.ReactNode;
}

function buildBottomLeftChamferWedge(w: number, h: number): string {
  if (w <= 0 || h <= 0) return '';

  const chamferY = h * 0.775;
  const chamferX = Math.min(w * 0.165, (h - chamferY) * 0.62);

  const dy = h - chamferY;
  const dx = chamferX;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const fillet = Math.min(18, dy * 0.18, dx * 0.25);

  const c1InY = chamferY - fillet;
  const c1OutX = ux * fillet;
  const c1OutY = chamferY + uy * fillet;

  const c2InX = chamferX - ux * fillet;
  const c2InY = h - uy * fillet;
  const c2OutX = chamferX + fillet;

  return [
    `M 0 ${c1InY}`,
    `Q 0 ${chamferY} ${c1OutX} ${c1OutY}`,
    `L ${c2InX} ${c2InY}`,
    `Q ${chamferX} ${h} ${c2OutX} ${h}`,
    `L 0 ${h}`,
    'Z',
  ].join(' ');
}

export const ChamferedHeroPanel: React.FC<ChamferedHeroPanelProps> = ({
  animationSrc,
  videoSrc,
  hasOverlayContent = false,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 710, h: 886 });
  const [blobVideoUrl, setBlobVideoUrl] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Subtle lag on panel container + optical parallax on the centered media stage
  const panelParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 12]);
  const mediaParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : -10, prefersReducedMotion ? 0 : 28]
  );

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fetch local MP4 into a Blob URL so iOS AVPlayer plays reliably without proxy auth issues
  useEffect(() => {
    if (!videoSrc) return;
    let cancelled = false;
    let createdUrl: string | null = null;

    fetch(videoSrc)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error('Video fetch failed'))))
      .then((blob) => {
        if (cancelled) return;
        createdUrl = URL.createObjectURL(blob);
        setBlobVideoUrl(createdUrl);
      })
      .catch(() => {
        // Animated WebP layer remains active seamlessly
      });

    return () => {
      cancelled = true;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !blobVideoUrl) return;

    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    attemptPlay();
    video.addEventListener('canplay', attemptPlay);

    const handleUnlock = () => {
      if (video.paused) {
        attemptPlay();
      }
    };
    window.addEventListener('touchstart', handleUnlock, { passive: true });
    window.addEventListener('pointerdown', handleUnlock, { passive: true });

    return () => {
      video.removeEventListener('canplay', attemptPlay);
      window.removeEventListener('touchstart', handleUnlock);
      window.removeEventListener('pointerdown', handleUnlock);
    };
  }, [blobVideoUrl]);

  const wedgePath = useMemo(
    () => buildBottomLeftChamferWedge(size.w, size.h),
    [size.w, size.h]
  );

  return (
    <motion.div
      ref={containerRef}
      data-cursor="card"
      style={{ y: panelParallaxY }}
      className="relative w-full h-full rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px] overflow-hidden bg-white shadow-[0_24px_60px_rgba(11,13,17,0.07)] dark:shadow-[0_28px_72px_rgba(0,0,0,0.6)] will-change-transform transition-colors duration-200"
    >
      {/* Pure studio white pedestal — zero blue backdrop behind the rotating tool hand */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-white"
        aria-hidden="true"
      />

      {/* Centered Parallax Showcase Stage (object-contain prevents cropping tools) */}
      <motion.div
        style={{ y: mediaParallaxY, scale: prefersReducedMotion ? 1 : 1.03 }}
        className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-8 pt-6 pb-8 lg:pt-12 lg:pb-12 will-change-transform"
      >
        <div className="relative w-full max-w-[660px] aspect-[16/9]">
          {animationSrc && (
            <img
              src={animationSrc}
              alt="GH Kluswerken gereedschap animatie"
              className="relative z-10 w-full h-full object-contain block"
            />
          )}

          {blobVideoUrl && (
            <video
              ref={videoRef}
              src={blobVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onPlaying={() => setVideoPlaying(true)}
              className={`absolute inset-0 z-[15] w-full h-full object-contain block transition-opacity duration-200 ${
                videoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="GH Kluswerken hero video"
            />
          )}
        </div>
      </motion.div>

      {/* Bottom-right architectural studio index inside white plinth */}
      <div
        className="pointer-events-none absolute bottom-4 right-5 lg:bottom-6 lg:right-7 z-20 flex items-center gap-3 text-[11px] text-[#5C6473]"
        aria-hidden="true"
      >
        <span className="w-8 h-px bg-[#CFD6E0]" />
        <span className="font-medium">Vakwerk aan huis</span>
      </div>

      {hasOverlayContent && (
        <div
          className="absolute inset-0 z-20 bg-white/90 dark:bg-[#0D1017]/90 backdrop-blur-[2px]"
          aria-hidden="true"
        />
      )}

      {hasOverlayContent && children && (
        <div className="absolute inset-0 z-30 overflow-y-auto">
          {children}
        </div>
      )}

      {wedgePath && (
        <svg
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="pointer-events-none absolute inset-0 z-40 w-full h-full block"
          aria-hidden="true"
        >
          <path d={wedgePath} fill="var(--bg-canvas)" />
        </svg>
      )}
    </motion.div>
  );
};
