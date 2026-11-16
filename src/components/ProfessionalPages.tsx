import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  REALIZATIONS,
  ServiceCategory,
} from '../data/siteContent';
import { FadeIn } from './MotionPrimitives';
import { NavTab } from './TopNav';
import { RippleButton } from './RippleButton';
import { FloatingInputField, FloatingTextareaField } from './ActionDrawers';
import { uiSounds } from '../utils/uiSounds';
import joineryCraftImg from '../assets/images/craft_precision_joinery_1794539710281.jpg';
import interiorLightingImg from '../assets/images/craft_interior_lighting_1794539711794.jpg';
import toolsFlatlayImg from '../assets/images/craft_tools_flatlay_1794539712529.jpg';

interface SharedPageProps {
  onNavigate: (tab: NavTab) => void;
  onRequestJob: (topic?: string) => void;
}

const VISUAL_ASSETS = {
  joinery: joineryCraftImg,
  lighting: interiorLightingImg,
  tools: toolsFlatlayImg,
} as const;

/* -------------------------------------------------------------------------- */
/* Dedicated Realisaties (Portfolio / Case Studies) Page                      */
/* -------------------------------------------------------------------------- */
export const RealizationsPage: React.FC<SharedPageProps> = ({
  onNavigate,
  onRequestJob,
}) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-12">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
              GH KLUSWERKEN · REALISATIES
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] text-balance">
              Van voorbereiding tot schilderklare oplevering.
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

      <div className="space-y-8">
        {REALIZATIONS.map((item, idx) => (
          <FadeIn key={item.id} delay={idx * 0.07} y={20}>
            <article
              data-cursor="card"
              className="rounded-2xl bg-white/90 border border-[#D4DAE4] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-[0_8px_28px_rgba(11,13,17,0.04)]"
            >
              <div className="lg:col-span-5 relative min-h-[260px] bg-[#D8DEE7]">
                <img
                  src={VISUAL_ASSETS[item.visualKey]}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                  <span className="font-cyber text-[10px] tracking-[0.08em] text-[#9BC2FF]">
                    {item.index} {item.category.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--brand-accent)] mb-1.5">
                    {item.scope}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#0B0D11] mb-4">
                    {item.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 pt-4 border-t border-[#E6EAF0]">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5A6373] mb-1">
                        Situatie vooraf
                      </p>
                      <p className="text-xs sm:text-[13px] leading-relaxed text-[#2C313A]">
                        {item.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--brand-accent)] mb-1">
                        Aanpak GH Kluswerken
                      </p>
                      <p className="text-xs sm:text-[13px] leading-relaxed text-[#2C313A]">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-6">
                    {item.deliverables.map((del) => (
                      <li key={del} className="flex items-start gap-2 text-xs text-[#2C313A]">
                        <Check className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E6EAF0]">
                  <RippleButton
                    type="button"
                    onPointerEnter={uiSounds.hover}
                    onClick={() => {
                      uiSounds.open();
                      onRequestJob(item.title);
                    }}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold transition-all duration-200 cursor-pointer"
                  >
                    Vergelijkbare offerte aanvragen
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </RippleButton>
                  <button
                    type="button"
                    onPointerEnter={uiSounds.hover}
                    onClick={() => {
                      uiSounds.nav();
                      onNavigate('Diensten');
                    }}
                    className="text-xs font-semibold text-[#0B0D11] hover:text-[var(--brand-accent)] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Alle diensten bekijken
                  </button>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Contact & Offerte Page                                           */
/* -------------------------------------------------------------------------- */
const SERVICE_CHOICES: Exclude<ServiceCategory, 'Alle'>[] = [
  'Bezettingswerken',
  'Tegelwerken',
  'Opstijgend vocht',
];

export const ContactPage: React.FC<{ onNavigate: (tab: NavTab) => void }> = ({
  onNavigate,
}) => {
  const [selectedService, setSelectedService] = useState<string>('Bezettingswerken');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      uiSounds.click();
      setError('Vul je naam of bedrijfsnaam in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      uiSounds.click();
      setError('Vul een geldig e-mailadres in.');
      return;
    }
    if (!details.trim()) {
      uiSounds.click();
      setError('Geef een korte omschrijving van de gewenste werken of geschatte oppervlakte.');
      return;
    }
    setError('');
    uiSounds.success();
    setSubmitted(true);
  };

  const mailtoSubject = encodeURIComponent(
    `Offerte-aanvraag (${selectedService}) — ${name}`
  );
  const mailtoBody = encodeURIComponent(
    `Discipline: ${selectedService}\nNaam: ${name}\nE-mail: ${email}\nTelefoon: ${
      phone || 'Niet opgegeven'
    }\nGemeente / Werfadres: ${location || 'Niet opgegeven'}\n\nOmschrijving werken:\n${details}`
  );

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-12">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
              GH KLUSWERKEN · CONTACT &amp; OFFERTE
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#0B0D11] text-balance">
              Vraag een vrijblijvend plaatsbezoek of offerte aan.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Direct Business Details & Hours */}
        <FadeIn className="lg:col-span-5 space-y-6" delay={0.04}>
          <div className="rounded-2xl bg-[var(--vision-surface)] border border-[var(--vision-border)] p-7 sm:p-8 text-white shadow-[0_18px_42px_rgba(7,25,60,0.16)]">
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[#9BC2FF] mb-2">
              RECHTSTREEKS CONTACT
            </p>
            <h2 className="text-xl font-bold mb-2">GH Kluswerken</h2>
            <p className="text-xs text-[#DCE7FA] mb-6">{BUSINESS_INFO.tagline}</p>

            <div className="space-y-4 border-t border-white/15 pt-5 text-sm">
              <a
                href={BUSINESS_INFO.phoneHref}
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="flex items-center gap-3 text-white hover:text-[#9BC2FF] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[11px] text-[#B7CEF5]">Telefoon</span>
                  <span className="font-semibold">{BUSINESS_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.emailHref}
                onPointerEnter={uiSounds.hover}
                onClick={uiSounds.click}
                className="flex items-center gap-3 text-white hover:text-[#9BC2FF] transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[11px] text-[#B7CEF5]">E-mail</span>
                  <span className="font-semibold">{BUSINESS_INFO.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-white">
                <span className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[11px] text-[#B7CEF5]">Website</span>
                  <span className="font-semibold">{BUSINESS_INFO.websiteDisplay}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white">
                <span className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[11px] text-[#B7CEF5]">Werkgebied</span>
                  <span className="font-semibold">{BUSINESS_INFO.region}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/90 border border-[#D4DAE4] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B0D11]">
              <Clock className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>Bereikbaarheid &amp; Openingsuren</span>
            </div>
            <dl className="space-y-2 text-xs">
              {BUSINESS_INFO.hours.map((row) => (
                <div
                  key={row.days}
                  className="flex items-center justify-between py-1.5 border-b border-[#E6EAF0] last:border-b-0"
                >
                  <dt className="text-[#454D5B]">{row.days}</dt>
                  <dd className="font-semibold text-[#0B0D11] tabular-nums">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>

        {/* Right: Complete Offerte Request Form */}
        <FadeIn className="lg:col-span-7" delay={0.08}>
          <div className="rounded-2xl bg-white/95 border border-[#D4DAE4] p-7 sm:p-9 shadow-[0_12px_36px_rgba(11,13,17,0.05)]">
            {submitted ? (
              <div className="py-10 text-center max-w-md mx-auto">
                <CheckCircle2
                  className="w-12 h-12 text-[var(--brand-accent)] mx-auto mb-4"
                  strokeWidth={1.6}
                />
                <h2 className="text-xl font-bold text-[#0B0D11] mb-2">
                  Offerte-aanvraag klaar voor verzending
                </h2>
                <p className="text-sm text-[#454C57] leading-relaxed mb-6">
                  Bedankt {name}. Klik hieronder om je aanvraag voor{' '}
                  <strong>{selectedService}</strong> rechtstreeks via jouw e-mailprogramma te
                  versturen, of bel meteen voor een snelle afspraak.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    onPointerEnter={uiSounds.hover}
                    onClick={uiSounds.click}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Verstuur aanvraag naar {BUSINESS_INFO.email}
                  </a>
                  <button
                    type="button"
                    onPointerEnter={uiSounds.hover}
                    onClick={() => {
                      setSubmitted(false);
                      setDetails('');
                    }}
                    className="px-5 py-3 rounded-full border border-[#CFD6E0] text-xs font-semibold text-[#0B0D11] hover:border-[var(--brand-accent)] cursor-pointer"
                  >
                    Nieuwe aanvraag opstellen
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <p className="text-xs font-semibold text-[#0B0D11] mb-2.5">
                    Selecteer uw discipline
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...SERVICE_CHOICES, 'Combinatie / Totaalafwerking'].map((item) => {
                      const active = selectedService === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onPointerEnter={uiSounds.hover}
                          onClick={() => {
                            uiSounds.toggle(true);
                            setSelectedService(item);
                          }}
                          className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                            active
                              ? 'bg-[var(--brand-accent)] border-[var(--brand-accent)] text-white'
                              : 'bg-[#F4F6F9] border-[#CFD6E0] text-[#2C313A] hover:border-[var(--brand-accent)]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInputField
                    id="page-contact-name"
                    label="Volledige naam"
                    type="text"
                    value={name}
                    onChange={setName}
                  />
                  <FloatingInputField
                    id="page-contact-email"
                    label="E-mailadres"
                    type="email"
                    value={email}
                    onChange={setEmail}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInputField
                    id="page-contact-phone"
                    label="Telefoonnummer"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                  />
                  <FloatingInputField
                    id="page-contact-location"
                    label="Gemeente / Regio"
                    type="text"
                    value={location}
                    onChange={setLocation}
                  />
                </div>

                <FloatingTextareaField
                  id="page-contact-details"
                  label="Omschrijving werken (bv. m² muren/tegels, verdieping, vochtsymptomen)"
                  value={details}
                  onChange={setDetails}
                  rows={4}
                />

                {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] text-[#5A6373] inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                    Vrijblijvende opmeting &amp; offerte zonder verplichting.
                  </p>

                  <RippleButton
                    type="submit"
                    onPointerEnter={uiSounds.hover}
                    className="group px-6 py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    Offerte voorbereiden
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </RippleButton>
                </div>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Juridische Pagina's (Privacybeleid & Algemene Voorwaarden)       */
/* -------------------------------------------------------------------------- */
export const LegalPage: React.FC<{
  mode: 'Privacy' | 'Voorwaarden';
  onNavigate: (tab: NavTab) => void;
}> = ({ mode, onNavigate }) => {
  const isPrivacy = mode === 'Privacy';

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-24 pb-16 space-y-10">
      <FadeIn y={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#CFD5DF]">
          <div>
            <p className="font-cyber text-[10px] tracking-[0.08em] text-[var(--brand-accent)] mb-2">
              GH KLUSWERKEN · JURIDISCH
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#0B0D11]">
              {isPrivacy ? 'Privacybeleid (GDPR)' : 'Algemene Voorwaarden'}
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
        <div className="rounded-2xl bg-white/95 border border-[#D4DAE4] p-7 sm:p-10 space-y-6 text-sm leading-relaxed text-[#2C313A]">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#0B0D11]">1. Verantwoordelijke voor verwerking</h2>
                <p>
                  {BUSINESS_INFO.name} ({BUSINESS_INFO.websiteDisplay}) verwerkt persoonsgegevens
                  uitsluitend conform de Europese Algemene Verordening Gegevensbescherming (AVG / GDPR).
                  Contact: {BUSINESS_INFO.email} of {BUSINESS_INFO.phoneDisplay}.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#0B0D11]">2. Doel van gegevensverwerking</h2>
                <p>
                  Gegevens die u invult bij een offerte-aanvraag (naam, e-mailadres, telefoonnummer,
                  werfadres en omschrijving van de werken) worden uitsluitend gebruikt om een
                  plaatsbezoek te plannen, een offerte op te maken en uitgevoerde werken correct op te
                  volgen.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#0B0D11]">3. Bewaartermijn &amp; rechten</h2>
                <p>
                  Uw gegevens worden niet langer bewaard dan noodzakelijk voor klantenbeheer en
                  wettelijke boekhoudkundige verplichtingen, en worden nooit doorverkocht aan derden. U
                  heeft steeds recht op inzage, correctie of verwijdering via {BUSINESS_INFO.email}.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#0B0D11]">1. Offertes &amp; Plaatsbezoek</h2>
                <p>
                  Elke offerte van {BUSINESS_INFO.name} is vrijblijvend en gebaseerd op een voorafgaande
                  opmeting of technische controle van de ondergrond (inclusief vochtmeting indien van
                  toepassing). Eventuele bijkomende werken worden steeds vooraf met de opdrachtgever
                  besproken.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#0B0D11]">2. Uitvoering &amp; Droogtijden</h2>
                <p>
                  Bij behandeling tegen opstijgend vocht, bezettingswerken en tegelwerken worden
                  technische normen en noodzakelijke droogtijden strikt gerespecteerd om een duurzaam
                  eindresultaat te garanderen.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-base font-bold text-[#0B0D11]">3. Oplevering &amp; Contact</h2>
                <p>
                  Opmerkingen over uitgevoerde werken dienen zo snel mogelijk gemeld te worden via{' '}
                  {BUSINESS_INFO.email} of telefonisch op {BUSINESS_INFO.phoneDisplay}, zodat wij een
                  snelle en correcte oplossing kunnen voorzien.
                </p>
              </section>
            </>
          )}
        </div>
      </FadeIn>
    </div>
  );
};
