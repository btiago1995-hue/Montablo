export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function homepageJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MonTablo',
      url: base,
      logo: `${base}/icon-512.png`,
      description:
        'MonTablo est une plateforme SaaS qui permet aux restaurants de créer et gérer leur menu digital avec QR code.',
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'MonTablo',
      url: base,
      description:
        'Créez votre menu digital interactif en quelques minutes. QR code, mises à jour en temps réel, design premium.',
      inLanguage: 'fr',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MonTablo',
      url: base,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Menu digital pour restaurants avec QR code, mises à jour en temps réel, menu du jour, promotions et design personnalisable.',
      offers: {
        '@type': 'Offer',
        price: '26.99',
        priceCurrency: 'EUR',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Abonnement annuel — 14 jours d\'essai gratuit',
      },
      featureList: [
        'Plats et catégories illimités',
        'Menu du jour en un clic',
        'Promotions temporaires',
        'QR code personnalisé',
        'Bilingue français / anglais',
        'Import de menu par IA',
        'Mises à jour en temps réel',
      ],
    },
  ]
}

export function pricingJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MonTablo',
    url: `${base}/tarifs`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        name: 'Mensuel',
        price: '29.99',
        priceCurrency: 'EUR',
        billingIncrement: 'P1M',
        description: 'Sans engagement — 14 jours d\'essai gratuit',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Annuel',
        price: '26.99',
        priceCurrency: 'EUR',
        billingIncrement: 'P1M',
        description: '323,89 € facturé annuellement — 14 jours d\'essai gratuit',
        availability: 'https://schema.org/InStock',
      },
    ],
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
