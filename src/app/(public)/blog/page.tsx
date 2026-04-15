import Link from 'next/link'
import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — MonTablo | Conseils pour digitaliser votre restaurant',
  description:
    'Guides pratiques, conseils et tendances pour les restaurateurs qui veulent digitaliser leur carte avec un menu digital et QR code.',
  openGraph: {
    title: 'Blog — MonTablo',
    description:
      'Guides pratiques et conseils pour digitaliser votre restaurant.',
  },
}

export default function BlogPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Blog', url: `${base}/blog` },
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
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Fonctionnalites
            </Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Tarifs
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
      <div className="max-w-[780px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Blog</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[780px] mx-auto px-6 pt-8 pb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">Blog</h1>
        <p className="text-lg text-muted leading-relaxed">
          Guides pratiques et conseils pour digitaliser votre restaurant.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-muted text-center py-12">
            Les premiers articles arrivent bientot. Revenez vite !
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group bg-white border border-border/50 rounded-[16px] p-8 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[12px] font-medium text-accent-dark bg-accent/10 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[12px] text-muted/60">{post.readTime} de lecture</span>
                  <span className="text-[12px] text-muted/60">
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-[15px] text-muted leading-relaxed mb-4">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
                  Lire l&apos;article
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

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
