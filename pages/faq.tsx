import React from 'react';
import Head from 'next/head';
import { ArrowLeft, Home, HelpCircle, Calculator, Calendar, Zap, Shield, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = () => {
  const faqData = [
    {
      category: "Balkon-Kalkulator",
      icon: "🧮",
      color: "orange",
      questions: [
        {
          question: "Wie genau ist der BALKONFUCHS Kalkulator?",
          answer: "Unser Balkon-Kalkulator berücksichtigt über 40 verschiedene Kostenfaktoren und erstellt eine präzise Kostenschätzung für Ihr Balkonprojekt. Die Genauigkeit liegt üblicherweise bei ±15% im Vergleich zu finalen Angeboten unserer Partner. Allerdings können erschwerende Faktoren, wie z.B. Straßensperrungen oder aufwändigere Montagen zu einer Abweichung der Preise führen.",
          keywords: ["Balkon Kosten", "Balkon Kalkulator", "Balkon Preis", "Kostenschätzung Balkon"],
          cta: {
            text: "Jetzt kostenlos kalkulieren",
            link: "/kalkulator/",
            icon: "🧮"
          }
        },
        {
          question: "Welche Kosten sind im Balkon-Kalkulator enthalten?",
          answer: "Der Kalkulator berücksichtigt übliche Materialkosten, Arbeitslohn, Gerüstkosten, Genehmigungsgebühren, regionale Preisdifferenzen. Zusätzlich können Optionen wie verschiedene Geländerausführungen, Böden oder Überdachungen ergänzt werden.",
          keywords: ["Balkon Kosten", "Balkon Materialkosten", "Balkon Arbeitslohn", "Balkon Gesamtkosten"],
          cta: {
            text: "Kosten detailliert berechnen",
            link: "/kalkulator/",
            icon: "💰"
          }
        },
        {
          question: "Wie funktioniert der regionale Preisfaktor?",
          answer: "Unser regionaler Faktor berücksichtigt die unterschiedlichen Kosten zwischen ländlichen Gebieten (z.B. Mecklenburg-Vorpommern) und städtischen Zonen (z.B. München). Dies sorgt für realistische Preisschätzungen in Ihrer Region.",
          keywords: ["Balkon Kosten regional", "Balkon Preis München", "Balkon Preis ländlich", "regionale Balkon Kosten"],
          cta: {
            text: "Regionalen Preis ermitteln",
            link: "/kalkulator/",
            icon: "📍"
          }
        },
        {
          question: "Ist die Kalkulation kostenlos?",
          answer: "Ja, der BALKONFUCHS Kalkulator ist komplett kostenlos. Sie erhalten sofort eine detaillierte Kostenschätzung ohne versteckte Kosten oder Verpflichtungen.",
          keywords: ["kostenloser Balkon Kalkulator", "Balkon Kosten berechnen", "gratis Balkon Kalkulation"],
          cta: {
            text: "Kostenlos starten",
            link: "/kalkulator/",
            icon: "🎯"
          }
        }
      ]
    },
    {
      category: "Balkon-Planer",
      icon: "📋",
      color: "blue",
      questions: [
        {
          question: "Wie lange dauert die Balkon-Planung mit dem Planer?",
          answer: "Unser intelligenter Balkon-Planer führt Sie durch 16 strukturierte Schritte und dauert etwa 10-15 Minuten. Sie erhalten am Ende eine detaillierte Übersicht über die notwendigen Schritte Ihrer Projektplanung, die unseren Partnern im Vorfeld viel Zeit spart und Ihnen dabei hilft sehr präzise Angebote von unseren Partnern zu bekommen.",
          keywords: ["Balkon Planung", "Balkon Planer", "Balkon Projektplanung", "Balkon Planungszeit"],
          cta: {
            text: "Projekt jetzt planen",
            link: "/planer/",
            icon: "📋"
          }
        },
        {
          question: "Welche Informationen brauche ich für die Balkon-Planung?",
          answer: "Grundinformationen zu Projektstatus, Zeitrahmen, Budget, Balkontyp, Maßen und Wandmaterial reichen aus. Der Planer führt Sie Schritt für Schritt durch alle notwendigen Details.",
          keywords: ["Balkon Planung Voraussetzungen", "Balkon Planung Informationen", "Balkon Planung Checkliste"],
          cta: {
            text: "Planung starten",
            link: "/planer/",
            icon: "✅"
          }
        },
        {
          question: "Kann ich den Planer auch für Terrassen nutzen?",
          answer: "Jain- also Ja und Nein. Unser Planer unterstützt verschiedene Balkontypen inklusive Hochterrassen. Sie können zwischen Anlehnbalkon, Vorstellbalkon, Hängebalkon und Hochterrasse wählen.",
          keywords: ["Terrassen Planer", "Hochterrasse Planung", "Balkon Arten", "Terrassen Planung"],
          cta: {
            text: "Terrassen planen",
            link: "/planer/",
            icon: "🏠"
          }
        }
      ]
    },
    {
      category: "Express-Angebot",
      icon: "⚡",
      color: "yellow",
      questions: [
        {
          question: "Was ist ein Express-Angebot bei BALKONFUCHS?",
          answer: "Unser Express-Angebot richtet sich an entscheidungsbereite Bauherren mit Beschluss, Genehmigung oder Finanzierung. Sie erhalten prioritäre Vermittlung an 3 spezialisierte Balkonbau-Experten für schnelle Umsetzung.",
          keywords: ["Express Angebot Balkon", "schnelles Balkon Angebot", "Balkon Experten", "prioritäre Balkon Vermittlung"],
          cta: {
            text: "Express-Angebot anfordern",
            link: "/express-angebot/",
            icon: "⚡"
          }
        },
        {
          question: "Wie schnell erhalte ich Express-Angebote?",
          answer: "Bei unserem Express-Service erhalten Sie innerhalb von 24-48 Stunden Kontakt von bis zu 3 qualifizierten Balkonbau-Partnern aus Ihrer Region.",
          keywords: ["schnelle Balkon Angebote", "24h Balkon Angebot", "Express Balkon Service"],
          cta: {
            text: "Schnell-Angebot erhalten",
            link: "/express-angebot/",
            icon: "🚀"
          }
        },
        {
          question: "Wer kann das Express-Angebot nutzen?",
          answer: "Das Express-Angebot ist für Bauherren gedacht, die bereits eine Entscheidung getroffen haben, eine Baugenehmigung besitzen oder die Finanzierung gesichert haben.",
          keywords: ["Express Angebot Voraussetzungen", "entscheidungsbereite Bauherren", "Balkon Genehmigung vorhanden"],
          cta: {
            text: "Jetzt Express-Service nutzen",
            link: "/express-angebot/",
            icon: "✅"
          }
        }
      ]
    },
    {
      category: "Genehmigungscheck",
      icon: "🏛️",
      color: "green",
      questions: [
        {
          question: "Brauche ich eine Baugenehmigung für meinen Balkon?",
          answer: "Das hängt von Ihrem Standort, Balkontyp und Gebäude ab. Unser Genehmigungscheck analysiert Ihre Situation in 1 Minute und gibt Ihnen eine rechtssichere Einschätzung für alle Bundesländer.",
          keywords: ["Balkon Baugenehmigung", "Balkon Genehmigung", "Balkon Genehmigungspflicht", "Balkon rechtssicher"],
          cta: {
            text: "Genehmigung jetzt prüfen",
            link: "/genehmigung/",
            icon: "🏛️"
          }
        },
        {
          question: "Wie lange dauert eine Balkon-Genehmigung?",
          answer: "Die Genehmigungsdauer variiert je nach Bundesland und Komplexität zwischen 8-12 Wochen (leider manchmal auch deutlich länger). Unser Genehmigungscheck zeigt Ihnen die erwarteten Bearbeitungszeiten für Ihre Region. Diese Information soll Ihnen dabei helfen, Ihre Projektdauer gut abschätzen zu können, damit Sie nicht zu spät mit Ihrem Projekt starten.",
          keywords: ["Balkon Genehmigung Dauer", "Balkon Genehmigung Zeit", "Balkon Genehmigung Bearbeitung"],
          cta: {
            text: "Bearbeitungszeit ermitteln",
            link: "/genehmigung/",
            icon: "⏱️"
          }
        },
        {
          question: "Was passiert, wenn ich ohne Genehmigung baue?",
          answer: "Ein Bau ohne erforderliche Genehmigung kann zu hohen Bußgeldern, Rückbauverfügungen und rechtlichen Problemen führen. Unser Genehmigungscheck hilft Ihnen, rechtssicher zu planen.",
          keywords: ["Balkon ohne Genehmigung", "Balkon Genehmigung Bußgeld", "Balkon Rückbau", "Balkon rechtliche Folgen"],
          cta: {
            text: "Rechtssicher prüfen",
            link: "/genehmigung/",
            icon: "⚖️"
          }
        }
      ]
    },
    {
      category: "Bauzeit-Planung",
      icon: "📅",
      color: "purple",
      questions: [
        {
          question: "Wie lange dauert ein Balkonbau?",
          answer: "Die Bauzeit hängt von Balkontyp, Komplexität und Wetter ab. Ein einfacher Anlehnbalkon dauert 3-5 Tage, ein Vorstellbalkon 1-2 Wochen. Unser Baustart-Rechner ermittelt den optimalen Starttermin.",
          keywords: ["Balkon Bauzeit", "Balkon Bau Dauer", "Balkon Bauplanung", "Balkon Terminplanung"],
          cta: {
            text: "Bauzeit berechnen",
            link: "/bauzeit-planung/",
            icon: "📅"
          }
        },
        {
          question: "Wann ist der beste Zeitpunkt für Balkonbau?",
          answer: "Der optimale Zeitpunkt ist Frühjahr bis Herbst (März-Oktober). Unser Baustart-Rechner berücksichtigt Genehmigungszeiten, Wetterbedingungen und Partnerverfügbarkeit für Ihren Standort.",
          keywords: ["Balkon Bauzeitpunkt", "Balkon Bau Saison", "Balkon Wetter", "Balkon optimaler Start"],
          cta: {
            text: "Optimalen Starttermin finden",
            link: "/bauzeit-planung/",
            icon: "🌱"
          }
        },
        {
          question: "Was beeinflusst die Balkon-Bauzeit?",
          answer: "Faktoren wie Wetter, Genehmigungsstatus, Materialverfügbarkeit, Partnerauslastung und Projektkomplexität beeinflussen die Bauzeit. Unser Rechner berücksichtigt alle relevanten Faktoren.",
          keywords: ["Balkon Bauzeit Faktoren", "Balkon Bauplanung", "Balkon Projektmanagement"],
          cta: {
            text: "Bauzeit-Faktoren analysieren",
            link: "/bauzeit-planung/",
            icon: "🔍"
          }
        }
      ]
    },
    {
      category: "Allgemeine Fragen",
      icon: "❓",
      color: "gray",
      questions: [
        {
          question: "Wie funktioniert die Partnervermittlung bei BALKONFUCHS?",
          answer: "Wir vermitteln Sie kostenlos an qualifizierte Balkonbau-Partner aus Ihrer Region. Alle Partner durchlaufen ein strenges Auswahlverfahren und werden regelmäßig bewertet. Für Sie entstehen keine Kosten.",
          keywords: ["Balkon Partner", "Balkon Vermittlung", "Balkon Handwerker", "Balkon Partner finden"],
          cta: {
            text: "Partner finden",
            link: "/kalkulator/",
            icon: "🤝"
          }
        },
        {
          question: "Ist BALKONFUCHS kostenlos?",
          answer: "Ja, unser Service ist zu 100% kostenlos für Sie. Was wir uns im Gegenzug wünschen, ist, dass Sie unseren Balkonbrief für die Dauer Ihres Projektes abonnieren. Hierüber informieren wir zu Neuigkeiten, neue Projekte unserer Partnern, Highlightprojekte und möglichen Referenzen für Ihr Projekt - alles mehrwertbringende Informationen für Sie. Teilnehmende Partnerbetriebe zahlen eine Gebühr für ihre Teilnahme, die unsere Services finanziert.",
          keywords: ["BALKONFUCHS kostenlos", "kostenlose Balkon Beratung", "gratis Balkon Service"],
          cta: {
            text: "Kostenlos starten",
            link: "/kalkulator/",
            icon: "🎯"
          }
        },
        {
          question: "Wie kann ich BALKONFUCHS kontaktieren?",
          answer: "Sie können uns per E-Mail unter post@balkonfuchs.de oder am besten via Chatanfrage erreichen. Wir antworten in der Regel innerhalb von 24 Stunden.",
          keywords: ["BALKONFUCHS Kontakt", "Balkon Beratung", "Balkon Support", "Balkon Hilfe"],
          cta: {
            text: "Kontakt aufnehmen",
            link: "/kontakt",
            icon: "📧"
          }
        }
      ]
    },
    {
      category: "Kosten & Sparpotenzial",
      icon: "💰",
      color: "green",
      questions: [
        {
          question: "Wie genau sind die Kostenschätzungen im Funnel?",
          answer: "Unsere Kostenschätzungen basieren auf über 2.500 realisierten Projekten und sind in der Regel auf ±15% genau. Es ist uns wichtig, Ihnen eine möglichst gute Kostenschätzung zur Verfügung zu stellen. Allerdings sind gerade bei Balkonprojekten (beispielsweise im Denkmalschutz oder schwer zugänglichen Bereichen) häufig zusätzliche Kosten notwendig, die im Vorfeld nicht kalkulierbar sind.",
          keywords: ["Balkon Kosten Genauigkeit", "Kostenschätzung Balkon", "Balkon Preis Genauigkeit"],
          cta: {
            text: "Kosten präzise berechnen",
            link: "/kalkulator/",
            icon: "💰"
          }
        },
        {
          question: "Wie viel kann ich tatsächlich sparen?",
          answer: "Unsere Kunden sparen durchschnittlich bis zu 3.200€ bei ihrem Balkon-Projekt. Die Ersparnis entsteht durch den Vergleich mehrerer Angebote und unsere Partnerkonditionen. Allerdings können gerade regionale Unterschiede und saisonale Faktoren preisliche +-Abweichungen verursachen.",
          keywords: ["Balkon sparen", "Balkon Ersparnis", "Balkon Kosten sparen"],
          cta: {
            text: "Sparpotenzial ermitteln",
            link: "/kalkulator/",
            icon: "💸"
          }
        },
        {
          question: "Warum sind die Preise niedriger als bei direkter Anfrage?",
          answer: "Unsere Partner bieten Ihnen Sonderkonditionen, da sie über uns vorqualifizierte Anfragen erhalten. Das hilft Ihnen Zeit zu sparen. Zudem führt der Angebotsvergleich sehr häufig zu besseren Preisen.",
          keywords: ["Balkon günstig", "Balkon Sonderkonditionen", "Balkon Partnerpreise"],
          cta: {
            text: "Günstige Angebote erhalten",
            link: "/kalkulator/",
            icon: "🏷️"
          }
        },
        {
          question: "Fallen versteckte Kosten an?",
          answer: "Eigentlich nein. Unsere Partner sind angehalten alle Angebote seriös und transparent zu gestalten. Da die Partner ihnen final die Angebote unterbreiten, sind diese final für die Ausgestaltung der Preise verantwortlich.",
          keywords: ["Balkon versteckte Kosten", "Balkon transparente Preise", "Balkon Kosten Aufschlüsselung"],
          cta: {
            text: "Transparente Angebote erhalten",
            link: "/kalkulator/",
            icon: "🔍"
          }
        }
      ]
    },
    {
      category: "Zeitabläufe & Planung",
      icon: "⏱️",
      color: "blue",
      questions: [
        {
          question: "Wie schnell erhalte ich die ersten Angebote?",
          answer: "Die erste Kostenschätzung erhalten Sie sofort im Funnel. Die Vermittlung an passende Fachbetriebe erfolgt innerhalb von 24-48 Stunden. Die Angebotserstellung durch die Partner kann je nach Projektumfang 3-7 Tage dauern.",
          keywords: ["Balkon Antwortzeit", "Balkon Antwort schnell", "Balkon Vermittlung Zeit"],
          cta: {
            text: "Schnelle Angebote erhalten",
            link: "/express-angebot/",
            icon: "⚡"
          }
        },
        {
          question: "Wie lange dauert die gesamte Projektrealisierung?",
          answer: "Von der Anfrage bis zum fertigen Balkon vergehen in der Regel 8-16 Wochen, abhängig von Genehmigungsverfahren und Witterung. Unser Zeitplaner wurde für Sie entwickelt, damit Sie rechtzeitig vor Ihrem Balkonprojekt die Möglichkeit haben, sich Gedanken zu machen.",
          keywords: ["Balkon Bauzeit", "Balkon Projektzeit", "Balkon Realisierung Zeit"],
          cta: {
            text: "Projektzeitplan erstellen",
            link: "/bauzeit-planung/",
            icon: "📅"
          }
        },
        {
          question: "Kann ich den Baubeginn selbst bestimmen?",
          answer: "Sie können Ihre Wunschtermine angeben. Dies ist davon abhängig, in welchem Bundesland Sie wohnen und ob Sie ein genehmigungsfreies oder verfahrensfreies Projekt anstreben. Rechnen Sie lieber 4-6 Wochen länger als zu kurzfristig.",
          keywords: ["Balkon Baubeginn", "Balkon Terminplanung", "Balkon Wunschtermin"],
          cta: {
            text: "Optimalen Baubeginn planen",
            link: "/bauzeit-planung/",
            icon: "🗓️"
          }
        }
      ]
    },
    {
      category: "Projektumfang & Gewerke",
      icon: "🏗️",
      color: "purple",
      questions: [
        {
          question: "Was für Gewerke sind bei einem Balkonprojekt beteiligt?",
          answer: "Ein Balkonanbau ist sehr umfangreich und erfordert meist mehrere Gewerke: Statiker für Tragfähigkeitsprüfung, Metallbauer für Konstruktion, ggf. Maurer für Fundamente, Dachdecker für Abdichtung, Schlosser für Geländer und oft auch Elektriker. Viele Bauherren haben diese Komplexität anfangs nicht im Blick.",
          keywords: ["Balkon Gewerke", "Balkon Handwerker", "Balkon Baugewerke"],
          cta: {
            text: "Projektumfang planen",
            link: "/planer/",
            icon: "🏗️"
          }
        },
        {
          question: "Welche Balkontypen sind über BALKONFUCHS möglich?",
          answer: "Wir vermitteln alle Arten von Balkon-Projekten: Hängebalkone, Vorstellbalkone, Anlehnbalkone, Hochterrassen und Balkonrenovierungen. Auch Sonderlösungen sind möglich - diese sind dann allerdings mit den Partnern direkt zu besprechen.",
          keywords: ["Balkon Arten", "Balkontypen", "Hängebalkon", "Vorstellbalkon", "Anlehnbalkon"],
          cta: {
            text: "Balkontyp auswählen",
            link: "/planer/",
            icon: "🏠"
          }
        },
        {
          question: "Kann mein Wunschbalkon überhaupt gebaut werden?",
          answer: "Das prüfen unsere Partner im zumeist kostenlosen Vor-Ort-Termin. Sie bewerten die baulichen Gegebenheiten und klären alle technischen Machbarkeitsfragen direkt vor Ort. Sehr häufig erhielten wir in der Vergangenheit Anfragen über Balkonprojekte, die so nicht realisierbar waren.",
          keywords: ["Balkon Machbarkeit", "Balkon technisch möglich", "Balkon Vor-Ort-Prüfung"],
          cta: {
            text: "Machbarkeit prüfen",
            link: "/planer/",
            icon: "✅"
          }
        }
      ]
    },
    {
      category: "Partner & Qualität",
      icon: "🤝",
      color: "orange",
      questions: [
        {
          question: "Wie finde ich den richtigen Partner für mein Projekt?",
          answer: "Wir prüfen alle Partner nach strengen Kriterien: Erfahrung, Referenzen, Kundenbewertungen und finanzielle Stabilität. Sie erhalten nur Angebote von geprüften Fachbetrieben. Wir fragen Sie aktiv nach Ihrem Feedback, um etwas über Qualität, Kommunikation, Sauberkeit und Service vor Ort zu erfahren.",
          keywords: ["Balkon Partner finden", "Balkon Handwerker", "Balkon Partner Qualität"],
          cta: {
            text: "Qualifizierte Partner finden",
            link: "/kalkulator/",
            icon: "🤝"
          }
        },
        {
          question: "Was ist wenn ich mit einem Partner nicht zufrieden bin?",
          answer: "Wir sind stets bemüht, Ihnen eine positive Lösung zur Verfügung zu stellen und einen guten Partner an die Seite zu stellen. Melden Sie sich sofort bei uns per E-Mail oder Chat. Wir vermitteln Sie kostenfrei an alternative Partner oder helfen bei der Problemlösung, solange Sie noch keinen Vertrag mit dem Partner geschlossen haben, sind Sie frei den Partner zu wechseln.",
          keywords: ["Balkon Partner Problem", "Balkon Partnerwechsel", "Balkon Beschwerde"],
          cta: {
            text: "Problem melden",
            link: "/kontakt",
            icon: "📧"
          }
        },
        {
          question: "Haben die Partner alle notwendigen Versicherungen?",
          answer: "Ja, alle Partner müssen eine gültige Betriebshaftpflicht nachweisen mit ausreichender Deckung für Personen und Sachschäden. Diese Prüfung ist Voraussetzung für die Partnerschaft.",
          keywords: ["Balkon Partner Versicherung", "Balkon Haftpflicht", "Balkon Versicherungsschutz"],
          cta: {
            text: "Versicherte Partner finden",
            link: "/kalkulator/",
            icon: "🛡️"
          }
        }
      ]
    },
    {
      category: "Funnel-Bedienung & Support",
      icon: "📋",
      color: "gray",
      questions: [
        {
          question: "Ich habe mich im Funnel 'verklickt' - kann ich korrigieren?",
          answer: "Ja, Sie können jederzeit zurück navigieren und Ihre Angaben korrigieren. Der Funnel speichert Ihre Eingaben automatisch zwischen.",
          keywords: ["Balkon Funnel korrigieren", "Balkon Eingabe ändern", "Balkon Funnel zurück"],
          cta: {
            text: "Funnel neu starten",
            link: "/kalkulator/",
            icon: "🔄"
          }
        },
        {
          question: "Was passiert wenn der Funnel nicht funktioniert?",
          answer: "Bei technischen Problemen senden Sie uns gerne eine E-Mail an post@balkonfuchs.de oder nutzen Sie unseren Chat. Wir erstellen Ihre Anfrage auch manuell und vermitteln Sie an passende Partner.",
          keywords: ["Balkon Funnel Problem", "Balkon technischer Fehler", "Balkon Support"],
          cta: {
            text: "Technisches Problem melden",
            link: "/kontakt",
            icon: "🔧"
          }
        },
        {
          question: "Ich brauche persönliche Beratung vor der Angebotserstellung - ist das möglich?",
          answer: "Selbstverständlich! Schreiben Sie uns per E-Mail (post@balkonfuchs.de) oder nutzen Sie unseren Chat. Unsere Experten beantworten gerne alle Fragen zu Ihrem Balkonprojekt und den beteiligten Gewerken. Beachten Sie aber bitte, dass Beratungsleistungen eine kostenpflichtige Zusatzleistung sind, die wir zusätzlich zu unseren Services anbieten.",
          keywords: ["Balkon persönliche Beratung", "Balkon Expertenberatung", "Balkon Beratung"],
          cta: {
            text: "Persönliche Beratung anfragen",
            link: "/kontakt",
            icon: "👨‍💼"
          }
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>FAQ - Häufige Fragen zu Balkonbau | BALKONFUCHS</title>
        <meta name="description" content="Über 25 detaillierte FAQ zum Balkonbau: Kosten, Planung, Genehmigung, Bauzeit, Partnervermittlung. Mit direkten Links zu unseren Tools. Über 850 zufriedene Kunden vertrauen BALKONFUCHS." />
        <meta name="keywords" content="Balkon FAQ, Balkon Fragen, Balkon Antworten, Balkonbau Hilfe, Balkon Beratung, Balkon Kosten, Balkon Planung, Balkon Genehmigung" />
        <meta name="author" content="BALKONFUCHS GmbH" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FAQ - Häufige Fragen zu Balkonbau | BALKONFUCHS" />
        <meta property="og:description" content="Alle wichtigen Fragen zum Balkonbau beantwortet. Finden Sie schnell die Antworten auf Ihre Balkon-Fragen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/faq" />
        <link rel="canonical" href="https://balkonfuchs.de/faq" />
        
        {/* FAQ Schema.org Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.flatMap(category => 
              category.questions.map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.answer
                }
              }))
            )
          })
        }} />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />


        {/* Main Content */}
        <main className="py-16 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <a href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </a>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Häufige Fragen zum Balkonbau</h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Über 25 detaillierte Antworten auf Ihre wichtigsten Fragen rund um Balkonbau, Kosten, Planung, Genehmigung und Partnervermittlung. Mit direkten Links zu unseren Tools.
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-12">
              {faqData.map((category, categoryIndex) => (
                <section key={categoryIndex} className="bg-gray-800/50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="bg-gray-700/30 rounded-xl p-6 border-l-4 border-orange-400">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                          <HelpCircle className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h3>
                        <p className="text-gray-200 leading-relaxed ml-8">
                          {faq.answer}
                        </p>
                        
                        {/* CTA Button */}
                        {faq.cta && (
                          <div className="mt-4 ml-8">
                            <a 
                              href={faq.cta.link}
                              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
                            >
                              <span className="mr-2">{faq.cta.icon}</span>
                              {faq.cta.text}
                            </a>
                          </div>
                        )}
                        
                        <div className="mt-4 ml-8">
                          <div className="flex flex-wrap gap-2">
                            {faq.keywords.map((keyword, keywordIndex) => (
                              <span key={keywordIndex} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Haben Sie weitere Fragen?</h2>
              <p className="text-gray-300 mb-6">
                Unser Expertenteam steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/kontakt/" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Kontakt aufnehmen
                </a>
                <a href="/kalkulator/" className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300">
                  Kosten kalkulieren
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

    </>
  );
};

export default FAQ;
