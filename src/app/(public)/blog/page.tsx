import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { PublicNav, PublicFooter, EYEBROW } from '@/components/public/site-chrome'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Le carnet MonTablo — articles & retours d’expérience',
  description:
    'Articles, retours d’expérience et conseils pour les restaurants du Genevois français.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Le carnet MonTablo',
    description:
      'Articles, retours d’expérience et conseils pour les restaurants du Genevois français.',
  },
}

export default function BlogPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const posts = getAllPosts()

  return (
    <div className="bg-background min-h-screen text-foreground font-sans antialiased">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Blog', url: `${base}/blog` },
        ])}
      />

      <PublicNav ctaLabel="blog_nav_essai" />

      {/* Hero */}
      <section className="max-w-[860px] mx-auto px-8 pt-16 sm:pt-20 pb-10">
        <span className={EYEBROW}>Blog</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.022em] text-balance">
          Le carnet <em className="italic font-medium text-primary-light">MonTablo</em>.
        </h1>
        <p className="text-[18px] text-muted leading-relaxed mt-5 max-w-[620px]">
          Articles, retours d’expérience et conseils pour les restaurants du Genevois français.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-[860px] mx-auto px-8 pb-24">
        {posts.length === 0 ? (
          <p className="text-muted text-center py-12">
            Les premiers articles arrivent bientôt. Revenez vite.
          </p>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-border rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.08)] transition"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary-light">
                    {post.category}
                  </span>
                  <span className="text-[12px] text-muted">{post.readTime} de lecture</span>
                  <span className="text-[12px] text-muted">
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="font-serif text-[22px] sm:text-[26px] text-primary font-medium leading-tight mb-2">
                  {post.title}
                </h2>
                <p className="text-[15px] text-muted leading-relaxed mb-4">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-light group-hover:gap-2.5 transition-all">
                  Lire l&apos;article →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
