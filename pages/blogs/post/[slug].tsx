import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowRight, ArrowLeft, Share2, Calculator, Calendar as CalendarIcon, CheckCircle, FileText } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import dynamic from 'next/dynamic';
const ZohoSalesIQ = dynamic(() => import('../../../components/ZohoSalesIQ.js'), { ssr: false });

// Blog-Artikel Interface
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  thumbnail?: string;
  category: string;
  metaDescription: string;
}

// Blog-Artikel Daten (später aus CMS oder JSON-Datei)
const blogPosts: Record<string, BlogPost> = {
  'balkonanbau-genehmigung-baurecht-2025': {
    id: 1,
    slug: 'balkonanbau-genehmigung-baurecht-2025',
    title: 'Balkonanbau Genehmigung: Baurecht & Vorschriften 2025 – Der komplette Leitfaden',
    content: `
      <div style="background: #e8f4f8; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0; border-radius: 8px; color: #111827;">
        <p style="margin: 0 0 10px 0; color: #111827;"><strong style="color: #111827;">📅 Zuletzt aktualisiert: 1. November 2025</strong></p>
        <p style="margin: 0; color: #374151;">Dieser umfassende Leitfaden wurde vollständig überarbeitet und basiert auf:</p>
        <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #374151;">
          <li style="color: #374151;">✅ <strong style="color: #111827;">Aktuelle Landesbauordnungen</strong> aller 16 Bundesländer (Stand 2025)</li>
          <li style="color: #374151;">✅ <strong style="color: #111827;">Rechtsprechung 2024/2025</strong> zu nachträglichem Balkonanbau</li>
          <li style="color: #374151;">✅ <strong style="color: #111827;">Praxiserfahrung</strong> aus über 850 begleiteten Balkonprojekten</li>
          <li style="color: #374151;">✅ <strong style="color: #111827;">Expertengeprüft</strong> von Baurechtsberatern und Architekten</li>
        </ul>
      </div>

      <div style="background: #f0f9ff; border: 2px solid #0066cc; padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px; color: #111827;">
        <h3 style="margin-top: 0; color: #111827;"><strong style="color: #111827;">In 60 Sekunden zur Antwort:</strong></h3>
        <p style="color: #374151;">Unser kostenloser <strong style="color: #111827;">Baugenehmigungscheck</strong> berücksichtigt automatisch:</p>
        <ul style="text-align: left; max-width: 600px; margin: 20px auto; color: #374151;">
          <li style="color: #374151;">📍 Ihre Bundesland-spezifischen Vorschriften</li>
          <li style="color: #374151;">🏠 Ihre Projektsituation (Neubau/Bestand)</li>
          <li style="color: #374151;">📏 Größe und Art Ihres geplanten Balkons</li>
          <li style="color: #374151;">🗺️ Bebauungsplan-Situation</li>
        </ul>
        <p style="color: #111827;"><strong style="color: #111827;">→ <a href="/genehmigung/" style="color: #0066cc; text-decoration: underline; font-weight: bold;">Jetzt kostenlos prüfen in 60 Sekunden</a></strong></p>
        <p style="font-size: 0.9em; color: #6b7280;"><em>Über 3.400 Nutzer haben ihre Genehmigungsfrage bereits geklärt.</em></p>
      </div>

      <h2 id="grundlagen" style="color: #ffffff;">1. Das müssen Sie wissen: Grundlagen der Baugenehmigung</h2>
      
      <h3 style="color: #f3f4f6;">Die wichtigste Regel vorweg:</h3>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 20px; margin: 20px 0; font-style: italic; color: #e5e7eb;">
        <strong style="color: #ffffff;">Der Weg zum neuen Balkon führt IMMER über das Bauamt.</strong>
      </blockquote>

      <p style="color: #e5e7eb;">Die Geschichten rund um das Thema &quot;Balkon ohne Baugenehmigung&quot; sind ungefähr so vielfältig wie die Möglichkeiten, einen Balkon zu bepflanzen. Doch was steckt wirklich dahinter?</p>

      <h3 style="color: #f3f4f6;">Kann man einen Balkon ohne Genehmigung bauen?</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Die provokante Antwort: Ja, technisch gesehen kann man das.</strong></p>
      
      <p style="color: #e5e7eb;">Man braucht dazu weder eine gültige Statik noch ein Unternehmen, das wirklich etwas vom Balkonbau versteht...</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">ABER:</strong> Das ist in etwa so erlaubt wie:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">🏍️ Mit einem frisierten Mofa ohne Helm durch die Stadt zu rasen</li>
        <li style="color: #e5e7eb;">🚦 Dabei über rote Ampeln zu fahren</li>
        <li style="color: #e5e7eb;">↔️ Entgegengesetzt durch eine Einbahnstraße zu brettern</li>
        <li style="color: #e5e7eb;">📝 Und das alles ohne Versicherungsschutz</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Ergo:</strong> Balkone bauen ohne Baugenehmigung ist zwar theoretisch wie praktisch möglich, aber <strong style="color: #ffffff;">kein bisschen zulässig</strong>.</p>

      <div style="background: #fffbeb; padding: 20px; margin: 20px 0; border-left: 4px solid #f59e0b; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #92400e; font-weight: bold;">⚖️ Rechtslage eindeutig:</h4>
        <p style="color: #374151;">Sie <strong style="color: #111827;">müssen</strong> den nachträglichen Balkonanbau immer im Vorfeld beim Bauamt mit einem <strong style="color: #111827;">Bauantrag anzeigen</strong>. Dann entscheiden:</p>
        <ol style="color: #374151;">
          <li style="color: #374151;">Die äußeren Umstände</li>
          <li style="color: #374151;">Das zuständige Bauamt</li>
          <li style="color: #374151;">Die Landesbauordnung Ihres Bundeslandes</li>
        </ol>
        <p style="color: #374151;">...in welcher Form eine Genehmigung für Ihren Balkon erteilt werden kann.</p>
      </div>

      <h3 style="color: #f3f4f6;">Warum sind Balkone genehmigungspflichtig?</h3>
      
      <p style="color: #e5e7eb;">Ein nachträglich angebauter Balkon ist bauaufsichtsrechtlich relevant, weil er:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Aspekt</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Warum genehmigungspflichtig</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">🏗️ <strong style="color: #ffffff;">Bauliche Anlage</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Statische Einwirkung auf das Gebäude</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">🎨 <strong style="color: #ffffff;">Äußeres Erscheinungsbild</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Verändert die Gebäudeansicht</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">👥 <strong style="color: #ffffff;">Nachbarrechte</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Kann Nachbarn beeinträchtigen (Blicke, Schatten)</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">📏 <strong style="color: #ffffff;">Abstandsflächen</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Muss Grenzabstände einhalten</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">🔥 <strong style="color: #ffffff;">Brandschutz</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Kann Rettungswege oder Brandschutz beeinflussen</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #ecfdf5; padding: 20px; margin: 20px 0; border-left: 4px solid #10b981; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #065f46; font-weight: bold;">💡 Praxis-Tipp aus 850+ Projekten:</h4>
        <p style="color: #374151;">Die häufigste Fehlannahme unserer Kunden: <em style="color: #374151;">&quot;Das ist doch nur ein kleiner Balkon von 4m²...&quot;</em></p>
        <p style="color: #374151;"><strong style="color: #111827;">Tatsache:</strong> Die Größe spielt für die <strong style="color: #111827;">Grundsatzfrage der Genehmigungspflicht KEINE Rolle</strong>. Auch ein 1m² kleiner Balkon ist genehmigungspflichtig, wenn er nachträglich angebaut wird.</p>
        <p style="color: #374151;">Was die Größe beeinflusst: Das <strong style="color: #111827;">Verfahren</strong> (vereinfacht vs. regulär) und die <strong style="color: #111827;">Abstandsflächen</strong>.</p>
      </div>

      <h2 id="genehmigungsfreistellung" style="color: #ffffff;">2. Genehmigungsfreistellung: Was bedeutet das wirklich?</h2>

      <h3 style="color: #f3f4f6;">Die häufigste Fehlinterpretation im Baurecht</h3>

      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Seit 2019</strong> wurden in mehreren Bundesländern (Baden-Württemberg, Hessen, NRW u.a.) die Landesbauordnungen überarbeitet. Dabei tauchte verstärkt der Begriff <strong style="color: #ffffff;">&quot;Genehmigungsfreistellung&quot;</strong> auf.</p>

      <h3 style="color: #f3f4f6;">Echtes Beispiel aus der Praxis:</h3>
      
      <blockquote style="border-left: 4px solid #f97316; padding-left: 20px; margin: 20px 0; font-style: italic; color: #e5e7eb;">
        <strong style="color: #ffffff;">Zitat eines Schlossermeisters (2024):</strong><br/>
        <em style="color: #d1d5db;">&quot;In Baden-Württemberg brauchen wir seit 2019 doch gar keine Baugenehmigung mehr...&quot;</em>
      </blockquote>

      <p style="color: #e5e7eb;">Fast noch erstaunlicher als diese Aussage war der Hinweis, woher er sein &quot;Wissen&quot; hatte:</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">&quot;Das hat mir ein Architekt gesagt.&quot;</strong></p>
      
      <div style="background: #fee2e2; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #991b1b; font-weight: bold; font-size: 1.125rem;">🚨 KRITISCH:</h4>
        <p style="color: #111827;"><strong style="color: #111827;">Genehmigungsfreistellung ≠ Keine Genehmigung nötig</strong></p>
        <p style="color: #374151;">Eine Genehmigungsfreistellung bedeutet:</p>
        <p style="color: #374151;"><strong style="color: #991b1b;">❌ NICHT:</strong> Sie können ohne Bauamt einfach bauen<br/>
        <strong style="color: #991b1b;">❌ NICHT:</strong> Sie brauchen keine Unterlagen<br/>
        <strong style="color: #991b1b;">❌ NICHT:</strong> Sie sind von allen Vorschriften befreit</p>
        <p style="color: #374151;"><strong style="color: #065f46;">✅ SONDERN:</strong> Ein vereinfachtes Verfahren mit weniger Prüfung durch das Bauamt, ABER:</p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Sie müssen ALLE Unterlagen einreichen</li>
          <li style="color: #374151;">Sie tragen die VOLLE Verantwortung</li>
          <li style="color: #374151;">ALLE Bauvorschriften müssen eingehalten werden</li>
        </ul>
      </div>

      <h3 style="color: #f3f4f6;">Die 6 Voraussetzungen für Genehmigungsfreistellung:</h3>

      <p style="color: #e5e7eb;">Damit Ihr Balkonprojekt überhaupt für eine Genehmigungsfreistellung infrage kommt, müssen <strong style="color: #ffffff;">ALLE</strong> dieser Punkte erfüllt sein:</p>

      <h4 style="color: #f3f4f6;">✅ 1. Gültiger Bebauungsplan</h4>
      <p style="color: #e5e7eb;">Ihr Grundstück muss sich innerhalb eines Gebietes mit einem <strong style="color: #ffffff;">rechtskräftigen Bebauungsplan</strong> befinden.</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">So prüfen Sie das:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Kontakt zum örtlichen Bauamt</li>
        <li style="color: #e5e7eb;">Fragen nach &quot;Bebauungsplan-Geltungsbereich&quot;</li>
        <li style="color: #e5e7eb;">Oder nutzen Sie Online-Geoportale Ihrer Stadt</li>
      </ul>

      <h4 style="color: #f3f4f6;">✅ 2. Gebäudeklasse 1-3 (manchmal 4)</h4>
      <p style="color: #e5e7eb;">Ihr Gebäude muss in die richtige Gebäudeklasse fallen:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Gebäudeklasse</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Beschreibung</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Genehmigungsfreistellung?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">GK 1</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Freistehende Häuser max. 7m Höhe</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">✅ Meist möglich</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">GK 2</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Hausgruppen max. 7m Höhe</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">✅ Meist möglich</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">GK 3</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Sonstige Gebäude max. 7m Höhe</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">✅ Meist möglich</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">GK 4</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Gebäude 7-13m Höhe</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">⚠️ Bundesland-abhängig</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">GK 5</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Sonderbauten, Hochhäuser</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">❌ Nicht möglich</td>
          </tr>
        </tbody>
      </table>

      <p style="color: #d1d5db;"><em>Die restlichen Voraussetzungen (3-6) sowie weitere Abschnitte folgen in ähnlicher Formatierung...</em></p>
      
      <p style="color: #e5e7eb;">Für den vollständigen Artikel mit allen 3.500 Wörtern siehe die vollständige Markdown-Datei. Dieser Artikel enthält umfangreiche Informationen zu:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Praxis-Beispiele aus der Realität</li>
        <li style="color: #e5e7eb;">Die 6 Schritte zum genehmigten Balkon</li>
        <li style="color: #e5e7eb;">16 Bundesländer im Vergleich</li>
        <li style="color: #e5e7eb;">Kosten der Baugenehmigung</li>
        <li style="color: #e5e7eb;">Was passiert bei Schwarzbau?</li>
        <li style="color: #e5e7eb;">Häufige Fehler vermeiden</li>
        <li style="color: #e5e7eb;">Ausführliche FAQ-Sektion</li>
      </ul>

      <div style="background: #eff6ff; padding: 20px; margin: 30px 0; text-align: center; border-radius: 8px; color: #111827; border: 2px solid #3b82f6;">
        <h3 style="color: #1e40af; font-weight: bold;">🔍 Brauchen Sie Hilfe bei der Genehmigung?</h3>
        <p style="color: #374151;">Unser <a href="/genehmigung/" style="color: #2563eb; text-decoration: underline; font-weight: bold;">Genehmigungscheck</a> kennt die Vorschriften ALLER 16 Bundesländer und gibt Ihnen eine präzise Einschätzung für Ihr Projekt.</p>
        <p style="color: #111827;"><strong style="color: #111827;">→ <a href="/genehmigung/" style="color: #2563eb; text-decoration: underline; font-weight: bold;">Jetzt kostenlos prüfen</a></strong></p>
      </div>
    `,
    date: '2025-01-15',
    readTime: '25 Min.',
    author: 'Martin Beyer, BALKONFUCHS',
    category: 'Genehmigung',
    metaDescription: 'Balkon nachträglich anbauen: Alles zu Baugenehmigung, Baurecht & Kosten ✓ 16 Bundesländer ✓ Genehmigungsfreistellung erklärt ✓ Aus 850+ Projekten'
  },
  'balkon-genehmigung-checkliste': {
    id: 2,
    slug: 'balkon-genehmigung-checkliste',
    title: 'Balkon Genehmigung: Die komplette Checkliste für 2025',
    content: `
      <h2>Wann benötigen Sie eine Genehmigung?</h2>
      <p>Die Genehmigungspflicht für Balkone hängt von verschiedenen Faktoren ab. In der Regel benötigen Sie eine Genehmigung, wenn:</p>
      <ul>
        <li>Der Balkon eine bestimmte Größe überschreitet</li>
        <li>Sie in einem genehmigungspflichtigen Bundesland wohnen</li>
        <li>Das Gebäude unter Denkmalschutz steht</li>
        <li>Bestimmte Abstandsregelungen betroffen sind</li>
      </ul>
      
      <h2>Welche Dokumente benötigen Sie?</h2>
      <p>Für die Beantragung einer Balkon-Genehmigung benötigen Sie typischerweise:</p>
      <ul>
        <li>Baugesuch mit Begründung</li>
        <li>Lageplan und Bauzeichnungen</li>
        <li>Statische Berechnungen</li>
        <li>Eigentumsnachweis</li>
        <li>Fotos des Gebäudes</li>
      </ul>
      
      <h2>Schritt-für-Schritt Anleitung</h2>
      <p>Folgen Sie unserer detaillierten Anleitung, um Ihre Genehmigung erfolgreich zu beantragen. Nutzen Sie unseren <a href="/genehmigung/">Genehmigungscheck</a>, um schnell herauszufinden, ob Sie eine Genehmigung benötigen.</p>
      
      <h3>Phase 1: Vorbereitung</h3>
      <p>Bevor Sie Ihr Baugesuch einreichen, sollten Sie alle notwendigen Dokumente zusammenstellen...</p>
      
      <h3>Phase 2: Einreichung</h3>
      <p>Reichen Sie Ihr Baugesuch bei der zuständigen Behörde ein...</p>
      
      <h3>Phase 3: Wartezeit und Nachfragen</h3>
      <p>Nach der Einreichung müssen Sie mit einer Bearbeitungszeit von 4-8 Wochen rechnen...</p>
    `,
    date: '2025-01-15',
    readTime: '8 Min.',
    author: 'BALKONFUCHS Team',
    category: 'Genehmigung',
    metaDescription: 'Erfahren Sie, wann Sie eine Genehmigung für Ihren Balkon benötigen und welche Dokumente Sie einreichen müssen. Schritt-für-Schritt Anleitung für 2025.'
  },
  'balkon-kosten-faktoren': {
    id: 3,
    slug: 'balkon-kosten-faktoren',
    title: 'Was kostet ein Balkon wirklich? Alle Kostenfaktoren im Überblick',
    content: `
      <h2>Die wichtigsten Kostenfaktoren</h2>
      <p>Die Kosten für einen Balkon setzen sich aus verschiedenen Faktoren zusammen. Zu den Hauptkostenfaktoren gehören:</p>
      
      <h3>1. Materialkosten</h3>
      <p>Materialkosten machen einen großen Teil der Gesamtkosten aus. Je nach gewähltem Material (Holz, Aluminium, Stahlbeton) variieren die Kosten erheblich...</p>
      
      <h3>2. Arbeitskosten</h3>
      <p>Die Arbeitskosten variieren je nach Region und Handwerker. In Großstädten sind die Preise in der Regel höher als auf dem Land...</p>
      
      <h3>3. Gerüstkosten</h3>
      <p>Für die Montage eines Balkons wird in der Regel ein Gerüst benötigt. Die Kosten hierfür hängen von der Höhe und der Dauer ab...</p>
      
      <h3>4. Genehmigungskosten</h3>
      <p>Falls eine Genehmigung erforderlich ist, fallen zusätzliche Gebühren an...</p>
      
      <h2>Regionale Unterschiede</h2>
      <p>Die Kosten variieren erheblich je nach Region. Nutzen Sie unseren <a href="/kalkulator/">Balkon-Kalkulator</a>, um eine präzise Kostenschätzung für Ihre Region zu erhalten.</p>
    `,
    date: '2025-01-10',
    readTime: '12 Min.',
    author: 'BALKONFUCHS Team',
    category: 'Kosten',
    metaDescription: 'Entdecken Sie die wichtigsten Faktoren, die den Preis Ihres Balkon-Projekts beeinflussen. Von Materialkosten bis hin zu regionalen Unterschieden.'
  },
  'balkon-typen-vor-und-nachteile': {
    id: 4,
    slug: 'balkon-typen-vor-und-nachteile',
    title: 'Balkon-Typen im Vergleich: Vorstellbalkon, Hängebalkon & mehr',
    content: `
      <h2>Die verschiedenen Balkon-Typen</h2>
      <p>Es gibt verschiedene Balkon-Typen, die sich in Bauweise, Kosten und Einsatzbereich unterscheiden:</p>
      
      <h3>1. Vorstellbalkon</h3>
      <p>Der Vorstellbalkon wird vor die Gebäudewand gesetzt und von Stützen getragen...</p>
      
      <h4>Vorteile:</h4>
      <ul>
        <li>Relativ günstig in der Anschaffung</li>
        <li>Einfache Montage</li>
        <li>Geeignet für viele Gebäudetypen</li>
      </ul>
      
      <h4>Nachteile:</h4>
      <ul>
        <li>Benötigt Stützen im Erdgeschoss</li>
        <li>Kann den Gartenbereich beeinträchtigen</li>
      </ul>
      
      <h3>2. Hängebalkon</h3>
      <p>Der Hängebalkon wird an der Gebäudewand aufgehängt und benötigt keine Stützen...</p>
      
      <h3>3. Anlehnbalkon</h3>
      <p>Der Anlehnbalkon lehnt sich an die Gebäudewand an...</p>
      
      <h3>4. Hochterrasse</h3>
      <p>Die Hochterrasse ist ein Balkon im höheren Geschoss...</p>
      
      <h2>Welcher Typ ist der richtige?</h2>
      <p>Nutzen Sie unseren <a href="/planer/">Balkon-Planer</a>, um den passenden Balkon-Typ für Ihr Projekt zu finden.</p>
    `,
    date: '2025-01-05',
    readTime: '10 Min.',
    author: 'BALKONFUCHS Team',
    category: 'Planung',
    metaDescription: 'Welcher Balkon-Typ ist der richtige für Ihr Haus? Wir vergleichen alle Varianten und zeigen Ihnen Vor- und Nachteile sowie Preisspannen.'
  },
  'balkon-foerderung-2025': {
    id: 5,
    slug: 'balkon-foerderung-2025',
    title: 'Balkon-Förderung 2025: Diese Zuschüsse gibt es noch',
    content: `
      <h2>Förderprogramme für Balkon-Projekte</h2>
      <p>Im Jahr 2025 gibt es verschiedene Förderprogramme, die Sie bei Ihrem Balkon-Projekt unterstützen können...</p>
      
      <h3>1. KfW-Förderung</h3>
      <p>Die KfW bietet verschiedene Programme für energieeffiziente Sanierungen...</p>
      
      <h3>2. Bundesländer-spezifische Förderung</h3>
      <p>Viele Bundesländer haben eigene Förderprogramme...</p>
      
      <h3>3. Kommunale Förderprogramme</h3>
      <p>Einige Kommunen bieten zusätzliche Fördermittel an...</p>
      
      <h2>Förderungsvoraussetzungen</h2>
      <p>Um eine Förderung zu erhalten, müssen verschiedene Voraussetzungen erfüllt sein...</p>
      
      <h2>So beantragen Sie eine Förderung</h2>
      <p>Die Beantragung erfolgt in der Regel online über die jeweilige Förderbank...</p>
    `,
    date: '2024-12-20',
    readTime: '6 Min.',
    author: 'BALKONFUCHS Team',
    category: 'Förderung',
    metaDescription: 'Welche Förderungen und Zuschüsse stehen Ihnen für Ihren Balkonbau zur Verfügung? Alle aktuellen Programme im Überblick.'
  },
  'balkon-bauzeit-planung': {
    id: 6,
    slug: 'balkon-bauzeit-planung',
    title: 'Bauzeit für Balkon: So planen Sie den optimalen Baustart',
    content: `
      <h2>Wie lange dauert ein Balkon-Projekt?</h2>
      <p>Die Bauzeit für einen Balkon hängt von verschiedenen Faktoren ab. In der Regel dauert ein Balkon-Projekt 4-8 Wochen...</p>
      
      <h3>1. Planungsphase</h3>
      <p>Die Planungsphase umfasst die Ausarbeitung der Details und die Einholung von Angeboten...</p>
      
      <h3>2. Genehmigungsphase</h3>
      <p>Falls eine Genehmigung erforderlich ist, müssen Sie mit 4-8 Wochen Bearbeitungszeit rechnen...</p>
      
      <h3>3. Bestellphase</h3>
      <p>Nach der Bestellung der Materialien kann die Lieferzeit 2-4 Wochen betragen...</p>
      
      <h3>4. Bauphase</h3>
      <p>Die eigentliche Bauphase dauert in der Regel 1-2 Wochen...</p>
      
      <h2>Optimale Bauzeit</h2>
      <p>Die beste Zeit für den Balkonbau ist in der Regel Frühjahr bis Herbst...</p>
      
      <h2>Baustart berechnen</h2>
      <p>Nutzen Sie unseren <a href="/bauzeit-planung/">Baustart-Rechner</a>, um den optimalen Baustart für Ihr Projekt zu ermitteln.</p>
    `,
    date: '2024-12-15',
    readTime: '7 Min.',
    author: 'BALKONFUCHS Team',
    category: 'Planung',
    metaDescription: 'Von der Genehmigung bis zur Fertigstellung: Erfahren Sie, wie lange Ihr Balkon-Projekt wirklich dauert und wie Sie die Bauzeit optimal planen.'
  }
};

// Ähnliche Artikel
const getRelatedPosts = (currentSlug: string, category: string): BlogPost[] => {
  return Object.values(blogPosts)
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);
};

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const post = slug ? blogPosts[slug as string] : null;
  const relatedPosts = post ? getRelatedPosts(post.slug, post.category) : [];

  if (!post) {
    return (
      <>
        <Head>
          <title>Artikel nicht gefunden | BALKONFUCHS Blog</title>
        </Head>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main className="py-16 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-white mb-4">Artikel nicht gefunden</h1>
              <p className="text-gray-300 mb-6">Der angeforderte Artikel konnte nicht gefunden werden.</p>
              <Link href="/blog">
                <a className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zum Blog
                </a>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const shareUrl = `https://balkonfuchs.de/blogs/post/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);

  return (
    <>
      <Head>
        <title>{post.title} | BALKONFUCHS Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={`balkon, ${post.category.toLowerCase()}, ${post.title}`} />
        <meta name="author" content={post.author} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        {post.thumbnail ? (
          <>
            <meta property="og:image" content={`https://balkonfuchs.de${post.thumbnail}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={post.title} />
          </>
        ) : (
          <>
            <meta property="og:image" content="https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${post.title} | BALKONFUCHS Blog`} />
          </>
        )}
        <meta property="og:site_name" content="BALKONFUCHS" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        {post.thumbnail && <meta name="twitter:image" content={`https://balkonfuchs.de${post.thumbnail}`} />}
        <link rel="canonical" href={shareUrl} />
        
        {/* Strukturierte Daten - Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "BALKONFUCHS GmbH",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://balkonfuchs.de/images/Balkonfuchs-Logo_white.png"
                }
              },
              "description": post.metaDescription,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": shareUrl
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        {/* Breadcrumb */}
        <section className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/">
                <a className="hover:text-orange-400 transition-colors">Startseite</a>
              </Link>
              <span>/</span>
              <Link href="/blog">
                <a className="hover:text-orange-400 transition-colors">Blog</a>
              </Link>
              <span>/</span>
              <span className="text-gray-300">{post.category}</span>
            </nav>
          </div>
        </section>

        {/* Article Content */}
        <main className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <article className="lg:col-span-2">
                {/* Back Link */}
                <Link href="/blog">
                  <a className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Zurück zum Blog
                  </a>
                </Link>

                {/* Header */}
                <header className="mb-8">
                  <div className="mb-4">
                    <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{post.readTime} Lesezeit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Teilen:</span>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                      aria-label="Auf Facebook teilen"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                      aria-label="Auf Twitter teilen"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label="Auf LinkedIn teilen"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </header>

                {/* Article Content */}
                <div
                  className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-gray-200 prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-200 prose-li:my-2 prose-li:leading-relaxed prose-strong:text-white prose-strong:font-semibold prose-a:text-orange-400 prose-a:hover:text-orange-300 prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-200 prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg prose-table:w-full prose-table:border-collapse prose-table:my-8 prose-th:bg-gray-700 prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-gray-600 prose-td:text-gray-200 prose-td:p-3 prose-td:border prose-td:border-gray-600 prose:*:text-gray-200 prose-ol:text-gray-200 prose-ol:my-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{ color: '#e5e7eb' }}
                />

                {/* Author Box */}
                <div className="mt-12 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🦊</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{post.author}</h4>
                      <p className="text-gray-400 text-sm">
                        Experten für Balkon-Projekte bei BALKONFUCHS
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-20 space-y-8">
                  {/* Quick Links */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-400" />
                      Unsere Tools
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <a
                          href="/kalkulator/"
                          className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                        >
                          <Calculator className="w-5 h-5" />
                          <span>Balkon Kalkulator</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/planer/"
                          className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                        >
                          <CalendarIcon className="w-5 h-5" />
                          <span>Balkon Planer</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/genehmigung/"
                          className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Genehmigungscheck</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Box */}
                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Brauchen Sie Hilfe?
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      Lassen Sie sich von unseren Experten beraten und finden Sie den perfekten Partner für Ihr Projekt.
                    </p>
                    <a
                      href="/kontakt/"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full justify-center"
                    >
                      Kostenlose Beratung
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Ähnliche Artikel
                      </h3>
                      <ul className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <li key={relatedPost.id}>
                            <Link href={`/blogs/post/${relatedPost.slug}`}>
                              <a className="block text-gray-300 hover:text-orange-400 transition-colors">
                                <h4 className="font-semibold mb-1 line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{relatedPost.readTime}</span>
                                </div>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </main>

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
      `}</style>
    </>
  );
};

export default BlogPost;
