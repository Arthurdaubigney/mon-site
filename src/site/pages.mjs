// Definition de toutes les pages du site. Chaque entree : path, title, description, trail, body, jsonld.
import { SITE, IMAGES } from './config.mjs';
import { OBJETS, bySlug } from './content/objets.mjs';
import { SERVICES } from './content/services.mjs';
import { VILLES } from './content/villes.mjs';
import {
  esc, abs, asset, icon, photo, tile, eyebrow, faq, ctaBand, linkList, pageHero, businessId, expertId,
} from './layout.mjs';

const HOME = { name: 'Accueil', href: '/' };
const areaServed = { '@type': 'Country', name: 'Maroc' };

/* ---------- Donnees structurees de l'entreprise ---------- */
const businessNode = () => ({
  '@type': 'AntiqueStore',
  '@id': businessId,
  name: SITE.name,
  description: `${SITE.tagline}. Estimation, expertise et rachat d'antiquités et d'objets d'art auprès des particuliers, depuis Marrakech et dans tout le Maroc.`,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/favicon.svg`,
  ...(IMAGES.og ? { image: abs(IMAGES.og) } : {}),
  telephone: SITE.phone.e164,
  address: { '@type': 'PostalAddress', ...(SITE.address.street ? { streetAddress: SITE.address.street, postalCode: SITE.address.postalCode } : {}), addressLocality: SITE.address.city, addressCountry: SITE.address.country },
  ...(SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
  areaServed: [areaServed, ...VILLES.map((v) => ({ '@type': 'City', name: v.ville }))],
  founder: { '@id': expertId },
  knowsAbout: OBJETS.map((o) => o.nav),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de Florian Xavier, antiquaire',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nav, url: abs(`/expertise-achat/${s.slug}`) } })),
  },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});
const personNode = () => ({
  '@type': 'Person', '@id': expertId, name: SITE.expert.name, jobTitle: SITE.expert.jobTitle,
  worksFor: { '@id': businessId }, url: abs('/presentation'),
  knowsAbout: ['Antiquités', 'Expertise d\'objets d\'art', 'Art marocain ancien', 'Mobilier ancien', 'Tapis berbères'],
});
const websiteNode = () => ({ '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'fr-MA', publisher: { '@id': businessId } });
const serviceNode = (name, path, description, area = areaServed) => ({
  '@type': 'Service', name, serviceType: name, description, url: abs(path), provider: { '@id': businessId }, areaServed: area,
});

/* ---------- Blocs partages ---------- */
const steps = () => `<ol class="grid gap-6 sm:grid-cols-3">
  ${[
    ['camera', 'Envoyez des photos', 'Via le formulaire, en quelques minutes.'],
    ['search', 'Recevez un avis gratuit', 'Rapidement et sans engagement.'],
    ['home', 'Rachat ou expertise chez vous', 'Partout au Maroc, à votre rythme.'],
  ].map(([ic, t, d], i) => `<li class="flex flex-col gap-3 rounded-card border border-hairline bg-card p-6">
    <span class="flex items-center gap-3"><span class="flex size-10 items-center justify-center rounded-full bg-action text-lg font-extrabold text-on-action" aria-hidden="true">${i + 1}</span>${icon(ic, 'size-6 text-link')}</span>
    <h3 class="text-xl leading-tight">${t}</h3>
    <p class="text-muted">${d}</p>
  </li>`).join('\n  ')}
</ol>`;

// Engagements : une ligne chacun, lisibles d'un coup d'oeil
const guarantees = () => `<ul class="grid gap-4 sm:grid-cols-2">
  ${[
    ['scale', 'Prix expliqué, jamais à la volée'],
    ['lock', 'Discrétion totale'],
    ['truck', 'Enlèvement et transport pris en charge'],
    ['shield-check', 'Aucune obligation de vendre'],
  ].map(([ic, t]) => `<li class="flex items-center gap-3 font-semibold">${icon(ic, 'size-6 flex-none text-ornament')}<span>${t}</span></li>`).join('\n  ')}
</ul>`;

const florianPhoto = (key = 'florian-portrait') => photo({
  key, w: 800, h: 1000, ratio: '4/5', sizes: '(min-width: 1024px) 38vw, 92vw',
  alt: key === 'florian-hero' ? 'Florian Xavier, antiquaire, examinant un objet ancien' : 'Florian Xavier, antiquaire et expert en objets d\'art',
  note: key === 'florian-hero' ? 'Florian Xavier examinant un objet ancien, plan poitrine, lumiere naturelle (vraie photo, jamais de banque d\'images)' : 'Portrait de Florian Xavier dans un interieur ancien (vraie photo, jamais de banque d\'images)',
  fallback: 'Florian Xavier',
});

// Tuiles photo (titre sur l'image). "fill" = la tuile prend la hauteur de sa rangee (grandes tuiles).
const objetTile = (o, { size = 'md', fill = false, level = 'h3', cls = '' } = {}) => tile({
  href: `/objets-recherches/${o.slug}`, title: o.nav, size, level, cls,
  photoHtml: photo({ key: o.img.key, w: 800, h: 600, ratio: '4/3', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: size === 'lg' ? '(min-width: 1024px) 48vw, 92vw' : '(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw', frameClass: fill ? 'lg:absolute lg:inset-0 lg:aspect-auto' : '' }),
});

const villeTile = (v, { fill = false, level = 'h3', cls = '' } = {}) => tile({
  href: `/zones-intervention/${v.slug}`, title: `Antiquaire à ${v.ville}`, sub: `${v.quartiers.slice(0, 3).join(', ')}…`, level, cls,
  photoHtml: photo({ key: v.photo.key, w: 800, h: 600, ratio: '4/3', alt: v.photo.alt, note: v.photo.note, fallback: v.ville, sizes: fill ? '(min-width: 1024px) 48vw, 92vw' : '(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw', frameClass: fill ? 'lg:absolute lg:inset-0 lg:aspect-auto' : '' }),
});

// Grille des 6 villes : Marrakech (siege) et Agadir en tuiles larges, rangees d'egale hauteur
const villesGrid = (level = 'h3') => `<div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
  ${VILLES.map((v, i) => villeTile(v, { level, fill: i === 0 || i === 5, cls: i === 0 || i === 5 ? 'col-span-2' : '' })).join('\n  ')}
</div>`;

const generalFaq = [
  ['L\'estimation est-elle payante ?', 'Non. Le premier avis sur photos et l\'examen en vue d\'un achat sont gratuits et sans engagement.'],
  // Pas de liens dans les reponses repliees : le maillage vers ces pages passe par les sections Objets et Zones.
  ['Quels objets achetez-vous ?', 'Mobilier, tableaux, tapis, argenterie, bijoux et montres, bronzes, verrerie d\'art, luminaires, arts asiatiques et africains, vêtements et sacs de marque, instruments de musique, et bien d\'autres objets de collection.'],
  ['Vous déplacez-vous à domicile ?', `Oui, depuis Marrakech et partout au Maroc : ${VILLES.filter((v) => v.ville !== 'Marrakech').map((v) => v.ville).join(', ')} et ailleurs.`],
  ['Combien de temps faut-il pour avoir un avis ?', 'Peu de temps : Florian Xavier répond rapidement, dès réception de photos exploitables.'],
  ['Mes informations restent-elles confidentielles ?', 'Oui. Vos photos et coordonnées servent uniquement à répondre à votre demande et ne sont jamais publiées ni transmises.'],
];

/* ---------- Accueil ---------- */
function home() {
  // Photos de Florian dans le haut de page ; les tuiles montrent des objets (aucune photo repetee).
  const featured = ['tapis', 'pate-de-verre', 'pendules-horloges', 'lustres-miroirs', 'sculptures-bronzes', 'instruments-de-musique', 'sacs-bagagerie', 'robes-vetements-de-marque', 'briquets-stylos'].map((s) => bySlug[s]);
  const small = (key) => photo({ key, w: 600, h: 600, ratio: '1/1', sizes: '(min-width: 1024px) 22vw, 45vw', alt: '', note: '', fallback: 'Florian Xavier' });
  const body = `
<section aria-labelledby="hero-titre" class="on-deep bg-deep text-on-deep">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
    <div class="lg:col-span-6">
      ${eyebrow('Antiquaire à Marrakech · partout au Maroc')}
      <h1 id="hero-titre" class="mt-4 max-w-[15ch] text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl">Antiquaire et expert en objets d'art au Maroc</h1>
      <p class="mt-6 max-w-[40ch] text-lg text-on-deep-muted sm:text-xl">Estimation gratuite sur photos, expertise et rachat à domicile.</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="/contact" class="btn btn-primary min-h-14 px-7 text-lg">Estimation gratuite ${icon('arrow-right')}</a>
        <a href="tel:${SITE.phone.e164}" class="btn btn-secondary min-h-14 px-7 text-lg">${icon('phone')} ${SITE.phone.display}</a>
      </div>
      <ul class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8" aria-label="Nos engagements">
        ${['Avis gratuit sur photos', 'Réponse rapide', 'Partout au Maroc'].map((t) => `<li class="flex items-center gap-2 font-semibold">${icon('check', 'size-5 flex-none text-ornament')}${t}</li>`).join('\n        ')}
      </ul>
    </div>
    <div class="grid grid-cols-2 gap-3 lg:col-span-6">
      <div class="row-span-2">${photo({ key: 'florian-hero', w: 800, h: 1000, ratio: '4/5', priority: true, sizes: '(min-width: 1024px) 24vw, 46vw', alt: 'Florian Xavier, antiquaire, examinant un objet ancien', note: 'Florian Xavier examinant un objet ancien (vraie photo)', fallback: 'Florian Xavier', frameClass: 'h-full w-full aspect-auto!' })}</div>
      ${small('tableaux-tapisseries')}
      ${small('montres-bijoux')}
    </div>
  </div>
</section>

<section aria-labelledby="services-titre" class="border-b border-hairline">
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h2 id="services-titre" class="sr-only">Nos services</h2>
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      ${SERVICES.map((s) => `<li><a href="/expertise-achat/${s.slug}" class="group flex min-h-16 items-center gap-3 rounded-card border border-hairline p-3 text-ink no-underline transition-colors hover:border-ink sm:gap-4 sm:p-4">${icon(s.icon, 'size-7 flex-none text-link')}<span class="min-w-0 flex-1 font-bold leading-tight [overflow-wrap:anywhere]">${s.nav}</span>${icon('arrow-right', 'size-5 flex-none text-link transition-transform group-hover:translate-x-0.5')}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section aria-labelledby="objets-titre" class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        ${eyebrow('Ce que Florian Xavier rachète')}
        <h2 id="objets-titre" class="mt-3 text-4xl leading-[1.05] sm:text-5xl">Objets recherchés</h2>
      </div>
      <a href="/objets-recherches" class="link inline-flex items-center gap-2">Voir les 15 catégories ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
      ${featured.map((o, i) => objetTile(o, i === 0 ? { size: 'lg', fill: true, cls: 'col-span-2 lg:row-span-2' } : {})).join('\n      ')}
    </div>
  </div>
</section>

<section aria-labelledby="deroulement-titre" class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        ${eyebrow('Estimation gratuite')}
        <h2 id="deroulement-titre" class="mt-3 text-4xl leading-[1.05] sm:text-5xl">Comment ça marche</h2>
      </div>
      <a href="/expertise-achat/estimation-gratuite" class="link inline-flex items-center gap-2">Tout sur l'estimation ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="mt-10">${steps()}</div>
  </div>
</section>

<section aria-labelledby="florian-titre" class="on-deep bg-deep py-16 text-on-deep lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8">
    <div class="lg:col-span-5">${florianPhoto()}</div>
    <div class="lg:col-span-7">
      ${eyebrow('Présentation')}
      <h2 id="florian-titre" class="mt-3 max-w-[18ch] text-4xl leading-[1.05] sm:text-5xl">Un seul interlocuteur, du premier avis au rachat</h2>
      <p class="mt-5 max-w-[48ch] text-lg text-on-deep-muted">Florian Xavier examine chaque objet en personne et vous explique toujours comment il arrive au prix.</p>
      <div class="mt-8">${guarantees()}</div>
      <a href="/presentation" class="btn btn-secondary mt-10 min-h-12 px-6">Découvrir Florian Xavier ${icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section aria-labelledby="zones-titre" class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        ${eyebrow('Zones d\'intervention')}
        <h2 id="zones-titre" class="mt-3 text-4xl leading-[1.05] sm:text-5xl">Partout au Maroc</h2>
      </div>
      <a href="/zones-intervention" class="link inline-flex items-center gap-2">Toutes les zones ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="mt-10">${villesGrid()}</div>
  </div>
</section>

${faq(generalFaq)}
${ctaBand()}`;
  return {
    path: '/',
    title: 'Florian Xavier, antiquaire à Marrakech et partout au Maroc',
    description: 'Antiquaire et expert à Marrakech : estimation gratuite, expertise et achat d\'antiquités, tableaux, tapis, bijoux. Déplacement partout au Maroc.',
    body,
    jsonld: [businessNode(), personNode(), websiteNode()],
  };
}

/* ---------- Presentation ---------- */
function presentation() {
  const trail = [HOME, { name: 'Présentation', href: '/presentation' }];
  const body = `
${pageHero({
    kicker: 'Présentation',
    h1: 'Florian Xavier, antiquaire et expert en objets d\'art',
    lead: 'Estimer juste, expliquer chaque décision, traiter chaque objet avec soin : voici la manière dont Florian Xavier exerce le métier d\'antiquaire, depuis Marrakech et partout au Maroc.',
    aside: florianPhoto(),
  })}
<section aria-label="Florian Xavier au travail" class="pb-16 lg:pb-24">
  <div class="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
    ${['tableaux-tapisseries', 'montres-bijoux', 'sculptures-bronzes', 'arts-asiatiques-africains'].map((k) => photo({ key: k, w: 600, h: 750, ratio: '4/5', alt: '', note: '', fallback: 'Florian Xavier', sizes: '(min-width: 1024px) 24vw, 46vw' })).join('\n    ')}
  </div>
</section>
<section aria-labelledby="parcours-titre" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="parcours-titre" class="text-4xl leading-[1.05] lg:col-span-4">Le parcours</h2>
    <div class="prose-site text-lg lg:col-span-8">
      <!-- Parcours redige sans dates ni references precises : a enrichir si des elements verifiables
           (formation, annee d'installation, affiliations) deviennent disponibles. -->
      <p>Voilà quelques années que Florian Xavier a fait des antiquités son métier : une passion devenue, au fil des maisons visitées et des pièces tenues en main, une véritable expertise.</p>
      <p>Installé à Marrakech, il se déplace dans tout le Maroc et suit de près le marché, au Maroc comme en Europe, pour que chaque avis de valeur colle aux ventes du moment.</p>
    </div>
  </div>
</section>
<section aria-labelledby="methode-titre" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="methode-titre" class="text-4xl leading-[1.05] lg:col-span-4">La méthode</h2>
    <div class="lg:col-span-8">
      <ol class="grid gap-3 sm:grid-cols-2">
        ${[
    ['Regarder avant de chiffrer', 'Matériaux, marques, usure : le prix vient après.'],
    ['Comparer au marché réel', 'Des ventes comparables récentes, jamais une cote au hasard.'],
    ['Expliquer', 'Vous savez toujours pourquoi un objet vaut ce prix.'],
    ['Laisser le choix', 'Estimer n\'oblige jamais à vendre.'],
  ].map(([t, d], n) => `<li class="rounded-card border border-hairline p-6"><span class="text-sm font-extrabold text-link">0${n + 1}</span><h3 class="mt-2 text-xl leading-tight">${t}</h3><p class="mt-2 text-muted">${d}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/presentation', trail,
    title: 'Florian Xavier, antiquaire et expert au Maroc | Présentation',
    description: 'Découvrez Florian Xavier, antiquaire et expert en objets d\'art au Maroc : sa méthode d\'estimation, ses engagements d\'authenticité et de discrétion.',
    body,
    jsonld: [{ ...personNode(), description: 'Antiquaire et expert en objets d\'art au Maroc.' }],
  };
}

/* ---------- Expertise & achat ---------- */
function expertiseHub() {
  const trail = [HOME, { name: 'Expertise & achat', href: '/expertise-achat' }];
  const body = `
${pageHero({ kicker: 'Expertise & achat', h1: 'Expertise, estimation et achat d\'antiquités au Maroc', lead: 'Quatre services, un seul interlocuteur. Que vous souhaitiez connaître la valeur d\'un objet, obtenir un rapport écrit, vendre une pièce ou vider une maison, Florian Xavier vous accompagne.' })}
<section aria-label="Nos services" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
    ${SERVICES.map((s) => `<article class="relative flex flex-col rounded-card border border-hairline bg-card p-6 sm:p-8">
      ${icon(s.icon, 'size-7 text-link')}
      <h2 class="mt-5 text-3xl leading-tight"><a href="/expertise-achat/${s.slug}" class="text-ink no-underline after:absolute after:inset-0 hover:text-link">${s.nav}</a></h2>
      <p class="mt-3 text-muted">${s.summary}</p>
      <span class="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-link">En savoir plus ${icon('arrow-right', 'size-4')}</span>
    </article>`).join('\n    ')}
  </div>
</section>
<section aria-labelledby="deroulement-titre" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="deroulement-titre" class="text-4xl leading-[1.1] lg:col-span-4">Le déroulement, pas à pas</h2>
    <div class="lg:col-span-8">${steps()}</div>
  </div>
</section>
${faq(generalFaq)}
${ctaBand()}`;
  return {
    path: '/expertise-achat', trail,
    title: 'Expertise et achat d\'antiquités au Maroc | Florian Xavier',
    description: 'Estimation gratuite, rapport d\'expertise écrit, rachat d\'antiquités, successions et inventaires : les services de Florian Xavier au Maroc.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Services', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/expertise-achat/${s.slug}`), name: s.nav })) }],
  };
}

function servicePage(s) {
  const path = `/expertise-achat/${s.slug}`;
  const trail = [HOME, { name: 'Expertise & achat', href: '/expertise-achat' }, { name: s.nav, href: path }];
  const others = SERVICES.filter((x) => x !== s);
  const body = `
${pageHero({ kicker: 'Expertise & achat', h1: s.h1, lead: s.lead, aside: photo({ key: s.slug === 'successions-inventaires' ? 'succession' : 'loupe', w: 800, h: 1000, ratio: '4/5', alt: s.slug === 'successions-inventaires' ? 'Salon ancien meublé d\'antiquités avant un inventaire de succession' : 'Loupe d\'expert posée sur un objet d\'art ancien, près d\'une signature', note: s.slug === 'successions-inventaires' ? 'Interieur de maison ou objets en cours d\'inventaire, sans personne identifiable' : 'Objet examine a la loupe, sans personne identifiable', fallback: s.nav.toLowerCase(), sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    ${s.sections.map(([h, p, list], i) => `<div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">${h}</h2>
      <div class="prose-site lg:col-span-8">
        ${p ? `<p>${p}</p>` : ''}
        ${list ? `<${i === 0 && s.slug === 'estimation-gratuite' ? 'ol' : 'ul'}>${list.map((l) => `<li>${l}</li>`).join('')}</${i === 0 && s.slug === 'estimation-gratuite' ? 'ol' : 'ul'}>` : ''}
        ${h === 'Ce que nous achetons' ? '<p><a href="/objets-recherches" class="link">Voir tous les objets recherchés</a></p>' : ''}
      </div>
    </div>`).join('\n    ')}
  </div>
</section>
${faq(s.faq)}
<section aria-labelledby="autres-titre" class="border-t border-hairline py-16">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 id="autres-titre" class="text-3xl">Les autres services</h2>
    <div class="mt-6">${linkList(others.map((o) => ({ href: `/expertise-achat/${o.slug}`, label: o.nav })))}</div>
  </div>
</section>
${ctaBand()}`;
  return { path, trail, title: s.title, description: s.description, body, jsonld: [serviceNode(s.nav, path, s.description)] };
}

/* ---------- Objets recherches ---------- */
function objetsHub() {
  const trail = [HOME, { name: 'Objets recherchés', href: '/objets-recherches' }];
  const body = `
${pageHero({ kicker: 'Objets recherchés', h1: 'Les objets que Florian Xavier recherche et achète', lead: 'Quinze familles d\'objets, de l\'ancien au contemporain. Pour chacune, découvrez ce qui est recherché, ce qui fait la valeur, et comment photographier votre objet pour un premier avis gratuit.' })}
<section aria-label="Catégories d'objets" class="pb-16 lg:pb-24">
  <div class="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
    ${OBJETS.map((o) => objetTile(o, { level: 'h2' })).join('\n    ')}
  </div>
</section>
<section class="on-deep bg-deep py-14 text-on-deep">
  <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
    <h2 class="text-3xl">Votre objet n'est pas dans la liste ?</h2>
    <p class="mt-4 text-on-deep-muted">Envoyez une photo : Florian Xavier vous dit s'il mérite une estimation.</p>
    <a href="/contact" class="btn btn-primary mt-6 min-h-12 px-6">Envoyer une photo ${icon('arrow-right')}</a>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/objets-recherches', trail,
    title: 'Objets recherchés : ce que rachète Florian Xavier, antiquaire',
    description: 'Mobilier, pâte de verre, argenterie, bronzes, pendules, montres, bijoux, tableaux, tapis, sacs de luxe : les 15 familles d\'objets rachetés au Maroc.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Objets recherchés', itemListElement: OBJETS.map((o, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/objets-recherches/${o.slug}`), name: o.nav })) }],
  };
}

function objetPage(o) {
  const path = `/objets-recherches/${o.slug}`;
  const trail = [HOME, { name: 'Objets recherchés', href: '/objets-recherches' }, { name: o.nav, href: path }];
  const body = `
${pageHero({ kicker: 'Objets recherchés', h1: o.h1, lead: o.intro, aside: photo({ key: o.img.key, w: 800, h: 1000, ratio: '4/5', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Ce que nous recherchons</h2>
      <ul class="grid gap-3 lg:col-span-8">
        ${o.recherche.map((r) => `<li class="flex items-start gap-3 text-muted">${icon('check', 'mt-1 size-4 flex-none text-link')}<span>${r}</span></li>`).join('\n        ')}
      </ul>
    </div>
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Ce qui fait la valeur</h2>
      <dl class="grid gap-8 sm:grid-cols-2 lg:col-span-8">
        ${o.valeur.map(([t, d]) => `<div class="border-t border-control pt-5"><dt class="font-sans text-lg font-semibold">${t}</dt><dd class="mt-2 text-muted">${d}</dd></div>`).join('\n        ')}
      </dl>
    </div>
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Faire estimer votre objet</h2>
      <div class="rounded-card border border-hairline bg-card p-5 sm:p-8 lg:col-span-8">
        <p class="flex items-start gap-3">${icon('camera', 'mt-0.5 size-5 flex-none text-link')}<span>${o.photos}</span></p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" class="btn btn-primary min-h-12 px-4 sm:px-6">Demander une estimation ${icon('arrow-right')}</a>
          <a href="tel:${SITE.phone.e164}" class="btn btn-secondary min-h-12 px-4 sm:px-6">${icon('phone')} ${SITE.phone.display}</a>
        </div>
      </div>
    </div>
  </div>
</section>
${faq(o.faq)}
<section aria-labelledby="liens-titre" class="border-t border-hairline py-16">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 id="liens-titre" class="text-3xl sm:text-4xl">Florian Xavier recherche aussi</h2>
      <a href="/objets-recherches" class="link inline-flex items-center gap-2">Tous les objets recherchés ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">${o.related.map((s) => objetTile(bySlug[s])).join('')}</div>
  </div>
</section>
${ctaBand()}`;
  return { path, trail, title: o.title, description: o.description, body, jsonld: [serviceNode(`Achat et estimation : ${o.nav}`, path, o.description)] };
}

/* ---------- Zones d'intervention ---------- */
function zonesHub() {
  const trail = [HOME, { name: 'Zones d\'intervention', href: '/zones-intervention' }];
  const body = `
${pageHero({ kicker: 'Zones d\'intervention', h1: 'Antiquaire à domicile dans tout le Maroc', lead: `Basé à ${SITE.address.city}, Florian Xavier se déplace chez vous pour examiner vos objets, où que vous soyez au Maroc. Voici les villes où il intervient le plus souvent.` })}
<section aria-label="Villes" class="pb-16 lg:pb-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">${villesGrid('h2')}</div>
</section>
<section class="on-deep bg-deep py-14 text-on-deep">
  <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
    <h2 class="text-3xl">Votre ville n'apparaît pas ?</h2>
    <p class="mt-4 text-on-deep-muted">Meknès, Essaouira, El Jadida, Oujda, Tétouan, Ouarzazate : Florian Xavier se déplace partout au Maroc.</p>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/zones-intervention', trail,
    title: 'Antiquaire à domicile dans tout le Maroc | Florian Xavier',
    description: 'Florian Xavier, antiquaire, se déplace à Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir et partout au Maroc pour estimer et acheter vos antiquités.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Zones d\'intervention', itemListElement: VILLES.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/zones-intervention/${v.slug}`), name: `Antiquaire à ${v.ville}` })) }],
  };
}

function villePage(v) {
  const path = `/zones-intervention/${v.slug}`;
  const trail = [HOME, { name: 'Zones d\'intervention', href: '/zones-intervention' }, { name: v.ville, href: path }];
  const body = `
${pageHero({ kicker: `Antiquaire à ${v.ville}`, h1: `Antiquaire et expert en objets d'art à ${v.ville}`, lead: v.lead, aside: photo({ key: v.photo.key, w: 1000, h: 750, ratio: '4/3', priority: true, alt: v.photo.alt, note: v.photo.note, fallback: v.ville, sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section aria-labelledby="objets-ville" class="pb-16 lg:pb-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 id="objets-ville" class="text-3xl sm:text-4xl">Souvent rencontrés à ${v.ville}</h2>
    <div class="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">${v.objets.map((s) => objetTile(bySlug[s], { size: 'sm' })).join('')}</div>
  </div>
</section>
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <div class="lg:col-span-7">
      <h2 class="text-3xl leading-tight sm:text-4xl">Les antiquités à ${v.ville}</h2>
      <div class="prose-site mt-6">${v.contexte.map((p) => `<p>${p}</p>`).join('')}</div>
    </div>
    <div class="lg:col-span-5">
      <h2 class="text-2xl leading-tight">Quartiers et environs</h2>
      <ul class="mt-5 flex flex-wrap gap-2" aria-label="Quartiers desservis à ${v.ville}">
        ${v.quartiers.map((q) => `<li class="rounded-pill border border-control bg-card px-4 py-1.5 text-sm font-semibold">${q}</li>`).join('\n        ')}
      </ul>
      <h2 class="mt-10 text-2xl leading-tight">Services à ${v.ville}</h2>
      <div class="mt-5">${linkList(SERVICES.map((s) => ({ href: `/expertise-achat/${s.slug}`, label: s.nav })), '')}</div>
    </div>
  </div>
</section>
${ctaBand({ title: `Un objet à faire estimer à ${v.ville} ?` })}`;
  return {
    path, trail, title: v.title, description: v.description, body,
    jsonld: [serviceNode(`Antiquaire à ${v.ville}`, path, v.description, { '@type': 'City', name: v.ville, containedInPlace: areaServed })],
  };
}

/* ---------- Contact (Tally) ---------- */
function contact() {
  const trail = [HOME, { name: 'Contact', href: '/contact' }];
  // Tout contact passe par le formulaire Tally ; le telephone reste en secours.
  const tally = SITE.tallyFormId
    ? `<iframe data-tally-src="https://tally.so/embed/${SITE.tallyFormId}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1" loading="lazy" width="100%" height="700" title="Formulaire de demande d'estimation" class="w-full"></iframe>`
    : `<!-- FORMULAIRE TALLY (A REMPLACER) : renseigner tallyFormId dans src/site/config.mjs.
     L'iframe et le script Tally sont alors generes automatiquement a la place de ce bloc. -->
      <div>
        <h2 class="font-sans text-lg font-semibold">Le formulaire de demande arrive très bientôt</h2>
        <p class="mt-3 max-w-[56ch] text-muted">Vous pourrez y décrire votre objet et joindre vos photos : vue d'ensemble, signature, poinçons, dessous et défauts éventuels. En attendant, Florian Xavier reste joignable par téléphone.</p>
        <a href="tel:${SITE.phone.e164}" class="btn btn-primary mt-8 min-h-12 px-6">${icon('phone')} Appeler le ${SITE.phone.display}</a>
      </div>`;
  const body = `
<section class="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-10">
  <div class="lg:col-span-5">
    ${eyebrow('Contact')}
    <h1 class="mt-5 text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl">Faire estimer un objet</h1>
    <p class="mt-6 max-w-[48ch] text-lg text-muted">Décrivez votre objet dans le formulaire : Florian Xavier vous répond personnellement et rapidement, avec un premier avis gratuit et sans engagement.</p>
    <ul class="mt-10 space-y-5">
      <li class="flex items-start gap-3">${icon('camera', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Joignez des photos</p><p class="text-muted">Vue d'ensemble, puis les détails : signature, poinçons, dessous, défauts.</p></div></li>
      <li class="flex items-start gap-3">${icon('map-pin', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Nos bureaux</p><p class="text-muted">${SITE.address.street}<br>${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}<br>Déplacement à domicile dans tout le Maroc.</p></div></li>
      <li class="flex items-start gap-3">${icon('phone', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Par téléphone</p><a href="tel:${SITE.phone.e164}" class="link tabular-nums">${SITE.phone.display}</a></div></li>
    </ul>
  </div>
  <div class="lg:col-span-7">
    <div class="rounded-card border border-hairline bg-card p-6 shadow-raised sm:p-8 lg:p-10">
      ${tally}
      <p class="mt-6 text-sm text-subtle">Vos informations servent uniquement à répondre à votre demande (<a href="/confidentialite" class="link">politique de confidentialité</a>, loi 09-08).</p>
    </div>
  </div>
</section>
${faq(generalFaq)}`;
  return {
    path: '/contact', trail,
    title: 'Contact et estimation gratuite | Florian Xavier, antiquaire',
    description: 'Contactez Florian Xavier, antiquaire à Marrakech : décrivez votre objet dans le formulaire pour une estimation gratuite, rapide et sans engagement.',
    body,
    jsonld: [businessNode()],
    scripts: SITE.tallyFormId ? '  <script src="https://tally.so/widgets/embed.js" async></script>' : '',
  };
}

/* ---------- Pages legales et 404 ---------- */
const legal = (path, name, description, sections) => ({
  path, trail: [HOME, { name, href: path }], noindex: true, title: `${name} | Florian Xavier`, description,
  body: `<section class="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
  <h1 class="text-[2.5rem] leading-tight sm:text-5xl">${name}</h1>
  <!-- A REMPLACER : informations legales reelles, a faire valider par un professionnel du droit -->
  <div class="prose-site mt-10">${sections.map(([h, ...ps]) => `<h2>${h}</h2>${ps.map((p) => `<p>${p}</p>`).join('')}`).join('\n')}</div>
</section>`,
});

const mentions = () => legal('/mentions-legales', 'Mentions légales', 'Mentions légales du site de Florian Xavier, antiquaire et expert en objets d\'art au Maroc.', [
  ['Éditeur du site', 'Florian Xavier, [raison sociale], [forme juridique] au capital de [montant] MAD.', `Adresse : ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}.`, 'RC : [numéro] · ICE : [numéro] · IF : [numéro] · Patente : [numéro].', `Téléphone : ${SITE.phone.display} · Contact : via le <a href="/contact" class="link">formulaire de contact</a>.`, 'Directeur de la publication : Florian Xavier.'],
  ['Conception et réalisation', ...(() => {
    const r = SITE.realisation;
    return [
      `Site conçu et réalisé par ${r.name}${r.legalForm ? `, ${r.legalForm}` : ''}.`,
      [`SIREN : ${r.siren}`, r.rcs && `RCS : ${r.rcs}`, r.tva && `TVA intracommunautaire : ${r.tva}`].filter(Boolean).join(' · ') + '.',
      ...(r.address ? [`Siège : ${r.address}.`] : []),
    ];
  })()],
  ['Hébergement', 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.'],
  ['Propriété intellectuelle', 'Les textes, photographies et éléments graphiques de ce site sont la propriété de Florian Xavier ou de leurs auteurs. Toute reproduction sans autorisation écrite est interdite.'],
  ['Crédits photos', 'Les photographies de Florian Xavier et de ses objets sont sa propriété.', 'Certaines illustrations de catégories d\'objets, de pages ville et d\'ambiance proviennent de collections en libre accès, placées dans le domaine public (licence CC0) : The Metropolitan Museum of Art (New York), The Cleveland Museum of Art et WordPress Photo Directory. Ces photographies illustrent un type d\'objet ou un lieu ; elles ne représentent pas des objets rachetés par Florian Xavier.'],
  ['Estimations', 'Les avis de valeur donnés à distance sont indicatifs. Seul l\'examen physique de l\'objet permet une estimation ou une offre ferme.'],
]);

const confidentialite = () => legal('/confidentialite', 'Politique de confidentialité', 'Politique de confidentialité et protection des données personnelles (loi 09-08) du site de Florian Xavier, antiquaire.', [
  ['Données collectées', 'Le formulaire de contact (service Tally) et les échanges téléphoniques recueillent votre nom, vos coordonnées, la description et les photos de votre objet.'],
  ['Finalité', 'Ces données servent uniquement à répondre à votre demande d\'estimation ou de contact. Elles ne sont ni vendues, ni publiées, ni transmises à des tiers à des fins commerciales.'],
  ['Sous-traitants', 'Formulaire : Tally (Tally BV, Belgique). Hébergement du site : Vercel Inc. (États-Unis).'],
  ['Durée de conservation', 'Vos données sont conservées [durée] après notre dernier échange, puis supprimées.'],
  ['Vos droits (loi 09-08)', 'Vous disposez d\'un droit d\'accès, de rectification et d\'opposition. Exercez-le via le <a href="/contact" class="link">formulaire de contact</a>.', 'Traitement déclaré auprès de la CNDP sous le numéro [numéro].'],
  ['Cookies', SITE.googleAds.id
    ? 'Ce site n\'utilise pas de cookie de mesure d\'audience. Après l\'envoi du formulaire uniquement, la page de confirmation charge la balise de conversion Google Ads (Google Ireland Ltd), qui peut déposer un cookie servant à mesurer l\'efficacité de nos annonces.'
    : 'Ce site n\'utilise pas de cookie de mesure d\'audience ni de publicité.'],
]);

/* ---------- Remerciement apres envoi du formulaire (/merci) ----------
   Page hors navigation, hors sitemap et noindex. Elle ne s'affiche qu'apres un envoi reel du
   formulaire Tally : main.js pose un marqueur de session a l'evenement Tally.FormSubmitted,
   merci.js le consomme (une seule fois) et renvoie vers /contact s'il est absent.
   C'est le point d'accroche de la conversion Google Ads (SITE.googleAds dans config.mjs). */
const merci = () => {
  const ads = SITE.googleAds;
  const cfg = JSON.stringify({ adsId: ads.id, conversionLabel: ads.conversionLabel }).replace(/</g, '\\u003c');
  return {
    path: '/merci', noindex: true,
    title: 'Demande envoyée | Florian Xavier, antiquaire',
    description: 'Votre demande d\'estimation a bien été transmise à Florian Xavier.',
    head: `  <script id="merci-config" type="application/json">${cfg}</script>
  <script src="${asset('/assets/js/merci.js')}"></script>`,
    body: `
<section class="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:pb-28 lg:pt-16">
  <div class="lg:col-span-7">
    ${eyebrow('Demande envoyée')}
    <h1 class="mt-5 text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl">Merci, votre demande est bien arrivée</h1>
    <p class="mt-6 max-w-[52ch] text-lg text-muted">Florian Xavier examine personnellement chaque objet qu'on lui confie. Il revient vers vous rapidement avec un premier avis, gratuit et sans engagement.</p>
    <ol class="mt-10 space-y-6">
      <li class="flex items-start gap-4"><span class="flex size-9 flex-none items-center justify-center rounded-full border border-hairline bg-card font-semibold tabular-nums text-link" aria-hidden="true">1</span><div><p class="font-semibold">Étude de votre description</p><p class="text-muted">Photos, signature, poinçons, provenance : chaque détail compte pour situer l'objet.</p></div></li>
      <li class="flex items-start gap-4"><span class="flex size-9 flex-none items-center justify-center rounded-full border border-hairline bg-card font-semibold tabular-nums text-link" aria-hidden="true">2</span><div><p class="font-semibold">Premier avis</p><p class="text-muted">Florian Xavier vous recontacte avec une première estimation ou quelques questions complémentaires.</p></div></li>
      <li class="flex items-start gap-4"><span class="flex size-9 flex-none items-center justify-center rounded-full border border-hairline bg-card font-semibold tabular-nums text-link" aria-hidden="true">3</span><div><p class="font-semibold">Examen sur place si besoin</p><p class="text-muted">Pour une offre ferme, il se déplace chez vous, partout au Maroc.</p></div></li>
    </ol>
    <div class="mt-12 flex flex-wrap gap-3">
      <a href="/objets-recherches" class="btn btn-primary min-h-12 px-6">Voir les objets recherchés ${icon('arrow-right', 'size-4')}</a>
      <a href="/" class="btn btn-secondary min-h-12 px-6">Retour à l'accueil</a>
    </div>
    <p class="mt-8 text-sm text-subtle">Une précision à ajouter ? Appelez le <a href="tel:${SITE.phone.e164}" class="link tabular-nums">${SITE.phone.display}</a>.</p>
  </div>
  <div class="mx-auto w-full max-w-md lg:col-span-5">${florianPhoto()}</div>
</section>`,
  };
};

const notFound = () => ({
  path: '/404', noindex: true, title: 'Page introuvable | Florian Xavier, antiquaire', description: 'Cette page n\'existe pas ou a été déplacée.',
  body: `<section class="mx-auto max-w-3xl px-4 py-24 sm:px-6">
  ${eyebrow('Erreur 404')}
  <h1 class="mt-5 text-[2.5rem] leading-tight sm:text-6xl">Cette page est introuvable</h1>
  <p class="mt-6 text-lg text-muted">Elle a peut-être été déplacée. Voici les pages les plus consultées :</p>
  <div class="mt-8">${linkList([{ href: '/', label: 'Accueil' }, { href: '/objets-recherches', label: 'Objets recherchés' }, { href: '/expertise-achat/estimation-gratuite', label: 'Estimation gratuite' }, { href: '/contact', label: 'Contact' }], 'sm:grid-cols-2')}</div>
</section>`,
});

export function allPages() {
  return [
    home(), presentation(), expertiseHub(), ...SERVICES.map(servicePage),
    objetsHub(), ...OBJETS.map(objetPage), zonesHub(), ...VILLES.map(villePage),
    contact(), merci(), mentions(), confidentialite(), notFound(),
  ];
}

export const footerContext = { objets: OBJETS, villes: VILLES, services: SERVICES };
