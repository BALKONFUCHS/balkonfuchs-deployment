import React, { useState } from 'react';
import Head from 'next/head';
import { ArrowRight, Phone, Mail, Shield, CheckCircle, Star, Rocket, MapPin, Target, CheckSquare, Menu, Building, Users, Award, TrendingUp, Clock, FileText, Handshake, Download, Calculator, Users2, Euro, Calendar, CheckCircle2 } from 'lucide-react';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

const PartnerWerdenTest = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    phone: '',
    city: '',
    experience: '',
    privacy: false,
    newsletter: false
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Prepare data for export
      const exportData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'BALKONFUCHS Partner Vorabinfos Test',
        funnelType: 'Partner Vorabinfos Test'
      };

      // Simulate API call (replace with actual Zoho export)
      console.log('Submitting Partner Vorabinfos Test:', exportData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to partner application
      window.location.href = '/partner/';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>TEST: Balkonbau Partner Vorabinfos 2025 | ROI-Berechnungen | Kostenlose Beratung | BALKONFUCHS</title>
        <meta name="description" content="TEST SEITE: ✅ Balkonbau Partner Vorabinfos ✅ ROI-Berechnungen ✅ Kostenlose Beratung ✅ Erfolgsbeispiele ✅ Jetzt kostenlos informieren!" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 funnel-partner">
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
            
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/balkon-kosten-rechner" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Balkon-Kosten-Rechner</a>
                <a href="/balkon-planer-online" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Balkon-Planer Online</a>
                <a href="/balkon-angebot-express" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Express-Angebot</a>
                <a href="/balkon-genehmigung-check" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
                <a href="/bauzeit-planung" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Bauzeit-Planung</a>
              </nav>
            
            <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={() => document.getElementById('info-start')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
                >
                  📋 Kostenlose Infos
                </button>
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-300"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-800">
                <nav className="flex flex-col space-y-4">
                  <a href="/balkon-kosten-rechner" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Balkon-Kosten-Rechner</a>
                  <a href="/balkon-planer-online" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Balkon-Planer Online</a>
                  <a href="/balkon-angebot-express" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Express-Angebot</a>
                  <a href="/balkon-genehmigung-check" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
                  <a href="/bauzeit-planung" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Bauzeit-Planung</a>
                  <button 
                    onClick={() => {
                      document.getElementById('info-start')?.scrollIntoView({ behavior: 'smooth' });
                      setMobileMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm w-full text-left"
                  >
                    📋 Kostenlose Infos
                  </button>
          </nav>
        </div>
            )}
          </div>
        </header>

          {/* Hero Section */}
        <section id="info-start" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8">
              <h1 className="text-2xl font-bold text-red-400 mb-2">🧪 TEST-SEITE</h1>
              <p className="text-red-300">Dies ist eine Testseite für den Inhalt vom 29.09.2025</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Balkonbau Partner Vorabinfos
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
              Kostenlose Beratung • Realistische ROI-Berechnungen • Erfolgsbeispiele
            </h2>
            <h3 className="text-lg text-orange-400 mb-8 font-semibold">
              Informieren Sie sich unverbindlich über die Vorteile einer BALKONFUCHS Partnerschaft
            </h3>
            
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-8">
              <p className="text-gray-200 text-lg mb-6">
                <span className="text-orange-400 font-semibold">Sie überlegen eine Partnerschaft?</span> 
                Hier erhalten Sie alle wichtigen Informationen, um eine fundierte Entscheidung zu treffen.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Realistische ROI-Berechnungen</h3>
                  <p className="text-gray-300 text-sm">Konkrete Zahlen für alle Pakete</p>
            </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Erfolgsbeispiele</h3>
                  <p className="text-gray-300 text-sm">Echte Partner aus ganz Deutschland</p>
              </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Kostenlose Beratung</h3>
                  <p className="text-gray-300 text-sm">Persönliches Gespräch ohne Verpflichtung</p>
              </div>
              </div>
            </div>
          </div>
          </section>

        {/* ROI-Berechnungen */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                📊 ROI-Potenzial: Was ist möglich?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🚀</div>
                    <h3 className="text-xl font-bold text-white mb-2">Starter-Paket</h3>
                    <p className="text-gray-300 text-sm mb-4">8 qualifizierte Leads/Monat</p>
                    <div className="text-2xl font-bold text-orange-400">199€/Monat</div>
                  </div>
                  
                  
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-green-400">ROI-Potenzial: 5x+</div>
                    <div className="text-sm text-gray-300">Nach ersten Projekten</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🔧</div>
                    <h3 className="text-xl font-bold text-white mb-2">Standard-Paket</h3>
                    <p className="text-gray-300 text-sm mb-4">20 qualifizierte Leads/Monat</p>
                    <div className="text-2xl font-bold text-orange-400">399€/Monat</div>
                  </div>
                  
                  
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-green-400">ROI-Potenzial: 6-7x</div>
                    <div className="text-sm text-gray-300">Optimale Rendite</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="text-xl font-bold text-white mb-2">Premium-Paket</h3>
                    <p className="text-gray-300 text-sm mb-4">Unbegrenzte Leads/Monat</p>
                    <div className="text-2xl font-bold text-orange-400">799€/Monat</div>
                  </div>
                  
                  
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-green-400">ROI-Potenzial: 7-8x</div>
                    <div className="text-sm text-gray-300">Maximale Rendite</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  🔍 Interessiert an den detaillierten Berechnungen?
                </h3>
                <p className="text-gray-300 mb-4">
                  Laden Sie unseren kostenlosen Erfolgsleitfaden herunter und erfahren Sie:
                </p>
                <ul className="text-gray-300 text-sm space-y-1 mb-6">
                  <li>• Detaillierte ROI-Berechnungen mit allen Annahmen</li>
                  <li>• 6-Städte-Vergleich mit konkreten Zahlen</li>
                  <li>• Methodik und Datenbasis der Berechnungen</li>
                  <li>• Strategien zur ROI-Optimierung</li>
                </ul>
                <button
                  onClick={() => {
                    window.open('/erfolgs-leitfaden', '_blank');
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  📧 Kostenlosen Erfolgsleitfaden herunterladen
                </button>
              </div>
            </div>
                </div>
        </section>

        {/* Kostenlose Beratung */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                💬 Kostenlose Beratung anfordern
              </h2>
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Kostenloser Erfolgs-Leitfaden: "Balkon-Partner-Programm 2026"
                </h3>
                <p className="text-gray-300 mb-6">
                  Erhalten Sie detaillierte ROI-Berechnungen, 6-Städte-Vergleich, Berlin-Startphase-Details 
                  und alle wichtigen Kennzahlen für Ihre Partnerschaftsentscheidung.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">📈 Was Sie erhalten:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Detaillierte ROI-Berechnungen für alle Pakete</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Realistische Conversion-Raten & Gewinnmargen</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Beispielberechnungen für verschiedene Unternehmensgrößen</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Kosten-Nutzen-Analyse mit allen Faktoren</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Strategien zur ROI-Optimierung</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">🎯 Für wen geeignet:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Kleine Handwerksbetriebe (3-5 Mitarbeiter)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Mittlere Unternehmen (6-15 Mitarbeiter)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Große Betriebe (16+ Mitarbeiter)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Geschäftsführer & Entscheidungsträger</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Alle Balkonbau-Spezialisten</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => {
                    window.open('/erfolgs-leitfaden', '_blank');
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-lg"
                >
                  <span className="flex items-center justify-center">
                    📥 Erfolgs-Leitfaden kostenlos herunterladen
                    <Download className="w-5 h-5 ml-2" />
                  </span>
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  * PDF-Download • 6 Seiten • Sofort verfügbar
                </p>
              </div>
              </div>
            </div>
          </section>

        {/* Vorteile */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                ✅ Warum BALKONFUCHS Partner werden?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Qualifizierte Leads</h3>
                  <p className="text-gray-300 text-sm">Alle Anfragen sind vorqualifiziert und ernsthaft</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Regionale Zuordnung</h3>
                  <p className="text-gray-300 text-sm">Leads werden nach Ihrer Region zugeordnet</p>
                </div>

              <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Zeitersparnis</h3>
                  <p className="text-gray-300 text-sm">Keine Akquise-Zeit mehr nötig</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Euro className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Sonderkonditionen</h3>
                  <p className="text-gray-300 text-sm">Bessere Preise durch Partnerkonditionen</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users2 className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                  <p className="text-gray-300 text-sm">Persönlicher Ansprechpartner für alle Fragen</p>
                    </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Wachstum</h3>
                  <p className="text-gray-300 text-sm">Skalierbare Pakete für jedes Unternehmen</p>
                </div>
                  </div>
                </div>
            </div>
          </section>

        {/* Kostenlose Beratung */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                💬 Kostenlose Beratung anfordern
              </h2>
              
              <p className="text-gray-300 text-center mb-8">
                Lassen Sie sich unverbindlich beraten und erhalten Sie Ihren persönlichen ROI-Plan.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">E-Mail-Adresse *</label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="ihre.email@beispiel.de"
                  />
                </div>
                
                  <div>
                    <label className="block text-white font-semibold mb-2">Unternehmensname *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Ihr Unternehmen"
                    />
                  </div>
                  
                    <div>
                    <label className="block text-white font-semibold mb-2">Telefon</label>
                    <input
                      type="tel"
                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+49 123 456789"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-white font-semibold mb-2">Stadt *</label>
                      <input 
                        type="text" 
                      required
                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Ihre Stadt"
                      />
                    </div>
                    
                  <div className="md:col-span-2">
                    <label className="block text-white font-semibold mb-2">Erfahrung im Balkonbau</label>
                      <select 
                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:border-orange-500 focus:outline-none"
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      >
                        <option value="">Bitte wählen</option>
                      <option value="beginner">Einsteiger (0-2 Jahre)</option>
                      <option value="experienced">Erfahren (3-5 Jahre)</option>
                      <option value="professional">Professionell (6-10 Jahre)</option>
                      <option value="expert">Experte (10+ Jahre)</option>
                      </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 text-gray-300">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500 mt-1"
                      checked={formData.privacy}
                      onChange={(e) => setFormData(prev => ({ ...prev, privacy: e.target.checked }))}
                    />
                    <span className="text-sm">
                      Ich habe die <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Datenschutzerklärung</a> und die Informationen zum <a href="/disclaimer/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Haftungsausschluss</a> gelesen und zur Kenntnis genommen. *
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3 text-gray-300">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-orange-500 bg-gray-800 border-gray-700 rounded focus:ring-orange-500"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                    />
                    <span className="text-sm">Ich möchte den BALKONFUCHS Newsletter erhalten</span>
                  </label>
                </div>
                
                {submitError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
                    {submitError}
                  </div>
                )}
                
                <div className="text-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Wird gesendet...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        📋 Kostenlose Beratung anfordern
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    )}
                </button>
                </div>
              </form>
              </div>
            </div>
          </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
                <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:post@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-white">📧</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
              <ul className="space-y-2">
                  <li><a href="/balkon-kosten-rechner" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kosten-Rechner</a></li>
                  <li><a href="/balkon-planer-online" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer Online</a></li>
                  <li><a href="/balkon-angebot-express" className="text-gray-400 hover:text-orange-400 transition-colors">Express-Angebot</a></li>
                  <li><a href="/balkon-genehmigung-check" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
                  <li><a href="/bauzeit-planung" className="text-gray-400 hover:text-orange-400 transition-colors">Bauzeit-Planung</a></li>
                  <li><a href="/balkon-erfahrungen" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
              <ul className="space-y-2">
                  <li><a href="/balkon-ratgeber" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
                  <li><a href="/balkon-lexikon" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
                  <li><a href="/balkon-foerderung" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
                  <li><a href="/baurecht-balkon" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
                  <li><a href="/feedback" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback geben</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
              <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
                  <li><a href="/karriere" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
                  <li><a href="/partner-werden" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">Partnerbewerbung</a></li>
                  <li><a href="/partner-info-berlin/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
                  <li><a href="/kontakt" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">© 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.</p>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">🛡️</span>
                    <span>Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">✅</span>
                    <span>DSGVO konform</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2">⭐</span>
                    <span>{'>850 glückliche Balkonkunden'}</span>
                  </div>
                  <div className="flex space-x-4">
                    <a href="/impressum" className="hover:text-orange-400 transition-colors">Impressum</a>
                    <a href="/datenschutz" className="hover:text-orange-400 transition-colors">Datenschutz</a>
                    <a href="/agb" className="hover:text-orange-400 transition-colors">AGB</a>
                    <a href="/disclaimer" className="hover:text-orange-400 transition-colors">Haftungsausschluss</a>
                    <a href="/faq" className="hover:text-orange-400 transition-colors">FAQ</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </>
  );
};

export default PartnerWerdenTest;

