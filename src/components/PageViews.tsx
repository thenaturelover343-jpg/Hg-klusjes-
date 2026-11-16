import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ABOUT_VALUES,
  AEO_DIRECT_ANSWERS,
  BUSINESS_INFO,
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
/* Below-the-fold architectural showcase for Home (with AEO Summary Block)    */
/* -------------------------------------------------------------------------- */
export const HomeDetailsSections: React.FC<SharedPageProps> = ({
  onNavigate,
  onRequestJob,
}) => {
  return (
    <div className="relative z-20 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-14 space-y-24 sm:space-y-32">
      {/* 01 · Over GH Kluswerken — 2-Column Editorial Split */}
      <section
        aria-labelledby="home-about-heading"
        className="border-t border-[#C9D0DB] pt-12 sm:pt-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <FadeIn y={16}>
                <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-3">
                  01 · RENOVATIE &amp; AFWERKING
                </p>
                <h2
                  id="home-about-heading"
                  className="text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-[-0.03em] leading-[1.08] text-[#0B0D11] mb-5 text-balance"
                >
                  Uw partner voor bezetting, tegelwerk en droge muren.
                </h2>
              </FadeIn>

              <FadeIn y={16} delay={0.06}>
                <p className="text-sm sm:text-[15.5px] leading-[1.68] text-[#2C313A] mb-8 max-w-xl">
                  GH Kluswerken combineert drie essentiële bouwfases onder één dak: van het definitief
                  behandelen van opstijgend vocht tot spiegelgladde bezettingswerken en strak geplaatst
                  tegelwerk. Eén aanspreekpunt, heldere afspraken en zorgvuldige afwerking.
                </p>
              </FadeIn>

              {/* Hairline Specification Strip — individual scroll reveals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {ABOUT_VALUES.map((item, idx) => (
                  <FadeIn key={item.index} delay={idx * 0.07} y={18}>
                    <div className="pt-3.5 border-t border-[#CFD5DF]">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="font-cyber text-[9.5px] tracking-[0.06em] text-[var(--brand-accent)] tabular-nums">
                          {item.index}
                        </span>
                        <h3 className="text-[14px] font-semibold text-[#0B0D11]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[12.5px] leading-relaxed text-[#454D5B]">
                        {item.detail}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn y={14} delay={0.12}>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.nav();
                    onNavigate('Over');
                  }}
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#9DA4B0] bg-white/85 hover:bg-[var(--brand-accent)] hover:text-white hover:border-[var(--brand-accent)] text-xs font-semibold text-[#0B0D11] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Meer over GH Kluswerken
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.nav();
                    onNavigate('Realisaties');
                  }}
                  className="text-xs font-semibold text-[var(--brand-accent)] hover:underline underline-offset-4 cursor-pointer px-2 py-2"
                >
                  Bekijk realisaties
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn className="lg:col-span-6" delay={0.1} y={22}>
            <div
              data-cursor="card"
              className="relative h-full min-h-[340px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#D8DEE7] border border-[#CFD5DF]"
            >
              <img
                src={joineryCraftImg}
                alt="Vakman levert strakke binnenafwerking en millimeterprecisie"
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
                    Strak uitgelijnde hoeken, egale muren en duurzame bescherming tegen vocht.
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
        className="border-t border-[#C9D0DB] pt-12 sm:pt-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <FadeIn y={16}>
            <div>
              <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2.5">
                02 · SPECIALISATIES
              </p>
              <h2
                id="home-services-heading"
                className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.025em] text-[#0B0D11] text-balance"
              >
                Bezettingswerken, tegelwerken &amp; opstijgend vocht.
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
              className="group self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
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
              className="relative h-full min-h-[300px] rounded-2xl overflow-hidden bg-[#D8DEE7] border border-[#CFD5DF]"
            >
              <img
                src={toolsFlatlayImg}
                alt="Professioneel gereedschap voor bezettingswerken, tegelwerk en vochtbestrijding"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <p className="font-cyber text-[9.5px] tracking-[0.08em] text-white/75 mb-1">
                  VAKMANSCHAP &amp; MATERIAAL
                </p>
                <p className="text-base sm:text-lg font-semibold leading-snug">
                  Van voorbereiding en vochtinjectie tot spiegelgladde oplevering.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.slice(0, 4).map((service, idx) => (
              <FadeIn key={service.id} delay={idx * 0.07} y={20} className="h-full">
                <article
                  data-cursor="card"
                  className="group h-full p-6 rounded-2xl bg-white/95 border border-[#D4DAE4] hover:bg-white hover:border-[var(--brand-accent)]/45 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(11,13,17,0.06)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <span className="text-[11px] font-medium text-[var(--brand-accent)] tabular-nums">
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
                        className="w-8 h-8 rounded-full border border-[#D4DAE4] group-hover:border-[var(--brand-accent)] group-hover:bg-[var(--brand-accent)] group-hover:text-white flex items-center justify-center text-[#0B0D11] transition-all duration-200 cursor-pointer"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>

                    <h3 className="text-[16px] font-semibold text-[#0B0D11] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[13px] text-[#3E4552] leading-relaxed mb-4">
                      {service.summary}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-3.5 border-t border-[#E6EAF0]">
                    {service.tasks.slice(0, 2).map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-2 text-[12px] text-[#2C313A]"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
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

      {/* 03 · Logo-Cobalt Architectural Vision & 3-Step Workflow */}
      <section aria-labelledby="home-vision-heading">
        <div className="rounded-2xl bg-[var(--vision-surface)] border border-[var(--vision-border)] text-white overflow-hidden shadow-[0_20px_50px_rgba(7,25,60,0.18)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <FadeIn y={16}>
                  <p className="font-cyber text-[10px] tracking-[0.08em] text-[#9BC2FF] mb-3">
                    03 · VISIE &amp; WERKWIJZE
                  </p>
                  <h2
                    id="home-vision-heading"
                    className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-[-0.025em] leading-[1.12] text-white mb-4 text-balance"
                  >
                    Duurzame renovatie begint bij een droge, strakke basis.
                  </h2>
                </FadeIn>
                <FadeIn y={16} delay={0.06}>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#DCE7FA] mb-8 max-w-lg">
                    Van vochtige binnenmuren opnieuw gezond maken tot strakke bezetting en tegels:
                    GH Kluswerken begeleidt elke stap met oog voor detail en blijvende kwaliteit.
                  </p>
                </FadeIn>
              </div>

              {/* Hairline 3-Step Process Strip */}
              <div className="space-y-4 border-t border-white/15 pt-6 mb-8">
                {PROCESS_STEPS.map((step, idx) => (
                  <FadeIn key={step.step} delay={idx * 0.08} y={16}>
                    <div className="grid grid-cols-12 gap-3 pb-4 border-b border-white/12 last:border-b-0 last:pb-0">
                      <span className="col-span-2 sm:col-span-1 font-cyber text-[10px] text-[#9BC2FF] tabular-nums pt-0.5">
                        {step.step}
                      </span>
                      <div className="col-span-10 sm:col-span-11">
                        <h3 className="text-sm font-semibold text-white mb-0.5">{step.title}</h3>
                        <p className="text-xs leading-relaxed text-[#C9D7F0]">{step.description}</p>
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
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#072B66] text-xs font-semibold hover:bg-[#DCE8FF] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
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
                    className="px-5 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/12 transition-all duration-200 cursor-pointer"
                  >
                    Offerte aanvragen
                  </RippleButton>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-[#09214D]" delay={0.1} y={20}>
              <img
                src={interiorLightingImg}
                alt="Strak afgewerkte binnenwanden en minimalistisch interieur door GH Kluswerken"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#082E6E]/45 via-transparent to-transparent lg:block hidden"
                aria-hidden="true"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 04 · AEO Direct-Answer Strip — Structured Answers for Visitors & Search/AI Engines */}
      <section
        id="aeo-summary"
        aria-labelledby="aeo-summary-heading"
        className="border-t border-[#C9D0DB] pt-12 sm:pt-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <FadeIn y={16}>
            <div>
              <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
                04 · KORT OVERZICHT
              </p>
              <h2
                id="aeo-summary-heading"
                className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#0B0D11] text-balance"
              >
                Veelgevraagde kerninformatie in één oogopslag.
              </h2>
            </div>
          </FadeIn>
          <FadeIn y={14} delay={0.06}>
            <button
              type="button"
              onPointerEnter={uiSounds.hover}
              onClick={() => {
                uiSounds.nav();
                onNavigate('Contact');
              }}
              className="text-xs font-semibold text-[var(--brand-accent)] hover:underline underline-offset-4 cursor-pointer"
            >
              Direct contact &amp; plaatsbezoek plannen →
            </button>
          </FadeIn>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AEO_DIRECT_ANSWERS.map((qa, idx) => (
            <FadeIn key={qa.term} delay={idx * 0.06} y={16}>
              <div className="h-full p-6 rounded-2xl bg-white/90 border border-[#D4DAE4]">
                <dt className="text-[15px] font-bold text-[#0B0D11] mb-2">{qa.term}</dt>
                <dd className="text-xs sm:text-[13px] leading-relaxed text-[#3E4552]">
                  {qa.definition}
                </dd>
              </div>
            </FadeIn>
          ))}
        </dl>
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
              GH KLUSWERKEN · OVER ONS
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] text-balance">
              Uw partner voor renovatie &amp; afwerking.
            </h1>
          </div>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Home');
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] bg-white/85 hover:bg-[var(--brand-accent)] hover:text-white hover:border-[var(--brand-accent)] text-xs font-semibold text-[#0B0D11] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Terug naar Home
          </button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <FadeIn className="lg:col-span-7" delay={0.05}>
          <div className="h-full p-7 sm:p-10 rounded-2xl bg-white/95 border border-[#D4DAE4] flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-[-0.02em] text-[#0B0D11] mb-5 text-balance">
                Specialisatie in bezettingswerken, tegelwerken en opstijgend vocht.
              </h2>
              <p className="text-sm sm:text-[15.5px] leading-[1.7] text-[#2C313A] mb-4">
                Bij GH Kluswerken geloven we dat degelijk renovatiewerk staat of valt met de basis.
                Daarom combineren we doelgerichte vochtbestrijding met strak pleisterwerk en duurzaam
                tegelwerk, uitgevoerd door één betrokken vakman.
              </p>
              <p className="text-sm sm:text-[15.5px] leading-[1.7] text-[#2C313A] mb-8">
                Of het nu gaat om het injecteren van vochtige muren, het schilderklaar bezetten van
                een volledige woning of het precies plaatsen van badkamer- en vloertegels — wij staan
                garant voor propere oplevering en persoonlijke opvolging.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#E6EAF0]">
              <RippleButton
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.open();
                  onRequestJob('Kennismaking / Offerte aanvraag');
                }}
                className="group px-5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 cursor-pointer"
              >
                Offerte aanvragen
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </RippleButton>
              <a
                href={BUSINESS_INFO.phoneHref}
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="px-5 py-2.5 rounded-full border border-[#9DA4B0] bg-white hover:border-[var(--brand-accent)] text-[#0B0D11] text-xs font-semibold inline-flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-5" delay={0.1}>
          <div className="relative h-full min-h-[320px] rounded-2xl overflow-hidden bg-[#D8DEE7] border border-[#D4DAE4]">
            <img
              src={joineryCraftImg}
              alt="Precisie renovatie en afwerking door GH Kluswerken"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-cyber text-[9.5px] tracking-[0.08em] text-[#9BC2FF] mb-1.5">
                GH KLUSWERKEN
              </p>
              <p className="text-base font-semibold leading-snug mb-3">
                Bezettingswerken, tegelwerken en opstijgend vocht in één planning.
              </p>
              <button
                type="button"
                onPointerEnter={uiSounds.hover}
                onClick={() => {
                  uiSounds.nav();
                  onNavigate('Realisaties');
                }}
                className="group inline-flex items-center gap-2 text-xs font-semibold text-white hover:underline cursor-pointer"
              >
                Bekijk onze realisaties
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
            <div className="pt-4 border-t border-[#C8CFD9]">
              <span className="font-cyber text-[10px] tracking-[0.06em] text-[var(--brand-accent)] tabular-nums block mb-2">
                {val.index}
              </span>
              <h3 className="text-[15px] font-semibold text-[#0B0D11] mb-1.5">
                {val.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#3E4552]">{val.detail}</p>
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
const CATEGORIES: ServiceCategory[] = [
  'Alle',
  'Bezettingswerken',
  'Tegelwerken',
  'Opstijgend vocht',
];

export const ServicesPage: React.FC<SharedPageProps> = ({ onNavigate, onRequestJob }) => {
  const [filter, setFilter] = useState<ServiceCategory>('Alle');

  const visibleServices =
    filter === 'Alle' ? SERVICES : SERVICES.filter((item) => item.category === filter);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-12">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
              GH KLUSWERKEN · DIENSTEN
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] text-balance">
              Bezettingswerken, tegelwerken &amp; opstijgend vocht.
            </h1>
          </div>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Home');
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] bg-white/85 hover:bg-[var(--brand-accent)] hover:text-white hover:border-[var(--brand-accent)] text-xs font-semibold text-[#0B0D11] transition-all duration-200 cursor-pointer"
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
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full border border-[#9DA4B0] bg-[#E7EAEE]/80"
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
                    active ? 'text-white' : 'text-[#2C313A] hover:text-[#0B0D11]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-filter-pill"
                      transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                      className="absolute inset-0 rounded-full bg-[var(--brand-accent)] shadow-xs -z-10"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#4B525E] tabular-nums">
            {visibleServices.length} specialisaties weergegeven
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

      {/* Veelgestelde vragen (FAQ / AEO) */}
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
              GH KLUSWERKEN · ONZE VISIE
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] text-balance">
              Duurzame renovatie begint bij de ondergrond.
            </h1>
          </div>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Home');
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9DA4B0] bg-white/85 hover:bg-[var(--brand-accent)] hover:text-white hover:border-[var(--brand-accent)] text-xs font-semibold text-[#0B0D11] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Terug naar Home
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="rounded-2xl bg-[var(--vision-surface)] border border-[var(--vision-border)] text-white overflow-hidden shadow-[0_20px_50px_rgba(7,25,60,0.18)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <p className="font-cyber text-[10px] tracking-[0.08em] text-[#9BC2FF] mb-3">
                  DUURZAAM VAKMANSCHAP
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] leading-[1.14] max-w-xl mb-4 text-balance">
                  Eerst een droge, gezonde muur — daarna een strakke afwerking die jaren meegaat.
                </h2>
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#DCE7FA] max-w-xl mb-8">
                  Onze visie steunt op drie heldere pijlers: vochtproblemen bij de bron aanpakken,
                  schilderklare bezetting en tegelwerk tot op de millimeter, en directe service als
                  uw partner voor renovatie &amp; afwerking.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <RippleButton
                  type="button"
                  onPointerEnter={uiSounds.hover}
                  onClick={() => {
                    uiSounds.open();
                    onRequestJob('Plaatsbezoek / Advies renovatie');
                  }}
                  rippleClassName="bg-[#0B0D11]/20"
                  className="group px-5 py-2.5 rounded-full bg-white text-[#072B66] text-xs font-semibold hover:bg-[#DCE8FF] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  Offerte aanvragen
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </RippleButton>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  onPointerEnter={uiSounds.hover}
                  onClick={uiSounds.click}
                  className="px-5 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/12 transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-[#09214D]">
              <img
                src={interiorLightingImg}
                alt="Minimalistische woning met strak bezette wanden en verlichting"
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
            <div className="h-full pt-5 border-t border-[#C8CFD9]">
              <span className="font-cyber text-[10px] tracking-[0.06em] text-[var(--brand-accent)] tabular-nums block mb-2.5">
                {pillar.index}
              </span>
              <h3 className="text-lg font-semibold text-[#0B0D11] mb-1">
                {pillar.title}
              </h3>
              <p className="text-xs font-medium text-[#5A6373] mb-3">
                {pillar.subtitle}
              </p>
              <p className="text-sm leading-relaxed text-[#2C313A]">
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
/* Quiet Editorial Footer with All Pages & Legal Links                        */
/* -------------------------------------------------------------------------- */
export const SiteFooter: React.FC<SharedPageProps> = ({ onNavigate, onRequestJob }) => {
  const navItems: NavTab[] = ['Home', 'Diensten', 'Realisaties', 'Over', 'Visie', 'Contact'];

  return (
    <footer className="relative z-20 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 border-t border-[#CFD5DF] mt-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <span className="font-cyber text-xs tracking-[0.06em] text-[var(--brand-accent)]">
            GH KLUSWERKEN
          </span>
          <p className="text-xs text-[#4B525E] mt-1">
            {BUSINESS_INFO.tagline} · Bezettingswerken, tegelwerken &amp; opstijgend vocht.
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#2C313A]">
            <a
              href={BUSINESS_INFO.phoneHref}
              onPointerEnter={uiSounds.hover}
              onClick={uiSounds.click}
              className="inline-flex items-center gap-1.5 hover:text-[var(--brand-accent)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              {BUSINESS_INFO.phoneDisplay}
            </a>
            <a
              href={BUSINESS_INFO.emailHref}
              onPointerEnter={uiSounds.hover}
              onClick={uiSounds.click}
              className="inline-flex items-center gap-1.5 hover:text-[var(--brand-accent)] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              {BUSINESS_INFO.email}
            </a>
            <span className="text-[#5A6373]">{BUSINESS_INFO.websiteDisplay}</span>
          </div>
        </div>

        <nav aria-label="Footernavigatie" className="flex flex-wrap items-center gap-5">
          {navItems.map((tab) => (
            <button
              key={tab}
              type="button"
              onPointerEnter={uiSounds.hover}
              onClick={() => {
                uiSounds.nav();
                onNavigate(tab);
              }}
              className="text-xs font-medium text-[#2C313A] hover:text-[var(--brand-accent)] hover:underline underline-offset-4 transition-colors cursor-pointer"
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
            className="px-4 py-2 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold transition-colors duration-200 cursor-pointer"
          >
            Offerte aanvragen
          </RippleButton>
          <a
            href={BUSINESS_INFO.phoneHref}
            onPointerEnter={uiSounds.hover}
            onClick={uiSounds.click}
            className="px-4 py-2 rounded-full border border-[#9DA4B0] bg-white/85 hover:border-[var(--brand-accent)] text-[#0B0D11] text-xs font-semibold transition-colors duration-200"
          >
            {BUSINESS_INFO.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Bottom Legal & Region Sub-row */}
      <div className="mt-7 pt-5 border-t border-[#DDE2EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#5A6373]">
        <p>
          © {new Date().getFullYear()} {BUSINESS_INFO.name} · {BUSINESS_INFO.region}
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Privacy');
            }}
            className="hover:text-[var(--brand-accent)] hover:underline underline-offset-4 cursor-pointer"
          >
            Privacybeleid
          </button>
          <button
            type="button"
            onPointerEnter={uiSounds.hover}
            onClick={() => {
              uiSounds.nav();
              onNavigate('Voorwaarden');
            }}
            className="hover:text-[var(--brand-accent)] hover:underline underline-offset-4 cursor-pointer"
          >
            Algemene voorwaarden
          </button>
        </div>
      </div>
    </footer>
  );
};
