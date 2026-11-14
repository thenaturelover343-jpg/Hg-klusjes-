import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ABOUT_VALUES,
  PROCESS_STEPS,
  ServiceCategory,
  SERVICES,
  VISION_PILLARS,
} from '../data/siteContent';
import { EASE_OUT_EXPO, FadeIn } from './MotionPrimitives';
import { FaqSection } from './FaqSection';
import { NavTab } from './TopNav';
import { RippleButton } from './RippleButton';
import { TiltServiceCard } from './TiltServiceCard';
import { uiSounds } from '../utils/uiSounds';
import joineryCraftImg from '../assets/images/craft_precision_joinery_1794539710281.jpg';
import interiorLightingImg from '../assets/images/craft_interior_lighting_1794539711794.jpg';
import toolsFlatlayImg from '../assets/images/craft_tools_flatlay_1794539712529.jpg';

interface SharedPageProps {
  onNavigate: (tab: NavTab) => void;
  onRequestJob: (topic?: string) => void;
}

/* -------------------------------------------------------------------------- */
/* Below-the-fold architectural showcase for Home                             */
/* -------------------------------------------------------------------------- */
export const HomeDetailsSections: React.FC<SharedPageProps> = ({
  onNavigate,
  onRequestJob,
}) => {
  return (
    <div className="relative z-20 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-14 space-y-24 sm:space-y-32">
      {/* 01 · Over HG Klusjes — 2-Column Editorial Split + Joinery Photography */}
      <section
        aria-labelledby="home-about-heading"
        className="border-t border-[#C9D0DB] dark:border-[#242A35] pt-12 sm:pt-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <FadeIn y={16}>
                <p className="font-cyber text-[10px] tracking-[0.08em] text-[#3F618E] dark:text-[#7EB0F2] mb-3">
                  01 · VAKMANSCHAP AAN HUIS
                </p>
                <h2
                  id="home-about-heading"
                  className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-[-0.03em] leading-[1.08] text-[#0B0D11] dark:text-white mb-5 text-balance"
                >
                  Precisie voor kleine én middelgrote klussen in huis.
                </h2>
              </FadeIn>

              <FadeIn y={16} delay={0.06}>
                <p className="text-sm sm:text-[15.5px] leading-[1.68] text-[#2C313A] dark:text-[#C5CCD8] mb-8 max-w-xl">
                  HG Klusjes combineert zorgvuldige afwerking met directe communicatie. Geen weken wachten
                  voor een klemmende deur, losse kraan of volledige kastmontage — één vast aanspreekpunt
                  met eigen professioneel gereedschap.
                </p>
              </FadeIn>

              {/* Hairline Specification Strip — each item reveals individually on scroll */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {ABOUT_VALUES.map((item, idx) => (
                  <FadeIn key={item.index} delay={idx * 0.07} y={18}>
                    <div className="pt-3.5 border-t border-[#CFD5DF] dark:border-[#242A35]">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="font-cyber text-[9.5px] tracking-[0.06em] text-[#3F618E] dark:text-[#7EB0F2] tabular-nums">
                          {item.index}
                        </span>
                        <h3 className="text-[14px] font-semibold text-[#0B0D11] dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[12.5px] leading-relaxed text-[#454D5B] dark:text-[#A8B2C2]">
                        {item.detail}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn y={14} delay={0.12}>
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.nav();
                  onNavigate('Over');
                }}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white/85 dark:bg-[#151A24] hover:bg-[#0B0D11] hover:text-white hover:border-[#0B0D11] dark:hover:bg-white dark:hover:text-[#0B0D11] dark:hover:border-white text-xs font-semibold text-[#0B0D11] dark:text-white transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Meer over HG Klusjes
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </FadeIn>
          </div>

          <FadeIn className="lg:col-span-6" delay={0.1} y={22}>
            <div
              data-cursor="card"
              className="relative h-full min-h-[340px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#D8DEE7] dark:bg-[#161B24] border border-[#CFD5DF] dark:border-[#262E3D]"
            >
              <img
                src={joineryCraftImg}
                alt="Vakman stelt een matzwarte kastscharnier precies af op eikenhout"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-4 text-white">
                <div>
                  <p className="font-cyber text-[9.5px] tracking-[0.08em] text-white/75 mb-1">
                    AFWERKING OP MILLIMETER
                  </p>
                  <p className="text-sm sm:text-base font-medium text-white max-w-sm">
                    Scharnieren, beslag en maatwerk waterpas afgesteld voor dagelijks comfort.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 02 · Diensten Bento Gallery + Curated Tools Photography */}
      <section
        aria-labelledby="home-services-heading"
        className="border-t border-[#C9D0DB] dark:border-[#242A35] pt-12 sm:pt-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <FadeIn y={16}>
            <div>
              <p className="font-cyber text-[10px] tracking-[0.08em] text-[#3F618E] dark:text-[#7EB0F2] mb-2.5">
                02 · DIENSTEN
              </p>
              <h2
                id="home-services-heading"
                className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.025em] text-[#0B0D11] dark:text-white text-balance"
              >
                Montage, herstellingen en onderhoud aan huis.
              </h2>
            </div>
          </FadeIn>
          <FadeIn y={14} delay={0.08}>
            <RippleButton
              type="button"
              onPointerEnter={uiSounds.hover}
              onClick={() => {
                uiSounds.nav();
                onNavigate('Diensten');
              }}
              className="group self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0D11] dark:bg-white hover:bg-[#3F618E] dark:hover:bg-[#7EB0F2] text-white dark:text-[#0B0D11] text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
            >
              Alle 6 diensten bekijken
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </RippleButton>
          </FadeIn>
        </div>

        {/* Asymmetric Bento Grid: Studio Toolset + Individual Featured Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <FadeIn className="lg:col-span-5" delay={0.04} y={22}>
            <div
              data-cursor="card"
              className="relative h-full min-h-[300px] rounded-2xl overflow-hidden bg-[#D8DEE7] dark:bg-[#161B24] border border-[#CFD5DF] dark:border-[#262E3D]"
            >
              <img
                src={toolsFlatlayImg}
                alt="Overzicht van professioneel hand- en accugereedschap op grijze werkbank"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <p className="font-cyber text-[9.5px] tracking-[0.08em] text-white/75 mb-1">
                  EIGEN UITRUSTING
                </p>
                <p className="text-base sm:text-lg font-semibold leading-snug">
                  Voorbereid voor steen, beton, gipskarton en fijn schrijnwerk.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.slice(0, 4).map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.07} y={20} className="h-full">
                <article
                  data-cursor="card"
                  className="group h-full p-6 rounded-2xl bg-white/90 dark:bg-[#131720] border border-[#D4DAE4] dark:border-[#252C38] hover:bg-white dark:hover:bg-[#181D29] hover:border-[#9DA4B0] dark:hover:border-[#49556B] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(11,13,17,0.06)] dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.4)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <span className="text-[11px] font-medium text-[#5A6373] dark:text-[#9AA5B8] tabular-nums">
                        {service.index} · {service.category}
                      </span>
                      <button
                        type="button"
                        onPointerEnter={uiSounds.hover}
                        onClick={() => {
                          uiSounds.open();
                          onRequestJob(service.title);
                        }}
                        aria-label={`Vraag ${service.title} aan`}
                        className="w-8 h-8 rounded-full border border-[#D4DAE4] dark:border-[#343C4A] group-hover:border-[#0B0D11] dark:group-hover:border-white group-hover:bg-[#0B0D11] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#0B0D11] flex items-center justify-center text-[#0B0D11] dark:text-white transition-all duration-200 cursor-pointer"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>

                    <h3 className="text-[16px] font-semibold text-[#0B0D11] dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[13px] text-[#3E4552] dark:text-[#B5BECC] leading-relaxed mb-4">
                      {service.summary}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-3.5 border-t border-[#E6EAF0] dark:border-[#242B39]">
                    {service.tasks.slice(0, 2).map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-2 text-[12px] text-[#2C313A] dark:text-[#C5CCD8]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#3F618E] dark:text-[#7EB0F2] shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · Obsidian Architectural Vision & 3-Step Workflow */}
      <section aria-labelledby="home-vision-heading">
        <div className="rounded-2xl bg-[#0E1117] dark:bg-[#111621] border border-[#1E2533] dark:border-[#273144] text-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <FadeIn y={16}>
                  <p className="font-cyber text-[10px] tracking-[0.08em] text-[#7EB0F2] mb-3">
                    03 · VISIE & WERKWIJZE
                  </p>
                  <h2
                    id="home-vision-heading"
                    className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-[-0.025em] leading-[1.12] text-white mb-4 text-balance"
                  >
                    Duurzaam herstellen en zorgeloos onderhoud.
                  </h2>
                </FadeIn>
                <FadeIn y={16} delay={0.06}>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#C2CAD6] mb-8 max-w-lg">
                    Wat goed hersteld kan worden hoeft niet vervangen te worden. Met één heldere
                    afspraak werken we jouw hele klussenlijst vakkundig en proper weg.
                  </p>
                </FadeIn>
              </div>

              {/* Hairline 3-Step Process Strip — individual staggered reveals */}
              <div className="space-y-4 border-t border-white/12 pt-6 mb-8">
                {PROCESS_STEPS.map((step, idx) => (
                  <FadeIn key={step.step} delay={idx * 0.08} y={16}>
                    <div className="grid grid-cols-12 gap-3 pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
                      <span className="col-span-2 sm:col-span-1 font-cyber text-[10px] text-[#7EB0F2] tabular-nums pt-0.5">
                        {step.step}
                      </span>
                      <div className="col-span-10 sm:col-span-11">
                        <h3 className="text-sm font-semibold text-white mb-0.5">{step.title}</h3>
                        <p className="text-xs leading-relaxed text-[#A7B1C2]">{step.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn y={14} delay={0.14}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <RippleButton
                    type="button"
                    onPointerEnter={uiSounds.hover}
                    onClick={() => {
                      uiSounds.nav();
                      onNavigate('Visie');
                    }}
                    rippleClassName="bg-[#0B0D11]/20"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0D11] text-xs font-semibold hover:bg-[#7EB0F2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    Lees onze visie
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </RippleButton>
                  <RippleButton
                    type="button"
                    onPointerEnter={uiSounds.hover}
                    onClick={() => {
                      uiSounds.open();
                      onRequestJob();
                    }}
                    rippleClassName="bg-white/25"
                    className="px-5 py-2.5 rounded-full border border-white/25 text-white text-xs font-semibold hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    Vraag je klus aan
                  </RippleButton>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-[#18202E]" delay={0.1} y={20}>
              <img
                src={interiorLightingImg}
                alt="Strak gemonteerde architecturale wandverlichting en zwevende eiken wandplank"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0E1117]/40 via-transparent to-transparent lg:block hidden"
                aria-hidden="true"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Over (About) Page                                                */
/* -------------------------------------------------------------------------- */
export const AboutPage: React.FC<SharedPageProps> = ({ onNavigate, onRequestJob }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-14">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF] dark:border-[#242A35]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[#3F618E] dark:text-[#7EB0F2] mb-2">
              HG KLUSJES · OVER ONS
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] dark:text-white text-balance">
              Klusjesman aan huis met oog voor detail.
            </h1>
          </div>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Home');
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white/80 dark:bg-[#151A24] hover:bg-[#0B0D11] hover:text-white hover:border-[#0B0D11] dark:hover:bg-white dark:hover:text-[#0B0D11] dark:hover:border-white text-xs font-semibold text-[#0B0D11] dark:text-white transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Terug naar Home
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <FadeIn className="lg:col-span-7" delay={0.05}>
          <div className="h-full p-7 sm:p-10 rounded-2xl bg-white/90 dark:bg-[#131720] border border-[#D4DAE4] dark:border-[#252C38] flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-[-0.02em] text-[#0B0D11] dark:text-white mb-5 text-balance">
                Persoonlijk vakwerk voor elke klus in en rond de woning.
              </h2>
              <p className="text-sm sm:text-[15.5px] leading-[1.7] text-[#2C313A] dark:text-[#C5CCD8] mb-4">
                HG Klusjes is opgericht vanuit een praktische gedachte: huishoudens verdienen een
                betrouwbare vakman die zowel kleine herstellingen als volledige montageklussen met
                dezelfde precisie aanpakt. Geen weken wachten voor een loshangende kastdeur of een
                nieuwe lamp.
              </p>
              <p className="text-sm sm:text-[15.5px] leading-[1.7] text-[#2C313A] dark:text-[#C5CCD8] mb-8">
                Of het nu gaat om het monteren van meubels, het bijstellen van deuren en ramen of
                het periodiek onderhouden van badkamer en keuken — wij zorgen voor een stevige,
                propere en duurzame oplossing aan huis.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#E6EAF0] dark:border-[#242B39]">
              <RippleButton
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.open();
                  onRequestJob('Kennismaking / Klus aanvraag');
                }}
                className="group px-5 py-2.5 rounded-full bg-[#0B0D11] dark:bg-white hover:bg-[#3F618E] dark:hover:bg-[#7EB0F2] text-white dark:text-[#0B0D11] text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 cursor-pointer"
              >
                Vraag je klus aan
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </RippleButton>
              <a
                href="tel:+3200000000"
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="px-5 py-2.5 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white dark:bg-[#151A24] hover:border-[#0B0D11] dark:hover:border-white text-[#0B0D11] dark:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Bel ons
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-5" delay={0.1}>
          <div className="relative h-full min-h-[320px] rounded-2xl overflow-hidden bg-[#D8DEE7] dark:bg-[#161B24] border border-[#D4DAE4] dark:border-[#252C38]">
            <img
              src={joineryCraftImg}
              alt="Precisie montagewerk van HG Klusjes aan huis"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-cyber text-[9.5px] tracking-[0.08em] text-[#7EB0F2] mb-1.5">
                STANDAARD AANPAK
              </p>
              <p className="text-base font-semibold leading-snug mb-3">
                Montage, herstellingen en onderhoud zonder zorgen.
              </p>
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.nav();
                  onNavigate('Diensten');
                }}
                className="group inline-flex items-center gap-2 text-xs font-semibold text-white hover:underline cursor-pointer"
              >
                Bekijk al onze diensten
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 4-Column Hairline Values Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {ABOUT_VALUES.map((val, idx) => (
          <FadeIn key={val.index} delay={idx * 0.06}>
            <div className="pt-4 border-t border-[#C8CFD9] dark:border-[#283040]">
              <span className="font-cyber text-[10px] tracking-[0.06em] text-[#3F618E] dark:text-[#7EB0F2] tabular-nums block mb-2">
                {val.index}
              </span>
              <h3 className="text-[15px] font-semibold text-[#0B0D11] dark:text-white mb-1.5">
                {val.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#3E4552] dark:text-[#B5BECC]">{val.detail}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Diensten (Services) Page                                         */
/* -------------------------------------------------------------------------- */
const CATEGORIES: ServiceCategory[] = ['Alle', 'Montage', 'Herstellingen', 'Onderhoud'];

export const ServicesPage: React.FC<SharedPageProps> = ({ onNavigate, onRequestJob }) => {
  const [filter, setFilter] = useState<ServiceCategory>('Alle');

  const visibleServices =
    filter === 'Alle' ? SERVICES : SERVICES.filter((item) => item.category === filter);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-12">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF] dark:border-[#242A35]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[#3F618E] dark:text-[#7EB0F2] mb-2">
              HG KLUSJES · DIENSTEN
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] dark:text-white text-balance">
              Montage, herstellingen en onderhoud aan huis.
            </h1>
          </div>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Home');
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white/80 dark:bg-[#151A24] hover:bg-[#0B0D11] hover:text-white hover:border-[#0B0D11] dark:hover:bg-white dark:hover:text-[#0B0D11] dark:hover:border-white text-xs font-semibold text-[#0B0D11] dark:text-white transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Terug naar Home
          </button>
        </div>
      </FadeIn>

      {/* Interactive Filter Tabs */}
      <FadeIn delay={0.04}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter diensten"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full border border-[#9DA4B0] dark:border-[#343C4A] bg-[#E7EAEE]/80 dark:bg-[#131720]"
          >
            {CATEGORIES.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.toggle(true);
                    setFilter(category);
                  }}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-[#0B0D11]'
                      : 'text-[#2C313A] dark:text-[#B8C1D0] hover:text-[#0B0D11] dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-filter-pill"
                      transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                      className="absolute inset-0 rounded-full bg-white shadow-xs -z-10"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#4B525E] dark:text-[#9AA5B8] tabular-nums">
            {visibleServices.length} diensten beschikbaar aan huis
          </p>
        </div>
      </FadeIn>

      {/* 3D Interactive Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleServices.map((service, idx) => (
          <FadeIn key={service.id} delay={idx * 0.05} className="h-full">
            <TiltServiceCard service={service} onRequestJob={onRequestJob} />
          </FadeIn>
        ))}
      </div>

      {/* Veelgestelde vragen (FAQ) */}
      <FaqSection onRequestJob={onRequestJob} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Visie (Vision) Page                                              */
/* -------------------------------------------------------------------------- */
export const VisionPage: React.FC<SharedPageProps> = ({ onNavigate, onRequestJob }) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-14">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF] dark:border-[#242A35]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[#3F618E] dark:text-[#7EB0F2] mb-2">
              HG KLUSJES · ONZE VISIE
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] dark:text-white text-balance">
              Zorgeloos wonen begint bij goed onderhoud.
            </h1>
          </div>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Home');
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white/80 dark:bg-[#151A24] hover:bg-[#0B0D11] hover:text-white hover:border-[#0B0D11] dark:hover:bg-white dark:hover:text-[#0B0D11] dark:hover:border-white text-xs font-semibold text-[#0B0D11] dark:text-white transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Terug naar Home
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="rounded-2xl bg-[#0E1117] dark:bg-[#121722] border border-[#1E2533] dark:border-[#273144] text-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <p className="font-cyber text-[10px] tracking-[0.08em] text-[#7EB0F2] mb-3">
                  DUURZAAM VAKMANSCHAP
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] leading-[1.14] max-w-xl mb-4 text-balance">
                  Elk detail in huis verdient een nette, duurzame afwerking zonder onnodige vervanging.
                </h2>
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#C2CAD6] max-w-xl mb-8">
                  Onze visie rust op drie heldere pijlers: materiaal een tweede leven geven door tijdige
                  herstellingen, directe communicatie zonder vakjargon en respect voor elke woning
                  waar we te gast zijn.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <RippleButton
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.open();
                    onRequestJob('Advies of klus op maat');
                  }}
                  rippleClassName="bg-[#0B0D11]/20"
                  className="group px-5 py-2.5 rounded-full bg-white text-[#0B0D11] text-xs font-semibold hover:bg-[#7EB0F2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  Vraag je klus aan
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </RippleButton>
                <a
                  href="tel:+3200000000"
                  onPointerEnter={uiSounds.hover}
                  onClick={uiSounds.click}
                  className="px-5 py-2.5 rounded-full border border-white/25 text-white text-xs font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Bel ons
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-[#18202E]">
              <img
                src={interiorLightingImg}
                alt="Minimalistische woning met strak gemonteerde verlichting en maatwerkplanken"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VISION_PILLARS.map((pillar, idx) => (
          <FadeIn key={pillar.index} delay={idx * 0.07}>
            <div className="h-full pt-5 border-t border-[#C8CFD9] dark:border-[#283040]">
              <span className="font-cyber text-[10px] tracking-[0.06em] text-[#3F618E] dark:text-[#7EB0F2] tabular-nums block mb-2.5">
                {pillar.index}
              </span>
              <h3 className="text-lg font-semibold text-[#0B0D11] dark:text-white mb-1">
                {pillar.title}
              </h3>
              <p className="text-xs font-medium text-[#5A6373] dark:text-[#9AA5B8] mb-3">
                {pillar.subtitle}
              </p>
              <p className="text-sm leading-relaxed text-[#2C313A] dark:text-[#C5CCD8]">
                {pillar.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Quiet Editorial Footer                                                     */
/* -------------------------------------------------------------------------- */
export const SiteFooter: React.FC<SharedPageProps> = ({ onNavigate, onRequestJob }) => {
  const navItems: NavTab[] = ['Home', 'Over', 'Diensten', 'Visie'];

  return (
    <footer className="relative z-20 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-t border-[#CFD5DF] dark:border-[#242A35] mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-cyber text-xs tracking-[0.06em] text-[#0B0D11] dark:text-white">
            HG KLUSJES
          </span>
          <p className="text-xs text-[#4B525E] dark:text-[#9AA5B8] mt-1">
            Klusjesman aan huis · Montage, herstellingen en onderhoud.
          </p>
        </div>

        <nav aria-label="Footernavigatie" className="flex flex-wrap items-center gap-6">
          {navItems.map((tab) => (
            <button
              key={tab}
              type="button"
              onPointerEnter={uiSounds.hover}
              onClick={() => {
                uiSounds.nav();
                onNavigate(tab);
              }}
              className="text-xs font-medium text-[#2C313A] dark:text-[#C5CCD8] hover:text-[#0B0D11] dark:hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <RippleButton
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.open();
              onRequestJob();
            }}
            className="px-4 py-2 rounded-full bg-[#0B0D11] dark:bg-white hover:bg-[#3F618E] dark:hover:bg-[#7EB0F2] text-white dark:text-[#0B0D11] text-xs font-semibold transition-colors duration-200 cursor-pointer"
          >
            Vraag je klus aan
          </RippleButton>
          <a
            href="tel:+3200000000"
            onPointerEnter={uiSounds.hover}
            onClick={uiSounds.click}
            className="px-4 py-2 rounded-full border border-[#9DA4B0] dark:border-[#3A4354] bg-white/85 dark:bg-[#151A24] hover:bg-white dark:hover:bg-[#1E2533] text-[#0B0D11] dark:text-white text-xs font-semibold transition-colors duration-200"
          >
            Bel ons
          </a>
        </div>
      </div>
    </footer>
  );
};
