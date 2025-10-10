import React, { useState } from 'react';
import Head from 'next/head';

const TestIntegration = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testSalesIQ = () => {
    console.log('🔍 Testing SalesIQ Widget...');
    
    // Check if SalesIQ is loaded
    if (typeof window !== 'undefined' && window.$zoho) {
      console.log('✅ SalesIQ Widget loaded:', window.$zoho);
      setTestResults(prev => ({ ...prev, salesiq: '✅ SalesIQ Widget ist geladen' }));
    } else {
      console.log('❌ SalesIQ Widget nicht geladen');
      setTestResults(prev => ({ ...prev, salesiq: '❌ SalesIQ Widget nicht geladen' }));
    }
  };

  const testZohoDesk = async () => {
    setIsLoading(true);
    console.log('🔍 Testing Zoho Desk Integration...');
    
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
      source: 'test-integration'
    };

    try {
      const response = await fetch('/api/export-to-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Zoho Desk Test erfolgreich:', result);
        setTestResults(prev => ({ 
          ...prev, 
          zohoDesk: `✅ Zoho Desk: Ticket #${result.deskTicket?.ticketNumber || 'N/A'} erstellt` 
        }));
      } else {
        console.log('❌ Zoho Desk Test fehlgeschlagen:', result);
        setTestResults(prev => ({ 
          ...prev, 
          zohoDesk: `❌ Zoho Desk: ${result.error || 'Unbekannter Fehler'}` 
        }));
      }
    } catch (error) {
      console.error('❌ Zoho Desk Test Fehler:', error);
      setTestResults(prev => ({ 
        ...prev, 
        zohoDesk: `❌ Zoho Desk: ${error.message}` 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const testZohoCRM = async () => {
    setIsLoading(true);
    console.log('🔍 Testing Zoho CRM Integration...');
    
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
      source: 'test-integration'
    };

    try {
      const response = await fetch('/api/export-to-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Zoho CRM Test erfolgreich:', result);
        setTestResults(prev => ({ 
          ...prev, 
          zohoCRM: `✅ Zoho CRM: Lead #${result.crmLead?.leadId || 'N/A'} erstellt` 
        }));
      } else {
        console.log('❌ Zoho CRM Test fehlgeschlagen:', result);
        setTestResults(prev => ({ 
          ...prev, 
          zohoCRM: `❌ Zoho CRM: ${result.error || 'Unbekannter Fehler'}` 
        }));
      }
    } catch (error) {
      console.error('❌ Zoho CRM Test Fehler:', error);
      setTestResults(prev => ({ 
        ...prev, 
        zohoCRM: `❌ Zoho CRM: ${error.message}` 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailAPI = async () => {
    setIsLoading(true);
    console.log('🔍 Testing Email API...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company GmbH'
    };

    try {
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Email API Test erfolgreich:', result);
        setTestResults(prev => ({ 
          ...prev, 
          emailAPI: `✅ Email API: ${result.message}` 
        }));
      } else {
        console.log('❌ Email API Test fehlgeschlagen:', result);
        setTestResults(prev => ({ 
          ...prev, 
          emailAPI: `❌ Email API: ${result.error || 'Unbekannter Fehler'}` 
        }));
      }
    } catch (error) {
      console.error('❌ Email API Test Fehler:', error);
      setTestResults(prev => ({ 
        ...prev, 
        emailAPI: `❌ Email API: ${error.message}` 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Integration Tests - BALKONFUCHS</title>
        <meta name="description" content="Test-Seite für SalesIQ Widget und Zoho-Integration" />
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
                <a href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  🏠 Zurück zur Startseite
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
                🔧 Integration Tests
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Testen Sie die wichtigsten Funktionalitäten: SalesIQ Widget, Zoho Desk, Zoho CRM und E-Mail-API
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
                    <p className="text-sm text-gray-300">{testResults.salesiq}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">📧 E-Mail API</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie die E-Mail-Bestätigungs-API (Zoho Mail).
                </p>
                <button 
                  onClick={testEmailAPI}
                  disabled={isLoading}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Teste...' : 'E-Mail API testen'}
                </button>
                {testResults.emailAPI && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300">{testResults.emailAPI}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">🎫 Zoho Desk</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie die Zoho Desk Integration (Ticket-Erstellung).
                </p>
                <button 
                  onClick={testZohoDesk}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Teste...' : 'Zoho Desk testen'}
                </button>
                {testResults.zohoDesk && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300">{testResults.zohoDesk}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">👥 Zoho CRM</h3>
                <p className="text-gray-300 mb-4">
                  Testen Sie die Zoho CRM Integration (Lead-Erstellung).
                </p>
                <button 
                  onClick={testZohoCRM}
                  disabled={isLoading}
                  className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Teste...' : 'Zoho CRM testen'}
                </button>
                {testResults.zohoCRM && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300">{testResults.zohoCRM}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Console Logs */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">📋 Console Logs</h3>
              <p className="text-gray-300 mb-4">
                Öffnen Sie die Browser-Entwicklertools (F12) und schauen Sie in die Console für detaillierte Logs.
              </p>
              <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400">
                <p>🔍 Console-Logs werden hier angezeigt...</p>
                <p>💡 Drücken Sie F12 und gehen Sie zum "Console" Tab</p>
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
                  <p><strong>Debug Mode:</strong> {process.env.NODE_ENV === 'development' ? '✅ Aktiv' : '❌ Inaktiv'}</p>
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

export default TestIntegration;
