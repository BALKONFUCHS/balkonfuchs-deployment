export interface PartnerCityConfig {
  cityName: string;
  citySlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  regionText: string;
  nutzenItems: string[];
  betriebeItems: string[];
  ablaufSteps: Array<{ title: string; description: string }>;
  faqItems: Array<{ question: string; answer: string }>;
}

export const partnerCities: PartnerCityConfig[] = [
  {
    cityName: 'Berlin',
    citySlug: 'berlin',
    title: 'Partner werden in Berlin: BalkonFuchs – als Balkonbau-Partner zusammenarbeiten',
    metaDescription: 'Werden Sie Partner von BalkonFuchs in Berlin: qualifizierte Projektanfragen, klare Abläufe und eine strukturierte Zusammenarbeit. Jetzt unverbindlich informieren und als Partner starten.',
    h1: 'Partner werden in Berlin: Als Balkonbau-Partner mit BalkonFuchs zusammenarbeiten',
    lead: 'Als Partner erhalten Sie strukturierte Projektanfragen und einen klaren Prozess – von der ersten Bedarfsklärung bis zur Übergabe in die Umsetzung. Sie entscheiden, welche Projekte zu Ihnen passen. Starten Sie unverbindlich und lernen Sie den Ablauf kennen.',
    regionText: 'Wir suchen Partner in Berlin und dem Umland. Die Region Berlin bietet großes Potenzial für Balkonbau-Projekte, sowohl im Bestand als auch im Neubau.',
    nutzenItems: [
      'Strukturierte Anfragen mit Eckdaten: Projektanfragen mit den wichtigsten Informationen',
      'Weniger Vorqualifizierungsaufwand: Vorgefilterte Anfragen reduzieren Ihren Aufwand',
      'Klare Übergabe / Dokumentation: Strukturierte Projektübergabe mit allen relevanten Daten',
      'Tools für Kosten/Planung/3D: Optional als Gesprächsgrundlage nutzbar',
      'Transparente Kommunikation: Klare nächste Schritte und Abläufe'
    ],
    betriebeItems: [
      'Metallbau / Balkonbau: Betriebe mit Erfahrung im Balkonbau',
      'Montagebetriebe: Betriebe, die Montage und Installation durchführen',
      'Schlosser / Handwerksbetriebe: Betriebe mit Kapazitäten für Balkonprojekte',
      'Betriebe mit Erfahrung in Bestand/WEG: Falls zutreffend für Ihre Projekte'
    ],
    ablaufSteps: [
      {
        title: 'Partnerprofil & Qualifikation',
        description: 'Sie erstellen Ihr Partnerprofil und geben Ihre Qualifikationen an. Wir prüfen Ihre Angaben und aktivieren Ihr Profil.'
      },
      {
        title: 'Projektanfrage & Vorprüfung',
        description: 'Sie erhalten strukturierte Projektanfragen mit den wichtigsten Eckdaten. Sie entscheiden, welche Projekte zu Ihnen passen.'
      },
      {
        title: 'Abstimmung / Angebot / Planung',
        description: 'Sie stimmen sich mit dem Kunden ab, erstellen ein Angebot und planen die Umsetzung.'
      },
      {
        title: 'Umsetzung & Feedback',
        description: 'Sie setzen das Projekt um und geben Feedback zum Ablauf. Dies hilft uns, den Prozess kontinuierlich zu verbessern.'
      }
    ],
    faqItems: [
      {
        question: 'Wie läuft die Partneranfrage ab?',
        answer: 'Sie füllen das Partnerformular aus und geben Ihre wichtigsten Informationen an. Wir prüfen Ihre Angaben und melden uns bei Ihnen zurück, um die nächsten Schritte zu besprechen.'
      },
      {
        question: 'Welche Regionen werden abgedeckt?',
        answer: 'Wir suchen Partner in Berlin und dem Umland. Die genaue Abdeckung hängt von der Nachfrage und den Partnerkapazitäten ab.'
      },
      {
        question: 'Wie werden Anfragen qualifiziert?',
        answer: 'Projektanfragen werden vorab geprüft und mit den wichtigsten Eckdaten versehen. Sie erhalten strukturierte Informationen, die Ihnen die Entscheidung erleichtern.'
      },
      {
        question: 'Bin ich exklusiv gebunden?',
        answer: 'Nein. Die Partnerschaft ist nicht exklusiv. Sie können weiterhin andere Wege zur Akquise nutzen.'
      },
      {
        question: 'Wie schnell erhalte ich Anfragen?',
        answer: 'Die Anzahl der Anfragen hängt von Ihrer Region, Ihren Kapazitäten und der Nachfrage ab. Nach der Aktivierung Ihres Profils erhalten Sie passende Projektanfragen.'
      }
    ]
  },
  {
    cityName: 'München',
    citySlug: 'muenchen',
    title: 'Partner werden in München: BalkonFuchs – als Balkonbau-Partner zusammenarbeiten',
    metaDescription: 'Werden Sie Partner von BalkonFuchs in München: qualifizierte Projektanfragen, klare Abläufe und eine strukturierte Zusammenarbeit. Jetzt unverbindlich informieren und als Partner starten.',
    h1: 'Partner werden in München: Als Balkonbau-Partner mit BalkonFuchs zusammenarbeiten',
    lead: 'Als Partner erhalten Sie strukturierte Projektanfragen und einen klaren Prozess – von der ersten Bedarfsklärung bis zur Übergabe in die Umsetzung. Sie entscheiden, welche Projekte zu Ihnen passen. Starten Sie unverbindlich und lernen Sie den Ablauf kennen.',
    regionText: 'Wir suchen Partner in München und dem Umland. Die Region München bietet großes Potenzial für Balkonbau-Projekte, sowohl im Bestand als auch im Neubau.',
    nutzenItems: [
      'Strukturierte Anfragen mit Eckdaten: Projektanfragen mit den wichtigsten Informationen',
      'Weniger Vorqualifizierungsaufwand: Vorgefilterte Anfragen reduzieren Ihren Aufwand',
      'Klare Übergabe / Dokumentation: Strukturierte Projektübergabe mit allen relevanten Daten',
      'Tools für Kosten/Planung/3D: Optional als Gesprächsgrundlage nutzbar',
      'Transparente Kommunikation: Klare nächste Schritte und Abläufe'
    ],
    betriebeItems: [
      'Metallbau / Balkonbau: Betriebe mit Erfahrung im Balkonbau',
      'Montagebetriebe: Betriebe, die Montage und Installation durchführen',
      'Schlosser / Handwerksbetriebe: Betriebe mit Kapazitäten für Balkonprojekte',
      'Betriebe mit Erfahrung in Bestand/WEG: Falls zutreffend für Ihre Projekte'
    ],
    ablaufSteps: [
      {
        title: 'Partnerprofil & Qualifikation',
        description: 'Sie erstellen Ihr Partnerprofil und geben Ihre Qualifikationen an. Wir prüfen Ihre Angaben und aktivieren Ihr Profil.'
      },
      {
        title: 'Projektanfrage & Vorprüfung',
        description: 'Sie erhalten strukturierte Projektanfragen mit den wichtigsten Eckdaten. Sie entscheiden, welche Projekte zu Ihnen passen.'
      },
      {
        title: 'Abstimmung / Angebot / Planung',
        description: 'Sie stimmen sich mit dem Kunden ab, erstellen ein Angebot und planen die Umsetzung.'
      },
      {
        title: 'Umsetzung & Feedback',
        description: 'Sie setzen das Projekt um und geben Feedback zum Ablauf. Dies hilft uns, den Prozess kontinuierlich zu verbessern.'
      }
    ],
    faqItems: [
      {
        question: 'Wie läuft die Partneranfrage ab?',
        answer: 'Sie füllen das Partnerformular aus und geben Ihre wichtigsten Informationen an. Wir prüfen Ihre Angaben und melden uns bei Ihnen zurück, um die nächsten Schritte zu besprechen.'
      },
      {
        question: 'Welche Regionen werden abgedeckt?',
        answer: 'Wir suchen Partner in München und dem Umland. Die genaue Abdeckung hängt von der Nachfrage und den Partnerkapazitäten ab.'
      },
      {
        question: 'Wie werden Anfragen qualifiziert?',
        answer: 'Projektanfragen werden vorab geprüft und mit den wichtigsten Eckdaten versehen. Sie erhalten strukturierte Informationen, die Ihnen die Entscheidung erleichtern.'
      },
      {
        question: 'Bin ich exklusiv gebunden?',
        answer: 'Nein. Die Partnerschaft ist nicht exklusiv. Sie können weiterhin andere Wege zur Akquise nutzen.'
      },
      {
        question: 'Wie schnell erhalte ich Anfragen?',
        answer: 'Die Anzahl der Anfragen hängt von Ihrer Region, Ihren Kapazitäten und der Nachfrage ab. Nach der Aktivierung Ihres Profils erhalten Sie passende Projektanfragen.'
      }
    ]
  },
  {
    cityName: 'Frankfurt',
    citySlug: 'frankfurt',
    title: 'Partner werden in Frankfurt: BalkonFuchs – als Balkonbau-Partner zusammenarbeiten',
    metaDescription: 'Werden Sie Partner von BalkonFuchs in Frankfurt: qualifizierte Projektanfragen, klare Abläufe und eine strukturierte Zusammenarbeit. Jetzt unverbindlich informieren und als Partner starten.',
    h1: 'Partner werden in Frankfurt: Als Balkonbau-Partner mit BalkonFuchs zusammenarbeiten',
    lead: 'Als Partner erhalten Sie strukturierte Projektanfragen und einen klaren Prozess – von der ersten Bedarfsklärung bis zur Übergabe in die Umsetzung. Sie entscheiden, welche Projekte zu Ihnen passen. Starten Sie unverbindlich und lernen Sie den Ablauf kennen.',
    regionText: 'Wir suchen Partner in Frankfurt am Main und dem Umland. Die Region Frankfurt bietet großes Potenzial für Balkonbau-Projekte, sowohl im Bestand als auch im Neubau.',
    nutzenItems: [
      'Strukturierte Anfragen mit Eckdaten: Projektanfragen mit den wichtigsten Informationen',
      'Weniger Vorqualifizierungsaufwand: Vorgefilterte Anfragen reduzieren Ihren Aufwand',
      'Klare Übergabe / Dokumentation: Strukturierte Projektübergabe mit allen relevanten Daten',
      'Tools für Kosten/Planung/3D: Optional als Gesprächsgrundlage nutzbar',
      'Transparente Kommunikation: Klare nächste Schritte und Abläufe'
    ],
    betriebeItems: [
      'Metallbau / Balkonbau: Betriebe mit Erfahrung im Balkonbau',
      'Montagebetriebe: Betriebe, die Montage und Installation durchführen',
      'Schlosser / Handwerksbetriebe: Betriebe mit Kapazitäten für Balkonprojekte',
      'Betriebe mit Erfahrung in Bestand/WEG: Falls zutreffend für Ihre Projekte'
    ],
    ablaufSteps: [
      {
        title: 'Partnerprofil & Qualifikation',
        description: 'Sie erstellen Ihr Partnerprofil und geben Ihre Qualifikationen an. Wir prüfen Ihre Angaben und aktivieren Ihr Profil.'
      },
      {
        title: 'Projektanfrage & Vorprüfung',
        description: 'Sie erhalten strukturierte Projektanfragen mit den wichtigsten Eckdaten. Sie entscheiden, welche Projekte zu Ihnen passen.'
      },
      {
        title: 'Abstimmung / Angebot / Planung',
        description: 'Sie stimmen sich mit dem Kunden ab, erstellen ein Angebot und planen die Umsetzung.'
      },
      {
        title: 'Umsetzung & Feedback',
        description: 'Sie setzen das Projekt um und geben Feedback zum Ablauf. Dies hilft uns, den Prozess kontinuierlich zu verbessern.'
      }
    ],
    faqItems: [
      {
        question: 'Wie läuft die Partneranfrage ab?',
        answer: 'Sie füllen das Partnerformular aus und geben Ihre wichtigsten Informationen an. Wir prüfen Ihre Angaben und melden uns bei Ihnen zurück, um die nächsten Schritte zu besprechen.'
      },
      {
        question: 'Welche Regionen werden abgedeckt?',
        answer: 'Wir suchen Partner in Frankfurt am Main und dem Umland. Die genaue Abdeckung hängt von der Nachfrage und den Partnerkapazitäten ab.'
      },
      {
        question: 'Wie werden Anfragen qualifiziert?',
        answer: 'Projektanfragen werden vorab geprüft und mit den wichtigsten Eckdaten versehen. Sie erhalten strukturierte Informationen, die Ihnen die Entscheidung erleichtern.'
      },
      {
        question: 'Bin ich exklusiv gebunden?',
        answer: 'Nein. Die Partnerschaft ist nicht exklusiv. Sie können weiterhin andere Wege zur Akquise nutzen.'
      },
      {
        question: 'Wie schnell erhalte ich Anfragen?',
        answer: 'Die Anzahl der Anfragen hängt von Ihrer Region, Ihren Kapazitäten und der Nachfrage ab. Nach der Aktivierung Ihres Profils erhalten Sie passende Projektanfragen.'
      }
    ]
  },
  {
    cityName: 'Köln',
    citySlug: 'koeln',
    title: 'Partner werden in Köln: BalkonFuchs – als Balkonbau-Partner zusammenarbeiten',
    metaDescription: 'Werden Sie Partner von BalkonFuchs in Köln: qualifizierte Projektanfragen, klare Abläufe und eine strukturierte Zusammenarbeit. Jetzt unverbindlich informieren und als Partner starten.',
    h1: 'Partner werden in Köln: Als Balkonbau-Partner mit BalkonFuchs zusammenarbeiten',
    lead: 'Als Partner erhalten Sie strukturierte Projektanfragen und einen klaren Prozess – von der ersten Bedarfsklärung bis zur Übergabe in die Umsetzung. Sie entscheiden, welche Projekte zu Ihnen passen. Starten Sie unverbindlich und lernen Sie den Ablauf kennen.',
    regionText: 'Wir suchen Partner in Köln und dem Umland. Die Region Köln bietet großes Potenzial für Balkonbau-Projekte, sowohl im Bestand als auch im Neubau.',
    nutzenItems: [
      'Strukturierte Anfragen mit Eckdaten: Projektanfragen mit den wichtigsten Informationen',
      'Weniger Vorqualifizierungsaufwand: Vorgefilterte Anfragen reduzieren Ihren Aufwand',
      'Klare Übergabe / Dokumentation: Strukturierte Projektübergabe mit allen relevanten Daten',
      'Tools für Kosten/Planung/3D: Optional als Gesprächsgrundlage nutzbar',
      'Transparente Kommunikation: Klare nächste Schritte und Abläufe'
    ],
    betriebeItems: [
      'Metallbau / Balkonbau: Betriebe mit Erfahrung im Balkonbau',
      'Montagebetriebe: Betriebe, die Montage und Installation durchführen',
      'Schlosser / Handwerksbetriebe: Betriebe mit Kapazitäten für Balkonprojekte',
      'Betriebe mit Erfahrung in Bestand/WEG: Falls zutreffend für Ihre Projekte'
    ],
    ablaufSteps: [
      {
        title: 'Partnerprofil & Qualifikation',
        description: 'Sie erstellen Ihr Partnerprofil und geben Ihre Qualifikationen an. Wir prüfen Ihre Angaben und aktivieren Ihr Profil.'
      },
      {
        title: 'Projektanfrage & Vorprüfung',
        description: 'Sie erhalten strukturierte Projektanfragen mit den wichtigsten Eckdaten. Sie entscheiden, welche Projekte zu Ihnen passen.'
      },
      {
        title: 'Abstimmung / Angebot / Planung',
        description: 'Sie stimmen sich mit dem Kunden ab, erstellen ein Angebot und planen die Umsetzung.'
      },
      {
        title: 'Umsetzung & Feedback',
        description: 'Sie setzen das Projekt um und geben Feedback zum Ablauf. Dies hilft uns, den Prozess kontinuierlich zu verbessern.'
      }
    ],
    faqItems: [
      {
        question: 'Wie läuft die Partneranfrage ab?',
        answer: 'Sie füllen das Partnerformular aus und geben Ihre wichtigsten Informationen an. Wir prüfen Ihre Angaben und melden uns bei Ihnen zurück, um die nächsten Schritte zu besprechen.'
      },
      {
        question: 'Welche Regionen werden abgedeckt?',
        answer: 'Wir suchen Partner in Köln und dem Umland. Die genaue Abdeckung hängt von der Nachfrage und den Partnerkapazitäten ab.'
      },
      {
        question: 'Wie werden Anfragen qualifiziert?',
        answer: 'Projektanfragen werden vorab geprüft und mit den wichtigsten Eckdaten versehen. Sie erhalten strukturierte Informationen, die Ihnen die Entscheidung erleichtern.'
      },
      {
        question: 'Bin ich exklusiv gebunden?',
        answer: 'Nein. Die Partnerschaft ist nicht exklusiv. Sie können weiterhin andere Wege zur Akquise nutzen.'
      },
      {
        question: 'Wie schnell erhalte ich Anfragen?',
        answer: 'Die Anzahl der Anfragen hängt von Ihrer Region, Ihren Kapazitäten und der Nachfrage ab. Nach der Aktivierung Ihres Profils erhalten Sie passende Projektanfragen.'
      }
    ]
  },
  {
    cityName: 'Hamburg',
    citySlug: 'hamburg',
    title: 'Partner werden in Hamburg: BalkonFuchs – als Balkonbau-Partner zusammenarbeiten',
    metaDescription: 'Werden Sie Partner von BalkonFuchs in Hamburg: qualifizierte Projektanfragen, klare Abläufe und eine strukturierte Zusammenarbeit. Jetzt unverbindlich informieren und als Partner starten.',
    h1: 'Partner werden in Hamburg: Als Balkonbau-Partner mit BalkonFuchs zusammenarbeiten',
    lead: 'Als Partner erhalten Sie strukturierte Projektanfragen und einen klaren Prozess – von der ersten Bedarfsklärung bis zur Übergabe in die Umsetzung. Sie entscheiden, welche Projekte zu Ihnen passen. Starten Sie unverbindlich und lernen Sie den Ablauf kennen.',
    regionText: 'Wir suchen Partner in Hamburg und dem Umland. Die Region Hamburg bietet großes Potenzial für Balkonbau-Projekte, sowohl im Bestand als auch im Neubau.',
    nutzenItems: [
      'Strukturierte Anfragen mit Eckdaten: Projektanfragen mit den wichtigsten Informationen',
      'Weniger Vorqualifizierungsaufwand: Vorgefilterte Anfragen reduzieren Ihren Aufwand',
      'Klare Übergabe / Dokumentation: Strukturierte Projektübergabe mit allen relevanten Daten',
      'Tools für Kosten/Planung/3D: Optional als Gesprächsgrundlage nutzbar',
      'Transparente Kommunikation: Klare nächste Schritte und Abläufe'
    ],
    betriebeItems: [
      'Metallbau / Balkonbau: Betriebe mit Erfahrung im Balkonbau',
      'Montagebetriebe: Betriebe, die Montage und Installation durchführen',
      'Schlosser / Handwerksbetriebe: Betriebe mit Kapazitäten für Balkonprojekte',
      'Betriebe mit Erfahrung in Bestand/WEG: Falls zutreffend für Ihre Projekte'
    ],
    ablaufSteps: [
      {
        title: 'Partnerprofil & Qualifikation',
        description: 'Sie erstellen Ihr Partnerprofil und geben Ihre Qualifikationen an. Wir prüfen Ihre Angaben und aktivieren Ihr Profil.'
      },
      {
        title: 'Projektanfrage & Vorprüfung',
        description: 'Sie erhalten strukturierte Projektanfragen mit den wichtigsten Eckdaten. Sie entscheiden, welche Projekte zu Ihnen passen.'
      },
      {
        title: 'Abstimmung / Angebot / Planung',
        description: 'Sie stimmen sich mit dem Kunden ab, erstellen ein Angebot und planen die Umsetzung.'
      },
      {
        title: 'Umsetzung & Feedback',
        description: 'Sie setzen das Projekt um und geben Feedback zum Ablauf. Dies hilft uns, den Prozess kontinuierlich zu verbessern.'
      }
    ],
    faqItems: [
      {
        question: 'Wie läuft die Partneranfrage ab?',
        answer: 'Sie füllen das Partnerformular aus und geben Ihre wichtigsten Informationen an. Wir prüfen Ihre Angaben und melden uns bei Ihnen zurück, um die nächsten Schritte zu besprechen.'
      },
      {
        question: 'Welche Regionen werden abgedeckt?',
        answer: 'Wir suchen Partner in Hamburg und dem Umland. Die genaue Abdeckung hängt von der Nachfrage und den Partnerkapazitäten ab.'
      },
      {
        question: 'Wie werden Anfragen qualifiziert?',
        answer: 'Projektanfragen werden vorab geprüft und mit den wichtigsten Eckdaten versehen. Sie erhalten strukturierte Informationen, die Ihnen die Entscheidung erleichtern.'
      },
      {
        question: 'Bin ich exklusiv gebunden?',
        answer: 'Nein. Die Partnerschaft ist nicht exklusiv. Sie können weiterhin andere Wege zur Akquise nutzen.'
      },
      {
        question: 'Wie schnell erhalte ich Anfragen?',
        answer: 'Die Anzahl der Anfragen hängt von Ihrer Region, Ihren Kapazitäten und der Nachfrage ab. Nach der Aktivierung Ihres Profils erhalten Sie passende Projektanfragen.'
      }
    ]
  }
];
