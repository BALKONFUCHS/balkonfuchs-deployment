import React, { useState } from 'react';
import Head from 'next/head';
import { calculatePartnerScore } from '../utils/partner-scoring';

const PartnerScoringDemo = () => {
  const [testResults, setTestResults] = useState(null);
  const [selectedTest, setSelectedTest] = useState('premium');

  const testCases = {
    premium: {
      name: 'Premium Partner',
      data: {
        firmierung: 'gmbh',
        marktpraesenz: '10plus',
        mitarbeiterzahl: '20plus',
        versicherung: 'vollstaendig',
        meisterbrief: ['meisterbrief'],
        leistungen: ['planung', 'fertigung', 'montage', 'genehmigung'],
        einsatzgebiet: 'regional',
        referenzen: [50000, 50000, 50000]
      }
    },
    versicherung: {
      name: 'Versicherungsproblem',
      data: {
        firmierung: 'gmbh',
        marktpraesenz: '5_10',
        mitarbeiterzahl: '10_20',
        versicherung: 'teilweise',
        meisterbrief: ['meisterbrief'],
        leistungen: ['fertigung', 'montage'],
        einsatzgebiet: 'regional',
        referenzen: [30000, 30000, 30000]
      }
    },
    alleNegativ: {
      name: 'Alle Negativ-Faktoren',
      data: {
        firmierung: 'ug',
        marktpraesenz: 'unter2',
        mitarbeiterzahl: '2',
        versicherung: 'in_vorbereitung',
        meisterbrief: ['andere_quali'],
        leistungen: ['montage'],
        einsatzgebiet: 'deutschlandweit',
        referenzen: [10000, 10000, 10000]
      }
    },
    standard: {
      name: 'Standard Partner',
      data: {
        firmierung: 'gbr',
        marktpraesenz: '5_10',
        mitarbeiterzahl: '10_20',
        versicherung: 'vollstaendig',
        meisterbrief: ['meisterbrief'],
        leistungen: ['planung', 'fertigung'],
        einsatzgebiet: 'regional',
        referenzen: [30000, 30000, 30000]
      }
    },
    bedingt: {
      name: 'Bedingte Zulassung',
      data: {
        firmierung: 'einzelunternehmen',
        marktpraesenz: '2_3',
        mitarbeiterzahl: '3_5',
        versicherung: 'vollstaendig',
        meisterbrief: ['andere_quali'],
        leistungen: ['montage'],
        einsatzgebiet: 'lokal',
        referenzen: [15000, 15000, 15000]
      }
    }
  };

  const runTest = (testKey) => {
    const testCase = testCases[testKey];
    const result = calculatePartnerScore(testCase.data);
    setTestResults({ ...result, testName: testCase.name, testData: testCase.data });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-400';
      case 'review': return 'text-yellow-400';
      case 'conditional': return 'text-orange-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryColor = (category) => {
    if (category.includes('Premium')) return 'bg-green-900/50 border-green-500';
    if (category.includes('Standard')) return 'bg-blue-900/50 border-blue-500';
    if (category.includes('Review')) return 'bg-yellow-900/50 border-yellow-500';
    if (category.includes('Bedingte')) return 'bg-orange-900/50 border-orange-500';
    if (category.includes('Nicht')) return 'bg-red-900/50 border-red-500';
    return 'bg-gray-900/50 border-gray-500';
  };

  return (
    <>
      <Head>
        <title>Partner-Scoring Demo | Balkonfuchs</title>
        <meta name="description" content="Demo der Partner-Scoring-Funktion" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🧪 Partner-Scoring Demo
            </h1>
            <p className="text-lg text-orange-400">
              Teste die neue Hybrid-Scoring-Funktion für Partner-Bewerbungen
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Test-Auswahl */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Testfälle</h2>
              
              <div className="space-y-4">
                {Object.entries(testCases).map(([key, testCase]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTest(key);
                      runTest(key);
                    }}
                    className={`w-full p-4 rounded-lg border transition-all ${
                      selectedTest === key
                        ? 'bg-orange-600/20 border-orange-500 text-orange-400'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{testCase.name}</div>
                      <div className="text-sm opacity-75">
                        {key === 'premium' && 'Perfekter Partner - alle Kriterien erfüllt'}
                        {key === 'versicherung' && 'Gutes Unternehmen, aber Versicherungsproblem'}
                        {key === 'alleNegativ' && 'Alle Negativ-Faktoren aktiv'}
                        {key === 'standard' && 'Solider Partner ohne Probleme'}
                        {key === 'bedingt' && 'Kleines Unternehmen mit Einschränkungen'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ergebnisse */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Ergebnis</h2>
              
              {testResults ? (
                <div className="space-y-6">
                  {/* Kategorie */}
                  <div className={`p-4 rounded-lg border ${getCategoryColor(testResults.category)}`}>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {testResults.category}
                      </div>
                      <div className={`text-lg font-semibold ${getStatusColor(testResults.status)}`}>
                        Status: {testResults.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Basis-Score</div>
                      <div className="text-2xl font-bold text-white">{testResults.baseScore}/100</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Final-Score</div>
                      <div className="text-2xl font-bold text-white">{testResults.finalScore}/100</div>
                    </div>
                  </div>

                  {/* Multiplikator */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Qualitäts-Multiplikator</div>
                    <div className="text-xl font-bold text-white">
                      {testResults.qualityMultiplier} 
                      <span className="text-sm text-gray-400 ml-2">
                        ({Math.round((1 - testResults.qualityMultiplier) * 100)}% Abzug)
                      </span>
                    </div>
                  </div>

                  {/* Aktion */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Empfohlene Aktion</div>
                    <div className="text-white">{testResults.action}</div>
                  </div>

                  {/* Warnings */}
                  {testResults.warnings && testResults.warnings.length > 0 && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                      <div className="text-sm text-red-400 mb-2">⚠️ Negativ-Faktoren</div>
                      <ul className="space-y-1">
                        {testResults.warnings.map((warning, index) => (
                          <li key={index} className="text-red-300 text-sm">• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Test-Daten */}
                  <details className="bg-gray-700/30 rounded-lg p-4">
                    <summary className="text-gray-400 cursor-pointer">Test-Daten anzeigen</summary>
                    <pre className="text-xs text-gray-300 mt-2 overflow-auto">
                      {JSON.stringify(testResults.testData, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Wähle einen Testfall aus, um das Ergebnis zu sehen
                </div>
              )}
            </div>
          </div>

          {/* Info-Box */}
          <div className="mt-8 bg-blue-900/20 border border-blue-500/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">ℹ️ Hybrid-Scoring-System</h3>
            <div className="text-gray-300 space-y-2">
              <p><strong>Prinzip:</strong> Final Score = Basis-Score × Qualitäts-Multiplikator</p>
              <p><strong>Basis-Score:</strong> Positive Bewertung aller Kriterien (0-100 Punkte)</p>
              <p><strong>Qualitäts-Multiplikator:</strong> Negativ-Faktoren reduzieren den Score (0.0 - 1.0)</p>
              <p><strong>Kategorien:</strong> Premium (80+), Standard (60+), Review (40+), Bedingt (25+), Abgelehnt (&lt;25)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerScoringDemo;
