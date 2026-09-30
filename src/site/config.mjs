// Configuration centrale du site. Toute information a remplacer avant la mise en ligne est ici,
// et nulle part ailleurs : les pages, le JSON-LD, le sitemap et llms.txt en derivent.

export const SITE = {
  // A REMPLACER : domaine definitif (sans slash final)
  url: 'https://site-maroc.vercel.app',
  name: 'Florian Xavier',
  tagline: 'Antiquaire et expert en objets d\'art au Maroc',
  expert: {
    name: 'Florian Xavier',
    jobTitle: 'Antiquaire et expert en objets d\'art',
  },
  // Coordonnees (NAP) : a garder identiques sur le site, le JSON-LD et la fiche Google Business Profile.
  // Le contact principal passe par le formulaire Tally (page /contact) ; le telephone reste affiche.
  phone: { display: '06 58 59 66 73', e164: '+212658596673' },
  address: {
    // Bureaux
    street: '42 Q.I Sidi Ghanem 158',
    postalCode: '40000',
    city: 'Marrakech',
    country: 'MA',
    countryName: 'Maroc',
  },
  // A COMPLETER : latitude / longitude a 5 decimales (null = non publie dans le JSON-LD)
  geo: null,
  // A COMPLETER : profils officiels (Google Business Profile, Instagram, Facebook...)
  sameAs: [],
  // A REMPLACER : identifiant du formulaire Tally (Share > Embed). null = formulaire pas encore en ligne.
  tallyFormId: 'aQVbv9',
  // A COMPLETER : conversion Google Ads, declenchee uniquement sur /merci apres un envoi reel du formulaire.
  // id = 'AW-XXXXXXXXX', conversionLabel = libelle de l'action de conversion. null = aucune balise chargee.
  googleAds: { id: null, conversionLabel: null },
  lastmod: '2026-09-24',
  // Conception et realisation du site (mentions legales). Aucune personne physique n'est citee :
  // seule la societe apparait (ni dirigeant, ni nom commercial).
  realisation: {
    name: 'PSA',
    siren: '909 703 324',
    legalForm: 'SASU au capital de 10 000 €',
    address: '2 avenue des Lyonnais, 21200 Beaune, France',
    rcs: '909 703 324 R.C.S. Dijon',
    tva: 'FR46909703324',
  },
};


// Photos du site. null = emplacement vide (cadre "Photo a venir"), le site reste propre.
// Une photo = une chaine ('/images/x.webp') ou un objet { src, small, alt, position } :
//   small    = variante 448 px pour les petits ecrans (srcset)
//   alt      = description reelle de la photo (prioritaire sur le texte par defaut de l'emplacement).
//              Regle : ce qu'on voit, puis le service (estimation, rachat, expertise) et le lieu, <= 125 caracteres.
//              Photos libres : l'objet illustre un "type de piece", jamais un objet rachete par Florian.
//   position = cadrage (object-position) quand le cadre carre ou paysage coupe la photo
// Esprit recherche : objets anciens et de collection, lumiere naturelle, fonds neutres ou interieurs anciens.
const florian = (name, alt, position) => ({ src: `/images/${name}.webp`, small: `/images/${name}-448.webp`, alt, position });
const PHOTOS = {
  ensemble: florian('florian-xavier-antiquaire-marrakech', 'Florian Xavier, antiquaire à Marrakech, estime un vase ancien, un tableau au cadre doré et un fauteuil à têtes de lion', '22% 32%'),
  tableau: florian('florian-xavier-tableau-ancien', 'Florian Xavier, expert en tableaux anciens, examine une toile dans son cadre doré avant de l\'estimer', '50% 44%'),
  cristal: florian('florian-xavier-vase-cristal-taille', 'Florian Xavier, antiquaire au Maroc, examine un vase en cristal taillé à décor vert pour l\'estimer', '50% 38%'),
  montres: florian('florian-xavier-montres-collection', 'Florian Xavier examine un coffret de montres de collection lors d\'une estimation à Marrakech', '50% 26%'),
  sculpture: florian('florian-xavier-sculpture-argent', 'Florian Xavier, expert en objets d\'art, examine une sculpture d\'oiseaux en métal argenté', '50% 27%'),
  porcelaine: florian('florian-xavier-porcelaine-chinoise', 'Florian Xavier estime un grand vase en porcelaine chinoise à décor polychrome', '50% 54%'),
};

// Photos libres de droits (CC0) : The Met, Cleveland Museum of Art, WordPress Photo Directory.
// Credits mentionnes dans les mentions legales, meme si la licence CC0 ne l'impose pas.
const libre = (name, alt, position) => ({ src: `/images/${name}.webp`, small: `/images/${name}-600.webp`, widths: [600, 1200], alt, position });
const LIBRES = {
  tapis: libre('objet-tapis-ancien', 'Tapis ancien noué main à médaillons rouges et bleus, XIXe siècle : type de pièce estimée et rachetée au Maroc'),
  vase: libre('objet-vase-verre-art-nouveau', 'Vase Art nouveau en verre multicouche gravé à l\'acide, 1896 : pâte de verre recherchée pour estimation et rachat', '50% 54%'),
  lustre: libre('objet-lustre-cristal', 'Lustre ancien en cristal à pampilles, type de luminaire estimé et racheté par Florian Xavier au Maroc'),
  pendule: libre('objet-pendule-bronze-dore', 'Pendule Louis XVI en bronze doré et marbre, vers 1783 : pendules anciennes estimées et rachetées au Maroc'),
  robe: libre('objet-robe-ancienne', 'Robe ancienne en mousseline fleurie, vers 1872 : vêtements anciens et de créateur estimés et rachetés au Maroc', '50% 20%'),
  violon: libre('objet-violon-ancien', 'Violon ancien, vers 1685 : instruments de musique anciens estimés et rachetés par Florian Xavier'),
  malle: libre('objet-malle-ancienne', 'Malle de voyage ancienne en cuir rouge à décor doré : bagagerie ancienne et de luxe estimée et rachetée'),
  cave: libre('ambiance-cave-a-vin', 'Cave voûtée aux fûts de chêne : estimation de caves à vin et de spiritueux anciens au Maroc'),
  salon: libre('ambiance-salon-ancien', 'Salon ancien meublé d\'antiquités, lustre et miroir doré : inventaire et estimation lors d\'une succession'),
  marrakech: libre('ville-marrakech-koutoubia', 'Minaret de la Koutoubia à Marrakech, où Florian Xavier estime et rachète antiquités et objets d\'art', '50% 30%'),
  casablanca: libre('ville-casablanca-mosquee-hassan-ii', 'Mosquée Hassan II à Casablanca, ville où Florian Xavier se déplace pour estimer antiquités et objets d\'art', '50% 12%'),
};

// Photos fournies par le client
const FOURNIES = {
  briquets: { ...libre('objet-briquets-stylos-anciens', 'Briquets anciens ciselés et stylos plume de collection, estimés et rachetés par Florian Xavier au Maroc'), widths: [600, 1024] },
  rabat: libre('ville-rabat-kasbah-des-oudayas', 'Kasbah des Oudayas illuminée à Rabat, ville où Florian Xavier estime les antiquités à domicile'),
  tanger: libre('ville-tanger-ruelle-medina', 'Ruelle blanchie à la chaux et barques de pêche sur la côte marocaine, où Florian Xavier se déplace pour estimer', '40% 50%'),
  fes: libre('ville-fes-medina', 'Toits de la médina de Fès au couchant, ville où Florian Xavier estime et rachète les objets anciens'),
  agadir: libre('ville-agadir-baie', 'Baie d\'Agadir vue d\'Agadir Oufella, ville où Florian Xavier estime antiquités et objets d\'art à domicile', '50% 60%'),
};

export const IMAGES = {
  // Florian Xavier (vraies photos uniquement, jamais de banque d'images)
  'florian-hero': PHOTOS.ensemble,
  'florian-portrait': PHOTOS.cristal,
  'florian-loupe': PHOTOS.sculpture,
  'florian-visite': PHOTOS.porcelaine,
  // Ambiances et services
  og: '/images/florian-xavier-og.jpg', // Image de partage reseaux sociaux, 1200 x 630
  loupe: PHOTOS.sculpture,             // Pages services
  succession: LIBRES.salon,
  // Objets recherches
  // Photo d'ensemble elargie en paysage (fond prolonge) : toute la scene tient, centree, dans les cartes 4:3
  mobilier: { src: '/images/florian-xavier-mobilier-ancien.webp', small: '/images/florian-xavier-mobilier-ancien-600.webp', widths: [600, 1200], alt: 'Florian Xavier, antiquaire à Marrakech, avec un fauteuil ancien à têtes de lion, un vase et un tableau à estimer' },
  'pate-de-verre': LIBRES.vase,
  'vaisselle-verre-argenterie': PHOTOS.cristal,
  'sculptures-bronzes': PHOTOS.sculpture,
  'pendules-horloges': LIBRES.pendule,
  'montres-bijoux': PHOTOS.montres,
  'tableaux-tapisseries': PHOTOS.tableau,
  tapis: LIBRES.tapis,
  'robes-vetements-de-marque': LIBRES.robe,
  'briquets-stylos': FOURNIES.briquets,
  'lustres-miroirs': LIBRES.lustre,
  'arts-asiatiques-africains': PHOTOS.porcelaine,
  'vins-spiritueux': LIBRES.cave,
  'instruments-de-musique': LIBRES.violon,
  'sacs-bagagerie': LIBRES.malle,
  // Villes d'intervention (paysage 4:3)
  'ville-marrakech': LIBRES.marrakech,
  'ville-casablanca': LIBRES.casablanca,
  'ville-rabat': FOURNIES.rabat,
  'ville-tanger': FOURNIES.tanger,
  'ville-fes': FOURNIES.fes,
  'ville-agadir': FOURNIES.agadir,
};
