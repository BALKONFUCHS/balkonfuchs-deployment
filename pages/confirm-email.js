// Bestätigungsseite für E-Mail-Verification
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CheckCircle, Download, Mail, AlertCircle } from 'lucide-react';

export default function ConfirmEmail() {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      confirmEmail(token);
    }
  }, [token]);

  const confirmEmail = async (confirmationToken) => {
    try {
      // API Call zur Bestätigung
      const response = await fetch('/api/confirm-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: confirmationToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.error || 'Fehler bei der E-Mail-Bestätigung');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Fehler bei der Bestätigung. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <>
      <Head>
        <title>E-Mail bestätigen - BALKONFUCHS</title>
        <meta name="description" content="Bestätigen Sie Ihre E-Mail-Adresse für den BALKONFUCHS Erfolgs-Leitfaden" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <img 
                src="/logos/balkonfuchs-logo.png" 
                alt="BALKONFUCHS Logo" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-white mb-2">
                E-Mail-Bestätigung
              </h1>
              <p className="text-gray-300">
                BALKONFUCHS Partner-Programm 2026
              </p>
            </div>

            {/* Status Content */}
            {status === 'loading' && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-300">E-Mail wird bestätigt...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  ✅ E-Mail erfolgreich bestätigt!
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Vielen Dank! Ihre E-Mail-Adresse wurde erfolgreich bestätigt. 
                  Sie erhalten den vollständigen Erfolgs-Leitfaden in Kürze per E-Mail.
                </p>

                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-green-300 mb-3">
                    📧 Was Sie erhalten:
                  </h3>
                  <ul className="text-left text-gray-200 space-y-2">
                    <li>• 8-seitiger Erfolgs-Leitfaden als PDF</li>
                    <li>• Detaillierte ROI-Berechnungen</li>
                    <li>• 6-Städte-Vergleich</li>
                    <li>• Berlin-Startphase Informationen</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => window.open('/erfolgs_leitfaden_pdf.html', '_blank')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <Download className="inline w-5 h-5 mr-2" />
                    📄 Leitfaden jetzt herunterladen
                  </button>
                  
                  <a 
                    href="/partner/"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-center"
                  >
                    🤝 Jetzt Partner werden
                  </a>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  ❌ Bestätigung fehlgeschlagen
                </h2>
                
                <p className="text-gray-300 mb-6">
                  {message}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => window.location.href = '/erfolgs-leitfaden'}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    🔄 Neue Bestätigungs-E-Mail anfordern
                  </button>
                  
                  <a 
                    href="/partner-werden/"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-center"
                  >
                    📞 Kontakt aufnehmen
                  </a>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-600 text-center">
              <p className="text-gray-400 text-sm">
                BALKONFUCHS | www.balkonfuchs.de | partner-werden@balkonfuchs.de
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Deutschlands führende Balkon-Partner-Plattform
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
