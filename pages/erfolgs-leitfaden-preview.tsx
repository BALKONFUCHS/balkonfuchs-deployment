import React, { useState } from 'react';
import Head from 'next/head';
import { Download, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';

const ErfolgsLeitfadenPreview = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API Call zu Zoho Mail für Bestätigungs-E-Mail
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - show email confirmation message
        setEmailSent(true);
        setSubmitSuccess(true);
        
        // Log lead data for tracking
        console.log('Lead submitted for double opt-in:', {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          timestamp: new Date().toISOString(),
          status: 'confirmation_sent',
          debugMode: data.debugMode,
          confirmationLink: data.confirmationLink
        });

        // Debug-Modus: Bestätigungslink in Console anzeigen
        if (data.debugMode && data.confirmationLink) {
          console.log('🔗 Debug-Modus: Bestätigungslink:', data.confirmationLink);
          console.log('💡 Klicken Sie auf den Link um die Bestätigung zu testen');
        }
      } else {
        console.error('API Error:', data);
        throw new Error(data.error || 'Fehler beim Senden der E-Mail');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Zeige Fehler-Meldung an
      setSubmitSuccess(false);
      setEmailSent(false);
      
      // TODO: Error handling UI - für jetzt in Console
      console.log('❌ Fehler beim Formular-Versand:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Balkonfuchs Erfolgs-Leitfaden 2026 - Kostenloser Download</title>
        <meta name="description" content="📊 Kostenloser Erfolgs-Leitfaden für Balkon-Partner: ROI-Berechnungen, 6-Städte-Vergleich, Berlin-Startphase. Jetzt kostenlos herunterladen!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img 
                  src="/logos/balkonfuchs-logo.png" 
                  alt="BALKONFUCHS Logo" 
                  className="h-10 w-auto"
                />
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Startseite</a>
                <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
                <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
                <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Express-Angebot</a>
                <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
                <a href="/bauzeit-planung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Bauzeit-Planung</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Preview Section */}
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  📊 <span className="text-orange-400">Erfolgs-Leitfaden</span> Balkon-Partner-Programm 2026
                </h1>
                <p className="text-xl text-gray-200 mb-6">
                  Kostenloser Download mit ROI-Berechnungen, 6-Städte-Vergleich und Berlin-Startphase
                </p>
              </div>

              {/* Preview Content */}
              <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    BALKONFUCHS ERFOLGS-LEITFADEN 2026
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Ihr Weg zum 5-8x ROI als Balkonbau Partner
                  </p>
                  <div className="border-4 border-orange-500 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      Von 2 auf 5 Balkon-Projekte pro Monat in nur 3 Monaten
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Was Sie in diesem Leitfaden erfahren:</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Detaillierte ROI-Berechnungen für alle 3 Pakete</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Regionale Preisübersicht für ganz Deutschland</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Konkrete Erfolgsbeispiele aus Berlin, München, Hamburg</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Schritt-für-Schritt Anleitung zum 5x-8x ROI</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Exakte Break-Even-Berechnungen</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Konkurrenzvergleich & Wettbewerbsvorteile</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 ROI-Übersicht:</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">Starter-Paket</h4>
                        <p className="text-gray-600">8 Leads/Monat • 599€/M</p>
                        <p className="text-green-600 font-bold">ROI: 5,2x</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">Professional-Paket</h4>
                        <p className="text-gray-600">15 Leads/Monat • 1.199€/M</p>
                        <p className="text-green-600 font-bold">ROI: 6,8x</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900">Enterprise-Paket</h4>
                        <p className="text-gray-600">30 Leads/Monat • 2.199€/M</p>
                        <p className="text-green-600 font-bold">ROI: 7,3x</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Access Control */}
                {!showFullContent && (
                  <div className="border-t-4 border-orange-500 bg-orange-50 p-6 rounded-lg">
                    <div className="flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8 text-orange-500 mr-3" />
                      <h3 className="text-2xl font-bold text-orange-600">
                        Vollständiger Zugang erforderlich
                      </h3>
                    </div>
                    <p className="text-center text-gray-700 mb-6">
                      Geben Sie Ihre Daten ein, um den vollständigen 8-seitigen Erfolgs-Leitfaden herunterzuladen
                    </p>
                  </div>
                )}
              </div>

              {/* Access Form */}
              {!showFullContent && (
                <div className="bg-gray-700/50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    📧 Kostenlosen 8-seitigen Erfolgs-Leitfaden herunterladen
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          <User className="inline w-4 h-4 mr-2" />
                          Ihr Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                          placeholder="Max Mustermann"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          <Mail className="inline w-4 h-4 mr-2" />
                          E-Mail-Adresse *
                        </label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                          placeholder="ihre.email@beispiel.de"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-semibold mb-2">
                        Unternehmen *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                        placeholder="Ihr Unternehmen"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          required
                          checked={formData.privacy}
                          onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                          className="mt-1 mr-3"
                        />
                        <span className="text-gray-300 text-sm">
                          Ich stimme der <a href="/datenschutz/" className="text-orange-400 hover:underline">Datenschutzerklärung</a> zu und möchte den Erfolgs-Leitfaden nach E-Mail-Bestätigung erhalten. *
                        </span>
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Wird gesendet...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Mail className="w-5 h-5 mr-2" />
                          📧 Bestätigungs-E-Mail anfordern
                        </span>
                      )}
                    </button>

                    <div className="mt-6 text-center">
                      <p className="text-gray-300 text-sm">
                        ✓ Bestätigungs-E-Mail wird an {formData.email || 'Ihre E-Mail'} gesendet<br />
                        ✓ Keine Kosten, keine Verpflichtung<br />
                        ✓ Datenschutz 100% gewährleistet
                      </p>
                    </div>
                  </form>
                </div>
              )}

              {/* Email Confirmation Message */}
              {submitSuccess && !showFullContent && (
                <div className="bg-blue-900/50 border border-blue-600 rounded-xl p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      E-Mail-Bestätigung erforderlich, {formData.name}!
                    </h3>
                    <p className="text-gray-200 mb-6">
                      Wir haben Ihnen eine Bestätigungs-E-Mail an <strong>{formData.email}</strong> gesendet. 
                      Bitte überprüfen Sie Ihr Postfach und klicken Sie auf den Bestätigungslink, 
                      um den vollständigen Erfolgs-Leitfaden zu erhalten.
                    </p>
                    
                    <div className="bg-blue-800/30 border border-blue-500/50 rounded-lg p-4 mb-6">
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">📧 Was passiert als nächstes?</h4>
                      <ol className="text-left text-gray-200 space-y-2">
                        <li>1. Überprüfen Sie Ihr E-Mail-Postfach (auch Spam-Ordner)</li>
                        <li>2. Klicken Sie auf den Bestätigungslink in der E-Mail</li>
                        <li>3. Sie erhalten sofort Zugang zum vollständigen Leitfaden</li>
                        <li>4. Der Leitfaden wird als PDF per E-Mail zugesendet</li>
                      </ol>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        🔄 Neue Bestätigungs-E-Mail anfordern
                      </button>
                      
                      <a 
                        href="partner-werden"
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-center"
                      >
                        🤝 Jetzt Partner werden
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ErfolgsLeitfadenPreview;
