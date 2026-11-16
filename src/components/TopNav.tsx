import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from './MotionPrimitives';
import { RippleButton } from './RippleButton';
import { BUSINESS_INFO } from '../data/siteContent';
import { uiSounds } from '../utils/uiSounds';

export type NavTab =
  | 'Home'
  | 'Diensten'
  | 'Realisaties'
  | 'Over'
  | 'Visie'
  | 'Contact'
  | 'Privacy'
  | 'Voorwaarden';

interface TopNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenContact: () => void;
  onOpenMenu: () => void;
}

const PRIMARY_NAV_TABS: NavTab[] = ['Home', 'Diensten', 'Over', 'Contact'];

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenContact,
  onOpenMenu,
}) => {
  return (
    <header className="relative z-30 w-full px-3 sm:px-4 lg:px-2 pt-2 lg:pt-[3px] flex items-center justify-between gap-2 lg:gap-3 pointer-events-none">
      {/* Left Navigation Pill Container */}
      <nav
        aria-label="Hoofdnavigatie"
        className="pointer-events-auto flex items-center border border-[#9DA4B0] rounded-full p-[3px] h-[48px] lg:h-[58px] lg:w-[24.2%] justify-between bg-[#E7EAEE]/80 backdrop-blur-xs shrink-0 transition-colors duration-200"
      >
        {/* Mobile (< md): compact active pill */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.open();
              onOpenMenu();
            }}
            aria-current="page"
            className="whitespace-nowrap shrink-0 rounded-full bg-white text-[#0B0D11] h-[40px] px-3.5 text-[12px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] active:scale-[0.97] transition-transform duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
          >
            {activeTab}
          </button>
        </div>

        {/* Tablet & Desktop (md+): primary 4-tab pill bar */}
        <div className="hidden md:flex items-center w-full justify-between pr-2.5 lg:pr-4">
          {PRIMARY_NAV_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.nav();
                  onSelectTab(tab);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative whitespace-nowrap shrink-0 rounded-full text-[12.5px] lg:text-[13px] font-medium transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] cursor-pointer ${
                  isActive
                    ? 'text-[#0B0D11] h-[40px] lg:h-[50px] px-4 lg:px-5'
                    : 'text-[#14171D] hover:text-[var(--brand-accent)] px-2 lg:px-2.5 py-2'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(11,13,17,0.06)] -z-10"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Center spacer matching the 49.4% central chamfered panel width on desktop */}
      <div className="hidden lg:block lg:w-[49.4%] shrink-0" aria-hidden="true" />

      {/* Right Action Pill Container */}
      <div className="pointer-events-auto flex items-center gap-[4px] lg:gap-[5px] border border-[#9DA4B0] rounded-full p-[3px] h-[48px] lg:h-[58px] lg:w-[24.2%] bg-[#E7EAEE]/80 backdrop-blur-xs shrink-0 transition-colors duration-200">
        <RippleButton
          type="button"
          onPointerEnter={uiSounds.hover}
          onClick={() => {
            uiSounds.open();
            onOpenContact();
          }}
          rippleClassName="bg-white/25"
          className="flex-1 h-[40px] lg:h-[50px] px-3 sm:px-4 lg:px-5 bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] rounded-full font-cyber text-[9px] sm:text-[10px] lg:text-[10.5px] tracking-[0.05em] text-white flex items-center justify-center whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
        >
          OFFERTE
        </RippleButton>

        <a
          href={BUSINESS_INFO.phoneHref}
          onPointerEnter={uiSounds.hover}
          onClick={uiSounds.click}
          aria-label={`Bel ${BUSINESS_INFO.phoneDisplay}`}
          className="w-[38px] h-[40px] lg:w-[46px] lg:h-[50px] bg-white hover:bg-[var(--brand-accent)] hover:text-white text-[#111317] active:scale-[0.95] rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
        >
          <Phone className="w-[14px] h-[14px] lg:w-[15px] lg:h-[15px]" strokeWidth={1.7} />
        </a>

        <button
          type="button"
          onPointerEnter={uiSounds.hover}
          onClick={() => {
            uiSounds.open();
            onOpenMenu();
          }}
          aria-label="Menu openen"
          className="w-[38px] h-[40px] lg:w-[46px] lg:h-[50px] bg-white hover:bg-[var(--brand-accent)] hover:text-white text-[#111317] active:scale-[0.95] rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
        >
          <svg
            width="15"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line x1="1" y1="2.5" x2="15" y2="2.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
            <line x1="1" y1="7.5" x2="15" y2="7.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
};
