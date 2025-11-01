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
          <li style="color: #374151;">📍 Deine Bundesland-spezifischen Vorschriften</li>
          <li style="color: #374151;">🏠 Deine Projektsituation (Neubau/Bestand)</li>
          <li style="color: #374151;">📏 Größe und Art deines geplanten Balkons</li>
          <li style="color: #374151;">🗺️ Bebauungsplan-Situation</li>
        </ul>
        <p style="color: #111827;"><strong style="color: #111827;">→ <a href="/genehmigung/" style="color: #0066cc; text-decoration: underline; font-weight: bold;">Jetzt kostenlos prüfen in 60 Sekunden</a></strong></p>
        <p style="font-size: 0.9em; color: #6b7280;"><em>Über 3.400 Nutzer haben ihre Genehmigungsfrage bereits geklärt.</em></p>
      </div>

      <h2 id="grundlagen" style="color: #ffffff;">1. Das musst du wissen: Grundlagen der Baugenehmigung</h2>
      
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
        <p style="color: #374151;">Du <strong style="color: #111827;">musst</strong> den nachträglichen Balkonanbau immer im Vorfeld beim Bauamt mit einem <strong style="color: #111827;">Bauantrag anzeigen</strong>. Dann entscheiden:</p>
        <ol style="color: #374151;">
          <li style="color: #374151;">Die äußeren Umstände</li>
          <li style="color: #374151;">Das zuständige Bauamt</li>
          <li style="color: #374151;">Die Landesbauordnung deines Bundeslandes</li>
        </ol>
        <p style="color: #374151;">...in welcher Form eine Genehmigung für deinen Balkon erteilt werden kann.</p>
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
          <li style="color: #374151;">Du musst ALLE Unterlagen einreichen</li>
          <li style="color: #374151;">Du trägst die VOLLE Verantwortung</li>
          <li style="color: #374151;">ALLE Bauvorschriften müssen eingehalten werden</li>
        </ul>
      </div>

      <h3 style="color: #f3f4f6;">Die 6 Voraussetzungen für Genehmigungsfreistellung:</h3>

      <p style="color: #e5e7eb;">Damit dein Balkonprojekt überhaupt für eine Genehmigungsfreistellung infrage kommt, müssen <strong style="color: #ffffff;">ALLE</strong> dieser Punkte erfüllt sein:</p>

      <h4 style="color: #f3f4f6;">✅ 1. Gültiger Bebauungsplan</h4>
      <p style="color: #e5e7eb;">Dein Grundstück muss sich innerhalb eines Gebietes mit einem <strong style="color: #ffffff;">rechtskräftigen Bebauungsplan</strong> befinden.</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">So prüfst du das:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Kontakt zum örtlichen Bauamt</li>
        <li style="color: #e5e7eb;">Fragen nach &quot;Bebauungsplan-Geltungsbereich&quot;</li>
        <li style="color: #e5e7eb;">Oder nutze Online-Geoportale deiner Stadt</li>
      </ul>

      <h4 style="color: #f3f4f6;">✅ 2. Gebäudeklasse 1-3 (manchmal 4)</h4>
      <p style="color: #e5e7eb;">Dein Gebäude muss in die richtige Gebäudeklasse fallen:</p>
      
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

      <h4 style="color: #f3f4f6;">✅ 3. Übereinstimmung mit Bebauungsplan</h4>
      <p style="color: #e5e7eb;">Dein Balkon muss <strong style="color: #ffffff;">exakt</strong> den Vorgaben des B-Plans entsprechen:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Bauweise (offen/geschlossen)</li>
        <li style="color: #e5e7eb;">Baugrenzen und Baulinien</li>
        <li style="color: #e5e7eb;">Firstrichtung</li>
        <li style="color: #e5e7eb;">Dachform (falls relevant)</li>
        <li style="color: #e5e7eb;">Gestaltungsvorgaben</li>
      </ul>

      <h4 style="color: #f3f4f6;">✅ 4. Erschließung gesichert</h4>
      <p style="color: #e5e7eb;">(Bei Balkonen meist automatisch erfüllt):</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Wasser-/Abwasserversorgung</li>
        <li style="color: #e5e7eb;">Stromversorgung</li>
        <li style="color: #e5e7eb;">Zuwegung</li>
      </ul>

      <h4 style="color: #f3f4f6;">✅ 5. Landesbauordnung erfüllt</h4>
      <p style="color: #e5e7eb;">ALLE Anforderungen der jeweiligen Landesbauordnung müssen berücksichtigt werden:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Abstandsflächen</li>
        <li style="color: #e5e7eb;">Brandschutz</li>
        <li style="color: #e5e7eb;">Statik/Standsicherheit</li>
        <li style="color: #e5e7eb;">Barrierefreiheit (falls relevant)</li>
      </ul>

      <h4 style="color: #f3f4f6;">✅ 6. Keine Widerspruch vom Bauamt (4-Wochen-Frist)</h4>
      <p style="color: #e5e7eb;">Das Bauamt darf <strong style="color: #ffffff;">innerhalb von 4 Wochen</strong> nach Einreichung NICHT erklären, dass doch ein vollständiges Genehmigungsverfahren durchzuführen ist.</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Achtung:</strong> Das Bauamt kann JEDERZEIT widersprechen und ein reguläres Verfahren anordnen!</p>

      <h3 style="color: #f3f4f6;">Was bringt die Genehmigungsfreistellung?</h3>

      <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #111827; font-weight: bold;">⏱️ Zeitvorteil (Der Hauptvorteil):</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr style="background: #374151;">
              <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Verfahren</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bearbeitungszeit</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Vorteil</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border: 1px solid #4b5563; color: #111827;">Reguläre Baugenehmigung</td>
              <td style="padding: 12px; border: 1px solid #4b5563; color: #111827;">8-16 Wochen</td>
              <td style="padding: 12px; border: 1px solid #4b5563; color: #111827;">-</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; border: 1px solid #4b5563; color: #111827;">Genehmigungsfreistellung</td>
              <td style="padding: 12px; border: 1px solid #4b5563; color: #111827;">4 Wochen</td>
              <td style="padding: 12px; border: 1px solid #4b5563; color: #111827;">⚡ 50-75% schneller</td>
            </tr>
          </tbody>
        </table>
        <p style="color: #374151;"><strong style="color: #111827;">Wenn du innerhalb von 4 Wochen nichts vom Bauamt hörst = Du darfst bauen.</strong></p>

        <h4 style="margin-top: 20px; color: #111827; font-weight: bold;">📄 Weniger Unterlagen?</h4>
        <p style="color: #374151;"><strong style="color: #111827;">NEIN!</strong> Du musst die gleichen Unterlagen einreichen:</p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Bauantragsformulare</li>
          <li style="color: #374151;">Baupläne (Grundrisse, Ansichten, Schnitte)</li>
          <li style="color: #374151;">Lageplan</li>
          <li style="color: #374151;">Baubeschreibung</li>
          <li style="color: #374151;">Statische Berechnung</li>
          <li style="color: #374151;">Bauteilbeschreibungen</li>
        </ul>

        <h4 style="margin-top: 20px; color: #111827; font-weight: bold;">💰 Kostenersparnis?</h4>
        <p style="color: #374151;"><strong style="color: #111827;">JA, ABER:</strong> Nur bei den Gebühren, nicht bei der Planungsleistung:</p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Bauantragsgebühren: ~30% niedriger</li>
          <li style="color: #374151;">Architekten-/Ingenieurkosten: Gleich</li>
          <li style="color: #374151;">Statikkosten: Gleich</li>
        </ul>
      </div>

      <div style="background: #e7f3ff; padding: 20px; margin: 20px 0; border-left: 4px solid #0066cc; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #065f46; font-weight: bold;">🎯 Unsere Empfehlung:</h4>
        <p style="color: #374151;"><strong style="color: #111827;">Wann lohnt sich Genehmigungsfreistellung?</strong></p>
        <p style="color: #374151;"><strong style="color: #065f46;">✅ JA, wenn:</strong></p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Du in einem klaren B-Plan-Gebiet bist</li>
          <li style="color: #374151;">Deine Planung 100% sicher den Vorgaben entspricht</li>
          <li style="color: #374151;">Du einen erfahrenen Planer hast</li>
          <li style="color: #374151;">Zeit der kritische Faktor ist</li>
        </ul>
        <p style="color: #374151;"><strong style="color: #991b1b;">❌ NEIN, wenn:</strong></p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Dein Projekt auch nur leicht &quot;grenzwertig&quot; ist</li>
          <li style="color: #374151;">Unsicherheiten bei Abstandsflächen bestehen</li>
          <li style="color: #374151;">Der B-Plan Interpretationsspielraum lässt</li>
          <li style="color: #374151;">Du maximale Rechtssicherheit willst</li>
        </ul>
        <p style="color: #374151;"><strong style="color: #111827;">Warum?</strong> Bei der regulären Genehmigung prüft das Bauamt alles. Bei Freistellung trägst <strong style="color: #111827;">DU</strong> das volle Risiko fehlerhafter Planung!</p>
      </div>

      <h2 id="praxisbeispiele" style="color: #ffffff;">3. Praxis-Beispiele: So lief es bei anderen</h2>

      <h3 style="color: #f3f4f6;">📖 Geschichte 1: &quot;Ohne Baugenehmigung in Berlin&quot;</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Situation:</strong></p>
      <p style="color: #e5e7eb;">Ein Kunde rief mich an, nachdem er ein &quot;ausgesprochen günstiges&quot; Angebot von einem Metallbauer erhalten hatte.</p>
      
      <p style="color: #e5e7eb;">Bei meiner Rückfrage nach der Bau- und Lieferzeit kam die Frage:</p>
      <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;Haben Sie denn schon eine Baugenehmigung?&quot;</em></p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Seine Antwort:</strong></p>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 20px; margin: 20px 0; font-style: italic; color: #e5e7eb;">
        <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;Wieso Baugenehmigung? Dieses Unternehmen hat mir gesagt, dass sie unsere Balkone genau so angeboten haben, dass die Balkone <strong style="color: #ffffff;">ohne eine Baugenehmigung</strong> (IN BERLIN!) gebaut werden könnten und dass wir direkt loslegen können!&quot;</em></p>
      </blockquote>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Ausgerechnet in Berlin...</strong> 🙄</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was ich dann tat:</strong></p>
      <p style="color: #e5e7eb;">Nach längerem Hin und Her versprach ich dem Kunden, ihn kurzfristig zurückzurufen, und rief selbst beim zuständigen <strong style="color: #ffffff;">Bezirksbauamt in Berlin</strong> an.</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Die Antwort des Sachbearbeiters (im breitesten Berlinerisch):</strong></p>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 20px; margin: 20px 0; font-style: italic; color: #e5e7eb;">
        <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;Neeee - soo jeht det nich! Wir brauchen da eenen ordenlichen Antrag für dee Balkonee, sonst kieken de Kunden bald recht blöde aus de Wäsche, wenn wir denen ihre Balkone wieder <strong style="color: #ffffff;">abbauen lassen</strong>...&quot;</em></p>
      </blockquote>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Ergebnis:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">✅ Ich hatte recht behalten</li>
        <li style="color: #e5e7eb;">✅ Bauantrag wurde von uns kurzfristig erstellt</li>
        <li style="color: #e5e7eb;">✅ Genehmigung wurde erteilt</li>
        <li style="color: #e5e7eb;">✅ Vertrauenswürdiges Unternehmen gefunden</li>
        <li style="color: #e5e7eb;">✅ Balkone wurden im Frühjahr 2024 gebaut</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">💸 Was der Kunde gespart hat:</strong></p>
      <p style="color: #e5e7eb;">Durch frühzeitige Klärung: ~15.000€ (verhinderte Rückbaukosten) + Ärger + Zeit</p>

      <h3 style="color: #f3f4f6;">📖 Geschichte 2: &quot;Genehmigungsfreistellung in Baden-Württemberg&quot;</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Situation:</strong></p>
      <p style="color: #e5e7eb;">Ein befreundetes Schlossereiunternehmen teilte mir mit:</p>
      <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;In Baden-Württemberg brauchen wir seit 2019 doch gar keine Baugenehmigung mehr...&quot;</em></p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Woher hatte er das?</strong></p>
      <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;Das hat mir ein Architekt gesagt.&quot;</em></p>
      
      <p style="color: #e5e7eb;">⚠️ <strong style="color: #ffffff;">Hier glänzt gefährliches Halbwissen durch!</strong></p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was ich bei der Architektenkammer BW erfuhr:</strong></p>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 20px; margin: 20px 0; font-style: italic; color: #e5e7eb;">
        <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;Nein - eine Genehmigungsfreistellung entbindet <strong style="color: #ffffff;">NICHT</strong> von der Einreichung richtiger und vollständiger Unterlagen. Eine Genehmigungsfreistellung ist nur möglich, wenn sich das Bauvorhaben innerhalb eines Gebietes mit gültigem B-Plan befindet, der Landesbauordnung entspricht und den öffentlichen Bauvorschriften entspricht. Der Bauherr muss ALLE erforderlichen Unterlagen beim Bauamt einreichen und ist für Vollständigkeit und Richtigkeit verantwortlich!&quot;</em></p>
      </blockquote>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Die Gefahr:</strong></p>
      <p style="color: #e5e7eb;">Viele Handwerker und sogar Architekten interpretieren &quot;Genehmigungsfreistellung&quot; als &quot;keine Genehmigung nötig&quot; – <strong style="color: #ffffff;">fatal falsch!</strong></p>

      <h3 style="color: #f3f4f6;">📖 Geschichte 3: &quot;Der Hilferuf – 3 Monate Stillstand&quot;</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Situation:</strong></p>
      <p style="color: #e5e7eb;">Ein verzweifelter Bauherr rief an:</p>
      <blockquote style="border-left: 4px solid #f97316; padding-left: 20px; margin: 20px 0; font-style: italic; color: #e5e7eb;">
        <p style="color: #e5e7eb;"><em style="color: #d1d5db;">&quot;Wissen Sie, Herr Beyer - seit <strong style="color: #ffffff;">3 Monaten</strong> liegen die Unterlagen nun schon bei diesem Architekten... Und der hat noch <strong style="color: #ffffff;">keinen Strich geplant</strong>... Wann sollen wir denn den Balkon für unsere Mieter bauen? Wenn das so weitergeht, wird das dieses Jahr nichts mehr!&quot;</em></p>
      </blockquote>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Das Problem:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Architekt überlastet</li>
        <li style="color: #e5e7eb;">Balkonplanung hatte keine Priorität</li>
        <li style="color: #e5e7eb;">Bauzeit-Fenster drohte zu schließen</li>
        <li style="color: #e5e7eb;">Mieter wurden ungeduldig</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Unsere Lösung:</strong></p>
      <p style="color: #e5e7eb;">Wir haben daraufhin begonnen, auch Bauanträge anzubieten – nicht um Architekten Konkurrenz zu machen, sondern als <strong style="color: #ffffff;">schnelle Alternative</strong> für zeitkritische Projekte.</p>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Ergebnis:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">✅ Bauantrag in 10 Tagen fertig</li>
        <li style="color: #e5e7eb;">✅ Genehmigung nach 6 Wochen</li>
        <li style="color: #e5e7eb;">✅ Bau noch im selben Jahr</li>
        <li style="color: #e5e7eb;">✅ Zufriedene Mieter</li>
      </ul>

      <div style="background: #fff8e1; padding: 20px; margin: 20px 0; border-left: 4px solid #ff9800; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #92400e; font-weight: bold;">💼 Brauchst du Unterstützung bei deinem Bauantrag?</h4>
        <p style="color: #374151;">Mit unserem <strong style="color: #111827;">BalkonPlaner</strong> strukturierst du dein Projekt professionell und hast alle Unterlagen für den Bauantrag bereits vorbereitet.</p>
        <p style="color: #111827;"><strong style="color: #111827;">→ <a href="/planer/" style="color: #f97316; text-decoration: underline; font-weight: bold;">Zum BalkonPlaner</a></strong> — Projekt in 15 Minuten durchplanen</p>
      </div>

      <h2 id="6-schritte" style="color: #ffffff;">4. Die 6 Schritte zum genehmigten Balkon</h2>

      <h3 style="color: #f3f4f6;">Schritt 1: Projekt definieren ⏱️ 1-2 Tage</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was du tun musst:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Balkontyp festlegen (Vorstellbalkon, Anbaubalkon, Kragarmbalkon)</li>
        <li style="color: #e5e7eb;">Größe bestimmen</li>
        <li style="color: #e5e7eb;">Position am Gebäude</li>
        <li style="color: #e5e7eb;">Budget grob einschätzen</li>
      </ul>

      <div style="background: #e8f5e9; padding: 15px; margin: 15px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151; margin: 0;"><strong style="color: #111827;">🛠️ Hilfreich:</strong> <a href="/kalkulator/" style="color: #16a34a; text-decoration: underline; font-weight: bold;">BalkonKalkulator</a> — Kosten in 2 Minuten berechnen</p>
      </div>

      <h3 style="color: #f3f4f6;">Schritt 2: Genehmigungspflicht prüfen ⏱️ 5 Minuten</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was du tun musst:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Bundesland prüfen</li>
        <li style="color: #e5e7eb;">Gebäudesituation einschätzen</li>
        <li style="color: #e5e7eb;">Bebauungsplan-Lage klären</li>
      </ul>

      <div style="background: #e8f5e9; padding: 15px; margin: 15px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151; margin: 0;"><strong style="color: #111827;">🛠️ Hilfreich:</strong> <a href="/genehmigung/" style="color: #16a34a; text-decoration: underline; font-weight: bold;">Genehmigungscheck</a> — In 60 Sekunden Klarheit</p>
      </div>

      <h3 style="color: #f3f4f6;">Schritt 3: Planer beauftragen ⏱️ 1-2 Wochen</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Wen du brauchst:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Architekt (mit Bauvorlageberechtigung) ODER</li>
        <li style="color: #e5e7eb;">Bauingenieur (mit Bauvorlageberechtigung) ODER</li>
        <li style="color: #e5e7eb;">Statiker (für kleinere Projekte, je nach Bundesland)</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was der Planer macht:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Entwurfsplanung</li>
        <li style="color: #e5e7eb;">Bauzeichnungen (Grundriss, Ansicht, Schnitt)</li>
        <li style="color: #e5e7eb;">Lageplan</li>
        <li style="color: #e5e7eb;">Baubeschreibung</li>
        <li style="color: #e5e7eb;">Koordination mit Statiker</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Architekt: 1.500-4.000€ (je nach Honorarzone und Projektgröße)</li>
        <li style="color: #e5e7eb;">Statiker: 500-1.500€</li>
      </ul>

      <h3 style="color: #f3f4f6;">Schritt 4: Statik berechnen lassen ⏱️ 1-2 Wochen</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was gebraucht wird:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Standsicherheitsnachweis</li>
        <li style="color: #e5e7eb;">Berechnung der Lasten</li>
        <li style="color: #e5e7eb;">Nachweis der Befestigung</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Wer das macht:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Tragwerksplaner / Statiker</li>
        <li style="color: #e5e7eb;">Oft vom Architekten beauftragt</li>
        <li style="color: #e5e7eb;">Manchmal vom Balkonfertiger (wenn System-Balkon)</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten:</strong> 500-1.500€ je nach Komplexität</p>

      <h3 style="color: #f3f4f6;">Schritt 5: Bauantrag einreichen ⏱️ 1-3 Tage</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Benötigte Unterlagen:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">☐ Ausgefülltes Bauantragsformular</li>
        <li style="color: #e5e7eb;">☐ Bauzeichnungen (Grundrisse, Ansichten, Schnitte) im Maßstab 1:100 oder 1:50</li>
        <li style="color: #e5e7eb;">☐ Lageplan im Maßstab 1:500 (mit eingezeichneten Abstandsflächen)</li>
        <li style="color: #e5e7eb;">☐ Baubeschreibung</li>
        <li style="color: #e5e7eb;">☐ Statische Berechnung + Standsicherheitsnachweis</li>
        <li style="color: #e5e7eb;">☐ Bauteilbeschreibungen (Material, Brandschutz)</li>
        <li style="color: #e5e7eb;">☐ Unterschrift eines Bauvorlageberechtigten</li>
        <li style="color: #e5e7eb;">☐ Bei WEG: Zustimmung der Eigentümergemeinschaft</li>
        <li style="color: #e5e7eb;">☐ Bei Denkmalschutz: Stellungnahme der Denkmalschutzbehörde</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Wo einreichen:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Zuständiges Bauamt deiner Stadt/Gemeinde</li>
        <li style="color: #e5e7eb;">Oft online möglich</li>
        <li style="color: #e5e7eb;">Persönliche Abgabe oder per Post</li>
      </ul>

      <h3 style="color: #f3f4f6;">Schritt 6: Genehmigung abwarten ⏱️ 4-16 Wochen</h3>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Bearbeitungszeiten nach Bundesland:</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bundesland</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Regulär</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Vereinfacht</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Freistellung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bayern</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-12 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-8 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">4 Wochen</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Baden-Württemberg</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-12 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-8 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">4 Wochen</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Berlin</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">10-16 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">-</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">NRW</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-12 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-8 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">4 Wochen</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Hessen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">4-6 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">4 Wochen</td>
          </tr>
        </tbody>
      </table>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was passiert währenddessen:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Formale Prüfung durch Bauamt</li>
        <li style="color: #e5e7eb;">Ggf. Anhörung der Nachbarn</li>
        <li style="color: #e5e7eb;">Ggf. Rückfragen/fehlende Unterlagen</li>
        <li style="color: #e5e7eb;">Prüfung durch Fachbehörden (Brandschutz, Denkmalschutz)</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Mögliche Ergebnisse:</strong></p>
      <ol style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">✅ Genehmigung wird erteilt → Du darfst bauen</li>
        <li style="color: #e5e7eb;">⚠️ Genehmigung mit Auflagen → Nachbesserung, dann bauen</li>
        <li style="color: #e5e7eb;">❌ Ablehnung → Überarbeitung oder anderes Konzept</li>
      </ol>

      <h2 id="bundeslaender" style="color: #ffffff;">5. 16 Bundesländer im Vergleich (Stand 2025)</h2>

      <h3 style="color: #f3f4f6;">🏔️ Bayern</h3>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungspflicht:</strong> Fast immer erforderlich</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Besonderheiten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Strenge Vorgaben, besonders bei Denkmalschutz</li>
        <li style="color: #e5e7eb;">Oft aufwendige Gestaltungssatzungen</li>
        <li style="color: #e5e7eb;">Nachbaranhörung obligatorisch</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Typische Bearbeitungszeit:</strong> 8-12 Wochen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten Bauantrag:</strong> 350-800€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> Möglich bei Erfüllung aller Kriterien</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">🆕 Änderungen 2024/2025:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">BayBO Art. 57: Vereinfachungen für kleinere Anbauten unter 30m²</li>
        <li style="color: #e5e7eb;">Aber: Weiterhin Anzeigepflicht beim Bauamt</li>
      </ul>

      <h3 style="color: #f3f4f6;">🍷 Baden-Württemberg</h3>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungspflicht:</strong> In den meisten Fällen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Besonderheiten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Genehmigungsfreistellung seit 2019 erweitert</li>
        <li style="color: #e5e7eb;">Umweltverträglichkeitsprüfung bei größeren Projekten möglich</li>
        <li style="color: #e5e7eb;">Städtebauliche Verträge oft üblich</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Typische Bearbeitungszeit:</strong> 6-10 Wochen (mit Freistellung: 4 Wochen)</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten Bauantrag:</strong> 300-700€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> Ja, bei Erfüllung der Voraussetzungen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">🆕 Änderungen 2024/2025:</strong> LBO BW §50: Erweiterte Freistellungsmöglichkeiten für GK 1-3</p>

      <h3 style="color: #f3f4f6;">🏛️ Berlin</h3>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungspflicht:</strong> Ja, fast immer</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Besonderheiten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Sehr strenge Prüfung, überlastete Bauämter</li>
        <li style="color: #e5e7eb;">Lange Bearbeitungszeiten</li>
        <li style="color: #e5e7eb;">Besondere Vorgaben bei Altbau und Denkmalschutz</li>
        <li style="color: #e5e7eb;">Nachbarrechte sehr wichtig</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Typische Bearbeitungszeit:</strong> 12-20 Wochen (!!)</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten Bauantrag:</strong> 400-900€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> Nicht verfügbar</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">🆕 Änderungen 2024/2025:</strong> Neue Online-Portal für Bauanträge (teilweise Beschleunigung)</p>

      <h3 style="color: #f3f4f6;">🏰 Nordrhein-Westfalen</h3>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungspflicht:</strong> Ja, in den meisten Fällen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Besonderheiten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Bebauungsplan-Überprüfung sehr wichtig</li>
        <li style="color: #e5e7eb;">Nachbarschaftsrecht beachten</li>
        <li style="color: #e5e7eb;">Stadt-spezifische Gestaltungssatzungen</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Typische Bearbeitungszeit:</strong> 6-10 Wochen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten Bauantrag:</strong> 300-750€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> Ja, möglich</p>

      <h3 style="color: #f3f4f6;">🍎 Hessen</h3>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungspflicht:</strong> Ja</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Besonderheiten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Hessische Bauordnung (HBO) maßgeblich</li>
        <li style="color: #e5e7eb;">Brandschutz spielt große Rolle</li>
        <li style="color: #e5e7eb;">Relativ zügige Bearbeitung</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Typische Bearbeitungszeit:</strong> 6-8 Wochen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten Bauantrag:</strong> 250-600€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> Ja, bei Erfüllung der Voraussetzungen</p>

      <h3 style="color: #f3f4f6;">🌊 Niedersachsen</h3>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungspflicht:</strong> Ja</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Besonderheiten:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Ländliche Gebiete oft weniger streng</li>
        <li style="color: #e5e7eb;">Küstenregionen: Besondere Wind-/Wettervorgaben</li>
        <li style="color: #e5e7eb;">Niedersächsische Bauordnung (NBauO)</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Typische Bearbeitungszeit:</strong> 6-10 Wochen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten Bauantrag:</strong> 250-650€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> Teilweise möglich</p>

      <h3 style="color: #f3f4f6;">📍 Weitere Bundesländer (Kurzübersicht):</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bundesland</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bearbeitungszeit</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Kosten</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Freistellung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Brandenburg</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">250-600€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Ja</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Sachsen</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">300-650€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Thüringen</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-8 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">250-550€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Mecklenburg-Vorp.</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-12 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">300-700€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Sachsen-Anhalt</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">250-600€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Schleswig-Holstein</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">300-650€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Hamburg</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-12 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">400-800€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Nein</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Bremen</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">8-12 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">350-750€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Nein</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Rheinland-Pfalz</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">300-650€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;"><strong style="color: #ffffff;">Saarland</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">6-10 Wochen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">300-600€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Teilweise</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #e3f2fd; padding: 20px; margin: 20px 0; text-align: center; border-radius: 4px; color: #111827;">
        <h3 style="margin-top: 0; color: #1e40af; font-weight: bold;">🔍 Dein Bundesland ist nicht dabei oder du brauchst Details?</h3>
        <p style="color: #374151;">Unser <a href="/genehmigung/" style="color: #2563eb; text-decoration: underline; font-weight: bold;">Genehmigungscheck</a> kennt die Vorschriften ALLER 16 Bundesländer und gibt dir eine präzise Einschätzung für dein Projekt.</p>
        <p style="color: #111827;"><strong style="color: #111827;">→ <a href="/genehmigung/" style="color: #2563eb; text-decoration: underline; font-weight: bold;">Jetzt kostenlos prüfen</a></strong></p>
      </div>

      <h2 id="kosten" style="color: #ffffff;">6. Kosten der Baugenehmigung (Realistische Übersicht 2025)</h2>

      <h3 style="color: #f3f4f6;">Gesamtkosten im Überblick:</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Position</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Von</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bis</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Durchschnitt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bauantragsgebühren</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">200€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">900€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">450€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Statische Berechnung</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">500€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">1.800€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">1.000€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Architektenleistungen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">1.500€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">4.500€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">2.500€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Grundbuchauszug</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">20€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">50€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">30€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Vermessung (falls nötig)</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">300€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">800€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">500€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #ffffff;"><strong>📊 GESAMT</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #ffffff;"><strong>2.520€</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #ffffff;"><strong>8.050€</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #ffffff;"><strong>4.480€</strong></td>
          </tr>
        </tbody>
      </table>

      <h3 style="color: #f3f4f6;">Detaillierte Kostenaufschlüsselung:</h3>

      <h4 style="color: #f3f4f6;">1️⃣ Bauantragsgebühren (Bauamt)</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Berechnung:</strong> Nach Baukosten und Gebührenordnung des jeweiligen Bundeslandes</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Beispielrechnung für Balkon 6m² (ca. 8.000€ Baukosten):</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Bayern: ~450€</li>
        <li style="color: #e5e7eb;">Berlin: ~550€</li>
        <li style="color: #e5e7eb;">NRW: ~350€</li>
        <li style="color: #e5e7eb;">Hessen: ~320€</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Bei Genehmigungsfreistellung:</strong> ~30% günstiger</p>

      <h4 style="color: #f3f4f6;">2️⃣ Statische Berechnung</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Abhängig von:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Größe des Balkons</li>
        <li style="color: #e5e7eb;">Balkontyp (Vorstellbalkon günstiger, Kragarm teurer)</li>
        <li style="color: #e5e7eb;">Gebäudesituation (Altbau komplexer)</li>
        <li style="color: #e5e7eb;">Aufwand der Berechnung</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten nach Balkontyp:</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Balkontyp</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Statikkosten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Vorstellbalkon (selbsttragend)</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">500-900€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Anbaubalkon (teilselbsttragend)</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">700-1.200€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Kragarmbalkon (freitragend)</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">1.200-1.800€</td>
          </tr>
        </tbody>
      </table>

      <h4 style="color: #f3f4f6;">3️⃣ Architektenleistungen</h4>
      <p style="color: #e5e7eb;">Architekten rechnen üblicherweise nach <strong style="color: #ffffff;">Leistungsphasen</strong> ab:</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Für Bauantrag benötigte Leistungsphasen:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">LP 2: Vorplanung</li>
        <li style="color: #e5e7eb;">LP 3: Entwurfsplanung</li>
        <li style="color: #e5e7eb;">LP 4: Genehmigungsplanung</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten-Beispiel für 10m² Balkon (15.000€ Baukosten):</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Honorarzone II, Mindestsatz: ~1.800€</li>
        <li style="color: #e5e7eb;">Honorarzone III, Mittelsatz: ~2.500€</li>
        <li style="color: #e5e7eb;">Honorarzone IV, Höchstsatz: ~3.500€</li>
      </ul>

      <div style="background: #fff3cd; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #92400e; font-weight: bold;">✅ Wo du sparen kannst:</h4>
        <ol style="color: #374151;">
          <li style="color: #374151;"><strong style="color: #111827;">Systembalkon statt Individual-Lösung</strong> - Ersparnis: 500-1.000€ bei Planung/Statik</li>
          <li style="color: #374151;"><strong style="color: #111827;">Genehmigungsfreistellung nutzen</strong> - Ersparnis: ~150€ Gebühren (aber nur wenn Voraussetzungen 100% passen)</li>
          <li style="color: #374151;"><strong style="color: #111827;">Mehrere Balkone gleichzeitig</strong> - Planerkosten steigen nicht proportional, Bauantragsgebühren nur einmal</li>
        </ol>
        <h4 style="margin-top: 20px; color: #991b1b; font-weight: bold;">⚠️ Versteckte Zusatzkosten:</h4>
        <ul style="color: #374151;">
          <li style="color: #374151;">Nachbaranhörung (manche Bundesländer): 50-150€</li>
          <li style="color: #374151;">Denkmalschutzgutachten: 500-2.000€</li>
          <li style="color: #374151;">Bodengutachten (bei Vorstellbalkon): 400-800€</li>
          <li style="color: #374151;">Baumfäll-Genehmigung: 100-500€</li>
          <li style="color: #374151;">Leitungsauskunft Ver-/Entsorgung: 50-200€</li>
        </ul>
      </div>

      <div style="background: #e8f5e9; padding: 20px; margin: 20px 0; text-align: center; border-radius: 4px; color: #111827;">
        <h3 style="margin-top: 0; color: #065f46; font-weight: bold;">🧮 Gesamtkosten für dein Projekt berechnen</h3>
        <p style="color: #374151;">Nutze unseren <strong style="color: #111827;">BalkonKalkulator</strong> für eine detaillierte Kostenübersicht — inkl. Genehmigungskosten, Baukosten und allen Nebenkosten.</p>
        <p style="color: #111827;"><strong style="color: #111827;">→ <a href="/kalkulator/" style="color: #16a34a; text-decoration: underline; font-weight: bold;">Jetzt Kosten berechnen</a></strong> (2 Minuten)</p>
      </div>

      <h2 id="schwarzbau" style="color: #ffffff;">7. Was passiert bei Schwarzbau? (Die harten Konsequenzen)</h2>

      <h3 style="color: #f3f4f6;">Definition: Was ist ein Schwarzbau?</h3>
      
      <div style="background: #fee2e2; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #991b1b; font-weight: bold;">🚨 Schwarzbau liegt vor, wenn:</h4>
        <ul style="color: #374151;">
          <li style="color: #374151;">Du OHNE Bauantrag/Anzeige beim Bauamt baust</li>
          <li style="color: #374151;">Du OHNE die erforderliche Genehmigung baust</li>
          <li style="color: #374151;">Du ABWEICHEND von der erteilten Genehmigung baust</li>
        </ul>
        <p style="color: #111827;"><strong style="color: #111827;">Jeder dieser Fälle = Ordnungswidrigkeit oder Straftat!</strong></p>
      </div>

      <h3 style="color: #f3f4f6;">Die 3 Stufen der Konsequenzen:</h3>

      <h4 style="color: #f3f4f6;">Stufe 1: 🔴 Baueinstellung & Nutzungsverbot</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was passiert:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Sofortige Baustop-Anordnung</li>
        <li style="color: #e5e7eb;">Nutzungsverbot für den Balkon</li>
        <li style="color: #e5e7eb;">Versiegelung des Balkons (Zutritt verboten)</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Dauer:</strong> Bis zur nachträglichen Genehmigung oder Rückbau</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten:</strong> Verwaltungsgebühren 200-500€</p>

      <h4 style="color: #f3f4f6;">Stufe 2: 💰 Bußgeld</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Höhe nach Bundesland:</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bundesland</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Bußgeldrahmen</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Typisches Bußgeld</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bayern</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bis 500.000€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">5.000-20.000€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Baden-Württemberg</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bis 500.000€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">3.000-15.000€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Berlin</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bis 50.000€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">2.000-10.000€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">NRW</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bis 100.000€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">3.000-15.000€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Hessen</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Bis 50.000€</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">2.000-12.000€</td>
          </tr>
        </tbody>
      </table>

      <h4 style="color: #f3f4f6;">Stufe 3: 🏗️ Rückbau-Anordnung</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Was das bedeutet:</strong></p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Kompletter Abriss des Balkons</li>
        <li style="color: #e5e7eb;">Wiederherstellung des Ursprungszustands</li>
        <li style="color: #e5e7eb;">Alle Kosten trägt der Bauherr</li>
      </ul>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Reale Kosten eines Rückbaus:</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #374151;">
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Position</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #4b5563; color: #ffffff;">Kosten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Demontage des Balkons</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">2.000-5.000€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Fassadeninstandsetzung</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">1.500-4.000€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Entsorgung</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">500-1.500€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Gutachten</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">500-1.000€</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">Anwaltskosten</td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #e5e7eb;">2.000-5.000€</td>
          </tr>
          <tr style="background: #1f2937;">
            <td style="padding: 12px; border: 1px solid #4b5563; color: #ffffff;"><strong>GESAMT</strong></td>
            <td style="padding: 12px; border: 1px solid #4b5563; color: #ffffff;"><strong>6.500-16.500€</strong></td>
          </tr>
        </tbody>
      </table>
      
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Plus:</strong> Der ursprüngliche Balkonbau (10.000-30.000€) ist komplett verloren!</p>

      <div style="background: #fff3cd; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #92400e; font-weight: bold;">🏠 Probleme beim Immobilienverkauf</h4>
        <p style="color: #374151;">Schwarzbauten müssen offengelegt werden:</p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Kaufpreis-Minderung um 10-30%</li>
          <li style="color: #374151;">Käufer kann vom Kauf zurücktreten</li>
          <li style="color: #374151;">Käufer kann Nachbesserung verlangen</li>
          <li style="color: #374151;">Risiko für Schadensersatzklagen</li>
        </ul>
        <h4 style="margin-top: 20px; color: #991b1b; font-weight: bold;">🔥 Versicherungsschutz gefährdet</h4>
        <p style="color: #374151;">Gebäudeversicherung kann Leistung verweigern bei Schäden durch Schwarzbau. Haftpflicht bietet keine Deckung bei Unfällen durch nicht-genehmigten Balkon.</p>
      </div>

      <h2 id="fehler" style="color: #ffffff;">8. Häufige Fehler vermeiden (Aus 850+ Projekten gelernt)</h2>

      <h3 style="color: #f3f4f6;">❌ Fehler 1: &quot;Das ist doch nur ein kleiner Balkon&quot;</h3>
      
      <div style="background: #ffebee; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151;"><strong style="color: #111827;">Mythos:</strong> <em>&quot;Für kleine Balkone unter 5m² braucht man doch keine Genehmigung...&quot;</em></p>
        <p style="color: #374151;"><strong style="color: #111827;">Wahrheit:</strong> Die Größe ist <strong style="color: #111827;">NICHT</strong> das entscheidende Kriterium für die Genehmigungspflicht!</p>
        <p style="color: #374151;"><strong style="color: #111827;">Selbst 1m² Balkon = genehmigungspflichtig!</strong></p>
      </div>

      <h3 style="color: #f3f4f6;">❌ Fehler 2: &quot;Verfahrensfrei = Genehmigungsfrei&quot;</h3>
      
      <div style="background: #ffebee; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151;"><strong style="color: #111827;">Falsche Gleichung:</strong> Genehmigungsfreistellung = Keine Genehmigung nötig ❌</p>
        <p style="color: #374151;"><strong style="color: #111827;">Richtig:</strong> Genehmigungsfreistellung = Vereinfachtes Verfahren ✅</p>
        <p style="color: #374151;">Du musst trotzdem alle Unterlagen einreichen, alle Bauvorschriften einhalten und dem Bauamt das Projekt anzeigen.</p>
      </div>

      <h3 style="color: #f3f4f6;">❌ Fehler 3: Auf Handwerker-Versprechen vertrauen</h3>
      
      <div style="background: #ffebee; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151;"><strong style="color: #111827;">Typisches Szenario:</strong> Handwerksbetrieb verspricht: <em>&quot;Das geht auch ohne Genehmigung, machen wir ständig so...&quot;</em></p>
        <p style="color: #374151;"><strong style="color: #111827;">Warum das gefährlich ist:</strong> Handwerker haftet NICHT für fehlende Genehmigung. Du als Bauherr trägst volle Verantwortung!</p>
        <p style="color: #374151;"><strong style="color: #065f46;">✅ Richtige Vorgehensweise:</strong> Lass dir schriftlich bestätigen, dass Genehmigung eingeholt wurde. Zahl erst nach Genehmigungsvorlage die Schlusszahlung.</p>
      </div>

      <h3 style="color: #f3f4f6;">❌ Fehler 4: Nachbarn nicht informieren</h3>
      
      <div style="background: #ffebee; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151;">Auch wenn rechtlich nicht zwingend nötig, können verärgerte Nachbarn beim Bauamt Beschwerde einlegen, Widerspruch einlegen und Verfahren verzögern.</p>
        <p style="color: #374151;"><strong style="color: #065f46;">✅ Praxis-Tipp:</strong> Informiere Nachbarn frühzeitig, zeige Pläne und erkläre das Projekt. Hole dir schriftliche Zustimmung.</p>
      </div>

      <h3 style="color: #f3f4f6;">❌ Fehler 5: Billigst-Angebot ohne Prüfung annehmen</h3>
      
      <div style="background: #ffebee; padding: 20px; margin: 20px 0; border-radius: 4px; color: #111827;">
        <p style="color: #374151;"><strong style="color: #111827;">Warnsignal:</strong> Angebot ist 30-50% günstiger als andere Angebote</p>
        <p style="color: #374151;"><strong style="color: #111827;">Häufige Gründe:</strong> Keine ordnungsgemäße Statik eingeplant, keine Genehmigungskosten einkalkuliert, minderwertige Materialien</p>
      </div>

      <div style="background: #d4edda; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745; border-radius: 4px; color: #111827;">
        <h4 style="margin-top: 0; color: #065f46; font-weight: bold;">✅ Die 5 Golden Rules für erfolgreiche Projekte:</h4>
        <ol style="color: #374151;">
          <li style="color: #374151;"><strong style="color: #111827;">Bauamt IMMER einbeziehen</strong> – Keine Ausnahmen!</li>
          <li style="color: #374151;"><strong style="color: #111827;">Professionelle Planung</strong> – Architekt/Ingenieur beauftragen</li>
          <li style="color: #374151;"><strong style="color: #111827;">Nachbarn frühzeitig informieren</strong> – Konflikte vermeiden</li>
          <li style="color: #374151;"><strong style="color: #111827;">Seriöse Handwerker</strong> – Referenzen prüfen, nicht nur Preis</li>
          <li style="color: #374151;"><strong style="color: #111827;">Geduld haben</strong> – Baurecht braucht Zeit, aber schützt auch</li>
        </ol>
      </div>

      <h2 id="faq" style="color: #ffffff;">9. FAQ: Deine Fragen beantwortet</h2>

      <h3 style="color: #f3f4f6;">🔍 Allgemeine Fragen</h3>

      <h4 style="color: #f3f4f6;">❓ Brauche ich für jeden Balkon eine Baugenehmigung?</h4>
      <p style="color: #e5e7eb;">Ja, für <strong style="color: #ffffff;">nachträglich angebaute</strong> Balkone benötigst du in den allermeisten Fällen eine Baugenehmigung bzw. musst den Balkon beim Bauamt anzeigen.</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Ausnahmen sind extrem selten</strong> und betreffen meist:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Balkone in Neubauten (bereits im Bauantrag des Hauses enthalten)</li>
        <li style="color: #e5e7eb;">Winzige Balkone unter 1m² (in manchen Bundesländern)</li>
        <li style="color: #e5e7eb;">Reine Instandsetzung bestehender Balkone (ohne Vergrößerung)</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">→ <a href="/genehmigung/" style="color: #f97316; text-decoration: underline; font-weight: bold;">Prüfe dein Projekt kostenlos</a></strong></p>

      <h4 style="color: #f3f4f6;">❓ Wie lange dauert das Genehmigungsverfahren?</h4>
      <p style="color: #e5e7eb;">Die Dauer variiert nach Bundesland und Verfahrensart:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Reguläres Verfahren:</strong> 6-16 Wochen</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Vereinfachtes Verfahren:</strong> 4-8 Wochen</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Genehmigungsfreistellung:</strong> 4 Wochen (wenn keine Rückmeldung = Start erlaubt)</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Tipp:</strong> Plane immer 2-3 Monate ein für die komplette Vorlaufzeit (Planung + Genehmigung).</p>

      <h4 style="color: #f3f4f6;">❓ Was kostet eine Baugenehmigung für einen Balkon?</h4>
      <p style="color: #e5e7eb;">Die Gesamtkosten für die Genehmigung setzen sich zusammen aus:</p>
      <ol style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Bauantragsgebühren: 200-900€</li>
        <li style="color: #e5e7eb;">Statik: 500-1.800€</li>
        <li style="color: #e5e7eb;">Architekt/Planer: 1.500-4.500€</li>
        <li style="color: #e5e7eb;">Sonstiges: 200-500€</li>
      </ol>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Durchschnittlich:</strong> 3.000-5.000€</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Wichtig:</strong> Diese Kosten kommen zu den reinen Baukosten (8.000-30.000€) hinzu!</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">→ <a href="/kalkulator/" style="color: #f97316; text-decoration: underline; font-weight: bold;">Gesamtkosten mit Kalkulator berechnen</a></strong></p>

      <h3 style="color: #f3f4f6;">📋 Fragen zum Genehmigungsverfahren</h3>

      <h4 style="color: #f3f4f6;">❓ Kann ich den Bauantrag selbst stellen?</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Theoretisch ja, praktisch meist nein.</strong></p>
      <p style="color: #e5e7eb;">Bauanträge erfordern Unterschrift eines &quot;Bauvorlageberechtigten&quot; (Architekten, Bauingenieure, bestimmte Handwerksmeister). Ohne diese Qualifikation wird der Antrag nicht angenommen.</p>
      <p style="color: #e5e7eb;">Mit unserem <a href="/planer/" style="color: #f97316; text-decoration: underline; font-weight: bold;">BalkonPlaner</a> kannst du dein Projekt strukturieren und hast alle Unterlagen bereits vorbereitet.</p>

      <h4 style="color: #f3f4f6;">❓ Was ist, wenn mein Balkon abgelehnt wird?</h4>
      <p style="color: #e5e7eb;">Eine Ablehnung ist selten, aber möglich. Deine Optionen:</p>
      <ol style="color: #e5e7eb;">
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Überarbeitung:</strong> Planung anpassen und neu einreichen</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Nachbarvereinbarung:</strong> Zustimmung der Nachbarn einholen</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Alternatives Konzept:</strong> Andere Balkonlösung wählen</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">Widerspruch:</strong> Bei offensichtlich falscher Ablehnung</li>
      </ol>

      <h4 style="color: #f3f4f6;">❓ Brauche ich die Zustimmung meiner Nachbarn?</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Rechtlich:</strong> In den meisten Fällen nein (außer bei Abstandsunterschreitungen)</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Praktisch:</strong> Trotzdem sehr empfehlenswert! Nachbarn können Einspruch einlegen, Widerspruch gegen Genehmigung einlegen und Verfahren verzögern.</p>
      <p style="color: #e5e7eb;"><strong style="color: #065f46;">✅ Unser Tipp:</strong> Informiere Nachbarn frühzeitig, zeige Pläne und hole schriftliche Zustimmung ein.</p>

      <h3 style="color: #f3f4f6;">🏗️ Fragen zu Balkontypen</h3>

      <h4 style="color: #f3f4f6;">❓ Welcher Balkontyp braucht keine Genehmigung?</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Keiner.</strong> Alle nachträglich angebauten Balkontypen sind genehmigungspflichtig:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">❌ Vorstellbalkon (selbsttragend) → Genehmigung nötig</li>
        <li style="color: #e5e7eb;">❌ Anbaubalkon (teilselbsttragend) → Genehmigung nötig</li>
        <li style="color: #e5e7eb;">❌ Kragarmbalkon (freitragend) → Genehmigung nötig</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Leichteste Genehmigung:</strong> Vorstellbalkon (keine Eingriffe ins Gebäude)</p>

      <h3 style="color: #f3f4f6;">💰 Fragen zu Kosten & Förderung</h3>

      <h4 style="color: #f3f4f6;">❓ Gibt es Förderungen für Balkonanbau?</h4>
      <p style="color: #e5e7eb;">Ja! Es gibt verschiedene Fördermöglichkeiten:</p>
      <ul style="color: #e5e7eb;">
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">KfW 261:</strong> Energetische Sanierung (bis 20% Zuschuss)</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">KfW 159:</strong> Denkmalschutz (bis 25% Zuschuss)</li>
        <li style="color: #e5e7eb;"><strong style="color: #ffffff;">KfW 124:</strong> Wohnraum modernisieren (günstiger Kredit)</li>
      </ul>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Voraussetzungen:</strong> Antrag VOR Baubeginn, Fachplaner einbinden</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">→ <a href="/foerderung/" style="color: #f97316; text-decoration: underline; font-weight: bold;">Alle Förderungen im Überblick</a></strong></p>

      <h3 style="color: #f3f4f6;">🚨 Fragen zu Problemen</h3>

      <h4 style="color: #f3f4f6;">❓ Was passiert, wenn ich ohne Genehmigung baue?</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Schwarzbau hat harte Konsequenzen:</strong></p>
      <ol style="color: #e5e7eb;">
        <li style="color: #e5e7eb;">Baueinstellung: Sofortiger Baustopp</li>
        <li style="color: #e5e7eb;">Bußgeld: 2.000-50.000€ (je nach Bundesland)</li>
        <li style="color: #e5e7eb;">Nutzungsverbot: Balkon darf nicht benutzt werden</li>
        <li style="color: #e5e7eb;">Rückbau-Anordnung: Kompletter Abriss + Ursprungszustand</li>
        <li style="color: #e5e7eb;">Versicherungsprobleme: Kein Schutz bei Schäden</li>
        <li style="color: #e5e7eb;">Immobilienverkauf: Massive Wertminderung</li>
      </ol>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Gesamtkosten im Worst Case:</strong> Bußgeld (10.000€) + Rückbau (8.000€) + Ursprüngliche Baukosten (20.000€) + Anwaltskosten (5.000€) = <strong style="color: #ffffff;">43.000€ Totalverlust</strong></p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">→ <a href="#schwarzbau" style="color: #f97316; text-decoration: underline; font-weight: bold;">Details zu Schwarzbau-Folgen</a></strong></p>

      <h4 style="color: #f3f4f6;">❓ Kann ich einen bestehenden Schwarzbau nachträglich genehmigen lassen?</h4>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Manchmal ja, manchmal nein.</strong></p>
      <p style="color: #e5e7eb;">Nachträgliche Genehmigung möglich, wenn alle Bauvorschriften eingehalten wurden, Abstandsflächen passen, Statik nachweisbar ist und Nachbarn nicht widersprechen.</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Kosten:</strong> Wie reguläre Genehmigung (3.000-5.000€) PLUS Bußgeld (2.000-15.000€) PLUS evtl. Nachrüstungen</p>
      <p style="color: #e5e7eb;"><strong style="color: #ffffff;">Unser Rat:</strong> Lieber von Anfang an richtig machen!</p>

      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; margin: 40px 0; border-radius: 10px;">
        <h3 style="margin-top: 0; color: #ffffff; font-weight: bold;">Du hast jetzt das komplette Wissen. Zeit für die Umsetzung!</h3>
        
        <h4 style="color: #ffffff; font-weight: bold; margin-top: 20px;">1️⃣ Genehmigung prüfen (60 Sekunden)</h4>
        <p style="color: #ffffff;">Nutze unseren <a href="/genehmigung/" style="color: #ffd700; text-decoration: underline; font-weight: bold;">Baugenehmigungscheck</a> und erfahre sofort, ob du eine Genehmigung brauchst und welches Verfahren für dich gilt.</p>
        <p style="color: #ffffff;"><strong>→ <a href="/genehmigung/" style="color: #ffd700; text-decoration: underline; font-weight: bold;">Jetzt kostenlos prüfen</a></strong></p>
        
        <h4 style="color: #ffffff; font-weight: bold; margin-top: 20px;">2️⃣ Kosten kalkulieren (2 Minuten)</h4>
        <p style="color: #ffffff;">Mit dem <a href="/kalkulator/" style="color: #ffd700; text-decoration: underline; font-weight: bold;">BalkonKalkulator</a> erhältst du eine detaillierte Kostenübersicht: Baukosten nach Balkontyp, Genehmigungskosten, alle Nebenkosten, Fördermöglichkeiten.</p>
        <p style="color: #ffffff;"><strong>→ <a href="/kalkulator/" style="color: #ffd700; text-decoration: underline; font-weight: bold;">Jetzt Kosten berechnen</a></strong></p>
        
        <h4 style="color: #ffffff; font-weight: bold; margin-top: 20px;">3️⃣ Projekt professionell planen (15 Minuten)</h4>
        <p style="color: #ffffff;">Der <a href="/planer/" style="color: #ffd700; text-decoration: underline; font-weight: bold;">BalkonPlaner</a> hilft dir, dein Projekt strukturiert anzugehen: Schritt-für-Schritt durch alle Phasen, Checklisten für Unterlagen, Zeitplan erstellen, Handwerker-Auswahl.</p>
        <p style="color: #ffffff;"><strong>→ <a href="/planer/" style="color: #ffd700; text-decoration: underline; font-weight: bold;">Zum BalkonPlaner</a></strong></p>
      </div>

      <h2 style="color: #ffffff; margin-top: 60px;">📚 Weiterführende Informationen</h2>

      <div style="background: #f5f5f5; padding: 30px; margin: 30px 0; border-radius: 8px; color: #111827;">
        <h3 style="margin-top: 0; color: #111827; font-weight: bold;">Vertiefe dein Wissen:</h3>
        
        <h4 style="color: #111827; font-weight: bold; margin-top: 20px;">📖 Ausführliche Ratgeber:</h4>
        <ul style="color: #374151;">
          <li style="color: #374151;"><a href="/baurecht-balkon/" style="color: #2563eb; text-decoration: underline; font-weight: bold;">Kompletter Baurecht-Guide 2025</a> — Alle Bundesländer im Detail</li>
          <li style="color: #374151;"><a href="/foerderung/" style="color: #2563eb; text-decoration: underline; font-weight: bold;">KfW-Förderung für Balkonprojekte</a> — Bis zu 20% sparen</li>
        </ul>
      </div>

      <div style="background: #fff; border: 1px solid #ddd; padding: 30px; margin: 30px 0; border-radius: 8px; color: #111827;">
        <h3 style="margin-top: 0; color: #111827; font-weight: bold;">✍️ Über diesen Artikel</h3>
        
        <h4 style="color: #111827; font-weight: bold; margin-top: 20px;">Autor & Aktualisierung</h4>
        <p style="color: #374151;">Dieser Leitfaden wurde erstmals <strong style="color: #111827;">2018</strong> von <strong style="color: #111827;">Martin Beyer</strong>, Gründer von BALKONFUCHS, verfasst und wird regelmäßig aktualisiert.</p>
        
        <p style="color: #374151;"><strong style="color: #111827;">Martin Beyer</strong> hat:</p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Über <strong style="color: #111827;">850 Balkonprojekte</strong> begleitet</li>
          <li style="color: #374151;">Hunderte Bauanträge erstellt</li>
          <li style="color: #374151;">Mit allen 16 Landesbauordnungen gearbeitet</li>
          <li style="color: #374151;">Engen Kontakt zu Bauämtern und Architekten</li>
        </ul>
        
        <p style="color: #374151;"><strong style="color: #111827;">Dieser Artikel basiert auf:</strong></p>
        <ul style="color: #374151;">
          <li style="color: #374151;">Realen Projekterfahrungen aus ganz Deutschland</li>
          <li style="color: #374151;">Aktueller Rechtsprechung (Stand 2025)</li>
          <li style="color: #374151;">Feedback von Kunden, Architekten und Bauämtern</li>
          <li style="color: #374151;">Kontinuierlicher Recherche zu Gesetzesänderungen</li>
        </ul>
        
        <p style="color: #374151;"><strong style="color: #111827;">Letzte umfassende Aktualisierung:</strong> 1. November 2025</p>
        <p style="color: #374151;"><strong style="color: #111827;">Nächste geplante Aktualisierung:</strong> April 2026</p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <h4 style="color: #991b1b; font-weight: bold;">Rechtlicher Hinweis</h4>
          <p style="color: #374151;">Dieser Artikel dient der allgemeinen Information und ersetzt keine individuelle Rechtsberatung. Baurecht ist Ländersache und kann sich ändern. Für dein konkretes Projekt:</p>
          <ul style="color: #374151;">
            <li style="color: #374151;">Konsultiere einen Architekten oder Bauingenieur</li>
            <li style="color: #374151;">Kontaktiere dein zuständiges Bauamt</li>
            <li style="color: #374151;">Nutze unsere Tools für eine erste Einschätzung</li>
          </ul>
          <p style="color: #374151;"><strong style="color: #111827;">Alle Angaben ohne Gewähr. Stand: November 2025.</strong></p>
        </div>
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
