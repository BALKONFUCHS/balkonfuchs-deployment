import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Star, Shield, Users, Phone, Mail, X, Play, ChevronDown, Menu, Building, TrendingUp, Award, Target, Zap, HeadphonesIcon, Rocket, Search, FileText, Check, AlertTriangle, Calculator, MessageCircle, Lightbulb, Heart, Clock, Euro, Home, CheckCircle } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';
import ZohoSalesIQ from '../components/ZohoSalesIQ.js';

const BALKONFUCHSEmpfehlungenFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectGoal: '',
    currentSituation: '',
    priorities: [],
    budget: '',
    timeframe: '',
    concerns: [],
    contact: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
      newsletter: false,
      privacy: false
    }
  });

  // Progress Bar Steps
  const steps = [
    { title: 'Projektziel', description: 'Was ist Ihr Hauptziel?' },
    { title: 'Wohnsituation', description: 'Wie ist Ihre aktuelle Situation?' },
    { title: 'Prioritäten', description: 'Was ist Ihnen wichtig?' },
    { title: 'Budget', description: 'In welchem Budgetbereich?' },
    { title: 'Zeitrahmen', description: 'Wann möchten Sie umsetzen?' },
    { title: 'Bedenken', description: 'Welche Sorgen haben Sie?' },
    { title: 'Kontakt', description: 'Ihre Kontaktdaten' }
  ];

  // Fragen-Definitionen
  const questions = [
    {
      id: 'projectGoal',
      title: 'Was ist Ihr Hauptziel mit dem Balkon-Projekt?',
      subtitle: '🎯 So können wir passende Erfahrungen und Tipps für Sie finden!',
      type: 'selection',
      options: [
        { 
          icon: '🌅', 
          title: 'Mehr Wohnraum schaffen', 
          subtitle: 'Zusätzlicher Raum zum Leben und Entspannen',
          value: 'living_space'
        },
        { 
          icon: '💰', 
          title: 'Wert der Immobilie steigern', 
          subtitle: 'Langfristige Wertsteigerung',
          value: 'property_value'
        },
        { 
          icon: '🌱', 
          title: 'Lebensqualität verbessern', 
          subtitle: 'Mehr Licht, Luft und Natur genießen',
          value: 'quality_of_life'
        },
        { 
          icon: '👥', 
          title: 'Familienbedürfnisse erfüllen', 
          subtitle: 'Spielbereich für Kinder oder Rückzugsort',
          value: 'family_needs'
        },
        { 
          icon: '🏠', 
          title: 'Architektur vervollständigen', 
          subtitle: 'Optische Aufwertung des Gebäudes',
          value: 'architecture'
        }
      ]
    },
    {
      id: 'currentSituation',
      title: 'Wie ist Ihre aktuelle Wohnsituation?',
      subtitle: '🏠 Das hilft uns, passende Erfahrungsberichte zu zeigen!',
      type: 'selection',
      options: [
        { 
          icon: '🏠', 
          title: 'Eigentümer im Einfamilienhaus', 
          subtitle: 'Freie Entscheidung über Balkon-Anbau',
          value: 'single_owner'
        },
        { 
          icon: '🏢', 
          title: 'Eigentümer in Eigentümergemeinschaft', 
          subtitle: 'WEG-Beschluss erforderlich',
          value: 'condo_owner'
        },
        { 
          icon: '🔑', 
          title: 'Verwalter/Vermieter', 
          subtitle: 'Entscheidung für Mieter oder Eigentümer',
          value: 'manager'
        },
        { 
          icon: '🏠', 
          title: 'Mieter mit Genehmigung', 
          subtitle: 'Vermieter ist einverstanden',
          value: 'tenant_approved'
        },
        { 
          icon: '🤔', 
          title: 'Noch in der Klärungsphase', 
          subtitle: 'Rechtliche Situation wird geprüft',
          value: 'clarifying'
        }
      ]
    },
    {
      id: 'priorities',
      title: 'Was ist Ihnen beim Balkon-Anbau besonders wichtig?',
      subtitle: '⭐ Mehrfachauswahl möglich - so finden wir passende Empfehlungen!',
      type: 'multiple',
      options: [
        { 
          icon: '💰', 
          title: 'Günstiger Preis', 
          subtitle: 'Kosteneffizienz steht im Vordergrund',
          value: 'price'
        },
        { 
          icon: '💎', 
          title: 'Hochwertige Materialien', 
          subtitle: 'Langlebigkeit und Qualität',
          value: 'quality'
        },
        { 
          icon: '⚡', 
          title: 'Schnelle Umsetzung', 
          subtitle: 'Kurze Bauzeit ist wichtig',
          value: 'speed'
        },
        { 
          icon: '🎨', 
          title: 'Schönes Design', 
          subtitle: 'Optik und Ästhetik',
          value: 'design'
        },
        { 
          icon: '🔧', 
          title: 'Wartungsarmut', 
          subtitle: 'Wenig Pflege und Instandhaltung',
          value: 'maintenance'
        },
        { 
          icon: '🌿', 
          title: 'Nachhaltigkeit', 
          subtitle: 'Umweltfreundliche Materialien',
          value: 'sustainability'
        },
        { 
          icon: '🏠', 
          title: 'Passend zur Architektur', 
          subtitle: 'Harmonische Integration',
          value: 'architecture_fit'
        },
        { 
          icon: '📋', 
          title: 'Einfache Genehmigung', 
          subtitle: 'Wenig bürokratischer Aufwand',
          value: 'permit_ease'
        }
      ]
    },
    {
      id: 'budget',
      title: 'In welchem Budgetbereich planen Sie?',
      subtitle: '💰 Damit zeigen wir Ihnen realistische Erfahrungsberichte!',
      type: 'selection',
      options: [
        { 
          icon: '💵', 
          title: 'Bis 15.000 €', 
          subtitle: 'Einfache, kostengünstige Lösung',
          value: '15k'
        },
        { 
          icon: '💸', 
          title: '15.000 - 25.000 €', 
          subtitle: 'Solide Mittelklasse-Ausstattung',
          value: '15_25k'
        },
        { 
          icon: '💎', 
          title: '25.000 - 40.000 €', 
          subtitle: 'Hochwertige Premium-Lösung',
          value: '25_40k'
        },
        { 
          icon: '💍', 
          title: 'Über 40.000 €', 
          subtitle: 'Luxus-Segment ohne Kompromisse',
          value: '40k_plus'
        },
        { 
          icon: '❓', 
          title: 'Noch unklar', 
          subtitle: 'Orientierung durch Erfahrungen gewünscht',
          value: 'unclear'
        }
      ]
    },
    {
      id: 'timeframe',
      title: 'Wann möchten Sie das Projekt umsetzen?',
      subtitle: '📅 Je nach Zeitrahmen gibt es unterschiedliche Erfahrungen!',
      type: 'selection',
      options: [
        { 
          icon: '🚀', 
          title: 'So schnell wie möglich', 
          subtitle: 'Höchste Priorität, sofortiger Start',
          value: 'immediate'
        },
        { 
          icon: '🌸', 
          title: 'Bis zum nächsten Frühling', 
          subtitle: 'Perfekter Zeitpunkt für die Nutzung',
          value: 'next_spring'
        },
        { 
          icon: '☀️', 
          title: 'Bis zum nächsten Sommer', 
          subtitle: 'Entspannte Planung möglich',
          value: 'next_summer'
        },
        { 
          icon: '📅', 
          title: 'Innerhalb von 2 Jahren', 
          subtitle: 'Langfristige Planung',
          value: '2_years'
        },
        { 
          icon: '🤔', 
          title: 'Zeitpunkt ist flexibel', 
          subtitle: 'Abhängig von anderen Faktoren',
          value: 'flexible'
        }
      ]
    },
    {
      id: 'concerns',
      title: 'Welche Sorgen oder Bedenken haben Sie?',
      subtitle: '💭 Ehrliche Antworten helfen uns, passende Lösungserfahrungen zu zeigen!',
      type: 'multiple',
      options: [
        { 
          icon: '💰', 
          title: 'Hohe Kosten', 
          subtitle: 'Budget könnte überschritten werden',
          value: 'cost_overrun'
        },
        { 
          icon: '📄', 
          title: 'Genehmigungsprobleme', 
          subtitle: 'Behördliche Hürden',
          value: 'permit_issues'
        },
        { 
          icon: '⏰', 
          title: 'Lange Bauzeit', 
          subtitle: 'Störungen und Verzögerungen',
          value: 'construction_time'
        },
        { 
          icon: '🏗️', 
          title: 'Qualitätsmängel', 
          subtitle: 'Schlechte Handwerksarbeit',
          value: 'quality_issues'
        },
        { 
          icon: '👥', 
          title: 'Nachbarschaftsprobleme', 
          subtitle: 'Konflikte mit Anwohnern',
          value: 'neighbor_issues'
        },
        { 
          icon: '🏠', 
          title: 'Statische Probleme', 
          subtitle: 'Gebäudeschäden oder Stabilität',
          value: 'structural_issues'
        },
        { 
          icon: '🔧', 
          title: 'Hoher Wartungsaufwand', 
          subtitle: 'Laufende Kosten und Pflege',
          value: 'maintenance_costs'
        },
        { 
          icon: '☔', 
          title: 'Witterungsschäden', 
          subtitle: 'Langzeitbeständigkeit',
          value: 'weather_damage'
        }
      ]
    }
  ];

  // Option auswählen (Single Choice)
  const selectOption = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Auto-advance for single choice questions
    if (['projectGoal', 'currentSituation', 'budget', 'timeframe'].includes(questionId)) {
      setTimeout(() => nextStep(), 500);
    }
  };

  // Option umschalten (Multiple Choice)
  const toggleMultipleOption = (questionId: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[questionId] as string[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [questionId]: newValues
      };
    });
  };

  // Kontaktformular validieren
  const isContactFormComplete = () => {
    return formData.contact.firstName && 
           formData.contact.lastName && 
           formData.contact.email && 
           formData.contact.zipCode && 
           formData.contact.privacy;
  };

  // Kontaktdaten ändern
  const handleContactChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Formular absenden
  const handleSubmit = async () => {
    if (isContactFormComplete()) {
      try {
        // Calculate Lead Score
        const leadScore = LEAD_SCORING_FUNCTIONS.calculateScore('empfehlungen', {
          projektziel: formData.projectGoal,
          wohnsituation: formData.currentSituation,
          budget: formData.budget,
          zeitrahmen: formData.timeframe,
          prioritaeten: formData.priorities.length,
          bedenken: formData.concerns.length
        });

        // Prepare data for Zoho export
        const exportData = {
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'BALKONFUCHS Empfehlungen',
          funnelType: 'Empfehlungen',
          // LeadScoring-Daten
          _internalScoring: {
            leadScore: leadScore.totalScore,
            category: leadScore.category,
            priority: leadScore.priority,
            urgency: leadScore.urgency,
            complexity: leadScore.complexity,
            budget: leadScore.budget,
            timeline: leadScore.timeline,
            followUpHours: leadScore.followUpHours
          }
        };

        // Export to Zoho via API
        console.log('Exporting to Zoho:', exportData);
        
        try {
          const zohoResult = await fetch('/.netlify/functions/send-to-zoho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exportData)
          });
          
          const zohoData = await zohoResult.json();
          
          if (zohoData.success) {
            console.log('Successfully exported to Zoho:', zohoData);
            localStorage.setItem('zohoExport', JSON.stringify({
              deskTicketId: zohoData.deskTicket?.id,
              crmLeadId: zohoData.crmLead?.details?.id,
              timestamp: new Date().toISOString()
            }));
          } else {
            console.error('Zoho export failed:', zohoData.error);
          }
        } catch (error) {
          console.error('Error calling Zoho API:', error);
        }
        
        // Proceed to success page
        setCurrentStep(steps.length);
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  // Nächster Schritt
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Vorheriger Schritt
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Kann weitergehen
  const canProceed = () => {
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return false;

    if (currentQuestion.type === 'selection') {
      return !!formData[currentQuestion.id];
    } else if (currentQuestion.type === 'multiple') {
      const values = formData[currentQuestion.id] as string[];
      return values && values.length > 0;
    }
    return false;
  };

  // Header Component
  const Header = () => (
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
                            <nav className="hidden md:flex space-x-8">
           <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
           <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
           <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Angebot</a>
           <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
           <a href="/konfigurator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Konfigurator</a>
         </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/partner-info-berlin/" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Partner werden
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            <a href="/balkon-kosten-rechner-2026/" className="block text-gray-300 font-medium">Kalkulator</a>
            <a href="/balkon-planer/" className="block text-gray-300 font-medium">Planer</a>
            <a href="/angebot/" className="block text-gray-300 font-medium">Express-Angebot</a>
            <a href="/balkon-baugenehmigung-check/" className="block text-gray-300 font-medium">Genehmigungscheck</a>
            <a href="/balkon-baustart-rechner/" className="block text-gray-300 font-medium">Bauzeit-Planung</a>
            <a href="/erfahrungen/" className="block text-orange-500 font-medium border-l-4 border-orange-500 pl-3">Erfahrungen</a>
            <div className="pt-3 border-t border-gray-800">
              <a href="mailto:info@balkonfuchs.de" className="block text-orange-500 font-semibold">
                📧 info@balkonfuchs.de
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );

  // Footer Component
  const Footer = () => (
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
              <li><a href="/kalkulator/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
              <li><a href="/planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
              <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Angebot</a></li>
              <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
              <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
              <li><a href="/konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
              <li><a href="/erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
              <li><a href="/galerie/" className="text-gray-400 hover:text-orange-400 transition-colors">Galerie</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
            <ul className="space-y-2">
              <li><a href="/news/" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
              <li><a href="/foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
              <li><a href="/baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
              <li><a href="/ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
              <li><a href="/lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
              <li><a href="/faq/" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
              <li><a href="/feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback</a></li>
            </ul>
              </div>
          
                              <div>
            <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
            <ul className="space-y-2">
              <li><a href="/about/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
              <li><a href="/karriere/" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
              <li><a href="/partner-werden/" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
              <li><a href="/partner-info-berlin/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
              <li><a href="/kontakt/" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
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
                <span>4.8/5 Sterne</span>
              </div>
              <div className="flex space-x-4">
                <a href="/impressum" className="hover:text-orange-400 transition-colors">Impressum</a>
                <a href="/datenschutz/" className="hover:text-orange-400 transition-colors">Datenschutz</a>
                <a href="/agb" className="hover:text-orange-400 transition-colors">AGB</a>
                <a href="/disclaimer/" className="hover:text-orange-400 transition-colors">Disclaimer</a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Frage rendern
  const renderQuestion = () => {
    if (currentStep >= questions.length) {
      return renderContactForm();
    }

    const question = questions[currentStep];
    
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">{question.title}</h2>
          <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
            {question.subtitle}
          </p>
        </div>

        {question.type === 'selection' && (
          <div className="grid gap-4">
            {question.options.map((option) => {
              const isSelected = formData[question.id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => selectOption(question.id, option.value)}
                  className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-lg group ${
                    isSelected 
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg' 
                      : 'border-gray-700 hover:border-orange-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                      <p className="text-gray-400 mt-1">{option.subtitle}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-6 h-6 text-orange-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'multiple' && (
          <div className="grid md:grid-cols-2 gap-4">
            {question.options.map((option) => {
              const values = formData[question.id] as string[] || [];
              const isSelected = values.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleMultipleOption(question.id, option.value)}
                  className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-lg ${
                    isSelected 
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg' 
                      : 'border-gray-700 hover:border-orange-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                      <p className="text-gray-400 mt-1 text-sm">{option.subtitle}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-6 h-6 text-orange-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Kontaktformular
  const renderContactForm = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Ihre persönlichen Empfehlungen erhalten</h2>
        <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
          🎯 Gleich erhalten Sie maßgeschneiderte Empfehlungen und Erfahrungsberichte!
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <select
          value={formData.contact.salutation}
          onChange={(e) => handleContactChange('salutation', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Anrede wählen *</option>
          <option value="herr">Herr</option>
          <option value="frau">Frau</option>
          <option value="divers">Divers</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Vorname *"
            value={formData.contact.firstName}
            onChange={(e) => handleContactChange('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Nachname *"
            value={formData.contact.lastName}
            onChange={(e) => handleContactChange('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <input
          type="email"
          placeholder="E-Mail-Adresse *"
          value={formData.contact.email}
          onChange={(e) => handleContactChange('email', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        <input
          type="tel"
          placeholder="Telefonnummer (optional)"
          value={formData.contact.phone}
          onChange={(e) => handleContactChange('phone', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="PLZ *"
          value={formData.contact.zipCode}
          onChange={(e) => handleContactChange('zipCode', e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="newsletter"
            checked={formData.contact.newsletter}
            onChange={(e) => handleContactChange('newsletter', e.target.checked)}
            className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
          />
                        <label htmlFor="newsletter" className="text-gray-300 text-sm">
                Ich möchte den Balkonbrief erhalten
              </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="privacy"
            checked={formData.contact.privacy}
            onChange={(e) => handleContactChange('privacy', e.target.checked)}
            className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
          />
          <label htmlFor="privacy" className="text-gray-300 text-sm">
            Ich habe die <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Datenschutzerklärung</a> und die Informationen zum <a href="/disclaimer/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 underline">Disclaimer</a> gelesen und zur Kenntnis genommen. *
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isContactFormComplete()}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isContactFormComplete()
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          🎯 Persönliche Empfehlungen erhalten
        </button>
      </div>
    </div>
  );

  // Erfolgsseite
  const renderSuccessPage = () => (
    <div className="text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">
          Vielen Dank für Ihre Anfrage!
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          Wir haben Ihre Anfrage erhalten und werden Ihnen innerhalb der nächsten 24 Stunden maßgeschneiderte Empfehlungen und Erfahrungsberichte zusenden.
        </p>
      </div>

      <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Ihre Empfehlungsanfrage</h3>
        <div className="text-left space-y-3">
          <p><span className="font-semibold text-gray-300">Projektziel:</span> <span className="text-white">
            {questions.find(q => q.id === 'projectGoal')?.options.find(o => o.value === formData.projectGoal)?.title}
          </span></p>
          <p><span className="font-semibold text-gray-300">Wohnsituation:</span> <span className="text-white">
            {questions.find(q => q.id === 'currentSituation')?.options.find(o => o.value === formData.currentSituation)?.title}
          </span></p>
          <p><span className="font-semibold text-gray-300">Budget:</span> <span className="text-white">
            {questions.find(q => q.id === 'budget')?.options.find(o => o.value === formData.budget)?.title}
          </span></p>
          <p><span className="font-semibold text-gray-300">Zeitrahmen:</span> <span className="text-white">
            {questions.find(q => q.id === 'timeframe')?.options.find(o => o.value === formData.timeframe)?.title}
          </span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="/balkon-kosten-rechner-2026/" className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
          <Calculator className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-lg font-semibold text-white mb-2">Balkon-Kalkulator</h4>
          <p className="text-gray-400 text-sm">Kosten für Ihren Balkon berechnen</p>
        </a>
        
        <a href="/balkon-planer/" className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
          <Search className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-lg font-semibold text-white mb-2">Balkon-Planer</h4>
          <p className="text-gray-400 text-sm">Detaillierte Planung Ihres Projekts</p>
        </a>
        
        <a href="/angebot/" className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 hover:bg-gray-700 transition-all group">
          <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h4 className="text-lg font-semibold text-white mb-2">Express-Angebot</h4>
          <p className="text-gray-400 text-sm">Schnelles Angebot für Ihr Projekt</p>
        </a>
      </div>

      <div className="text-center">
        <p className="text-gray-400 mb-4">Weitere hilfreiche Tools für Ihr Balkonprojekt:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/balkon-baugenehmigung-check/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all hover:scale-105">
            <FileText className="w-5 h-5 text-orange-500" />
            Genehmigungscheck
          </a>
          <a href="/balkon-baustart-rechner/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all hover:scale-105">
            <Clock className="w-5 h-5 text-orange-500" />
            Bauzeit-Planung
          </a>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all hover:scale-105">
            <Home className="w-5 h-5 text-orange-500" />
            Alle Tools
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Progress Bar */}
      {currentStep < steps.length && (
        <section className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-300">
                Schritt {currentStep + 1} von {steps.length}
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-400">{steps[currentStep]?.title}</span>
            </div>
          </div>
        </section>
      )}
      
      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              {currentStep === steps.length ? renderSuccessPage() : renderQuestion()}
            </div>
          </div>
          
          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 0
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück
              </button>
              
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Weiter
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>
      
      
      <Footer />
      
      {/* ZOHO Sales IQ Widget */}
      <ZohoSalesIQ />
    </div>
  );
};

export default BALKONFUCHSEmpfehlungenFunnel;



