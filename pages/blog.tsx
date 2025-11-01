import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../components/ZohoSalesIQ.js'), { ssr: false });

// Blog-Artikel Daten (später aus CMS oder JSON-Datei)
const blogPosts = [
  {
    id: 1,
    slug: 'balkonanbau-genehmigung-baurecht-2025',
    title: 'Balkonanbau Genehmigung: Baurecht & Vorschriften 2025 – Der komplette Leitfaden',
    teaser: 'Balkon nachträglich anbauen: Alles zu Baugenehmigung, Baurecht & Kosten ✓ 16 Bundesländer ✓ Genehmigungsfreistellung erklärt ✓ Aus 850+ Projekten',
    date: '2025-01-15',
    readTime: '25 Min.',
    author: 'Martin Beyer, BALKONFUCHS',
    thumbnail: '/images/blog/genehmigung-checkliste.jpg',
    category: 'Genehmigung',
    published: true
  },
  {
    id: 2,
    slug: 'balkon-groesse-ohne-genehmigung',
    title: 'Balkon ohne Genehmigung 2025: Wie groß darf er sein? [16 Bundesländer-Guide]',
    teaser: 'Wie groß darf Ihr Balkon ohne Genehmigung sein? Alle 16 Bundesländer im Vergleich + Genehmigungscheck in 60 Sek. ✓ Stand 2025',
    date: '2025-11-01',
    readTime: '18 Min.',
    author: 'Martin Beyer, BALKONFUCHS',
    thumbnail: '/images/blog/balkon-groesse.jpg',
    category: 'Genehmigung',
    published: true
  },
  {
    id: 3,
    slug: 'balkon-bauantrag-genehmigung',
    title: 'Balkon Bauantrag 2025: Diese Unterlagen brauchen Sie [Komplette Checkliste]',
    teaser: 'Balkon Bauantrag 2025: Alle Unterlagen, Schritt-für-Schritt Anleitung & Kosten ✓ Bundesländer-spezifisch ✓ Checkliste zum Download',
    date: '2025-11-01',
    readTime: '16 Min.',
    author: 'Martin Beyer, BALKONFUCHS',
    thumbnail: '/images/blog/bauantrag-checkliste.jpg',
    category: 'Genehmigung',
    published: true
  },
  {
    id: 4,
    slug: 'balkon-genehmigung-checkliste',
    title: 'Balkon Genehmigung: Die komplette Checkliste für 2025',
    teaser: 'Erfahren Sie, wann Sie eine Genehmigung für Ihren Balkon benötigen und welche Dokumente Sie einreichen müssen. Schritt-für-Schritt Anleitung...',
    date: '2025-01-14',
    readTime: '8 Min.',
    author: 'BALKONFUCHS Team',
    thumbnail: '/images/blog/genehmigung-checkliste-2.jpg',
    category: 'Genehmigung',
    published: false
  },
  {
    id: 5,
    slug: 'balkon-kosten-faktoren',
    title: 'Was kostet ein Balkon wirklich? Alle Kostenfaktoren im Überblick',
    teaser: 'Entdecken Sie die wichtigsten Faktoren, die den Preis Ihres Balkon-Projekts beeinflussen. Von Materialkosten bis hin zu regionalen Unterschieden...',
    date: '2025-01-10',
    readTime: '12 Min.',
    author: 'BALKONFUCHS Team',
    thumbnail: '/images/blog/balkon-kosten.jpg',
    category: 'Kosten',
    published: false
  },
  {
    id: 6,
    slug: 'balkon-typen-vor-und-nachteile',
    title: 'Balkon-Typen im Vergleich: Vorstellbalkon, Hängebalkon & mehr',
    teaser: 'Welcher Balkon-Typ ist der richtige für Ihr Haus? Wir vergleichen alle Varianten und zeigen Ihnen Vor- und Nachteile sowie Preisspannen...',
    date: '2025-01-05',
    readTime: '10 Min.',
    author: 'BALKONFUCHS Team',
    thumbnail: '/images/blog/balkon-typen.jpg',
    category: 'Planung',
    published: false
  },
  {
    id: 5,
    slug: 'balkon-foerderung-2025',
    title: 'Balkon-Förderung 2025: Diese Zuschüsse & KfW-Programme gibt es',
    teaser: 'Balkon-Förderung 2025: KfW-Zuschüsse bis 20%, Länder-Programme & BAFA ✓ Alle Förderprogramme ✓ Antragsstellung ✓',
    date: '2025-11-01',
    readTime: '17 Min.',
    author: 'Martin Beyer, BALKONFUCHS',
    thumbnail: '/images/blog/foerderung.jpg',
    category: 'Förderung',
    published: true
  },
  {
    id: 8,
    slug: 'balkon-bauzeit-planung',
    title: 'Bauzeit für Balkon: So planen Sie den optimalen Baustart',
    teaser: 'Von der Genehmigung bis zur Fertigstellung: Erfahren Sie, wie lange Ihr Balkon-Projekt wirklich dauert und wie Sie die Bauzeit optimal planen...',
    date: '2024-12-15',
    readTime: '7 Min.',
    author: 'BALKONFUCHS Team',
    thumbnail: '/images/blog/bauzeit.jpg',
    category: 'Planung',
    published: false
  }
];

const Blog = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Head>
        <title>BALKONFUCHS Blog - Ratgeber, Tipps & News zum Balkonbau</title>
        <meta name="description" content="BALKONFUCHS Blog: Wissenswertes zum Balkonbau, Genehmigungen, Kosten, Planung und mehr. Praktische Ratgeber von Experten für Ihr Balkon-Projekt." />
        <meta name="keywords" content="balkon blog, balkon ratgeber, balkon genehmigung, balkon kosten, balkon planung, balkon tipps" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="BALKONFUCHS Blog - Ratgeber, Tipps & News zum Balkonbau" />
        <meta property="og:description" content="Wissenswertes zum Balkonbau, Genehmigungen, Kosten, Planung und mehr. Praktische Ratgeber von Experten." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/blog" />
        <meta property="og:image" content="https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BALKONFUCHS Blog - Ratgeber zum Balkonbau" />
        <meta property="og:site_name" content="BALKONFUCHS" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BALKONFUCHS Blog - Ratgeber, Tipps & News zum Balkonbau" />
        <meta name="twitter:description" content="Wissenswertes zum Balkonbau, Genehmigungen, Kosten, Planung und mehr. Praktische Ratgeber von Experten." />
        <meta name="twitter:image" content="https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png" />
        <link rel="canonical" href="https://balkonfuchs.de/blog" />
        
        {/* Strukturierte Daten */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "BALKONFUCHS Blog",
              "url": "https://balkonfuchs.de/blog",
              "description": "Ratgeber, Tipps und News zum Balkonbau",
              "publisher": {
                "@type": "Organization",
                "name": "BALKONFUCHS GmbH",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png"
                }
              },
              "blogPost": blogPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "datePublished": post.date,
                "author": {
                  "@type": "Organization",
                  "name": post.author
                },
                "url": `https://balkonfuchs.de/blogs/post/${post.slug}`,
                "image": post.thumbnail ? `https://balkonfuchs.de${post.thumbnail}` : "https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png",
                "description": post.teaser
              }))
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 py-16 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                BALKONFUCHS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Blog</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Wissenswertes zum Balkonbau: Ratgeber, Tipps, News und Expertenwissen für Ihr Balkon-Projekt
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...blogPosts].filter(post => post.published !== false).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <Link href={`/blogs/post/${post.slug}`}>
                    <a className="block relative h-56 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 overflow-hidden group/thumbnail">
                      {/* Category Icon based on category */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-24 h-24">
                          {/* Gradient Background Circle */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-xl"></div>
                          {/* Icon Container */}
                          <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500/40 to-red-500/40 rounded-full flex items-center justify-center border-2 border-orange-500/30 group-hover/thumbnail:scale-110 transition-transform duration-300">
                            {/* Category-specific Icons */}
                            {post.category === 'Genehmigung' && (
                              <span className="text-5xl">🏛️</span>
                            )}
                            {post.category === 'Kosten' && (
                              <span className="text-5xl">💰</span>
                            )}
                            {post.category === 'Planung' && (
                              <span className="text-5xl">📐</span>
                            )}
                            {post.category === 'Förderung' && (
                              <span className="text-5xl">💵</span>
                            )}
                            {!['Genehmigung', 'Kosten', 'Planung', 'Förderung'].includes(post.category) && (
                              <span className="text-5xl">📝</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Thumbnail Image (if available) - overlays the icon */}
                      {post.thumbnail && (
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover/thumbnail:scale-105 transition-transform duration-300 opacity-90"
                          loading="lazy"
                          onError={(e) => {
                            // Hide image if it fails to load, show icon instead
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      
                      {/* Gradient Overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
                    </a>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/blogs/post/${post.slug}`}>
                      <a>
                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </a>
                    </Link>

                    {/* Teaser */}
                    <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
                      {post.teaser}
                    </p>

                    {/* Read More */}
                    <Link href={`/blogs/post/${post.slug}`}>
                      <a className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold group/link">
                        Weiterlesen
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-16 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Bleiben Sie auf dem Laufenden
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Erhalten Sie die neuesten Artikel und Tipps zum Balkonbau direkt in Ihr Postfach.
              </p>
              <a
                href="/kontakt/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Newsletter abonnieren
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <ZohoSalesIQ />
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Blog;

