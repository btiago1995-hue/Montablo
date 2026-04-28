import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { PublicNav, PublicFooter, EYEBROW, BTN_PRIMARY } from '@/components/public/site-chrome'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Article introuvable' }

  return {
    title: `${post.title} — MonTablo`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'MonTablo', url: base },
    publisher: { '@type': 'Organization', name: 'MonTablo', url: base },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  }

  const isLocal =
    post.category === 'Local' ||
    post.slug.includes('haute-savoie') ||
    post.slug.includes('chamonix') ||
    post.slug.includes('annecy') ||
    post.slug.includes('station-ski') ||
    post.slug.includes('fondue')

  return (
    <div className="bg-background min-h-screen text-foreground font-sans antialiased">
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Blog', url: `${base}/blog` },
          { name: post.title, url: `${base}/blog/${post.slug}` },
        ])}
      />

      <PublicNav ctaLabel="blog_post_nav_essai" />

      <article className="max-w-[760px] mx-auto px-8 pt-12 sm:pt-16 pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-light hover:gap-2.5 transition-all mb-8"
        >
          ← Retour au carnet
        </Link>

        <header className="mb-10 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className={`${EYEBROW} mb-0`}>{post.category}</span>
            <span className="text-[12px] text-muted">{post.readTime} de lecture</span>
            <time className="text-[12px] text-muted" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
          <h1 className="font-serif font-medium text-primary text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.018em] text-balance">
            {post.title}
          </h1>
        </header>

        <div className="space-y-10">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-[24px] sm:text-[28px] text-primary font-medium leading-tight mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[16px] text-foreground/85 leading-[1.7] mb-4 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white border border-border rounded-3xl py-12 px-8 text-center">
          <h3 className="font-serif text-[26px] text-primary font-medium leading-tight mb-3">
            Prêt à créer votre menu digital ?
          </h3>
          <p className="text-[16px] text-muted mb-7 max-w-md mx-auto">
            Essayez MonTablo gratuitement pendant 14 jours. Sans carte bancaire.
          </p>
          <Link href="/signup" className={BTN_PRIMARY}>
            Commencer l&apos;essai gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLocal && (
          <div className="mt-10 bg-surface border border-border rounded-2xl px-6 py-5">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary-light mb-2">
              Solution régionale
            </p>
            <Link
              href="/solutions/haute-savoie"
              className="group inline-flex items-center gap-2 font-serif text-[19px] text-primary font-medium hover:text-primary-light transition"
            >
              Menu digital pour restaurants en Haute-Savoie
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted mb-3">
            À lire aussi
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/fonctionnalites" className="text-[14px] font-semibold text-primary-light hover:underline">
              Toutes les fonctionnalités
            </Link>
            <Link href="/tarifs" className="text-[14px] font-semibold text-primary-light hover:underline">
              Voir les tarifs
            </Link>
            <Link href="/faq" className="text-[14px] font-semibold text-primary-light hover:underline">
              Questions fréquentes
            </Link>
          </div>
        </div>
      </article>

      <PublicFooter />
    </div>
  )
}
