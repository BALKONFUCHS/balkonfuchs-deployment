import React, { useState } from 'react';
import Head from 'next/head';
import { CheckCircle, AlertCircle, Loader, Building2, Users, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TestZohoIntegration() {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testZohoConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/test-zoho-connection');
      const result = await response.json();
      
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Verbindungsfehler',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testGewerbeSubmission = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const testData = {
        projekttyp: 'mehrfamilienhaus',
        projektname: 'Test-Projekt Berlin',
        projektort: 'Berlin',
        anzahlEinheiten: '50',
        balkontyp: ['Standbalkon', 'Hängebalkon'],
        zeitrahmen: '2024-2025',
        budgetrahmen: '500.000 - 1 Mio. €',
        firmenname: 'Test GmbH',
        ansprechpartner: 'Max Mustermann',
        email: 'test@example.com',
        telefon: '+49123456789',
        plz: '10115',
        ort: 'Berlin',
        datenschutz: true,
        balkonbrief: true,
        haftungsausschluss: true
      };

      const response = await fetch('/api/send-to-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          funnelData: {
            funnel: {
              type: 'gewerbe',
              name: 'Gewerbeprojekte Test'
            },
            contact: {
              salutation: 'herr',
              firstName: 'Max',
              lastName: 'Mustermann',
              email: 'test@example.com',
              phone: '+49123456789',
              zipCode: '10115',
              city: 'Berlin',
              newsletter: false,
              privacy: true,
              agb: true,
              disclaimer: true
            },
            funnelData: testData,
            company: {
              name: 'Test GmbH',
              legalForm: 'GmbH',
              employeeCount: '1-10',
              website: '',
              address: 'Teststraße 1',
              zipCode: '10115',
              city: 'Berlin'
            },
            leadScore: {
              totalScore: 85,
              category: 'warm',
              priority: 'P2',
              urgency: 'medium',
              complexity: 'high',
              budget: 'high',
              timeline: 'urgent',
              followUpHours: 12
            },
            estimatedPrice: 750000,
            timestamp: new Date().toISOString(),
            source: 'test'
          }
        }),
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Übertragungsfehler',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Zoho Integration Test | BALKONFUCHS</title>
        <meta name="description" content="Test der Zoho Desk und CRM Integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <Header />

        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Zoho Integration Test
              </h1>
              <p className="text-xl text-gray-300">
                Testen Sie die Verbindung zu Zoho Desk und CRM
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Test Buttons */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Verbindungstests</h2>
                
                <div className="space-y-4">
                  <button
                    onClick={testZohoConnection}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    Zoho Verbindung testen
                  </button>

                  <button
                    onClick={testGewerbeSubmission}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Building2 className="w-5 h-5" />
                    )}
                    Gewerbe-Daten senden
                  </button>
                </div>
              </div>

              {/* Test Results */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Test-Ergebnisse</h2>
                
                {!testResult && !isLoading && (
                  <div className="text-center text-gray-400 py-8">
                    Klicken Sie auf einen Test-Button, um die Ergebnisse zu sehen
                  </div>
                )}

                {isLoading && (
                  <div className="text-center text-blue-400 py-8">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p>Test wird durchgeführt...</p>
                  </div>
                )}

                {testResult && (
                  <div className={`p-6 rounded-lg border-2 ${
                    testResult.success 
                      ? 'bg-green-500/10 border-green-500/50' 
                      : 'bg-red-500/10 border-red-500/50'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      {testResult.success ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      )}
                      <h3 className={`text-lg font-semibold ${
                        testResult.success ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {testResult.success ? 'Test erfolgreich' : 'Test fehlgeschlagen'}
                      </h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span className={`ml-2 font-medium ${
                          testResult.success ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {testResult.success ? 'Erfolgreich' : 'Fehler'}
                        </span>
                      </div>

                      {testResult.message && (
                        <div>
                          <span className="text-gray-400">Nachricht:</span>
                          <span className="ml-2 text-white">{testResult.message}</span>
                        </div>
                      )}

                      {testResult.error && (
                        <div>
                          <span className="text-gray-400">Fehler:</span>
                          <span className="ml-2 text-red-400">{testResult.error}</span>
                        </div>
                      )}

                      {testResult.timestamp && (
                        <div>
                          <span className="text-gray-400">Zeitstempel:</span>
                          <span className="ml-2 text-gray-300">
                            {new Date(testResult.timestamp).toLocaleString('de-DE')}
                          </span>
                        </div>
                      )}

                      {testResult.results && (
                        <div className="mt-4">
                          <h4 className="text-gray-300 font-medium mb-2">Ergebnisse:</h4>
                          <div className="bg-gray-700/50 rounded p-3 text-xs">
                            <pre className="text-gray-300 overflow-auto">
                              {JSON.stringify(testResult.results, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Integration Info */}
            <div className="mt-12 bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Integration Details</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Zoho Desk</h3>
                  <p className="text-gray-400 text-sm">
                    Automatische Ticket-Erstellung mit Lead-Scoring und Custom Fields
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Zoho CRM</h3>
                  <p className="text-gray-400 text-sm">
                    Lead- und Kontakt-Erstellung für Follow-up und Nurturing
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Lead Scoring</h3>
                  <p className="text-gray-400 text-sm">
                    Automatische Bewertung und Priorisierung der Anfragen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
