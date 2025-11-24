import Head from 'next/head';
import Link from 'next/link';

export default function BerlinBalkonbauPartnerWerden() {
  return (
    <>
      <Head>
        <title>Balkonbau-Partner Berlin werden | Auktionsmodell ohne Fixkosten | BALKONFUCHS</title>
        <meta name="description" content="Werden Sie Gründungspartner in Berlin. Keine Fixkosten, nur pay-per-win. 94% kaufbereite Leads, 3-5 Partner pro Auktion. Jetzt kostenlos starten." />
        <meta name="keywords" content="balkonbau partner werden, handwerker netzwerk berlin, lead portal alternative, auktionsmodell handwerk" />
      </Head>

      <div className="min-h-screen bg-gray-950">
        {/* Hero Section */}
        <section className="hero py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Überzeile */}
            <div className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-2 mb-8">
              <span className="text-orange-400 font-bold">🎁 GRÜNDUNGSPARTNER BERLIN</span>
              <span className="text-gray-400 mx-3">•</span>
              <span className="text-white">Nur 10 Plätze verfügbar</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Die brutale Wahrheit: <br/>
              <span className="gradient-text">Lead-Portale kosten Sie</span><br/>
              <span className="text-white">bis zu 3.800€ pro Monat für<br/>
              Anfragen, die nie zu Aufträgen werden.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Bei <strong className="text-white">BalkonFuchs</strong> zahlen Sie <strong className="text-orange-400">nur für Leads, die Sie WOLLEN</strong> – 
              und nur dann, wenn Sie die Auktion gewinnen. <br/>
              <span className="text-gray-400">Keine monatlichen Fixkosten. Keine Verpflichtungen. Volle Kontrolle.</span>
            </p>

            {/* Stats-Zeile */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
              <div>
                <div className="text-4xl font-bold text-orange-400">94%</div>
                <div className="text-sm text-gray-400">Kaufbereite Leads</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400">3-5</div>
                <div className="text-sm text-gray-400">Partner pro Lead</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400">10</div>
                <div className="text-sm text-gray-400">Gründungspartner</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400">0€</div>
                <div className="text-sm text-gray-400">Fixkosten</div>
              </div>
            </div>

            {/* Gründungspartner-Vorteil Box */}
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-2 border-orange-500/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto pulse-glow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-white">GRÜNDUNGSPARTNER-VORTEILE</h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Jetzt kostenlos starten</strong><br/>
                    <span className="text-gray-300">Keine Gebühren bis Ende 2025</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Nur 10 Partner = Minimale Konkurrenz</strong><br/>
                    <span className="text-gray-300">Höhere Gewinnchancen bei Auktionen</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Lifetime: 30% Rabatt</strong><br/>
                    <span className="text-white">Auf alle zukünftigen Subscription-Modelle (voraussichtlich Q2 2026)</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Gründungspartner-Badge</strong><br/>
                    <span className="text-gray-300">Prestige & Vertrauen bei Kunden</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-orange-500/20">
                <p className="text-sm text-gray-400">
                  💡 <strong className="text-white">Beispiel:</strong> Statt 649€/Monat zahlen Sie als Gründungspartner nur <strong className="text-orange-400">454€/Monat</strong> (voraussichtlich ab Q2 2026) – ein Leben lang!
                </p>
              </div>
            </div>

            {/* Main CTA */}
            <a href="#bewerbung" className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 pulse-glow">
              <span>🚀 Jetzt kostenlos als Gründungspartner bewerben</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>

            <p className="text-sm text-gray-500 mt-6">
              ⏰ 5 Min Bewerbung • 🔒 Kostenlos bis Ende 2025 • 📊 Nur 10 Plätze • ⭐ Lifetime-Vorteile
            </p>
          </div>
        </section>

        {/* Problem Section - Lead-Portale-Kritik */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Warum <span className="gradient-text">Lead-Portale</span> Ihr Geld verschwenden
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Die Realität: Sie zahlen 80-150€ pro Lead, aber nur 12% werden zu Aufträgen. 
                Das bedeutet: 88% Ihrer Ausgaben sind verschwendet.
              </p>
            </div>

            {/* Vergleichstabelle */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-4 pr-8 text-gray-300 font-bold"></th>
                    <th className="pb-4 pr-8 text-gray-300 font-bold">Lead-Portal-Modell</th>
                    <th className="pb-4 text-orange-400 font-bold">BalkonFuchs-Auktion</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-gray-700/50">
                    <td className="py-4 pr-8 text-white font-semibold">Kostenmodell</td>
                    <td className="py-4 pr-8 text-gray-400">Pay-per-Lead: 80-150€</td>
                    <td className="py-4 text-orange-400 font-bold">Pay-per-Win: ab 40€</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-4 pr-8 text-white font-semibold">Win-Rate</td>
                    <td className="py-4 pr-8 text-gray-400">12%</td>
                    <td className="py-4 text-orange-400 font-bold">25-33% (doppelt so hoch!)</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-4 pr-8 text-white font-semibold">Lead-Qualität</td>
                    <td className="py-4 pr-8 text-gray-400">Ungeprüft</td>
                    <td className="py-4 text-orange-400 font-bold">94% kaufbereit</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-4 pr-8 text-white font-semibold">Konkurrenten</td>
                    <td className="py-4 pr-8 text-gray-400">8-12</td>
                    <td className="py-4 text-orange-400 font-bold">3-5</td>
                  </tr>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-4 pr-8 text-white font-semibold">Kontrolle</td>
                    <td className="py-4 pr-8 text-gray-400">Keine</td>
                    <td className="py-4 text-orange-400 font-bold">Volle Kontrolle: Sie wählen</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-8 text-white font-semibold">Fixkosten</td>
                    <td className="py-4 pr-8 text-gray-400">Keine (aber hohe Lead-Kosten)</td>
                    <td className="py-4 text-orange-400 font-bold">0€ (nur bei Gewinn)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Beispiel-Rechnung */}
            <div className="mt-12 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-center text-white">💸 Beispiel-Rechnung: MyHammer</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">147€ pro Lead</strong> bei MyHammer.<br/>
                    Conversion-Rate: <strong className="text-red-400">12%</strong>.
                  </p>
                  <p className="text-gray-300">
                    Sie zahlen für <strong className="text-red-400">88% Müll</strong> – 
                    Leads, die nie zu Aufträgen werden.
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Ihre Kosten bei 10 Leads/Monat:</p>
                  <p className="text-3xl font-black text-red-400 mb-2">1.470€</p>
                  <p className="text-sm text-gray-400">Davon verschwendet: <strong className="text-red-400">1.293€</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wie funktioniert das Auktionsmodell */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                So funktioniert das <span className="gradient-text">Auktionsmodell</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transparenz. Kontrolle. Fairness. Sie entscheiden bei jedem Lead, ob Sie teilnehmen – und wie viel er Ihnen wert ist.
              </p>
            </div>

            {/* 5-Schritt-Prozess */}
            <div className="space-y-8">
              
              {/* Schritt 1 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-orange-400">1</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">📋 Lead kommt rein & wird vorqualifiziert</h3>
                    <p className="text-white mb-4">
                      Kunde durchläuft unseren 5-Schritte-Prozess: Budget-Check, Timeline, Baugenehmigung, Standort, konkrete Anforderungen.
                    </p>
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <strong className="text-orange-400">✓ Ergebnis:</strong> <span className="text-white">94% der Leads sind kaufbereit – keine Zeitverschwender.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schritt 2 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-orange-400">2</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">👀 Sie sehen alle Details VOR Ihrer Entscheidung</h3>
                    <p className="text-gray-300 mb-4">
                      Sie erhalten vollständige Projekt-Informationen:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">Projektgröße & Budget-Range</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">Exakter Standort (PLZ)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">Gewünschte Timeline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">Baugenehmigung: geklärt/offen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">Balkontyp & Material-Wunsch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-gray-300">Besonderheiten (Altbau, Denkmalschutz)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schritt 3 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-orange-400">3</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">⏰ Sie haben 24 Stunden Zeit zu entscheiden</h3>
                    <p className="text-white mb-4">
                      Keine Hektik. Sie entscheiden in Ruhe:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                        <strong className="text-white">Option 1:</strong> <span className="text-green-400">Sie bieten mit</span> <span className="text-white">– Geben Sie Ihr Gebot ab (Mindestgebot oder höher)</span>
                      </div>
                      <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                        <strong className="text-white">Option 2:</strong> <span className="text-green-400">Sie passen</span> <span className="text-white">– Kein Interesse? Kein Problem. Keine Strafe. Keine Nachteile.</span>
                      </div>
                    </div>
                    <p className="text-sm text-orange-400 mt-4">
                      💡 Als Gründungspartner haben Sie oft weniger Konkurrenz → höhere Gewinnchancen!
                    </p>
                  </div>
                </div>
              </div>

              {/* Schritt 4 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-orange-400">4</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">🏆 3-5 Partner bieten – Höchstbietende gewinnen</h3>
                    <p className="text-white mb-4">
                      Nach 24 Stunden endet die Auktion. Die 3-5 höchsten Gebote erhalten den Kunden-Kontakt.
                    </p>
                    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                      <strong className="text-orange-400">Warum 3-5 Partner?</strong><br/>
                      <span className="text-white">
                        Kunden wollen Vergleichsangebote – aber nicht 12 Anrufe. 3-5 ist die perfekte Balance: 
                        Genug Auswahl für den Kunden, faire Chancen für Sie.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schritt 5 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl font-bold text-orange-400">5</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">📞 Sie kontaktieren den Kunden direkt</h3>
                    <p className="text-gray-300 mb-4">
                      Sie erhalten Kunden-Kontaktdaten (Name, Tel, E-Mail, Adresse). Ab jetzt sind Sie im Lead – ohne weitere Konkurrenz.
                    </p>
                    <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <span className="text-green-400 text-2xl flex-shrink-0">✓</span>
                      <div>
                        <strong className="text-white">Sie zahlen nur bei Gewinn:</strong><br/>
                        <span className="text-gray-300">Gebot verloren? 0€. Lead abgelehnt? 0€. Nur wer gewinnt, zahlt.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-gray-950">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                <span className="gradient-text">Transparente Preise</span> nach Projektgröße
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Keine versteckten Gebühren. Keine monatlichen Fixkosten. Sie zahlen nur, wenn Sie einen Lead gewinnen – und das Gebot bestimmen Sie selbst.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              
              {/* Kategorie 1 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="text-xl font-bold mb-2 text-white">Bis 15.000€</h3>
                <div className="text-gray-400 text-sm mb-4">Kleine Balkone, Renovierungen</div>
                <div className="text-4xl font-black text-orange-400 mb-2">ab 40€</div>
                <div className="text-sm text-gray-400">Mindestgebot pro Lead</div>
              </div>

              {/* Kategorie 2 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
                <div className="text-3xl mb-3">🏡</div>
                <h3 className="text-xl font-bold mb-2 text-white">15.000 - 25.000€</h3>
                <div className="text-gray-400 text-sm mb-4">Standard-Balkone</div>
                <div className="text-4xl font-black text-orange-400 mb-2">ab 80€</div>
                <div className="text-sm text-gray-400">Mindestgebot pro Lead</div>
              </div>

              {/* Kategorie 3 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
                <div className="text-3xl mb-3">🏘️</div>
                <h3 className="text-xl font-bold mb-2 text-white">25.000 - 35.000€</h3>
                <div className="text-gray-400 text-sm mb-4">Premium-Balkone</div>
                <div className="text-4xl font-black text-orange-400 mb-2">ab 150€</div>
                <div className="text-sm text-gray-400">Mindestgebot pro Lead</div>
              </div>

              {/* Kategorie 4 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all">
                <div className="text-3xl mb-3">🏢</div>
                <h3 className="text-xl font-bold mb-2 text-white">Über 35.000€</h3>
                <div className="text-gray-400 text-sm mb-4">Großprojekte, Mehrfamilienhäuser</div>
                <div className="text-4xl font-black text-orange-400 mb-2">ab 250€</div>
                <div className="text-sm text-gray-400">Mindestgebot pro Lead</div>
              </div>

            </div>

            {/* Erklärung */}
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center text-white">💡 Wie Sie Ihre Gebote festlegen</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl flex-shrink-0">1.</span>
                  <div>
                    <strong className="text-white">Mindestgebot = Eintrittskarte</strong><br/>
                    <span className="text-gray-300">Das Mindestgebot ist der Einstiegspreis. Sie können (und sollten oft) höher bieten.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl flex-shrink-0">2.</span>
                  <div>
                    <strong className="text-white">Höheres Gebot = Höhere Gewinnchance</strong><br/>
                    <span className="text-gray-300">Die 3-5 höchsten Gebote gewinnen. Bei starker Nachfrage lohnt es sich, über Mindestgebot zu gehen.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl flex-shrink-0">3.</span>
                  <div>
                    <strong className="text-white">Kalkulieren Sie Ihren ROI</strong><br/>
                    <span className="text-gray-300">
                      Beispiel: Projekt 30.000€, Ihre Marge 6.000€, Win-Rate 25% → Sie können bis zu 1.500€ bieten und profitieren noch.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl flex-shrink-0">4.</span>
                  <div>
                    <strong className="text-white">Keine Verpflichtung</strong><br/>
                    <span className="text-gray-300">Lead passt nicht? Lassen Sie ihn aus. Keine Strafe. Keine Nachteile.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-orange-500/20 text-center">
                <p className="text-sm text-gray-400">
                  🧮 <strong className="text-white">Durchschnittliche Win-Rate:</strong> 25-33% (abhängig von Gebot & Reaktionsgeschwindigkeit)<br/>
                  Das ist <strong className="text-orange-400">DOPPELT so hoch</strong> wie bei Lead-Portalen (12%), weil unsere Leads vorqualifiziert sind.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Gründungspartner-Vorteile (Detailliert) */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <div className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-2 mb-6">
                <span className="text-orange-400 font-bold">🎁 NUR FÜR DIE ERSTEN 10 PARTNER</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Warum <span className="gradient-text">JETZT</span> einsteigen?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Als einer von nur 10 Gründungspartnern in Berlin sichern Sie sich Vorteile, 
                die späteren Partnern nie mehr zur Verfügung stehen werden.
              </p>
            </div>

            {/* Vorteile Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              
              {/* Vorteil 1 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="text-5xl mb-4">🆓</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Kostenlos bis Ende 2025</h3>
                <p className="text-white">
                  Nutzen Sie die gesamte Plattform ohne Kosten während der Launch-Phase. 
                  Testen Sie das System. Gewinnen Sie erste Aufträge. Risikofrei.
                </p>
              </div>

              {/* Vorteil 2 */}
              <div className="bg-gray-800/50 border-2 border-orange-500 rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  GRÖßTER VORTEIL
                </div>
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Minimale Konkurrenz</h3>
                <p className="text-white mb-4">
                  Nur 10 Partner = deutlich höhere Gewinnchancen bei Auktionen. 
                  Wenn später 50+ Partner aktiv sind, haben Sie bereits einen Vorsprung.
                </p>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-sm">
                  <strong className="text-orange-400">Beispiel:</strong> <span className="text-white">10 Leads/Monat ÷ 10 Partner = Ø 3-5 Gewinn-Chancen pro Partner</span>
                </div>
              </div>

              {/* Vorteil 3 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Lifetime 30% Rabatt</h3>
                <p className="text-white mb-4">
                  Voraussichtlich ab Q2 2026 führen wir optionale Subscription-Modelle ein (für garantierte Lead-Volumina). 
                  Als Gründungspartner zahlen Sie <strong className="text-orange-400">für immer 30% weniger</strong>.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Starter-Abo:</span>
                    <span><s className="text-gray-500">649€</s> <strong className="text-orange-400">454€/Monat</strong></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Professional-Abo:</span>
                    <span><s className="text-gray-500">1.199€</s> <strong className="text-orange-400">839€/Monat</strong></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Enterprise-Abo:</span>
                    <span><s className="text-gray-500">2.199€</s> <strong className="text-orange-400">1.539€/Monat</strong></span>
                  </div>
                </div>
              </div>

              {/* Vorteil 4 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Mitgestaltung</h3>
                <p className="text-white">
                  Entwickeln Sie die Plattform aktiv mit. Ihr Feedback prägt das finale Produkt. 
                  Sie bestimmen mit, welche Features wir priorisieren.
                </p>
              </div>

              {/* Vorteil 5 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Gründungspartner-Badge</h3>
                <p className="text-white">
                  Ihr Profil erhält dauerhaft den "Gründungspartner seit 2025"-Badge. 
                  Das schafft Vertrauen bei Kunden und hebt Sie von späteren Partnern ab.
                </p>
              </div>

              {/* Vorteil 6 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Erprobtes System</h3>
                <p className="text-white">
                  Sie profitieren von unserer Erfahrung aus 850+ erfolgreich abgeschlossenen Projekten. 
                  Bewährte Prozesse, keine Experimente.
                </p>
              </div>

            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-center text-white">📅 Ihre Gründungspartner-Journey</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-orange-400 mx-auto mb-4">1</div>
                  <h4 className="text-lg font-bold mb-2 text-white">Jetzt - Ende 2025</h4>
                  <div className="text-sm text-gray-400 mb-3">Launch-Phase</div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-left">
                    <p className="text-white text-sm">
                      ✓ 100% kostenlos<br/>
                      ✓ Minimale Konkurrenz<br/>
                      ✓ Erste Aufträge sichern<br/>
                      ✓ Plattform mitgestalten
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-orange-400 mx-auto mb-4">2</div>
                  <h4 className="text-lg font-bold mb-2 text-white">Voraussichtlich ab Q2 2026</h4>
                  <div className="text-sm text-gray-400 mb-3">Offizieller Start</div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-left">
                    <p className="text-white text-sm">
                      ✓ Auktionssystem läuft weiter<br/>
                      ✓ Optional: Subscription-Modelle<br/>
                      ✓ Sie: 30% Lifetime-Rabatt<br/>
                      ✓ Mehr Partner = mehr Leads
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-orange-400 mx-auto mb-4">∞</div>
                  <h4 className="text-lg font-bold mb-2 text-white">Für immer</h4>
                  <div className="text-sm text-gray-400 mb-3">Lifetime-Vorteile</div>
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-left">
                    <p className="text-white text-sm">
                      ✓ Gründungspartner-Badge<br/>
                      ✓ 30% Rabatt (lebenslang)<br/>
                      ✓ Prioritäts-Support<br/>
                      ✓ Early Access zu neuen Features
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-950">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Häufige <span className="gradient-text">Fragen</span>
              </h2>
            </div>

            <div className="space-y-4">
              
              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer group">
                <summary className="font-bold text-lg text-white list-none flex items-center justify-between">
                  <span>Was passiert, wenn ich eine Auktion gewinne, aber der Kunde dann doch nicht will?</span>
                  <span className="text-orange-400 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-gray-300">
                  <p className="mb-3">
                    <strong>Sehr selten,</strong> da wir nur hochqualifizierte Leads durchlassen (94% kaufbereit).
                  </p>
                  <p className="mb-3">
                    <strong>Wenn doch:</strong> Sie können den Lead als "nicht zustande gekommen" melden. 
                    Nach Prüfung erstatten wir Ihr Gebot zu 100%.
                  </p>
                  <p className="text-orange-400">
                    <strong>Unsere Garantie:</strong> Sie zahlen nur für echte, kaufbereite Kunden.
                  </p>
                </div>
              </details>

              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer group">
                <summary className="font-bold text-lg text-white list-none flex items-center justify-between">
                  <span>Kann ich Auktionen auch automatisch überspringen, wenn ich ausgelastet bin?</span>
                  <span className="text-orange-400 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-gray-300">
                  <p className="mb-3">
                    <strong>Ja!</strong> In Ihrem Partner-Dashboard können Sie:
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li>✓ "Pause-Modus" aktivieren → Keine Benachrichtigungen</li>
                    <li>✓ Kapazitätslimit setzen → Max. X Projekte parallel</li>
                    <li>✓ Präferenzen hinterlegen → Nur bestimmte Projektgrößen</li>
                  </ul>
                  <p>
                    Kein Stress. Sie haben volle Kontrolle über Ihre Teilnahme.
                  </p>
                </div>
              </details>

              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer group">
                <summary className="font-bold text-lg text-white list-none flex items-center justify-between">
                  <span>Was ist mit dem 30% Lifetime-Rabatt gemeint?</span>
                  <span className="text-orange-400 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-gray-300">
                  <p className="mb-3">
                    <strong>Das Auktionssystem bleibt für alle.</strong> Der Rabatt gilt für optionale Subscription-Modelle, 
                    die wir voraussichtlich ab Q2 2026 zusätzlich anbieten.
                  </p>
                  <p className="mb-3">
                    <strong>Beispiel:</strong> Sie wollen garantiert 10 Leads/Monat? Dafür gibt es voraussichtlich ab Q2 2026 ein Abo (z.B. 649€/Monat). 
                    Als Gründungspartner zahlen Sie nur 454€/Monat – für immer.
                  </p>
                  <p className="text-orange-400">
                    <strong>Wichtig:</strong> Das Auktionssystem kostet weiterhin 0€ Fixkosten. 
                    Subscriptions sind optional für Partner, die planbare Volumina wollen.
                  </p>
                </div>
              </details>

              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer group">
                <summary className="font-bold text-lg text-white list-none flex items-center justify-between">
                  <span>Wie schnell kann ich nach der Bewerbung starten?</span>
                  <span className="text-orange-400 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-gray-300">
                  <p className="mb-3">
                    <strong>Ablauf:</strong>
                  </p>
                  <ol className="space-y-2 mb-3 list-decimal list-inside">
                    <li><strong>Bewerbung (5 Min):</strong> Online-Formular ausfüllen</li>
                    <li><strong>Kennenlernen (1h):</strong> Video-Call oder Treffen in Berlin</li>
                    <li><strong>Onboarding (1-2 Tage):</strong> Profil erstellen, Einweisung</li>
                    <li><strong>Go-Live:</strong> Erste Leads innerhalb 1-2 Wochen</li>
                  </ol>
                  <p className="text-green-400">
                    <strong>Durchschnitt:</strong> Von Bewerbung bis zum ersten Lead dauert es 7-14 Tage.
                  </p>
                </div>
              </details>

              <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer group">
                <summary className="font-bold text-lg text-white list-none flex items-center justify-between">
                  <span>Wie unterscheidet sich das Auktionsmodell von Lead-Portalen?</span>
                  <span className="text-orange-400 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-gray-300">
                  <p className="mb-3">
                    <strong>Hauptunterschiede:</strong>
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li>✓ <strong>Pay-per-Win statt Pay-per-Lead:</strong> Sie zahlen nur bei Gewinn</li>
                    <li>✓ <strong>Vorqualifizierung:</strong> 94% kaufbereite Leads vs. ungeprüfte Anfragen</li>
                    <li>✓ <strong>Weniger Konkurrenz:</strong> 3-5 Partner statt 8-12</li>
                    <li>✓ <strong>Volle Transparenz:</strong> Alle Projekt-Details vor Ihrer Entscheidung</li>
                    <li>✓ <strong>Keine Fixkosten:</strong> 0€ monatlich, nur bei Gewinn</li>
                  </ul>
                  <p className="text-orange-400">
                    <strong>Ergebnis:</strong> Doppelt so hohe Win-Rate (25-33% vs. 12%) bei deutlich niedrigeren Kosten.
                  </p>
                </div>
              </details>

            </div>

          </div>
        </section>

        {/* Final CTA Section */}
        <section id="bewerbung" className="py-20 px-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-y border-orange-500/20">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="text-6xl mb-6">🚀</div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
              Werden Sie einer der <span className="gradient-text">10 Gründungspartner</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Sichern Sie sich jetzt Ihren Platz und profitieren Sie von minimaler Konkurrenz, 
              kostenlosen Start und lebenslangen Vorteilen.
            </p>

            {/* Countdown */}
            <div className="bg-gray-900/50 border border-orange-500/30 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <div className="text-sm text-gray-400 mb-2">Noch verfügbar:</div>
              <div className="text-5xl font-black text-orange-400 mb-2">4 / 10</div>
              <div className="text-sm text-gray-400">Plätzen in Berlin</div>
            </div>

            {/* Main CTA Button */}
            <a href="/partner-werden" className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-xl font-bold text-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 pulse-glow">
              <span>Jetzt kostenlos bewerben</span>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>

            <p className="text-sm text-gray-500 mt-6">
              ⏰ 5 Minuten • 🔒 Unverbindlich • 💰 Kostenlos bis Ende 2025 • 🏆 Lifetime-Vorteile
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <span>Keine Kreditkarte nötig</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <span>Jederzeit kündbar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <span>Keine Verpflichtungen</span>
              </div>
            </div>

          </div>
        </section>

      </div>

      <style jsx>{`
        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Pulse Glow Animation für CTAs */
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 115, 22, 0.6);
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}

