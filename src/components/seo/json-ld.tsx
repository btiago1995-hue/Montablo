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
        name: 'Essentiel — Mensuel',
        price: '19.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '19.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1M',
          valueAddedTaxIncluded: false,
        },
        description: 'Essentiel mensuel — 19€ HT/mois, sans engagement',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Essentiel — Annuel',
        price: '205.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '205.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1Y',
          valueAddedTaxIncluded: false,
        },
        description: 'Essentiel annuel — 205€ HT/an (équivalent 17,10€/mois, -10%)',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro — Mensuel',
        price: '39.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '39.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1M',
          valueAddedTaxIncluded: false,
        },
        description: 'Pro mensuel — 39€ HT/mois, 14 jours d\'essai gratuit',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro — Annuel',
        price: '421.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '421.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1Y',
          valueAddedTaxIncluded: false,
        },
        description: 'Pro annuel — 421€ HT/an (équivalent 35,10€/mois, -10%)',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Premium — Sur devis',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
        },
        description: 'Premium pour groupes et chaînes — tarification sur mesure',
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

export function menuPageJsonLd({
  restaurant,
  categories,
  items,
}: {
  restaurant: { name: string; slug: string }
  categories: { id: string; name_fr: string }[]
  items: { name_fr: string; description_fr: string | null; price: number; category_id: string | null }[]
}) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const menuUrl = `${base}/menu/${restaurant.slug}`

  const sections = categories
    .map((cat) => {
      const catItems = items.filter((item) => item.category_id === cat.id)
      if (catItems.length === 0) return null
      return {
        '@type': 'MenuSection',
        name: cat.name_fr,
        hasMenuItem: catItems.map((item) => ({
          '@type': 'MenuItem',
          name: item.name_fr,
          ...(item.description_fr ? { description: item.description_fr } : {}),
          offers: {
            '@type': 'Offer',
            price: item.price.toFixed(2),
            priceCurrency: 'EUR',
          },
        })),
      }
    })
    .filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    url: menuUrl,
    hasMenu: {
      '@type': 'Menu',
      name: `Menu — ${restaurant.name}`,
      url: menuUrl,
      ...(sections.length > 0 ? { hasMenuSection: sections } : {}),
    },
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
