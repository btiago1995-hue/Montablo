export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  keywords: string[]
  content: BlogSection[]
}

export interface BlogSection {
  heading: string
  paragraphs: string[]
}

const posts: BlogPost[] = [
  {
    slug: 'creer-menu-digital-restaurant',
    title: 'Comment creer un menu digital pour votre restaurant en 5 minutes',
    description:
      'Guide pratique pour creer votre premier menu digital. De l\'inscription a la generation du QR code, tout ce qu\'il faut savoir pour digitaliser votre carte.',
    date: '2026-04-21',
    readTime: '5 min',
    category: 'Guide',
    keywords: ['creer menu digital', 'menu digital restaurant', 'comment creer menu qr code'],
    content: [
      {
        heading: 'Pourquoi passer au menu digital ?',
        paragraphs: [
          'Le menu digital n\'est plus une tendance passagere. C\'est devenu un standard dans la restauration moderne. Vos clients s\'attendent a pouvoir scanner un QR code et consulter votre carte sur leur telephone.',
          'Au-dela du confort client, le menu digital vous fait gagner du temps et de l\'argent : plus de reimpressions a chaque changement de prix, plus de cartes abimees a remplacer, et une mise a jour instantanee de vos plats.',
        ],
      },
      {
        heading: 'Etape 1 : Creez votre compte',
        paragraphs: [
          'L\'inscription sur MonTablo prend moins de 30 secondes. Vous n\'avez besoin que d\'une adresse email et du nom de votre restaurant. Aucune carte bancaire n\'est requise pour l\'essai gratuit de 14 jours.',
        ],
      },
      {
        heading: 'Etape 2 : Ajoutez vos plats',
        paragraphs: [
          'Depuis votre tableau de bord, ajoutez vos categories (entrees, plats, desserts, boissons...) puis vos plats avec leur nom, description et prix. Vous pouvez aussi ajouter des photos pour les plats phares.',
          'Astuce : si vous avez deja une carte papier, utilisez notre fonctionnalite d\'import par IA. Photographiez simplement votre carte, et l\'IA extrait automatiquement tous vos plats.',
        ],
      },
      {
        heading: 'Etape 3 : Personnalisez votre menu',
        paragraphs: [
          'Choisissez la couleur primaire de votre menu pour qu\'elle corresponde a l\'identite visuelle de votre restaurant. Le design est automatiquement soigne et professionnel.',
        ],
      },
      {
        heading: 'Etape 4 : Generez et imprimez votre QR code',
        paragraphs: [
          'Votre QR code est genere automatiquement. Telechargez-le en haute resolution, puis imprimez-le. Vous pouvez le placer sur vos tables, a l\'entree, ou sur vos supports marketing.',
          'Et voila ! Votre menu digital est pret. Vos clients n\'ont plus qu\'a scanner pour decouvrir votre carte.',
        ],
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}
