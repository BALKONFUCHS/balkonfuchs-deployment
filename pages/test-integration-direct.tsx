import React, { useState } from 'react';
import Head from 'next/head';

const TestIntegrationDirect = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testSalesIQ = () => {
    console.log('🔍 Testing SalesIQ Widget...');
    
    // Check if SalesIQ is loaded
    if (typeof window !== 'undefined' && window.$zoho) {
      console.log('✅ SalesIQ Widget loaded:', window.$zoho);
      setTestResults(prev => ({ ...prev, salesiq: '✅ SalesIQ Widget ist geladen und funktioniert!' }));
    } else {
      console.log('❌ SalesIQ Widget nicht geladen');
      setTestResults(prev => ({ ...prev, salesiq: '❌ SalesIQ Widget nicht geladen' }));
    }
  };

  const testZohoDeskDirect = async () => {
    setIsLoading(true);
    console.log('🔍 Testing Zoho Desk Integration (Direct)...');
    
    const testData = {
      contact: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+49 123 456789',
        zipCode: '80331',
        city: 'München',
        newsletter: true,
        privacy: true
      },
      funnel: {
        type: 'calculator',
        name: 'Balkon-Kalkulator'
      },
      funnelData: {
        balconyType: 'Anlehnbalkon',
        balconySize: { width: 3, depth: 1.2 },
        floors: 2,
        extras: ['Glasgeländer', 'LED-Beleuchtung'],
        basePrice: 4500
      },
      leadScore: {
        totalScore: 85,
        category: 'hot',
        priority: 'P2',
        urgency: 'high',
        complexity: 'medium',
        budget: 'high',
        timeline: 'urgent',
        followUpHours: 2
      },
      estimatedPrice: 4500,
      timestamp: new Date().toISOString(),
      source: 'test-integration-direct'
    };

    try {
      // Direkter Aufruf an Zoho Desk API
      const zohoDeskUrl = 'https://desk.zoho.eu/api/v1/tickets';
      const ticketData = {
        subject: `Balkon-Anfrage: ${testData.contact.firstName} ${testData.contact.lastName} (${testData.funnel.name})`,
        description: `Test-Ticket für Integration:\n\nKontakt: ${testData.contact.firstName} ${testData.contact.lastName}\nE-Mail: ${testData.contact.email}\nTelefon: ${testData.contact.phone}\nStadt: ${testData.contact.city}\n\nBalkon-Details:\n- Typ: ${testData.funnelData.balconyType}\n- Größe: ${testData.funnelData.balconySize.width}m × ${testData.funnelData.balconySize.depth}m\n- Stockwerk: ${testData.funnelData.floors}\n- Extras: ${testData.funnelData.extras.join(', ')}\n\nLead Score: ${testData.leadScore.totalScore} (${testData.leadScore.priority})\nGeschätzter Wert: ${testData.estimatedPrice}€`,
        priority: 'Medium',
        status: 'Open',
        tags: ['balkonfuchs', 'test', 'integration', 'calculator']
      };

      // Für Tests simulieren wir den API-Aufruf
      console.log('📤 Zoho Desk API Call würde gesendet:', {
        url: zohoDeskUrl,
        data: ticketData,
        headers: {
          'Authorization': 'Zoho-oauthtoken [ACCESS_TOKEN]',
          'Content-Type': 'application/json',
          'orgId': '[ORGANIZATION_ID]'
        }
      });

      // Simuliere erfolgreiche Antwort
      setTimeout(() => {
        console.log('✅ Zoho Desk Test erfolgreich (simuliert)');
        setTestResults(prev => ({ 
          ...prev, 
          zohoDesk: `✅ Zoho Desk: Test-Ticket würde erstellt werden (simuliert)\n📋 Subject: ${ticketData.subject}\n📊 Lead Score: ${testData.leadScore.totalScore}` 
        }));
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('❌ Zoho Desk Test Fehler:', error);
      setTestResults(prev => ({ 
        ...prev, 
        zohoDesk: `❌ Zoho Desk: ${error.message}` 
      }));
      setIsLoading(false);
    }
  };

  const testZohoCRMDirect = async () => {
    setIsLoading(true);
    console.log('🔍 Testing Zoho CRM Integration (Direct)...');
    
    const testData = {
      contact: {
        firstName: 'Test',
        lastName: 'Lead',
        email: 'lead@example.com',
        phone: '+49 987 654321',
        zipCode: '10115',
        city: 'Berlin',
        newsletter: true,
        privacy: true
      },
      funnel: {
        type: 'planer',
        name: 'Balkon-Planer'
      },
      funnelData: {
        projectStatus: 'Planung',
        timeframe: '3-6 Monate',
        budget: '5000-10000€',
        ownership: 'Eigentümer'
      },
      leadScore: {
        totalScore: 72,
        category: 'warm',
        priority: 'P3',
        urgency: 'medium',
        complexity: 'medium',
        budget: 'medium',
        timeline: 'flexible',
        followUpHours: 24
      },
      estimatedPrice: 7500,
      timestamp: new Date().toISOString(),
      source: 'test-integration-direct'
    };

    try {
      // Direkter Aufruf an Zoho CRM API
      const zohoCrmUrl = 'https://www.zohoapis.eu/crm/v2/Leads';
      const leadData = {
        First_Name: testData.contact.firstName,
        Last_Name: testData.contact.lastName,
        Email: testData.contact.email,
        Phone: testData.contact.phone,
        Lead_Source: `BALKONFUCHS ${testData.funnel.type}`,
        Lead_Status: 'Not Contacted',
        Company: 'Privatperson',
        Industry: 'Bauwesen',
        Annual_Revenue: testData.estimatedPrice,
        Description: `Lead aus ${testData.funnel.type} Funnel\n\nLead Score: ${testData.leadScore.totalScore}\nPriorität: ${testData.leadScore.priority}\nGeschätzter Wert: ${testData.estimatedPrice}€\n\nPlaner-Details:\n- Projekt-Status: ${testData.funnelData.projectStatus}\n- Zeitrahmen: ${testData.funnelData.timeframe}\n- Budget: ${testData.funnelData.budget}\n- Eigentümer: ${testData.funnelData.ownership}`,
        Street: '',
        Zip_Code: testData.contact.zipCode,
        City: testData.contact.city,
        Country: 'Deutschland'
      };

      // Für Tests simulieren wir den API-Aufruf
      console.log('📤 Zoho CRM API Call würde gesendet:', {
        url: zohoCrmUrl,
        data: { data: [leadData] },
        headers: {
          'Authorization': 'Zoho-oauthtoken [ACCESS_TOKEN]',
          'Content-Type': 'application/json'
        }
      });

      // Simuliere erfolgreiche Antwort
      setTimeout(() => {
        console.log('✅ Zoho CRM Test erfolgreich (simuliert)');
        setTestResults(prev => ({ 
          ...prev, 
          zohoCRM: `✅ Zoho CRM: Test-Lead würde erstellt werden (simuliert)\n👤 Name: ${leadData.First_Name} ${leadData.Last_Name}\n📧 E-Mail: ${leadData.Email}\n📊 Lead Score: ${testData.leadScore.totalScore}` 
        }));
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('❌ Zoho CRM Test Fehler:', error);
      setTestResults(prev => ({ 
        ...prev, 
        zohoCRM: `❌ Zoho CRM: ${error.message}` 
      }));
      setIsLoading(false);
    }
  };

  const testEmailDirect = async () => {
    setIsLoading(true);
    console.log('🔍 Testing Email Integration (Direct)...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company GmbH'
    };

    try {
      // Simuliere E-Mail-Versand
      console.log('📤 E-Mail würde gesendet:', {
        from: 'partner@balkonfuchs.de',
        to: testData.email,
        subject: '📧 Bestätigen Sie Ihre E-Mail-Adresse - BALKONFUCHS Partner-Programm',
        template: 'confirmation-email'
      });

      // Simuliere erfolgreiche Antwort
      setTimeout(() => {
        console.log('✅ E-Mail Test erfolgreich (simuliert)');
        setTestResults(prev => ({ 
          ...prev, 
          emailAPI: `✅ E-Mail API: Bestätigungs-E-Mail würde gesendet werden (simuliert)\n📧 An: ${testData.email}\n🏢 Unternehmen: ${testData.company}` 
        }));
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('❌ E-Mail Test Fehler:', error);
      setTestResults(prev => ({ 
        ...prev, 
        emailAPI: `❌ E-Mail API: ${error.message}` 
      }));
      setIsLoading(false);
    }
  };

  const showIntegrationCode = () => {
    const code = `
// Zoho Desk Integration Beispiel
const zohoDeskUrl = 'https://desk.zoho.eu/api/v1/tickets';
const ticketData = {
  subject: 'Balkon-Anfrage: Max Mustermann (Kalkulator)',
  description: 'Neue Balkon-Anfrage über den Kalkulator Funnel...',
  priority: 'Medium',
  status: 'Open',
  tags: ['balkonfuchs', 'calculator']
};

const response = await fetch(zohoDeskUrl, {
  method: 'POST',
  headers: {
    'Authorization': 'Zoho-oauthtoken YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'orgId': 'YOUR_ORG_ID'
  },
  body: JSON.stringify(ticketData)
});

// Zoho CRM Integration Beispiel
const zohoCrmUrl = 'https://www.zohoapis.eu/crm/v2/Leads';
const leadData = {
  First_Name: 'Max',
  Last_Name: 'Mustermann',
  Email: 'max@example.com',
  Lead_Source: 'BALKONFUCHS calculator',
  Lead_Status: 'Not Contacted'
};

const response = await fetch(zohoCrmUrl, {
  method: 'POST',
  headers: {
    'Authorization': 'Zoho-oauthtoken YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: [leadData] })
});
    `;
    
    setTestResults(prev => ({ 
      ...prev, 
      integrationCode: code 
    }));
  };

  return (
    <>
      <Head>
        <title>Integration Tests (Direct) - BALKONFUCHS</title>
        <meta name="description" content="Direkte Tests für SalesIQ Widget und Zoho-Integration" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <img 
                    src="/logos/balkonfuchs-logo.png" 
                    alt="BALKONFUCHS Logo" 
                    className="h-10 w-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="text-2xl font-bold text-orange-500 ml-2" style={{display: 'none'}}>
                    🦊 BALKONFUCHS
                  </div>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/test-integration" className="text-gray-300 hover:text-orange-400 transition-colors">
                  ← Zurück zu API-Tests
                </a>
                <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  🏠 Startseite
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                🔧 Integration Tests (Direct)
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Direkte Tests ohne API-Routen - zeigt die tatsächlichen API-Aufrufe und Datenstrukturen
              </p>
            </div>

            {/* Test Buttons */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">📞 SalesIQ Widget</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie, ob das SalesIQ Chat-Widget korrekt geladen wird.
                </p>
                <button 
                  onClick={testSalesIQ}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  SalesIQ Widget testen
                </button>
                {testResults.salesiq && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 whitespace-pre-line">{testResults.salesiq}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">📧 E-Mail Integration</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie die E-Mail-Integration (Zoho Mail).
                </p>
                <button 
                  onClick={testEmailDirect}
                  disabled={isLoading}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Teste...' : 'E-Mail Integration testen'}
                </button>
                {testResults.emailAPI && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 whitespace-pre-line">{testResults.emailAPI}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">🎫 Zoho Desk (Direct)</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie die direkte Zoho Desk Integration.
                </p>
                <button 
                  onClick={testZohoDeskDirect}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Teste...' : 'Zoho Desk (Direct) testen'}
                </button>
                {testResults.zohoDesk && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 whitespace-pre-line">{testResults.zohoDesk}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">👥 Zoho CRM (Direct)</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie die direkte Zoho CRM Integration.
                </p>
                <button 
                  onClick={testZohoCRMDirect}
                  disabled={isLoading}
                  className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Teste...' : 'Zoho CRM (Direct) testen'}
                </button>
                {testResults.zohoCRM && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 whitespace-pre-line">{testResults.zohoCRM}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Integration Code */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">💻 Integration Code</h3>
              <p className="text-gray-300 mb-4">
                Zeigen Sie den tatsächlichen Code für die Zoho-Integration an.
              </p>
              <button 
                onClick={showIntegrationCode}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Integration Code anzeigen
              </button>
              {testResults.integrationCode && (
                <div className="mt-4 bg-black rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{testResults.integrationCode}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Console Logs */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">📋 Console Logs</h3>
              <p className="text-gray-300 mb-4">
                Öffnen Sie die Browser-Entwicklertools (F12) und schauen Sie in die Console für detaillierte Logs der API-Aufrufe.
              </p>
              <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400">
                <p>🔍 Console-Logs zeigen die tatsächlichen API-Aufrufe...</p>
                <p>💡 Drücken Sie F12 und gehen Sie zum "Console" Tab</p>
                <p>📤 Alle API-Calls werden mit vollständigen Headers und Daten geloggt</p>
              </div>
            </div>

            {/* Environment Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">🔧 Environment Info</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p><strong>Host:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
                  <p><strong>Protocol:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'N/A'}</p>
                </div>
                <div>
                  <p><strong>SalesIQ Loaded:</strong> {typeof window !== 'undefined' && window.$zoho ? '✅ Ja' : '❌ Nein'}</p>
                  <p><strong>Test Mode:</strong> ✅ Direct API Calls</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">© 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TestIntegrationDirect;
