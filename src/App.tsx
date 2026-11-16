/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { TopNav, NavTab } from './components/TopNav';
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
import {
  ContactPage,
  LegalPage,
  RealizationsPage,
} from './components/ProfessionalPages';
import { EASE_OUT_EXPO, PageTransition, ScrollProgressBar } from './components/MotionPrimitives';
import { BionicCursor } from './components/BionicCursor';
import { RippleButton } from './components/RippleButton';
import { BUSINESS_INFO } from './data/siteContent';
import { uiSounds } from './utils/uiSounds';
import { useHeroMagneticSnap } from './hooks/useHeroMagneticSnap';

const HERO_DISCIPLINES = [
  { index: '01', label: 'Bezettingswerken', detail: 'Pleisterwerk & strak uitvlakken' },
  { index: '02', label: 'Tegelwerken', detail: 'Vloer-, wand- & badkamertegels' },
  { index: '03', label: 'Opstijgend vocht', detail: 'Muurinjectie & vochtbehandeling' },
];

const PAGE_META: Record<NavTab, { title: string; description: string; hash: string }> = {
  Home: {
    title: 'GH Kluswerken – Bezettingswerken, Tegelwerken & Opstijgend Vocht',
    description:
      'GH Kluswerken: uw partner voor renovatie & afwerking. Specialist in bezettingswerken, tegelwerken en behandeling van opstijgend vocht in België. Bel 0484/29 46 47.',
    hash: '',
  },
  Diensten: {
    title: 'Diensten – Bezettingswerken, Tegelwerken & Opstijgend Vocht | GH Kluswerken',
    description:
      'Overzicht van alle renovatiediensten door GH Kluswerken: binnenbezetting, cementering, vloer- en wandtegels, badkamerwaterdichting en vochtinjecties.',
    hash: '#diensten',
  },
  Realisaties: {
    title: 'Realisaties & Projecten – Vakwerk door GH Kluswerken',
    description:
      'Bekijk concrete uitvoeringen van schilderklaar pleisterwerk, grootformaat vloertegels en muurinjectie tegen opstijgend vocht door GH Kluswerken.',
    hash: '#realisaties',
  },
  Over: {
    title: 'Over GH Kluswerken – Uw partner voor renovatie & afwerking',
    description:
      'Leer GH Kluswerken kennen: drie kernexpertises onder één dak met persoonlijk overleg, duurzame materialen en nette oplevering.',
    hash: '#over',
  },
  Visie: {
    title: 'Onze Visie – Duurzame renovatie & strakke afwerking | GH Kluswerken',
    description:
      'Waarom degelijke renovatie begint bij een droge, gezonde ondergrond en millimeterprecisie in bezetting en tegelwerk.',
    hash: '#visie',
  },
  Contact: {
    title: 'Contact & Offerte aanvragen – GH Kluswerken (0484/29 46 47)',
    description:
      'Vraag een vrijblijvende offerte of plaatsbezoek aan bij GH Kluswerken via 0484/29 46 47, info@ghkluswerken.be of het online aanvraagformulier.',
    hash: '#contact',
  },
  Privacy: {
    title: 'Privacybeleid (GDPR) | GH Kluswerken',
    description:
      'Privacybeleid en verwerking van offerte- en contactgegevens conform GDPR door GH Kluswerken.',
    hash: '#privacy',
  },
  Voorwaarden: {
    title: 'Algemene Voorwaarden | GH Kluswerken',
    description:
      'Algemene uitvoerings- en offertevoorwaarden van GH Kluswerken voor bezettingswerken, tegelwerken en vochtbestrijding.',
    hash: '#voorwaarden',
  },
};

function resolveTabFromHash(hash: string): NavTab {
  const clean = hash.toLowerCase();
  if (clean === '#diensten') return 'Diensten';
  if (clean === '#realisaties') return 'Realisaties';
  if (clean === '#over') return 'Over';
  if (clean === '#visie') return 'Visie';
  if (clean === '#contact') return 'Contact';
  if (clean === '#privacy') return 'Privacy';
  if (clean === '#voorwaarden') return 'Voorwaarden';
  return 'Home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    if (typeof window === 'undefined') return 'Home';
    return resolveTabFromHash(window.location.hash);
  });
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

  // Sync browser hash navigation (Back / Forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(resolveTabFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure clean GH Kluswerken Logo Kobalt root state + per-page SEO meta tags
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    delete root.dataset.palette;

    const meta = PAGE_META[activeTab];
    document.title = meta.title;

    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descTag) {
      descTag.content = meta.description;
    }

    const canonicalUrl = `${window.location.origin}${window.location.pathname}${meta.hash}`;
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

  const handleNavigate = (tab: NavTab) => {
    notifyProgrammaticScroll(750);
    setActiveTab(tab);
    const nextHash = PAGE_META[tab].hash;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash || window.location.pathname);
    }
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
      <div className="relative min-h-screen w-full bg-[var(--bg-canvas)] text-[#0B0D11] overflow-x-hidden flex flex-col">
        {/* Top Window Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Custom Bionic Pointer Cursor (Desktop Fine-Pointer) */}
        <BionicCursor />

        {/* Subtle full-canvas matte studio grain */}
        <div
          className="studio-grain pointer-events-none fixed inset-0 z-25 opacity-[0.045]"
          aria-hidden="true"
        />

        {/* Top Navigation Bar */}
        <div className="lg:fixed lg:top-0 lg:inset-x-0 z-30">
          <TopNav
            activeTab={activeTab}
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
                  className="lg:absolute lg:left-[2.1%] lg:top-[16%] lg:w-[21.5%] z-20"
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

                {/* Left Column Bottom — Glassmorphic Editorial Copy & Primary CTAs */}
                <motion.section
                  aria-label="GH Kluswerken overzicht"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.08, ease: EASE_OUT_EXPO }}
                  className="lg:absolute lg:left-[2.1%] lg:bottom-[4.5%] lg:w-[21.8%] max-w-[380px] lg:max-w-[330px] z-20 rounded-2xl p-5 sm:p-6 bg-white/62 backdrop-blur-md border border-white/80 shadow-[0_12px_36px_rgba(var(--brand-accent-rgb),0.08),inset_0_1px_0_rgba(255,255,255,0.75)]"
                >
                  <p className="font-cyber text-[10px] leading-snug tracking-[0.08em] text-[var(--brand-accent)] mb-2">
                    UW PARTNER VOOR RENOVATIE
                  </p>
                  <h2 className="font-ui text-[21px] sm:text-[24px] lg:text-[21px] xl:text-[24px] font-semibold tracking-[-0.03em] leading-[1.16] text-[#0B0D11] text-balance">
                    Bezettingswerken, tegelwerken &amp; opstijgend vocht.
                  </h2>
                  <p className="mt-2.5 text-[12.5px] lg:text-[13px] leading-[1.5] text-[#3D4553]">
                    Uw partner voor renovatie &amp; afwerking — duurzaam herstel en millimeterprecisie.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <RippleButton
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={() => {
                        uiSounds.open();
                        handleRequestJob();
                      }}
                      className="px-4 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(var(--brand-accent-rgb),0.28)] active:translate-y-0 active:scale-[0.98] text-white text-[11.5px] font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
                    >
                      Offerte aanvragen
                    </RippleButton>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      onPointerEnter={uiSounds.hover}
                      onClick={uiSounds.click}
                      className="px-4 py-2.5 rounded-full border border-[#9DA4B0]/80 bg-white/75 hover:bg-white hover:border-[var(--brand-accent)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-[#0B0D11] text-[11.5px] font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </motion.section>

                {/* Right Column — Glassmorphic Disciplines Container & Scroll Anchor */}
                <motion.aside
                  aria-label="Kern-disciplines"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.44, delay: 0.12, ease: EASE_OUT_EXPO }}
                  className="lg:absolute lg:right-[2.1%] lg:top-[20%] lg:bottom-[4.5%] lg:w-[21.5%] flex flex-col justify-between z-20"
                >
                  <div className="rounded-2xl p-5 bg-white/62 backdrop-blur-md border border-white/80 shadow-[0_12px_36px_rgba(var(--brand-accent-rgb),0.08),inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cyber text-[9.5px] tracking-[0.08em] text-[#4E5768]">
                        DISCIPLINES
                      </span>
                      <span className="text-[11px] font-medium tabular-nums text-[var(--brand-accent)]">
                        01 — 03
                      </span>
                    </div>

                    <div className="divide-y divide-[#CFD5DF]/80">
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
                              <span className="font-cyber text-[9.5px] text-[var(--brand-accent)] tabular-nums">
                                {item.index}
                              </span>
                              <span className="text-[13px] font-semibold text-[#0B0D11] group-hover:text-[var(--brand-accent)] transition-colors truncate">
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
                                    className="absolute inset-0 rounded-full bg-[var(--brand-accent)]/60"
                                  />
                                )}
                                <span
                                  className="relative h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]"
                                  style={{
                                    boxShadow: '0 0 8px rgba(var(--brand-accent-rgb), 0.72)',
                                  }}
                                />
                              </span>
                            </div>
                            <p className="text-[11.5px] text-[#4E5768] pl-6 mt-0.5 truncate">
                              {item.detail}
                            </p>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#7A8494] group-hover:text-[var(--brand-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom-Right Direct Contact Strip & Scroll Cue */}
                  <div className="hidden lg:flex flex-col items-end gap-4">
                    <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t border-[#C8CFD9]">
                      <div>
                        <p className="text-[10.5px] text-[#5E6777]">Direct contact</p>
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          onPointerEnter={uiSounds.hover}
                          onClick={uiSounds.click}
                          className="text-[13px] font-semibold tabular-nums text-[#0B0D11] hover:text-[var(--brand-accent)] mt-0.5 block transition-colors"
                        >
                          {BUSINESS_INFO.phoneDisplay}
                        </a>
                      </div>
                      <div>
                        <p className="text-[10.5px] text-[#5E6777]">E-mail</p>
                        <a
                          href={BUSINESS_INFO.emailHref}
                          onPointerEnter={uiSounds.hover}
                          onClick={uiSounds.click}
                          className="text-[12px] font-semibold text-[#0B0D11] hover:text-[var(--brand-accent)] mt-0.5 block truncate transition-colors"
                        >
                          {BUSINESS_INFO.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onPointerEnter={uiSounds.hover}
                      onClick={() => {
                        uiSounds.nav();
                        scrollToDetails();
                      }}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] bg-white/85 hover:bg-white hover:border-[var(--brand-accent)] hover:-translate-y-0.5 text-[11.5px] font-semibold text-[#0B0D11] transition-all duration-200 cursor-pointer"
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

          {activeTab === 'Diensten' && (
            <PageTransition pageKey="Diensten">
              <main className="relative z-20 flex-1">
                <ServicesPage onNavigate={handleNavigate} onRequestJob={handleRequestJob} />
              </main>
            </PageTransition>
          )}

          {activeTab === 'Realisaties' && (
            <PageTransition pageKey="Realisaties">
              <main className="relative z-20 flex-1">
                <RealizationsPage onNavigate={handleNavigate} onRequestJob={handleRequestJob} />
              </main>
            </PageTransition>
          )}

          {activeTab === 'Over' && (
            <PageTransition pageKey="Over">
              <main className="relative z-20 flex-1">
                <AboutPage onNavigate={handleNavigate} onRequestJob={handleRequestJob} />
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

          {activeTab === 'Contact' && (
            <PageTransition pageKey="Contact">
              <main className="relative z-20 flex-1">
                <ContactPage onNavigate={handleNavigate} />
              </main>
            </PageTransition>
          )}

          {(activeTab === 'Privacy' || activeTab === 'Voorwaarden') && (
            <PageTransition pageKey={activeTab}>
              <main className="relative z-20 flex-1">
                <LegalPage mode={activeTab} onNavigate={handleNavigate} />
              </main>
            </PageTransition>
          )}
        </AnimatePresence>

        {/* Quiet Site Footer */}
        <SiteFooter onNavigate={handleNavigate} onRequestJob={handleRequestJob} />

        {/* Interactive Offerte Modal & Navigation Drawer */}
        <ContactModal
          open={contactOpen}
          initialTopic={contactTopic}
          onClose={() => setContactOpen(false)}
        />
        <MenuDrawer
          open={menuOpen}
          activeTab={activeTab}
          onSelectTab={handleNavigate}
          onOpenContact={() => handleRequestJob()}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
