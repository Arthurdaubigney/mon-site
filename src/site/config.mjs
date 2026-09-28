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
  tallyFormId: null,
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
//   alt      = description reelle de la photo (prioritaire sur le texte par defaut de l'emplacement)
//   position = cadrage (object-position) quand le cadre carre ou paysage coupe la photo
// Esprit recherche : objets anciens et de collection, lumiere naturelle, fonds neutres ou interieurs anciens.
const florian = (name, alt, position) => ({ src: `/images/${name}.webp`, small: `/images/${name}-448.webp`, alt, position });
const PHOTOS = {
  ensemble: florian('florian-xavier-antiquaire-marrakech', 'Florian Xavier, antiquaire à Marrakech, examinant un vase ancien près d\'un tableau au cadre doré posé sur un fauteuil ancien à têtes de lion', '50% 32%'),
  tableau: florian('florian-xavier-tableau-ancien', 'Florian Xavier examinant un tableau ancien dans son cadre doré', '50% 44%'),
  cristal: florian('florian-xavier-vase-cristal-taille', 'Florian Xavier examinant un vase en cristal taillé à décor vert', '50% 38%'),
  montres: florian('florian-xavier-montres-collection', 'Florian Xavier examinant un coffret de montres de collection', '50% 26%'),
  sculpture: florian('florian-xavier-sculpture-argent', 'Florian Xavier examinant une sculpture d\'oiseaux en métal argenté', '50% 27%'),
  porcelaine: florian('florian-xavier-porcelaine-chinoise', 'Florian Xavier examinant un grand vase en porcelaine chinoise à décor polychrome', '50% 54%'),
};

// Photos libres de droits (CC0) : The Met, Cleveland Museum of Art, WordPress Photo Directory.
// Credits mentionnes dans les mentions legales, meme si la licence CC0 ne l'impose pas.
const libre = (name, alt, position) => ({ src: `/images/${name}.webp`, small: `/images/${name}-600.webp`, widths: [600, 1200], alt, position });
const LIBRES = {
  tapis: libre('objet-tapis-ancien', 'Tapis ancien noué main à médaillons géométriques rouges et bleus, première moitié du XIXe siècle'),
  vase: libre('objet-vase-verre-art-nouveau', 'Vase Art nouveau en verre multicouche rouge dégagé à l\'acide, 1896', '50% 54%'),
  lustre: libre('objet-lustre-cristal', 'Lustre ancien en cristal à pampilles et bras de lumière'),
  pendule: libre('objet-pendule-bronze-dore', 'Pendule de cheminée Louis XVI en bronze doré et marbre blanc, vers 1783'),
  robe: libre('objet-robe-ancienne', 'Robe ancienne en mousseline imprimée de fleurs, vers 1872, présentée sur mannequin', '50% 20%'),
  violon: libre('objet-violon-ancien', 'Violon ancien, vers 1685'),
  malle: libre('objet-malle-ancienne', 'Malle de voyage ancienne en cuir rouge à décor doré, XVIIIe siècle'),
  cave: libre('ambiance-cave-a-vin', 'Cave voûtée aux fûts de chêne alignés'),
  salon: libre('ambiance-salon-ancien', 'Grand salon parisien du XVIIIe siècle meublé d\'antiquités : lustre en cristal, miroir doré, sièges Louis XVI'),
  marrakech: libre('ville-marrakech-palais-el-badi', 'Palais El Badi à Marrakech, avec les sommets enneigés de l\'Atlas'),
  casablanca: libre('ville-casablanca-mosquee-hassan-ii', 'Mosquée Hassan II de Casablanca se reflétant dans l\'océan', '50% 12%'),
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
  mobilier: { src: '/images/florian-xavier-mobilier-ancien.webp', small: '/images/florian-xavier-mobilier-ancien-600.webp', widths: [600, 1200], alt: 'Florian Xavier, antiquaire, avec un vase ancien et un tableau au cadre doré posé sur un fauteuil ancien à têtes de lion' },
  'pate-de-verre': LIBRES.vase,
  'vaisselle-verre-argenterie': PHOTOS.cristal,
  'sculptures-bronzes': PHOTOS.sculpture,
  'pendules-horloges': LIBRES.pendule,
  'montres-bijoux': PHOTOS.montres,
  'tableaux-tapisseries': PHOTOS.tableau,
  tapis: LIBRES.tapis,
  'robes-vetements-de-marque': LIBRES.robe,
  'briquets-stylos': null, // A TROUVER : stylo plume ancien, briquet de collection
  'lustres-miroirs': LIBRES.lustre,
  'arts-asiatiques-africains': PHOTOS.porcelaine,
  'vins-spiritueux': LIBRES.cave,
  'instruments-de-musique': LIBRES.violon,
  'sacs-bagagerie': LIBRES.malle,
  // Villes d'intervention (paysage 4:3)
  'ville-marrakech': LIBRES.marrakech,
  'ville-casablanca': LIBRES.casablanca,
  'ville-rabat': null,   // A TROUVER : Kasbah des Oudayas
  'ville-tanger': null,  // A TROUVER : Kasbah et detroit
  'ville-fes': null,     // A TROUVER : toits de la Medina
  'ville-agadir': null,  // A TROUVER : Kasbah d'Agadir Oufella
};
