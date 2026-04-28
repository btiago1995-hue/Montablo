export interface VilleData {
  slug: string
  name: string
  intro: [string, string]
  faq: [
    { question: string; answer: string },
    { question: string; answer: string },
    { question: string; answer: string },
  ]
  relatedBlogSlugs: string[]
  metadata: {
    title: string
    description: string
  }
}

export const VILLES: VilleData[] = [
  {
    slug: 'annecy',
    name: 'Annecy',
    intro: [
      "Annecy est l'une des villes les plus touristiques de France, avec plus de 3 millions de visiteurs par an attirés par son lac, son vieux quartier médiéval et ses restaurants gastronomiques. Cette clientèle internationale — suisse, italienne, britannique, américaine — ne lit pas toujours le français et a besoin d'un menu accessible, clair et rapide à parcourir.",
      "MonTablo est la solution de menu digital conçue pour les restaurants d'Annecy qui veulent accueillir des clients du monde entier sans contrainte. Menu bilingue français / anglais, mises à jour en temps réel, QR code sur chaque table : vos clients ont votre carte dans la poche en deux secondes.",
    ],
    faq: [
      {
        question: 'Quel est le meilleur menu digital pour un restaurant à Annecy ?',
        answer: 'MonTablo est la solution de menu digital la mieux adaptée aux restaurants d\'Annecy grâce à son menu bilingue français/anglais intégré, essentiel pour accueillir la clientèle internationale du lac. La mise à jour en temps réel et le QR code personnalisé en font la solution idéale pour les restaurants du Vieux-Annecy et des bords du lac.',
      },
      {
        question: 'Comment gérer un menu bilingue pour les touristes à Annecy ?',
        answer: 'MonTablo propose nativement un menu bilingue français / anglais. Vous saisissez vos plats en français, ajoutez la traduction anglaise en quelques clics, et vos clients basculent d\'une langue à l\'autre directement sur leur téléphone. Aucune application à télécharger, aucune impression supplémentaire.',
      },
      {
        question: 'Combien coûte un menu digital pour un restaurant à Annecy ?',
        answer: 'MonTablo propose un essai gratuit de 14 jours sans carte bancaire, puis un abonnement à partir de 19 € HT / mois (Essentiel, ou 17,10 € HT / mois en annuel). Pour un restaurant à Annecy, c\'est moins cher qu\'une seule impression de menus papier par an, avec des mises à jour illimitées.',
      },
    ],
    relatedBlogSlugs: [
      'menu-bilingue-annecy',
      'menu-digital-restaurant-haute-savoie',
      'prix-menu-digital',
    ],
    metadata: {
      title: 'Menu digital restaurant Annecy — MonTablo',
      description: 'Créez le menu digital de votre restaurant à Annecy en 5 minutes. Bilingue FR/EN, QR code, mises à jour instantanées. Essai gratuit 14 jours.',
    },
  },
  {
    slug: 'chamonix',
    name: 'Chamonix',
    intro: [
      "Chamonix-Mont-Blanc est une destination mondiale du ski et de l'alpinisme, fréquentée par des millions de touristes chaque année venus de Grande-Bretagne, des États-Unis, d'Australie et d'Asie. Pour les restaurants de la station, proposer un menu uniquement en français est une occasion manquée : une grande partie de la clientèle ne lit pas le français et commande souvent au hasard.",
      "MonTablo permet aux restaurants de Chamonix de proposer un menu digital bilingue français / anglais, accessible instantanément par QR code. Pendant la haute saison hivernale ou estivale, vous pouvez changer votre carte en quelques secondes — sans réimprimer, sans attendre.",
    ],
    faq: [
      {
        question: 'Comment proposer un menu en anglais dans un restaurant à Chamonix ?',
        answer: 'Avec MonTablo, vous gérez un menu bilingue français / anglais depuis un seul tableau de bord. Vos clients scannent le QR code sur leur table et choisissent leur langue. Idéal pour les restaurants de Chamonix qui accueillent des skieurs et alpinistes du monde entier.',
      },
      {
        question: 'Comment gérer un menu saisonnier à Chamonix entre l\'hiver et l\'été ?',
        answer: 'MonTablo vous permet de modifier votre carte en temps réel, sans réimpression. En haute saison ski, activez vos plats montagnards ; en été, passez à votre carte randonnée en quelques clics. Vous pouvez aussi préparer plusieurs versions de votre menu et les publier au moment voulu.',
      },
      {
        question: 'Quel menu digital est adapté aux restaurants de station de ski ?',
        answer: 'MonTablo est particulièrement adapté aux stations comme Chamonix car il combine menu bilingue, QR code sur table, et mises à jour instantanées. La solution fonctionne sur n\'importe quel smartphone sans application, ce qui est essentiel pour des touristes étrangers qui ne veulent pas télécharger une app supplémentaire.',
      },
    ],
    relatedBlogSlugs: [
      'menu-bilingue-chamonix',
      'menu-digital-station-ski',
      'menu-saisonnier-fondue-raclette',
    ],
    metadata: {
      title: 'Menu digital restaurant Chamonix — MonTablo',
      description: 'Menu digital bilingue FR/EN pour les restaurants de Chamonix. QR code, mises à jour en temps réel pour la saison ski et été. Essai 14 jours gratuit.',
    },
  },
  {
    slug: 'annemasse',
    name: 'Annemasse',
    intro: [
      "Annemasse est une ville frontière avec la Suisse, à deux pas de Genève. Chaque jour, des milliers de frontaliers et de résidents suisses déjeunent dans ses restaurants. Cette clientèle habituée à la qualité et à l'efficacité s'attend à un service moderne — un menu digital en fait partie.",
      "MonTablo aide les restaurants d'Annemasse à moderniser leur offre sans complexité technique. Menu à jour en permanence, promotions du midi visibles directement sur la carte, QR code sur chaque table : vous gagnez en efficacité et en satisfaction client.",
    ],
    faq: [
      {
        question: 'Comment digitaliser la carte d\'un restaurant à Annemasse ?',
        answer: 'MonTablo vous permet de créer et publier votre menu digital en moins de 5 minutes. Vous ajoutez vos plats, vos catégories et vos prix, vous personnalisez les couleurs, et vous générez un QR code à poser sur vos tables. Aucune compétence technique requise.',
      },
      {
        question: 'Un menu digital est-il utile pour les restaurants proches de la frontière suisse ?',
        answer: 'Oui. Les frontaliers et les clients suisses sont habitués aux outils digitaux et apprécient une expérience fluide. Un menu digital MonTablo permet aussi d\'afficher la formule du midi en temps réel, ce qui est un argument fort pour la clientèle de déjeuner.',
      },
      {
        question: 'Peut-on gérer les promotions du midi avec MonTablo à Annemasse ?',
        answer: 'Oui. MonTablo intègre une fonctionnalité de menu du jour et de promotions temporaires. Chaque matin, vous publiez votre formule en quelques secondes. Les clients voient directement ce qui est disponible aujourd\'hui quand ils scannent le QR code.',
      },
    ],
    relatedBlogSlugs: [
      'menu-du-jour-digital',
      'menu-digital-restaurant-haute-savoie',
      'creer-menu-digital-restaurant',
    ],
    metadata: {
      title: 'Menu digital restaurant Annemasse — MonTablo',
      description: 'Menu digital pour restaurants à Annemasse. Formule du midi, QR code, mises à jour instantanées. Idéal pour la clientèle frontalière. Essai gratuit.',
    },
  },
  {
    slug: 'thonon-les-bains',
    name: 'Thonon-les-Bains',
    intro: [
      "Thonon-les-Bains, sur les rives du lac Léman, attire une clientèle mélangée de touristes suisses, de vacanciers français et de résidents locaux. Les restaurants du front de lac font face à une concurrence directe des établissements de la rive suisse, où le niveau de service digital est élevé.",
      "MonTablo permet aux restaurants de Thonon de proposer une expérience à la hauteur des attentes de cette clientèle exigeante : menu bilingue, QR code élégant, mises à jour en temps réel. Aucune application à télécharger, aucun coût d'impression récurrent.",
    ],
    faq: [
      {
        question: 'Quel menu digital pour un restaurant au bord du lac Léman à Thonon ?',
        answer: 'MonTablo est idéal pour les restaurants de Thonon-les-Bains. La solution propose un menu bilingue français/anglais pour accueillir les touristes suisses et étrangers, un QR code personnalisable, et des mises à jour instantanées sans réimpression.',
      },
      {
        question: 'Comment gérer les changements de carte selon la saison à Thonon-les-Bains ?',
        answer: 'Avec MonTablo, modifier votre carte prend quelques secondes depuis votre téléphone. Vous pouvez activer ou désactiver des plats, changer les prix, ou publier un menu du jour en temps réel. Idéal pour les restaurants qui adaptent leur offre selon la saison touristique du lac.',
      },
      {
        question: 'MonTablo fonctionne-t-il sans connexion pour les clients à Thonon ?',
        answer: 'Vos clients accèdent au menu digital MonTablo via leur navigateur mobile en scannant le QR code. Le menu se charge rapidement et ne nécessite qu\'une connexion mobile standard. Aucune application à installer, aucun compte client requis.',
      },
    ],
    relatedBlogSlugs: [
      'menu-bilingue-restaurant',
      'menu-digital-restaurant-haute-savoie',
      'qr-code-restaurant-guide',
    ],
    metadata: {
      title: 'Menu digital restaurant Thonon-les-Bains — MonTablo',
      description: 'Menu digital pour restaurants à Thonon-les-Bains. Bilingue FR/EN, QR code, mises à jour en temps réel. Idéal pour la clientèle du lac Léman.',
    },
  },
  {
    slug: 'megeve',
    name: 'Megève',
    intro: [
      "Megève est l'une des stations de ski les plus chics des Alpes, fréquentée par une clientèle internationale haut-de-gamme en quête d'une expérience irréprochable. Dans ce contexte, un menu papier froissé ou une ardoise illisible est une faute de goût. Le menu digital est devenu un standard dans les établissements premium de la station.",
      "MonTablo s'intègre parfaitement dans l'atmosphère de Megève : interface épurée, design personnalisable aux couleurs de votre restaurant, menu bilingue français / anglais. Vos clients scannent, parcourent votre carte sur leur téléphone, et vous pouvez modifier les plats en temps réel depuis la cuisine.",
    ],
    faq: [
      {
        question: 'Quel menu digital est adapté aux restaurants gastronomiques de Megève ?',
        answer: 'MonTablo propose une interface premium, épurée et personnalisable aux couleurs de chaque établissement. Pour les restaurants gastronomiques de Megève, c\'est la solution qui allie qualité visuelle et simplicité de gestion. Le menu bilingue français/anglais répond aux attentes de la clientèle internationale de la station.',
      },
      {
        question: 'Peut-on mettre à jour le menu d\'un restaurant à Megève en plein service ?',
        answer: 'Oui. MonTablo permet de modifier votre carte en quelques secondes depuis un téléphone ou une tablette, même en plein service. Un plat épuisé ? Désactivez-le en un tap. Vos clients ne voient plus que ce qui est disponible.',
      },
      {
        question: 'Comment proposer un menu en anglais à Megève ?',
        answer: 'MonTablo gère nativement un menu bilingue français / anglais. Vous saisissez les noms de plats et descriptions dans les deux langues, et vos clients choisissent leur langue depuis le menu digital. Pas d\'impression séparée, pas de menu supplémentaire à gérer.',
      },
    ],
    relatedBlogSlugs: [
      'menu-digital-station-ski',
      'menu-bilingue-restaurant',
      'menu-saisonnier-fondue-raclette',
    ],
    metadata: {
      title: 'Menu digital restaurant Megève — MonTablo',
      description: 'Menu digital premium pour restaurants à Megève. Design élégant, bilingue FR/EN, QR code. La solution pour les restaurants de la station chic.',
    },
  },
  {
    slug: 'cluses',
    name: 'Cluses',
    intro: [
      "Cluses est le cœur industriel de la vallée de l'Arve, avec une forte densité de PME et de travailleurs qui déjeunent en ville chaque midi. Pour les restaurants de Cluses, la réactivité est primordiale : le menu du jour doit être communiqué vite, et la carte doit refléter en permanence ce qui est disponible.",
      "MonTablo permet aux restaurants de Cluses de publier leur formule du midi en quelques secondes chaque matin, d'activer ou désactiver des plats en temps réel, et de gérer leur carte sans impression ni ardoise. Un QR code sur chaque table, et vos clients sont autonomes.",
    ],
    faq: [
      {
        question: 'Comment communiquer rapidement le menu du jour à Cluses ?',
        answer: 'MonTablo propose une fonctionnalité de menu du jour que vous publiez en quelques secondes chaque matin depuis votre téléphone. Vos clients scannent le QR code et voient immédiatement la formule du jour. Fini l\'ardoise à réécrire ou le SMS à envoyer.',
      },
      {
        question: 'MonTablo est-il adapté aux petits restaurants de centre-ville comme à Cluses ?',
        answer: 'Oui. MonTablo est conçu pour les petites équipes et les restaurants sans service informatique. La prise en main prend moins de 5 minutes, et la gestion quotidienne se fait en quelques taps depuis un smartphone. Pas de formation, pas de contrat long terme.',
      },
      {
        question: 'Quel est le prix d\'un menu digital pour un restaurant à Cluses ?',
        answer: 'MonTablo propose 14 jours d\'essai gratuit sans carte bancaire, puis 19 € HT / mois (Essentiel) ou 39 € HT / mois (Pro), avec −10 % en annuel. Pour un restaurant de Cluses, c\'est un investissement rentabilisé dès le premier mois d\'économies d\'impression.',
      },
    ],
    relatedBlogSlugs: [
      'menu-du-jour-digital',
      'creer-menu-digital-restaurant',
      'raisons-adopter-menu-digital',
    ],
    metadata: {
      title: 'Menu digital restaurant Cluses — MonTablo',
      description: 'Menu digital pour restaurants à Cluses. Menu du jour en un clic, QR code, mises à jour instantanées. Parfait pour la clientèle de déjeuner. Essai gratuit.',
    },
  },
  {
    slug: 'sallanches',
    name: 'Sallanches',
    intro: [
      "Sallanches est la porte d'entrée du massif du Mont-Blanc, traversée par des millions de touristes chaque année en route vers Chamonix, Megève ou les Contamines. Les restaurants de la ville bénéficient de ce flux touristique intense mais doivent s'adapter à une clientèle pressée et internationale.",
      "MonTablo aide les restaurants de Sallanches à capter cette clientèle de passage avec un menu digital accessible en deux secondes par QR code. Bilingue français / anglais, sans application à télécharger, mis à jour en temps réel.",
    ],
    faq: [
      {
        question: 'Comment adapter son menu aux touristes de passage à Sallanches ?',
        answer: 'MonTablo propose un menu digital bilingue français / anglais, accessible via QR code sans application. Pour les restaurants de Sallanches qui accueillent des touristes internationaux de passage vers Chamonix ou Megève, c\'est la solution la plus simple pour une expérience client fluide.',
      },
      {
        question: 'Un menu digital peut-il aider un restaurant à Sallanches à servir plus vite ?',
        answer: 'Oui. Les clients parcourent le menu sur leur téléphone dès qu\'ils sont assis, sans attendre qu\'un serveur apporte la carte. Le service est plus rapide, les erreurs de commande diminuent, et la satisfaction client augmente.',
      },
      {
        question: 'Combien de temps faut-il pour créer un menu digital à Sallanches ?',
        answer: 'Avec MonTablo, vous pouvez créer et publier votre premier menu digital en moins de 5 minutes. Inscrivez-vous, ajoutez vos plats et catégories, personnalisez les couleurs, et générez votre QR code. Essai gratuit 14 jours, aucune carte bancaire requise.',
      },
    ],
    relatedBlogSlugs: [
      'creer-menu-digital-restaurant',
      'qr-code-restaurant-guide',
      'menu-digital-restaurant-haute-savoie',
    ],
    metadata: {
      title: 'Menu digital restaurant Sallanches — MonTablo',
      description: 'Menu digital pour restaurants à Sallanches. QR code, bilingue FR/EN, mises à jour en temps réel. Idéal pour la clientèle de passage Mont-Blanc.',
    },
  },
  {
    slug: 'la-clusaz',
    name: 'La Clusaz',
    intro: [
      "La Clusaz est une station de ski familiale emblématique de Haute-Savoie, très appréciée des familles françaises et des touristes européens. Les restaurants de la station font face à des défis spécifiques : menu qui change entre midi et soir, plats saisonniers différents entre l'hiver ski et l'été randonnée, clientèle familiale qui a besoin de clarté.",
      "MonTablo simplifie la gestion quotidienne des restaurants de La Clusaz : publiez votre carte du midi en quelques secondes, adaptez votre menu selon la saison, et proposez une expérience digitale à vos clients sans investissement technique.",
    ],
    faq: [
      {
        question: 'Comment gérer un menu qui change entre midi et soir à La Clusaz ?',
        answer: 'MonTablo vous permet de modifier votre carte en temps réel depuis votre téléphone. Activez ou désactivez des plats en quelques taps. Vous pouvez aussi configurer un menu du jour pour le service de midi, distinct de votre carte du soir.',
      },
      {
        question: 'MonTablo est-il adapté aux restaurants familiaux de station comme La Clusaz ?',
        answer: 'Oui. MonTablo est particulièrement simple à utiliser pour les petites équipes des restaurants familiaux de station. Interface intuitive, pas de formation requise, prise en main en 5 minutes. Et vos clients, familles avec enfants en tête, apprécient un menu clair et lisible sur leur téléphone.',
      },
      {
        question: 'Peut-on gérer un menu été et un menu hiver avec MonTablo à La Clusaz ?',
        answer: 'Oui. MonTablo vous permet de modifier votre carte librement à chaque changement de saison. Vous pouvez préparer vos plats hiver (fondues, raclettes, tartiflettes) et les activer au début de la saison ski, puis basculer vers une carte estivale en quelques clics.',
      },
    ],
    relatedBlogSlugs: [
      'menu-saisonnier-fondue-raclette',
      'menu-digital-station-ski',
      'menu-du-jour-digital',
    ],
    metadata: {
      title: 'Menu digital restaurant La Clusaz — MonTablo',
      description: 'Menu digital pour restaurants à La Clusaz. Gérez vos menus saisonniers ski/été, QR code, mises à jour en temps réel. Essai gratuit 14 jours.',
    },
  },
  {
    slug: 'evian-les-bains',
    name: 'Évian-les-Bains',
    intro: [
      "Évian-les-Bains est une destination touristique internationale connue pour ses eaux, son casino et son Royal Hôtel. La ville attire une clientèle haut-de-gamme et internationale — suisse, russe, moyen-orientale — qui s'attend à un niveau de service premium dans tous les établissements de restauration.",
      "MonTablo s'adapte aux exigences des restaurants d'Évian-les-Bains : interface soignée, menu bilingue français / anglais, personnalisation graphique aux couleurs de votre établissement. Une expérience digitale élégante, digne des hôtels et restaurants de la ville.",
    ],
    faq: [
      {
        question: 'Quel menu digital pour les restaurants d\'hôtel à Évian-les-Bains ?',
        answer: 'MonTablo est adapté aux restaurants d\'hôtel grâce à son interface premium et son menu bilingue français/anglais. Les clients scannent le QR code sans télécharger d\'application et accèdent instantanément à la carte. Idéal pour les établissements d\'Évian-les-Bains qui accueillent une clientèle internationale exigeante.',
      },
      {
        question: 'Comment proposer un menu en plusieurs langues à Évian-les-Bains ?',
        answer: 'MonTablo propose nativement un menu bilingue français / anglais, la combinaison la plus utile pour la clientèle internationale d\'Évian. Vos clients choisissent leur langue en un tap depuis le menu digital, sans application.',
      },
      {
        question: 'MonTablo est-il adapté aux restaurants gastronomiques d\'Évian ?',
        answer: 'Oui. MonTablo propose une interface épurée et personnalisable, sans publicité et sans branding tiers visible. Votre menu digital reflète l\'identité de votre restaurant. Les couleurs, la typographie et la mise en page s\'adaptent à votre charte graphique.',
      },
    ],
    relatedBlogSlugs: [
      'menu-bilingue-restaurant',
      'menu-digital-restaurant-haute-savoie',
      'ouvrir-restaurant-haute-savoie',
    ],
    metadata: {
      title: 'Menu digital restaurant Évian-les-Bains — MonTablo',
      description: 'Menu digital premium pour restaurants à Évian-les-Bains. Bilingue FR/EN, interface élégante, QR code. Idéal pour la clientèle internationale. Essai gratuit.',
    },
  },
  {
    slug: 'bonneville',
    name: 'Bonneville',
    intro: [
      "Bonneville est le chef-lieu de la Haute-Savoie, ville administrative et commerciale au carrefour de la vallée de l'Arve. Les restaurants de Bonneville servent une clientèle locale fidèle — employés, commerçants, fonctionnaires — qui apprécie efficacité et clarté, notamment pour les déjeuners rapides.",
      "MonTablo aide les restaurants de Bonneville à moderniser leur service sans investissement lourd : menu digital accessible par QR code, formule du jour publiée en quelques secondes chaque matin, et carte toujours à jour. Simple, rapide, efficace.",
    ],
    faq: [
      {
        question: 'Un menu digital est-il utile pour un restaurant de centre-ville à Bonneville ?',
        answer: 'Oui. Pour les restaurants de Bonneville qui servent une clientèle locale de déjeuner, le menu digital MonTablo permet de communiquer la formule du jour en temps réel, de désactiver les plats épuisés, et de gagner du temps en service. Vos clients savent ce qu\'ils commandent avant même d\'appeler un serveur.',
      },
      {
        question: 'Comment créer un menu digital pour mon restaurant à Bonneville ?',
        answer: 'Inscrivez-vous sur MonTablo, ajoutez vos plats et catégories, personnalisez les couleurs, et générez votre QR code. Toute la procédure prend moins de 5 minutes. Essai gratuit 14 jours sans carte bancaire.',
      },
      {
        question: 'Faut-il des compétences informatiques pour gérer MonTablo à Bonneville ?',
        answer: 'Non. MonTablo est conçu pour les restaurateurs, pas pour les informaticiens. L\'interface est intuitive et la gestion quotidienne se fait en quelques taps depuis un smartphone. Aucune formation, aucun contrat de maintenance.',
      },
    ],
    relatedBlogSlugs: [
      'menu-du-jour-digital',
      'erreurs-menu-digital',
      'creer-menu-digital-restaurant',
    ],
    metadata: {
      title: 'Menu digital restaurant Bonneville — MonTablo',
      description: 'Menu digital pour restaurants à Bonneville (74). Menu du jour, QR code, mises à jour instantanées. La solution simple pour les restaurants du chef-lieu.',
    },
  },
]

export function getVilleBySlug(slug: string): VilleData | undefined {
  return VILLES.find((v) => v.slug === slug)
}
