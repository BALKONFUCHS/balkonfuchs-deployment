import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, ArrowLeft, MessageSquare, CheckCircle, Star, Shield, Users, X, ThumbsUp, Mail, Menu, Calculator, Search, Zap, FileText, Clock, Home } from 'lucide-react';
import { LEAD_SCORING_FUNCTIONS } from '../utils/balkon-lead-scoring';

const BALKONFUCHSErfahrungenFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    feedbackType: '',
    overallRating: 0,
    reviewType: '',
    serviceRatings: {
      kalkulator: 0,
      planer: 0,
      genehmigung: 0,
      expressAngebot: 0,
      bauzeitPlanung: 0,
      
    },
    projectType: '',
    projectLocation: '',
    projectCost: '',
    companyName: '',
    experienceText: '',
    wouldRecommend: '',
    publishPermission: '',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const allQuestions = [
    {
      id: 'feedbackType',
      title: 'Welche Art von Feedback möchten Sie geben?',
      subtitle: '💬 Ihr Feedback hilft uns und anderen Kunden!',
      type: 'selection',
      options: [
        { 
          icon: '⭐', 
          title: 'Positive Erfahrung teilen', 
          subtitle: 'Projekt erfolgreich abgeschlossen',
          value: 'positive'
        },
,
        { 
          icon: '🔧', 
          title: 'Verbesserungsvorschlag', 
          subtitle: 'Konstruktive Kritik und Ideen',
          value: 'improvement'
        },
                {
          icon: '❓',
          title: 'Service-Nachfragen & FAQ',
          subtitle: 'Unklarheiten, Fragen oder direkte Antworten zu unseren Services',
          value: 'service_faq'
        }
      ]
    },
    {
      id: 'overallRating',
      title: 'Wie bewerten Sie unseren Service insgesamt?',
      subtitle: '⭐ Ihre ehrliche Bewertung ist uns wichtig!',
      type: 'star_rating'
    },
    {
      id: 'reviewType',
      title: 'Was möchten Sie bewerten?',
      subtitle: '🎯 Wählen Sie aus, wofür Sie Feedback geben möchten!',
      type: 'selection',
      options: [
        { 
          icon: '🌐', 
          title: 'Service & Website', 
          subtitle: 'Funnels, Beratung, Benutzerfreundlichkeit',
          value: 'service'
        },
        { 
          icon: '🏗️', 
          title: 'Abgeschlossenes Projekt', 
          subtitle: 'Balkon, Sanierung, etc.',
          value: 'project'
        },
        { 
          icon: '⭐', 
          title: 'Beides', 
          subtitle: 'Service + abgeschlossenes Projekt',
          value: 'both'
        }
      ]
    },
    {
      id: 'serviceReview',
      title: 'Welche Services haben Ihnen geholfen?',
      subtitle: '🌐 Bewerten Sie die Funnel und Services, die Sie genutzt haben!',
      type: 'service_review',
      conditional: true
    },
    {
      id: 'projectDetails',
      title: 'Details zu Ihrem Balkon-Projekt',
      subtitle: '🏗️ Diese Informationen helfen anderen bei ihrer Entscheidung!',
      type: 'project_details',
      conditional: true
    },
    {
      id: 'experienceText',
      title: 'Erzählen Sie uns mehr über Ihre Erfahrung',
      subtitle: '💭 Ihre detaillierte Rückmeldung hilft uns sehr!',
      type: 'text_input',
      placeholder: 'Beschreiben Sie gerne Ihre Erfahrung mit dem Balkon-Projekt: Was lief gut? Was könnte besser sein?'
    },
    {
      id: 'publishPermission',
      title: 'Wie dürfen wir Ihr Feedback verwenden?',
      subtitle: '🔒 Ihre Erfahrungen helfen anderen bei der Entscheidung!',
      type: 'selection',
      options: [
        { 
          icon: '👤', 
          title: 'Mit Vor- und Nachname und Region', 
          subtitle: 'z.B. Max Mustermann, Berlin',
          value: 'full_name'
        },
        { 
          icon: '📍', 
          title: 'Mit Nachname und Region', 
          subtitle: 'z.B. M. Mustermann, Berlin',
          value: 'named'
        },
        { 
          icon: '🔒', 
          title: 'Nur mit Vorname und Region', 
          subtitle: 'z.B. Max aus Berlin',
          value: 'firstname'
        },
        { 
          icon: '❓', 
          title: 'Komplett anonym', 
          subtitle: 'Keine persönlichen Daten',
          value: 'anonymous'
        },
        { 
          icon: '❌', 
          title: 'Nicht veröffentlichen', 
          subtitle: 'Nur für interne Verbesserung',
          value: 'private'
        }
      ]
    },
    {
      id: 'faqSession',
      title: 'Häufige Fragen zu unseren Services',
      subtitle: '❓ Finden Sie schnell Antworten auf Ihre Fragen!',
      type: 'faq'
    },
    {
      id: 'contact',
      title: 'Ihre Kontaktdaten',
      subtitle: '📧 Für Rückfragen und Bestätigung Ihrer Bewertung',
      type: 'contact'
    }
  ];

  // Bedingte Schritt-Filterung basierend auf feedbackType und reviewType
  const getFilteredQuestions = () => {
    // Spezielle Behandlung für Service-FAQ
    // FAQ-Pfad: Direkt zur Kontaktseite (ohne Bewertung)
    if (formData.feedbackType === 'service_faq') {
      return [
        allQuestions[0], // feedbackType
        allQuestions[6], // faqSession 
        allQuestions[7]  // contact
      ];
    }
    
    if (!formData.reviewType) {
      return allQuestions.slice(0, 3); // Nur bis reviewType
    }
    
    switch (formData.reviewType) {
      case 'service':
        // Service bewerten: Überspringe Projektdetails
        return [
          ...allQuestions.slice(0, 3), // feedbackType, overallRating, reviewType
          allQuestions[3], // serviceReview
          allQuestions[5], // experienceText
          allQuestions[6], // publishPermission
          allQuestions[8]  // contact
        ];
      case 'project':
        // Projekt bewerten: Überspringe Service-Bewertung
        return [
          ...allQuestions.slice(0, 3), // feedbackType, overallRating, reviewType
          allQuestions[4], // projectDetails
          allQuestions[5], // experienceText
          allQuestions[6], // publishPermission
          allQuestions[8]  // contact
        ];
      case 'both':
        // Beides: Alle Schritte
        return allQuestions;
      default:
        return allQuestions.slice(0, 3);
    }
  };

  const questions = getFilteredQuestions();
  
  // Dynamische Schritt-Anzahl basierend auf gefilterten Fragen
  const totalSteps = questions.length;

  // FAQ Daten - 27 aktuelle Fragen und Antworten (exakt wie im Input)
  const faqData = [
    {
      category: "🔧 Allgemeine Funktion & Service",
      questions: [
        {
          question: "Ist der BALKONFUCHS-Service wirklich kostenlos für mich?",
          answer: "Ja, unser Service ist zu 100% kostenlos für Sie. Was wir uns im Gegenzug wünschen, ist, dass Sie unseren Balkonbrief für die Dauer Ihres Projektes abonnieren. Hierüber informieren wir zu Neuigkeiten, neuen Partnern, aktuellen Projekten und möglichen Referenzen für Ihr Projekt - alles mehrwertbringende Informationen für Sie. Teilnehmende Partnerbetriebe zahlen eine Gebühr für ihre Teilnahme, die diese Services finanziert."
        },
        {
          question: "Wie funktioniert der BALKONFUCHS-Service genau?",
          answer: "Wir bieten vorbereitende Arbeiten für Ihr umfangreiches Balkonprojekt. Sie beantworten Fragen zu Ihrem Vorhaben, wir analysieren alle beteiligten Gewerke (Statik, Genehmigung, Montage, etc.) und vermitteln Sie an spezialisierte Fachbetriebe, die alle Aspekte Ihres Projekts abdecken können."
        },
        {
          question: "Bin ich nach der Nutzung des Funnels zu etwas verpflichtet?",
          answer: "Nein, absolut nicht. Alle Angebote sind unverbindlich. Sie können jederzeit ohne Angabe von Gründen von einem Angebot zurücktreten oder gar nicht reagieren."
        },
        {
          question: "Wie viele Angebote erhalte ich?",
          answer: "Sie erhalten in der Regel 2-3 konkrete Angebote von geprüften Fachbetrieben aus Ihrer Region. Sie können im Funnel (z.B. Planer-Funnel) angeben, ob Sie auch überregionale Angebote wünschen - dann erhalten Sie möglicherweise 5-6 Angebote. Wichtig ist uns, Ihnen regionale Partner an die Hand zu geben, um Effizienz und regionale Verbundenheit zu fördern. Bei spezifischen Projekten kann es erforderlich werden, auf überregionale oder spezialisierte Partner zurückzugreifen."
        },
        {
          question: "Was passiert mit meinen Daten?",
          answer: "Ihre Daten werden ausschließlich zur Angebotserstellung verwendet und nur an die ausgewählten Partnerbetriebe weitergegeben. Wir halten uns strikt an die DSGVO."
        }
      ]
    },
    {
      category: "💰 Kosten & Sparpotenzial",
      questions: [
        {
          question: "Wie genau sind die Kostenschätzungen im Funnel?",
          answer: "Unsere Kostenschätzungen basieren auf über 2.500 realisierten Projekten und sind in der Regel auf ±15% genau. Es ist uns wichtig, Ihnen eine möglichst gute Kostenschätzung zur Verfügung zu stellen. Allerdings sind gerade bei Balkonprojekten (beispielsweise im Denkmalschutz oder schwer zugänglichen Bereichen) häufig zusätzliche Kosten notwendig, die im Vorfeld nicht kalkulierbar sind. Wichtig ist uns, Ihnen dies rechtzeitig mit unseren Tools aufzuzeigen. Die finalen Kosten werden nach der Vor-Ort-Besichtigung festgelegt."
        },
        {
          question: "Wie viel kann ich tatsächlich sparen?",
          answer: "Unsere Kunden sparen durchschnittlich 3.200€ bei ihrem Balkon-Projekt. Die Ersparnis entsteht durch den Vergleich mehrerer Angebote und unsere Partnerkonditionen."
        },
        {
          question: "Warum sind die Preise niedriger als bei direkter Anfrage?",
          answer: "Unsere Partner bieten Ihnen Sonderkonditionen, da sie über uns qualifizierte Anfragen erhalten. Zudem führt der Angebotsvergleich automatisch zu besseren Preisen."
        },
        {
          question: "Fallen versteckte Kosten an?",
          answer: "Nein, alle seriösen Angebote enthalten alle Kosten transparent aufgeschlüsselt. Achten Sie auf das BALKONFUCHS-Qualitätssiegel bei den Partnerbetrieben."
        },
        {
          question: "Was kostet eine Vor-Ort-Besichtigung?",
          answer: "Alle unsere Partner bieten kostenlose Vor-Ort-Termine an, um Ihr Projekt zu besichtigen und ein detailliertes Angebot zu erstellen. Dies ist bei allen Partnern im Service enthalten."
        }
      ]
    },
    {
      category: "⏱️ Zeitabläufe & Planung",
      questions: [
        {
          question: "Wie schnell erhalte ich die ersten Angebote?",
          answer: "Die erste Kostenschätzung erhalten Sie sofort im Funnel. Die Vermittlung an passende Fachbetriebe erfolgt innerhalb von 24-48 Stunden. Die Angebotserstellung durch die Partner kann je nach Projektumfang 3-7 Tage dauern. Termine können an Feiertagen oder in der Urlaubszeit etwas variieren."
        },
        {
          question: "Wie lange dauert die gesamte Projektrealisierung?",
          answer: "Von der Anfrage bis zum fertigen Balkon vergehen in der Regel 8-16 Wochen, abhängig von Genehmigungsverfahren und Witterung. Unser Zeitplaner wurde für Sie entwickelt, damit Sie rechtzeitig vor Ihrem Balkonprojekt die Möglichkeit haben, sich Gedanken zu machen - und nicht erst dann, wenn Sie eigentlich schon auf dem Balkon sitzen möchten. Denn dann ist es meist zu spät, oft auch für die aktuelle Sommersaison."
        },
        {
          question: "Kann ich den Baubeginn selbst bestimmen?",
          answer: "Jein - eine Kombination aus 'Ja' und 'Nein'. Sie können Ihre Wunschtermine angeben. Dies ist davon abhängig, in welchem Bundesland Sie wohnen und ob Sie ein genehmigungsfreies oder verfahrensfreies Projekt anstreben. Gleichzeitig gilt zu berücksichtigen, dass solche Projekte auch eine Statik benötigen. Rechnen Sie lieber 4-6 Wochen länger als zu kurzfristig. Die Partner planen entsprechend und koordinieren Genehmigungszeiten und Bauabläufe mit Ihren Vorstellungen."
        },
        {
          question: "Was passiert bei Verzögerungen?",
          answer: "Unsere Partner sind angehalten, Sie proaktiv über alle Verzögerungen zu informieren und erarbeiten gemeinsam mit Ihnen Lösungen. Vertragsstrafen bei groben Verzögerungen sind üblich."
        }
      ]
    },
    {
      category: "🏗️ Projektumfang & Gewerke",
      questions: [
        {
          question: "Was für Gewerke sind bei einem Balkonprojekt beteiligt?",
          answer: "Ein Balkonanbau ist sehr umfangreich und erfordert meist mehrere Gewerke: Statiker für Tragfähigkeitsprüfung, Metallbauer für Konstruktion, ggf. Maurer für Fundamente, Dachdecker für Abdichtung, Schlosser für Geländer und oft auch Elektriker. Nicht selten braucht es einen Maurer und Verputzer, denn häufig müssen Brüstungen abgebrochen und wieder verputzt werden. Es braucht einen Fensterbauer, um neue Balkontüren einzubauen. Oft auch einen Heizungsbauer, da hinter künftigen Balkontüren häufig Heizkörper platziert sind, die zurückgebaut werden müssen. Ab und an muss auch der Fußbodenleger eingebunden werden. Viele Bauherren haben diese Komplexität anfangs nicht im Blick."
        },
        {
          question: "Welche Balkontypen sind über BALKONFUCHS möglich?",
          answer: "Wir vermitteln alle Arten von Balkon-Projekten: Hängebalkone, Vorstellbalkone, Anlehnbalkone, Hochterrassen und Balkonrenovierungen. Auch Sonderlösungen sind möglich - diese sind dann allerdings mit den Partnern direkt zu besprechen."
        },
        {
          question: "Warum heißt es 'Express Angebot' - bekomme ich wirklich in 24h ein Angebot?",
          answer: "'Express' bezieht sich auf die schnelle Projektrealisierung, nicht auf die Angebotszeit. Wir unterstützen Sie dabei, möglichst schnell zum richtigen Partner und zur zügigen Umsetzung Ihres Balkonprojekts zu kommen. Die Angebotserstellung selbst dauert je nach Projektumfang 3-7 Tage."
        },
        {
          question: "Kann mein Wunschbalkon überhaupt gebaut werden?",
          answer: "Das prüfen unsere Partner im kostenlosen Vor-Ort-Termin. Sie bewerten die baulichen Gegebenheiten und klären alle technischen Machbarkeitsfragen direkt vor Ort. Sehr häufig erhielten wir in der Vergangenheit Anfragen über Balkonprojekte, die so nicht realisierbar waren. Zum Beispiel Hängebalkone, die bei der gewünschten Größe von der Gebäudestruktur nicht aufgenommen werden konnten, weil das Mauerwerk zu schwach war, kein Ringanker vorhanden war oder der Balkon viel zu groß gewünscht wurde. Oder Balkone im fünften Obergeschoss, wo sich darunter keine oder alte Balkone befinden, was ebenfalls problematisch sein kann."
        },
        {
          question: "Brauche ich eine Baugenehmigung für meinen Balkon?",
          answer: "Das hängt von Balkontyp, Größe und Bundesland ab. Hierzu nutzen Sie bitte unseren Genehmigungscheck, der einen ersten guten Überblick verschafft. Grundsätzlich raten wir aber auch, mit dem Bauamt im Vorfeld noch einmal Kontakt aufzunehmen und definitiv sicherzugehen, ob eine Genehmigung notwendig ist oder nicht. Unsere Partner kennen alle regionalen Bestimmungen und übernehmen das Genehmigungsverfahren für Sie."
        },
        {
          question: "Wie wird mein Haus bei der Montage geschützt?",
          answer: "Alle Partner verwenden professionelle Schutzmaßnahmen: Folien, Absperrungen und schonende Befestigungstechniken. Schäden sind über die Betriebshaftpflicht versichert."
        }
      ]
    },
    {
      category: "🤝 Partner & Qualität",
      questions: [
        {
          question: "Wie finde ich den richtigen Partner für mein Projekt?",
          answer: "Wir prüfen alle Partner nach strengen Kriterien: Erfahrung, Referenzen, Kundenbewertungen und finanzielle Stabilität. Sie erhalten nur Angebote von geprüften Fachbetrieben. Hierzu hilft uns auch Ihr Feedback nach der Fertigstellung eines Projektes. Wir werden Sie aktiv auf Ihr Feedback befragen, denn Sie wissen selber, wie das ist - Sie gehen gerne in das Restaurant mit den meisten positiven Google-Bewertungen. Genau so machen wir das auch. Wir fragen Sie, wie zufrieden Sie waren, um etwas über Qualität, Kommunikation, Sauberkeit und Service vor Ort zu erfahren. Sollte mal etwas nicht zu Ihrer Zufriedenheit verlaufen sein, setzen wir uns mit dem Partner in Verbindung und fassen von unserer Seite nach."
        },
        {
          question: "Was ist wenn ich mit einem Partner nicht zufrieden bin?",
          answer: "Wir sind stets bemüht, Ihnen eine positive Lösung zur Verfügung zu stellen und einen guten Partner an die Seite zu stellen. Melden Sie sich sofort bei uns per E-Mail oder Chat. Wir vermitteln Sie kostenfrei an alternative Partner oder helfen bei der Problemlösung. Ihr Projekterfolg ist unser Ziel."
        },
        {
          question: "Haben die Partner alle notwendigen Versicherungen?",
          answer: "Ja, alle Partner müssen eine gültige Betriebshaftpflicht- und Werksvollendungsversicherung nachweisen. Diese Prüfung ist Voraussetzung für die Partnerschaft."
        },
        {
          question: "Kann ich Referenzen der Partner einsehen?",
          answer: "Ja, unsere Partner können Ihnen auf Anfrage Referenzprojekte und Kundenbewertungen zeigen. Viele haben auch Online-Bewertungen, die Sie prüfen können. Das Thema Referenzprojekte werden wir auch noch weiter ausbauen, damit Ihnen nicht nur eine bessere Übersicht, sondern auch eine bessere Möglichkeit zur Referenzierung geboten wird."
        }
      ]
    },
    {
      category: "📋 Funnel-Bedienung & Support",
      questions: [
        {
          question: "Ich habe mich im Funnel 'verklickt' - kann ich korrigieren?",
          answer: "Ja, Sie können jederzeit zurück navigieren und Ihre Angaben korrigieren. Der Funnel speichert Ihre Eingaben automatisch zwischen."
        },
        {
          question: "Kann ich meine Anfrage auch direkt per E-Mail senden?",
          answer: "Nein. Aufgrund der Individualisierung und der teilweise nicht mitgelieferten Informationen haben wir unser System bewusst so gewählt, dass wir Ihnen eine strukturierte, modulare Lösung bieten, mit der wir Ihre Anfrage bestmöglich und schnell bearbeiten können. Daher bitten wir Sie, individuelle Anfragen per E-Mail nicht zu stellen, sondern unsere vorbereiteten Tools zu nutzen."
        },
        {
          question: "Was passiert wenn der Funnel nicht funktioniert?",
          answer: "Bei technischen Problemen senden Sie uns gerne eine E-Mail an post@balkonfuchs.de oder nutzen Sie unseren Chat. Wir erstellen Ihre Anfrage auch manuell und vermitteln Sie an passende Partner."
        },
        {
          question: "Ich brauche persönliche Beratung vor der Angebotserstellung - ist das möglich?",
          answer: "Selbstverständlich! Schreiben Sie uns per E-Mail (post@balkonfuchs.de) oder nutzen Sie unseren Chat. Unsere Experten beantworten gerne alle Fragen zu Ihrem Balkonprojekt und den beteiligten Gewerken."
        }
      ]
    }
  ];

  // Aktualisiere Fragen wenn sich reviewType ändert
  useEffect(() => {
    const filteredQuestions = getFilteredQuestions();
    // Wenn wir weniger Fragen haben als der aktuelle Schritt, gehe zurück
    if (currentStep >= filteredQuestions.length) {
      setCurrentStep(filteredQuestions.length - 1);
    }
  }, [formData.reviewType]);

  const handleAnswerSelect = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance for certain fields
    if (['feedbackType', 'reviewType', 'projectType', 'projectLocation', 'publishPermission'].includes(questionId)) {
      setTimeout(() => nextStep(), 500);
    }
  };

  const handleStarRating = (rating: number) => {
    setFormData(prev => ({ ...prev, overallRating: rating }));
  };

  const handleProjectDetailChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceRating = (serviceKey: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      serviceRatings: {
        ...prev.serviceRatings,
        [serviceKey]: rating
      }
    }));
  };

  const handleContactChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const validateStep = () => {
    const currentQuestion = questions[currentStep];
    
    switch (currentQuestion?.type) {
      case 'selection':
        return formData[currentQuestion.id] !== '';
      case 'star_rating':
        return formData.overallRating > 0;
      case 'service_review':
        // Mindestens ein Service muss bewertet werden (Rating > 0)
        return Object.values(formData.serviceRatings).some(rating => rating > 0);
      case 'project_details':
        return formData.projectType && formData.projectLocation;
      case 'text_input':
        return formData.experienceText?.length >= 20;
      case 'faq':
        return true; // FAQ ist immer gültig, da nur informativ
      case 'contact':
        return formData.contact.firstName && formData.contact.lastName && formData.contact.email && formData.contact.zipCode && formData.contact.privacy;
      default:
        return true;
    }
  };

  const validateContact = () => {
    const { salutation, firstName, lastName, email, privacy } = formData.contact;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return salutation && firstName && lastName && emailRegex.test(email) && privacy;
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1 && validateStep()) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === questions.length - 1 && validateStep()) {
      submitForm();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate Lead Score
      const leadScore = LEAD_SCORING_FUNCTIONS.calculateScore('erfahrungen', {
        feedbackType: formData.feedbackType,
        overallRating: formData.overallRating,
        projectType: formData.projectType,
        publishPermission: formData.publishPermission,
        experienceLength: formData.experienceText?.length || 0
      });

      // Prepare data for Zoho export
      const exportData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'BALKONFUCHS Erfahrungen',
        funnelType: 'Erfahrungen',
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
      setCurrentStep(totalSteps);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (currentRating: number, onRate: (rating: number) => void, onHover?: (rating: number) => void) => (
    <div className="flex justify-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover && onHover(star)}
          onMouseLeave={() => onHover && onHover(0)}
          className="transition-all duration-200 hover:scale-110"
        >
          <Star 
            className={`w-12 h-12 ${
              star <= (onHover && hoverRating > 0 ? hoverRating : currentRating)
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  const getRatingText = (rating: number) => {
    const texts: { [key: number]: string } = {
      1: 'Sehr unzufrieden',
      2: 'Unzufrieden', 
      3: 'Neutral',
      4: 'Zufrieden',
      5: 'Sehr zufrieden'
    };
    return texts[rating] || '';
  };

  // Header Component
  const Header = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <img 
                    src="/images/Balkonfuchs-Logo_white.png"
                alt="BALKONFUCHS Logo" 
                className="h-10 w-auto"
              />
            </a>
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
            <a href="/partner-werden/" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
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
            <a href="/balkon-baugenehmigung-check/" className="block text-gray-300 font-medium">Genehmigung</a>
            <a href="/angebot/" className="block text-gray-300 font-medium">Express-Angebot</a>
            <a href="/balkon-baustart-rechner/" className="block text-gray-300 font-medium">Bauzeit-Planung</a>

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
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswerSelect(question.id, option.value)}
                className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-lg group ${
                  formData[question.id] === option.value
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
                  {formData[question.id] === option.value && (
                    <CheckCircle className="w-6 h-6 text-orange-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === 'star_rating' && (
          <div className="space-y-6">
            {renderStarRating(formData.overallRating, handleStarRating, setHoverRating)}
            <p className="text-center text-xl font-semibold text-white">
              {getRatingText(hoverRating || formData.overallRating)}
            </p>
            {formData.overallRating > 0 && (
              <div className="text-center p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <p className="text-orange-400 font-semibold">
                  Vielen Dank für Ihre {formData.overallRating >= 4 ? 'positive' : 'ehrliche'} Bewertung!
                </p>
              </div>
            )}
          </div>
        )}

        {question.type === 'project_details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Projekttyp *</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleProjectDetailChange('projectType', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Balkontyp wählen</option>
                  <option value="hanging">Hängebalkon</option>
                  <option value="standing">Vorstellbalkon</option>
                  <option value="leaning">Anlehnbalkon</option>
                  <option value="terrace">Hochterrasse</option>
                  <option value="renovation">Balkonsanierung</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Standort *</label>
                <input
                  type="text"
                  placeholder="z.B. Berlin, München..."
                  value={formData.projectLocation}
                  onChange={(e) => handleProjectDetailChange('projectLocation', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ungefähre Kosten (optional)</label>
                <select
                  value={formData.projectCost}
                  onChange={(e) => handleProjectDetailChange('projectCost', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Kostenrahmen wählen</option>
                  <option value="5k">Bis 5.000 €</option>
                  <option value="10k">5.000 - 10.000 €</option>
                  <option value="15k">10.000 - 15.000 €</option>
                  <option value="20k">15.000 - 20.000 €</option>
                  <option value="25k">20.000 - 25.000 €</option>
                  <option value="30k+">Über 25.000 €</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name der ausführenden Firma (optional)</label>
                <input
                  type="text"
                  placeholder="Firmenname für andere Kunden..."
                  value={formData.companyName}
                  onChange={(e) => handleProjectDetailChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {question.type === 'service_review' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-gray-300 text-lg">
                Bewerten Sie die Services, die Sie genutzt haben (0 = nicht genutzt, 5 = sehr hilfreich)
              </p>
            </div>
            
            <div className="grid gap-4">
              {Object.entries({
                kalkulator: { name: 'Balkon-Kalkulator', icon: '💰', description: 'Kostenberechnung für Ihr Projekt' },
                planer: { name: 'Balkon-Planer', icon: '🔍', description: 'Detaillierte Projektplanung' },
                genehmigung: { name: 'Genehmigungscheck', icon: '📋', description: 'Rechtliche Prüfung' },
                expressAngebot: { name: 'Express-Angebot', icon: '⚡', description: 'Schnelle Angebote' },
                bauzeitPlanung: { name: 'Bauzeit-Planung', icon: '📅', description: 'Terminplanung' },

              }).map(([key, service]) => (
                <div key={key} className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{service.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{service.name}</h4>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleServiceRating(key, rating)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all ${
                            rating === 0 
                              ? 'bg-gray-600 border-gray-500 text-gray-400 hover:bg-gray-500'
                              : rating <= formData.serviceRatings[key]
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-gray-700 border-gray-600 text-gray-400 hover:border-orange-500'
                          }`}
                        >
                          {rating === 0 ? '0' : rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  {formData.serviceRatings[key] > 0 && (
                    <p className="text-orange-400 text-sm text-center">
                      Bewertung: {formData.serviceRatings[key]}/5 {formData.serviceRatings[key] === 5 ? '⭐' : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {question.type === 'text_input' && (
          <div className="max-w-2xl mx-auto">
            <textarea
              value={formData.experienceText || ''}
              onChange={(e) => handleAnswerSelect('experienceText', e.target.value)}
              placeholder={question.placeholder}
              rows={8}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
            />
            <p className="text-sm text-gray-400 mt-2">
              Mindestens 20 Zeichen erforderlich ({formData.experienceText?.length || 0}/20)
            </p>
          </div>
        )}

        {question.type === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {faqData.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedCategory(selectedCategory === category.category ? '' : category.category)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      selectedCategory === category.category
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </div>

            {selectedCategory && (
              <div className="space-y-4">
                {faqData
                  .find(cat => cat.category === selectedCategory)
                  ?.questions.map((faq, index) => {
                    const questionId = `${selectedCategory}-${index}`;
                    const isOpen = openQuestions.has(questionId);
                    
                    return (
                      <div key={questionId} className="bg-gray-700/50 border border-gray-600 rounded-xl">
                        <button
                          onClick={() => {
                            const newOpenQuestions = new Set(openQuestions);
                            if (isOpen) {
                              newOpenQuestions.delete(questionId);
                            } else {
                              newOpenQuestions.add(questionId);
                            }
                            setOpenQuestions(newOpenQuestions);
                          }}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/70 transition-all"
                        >
                          <h4 className="text-lg font-semibold text-white pr-4">{faq.question}</h4>
                          <div className={`text-orange-500 text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            ▼
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-600 pt-4">
                              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {!selectedCategory && (
              <div className="text-center py-8">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-8 rounded-2xl border border-orange-500/20 mb-8">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">
                      🎯 Häufige Fragen zu BALKONFUCHS
                    </h3>
                    <p className="text-gray-300 text-lg mb-6">
                      Wählen Sie eine Kategorie aus, um detaillierte Antworten zu erhalten.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                      <div>✅ Über 850 zufriedene Kunden</div>
                      <div>✅ Durchschnittlich 3.200€ Ersparnis</div>
                      <div>✅ 98% Kundenzufriedenheit</div>
                      <div>✅ Kostenlose Vor-Ort-Besichtigung</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h4 className="font-semibold text-orange-400 mb-3">📞 Persönliche Beratung gewünscht?</h4>
                    <p className="text-gray-300 mb-4">
                      Falls Sie weitere Fragen haben oder persönliche Beratung benötigen, stehen wir Ihnen gerne zur Verfügung:
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div><strong>E-Mail:</strong> post@balkonfuchs.de</div>
                      <div><strong>Chat:</strong> Direkt auf der Website verfügbar (Mo-Fr 9-17 Uhr)</div>
                      <div><strong>Antwortzeit:</strong> Individuelle Beantwortung erfolgt in der Regel innerhalb von 1-2 Werktagen</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {question.type === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Vorname *</label>
                <input
                  type="text"
                  value={formData.contact.firstName || ''}
                  onChange={(e) => handleContactChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ihr Vorname"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nachname *</label>
                <input
                  type="text"
                  value={formData.contact.lastName || ''}
                  onChange={(e) => handleContactChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ihr Nachname"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail *</label>
              <input
                type="email"
                value={formData.contact.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="ihre.email@beispiel.de"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">PLZ *</label>
                <input
                  type="text"
                  value={formData.contact.zipCode || ''}
                  onChange={(e) => handleContactChange('zipCode', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="12345"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefonnummer (optional)</label>
                <input
                  type="tel"
                  value={formData.contact.phone || ''}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.contact.newsletter || false}
                onChange={(e) => handleContactChange('newsletter', e.target.checked)}
                className="w-6 h-6 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-300">
                Ich möchte den Balkonbrief erhalten (kostenlos, jederzeit kündbar)
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.contact.privacy || false}
                onChange={(e) => handleContactChange('privacy', e.target.checked)}
                className="w-6 h-6 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
              />
              <label htmlFor="privacy" className="text-sm text-gray-300">
                Ich stimme der <a href="https://www.balkonfuchs.de/Fuchsbau/Impressum/datenschutz" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> zu *
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContactForm = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Ihre Kontaktdaten</h2>
        <p className="text-lg text-orange-400 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
          💬 Fast geschafft! Ihre Bewertung hilft anderen Kunden sehr.
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
          placeholder="PLZ (optional)"
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

        <div className="bg-orange-500/10 p-6 rounded-xl border border-orange-500/20">
          <h3 className="font-semibold text-orange-400 mb-4">📋 Ihre Bewertung im Überblick:</h3>
          <div className="space-y-2 text-sm text-orange-300">
            <div><strong>Gesamtbewertung:</strong> {formData.overallRating}/5 Sterne</div>
            <div><strong>Feedback-Typ:</strong> {formData.feedbackType === 'positive' ? 'Positive Erfahrung' : formData.feedbackType === 'detailed' ? 'Detaillierte Bewertung' : 'Sonstiges'}</div>
            <div><strong>Bewertung für:</strong> {formData.reviewType === 'service' ? 'Service & Website' : formData.reviewType === 'project' ? 'Abgeschlossenes Projekt' : 'Service + Projekt'}</div>
            {formData.reviewType !== 'project' && (
              <div><strong>Service-Bewertungen:</strong> {Object.entries(formData.serviceRatings).filter(([_, rating]) => rating > 0).map(([key, rating]) => `${key} (${rating}/5)`).join(', ') || 'Keine'}</div>
            )}
            {formData.projectType && <div><strong>Projekt:</strong> {formData.projectType === 'hanging' ? 'Hängebalkon' : formData.projectType === 'standing' ? 'Vorstellbalkon' : 'Sonstiger Balkontyp'}</div>}
            <div><strong>Veröffentlichung:</strong> {formData.publishPermission === 'full_name' ? 'Mit Vor- und Nachname' : formData.publishPermission === 'named' ? 'Mit Nachname' : formData.publishPermission === 'firstname' ? 'Nur Vorname' : formData.publishPermission === 'anonymous' ? 'Anonym' : 'Nicht veröffentlichen'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessPage = () => (
    <div className="text-center space-y-8">
      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
        <ThumbsUp className="w-12 h-12 text-white" />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">
          💬 Herzlichen Dank{formData.contact.firstName ? `, ${formData.contact.firstName}` : ''}!
        </h2>
        <p className="text-xl text-gray-300">
          Ihr wertvolles Feedback hilft uns dabei, unseren Service kontinuierlich zu verbessern.
        </p>
      </div>

      <div className="bg-orange-500/10 p-6 rounded-2xl border border-orange-500/20">
        <h3 className="text-xl font-bold text-orange-400 mb-4">⭐ Ihre Bewertung:</h3>
        <div className="flex justify-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              className={`w-8 h-8 ${
                star <= formData.overallRating
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-orange-300 font-semibold">
          {formData.overallRating}/5 Sterne • {getRatingText(formData.overallRating)}
        </p>
      </div>

      {/* Detaillierte Bewertungsübersicht */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">📋 Ihre Bewertung im Detail:</h3>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="space-y-3">
            <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold text-orange-400 mb-2">Bewertung</h4>
              <div className="text-sm text-orange-300 space-y-1">
                <div><strong>Feedback-Typ:</strong> {formData.feedbackType === 'positive' ? 'Positive Erfahrung' : formData.feedbackType === 'question' ? 'Frage oder Anregung' : 'Sonstiges'}</div>
                <div><strong>Bewertung für:</strong> {formData.reviewType === 'service' ? 'Service & Website' : formData.reviewType === 'project' ? 'Abgeschlossenes Projekt' : 'Service + Projekt'}</div>
                {formData.projectType && <div><strong>Projekt:</strong> {formData.projectType === 'hanging' ? 'Hängebalkon' : formData.projectType === 'standing' ? 'Vorstellbalkon' : 'Sonstiger Balkontyp'}</div>}
                <div><strong>Veröffentlichung:</strong> {formData.publishPermission === 'full_name' ? 'Mit Vor- und Nachname' : formData.publishPermission === 'named' ? 'Mit Nachname' : formData.publishPermission === 'firstname' ? 'Nur Vorname' : formData.publishPermission === 'anonymous' ? 'Anonym' : 'Nicht veröffentlichen'}</div>
              </div>
            </div>
            
            {/* Service-Bewertungen */}
            {formData.reviewType !== 'project' && (
              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-400 mb-2">Service-Bewertungen</h4>
                <div className="text-sm text-purple-300 space-y-2">
                  {Object.entries({
                    kalkulator: 'Balkon-Kalkulator',
                    planer: 'Balkon-Planer', 
                    genehmigung: 'Genehmigungscheck',
                    expressAngebot: 'Express-Angebot',
                    bauzeitPlanung: 'Bauzeit-Planung',

                  }).map(([key, name]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span>{name}:</span>
                      <span className={`font-semibold ${formData.serviceRatings[key] > 0 ? 'text-orange-400' : 'text-gray-500'}`}>
                        {formData.serviceRatings[key] > 0 ? `${formData.serviceRatings[key]}/5 ⭐` : 'Nicht genutzt'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Kontaktdaten</h4>
              <div className="text-sm text-blue-300 space-y-1">
                <div><strong>Name:</strong> {formData.contact.firstName} {formData.contact.lastName}</div>
                <div><strong>E-Mail:</strong> {formData.contact.email}</div>
                <div><strong>PLZ:</strong> {formData.contact.zipCode}</div>
                {formData.contact.phone && <div><strong>Telefon:</strong> {formData.contact.phone}</div>}
                <div><strong>Balkonbrief:</strong> {formData.contact.newsletter ? 'Ja' : 'Nein'}</div>
              </div>
            </div>
            
            {/* Erfahrungstext */}
            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Ihre Erfahrung</h4>
              <div className="text-sm text-green-300">
                <div className="italic bg-gray-700/50 p-3 rounded-lg">
                  "{formData.experienceText}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/20">
        <h3 className="font-semibold text-green-400 mb-4">📝 So geht es weiter:</h3>
        <div className="space-y-3 text-green-300 text-left">
          <div className="flex items-start space-x-3">
            <span className="font-semibold">1.</span>
            <span>Sie erhalten eine Bestätigung per E-Mail</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="font-semibold">2.</span>
            <span>Ihre Bewertung wird nach Prüfung veröffentlicht</span>
          </div>
          <div className="flex items-start space-x-3">
            <span className="font-semibold">3.</span>
            <span>Bei Rückfragen melden wir uns bei Ihnen</span>
          </div>
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

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Weitere hilfreiche Tools für Ihr Balkonprojekt:</h3>
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

  if (currentStep === totalSteps) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <Header />
        <div className="max-w-4xl mx-auto px-4">
          {renderSuccessPage()}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Balkonbau Erfahrungen & Kundenbewertungen 2025 | Echte Referenzen | BALKONFUCHS</title>
        <meta name="description" content="✅ Über 850 echte Balkonbau-Erfahrungen ✅ Verifizierte Kundenbewertungen ✅ Regionale Referenzen ✅ Kosten & Zeitpläne → Jetzt Feedback geben & Erfahrungen teilen!" />
        <meta name="keywords" content="balkonbau erfahrungen, balkon anbauen bewertungen, balkonanbau referenzen, kundenmeinungen balkon, balkonprojekte deutschland, balkonbau referenzen 2025" />
        <meta name="author" content="BALKONFUCHS" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="de" />
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Deutschland" />
        <meta name="geo.position" content="51.1657;10.4515" />
        <meta name="ICBM" content="51.1657, 10.4515" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Balkonbau Erfahrungen - Echte Kundenbewertungen 2025" />
        <meta property="og:description" content="Über 850 zufriedene Kunden teilen ihre Balkonbau-Erfahrungen. Jetzt Feedback geben!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balkonfuchs.de/erfahrungen" />
        <meta property="og:image" content="https://balkonfuchs.de/images/og-balkon-erfahrungen.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="BALKONFUCHS" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://balkonfuchs.de/erfahrungen" />
        <meta property="twitter:title" content="Balkonbau Erfahrungen - Echte Kundenbewertungen" />
        <meta property="twitter:description" content="Über 850 zufriedene Kunden teilen ihre Balkonbau-Erfahrungen. Jetzt Feedback geben!" />
        <meta property="twitter:image" content="https://balkonfuchs.de/images/twitter-balkon-erfahrungen.jpg" />
        
        {/* Extended SEO Meta Tags */}
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BALKONFUCHS Erfahrungen" />
        <meta name="application-name" content="BALKONFUCHS" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="de" href="https://balkonfuchs.de/erfahrungen" />
        <link rel="alternate" hrefLang="de-DE" href="https://balkonfuchs.de/erfahrungen" />
        <link rel="alternate" hrefLang="x-default" href="https://balkonfuchs.de/erfahrungen" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="https://balkonfuchs.de/sitemap.xml" />
        
        <link rel="canonical" href="https://balkonfuchs.de/erfahrungen" />
        
        {/* Structured Data JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Balkonbau Erfahrungen und Kundenbewertungen",
            "description": "Echte, verifizierte Erfahrungsberichte von Balkonbau-Projekten in ganz Deutschland",
            "url": "https://balkonfuchs.de/erfahrungen",
            "mainEntity": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "BALKONFUCHS Kunden"
              },
              "reviewBody": "Über 850 zufriedene Kunden haben ihre Balkonbau-Erfahrungen geteilt"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": "https://balkonfuchs.de"
              }, {
                "@type": "ListItem", 
                "position": 2,
                "name": "Erfahrungen",
                "item": "https://balkonfuchs.de/erfahrungen"
              }]
            }
          })
        }} />
        
        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Wie funktioniert der BALKONFUCHS-Service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Wir vermitteln Sie an spezialisierte Fachbetriebe, die alle Aspekte Ihres Balkonprojekts abdecken können."
                }
              },
              {
                "@type": "Question", 
                "name": "Wie viele Angebote erhalte ich?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sie erhalten in der Regel 2-3 konkrete Angebote von geprüften Fachbetrieben aus Ihrer Region."
                }
              },
              {
                "@type": "Question",
                "name": "Was kostet eine Vor-Ort-Besichtigung?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Alle unsere Partner bieten kostenlose Vor-Ort-Termine an, um Ihr Projekt zu besichtigen und ein detailliertes Angebot zu erstellen."
                }
              }
            ]
          })
        }} />
      </Head>
      
      <Header />
      
      {/* Breadcrumb Navigation */}
      <section className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <a href="/" className="hover:text-orange-400 transition-colors">Startseite</a>
            <span>→</span>
            <span className="text-orange-400">Erfahrungen</span>
          </nav>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gray-800 border-b border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-yellow-400">Balkonbau Erfahrungen</span>
            <span className="text-white"> - Echte Kundenbewertungen und Projekterfahrungen</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Authentische Erfahrungsberichte von Balkonbau-Projekten in ganz Deutschland
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            <span className="text-yellow-400 font-semibold">Vertrauen durch Transparenz</span>: Lesen Sie <span className="text-yellow-400 font-semibold">echte, verifizierte Erfahrungsberichte</span> von Kunden, die über unser <span className="text-yellow-400 font-semibold">Vermittlungsportal</span> ihren <span className="text-yellow-400 font-semibold">Traum-Balkon</span> realisiert haben. Alle <span className="text-yellow-400 font-semibold">Bewertungen</span> enthalten Details zu <span className="text-yellow-400 font-semibold">Projektablauf</span>, <span className="text-yellow-400 font-semibold">Kommunikation</span>, <span className="text-yellow-400 font-semibold">Bauzeit</span>, <span className="text-yellow-400 font-semibold">Kostenentwicklung</span> und <span className="text-yellow-400 font-semibold">Gesamtzufriedenheit</span>. Mit <span className="text-yellow-400 font-semibold">regionalen Referenzen</span> und direkten <span className="text-yellow-400 font-semibold">Bewertungen der vermittelten Partner-Unternehmen</span>. <span className="text-yellow-400 font-semibold">Authentische Einblicke</span> für Ihre Entscheidung! Geben Sie auch selber Ihr <span className="text-yellow-400 font-semibold">Feedback</span> über Ihre Erfahrungen mit unseren Services hier ab! Es ist uns wichtig, möglichst vielen Kunden dabei zu helfen, sich ein Bild über <span className="text-yellow-400 font-semibold">Möglichkeiten und Balkonprojekte</span> zu machen! <a href="/" className="text-yellow-400 hover:text-yellow-300 underline">← Zurück zur Startseite</a>
          </p>
        </div>
      </section>
      
      {/* Progress Bar */}
      <section className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-sm font-medium text-gray-300">
              Schritt {currentStep + 1} von {totalSteps}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              {renderQuestion()}
            </div>

            {/* Navigation */}
            <div className="bg-gray-700/50 px-8 py-6 border-t border-gray-600">
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentStep === 0
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Zurück</span>
                </button>

                <button
                  onClick={nextStep}
                  disabled={!validateStep()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold ${
                    validateStep()
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Wird gesendet...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {currentStep === questions.length - 1 ? '💬 Feedback absenden' : 'Weiter'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Sichere Datenübertragung</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>850+ Kundenbewertungen</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>100% kostenfrei</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      
      <Footer />
    </div>
  );
};

export default BALKONFUCHSErfahrungenFunnel;
