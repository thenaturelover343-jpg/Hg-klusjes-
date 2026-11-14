export type ServiceCategory = 'Alle' | 'Montage' | 'Herstellingen' | 'Onderhoud';

export interface ServiceItem {
  id: string;
  index: string;
  category: Exclude<ServiceCategory, 'Alle'>;
  title: string;
  summary: string;
  tasks: string[];
  featured?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'montage-interieur',
    index: '01.',
    category: 'Montage',
    title: 'Meubels & Interieurmontage',
    summary:
      'Stevig, waterpas en netjes afgesteld plaatsen van kasten, rekken, bureaus en wandpanelen in elke ruimte.',
    tasks: [
      'Kasten, ladekasten en dressings monteren',
      'Wandrekken, spiegels en tv-beugels ophangen',
      'Gordijnrails, rolgordijnen en plinten plaatsen',
    ],
    featured: true,
  },
  {
    id: 'herstellingen-woning',
    index: '02.',
    category: 'Herstellingen',
    title: 'Kleine Herstellingen aan Huis',
    summary:
      'Snelle en duurzame oplossing voor alledaagse mankementen aan deuren, ramen, beslag en sanitair.',
    tasks: [
      'Klemmende deuren, scharnieren en deurklinken bijstellen',
      'Kranen, sifons en wc-onderdelen vervangen',
      'Loszittende stopcontacten en schakelaars vastzetten',
    ],
  },
  {
    id: 'onderhoud-binnen-buiten',
    index: '03.',
    category: 'Onderhoud',
    title: 'Periodiek Woningonderhoud',
    summary:
      'Preventief nazicht en onderhoud binnen en buiten zodat kleine slijtage niet uitgroeit tot grote kosten.',
    tasks: [
      'Siliconen- en kitvoegen vernieuwen in badkamer en keuken',
      'Houtwerk schuren, bijwerken en licht schilderwerk',
      'Dakgoten, terrasdelen en tuinpoorten nalopen',
    ],
  },
  {
    id: 'verlichting-afwerking',
    index: '04.',
    category: 'Montage',
    title: 'Verlichting & Ophangwerk',
    summary:
      'Veilig en strak bevestigen van hanglampen, wandspots, rookmelders en zware wanddecoratie op elk type muur.',
    tasks: [
      'Plafond- en wandverlichting aansluiten',
      'Juiste pluggen voor gipskarton, steen of beton',
      'Kabelgoten en afwerkingsprofielen plaatsen',
    ],
    featured: true,
  },
  {
    id: 'schrijnwerk-beslag',
    index: '05.',
    category: 'Herstellingen',
    title: 'Schrijnwerk & Raambeslag',
    summary:
      'Herstellen van kastschanieren, ladegeleiders, tochtstrips en binnendeuren voor soepel dagelijks gebruik.',
    tasks: [
      'Keukenkastjes opnieuw uitlijnen en afstellen',
      'Sloten, cilinders en tochtstrippen vernieuwen',
      'Beschadigde plinten en afwerklijsten herstellen',
    ],
  },
  {
    id: 'seizoens-onderhoud',
    index: '06.',
    category: 'Onderhoud',
    title: 'Seizoensklaar Maken',
    summary:
      'Praktische onderhoudsbeurt per seizoen voor terras, buitenverlichting, tuinberging en buitenschrijnwerk.',
    tasks: [
      'Terras en tuinmeubilair reinigen en vastzetten',
      'Buitenkranen en scharnieren controleren',
      'Kleine voeg- en herstelwerken buitenshuis',
    ],
  },
];

export const ABOUT_VALUES = [
  {
    index: '01.',
    title: 'Eén vakkundig aanspreekpunt',
    detail:
      'Geen verschillende onderaannemers voor kleine klussen: van montage tot herstelling wordt alles netjes gebundeld uitgevoerd.',
  },
  {
    index: '02.',
    title: 'Heldere afspraken vooraf',
    detail:
      'Duidelijke communicatie over planning, benodigde materialen en aanpak voordat we bij jou aan huis starten.',
  },
  {
    index: '03.',
    title: 'Eigen professioneel gereedschap',
    detail:
      'Uitgerust voor hout, steen, gipskarton en lichte montage zodat elke bevestiging stevig en waterpas blijft.',
  },
  {
    index: '04.',
    title: 'Propere en zorgvuldige oplevering',
    detail:
      'We beschermen vloeren en meubels tijdens het werk en laten elke ruimte opgeruimd achter.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01.',
    title: 'Vraag je klus aan',
    description:
      'Stuur een korte omschrijving of bel ons rechtstreeks. Je krijgt snel reactie met een passend tijdstip.',
  },
  {
    step: '02.',
    title: 'Duidelijk overzicht',
    description:
      'We bekijken samen wat nodig is qua materialen en tijd zodat je precies weet waar je aan toe bent.',
  },
  {
    step: '03.',
    title: 'Vakkundige uitvoering aan huis',
    description:
      'Montage, herstellingen en onderhoud worden verzorgd uitgevoerd met controle op elke afwerking.',
  },
];

export const VISION_PILLARS = [
  {
    index: '01.',
    title: 'Herstellen boven wegwerpen',
    subtitle: 'Duurzaam omgaan met je interieur en woning',
    body: 'Veel problemen aan kasten, deuren, kranen of afwerkingen vragen geen dure vervanging. Door tijdig en vakkundig te herstellen gaat materiaal jaren langer mee.',
  },
  {
    index: '02.',
    title: 'Rust door goed onderhoud',
    subtitle: 'Kleine klussen meteen opgelost',
    body: 'Een losse deurklink, scheve kastdeur of versleten kitvoeg blijft vaak maanden liggen. Wij zorgen dat die lijst met kleine klussen in één bezoek verdwijnt.',
  },
  {
    index: '03.',
    title: 'Respect voor elke woning',
    subtitle: 'Zorgvuldigheid in voorbereiding en afwerking',
    body: 'Goed vakwerk zie je niet alleen in het eindresultaat, maar ook in hoe netjes er gewerkt wordt: met aandacht voor details, vloeren en duidelijke afspraken.',
  },
];

export interface FaqItem {
  id: string;
  index: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'planning-snelheid',
    index: '01.',
    question: 'Hoe snel kan een klus aan huis ingepland worden?',
    answer:
      'Kleine en middelgrote klussen plannen we doorgaans binnen enkele werkdagen in. Na je aanvraag via het formulier of telefonisch contact ontvang je meteen een concreet voorstel voor datum en richttijd.',
  },
  {
    id: 'gereedschap-materiaal',
    index: '02.',
    question: 'Welke gereedschappen en materialen moet ik zelf voorzien?',
    answer:
      'HG Klusjes brengt eigen professioneel gereedschap, meetapparatuur en standaard bevestigingsmateriaal (zoals schroeven en pluggen) mee. Specifieke onderdelen zoals kranen, verlichting of meubels kunnen door jou worden voorzien of vooraf in overleg worden meegebracht.',
  },
  {
    id: 'klussen-combineren',
    index: '03.',
    question: 'Kan ik meerdere kleine klussen combineren in één bezoek?',
    answer:
      'Ja, dat is juist heel efficiënt. Je mag gerust een lijstje met verschillende montage-, herstel- en onderhoudsklussen doorgeven zodat alles in één afspraak netjes afgewerkt wordt.',
  },
  {
    id: 'prijsafspraak',
    index: '04.',
    question: 'Hoe gebeurt de afspraak rond prijs en tijdsduur?',
    answer:
      'Voor aanvang bespreken we duidelijk de verwachte duur en eventuele materiaalkosten op basis van jouw omschrijving of foto’s. Zo kom je nooit voor onverwachte kosten te staan.',
  },
  {
    id: 'muurtypes-pluggen',
    index: '05.',
    question: 'Kunnen jullie ophangen op zowel gipskarton als beton of baksteen?',
    answer:
      'Zeker. We controleren eerst het muurtype en eventuele leidingen en gebruiken telkens de geschikte hollewand-, slag- of universele pluggen zodat kasten, rekken en verlichting veilig verankerd zijn.',
  },
  {
    id: 'propere-oplevering',
    index: '06.',
    question: 'Wordt de werkplek achteraf netjes achtergelaten?',
    answer:
      'Ja. Tijdens het boren en monteren beschermen we vloeren en meubels, ruimen we stof en verpakkingsmateriaal op en testen we samen elke uitgevoerde klus voor we vertrekken.',
  },
];

