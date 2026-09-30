// Pages de services : /expertise-achat/<slug>. Une intention de recherche par page.

export const SERVICES = [
  {
    slug: 'estimation-gratuite',
    nav: 'Estimation gratuite',
    icon: 'search',
    h1: 'Estimation gratuite d\'antiquités et d\'objets d\'art',
    title: 'Estimation gratuite d\'antiquités au Maroc | Florian Xavier',
    description: 'Faites estimer gratuitement vos antiquités et objets d\'art au Maroc : premier avis sur photos, examen à domicile, estimation argumentée et sans engagement.',
    summary: 'Premier avis gratuit sur photos, puis examen de l\'objet chez vous. Sans engagement.',
    lead: 'Vous souhaitez connaître la valeur d\'un objet avant de décider quoi en faire ? Florian Xavier vous donne un premier avis gratuit sur photos, puis une estimation argumentée après examen, sans aucune obligation de vendre.',
    sections: [
      ['Comment se déroule l\'estimation', null, [
        '<strong>Vous décrivez votre objet</strong> via le formulaire de contact, photos à l\'appui : vue d\'ensemble, signature, poinçons, dessous.',
        '<strong>Vous recevez rapidement un premier avis</strong> : intérêt de l\'objet, piste d\'attribution et fourchette de valeur quand les photos le permettent.',
        '<strong>L\'objet est examiné</strong> chez vous, partout au Maroc. L\'examen physique confirme l\'époque, l\'authenticité et l\'état.',
        '<strong>Vous décidez</strong> : conserver votre objet ou le vendre à Florian Xavier.',
      ]],
      ['Une estimation argumentée', 'Chaque estimation s\'appuie sur des ventes comparables récentes, chez les marchands et en ventes publiques. Florian Xavier vous explique comment il arrive au chiffre : l\'époque, l\'état, la rareté et la demande actuelle du marché.', null],
      ['Gratuite, vraiment', 'Le premier avis et l\'examen en vue d\'un achat ne vous coûtent rien et ne vous engagent à rien.', null],
    ],
    faq: [
      ['Combien de temps faut-il pour obtenir un premier avis ?', 'Peu de temps : Florian Xavier répond rapidement dès réception de photos exploitables.'],
      ['Puis-je faire estimer un objet sans vouloir le vendre ?', 'Oui. Beaucoup de demandes viennent de familles qui veulent simplement connaître la valeur d\'un objet hérité.'],
      ['Estimez-vous à distance ?', 'Le premier avis se donne sur photos. Une estimation ferme demande toujours de voir l\'objet.'],
    ],
  },
  {
    slug: 'expertise-objets-art',
    nav: 'Expertise d\'objets d\'art',
    icon: 'shield-check',
    h1: 'Expertise d\'objets d\'art et d\'antiquités',
    title: 'Expertise d\'objets d\'art et d\'antiquités au Maroc | Florian Xavier',
    description: 'Identification, datation et authentification de vos objets d\'art et antiquités au Maroc : Florian Xavier examine vos pièces et vous explique ce qui fait leur valeur.',
    summary: 'Identifier, dater et authentifier un objet pour connaître sa vraie valeur.',
    lead: 'Un objet hérité, une signature incertaine, un doute sur l\'époque ? Florian Xavier examine vos pièces, les identifie et vous explique ce qui fait leur valeur.',
    sections: [
      ['Ce que Florian Xavier examine', null, [
        'La nature de l\'objet : matériaux, technique, dimensions',
        'Les marques, signatures et poinçons',
        'L\'époque et l\'attribution, avec le degré de certitude',
        'L\'état de conservation et les restaurations éventuelles',
        'La valeur actuelle sur le marché',
      ]],
      ['Pour qui ?', 'Particuliers, familles et collectionneurs, pour un objet unique comme pour le contenu complet d\'une maison.', null],
    ],
    faq: [
      ['Quelle différence entre estimation et expertise ?', 'L\'estimation donne une valeur. L\'expertise va plus loin : elle identifie l\'objet, son époque, son auteur et son authenticité, qui fondent cette valeur.'],
      ['Faut-il déplacer l\'objet ?', 'Non. Florian Xavier se déplace chez vous, partout au Maroc, pour examiner vos pièces sur place.'],
    ],
  },
  {
    slug: 'achat-antiquites',
    nav: 'Achat d\'antiquités',
    icon: 'banknote',
    h1: 'Achat d\'antiquités et d\'objets d\'art au Maroc',
    title: 'Achat d\'antiquités à Marrakech et au Maroc | Florian Xavier',
    description: 'Florian Xavier achète vos antiquités et objets de collection à Marrakech et partout au Maroc : proposition claire après examen, enlèvement organisé.',
    summary: 'Proposition claire après examen, enlèvement organisé.',
    lead: 'Vous souhaitez vendre un objet ancien, une collection ou le mobilier d\'une maison ? Florian Xavier examine vos objets, vous fait une proposition claire et s\'occupe de l\'enlèvement.',
    sections: [
      ['Une proposition claire', 'Après examen, vous recevez une proposition de rachat détaillée, objet par objet si vous le souhaitez. Vous êtes libre de l\'accepter ou de la refuser.', null],
      ['Enlèvement', null, [
        'Démontage et emballage soignés, même pour les pièces fragiles',
        'Transport organisé partout au Maroc',
        'Enlèvement partout au Maroc, au moment qui vous convient',
      ]],
      ['Ce que nous achetons', 'Mobilier, tableaux, tapis, argenterie, bijoux et montres, bronzes, verrerie d\'art, luminaires, objets asiatiques et africains, et bien d\'autres. Consultez la liste complète des objets recherchés.', null],
    ],
    faq: [
      ['Achetez-vous des objets à l\'unité ?', 'Oui, une pièce isolée comme une collection entière.'],
      ['Qui s\'occupe du transport ?', 'Florian Xavier organise l\'enlèvement, l\'emballage et le transport, où que vous soyez au Maroc.'],
    ],
  },
  {
    slug: 'successions-inventaires',
    nav: 'Successions et inventaires',
    icon: 'home',
    h1: 'Successions et inventaires de maisons',
    title: 'Succession et inventaire de maison au Maroc | Florian Xavier',
    description: 'Inventaire, estimation et rachat du contenu d\'une maison ou d\'un appartement lors d\'une succession ou d\'un déménagement au Maroc, en toute discrétion.',
    summary: 'Inventaire, estimation et rachat du contenu d\'une maison, en toute discrétion.',
    lead: 'Une succession ou un départ à l\'étranger amène souvent à se séparer du contenu de toute une maison. Florian Xavier vous accompagne de l\'inventaire à l\'enlèvement, avec tact et discrétion.',
    sections: [
      ['Un accompagnement complet', null, [
        'Visite de la maison et repérage des objets de valeur, pièce par pièce',
        'Inventaire et estimation, pièce par pièce',
        'Offre de rachat globale ou objet par objet',
        'Enlèvement organisé à la date qui vous convient',
      ]],
      ['Discrétion et respect', 'Se séparer des objets d\'un proche est un moment délicat. Les visites se font en toute discrétion, sans publicité, et chaque objet est traité avec soin.', null],
      ['Pour les héritiers à l\'étranger', 'Si vous vivez hors du Maroc, l\'essentiel peut se faire à distance : visite en votre absence avec une personne de confiance, photos et échanges à distance.', null],
    ],
    faq: [
      ['Faut-il trier avant votre visite ?', 'Non. Ne jetez rien avant la visite : des objets de valeur se cachent souvent parmi ce qui semble sans intérêt.'],
    ],
  },
];
