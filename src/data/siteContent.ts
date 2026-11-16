export type ServiceCategory =
  | 'Alle'
  | 'Bezettingswerken'
  | 'Tegelwerken'
  | 'Opstijgend vocht';

export interface ServiceItem {
  id: string;
  index: string;
  category: Exclude<ServiceCategory, 'Alle'>;
  title: string;
  summary: string;
  tasks: string[];
  featured?: boolean;
}

export const BUSINESS_INFO = {
  name: 'GH Kluswerken',
  tagline: 'Uw partner voor renovatie & afwerking',
  phoneDisplay: '0484/29 46 47',
  phoneHref: 'tel:+32484294647',
  email: 'info@ghkluswerken.be',
  emailHref: 'mailto:info@ghkluswerken.be',
  websiteDisplay: 'www.ghkluswerken.be',
  websiteUrl: 'https://www.ghkluswerken.be',
  region: 'Vlaanderen & omliggende regio’s (België)',
  hours: [
    { days: 'Maandag – Vrijdag', time: '08:00 – 18:00' },
    { days: 'Zaterdag', time: '09:00 – 13:00 (op afspraak)' },
    { days: 'Zondag', time: 'Gesloten' },
  ],
} as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'bezettingswerken-binnen',
    index: '01.',
    category: 'Bezettingswerken',
    title: 'Binnenbezetting & Pleisterwerk',
    summary:
      'Schilderklaar uitvlakken en strak bepleisteren van muren en plafonds bij nieuwbouw of renovatie.',
    tasks: [
      'Volledige wanden en plafonds spiegelglad pleisteren',
      'Herstellen van scheuren, gaten en beschadigd pleisterwerk',
      'Plaatsen van hoekprofielen en strakke raamdagkanten',
    ],
    featured: true,
  },
  {
    id: 'tegelwerken-vloer-wand',
    index: '02.',
    category: 'Tegelwerken',
    title: 'Vloer- & Wandtegelwerken',
    summary:
      'Nauwkeurig en waterpas plaatsen van keramische tegels, grootformaat tegels en natuursteen met duurzame voegen.',
    tasks: [
      'Leefruimtes, keukens, hallen en inloopdouches betegelen',
      'Uitlijnen en egaliseren van ondergronden voor strak legwerk',
      'Waterdichte ontkoppelingsmatten en verzorgde voegafwerking',
    ],
    featured: true,
  },
  {
    id: 'opstijgend-vocht',
    index: '03.',
    category: 'Opstijgend vocht',
    title: 'Behandeling Opstijgend Vocht',
    summary:
      'Definitieve aanpak van vochtproblemen onderaan muren door professionele muurinjectie en zoutwerende afwerking.',
    tasks: [
      'Grondige vochtmeting en diagnose van aangetaste muren',
      'Professionele muurinjectie tegen opstijgend grondvocht',
      'Afkappen oud pleisterwerk en aanbrengen van saneerpleister',
    ],
    featured: true,
  },
  {
    id: 'gyproc-afwerking',
    index: '04.',
    category: 'Bezettingswerken',
    title: 'Cementering & Renovatiepleister',
    summary:
      'Sterke en vochtbestendige cementering voor kelders, plinten en badkamers klaar voor verdere betegeling.',
    tasks: [
      'Waterafstotende cementbezetting in natte ruimtes',
      'Afwerken van gyprocwanden en voegen tot Q3/Q4 niveau',
      'Uitvlakken van oneffen oude metselwerken',
    ],
  },
  {
    id: 'badkamer-terras-tegels',
    index: '05.',
    category: 'Tegelwerken',
    title: 'Badkamer- & Terrastegels',
    summary:
      'Volledige waterdichting en maatwerk betegeling voor douches, spatwanden en vorstbestendige buitenterrassen.',
    tasks: [
      'Kerdi-doek waterdichting rond inloopdouches en baden',
      'Verstek zagen van tegelhoeken en nette siliconenvoegen',
      'Terrastegels met correct afschot voor vlotte waterafvoer',
    ],
  },
  {
    id: 'kelder-vochtherstel',
    index: '06.',
    category: 'Opstijgend vocht',
    title: 'Vochtwering & Zoutwering',
    summary:
      'Voorkomen van schimmel, afbladderende verf en salpeteruitbloeiing door duurzame vochtwerende membranen.',
    tasks: [
      'Plaatsen van noppenfolies en zoutwerende beschermlagen',
      'Herstellen van plinten en muren na vochtdroging',
      'Preventieve controle op koudebruggen en vochtinsijpeling',
    ],
  },
];

export interface RealizationCase {
  id: string;
  index: string;
  category: Exclude<ServiceCategory, 'Alle'>;
  title: string;
  scope: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  visualKey: 'joinery' | 'lighting' | 'tools';
}

export const REALIZATIONS: RealizationCase[] = [
  {
    id: 'totaalbezetting-renovatie',
    index: '01.',
    category: 'Bezettingswerken',
    title: 'Schilderklare totaalbezetting woningrenovatie',
    scope: 'Woonkamer, hal en slaapkamers · ± 185 m² wand- en plafondoppervlak',
    challenge:
      'Oude, oneffen muren met scheurvorming na het vervangen van ramen en elektriciteitsleidingen.',
    solution:
      'Volledige voorbehandeling met hechtprimer, plaatsen van gegalvaniseerde hoekprofielen en spiegelglad pleisterwerk tot aan alle raamdagkanten.',
    deliverables: [
      'Volledig vlak en schilderklaar opgeleverd',
      'Naadloze afwerking rond nieuw buitenschrijnwerk',
      'Proper afgeplakte vloeren en stofvrije oplevering',
    ],
    visualKey: 'lighting',
  },
  {
    id: 'badkamer-grootformaat-tegels',
    index: '02.',
    category: 'Tegelwerken',
    title: 'Inloopdouche & vloertegels in grootformaat',
    scope: 'Badkamer & leefruimte · 60×120 cm en 80×80 cm keramisch',
    challenge:
      'Waterdichte aansluiting rond de inloopdouche en naadloos doorlopende voeglijnen van hal naar badkamer.',
    solution:
      'Cementbezetting in de natte zone, volledige Kerdi-waterdichting, laser-uitgelijnd legwerk met leveling-systeem en schimmelwerende epoxy-/siliconenvoegen.',
    deliverables: [
      '100% waterdichte ondergrond onder douche en wand',
      'Strak in verstek gezaagde buitenhoeken',
      'Perfect afschot richting douchedrain',
    ],
    visualKey: 'joinery',
  },
  {
    id: 'vochtaanpak-benedenverdieping',
    index: '03.',
    category: 'Opstijgend vocht',
    title: 'Muurinjectie & zoutwerende saneerpleister',
    scope: 'Benedenverdieping rijwoning · 24 lopende meter aangetaste muur',
    challenge:
      'Afbladderende verf, loskomend pleisterwerk en zoutuitbloeiing door opstijgend grondvocht tot 90 cm hoogte.',
    solution:
      'Afkappen van aangetast pleisterwerk tot boven de zoutgrens, boren en injecteren met hoogwaardige hydrofobe injectiegel, zoutmembraan en ademende saneerpleister.',
    deliverables: [
      'Waterdichte horizontale vochtbarrière in de muur',
      'Bescherming tegen schadelijke muurzouten',
      'Klaar voor plinten en schilderwerk na droging',
    ],
    visualKey: 'tools',
  },
];

export const AEO_DIRECT_ANSWERS = [
  {
    term: 'Wat doet GH Kluswerken?',
    definition:
      'GH Kluswerken is een gespecialiseerde Belgische renovatie- en afwerkingspartner voor binnenbezetting & pleisterwerk, vloer- en wandtegelwerken en definitieve behandeling van opstijgend vocht.',
  },
  {
    term: 'Hoe verloopt een aanvraag?',
    definition:
      'Na telefonisch contact via 0484/29 46 47 of het offerteformulier volgt een plaatsbezoek voor opmeting of vochtmeting, gevolgd door een transparante offerte op maat en een vaste uitvoeringsdatum.',
  },
  {
    term: 'Waarom één partner voor vocht, bezetting en tegels?',
    definition:
      'Vochtwering, pleisterwerk en tegelwerk volgen elkaar rechtstreeks op in een renovatie. Door alle drie door GH Kluswerken te laten uitvoeren sluit elke laag technisch perfect op elkaar aan.',
  },
];

export const ABOUT_VALUES = [
  {
    index: '01.',
    title: 'Drie kernexpertises onder één dak',
    detail:
      'Bezettingswerken, tegelwerken en behandeling tegen opstijgend vocht sluiten naadloos op elkaar aan zonder wachttijden tussen aannemers.',
  },
  {
    index: '02.',
    title: 'Direct persoonlijk overleg',
    detail:
      'Rechtstreeks contact op 0484/29 46 47 of info@ghkluswerken.be voor heldere planning en eerlijk advies ter plaatse.',
  },
  {
    index: '03.',
    title: 'Duurzame materialen & precisie',
    detail:
      'Van laser-waterpas uitlijning tot professionele injectiegels en saneerpleisters voor een resultaat dat tientallen jaren meegaat.',
  },
  {
    index: '04.',
    title: 'Propere en stipte oplevering',
    detail:
      'We werken netjes met aandacht voor bescherming van vloeren en ramen en leveren elke werf opgeruimd en schilderklaar af.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01.',
    title: 'Contact & plaatsbezoek',
    description:
      'Bel naar 0484/29 46 47 of stuur je aanvraag door. We komen langs om muren, tegels of vocht op te meten.',
  },
  {
    step: '02.',
    title: 'Heldere offerte & planning',
    description:
      'Je ontvangt een transparant voorstel met duidelijke materiaalkeuze en concrete uitvoeringsdatum.',
  },
  {
    step: '03.',
    title: 'Strakke renovatie & afwerking',
    description:
      'Wij voeren bezetting, tegelwerk of vochtbehandeling vakkundig uit tot een duurzame, nette oplevering.',
  },
];

export const VISION_PILLARS = [
  {
    index: '01.',
    title: 'Grondig bij de bron aanpakken',
    subtitle: 'Eerst een droge, gezonde ondergrond',
    body: 'Mooi bezettings- en tegelwerk begint onder het oppervlak. Door opstijgend vocht eerst correct te behandelen vermijden we terugkerende schade.',
  },
  {
    index: '02.',
    title: 'Millimeterwerk in afwerking',
    subtitle: 'Strakke lijnen en egale wanden',
    body: 'Of het nu gaat om spiegelglad pleisterwerk of grootformaat vloertegels: elk hoekprofiel en elke voeglijn krijgt de volle aandacht.',
  },
  {
    index: '03.',
    title: 'Betrouwbare partner in renovatie',
    subtitle: 'Afspraak is afspraak',
    body: 'Als vaste partner voor renovatie en afwerking werken we met duidelijke communicatie, stipte planning en respect voor jouw woning.',
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
    id: 'vocht-vs-bezetting',
    index: '01.',
    question: 'Kan bezettingswerk meteen na een behandeling tegen opstijgend vocht?',
    answer:
      'Na muurinjectie geven we de muur de nodige droogtijd en gebruiken we een ademende, zoutwerende saneerpleister. Zo blijft het nieuwe pleisterwerk vrij van blazen en vochtkringen.',
  },
  {
    id: 'tegels-zelf-kiezen',
    index: '02.',
    question: 'Mag ik zelf mijn vloer- of wandtegels aankopen?',
    answer:
      'Zeker. Jij kiest de tegels die bij je interieur passen, en wij adviseren indien gewenst over formaat, lijmkeuze, ondergrond en benodigde vierkante meters inclusief snijverlies.',
  },
  {
    id: 'schilderklaar-pleister',
    index: '03.',
    question: 'Hoe glad wordt het bezettingswerk opgeleverd?',
    answer:
      'We leveren binnenbezetting strak en egaal op, klaar om na droging te primen en schilderen zonder intensief bijplamuren.',
  },
  {
    id: 'badkamer-waterdicht',
    index: '04.',
    question: 'Voorzien jullie ook waterdichting bij badkamertegelwerken?',
    answer:
      'Ja. Rond inloopdouches, baden en natte zones brengen we steeds professionele waterdichtingsmatten en kimbanden aan onder de tegels en cementbezetting.',
  },
  {
    id: 'vochtdiagnose',
    index: '05.',
    question: 'Hoe weet ik zeker of het om opstijgend vocht gaat?',
    answer:
      'Tijdens een plaatsbezoek meten we het vochtgehalte op verschillende hoogtes in de muur en sluiten we lekkages of condens uit voordat we een behandeling voorstellen.',
  },
  {
    id: 'offerte-regio',
    index: '06.',
    question: 'Hoe vraag ik een vrijblijvende offerte aan bij GH Kluswerken?',
    answer:
      'Je kan ons rechtstreeks bellen op 0484/29 46 47, mailen naar info@ghkluswerken.be of het offerteformulier invullen op de contactpagina.',
  },
];
