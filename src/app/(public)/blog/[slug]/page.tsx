import Link from 'next/link'
import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
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
    title: `${post.title} — MonTablo Blog`,
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
    author: {
      '@type': 'Organization',
      name: 'MonTablo',
      url: base,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MonTablo',
      url: base,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${base}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Blog', url: `${base}/blog` },
          { name: post.title, url: `${base}/blog/${post.slug}` },
        ])}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Blog
            </Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Tarifs
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
      <div className="max-w-[780px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-muted transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-[780px] mx-auto px-6 pt-8 pb-24">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] font-medium text-accent-dark bg-accent/10 px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-[12px] text-muted/60">{post.readTime} de lecture</span>
            <time className="text-[12px] text-muted/60" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="space-y-8">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] text-muted leading-relaxed mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 border border-border rounded-[16px] py-10 px-8 text-center bg-gradient-to-b from-white to-background">
          <h3 className="font-serif text-2xl text-foreground mb-2">
            Pret a creer votre menu digital ?
          </h3>
          <p className="text-muted mb-6">
            Essayez MonTablo gratuitement pendant 14 jours.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
          >
            Commencer l&apos;essai gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-[13px] font-medium text-muted/60 mb-3">A lire aussi</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/fonctionnalites" className="text-[14px] text-primary hover:underline">
              Toutes les fonctionnalites
            </Link>
            <span className="text-border">|</span>
            <Link href="/tarifs" className="text-[14px] text-primary hover:underline">
              Voir les tarifs
            </Link>
            <span className="text-border">|</span>
            <Link href="/faq" className="text-[14px] text-primary hover:underline">
              Questions frequentes
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
              <span className="font-serif text-[15px] text-primary">MonTablo</span>
            </div>
            <p className="text-xs text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted/50">
            <Link href="/mentions-legales" className="hover:text-muted transition-colors">Mentions legales</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cgu" className="hover:text-muted transition-colors">CGU</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/confidentialite" className="hover:text-muted transition-colors">Confidentialite</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cookies" className="hover:text-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
