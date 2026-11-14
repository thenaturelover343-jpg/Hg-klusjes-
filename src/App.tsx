/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { TopNav, NavTab, ThemeMode } from './components/TopNav';
import { RedXWordmark } from './components/RedXWordmark';
import { ChamferedHeroPanel } from './components/ChamferedHeroPanel';
import { ContactModal, MenuDrawer } from './components/ActionDrawers';
import {
  AboutPage,
  HomeDetailsSections,
  ServicesPage,
  SiteFooter,
  VisionPage,
} from './components/PageViews';
import { EASE_OUT_EXPO, PageTransition, ScrollProgressBar } from './components/MotionPrimitives';
import { BionicCursor } from './components/BionicCursor';
import { RippleButton } from './components/RippleButton';
import { getInitialSoundEnabled, uiSounds } from './utils/uiSounds';
import { useHeroMagneticSnap } from './hooks/useHeroMagneticSnap';

const THEME_STORAGE_KEY = 'hg-klusjes-theme';

const HERO_DISCIPLINES = [
  { index: '01', label: 'Meubels & Montage', detail: 'Kasten, verlichting, rails' },
  { index: '02', label: 'Herstellingen', detail: 'Deuren, beslag, sanitair' },
  { index: '03', label: 'Onderhoud aan huis', detail: 'Kitvoegen, schilder- & buitenwerk' },
];

const PAGE_TITLES: Record<NavTab, string> = {
  Home: 'HG Klusjes – Klusjesman aan huis voor montage en onderhoud',
  Over: 'Over HG Klusjes – Vakmanschap & persoonlijke klushulp',
  Diensten: 'Diensten – Montage, herstellingen & onderhoud aan huis',
  Visie: 'Onze Visie – Duurzaam herstellen & zorgeloos wonen',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('Home');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getInitialSoundEnabled);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { notifyProgrammaticScroll } = useHeroMagneticSnap({
    enabled: activeTab === 'Home',
    heroRef,
    detailsRef,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  useEffect(() => {
    document.title = PAGE_TITLES[activeTab];
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.content = canonicalUrl;
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      uiSounds.setEnabled(next);
      if (next) {
        uiSounds.toggle(true);
      }
      return next;
    });
  };

  const handleNavigate = (tab: NavTab) => {
    notifyProgrammaticScroll(750);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestJob = (topic?: string) => {
    setContactTopic(topic ?? '');
    setContactOpen(true);
  };

  const scrollToDetails = () => {
    notifyProgrammaticScroll(850);
    const target = detailsRef.current ?? document.getElementById('home-details');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full bg-[#E7EAEE] dark:bg-[#0A0C10] text-[#0B0D11] dark:text-[#F4F6FA] overflow-x-hidden flex flex-col transition-colors duration-200">
        {/* Top Window Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Custom Bionic Pointer Cursor (Desktop Fine-Pointer) */}
        <BionicCursor />

        {/* Subtle full-canvas matte studio grain */}
        <div
          className="studio-grain pointer-events-none fixed inset-0 z-25 opacity-[0.045] dark:opacity-[0.03]"
          aria-hidden="true"
        />

        {/* Top Navigation Bar */}
        <div className="lg:fixed lg:top-0 lg:inset-x-0 z-30">
          <TopNav
            activeTab={activeTab}
            theme={theme}
            onToggleTheme={toggleTheme}
            onSelectTab={handleNavigate}
            onOpenContact={() => handleRequestJob()}
            onOpenMenu={() => setMenuOpen(true)}
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'Home' && (
            <PageTransition pageKey="Home">
              {/* Full-Viewport Architectural Hero Section */}
              <main
                ref={heroRef}
                className="relative z-20 w-full min-h-[calc(100vh-56px)] lg:h-screen lg:min-h-[700px] px-4 sm:px-6 lg:px-0 pt-5 pb-8 sm:pt-6 sm:pb-10 lg:py-0 flex flex-col justify-between lg:block gap-6 sm:gap-7"
              >
                {/* Left Column Top — Hero Brand Lockup */}
                <section
                  aria-label="Merknaam"
                  className="lg:absolute lg:left-[2.1%] lg:top-[22%] lg:w-[21.5%] z-20"
                >
                  <RedXWordmark />
                </section>

                {/* Center Focal Anchor — Pure White Chamfered Studio Plinth */}
                <motion.section
                  aria-label="Hero Video Paneel"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.04, ease: EASE_OUT_EXPO }}
                  className="w-full h-[270px] sm:h-[380px] lg:h-auto lg:absolute lg:left-[25.1%] lg:w-[49.4%] lg:top-0 lg:bottom-[14px] z-10"
                >
                  <ChamferedHeroPanel
                    animationSrc="/assets/hero-animation.webp"
                    videoSrc="/assets/aistudio/cPqSU_17619c60.mp4"
                  />
                </motion.section>

                {/* Left Column Bottom — Glassmorphic Architectural Editorial Copy & Primary CTAs */}
                <motion.section
                  aria-label="Klusjesman aan huis"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.08, ease: EASE_OUT_EXPO }}
                  className="lg:absolute lg:left-[2.1%] lg:bottom-[4.5%] lg:w-[21.8%] max-w-[380px] lg:max-w-[330px] z-20 rounded-2xl p-5 sm:p-6 bg-white/58 dark:bg-[#131722]/65 backdrop-blur-md border border-white/75 dark:border-white/10 shadow-[0_12px_36px_rgba(11,13,17,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_16px_44px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-200"
                >
                  <p className="font-cyber text-[10px] leading-snug tracking-[0.08em] text-[#3F618E] dark:text-[#7EB0F2] mb-2 transition-colors duration-200">
                    KLUSJESMAN AAN HUIS
                  </p>
                  <h2 className="font-ui text-[22px] sm:text-[25px] lg:text-[22px] xl:text-[25px] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0B0D11] dark:text-white text-balance transition-colors duration-200">
                    Montage, herstellingen en onderhoud aan huis.
                  </h2>
                  <p className="mt-2.5 text-[12.5px] lg:text-[13px] leading-[1.5] text-[#3D4553] dark:text-[#B4BECE] transition-colors duration-200">
                    Strak geplaatst, duurzaam hersteld en netjes opgeleverd met eigen professioneel gereedschap.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <RippleButton
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={() => {
                        uiSounds.open();
                        handleRequestJob();
                      }}
                      className="px-4 py-2.5 rounded-full bg-[#0B0D11] dark:bg-white hover:bg-[#3F618E] dark:hover:bg-[#7EB0F2] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(11,13,17,0.16)] active:translate-y-0 active:scale-[0.98] text-white dark:text-[#0B0D11] text-[11.5px] font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F618E]"
                    >
                      Vraag je klus aan
                    </RippleButton>
                    <a
                      href="tel:+3200000000"
                      onPointerEnter={uiSounds.hover}
                      onClick={uiSounds.click}
                      className="px-4 py-2.5 rounded-full border border-[#9DA4B0]/80 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-[#1E2533] hover:border-[#0B0D11] dark:hover:border-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-[#0B0D11] dark:text-white text-[11.5px] font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F618E]"
                    >
                      Bel ons
                    </a>
                  </div>
                </motion.section>

                {/* Right Column — Glassmorphic Disciplines Container & Scroll Anchor */}
                <motion.aside
                  aria-label="Kern-disciplines"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.44, delay: 0.12, ease: EASE_OUT_EXPO }}
                  className="lg:absolute lg:right-[2.1%] lg:top-[22%] lg:bottom-[4.5%] lg:w-[21.5%] flex flex-col justify-between z-20"
                >
                  <div className="rounded-2xl p-5 bg-white/58 dark:bg-[#131722]/65 backdrop-blur-md border border-white/75 dark:border-white/10 shadow-[0_12px_36px_rgba(11,13,17,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_16px_44px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cyber text-[9.5px] tracking-[0.08em] text-[#4E5768] dark:text-[#96A1B5]">
                        DISCIPLINES
                      </span>
                      <span className="text-[11px] font-medium tabular-nums text-[#3F618E] dark:text-[#7EB0F2]">
                        01 — 03
                      </span>
                    </div>

                    <div className="divide-y divide-[#CFD5DF]/80 dark:divide-white/10">
                      {HERO_DISCIPLINES.map((item, idx) => (
                        <button
                          key={item.index}
                          type="button"
                          onPointerEnter={uiSounds.hover}
                          onClick={() => {
                            uiSounds.nav();
                            handleNavigate('Diensten');
                          }}
                          className="group w-full py-3 first:pt-2 last:pb-1 flex items-start justify-between gap-3 text-left transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2.5">
                              <span className="font-cyber text-[9.5px] text-[#3F618E] dark:text-[#7EB0F2] tabular-nums">
                                {item.index}
                              </span>
                              <span className="text-[13px] font-semibold text-[#0B0D11] dark:text-white group-hover:text-[#3F618E] dark:group-hover:text-[#7EB0F2] transition-colors truncate">
                                {item.label}
                              </span>
                              <span
                                className="relative inline-flex h-2 w-2 shrink-0 items-center justify-center"
                                aria-hidden="true"
                              >
                                {!prefersReducedMotion && (
                                  <motion.span
                                    animate={{
                                      scale: [1, 2.1, 1],
                                      opacity: [0.6, 0, 0.6],
                                    }}
                                    transition={{
                                      duration: 2.2,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                      delay: idx * 0.35,
                                    }}
                                    className="absolute inset-0 rounded-full bg-[#3F618E]/60 dark:bg-[#7EB0F2]/70"
                                  />
                                )}
                                <span className="relative h-1.5 w-1.5 rounded-full bg-[#3F618E] dark:bg-[#7EB0F2] shadow-[0_0_8px_rgba(63,97,142,0.65)] dark:shadow-[0_0_10px_rgba(126,176,242,0.85)]" />
                              </span>
                            </div>
                            <p className="text-[11.5px] text-[#4E5768] dark:text-[#9AA5B8] pl-6 mt-0.5 truncate">
                              {item.detail}
                            </p>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#7A8494] group-hover:text-[#0B0D11] dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom-Right Spec Strip & Scroll Cue */}
                  <div className="hidden lg:flex flex-col items-end gap-4">
                    <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t border-[#C8CFD9] dark:border-[#242B39]">
                      <div>
                        <p className="text-[10.5px] text-[#5E6777] dark:text-[#8E98AB]">Reactietijd</p>
                        <p className="text-[13px] font-semibold tabular-nums text-[#0B0D11] dark:text-white mt-0.5">
                          Binnen 24u
                        </p>
                      </div>
                      <div>
                        <p className="text-[10.5px] text-[#5E6777] dark:text-[#8E98AB]">Aanspreekpunt</p>
                        <p className="text-[13px] font-semibold text-[#0B0D11] dark:text-white mt-0.5">
                          Direct & vast
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={() => {
                        uiSounds.nav();
                        scrollToDetails();
                      }}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white/85 dark:bg-[#151A24] hover:bg-white dark:hover:bg-[#1E2533] hover:border-[#0B0D11] dark:hover:border-white hover:-translate-y-0.5 text-[11.5px] font-semibold text-[#0B0D11] dark:text-white transition-all duration-200 cursor-pointer"
                    >
                      <span>Ontdek meer</span>
                      <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </button>
                  </div>
                </motion.aside>
              </main>

              {/* Below-the-fold Detailed Sections */}
              <div id="home-details" ref={detailsRef}>
                <HomeDetailsSections
                  onNavigate={handleNavigate}
                  onRequestJob={handleRequestJob}
                />
              </div>
            </PageTransition>
          )}

          {activeTab === 'Over' && (
            <PageTransition pageKey="Over">
              <main className="relative z-20 flex-1">
                <AboutPage onNavigate={handleNavigate} onRequestJob={handleRequestJob} />
              </main>
            </PageTransition>
          )}

          {activeTab === 'Diensten' && (
            <PageTransition pageKey="Diensten">
              <main className="relative z-20 flex-1">
                <ServicesPage onNavigate={handleNavigate} onRequestJob={handleRequestJob} />
              </main>
            </PageTransition>
          )}

          {activeTab === 'Visie' && (
            <PageTransition pageKey="Visie">
              <main className="relative z-20 flex-1">
                <VisionPage onNavigate={handleNavigate} onRequestJob={handleRequestJob} />
              </main>
            </PageTransition>
          )}
        </AnimatePresence>

        {/* Quiet Site Footer */}
        <SiteFooter onNavigate={handleNavigate} onRequestJob={handleRequestJob} />

        {/* Interactive Modals & Navigation Drawer */}
        <ContactModal
          open={contactOpen}
          initialTopic={contactTopic}
          onClose={() => setContactOpen(false)}
        />
        <MenuDrawer
          open={menuOpen}
          activeTab={activeTab}
          theme={theme}
          soundEnabled={soundEnabled}
          onToggleTheme={toggleTheme}
          onToggleSound={toggleSound}
          onSelectTab={handleNavigate}
          onOpenContact={() => handleRequestJob()}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
