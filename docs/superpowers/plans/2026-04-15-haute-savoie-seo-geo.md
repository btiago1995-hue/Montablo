# Haute-Savoie SEO & GEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer une présence SEO et GEO complète en Haute-Savoie avec 1 hub régional, 10 pages-spoke par ville, 6 articles de blog locaux, llms.txt, et sitemap mis à jour.

**Architecture:** Hub `/solutions/haute-savoie` + template dynamique `/solutions/haute-savoie/[ville]` alimenté par un fichier de données centralisé. Blog posts ajoutés à `src/lib/blog.ts`. Couche GEO via `public/llms.txt` et schémas LocalBusiness + FAQPage.

**Tech Stack:** Next.js 14.2, TypeScript, `src/components/seo/json-ld.tsx` (schémas existants), `src/lib/blog.ts` (blog hardcodé), `src/app/sitemap.ts` (sitemap dynamique).

---

## Fichiers touchés

| Fichier | Action |
|---------|--------|
| `src/components/seo/json-ld.tsx` | Modifier — ajouter `localBusinessJsonLd` |
| `src/data/haute-savoie.ts` | Créer — données des 10 villes |
| `src/app/(public)/solutions/haute-savoie/page.tsx` | Créer — hub régional |
| `src/app/(public)/solutions/haute-savoie/[ville]/page.tsx` | Créer — spoke dynamique |
| `src/lib/blog.ts` | Modifier — ajouter 6 articles régionaux |
| `public/llms.txt` | Créer — couche GEO |
| `src/app/sitemap.ts` | Modifier — ajouter URLs hub + spokes |

---

## Task 1: Ajouter `localBusinessJsonLd` à json-ld.tsx

**Files:**
- Modify: `src/components/seo/json-ld.tsx`

- [ ] **Step 1: Ajouter la fonction à la fin de `src/components/seo/json-ld.tsx`**

Ajouter ces lignes après la dernière fonction `breadcrumbJsonLd` :

```typescript
export function localBusinessJsonLd({
  name,
  url,
  areaServed,
  description,
}: {
  name: string
  url: string
  areaServed: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: areaServed,
    },
    description,
  }
}
```

- [ ] **Step 2: Vérifier que le fichier compile**

```bash
cd /Users/tiago/Montablo && npx tsc --noEmit --project tsconfig.json 2>&1 | head -20
```

Attendu : aucune erreur TypeScript.

- [ ] **Step 3: Commit**

```bash
git add src/components/seo/json-ld.tsx
git commit -m "feat(seo): add localBusinessJsonLd schema helper"
```

---

## Task 2: Créer le fichier de données `src/data/haute-savoie.ts`

**Files:**
- Create: `src/data/haute-savoie.ts`

- [ ] **Step 1: Créer le fichier avec l'interface et les données des 10 villes**

Créer `src/data/haute-savoie.ts` avec ce contenu :

```typescript
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
        answer: 'MonTablo propose un essai gratuit de 14 jours sans carte bancaire, puis un abonnement à partir de 26,99 € / mois (facturé annuellement). Pour un restaurant à Annecy, c\'est moins cher qu\'une seule impression de menus papier par an, avec des mises à jour illimitées.',
      },
    ],
    relatedBlogSlugs: [
      'menu-bilingue-restaurant',
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
        answer: 'MonTablo propose 14 jours d\'essai gratuit sans carte bancaire, puis 29,99 € / mois ou 26,99 € / mois en annuel. Pour un restaurant de Cluses, c\'est un investissement rentabilisé dès le premier mois d\'économies d\'impression.',
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
```

- [ ] **Step 2: Vérifier que TypeScript compile**

```bash
cd /Users/tiago/Montablo && npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur.

- [ ] **Step 3: Commit**

```bash
git add src/data/haute-savoie.ts
git commit -m "feat(seo): add Haute-Savoie ville data for hub & spoke pages"
```

---

## Task 3: Créer le hub `/solutions/haute-savoie/page.tsx`

**Files:**
- Create: `src/app/(public)/solutions/haute-savoie/page.tsx`

- [ ] **Step 1: Créer le hub page**

Créer `src/app/(public)/solutions/haute-savoie/page.tsx` :

```typescript
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Globe, Zap, CalendarDays, Mountain } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from '@/components/seo/json-ld'
import { VILLES } from '@/data/haute-savoie'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu digital restaurant Haute-Savoie (74) — MonTablo',
  description:
    'MonTablo, solution de menu digital QR code pour les restaurants de Haute-Savoie. Annecy, Chamonix, Thonon, Megève... Bilingue FR/EN, mises à jour instantanées. Essai gratuit 14 jours.',
  openGraph: {
    title: 'Menu digital restaurant Haute-Savoie — MonTablo',
    description:
      'La solution de menu digital pour les restaurants de Haute-Savoie. Bilingue, QR code, temps réel.',
  },
}

const benefits = [
  {
    icon: Globe,
    title: 'Menu bilingue français / anglais',
    description:
      'Indispensable en Haute-Savoie où la clientèle internationale est majoritaire dans les stations et sur les rives du lac. Vos clients choisissent leur langue en un tap.',
  },
  {
    icon: CalendarDays,
    title: 'Menus saisonniers sans effort',
    description:
      'Fondues en hiver, salades en été. Modifiez votre carte en quelques secondes selon la saison, sans réimprimer quoi que ce soit.',
  },
  {
    icon: Zap,
    title: 'Mises à jour en temps réel',
    description:
      'Un plat épuisé ? Désactivez-le en un tap. Vos clients ne voient jamais un plat indisponible. Idéal pour les services chargés des hautes saisons.',
  },
  {
    icon: Mountain,
    title: 'Simple pour les petites équipes de montagne',
    description:
      'Pas besoin d\'un service informatique. MonTablo se gère depuis un téléphone en 5 minutes par jour. Conçu pour les restaurateurs, pas pour les techniciens.',
  },
]

const faqItems = [
  {
    question: 'Qu\'est-ce que MonTablo pour les restaurants de Haute-Savoie ?',
    answer:
      'MonTablo est une solution de menu digital avec QR code conçue pour les restaurants. En Haute-Savoie, elle est particulièrement adaptée grâce à son menu bilingue français/anglais, ses mises à jour en temps réel et sa simplicité d\'utilisation — idéale pour les restaurants des stations de ski et des bords de lac.',
  },
  {
    question: 'Dans quelles villes de Haute-Savoie MonTablo est-il disponible ?',
    answer:
      'MonTablo est disponible pour tous les restaurants de Haute-Savoie (département 74), notamment à Annecy, Chamonix, Annemasse, Thonon-les-Bains, Megève, Cluses, Sallanches, La Clusaz, Évian-les-Bains et Bonneville.',
  },
  {
    question: 'Combien coûte MonTablo pour un restaurant en Haute-Savoie ?',
    answer:
      'MonTablo propose un essai gratuit de 14 jours sans carte bancaire, puis 29,99 € / mois sans engagement ou 26,99 € / mois en annuel (323,89 € / an). Plats illimités, mises à jour illimitées, QR code inclus.',
  },
]

export default function HauteSavoiePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Haute-Savoie', url: `${base}/solutions/haute-savoie` },
        ])}
      />
      <JsonLd
        data={localBusinessJsonLd({
          name: 'MonTablo',
          url: `${base}/solutions/haute-savoie`,
          areaServed: 'Haute-Savoie',
          description:
            'MonTablo est une solution de menu digital avec QR code pour les restaurants de Haute-Savoie. Bilingue français/anglais, mises à jour en temps réel, essai gratuit 14 jours.',
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Fonctionnalites
            </Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Tarifs
            </Link>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Blog
            </Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1120px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/solutions/haute-savoie" className="hover:text-muted transition-colors">Solutions</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Haute-Savoie</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Haute-Savoie — Département 74
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 max-w-[680px] leading-tight">
          Le menu digital pour les restaurants de Haute-Savoie.
        </h1>
        <p className="text-lg text-muted max-w-[560px] mb-10 leading-relaxed">
          Annecy, Chamonix, Megève, Thonon... La Haute-Savoie accueille des millions de touristes internationaux chaque année. MonTablo vous donne un menu bilingue, toujours à jour, accessible en un scan.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
        >
          Essayer 14 jours gratuitement
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* Benefits */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">
          Pourquoi MonTablo pour les restaurants de Haute-Savoie
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="bg-white border border-border/50 rounded-[16px] p-8 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{benefit.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Cities grid */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-4">
          Votre ville en Haute-Savoie
        </h2>
        <p className="text-[15px] text-muted mb-10 max-w-[520px]">
          MonTablo est disponible pour tous les restaurants du département 74. Trouvez les conseils adaptés à votre ville.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {VILLES.map((ville) => (
            <Link
              key={ville.slug}
              href={`/solutions/haute-savoie/${ville.slug}`}
              className="group flex items-center justify-between bg-white border border-border/50 rounded-[14px] px-6 py-5 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300"
            >
              <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                {ville.name}
              </span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">Questions fréquentes</h2>
        <div className="space-y-8">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="font-serif text-xl text-foreground mb-3">{item.question}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="bg-primary rounded-[20px] py-16 px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-3">
            Prêt à digitaliser votre carte en Haute-Savoie ?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2.5 bg-accent text-foreground font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-all text-[15px]"
            >
              Commencer l&apos;essai gratuit
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tarifs" className="text-white/80 hover:text-white text-[15px] transition-colors">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/60">
          <Link href="/menu-digital-restaurant" className="hover:text-muted transition-colors">Menu digital restaurant</Link>
          <Link href="/qr-code-restaurant" className="hover:text-muted transition-colors">QR code restaurant</Link>
          <Link href="/fonctionnalites" className="hover:text-muted transition-colors">Fonctionnalites</Link>
          <Link href="/tarifs" className="hover:text-muted transition-colors">Tarifs</Link>
          <Link href="/blog" className="hover:text-muted transition-colors">Blog</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
                <span className="font-serif text-base text-primary">MonTablo</span>
              </div>
              <p className="text-[13px] text-muted/60 leading-relaxed">
                Le menu digital pour les restaurants exigeants.
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Produit</p>
              <div className="space-y-3">
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalites</Link>
                <Link href="/tarifs" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Tarifs</Link>
                <Link href="/menu/demo" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Voir un exemple</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Ressources</p>
              <div className="space-y-3">
                <Link href="/blog" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Blog</Link>
                <Link href="/faq" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Legal</p>
              <div className="space-y-3">
                <Link href="/mentions-legales" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Mentions legales</Link>
                <Link href="/cgu" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">CGU</Link>
                <Link href="/confidentialite" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Confidentialite</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -20
```

Attendu : `✓ Compiled successfully` sans erreurs TypeScript.

- [ ] **Step 3: Commit**

```bash
git add src/app/"(public)"/solutions/haute-savoie/page.tsx
git commit -m "feat(seo): add Haute-Savoie hub page /solutions/haute-savoie"
```

---

## Task 4: Créer le spoke dynamique `/solutions/haute-savoie/[ville]/page.tsx`

**Files:**
- Create: `src/app/(public)/solutions/haute-savoie/[ville]/page.tsx`

- [ ] **Step 1: Créer le template de spoke**

Créer `src/app/(public)/solutions/haute-savoie/[ville]/page.tsx` :

```typescript
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, UtensilsCrossed, Globe, Zap, CalendarDays } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from '@/components/seo/json-ld'
import { VILLES, getVilleBySlug } from '@/data/haute-savoie'
import type { Metadata } from 'next'

type Props = {
  params: { ville: string }
}

export async function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ville = getVilleBySlug(params.ville)
  if (!ville) return {}
  return {
    title: ville.metadata.title,
    description: ville.metadata.description,
    openGraph: {
      title: ville.metadata.title,
      description: ville.metadata.description,
    },
  }
}

const sharedBenefits = [
  {
    icon: Globe,
    title: 'Menu bilingue français / anglais',
    description:
      'Vos clients internationaux choisissent leur langue en un tap. Aucune impression supplémentaire, aucun menu séparé.',
  },
  {
    icon: Zap,
    title: 'Mises à jour en temps réel',
    description:
      'Modifiez votre carte depuis votre téléphone en quelques secondes, même en plein service.',
  },
  {
    icon: CalendarDays,
    title: 'Menu du jour en un clic',
    description:
      'Publiez votre formule du midi chaque matin en quelques taps. Vos clients voient toujours ce qui est disponible.',
  },
]

export default function VillePage({ params }: Props) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const ville = getVilleBySlug(params.ville)

  if (!ville) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Haute-Savoie', url: `${base}/solutions/haute-savoie` },
          { name: ville.name, url: `${base}/solutions/haute-savoie/${ville.slug}` },
        ])}
      />
      <JsonLd
        data={localBusinessJsonLd({
          name: 'MonTablo',
          url: `${base}/solutions/haute-savoie/${ville.slug}`,
          areaServed: ville.name,
          description: ville.metadata.description,
        })}
      />
      <JsonLd data={faqJsonLd(ville.faq)} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Fonctionnalites
            </Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Tarifs
            </Link>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Blog
            </Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1120px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/solutions/haute-savoie" className="hover:text-muted transition-colors">Haute-Savoie</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{ville.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Haute-Savoie — {ville.name}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 max-w-[680px] leading-tight">
          Menu digital pour restaurants à {ville.name}.
        </h1>
        <div className="space-y-4 text-lg text-muted max-w-[560px] mb-10 leading-relaxed">
          <p>{ville.intro[0]}</p>
          <p>{ville.intro[1]}</p>
        </div>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
        >
          Essayer 14 jours gratuitement
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* Benefits */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">
          Pourquoi MonTablo pour votre restaurant à {ville.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {sharedBenefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="bg-white border border-border/50 rounded-[16px] p-8 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{benefit.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">Questions fréquentes</h2>
        <div className="space-y-8">
          {ville.faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-serif text-xl text-foreground mb-3">{item.question}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="bg-primary rounded-[20px] py-16 px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-3">
            Prêt à digitaliser votre carte à {ville.name} ?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2.5 bg-accent text-foreground font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-all text-[15px]"
            >
              Commencer l&apos;essai gratuit
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tarifs" className="text-white/80 hover:text-white text-[15px] transition-colors">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Back to hub + internal links */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/60">
          <Link href="/solutions/haute-savoie" className="inline-flex items-center gap-1.5 hover:text-muted transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Toutes les villes de Haute-Savoie
          </Link>
          <Link href="/menu-digital-restaurant" className="hover:text-muted transition-colors">Menu digital restaurant</Link>
          <Link href="/qr-code-restaurant" className="hover:text-muted transition-colors">QR code restaurant</Link>
          <Link href="/tarifs" className="hover:text-muted transition-colors">Tarifs</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
                <span className="font-serif text-base text-primary">MonTablo</span>
              </div>
              <p className="text-[13px] text-muted/60 leading-relaxed">
                Le menu digital pour les restaurants exigeants.
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Produit</p>
              <div className="space-y-3">
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalites</Link>
                <Link href="/tarifs" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Tarifs</Link>
                <Link href="/menu/demo" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Voir un exemple</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Ressources</p>
              <div className="space-y-3">
                <Link href="/blog" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Blog</Link>
                <Link href="/faq" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Legal</p>
              <div className="space-y-3">
                <Link href="/mentions-legales" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Mentions legales</Link>
                <Link href="/cgu" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">CGU</Link>
                <Link href="/confidentialite" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Confidentialite</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Build check — verifier que les 10 pages se génèrent**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | grep -E "(haute-savoie|error|Error)" | head -30
```

Attendu : lignes `/solutions/haute-savoie/[ville]` dans la liste des pages générées, aucune erreur.

- [ ] **Step 3: Commit**

```bash
git add src/app/"(public)"/solutions/haute-savoie/
git commit -m "feat(seo): add Haute-Savoie spoke pages for 10 cities"
```

---

## Task 5: Ajouter 6 articles de blog régionaux dans `src/lib/blog.ts`

**Files:**
- Modify: `src/lib/blog.ts`

- [ ] **Step 1: Ajouter les 6 articles au début du tableau `posts` dans `src/lib/blog.ts`**

Les articles suivants doivent être insérés **avant** l'entrée `creer-menu-digital-restaurant` existante (ligne ~17), pour être affichés en premier dans le listing (ordre chronologique décroissant) :

```typescript
  {
    slug: 'ouvrir-restaurant-haute-savoie',
    title: 'Ouvrir un restaurant en Haute-Savoie : tout ce qu\'il faut savoir en 2026',
    description:
      'Réglementation, clientèle touristique, saisonnalité, concurrence : le guide complet pour ouvrir et gérer un restaurant en Haute-Savoie.',
    date: '2026-05-30',
    readTime: '7 min',
    category: 'Guide',
    keywords: [
      'ouvrir restaurant haute-savoie',
      'restaurant haute-savoie',
      'restauration haute-savoie 74',
    ],
    content: [
      {
        heading: 'La Haute-Savoie, un marché de la restauration unique en France',
        paragraphs: [
          'La Haute-Savoie (département 74) est l\'un des marchés de la restauration les plus dynamiques de France. Avec ses stations de ski emblématiques (Chamonix, Megève, La Clusaz), ses villes touristiques (Annecy, Évian-les-Bains, Thonon-les-Bains) et sa frontière avec la Suisse, le département accueille chaque année plus de 10 millions de touristes. Ce flux est une opportunité considérable pour les restaurateurs — mais aussi une exigence.',
          'Les clients de Haute-Savoie ne sont pas des clients ordinaires. En haute saison, une majorité d\'entre eux vient de l\'étranger — Grande-Bretagne, Suisse, États-Unis, Pays-Bas, Belgique. Ils sont habitués à des standards de service élevés, ils ne lisent pas nécessairement le français, et ils comparent avec ce qu\'ils connaissent chez eux. Pour un restaurateur, s\'adapter à cette réalité est une condition de succès.',
        ],
      },
      {
        heading: 'Gérer la saisonnalité : le défi principal des restaurants de Haute-Savoie',
        paragraphs: [
          'La saisonnalité est la contrainte numéro un des restaurateurs de Haute-Savoie. Les stations de ski connaissent deux pics d\'activité — hiver (décembre à avril) et été (juillet à août) — séparés par des creux de mai-juin et septembre-octobre où la fréquentation chute radicalement. Pour les restaurants de plaine comme Annecy ou Thonon, la saison estivale est la principale, avec une clientèle de bords de lac.',
          'Cette saisonnalité impose une gestion de carte flexible : les menus hivernaux mettent en avant les spécialités savoyardes (fondue, raclette, tartiflette, diots), tandis que les menus estivaux s\'orientent vers des plats plus légers. Changer de carte deux fois par an avec des menus papier représente un coût d\'impression et de gestion significatif. Un menu digital comme MonTablo permet de modifier l\'intégralité de la carte en quelques minutes, sans impression.',
        ],
      },
      {
        heading: 'La clientèle internationale : pourquoi le menu bilingue est indispensable',
        paragraphs: [
          'À Chamonix, plus de 60 % des clients des restaurants sont étrangers en haute saison hivernale. À Annecy, les touristes britanniques, suisses et italiens représentent une part majeure de la fréquentation estivale. Dans ce contexte, proposer un menu uniquement en français est une erreur stratégique : vous perdez des clients qui commettent des erreurs de commande, hésitent, ou choisissent un concurrent avec un menu plus accessible.',
          'Un menu bilingue français / anglais est le minimum pour accueillir confortablement la clientèle internationale. MonTablo intègre nativement cette fonctionnalité : vous saisissez vos plats en français et en anglais, et vos clients choisissent leur langue directement depuis leur téléphone en scannant le QR code sur la table.',
        ],
      },
      {
        heading: 'Les outils digitaux indispensables pour un restaurant en Haute-Savoie',
        paragraphs: [
          'En 2026, un restaurant en Haute-Savoie qui veut attirer et fidéliser une clientèle internationale doit disposer d\'un minimum d\'outils digitaux : présence sur Google My Business, photos de qualité sur les plateformes de réservation, et menu digital accessible par QR code. Ce dernier point est souvent sous-estimé, alors qu\'il a un impact direct sur l\'expérience client.',
          'MonTablo est la solution de menu digital conçue pour les restaurateurs de Haute-Savoie : bilingue, simple à gérer, accessible instantanément par QR code sans application. L\'essai gratuit de 14 jours permet de tester la solution sans engagement, avec vos vrais plats et votre vraie carte.',
        ],
      },
    ],
  },
  {
    slug: 'menu-bilingue-chamonix',
    title: 'Chamonix Mont-Blanc : pourquoi votre menu doit être bilingue dès maintenant',
    description:
      'À Chamonix, la majorité de la clientèle est étrangère. Découvrez pourquoi un menu bilingue français/anglais est devenu indispensable pour les restaurants de la station.',
    date: '2026-05-26',
    readTime: '5 min',
    category: 'Local',
    keywords: [
      'menu bilingue chamonix',
      'menu digital chamonix',
      'restaurant chamonix menu anglais',
    ],
    content: [
      {
        heading: 'Chamonix, une ville internationale qui parle anglais',
        paragraphs: [
          'Chamonix-Mont-Blanc accueille chaque année environ 5 millions de visiteurs, dont une majorité vient de l\'étranger. La station est particulièrement connue des Britanniques — au point que certains appellent Chamonix "the fifth state of Britain" — mais aussi des Américains, des Australiens, des Néo-Zélandais, des Espagnols et des Italiens. En haute saison ski (janvier-mars), il n\'est pas rare que les anglophones représentent plus de la moitié de la clientèle d\'un restaurant.',
          'Dans ce contexte, proposer uniquement un menu en français n\'est plus viable. Vos clients étrangers commandent au hasard, s\'appuient sur Google Translate (avec des résultats parfois cocasses), ou choisissent simplement un autre restaurant dont le menu est en anglais. La perte de chiffre d\'affaires est réelle.',
        ],
      },
      {
        heading: 'Ce qu\'un menu bilingue change concrètement pour votre restaurant',
        paragraphs: [
          'Un menu bilingue français / anglais améliore l\'expérience client de manière immédiate et mesurable. Les clients étrangers commandent avec confiance, sans avoir besoin d\'appeler un serveur pour des traductions. Le temps moyen de commande diminue, le nombre d\'erreurs de plats baisse, et la satisfaction globale augmente — ce qui se traduit directement par de meilleures notes sur Google et TripAdvisor.',
          'Pour un restaurant de Chamonix, un menu bilingue est aussi un argument commercial : il signifie que vous accueillez activement la clientèle internationale, pas seulement que vous la tolérez. C\'est un signal de professionnalisme qui différencie votre établissement.',
        ],
      },
      {
        heading: 'Comment mettre en place un menu bilingue facilement avec MonTablo',
        paragraphs: [
          'MonTablo intègre nativement un menu bilingue français / anglais. Lors de la création de chaque plat, vous saisissez le nom et la description dans les deux langues. Vos clients voient un bouton de sélection de langue directement sur le menu digital et basculent d\'un clic. Aucune impression séparée, aucun menu anglais physique à gérer.',
          'La mise à jour est synchronisée : quand vous modifiez un prix ou ajoutez un plat, la modification est visible dans les deux langues instantanément. Pour les restaurants de Chamonix qui changent de carte entre la saison ski et l\'été, c\'est un gain de temps considérable.',
        ],
      },
    ],
  },
  {
    slug: 'menu-digital-station-ski',
    title: 'Menu digital pour station de ski : les spécificités des restaurants de montagne',
    description:
      'Saisonnalité, clientèle internationale, équipe réduite : les restaurants des stations de ski ont des besoins spécifiques. Voici pourquoi le menu digital s\'impose.',
    date: '2026-05-22',
    readTime: '6 min',
    category: 'Guide',
    keywords: [
      'menu digital station ski',
      'menu restaurant montagne',
      'menu digital haute-savoie station',
    ],
    content: [
      {
        heading: 'Les défis uniques de la restauration en station de ski',
        paragraphs: [
          'Un restaurant en station de ski n\'est pas un restaurant comme les autres. Il fonctionne à flux tendu pendant 4 à 5 mois par an, avec des pics d\'activité extrêmes les week-ends de vacances scolaires. L\'équipe est souvent saisonnière, les plats changent selon les disponibilités, et la clientèle est massivement internationale. Ces contraintes rendent la gestion d\'une carte papier particulièrement pénible.',
          'Réimprimer les menus à chaque changement de plat ou de prix représente un coût non négligeable et une perte de temps en pleine saison. Une ardoise est plus flexible mais illisible depuis l\'entrée et impossible à traduire. Le menu digital résout ces problèmes d\'un coup.',
        ],
      },
      {
        heading: 'Pourquoi la clientèle internationale des stations exige un menu digital',
        paragraphs: [
          'Les skieurs étrangers qui déjeunent dans une station alpine sont habitués, dans leurs propres pays, à un niveau de service digital élevé. En Grande-Bretagne, aux Pays-Bas ou en Australie, les QR codes sur table sont devenus la norme après 2020. Arriver dans un restaurant savoyard et se voir remettre un menu papier plastifié en français uniquement est perçu comme un manque de modernité.',
          'Un menu digital bilingue accessible par QR code est aujourd\'hui perçu comme un standard de qualité, pas comme un gadget. Il envoie le signal que votre restaurant est professionnel et attentif à l\'expérience client.',
        ],
      },
      {
        heading: 'Gestion de la saisonnalité : changer de carte en 5 minutes',
        paragraphs: [
          'Avec MonTablo, passer d\'une carte hiver à une carte été prend moins de 5 minutes. Vous désactivez les plats de saison hivernale (fondues, raclettes, tartiflettes) et activez les plats estivaux, ou vous créez une nouvelle carte complète et la publiez en un clic. Le QR code reste le même — vos clients scannent toujours le même support mais voient la nouvelle carte immédiatement.',
          'Pendant la saison, vous pouvez aussi désactiver un plat épuisé en quelques secondes depuis votre téléphone, même en plein service. Plus de clients déçus à qui on annonce que le plat qu\'ils ont commandé n\'est plus disponible.',
        ],
      },
      {
        heading: 'Comment MonTablo répond aux besoins des restaurants de station',
        paragraphs: [
          'MonTablo est conçu pour être géré par une seule personne, même sans compétence technique. L\'interface d\'administration est entièrement mobile : vous modifiez votre carte depuis votre téléphone entre deux services. Aucune formation, aucun matériel supplémentaire, aucun abonnement annuel bloquant.',
          'Pour les restaurants de Chamonix, Megève, La Clusaz ou Les Gets qui veulent moderniser leur expérience client sans investissement lourd, MonTablo propose un essai gratuit de 14 jours puis 29,99 € / mois sans engagement. Le coût est amorti dès le premier mois d\'économies d\'impression.',
        ],
      },
    ],
  },
  {
    slug: 'menu-saisonnier-fondue-raclette',
    title: 'Fondue, raclette, tartiflette : gérer un menu saisonnier sans se casser la tête',
    description:
      'Les spécialités savoyardes font la fierté des restaurants de Haute-Savoie — mais gérer un menu qui change avec les saisons est un casse-tête. Voici comment simplifier ça.',
    date: '2026-05-18',
    readTime: '5 min',
    category: 'Guide',
    keywords: [
      'menu saisonnier restaurant',
      'fondue raclette tartiflette menu digital',
      'menu restaurant haute-savoie saisonnier',
    ],
    content: [
      {
        heading: 'La cuisine savoyarde, un atout à double tranchant',
        paragraphs: [
          'La fondue, la raclette et la tartiflette sont les plats signatures des restaurants de Haute-Savoie. Ils attirent les touristes, remplissent les salles en hiver, et font l\'identité de la région. Mais ces spécialités sont fondamentalement saisonnières : personne ne commande une fondue en plein mois de juillet, et vos clients estivaux cherchent plutôt des salades fraîches et des grillades.',
          'Pour les restaurateurs, cette réalité impose de gérer deux cartes très différentes selon la saison. Avec des menus papier, cela signifie deux impressions complètes par an, parfois plus si les prix changent en cours de saison. Le coût et la logistique s\'accumulent rapidement.',
        ],
      },
      {
        heading: 'Comment le menu digital simplifie la gestion saisonnière',
        paragraphs: [
          'Un menu digital comme MonTablo vous permet de modifier votre carte en temps réel, sans impression et sans frais supplémentaires. Pour le passage de l\'hiver à l\'été, vous désactivez simplement les plats de fondues et raclettes et activez vos plats estivaux. L\'opération prend 5 minutes depuis votre téléphone.',
          'Vous pouvez aussi gérer des variations intermédiaires : un plat de fondue disponible uniquement le week-end, une tartiflette au menu uniquement dès octobre, un fromage local disponible selon l\'approvisionnement. Ces ajustements qui prenaient un temps considérable avec des menus papier se font désormais en quelques taps.',
        ],
      },
      {
        heading: 'Présenter les spécialités savoyardes à la clientèle internationale',
        paragraphs: [
          'La fondue, la raclette et la tartiflette ne s\'expliquent pas d\'elles-mêmes à un client britannique ou américain qui n\'a jamais visité les Alpes. Un menu digital bien rédigé peut inclure une courte description de chaque spécialité — les ingrédients, le mode de préparation, l\'ambiance — qui donne envie de commander et évite les mauvaises surprises.',
          'MonTablo vous permet d\'ajouter des descriptions détaillées pour chaque plat, dans les deux langues. Pour un restaurant de Haute-Savoie, c\'est une opportunité de raconter l\'histoire de votre cuisine et de valoriser vos produits locaux auprès d\'une clientèle internationale qui ne les connaît pas encore.',
        ],
      },
    ],
  },
  {
    slug: 'menu-digital-restaurant-haute-savoie',
    title: 'Restaurant en Haute-Savoie : comment gérer un menu pour touristes internationaux',
    description:
      'La Haute-Savoie accueille des millions de touristes étrangers chaque année. Guide pratique pour adapter votre menu digital à cette clientèle internationale.',
    date: '2026-05-14',
    readTime: '6 min',
    category: 'Local',
    keywords: [
      'menu digital restaurant haute-savoie',
      'menu touristes internationaux haute-savoie',
      'restaurant haute-savoie menu bilingue',
    ],
    content: [
      {
        heading: 'La Haute-Savoie, carrefour du tourisme alpin européen',
        paragraphs: [
          'La Haute-Savoie est le département français le plus visité après Paris, avec plus de 10 millions de nuitées touristiques par an. Annecy, Chamonix, Megève, Thonon-les-Bains, Évian-les-Bains : chaque ville attire une clientèle internationale différente, mais toutes partagent la même réalité — une majorité de visiteurs étrangers pendant les saisons hautes.',
          'Pour les restaurateurs du département, cette donnée change tout : le menu, le service, et l\'expérience client doivent être pensés pour des personnes qui ne parlent pas nécessairement le français. Cela commence par le menu lui-même.',
        ],
      },
      {
        heading: 'Pourquoi un menu uniquement en français est un handicap en Haute-Savoie',
        paragraphs: [
          'Un client anglophone ou germanophone face à un menu uniquement en français a trois options : appeler le serveur pour une traduction (pénible pour lui et pour vous), sortir son téléphone pour utiliser Google Translate (expérience médiocre), ou choisir un concurrent dont le menu est accessible. La troisième option est plus fréquente qu\'on ne le pense.',
          'Les avis Google et TripAdvisor des restaurants de Haute-Savoie font régulièrement mention du manque de menu en anglais comme point négatif. À l\'inverse, les restaurants qui proposent un menu bilingue reçoivent souvent des commentaires positifs de la clientèle internationale sur cet aspect.',
        ],
      },
      {
        heading: 'MonTablo : la solution de menu digital pour les restaurants de Haute-Savoie',
        paragraphs: [
          'MonTablo est une solution de menu digital avec QR code conçue pour les restaurants français qui accueillent une clientèle internationale. Le menu est bilingue français / anglais nativement, accessible par QR code sans application à télécharger, et mis à jour en temps réel.',
          'Pour les restaurants de Haute-Savoie, MonTablo est disponible immédiatement avec un essai gratuit de 14 jours. L\'ensemble de la solution — création du menu, génération du QR code, publication — se gère depuis un navigateur ou un téléphone, sans compétence technique.',
        ],
      },
      {
        heading: 'Résultats concrets pour les restaurants qui passent au menu digital',
        paragraphs: [
          'Les restaurateurs qui adoptent un menu digital rapportent plusieurs bénéfices immédiats : moins d\'erreurs de commande (les clients voient exactement ce qu\'ils commandent), service plus rapide (les clients parcourent la carte pendant que vous les installez), et meilleure satisfaction des clients internationaux.',
          'Sur le long terme, un menu digital bien géré contribue à améliorer la réputation en ligne du restaurant. Les clients étrangers, qui laissent davantage d\'avis en ligne que la clientèle locale, mentionnent plus souvent l\'accessibilité du menu comme critère de satisfaction.',
        ],
      },
    ],
  },
  {
    slug: 'menu-bilingue-annecy',
    title: 'Annecy : nos conseils pour digitaliser votre restaurant au bord du lac',
    description:
      'Annecy est l\'une des villes les plus touristiques de France. Guide pratique pour les restaurateurs annéciens qui veulent adopter le menu digital.',
    date: '2026-05-10',
    readTime: '5 min',
    category: 'Local',
    keywords: [
      'menu digital restaurant annecy',
      'digitaliser restaurant annecy',
      'menu qr code annecy',
    ],
    content: [
      {
        heading: 'Annecy, ville touristique premium : les attentes sont élevées',
        paragraphs: [
          'Annecy est régulièrement classée parmi les plus belles villes de France. Son lac, son vieux quartier, ses restaurants gastronomiques et ses brasseries attirent plus de 3 millions de visiteurs par an. Cette clientèle — suisse, italienne, britannique, parisienne — est habituée à un niveau de service élevé et compare votre restaurant avec les meilleurs établissements qu\'elle a fréquentés.',
          'Dans ce contexte, l\'expérience client commence dès la consultation du menu. Un menu digital propre, bilingue et accessible en deux secondes envoie un signal fort : vous êtes un établissement professionnel qui respecte ses clients. Un menu papier froissé ou une ardoise difficile à lire, c\'est l\'inverse.',
        ],
      },
      {
        heading: 'Les spécificités des restaurants d\'Annecy à prendre en compte',
        paragraphs: [
          'Les restaurants du Vieux-Annecy et des bords du lac font face à des contraintes particulières : terrasses en été avec beaucoup de clients internationaux, menus qui changent selon la saison et les arrivages, et une concurrence intense entre établissements dans un espace géographique réduit. La réactivité et la qualité de l\'expérience sont des facteurs différenciants.',
          'Un menu digital MonTablo permet de modifier sa carte en temps réel — parfait pour les restaurants qui ajustent leur offre selon les produits frais du marché d\'Annecy ou les arrivages locaux. Le menu bilingue est indispensable pour la clientèle du Vieux-Annecy où les touristes étrangers sont omniprésents en juillet-août.',
        ],
      },
      {
        heading: 'Comment démarrer avec MonTablo à Annecy',
        paragraphs: [
          'Démarrer avec MonTablo prend moins de 5 minutes. Vous créez votre compte, ajoutez vos plats et catégories (entrées, plats, desserts, boissons), personnalisez les couleurs aux couleurs de votre restaurant, et générez votre QR code. Vous pouvez l\'imprimer sur des chevalets de table ou des autocollants et le poser sur vos tables dès le service suivant.',
          'L\'essai gratuit de 14 jours est sans carte bancaire. Si MonTablo correspond à vos besoins — et pour les restaurants d\'Annecy, il devrait — vous continuez à 29,99 € / mois ou 26,99 € / mois en annuel. Plats illimités, mises à jour illimitées.',
        ],
      },
    ],
  },
```

> **Note :** Ces 6 entrées doivent être insérées **avant** l'entrée existante `creer-menu-digital-restaurant` dans le tableau `posts`. Trouver la ligne `const posts: BlogPost[] = [` (ligne ~17) et insérer après le crochet ouvrant `[`.

- [ ] **Step 2: Vérifier que le blog compile et que les slugs sont uniques**

```bash
cd /Users/tiago/Montablo && npx tsc --noEmit 2>&1 | head -20
```

Attendu : aucune erreur TypeScript.

- [ ] **Step 3: Build check**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -20
```

Attendu : `✓ Compiled successfully`, 18 articles de blog générés.

- [ ] **Step 4: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat(seo): add 6 regional blog posts for Haute-Savoie"
```

---

## Task 6: Créer `public/llms.txt`

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Créer le fichier GEO**

Créer `public/llms.txt` :

```
# MonTablo

MonTablo est une solution SaaS de menu digital avec QR code pour les restaurants en France.

## Produit

MonTablo permet aux restaurants de créer et gérer leur menu digital accessible par QR code. Les clients scannent le QR code depuis leur smartphone et accèdent instantanément au menu, sans télécharger d'application. Le menu est bilingue français / anglais nativement.

## Fonctionnalités principales

- Menu digital accessible par QR code sans application
- Menu bilingue français / anglais intégré
- Menu du jour et promotions temporaires
- Mises à jour en temps réel depuis un smartphone
- QR code personnalisable aux couleurs du restaurant
- Import de carte existante par intelligence artificielle
- Design personnalisable (couleurs, typographie)
- Plats et catégories illimités

## Tarifs

- Essai gratuit : 14 jours, sans carte bancaire
- Mensuel : 29,99 € / mois, sans engagement
- Annuel : 26,99 € / mois (323,89 € / an)

## Marchés cibles

MonTablo est conçu pour tous les types de restaurants français : bistrots, brasseries, pizzerias, restaurants gastronomiques, food trucks, bars à cocktails, hôtels-restaurants.

### Présence régionale — Haute-Savoie (74)

MonTablo est particulièrement adapté aux restaurants de Haute-Savoie, région qui accueille plus de 10 millions de touristes internationaux par an. La solution répond aux besoins spécifiques de la région :

- Menu bilingue FR/EN pour les stations de ski (Chamonix, Megève, La Clusaz) et les bords de lac (Annecy, Thonon-les-Bains, Évian-les-Bains)
- Gestion simple des menus saisonniers (cuisine savoyarde en hiver, carte estivale)
- Interface adaptée aux petites équipes saisonnières

Villes couvertes : Annecy, Chamonix, Annemasse, Thonon-les-Bains, Megève, Cluses, Sallanches, La Clusaz, Évian-les-Bains, Bonneville.

## URLs importantes

- Accueil : https://www.montablo.com
- Fonctionnalités : https://www.montablo.com/fonctionnalites
- Tarifs : https://www.montablo.com/tarifs
- Blog : https://www.montablo.com/blog
- Menu digital restaurant (pillar) : https://www.montablo.com/menu-digital-restaurant
- QR code restaurant (pillar) : https://www.montablo.com/qr-code-restaurant
- Solutions Haute-Savoie : https://www.montablo.com/solutions/haute-savoie

## Contact

Site : https://www.montablo.com
Inscription : https://www.montablo.com/signup
```

- [ ] **Step 2: Vérifier que le fichier est accessible en dev**

```bash
cd /Users/tiago/Montablo && ls public/llms.txt
```

Attendu : le fichier existe dans `public/`.

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "feat(geo): add llms.txt for AI crawler visibility"
```

---

## Task 7: Mettre à jour `src/app/sitemap.ts`

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Importer `VILLES` et ajouter les entrées hub + spokes dans le tableau `staticPages`**

Dans `src/app/sitemap.ts`, ajouter l'import en haut du fichier :

```typescript
import { VILLES } from '@/data/haute-savoie'
```

Puis dans le tableau `staticPages`, ajouter après les solution pages existantes (après la ligne `solutions/bar-cocktail`) :

```typescript
    // Haute-Savoie hub
    {
      url: `${base}/solutions/haute-savoie`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // Haute-Savoie spokes
    ...VILLES.map((ville) => ({
      url: `${base}/solutions/haute-savoie/${ville.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
```

- [ ] **Step 2: Build check final**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -30
```

Attendu : `✓ Compiled successfully`, aucune erreur TypeScript, toutes les pages générées.

- [ ] **Step 3: Commit final**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add Haute-Savoie hub and spoke pages to sitemap"
```

---

## Task 8: Push et vérification déploiement

- [ ] **Step 1: Push vers main pour déclencher le déploiement Vercel**

```bash
git push origin main
```

- [ ] **Step 2: Vérifier que les nouvelles pages sont accessibles en production**

Attendre 2-3 minutes après le push, puis vérifier :

```bash
curl -s -o /dev/null -w "%{http_code}" https://www.montablo.com/solutions/haute-savoie
```

Attendu : `200`

```bash
curl -s -o /dev/null -w "%{http_code}" https://www.montablo.com/solutions/haute-savoie/annecy
```

Attendu : `200`

```bash
curl -s -o /dev/null -w "%{http_code}" https://www.montablo.com/llms.txt
```

Attendu : `200`

```bash
curl -s -o /dev/null -w "%{http_code}" https://www.montablo.com/blog/menu-digital-restaurant-haute-savoie
```

Attendu : `200`
