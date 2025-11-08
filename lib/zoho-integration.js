/**
 * ZOHO Desk & CRM Integration für BALKONFUCHS
 * 
 * Diese Bibliothek ermöglicht die automatische Übertragung von Funnel-Daten
 * zu ZOHO Desk (Tickets) und ZOHO CRM (Leads/Kontakte)
 */

import axios from 'axios';

class ZohoIntegration {
  constructor() {
    this.baseURL = process.env.ZOHO_BASE_URL || 'https://desk.zoho.eu';
    this.crmBaseURL = process.env.ZOHO_CRM_BASE_URL || 'https://www.zohoapis.eu/crm/v2';
    this.accessToken = null; // Wird automatisch generiert
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.organizationId = process.env.ZOHO_ORGANIZATION_ID || process.env.ZOHO_ORG_ID;
  }

  /**
   * Holt einen neuen Access Token mit dem Refresh Token
   */
  async refreshAccessToken() {
    try {
      const response = await axios.post(
        'https://accounts.zoho.eu/oauth/v2/token',
        new URLSearchParams({
          refresh_token: this.refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'refresh_token'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data && response.data.access_token) {
        this.accessToken = response.data.access_token;
        console.log('Access Token erfolgreich erneuert');
        return this.accessToken;
      } else {
        throw new Error('Keine Access Token in der Antwort');
      }
    } catch (error) {
      console.error('Fehler beim Erneuern des Access Tokens:', error.response?.data || error.message);
      throw new Error(`Token-Refresh fehlgeschlagen: ${error.message}`);
    }
  }

  /**
   * Erstellt ein Ticket in ZOHO Desk
   */
  async createDeskTicket(funnelData) {
    try {
      // Access Token erneuern, falls nicht vorhanden
      if (!this.accessToken) {
        await this.refreshAccessToken();
      }

      const ticketData = this.formatTicketData(funnelData);
      
      const response = await axios.post(
        `${this.baseURL}/api/v1/tickets`,
        ticketData,
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json',
            'orgId': this.organizationId
          }
        }
      );

      return {
        success: true,
        ticketId: response.data.id,
        ticketNumber: response.data.ticketNumber,
        data: response.data
      };
    } catch (error) {
      // Falls 401 (Unauthorized), Token erneuern und erneut versuchen
      if (error.response?.status === 401) {
        console.log('Access Token abgelaufen, erneuere...');
        await this.refreshAccessToken();
        
        // Erneuter Versuch mit neuem Token
        const ticketData = this.formatTicketData(funnelData);
        const retryResponse = await axios.post(
          `${this.baseURL}/api/v1/tickets`,
          ticketData,
          {
            headers: {
              'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
              'Content-Type': 'application/json',
              'orgId': this.organizationId
            }
          }
        );
        
        return {
          success: true,
          ticketId: retryResponse.data.id,
          ticketNumber: retryResponse.data.ticketNumber,
          data: retryResponse.data
        };
      }
      
      console.error('Error creating ZOHO Desk ticket:', error.response?.data || error.message);
      throw new Error(`Failed to create ZOHO Desk ticket: ${error.message}`);
    }
  }

  /**
   * Erstellt einen Lead in ZOHO CRM
   */
  async createCRMLead(funnelData) {
    try {
      // Access Token erneuern, falls nicht vorhanden
      if (!this.accessToken) {
        await this.refreshAccessToken();
      }

      const leadData = this.formatLeadData(funnelData);
      
      const response = await axios.post(
        `${this.crmBaseURL}/Leads`,
        { data: [leadData] },
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        leadId: response.data.data[0].details.id,
        data: response.data.data[0]
      };
    } catch (error) {
      // Falls 401 (Unauthorized), Token erneuern und erneut versuchen
      if (error.response?.status === 401) {
        console.log('Access Token abgelaufen, erneuere...');
        await this.refreshAccessToken();
        
        const leadData = this.formatLeadData(funnelData);
        const retryResponse = await axios.post(
          `${this.crmBaseURL}/Leads`,
          { data: [leadData] },
          {
            headers: {
              'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        return {
          success: true,
          leadId: retryResponse.data.data[0].details.id,
          data: retryResponse.data.data[0]
        };
      }
      
      console.error('Error creating ZOHO CRM lead:', error.response?.data || error.message);
      throw new Error(`Failed to create ZOHO CRM lead: ${error.message}`);
    }
  }

  /**
   * Erstellt einen Kontakt in ZOHO CRM
   */
  async createCRMContact(funnelData) {
    try {
      // Access Token erneuern, falls nicht vorhanden
      if (!this.accessToken) {
        await this.refreshAccessToken();
      }

      const contactData = this.formatContactData(funnelData);
      
      const response = await axios.post(
        `${this.crmBaseURL}/Contacts`,
        { data: [contactData] },
        {
          headers: {
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        contactId: response.data.data[0].details.id,
        data: response.data.data[0]
      };
    } catch (error) {
      // Falls 401 (Unauthorized), Token erneuern und erneut versuchen
      if (error.response?.status === 401) {
        console.log('Access Token abgelaufen, erneuere...');
        await this.refreshAccessToken();
        
        const contactData = this.formatContactData(funnelData);
        const retryResponse = await axios.post(
          `${this.crmBaseURL}/Contacts`,
          { data: [contactData] },
          {
            headers: {
              'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        return {
          success: true,
          contactId: retryResponse.data.data[0].details.id,
          data: retryResponse.data.data[0]
        };
      }
      
      console.error('Error creating ZOHO CRM contact:', error.response?.data || error.message);
      throw new Error(`Failed to create ZOHO CRM contact: ${error.message}`);
    }
  }

  /**
   * Formatiert Funnel-Daten für ZOHO Desk Ticket
   */
  formatTicketData(funnelData) {
    const { contact, funnel, leadScore, funnelData: specificData, company, _partnerScoring, _kalkulatorScoring, _planerScoring, _genehmigungScoring, _bauzeitScoring, contactPerson } = funnelData;
    
    // Basis Custom Fields (alle Funnel)
    const baseCustomFields = {
      'Funnel_Typ': funnel.type,
      'Lead_Score': leadScore?.totalScore || 0,
      'Lead_Kategorie': leadScore?.category || 'cold',
      'Prioritaet': leadScore?.priority || 'P4',
      'Dringlichkeit': leadScore?.urgency || 'low',
      'Komplexitaet': leadScore?.complexity || 'simple',
      'Budget_Level': leadScore?.budget || 'budget',
      'Timeline': leadScore?.timeline || 'flexible',
      'Follow_Up_Stunden': leadScore?.followUpHours || 48,
      'Geschaetzter_Wert': funnelData.estimatedPrice || 0,
      'PLZ': contact.zipCode || company?.zipCode || 'Nicht angegeben',
      'Stadt': contact.city || company?.city || 'Nicht angegeben',
      'Newsletter_Anmeldung': contact.newsletter ? 'Ja' : 'Nein',
      'Datenschutz_Zugestimmt': contact.privacy ? 'Ja' : 'Nein',
      'Anrede': contact.salutation || 'Nicht angegeben',
      'Vorname': contact.firstName || 'Nicht angegeben',
      'Nachname': contact.lastName || 'Nicht angegeben',
      'E_Mail': contact.email || 'Nicht angegeben',
      'Telefon': contact.phone || 'Nicht angegeben',
      'Mobil': contact.mobile || 'Nicht angegeben',
      'Position': contact.position || 'Nicht angegeben',
      'Kontaktpraeferenz': contact.preferredContact || 'Nicht angegeben',
      'AGB_Zugestimmt': contact.agb ? 'Ja' : 'Nein',
      'Disclaimer_Zugestimmt': contact.disclaimer ? 'Ja' : 'Nein'
    };

    // Partner-Scoring Custom Fields
    const partnerScoringFields = {};
    if (_partnerScoring && (funnel.type === 'partner' || funnel.type === 'partner-werden')) {
      partnerScoringFields['Partner_Basis_Score'] = _partnerScoring.baseScore || 0;
      partnerScoringFields['Partner_Qualitaets_Multiplikator'] = _partnerScoring.qualityMultiplier || 1.0;
      partnerScoringFields['Partner_Final_Score'] = _partnerScoring.finalScore || 0;
      partnerScoringFields['Partner_Kategorie'] = _partnerScoring.category || 'Nicht bewertet';
      partnerScoringFields['Partner_Status'] = _partnerScoring.status || 'unbekannt';
      partnerScoringFields['Partner_Empfohlene_Aktion'] = _partnerScoring.action || 'Keine Aktion';
      partnerScoringFields['Partner_Negativ_Faktoren'] = _partnerScoring.warnings?.length || 0;
      partnerScoringFields['Partner_Warnings'] = _partnerScoring.warnings?.join('; ') || 'Keine';
    }

    // Kalkulator-Scoring Custom Fields
    const kalkulatorScoringFields = {};
    if (_kalkulatorScoring && (funnel.type === 'kalkulator' || funnel.type === 'calculator')) {
      kalkulatorScoringFields['Kalkulator_Basis_Score'] = _kalkulatorScoring.baseScore || 0;
      kalkulatorScoringFields['Kalkulator_Completion_Bonus'] = _kalkulatorScoring.completionBonus || 0;
      kalkulatorScoringFields['Kalkulator_Final_Score'] = _kalkulatorScoring.finalScore || 0;
      kalkulatorScoringFields['Kalkulator_Kategorie'] = _kalkulatorScoring.category || 'Nicht bewertet';
      kalkulatorScoringFields['Kalkulator_Aktion'] = _kalkulatorScoring.action || 'Keine Aktion';
      kalkulatorScoringFields['Kalkulator_Nurturing_Sequence'] = _kalkulatorScoring.nurturingSequence || 'standard-nurturing';
      kalkulatorScoringFields['Kalkulator_Prioritaet'] = _kalkulatorScoring.priority || 'low';
      kalkulatorScoringFields['Kalkulator_Geschaetzter_Wert'] = _kalkulatorScoring.estimatedValue || 0;
      kalkulatorScoringFields['Kalkulator_Vollstaendig'] = _kalkulatorScoring.isComplete ? 'Ja' : 'Nein';
    }

    // Planer-Scoring Custom Fields
    const planerScoringFields = {};
    if (_planerScoring && funnel.type === 'planer') {
      planerScoringFields['Planer_Block1_Score'] = _planerScoring.block1Score || 0;
      planerScoringFields['Planer_Block2_Score'] = _planerScoring.block2Score || 0;
      planerScoringFields['Planer_Block3_Score'] = _planerScoring.block3Score || 0;
      planerScoringFields['Planer_Block4_Score'] = _planerScoring.block4Score || 0;
      planerScoringFields['Planer_Basis_Score'] = _planerScoring.baseScore || 0;
      planerScoringFields['Planer_Completion_Bonus'] = _planerScoring.completionBonus || 0;
      planerScoringFields['Planer_Final_Score'] = _planerScoring.finalScore || 0;
      planerScoringFields['Planer_Kategorie'] = _planerScoring.category || 'Nicht bewertet';
      planerScoringFields['Planer_Aktion'] = _planerScoring.action || 'Keine Aktion';
      planerScoringFields['Planer_Prioritaet'] = _planerScoring.priority || 'low';
      planerScoringFields['Planer_Response_Time'] = _planerScoring.responseTime || '72h';
      planerScoringFields['Planer_Geschaetzter_Wert'] = _planerScoring.estimatedValue || 0;
      planerScoringFields['Planer_Beratungs_Readiness'] = _planerScoring.beratungsReadiness || 'vorbereitung_noetig';
      planerScoringFields['Planer_Vollstaendig'] = _planerScoring.isComplete ? 'Ja' : 'Nein';
    }

    // Genehmigungs-Check-Scoring Custom Fields
    const genehmigungScoringFields = {};
    if (_genehmigungScoring && funnel.type === 'genehmigung') {
      genehmigungScoringFields['Genehmigung_Total_Score'] = _genehmigungScoring.totalScore || 0;
      genehmigungScoringFields['Genehmigung_Kategorie'] = _genehmigungScoring.category || 'Nicht bewertet';
      genehmigungScoringFields['Genehmigung_Aktion'] = _genehmigungScoring.action || 'Keine Aktion';
      genehmigungScoringFields['Genehmigung_Prioritaet'] = _genehmigungScoring.priority || 'low';
      genehmigungScoringFields['Genehmigung_Response_Time'] = _genehmigungScoring.responseTime || '72h';
      genehmigungScoringFields['Genehmigung_Geschaetzter_Wert'] = _genehmigungScoring.estimatedValue || 0;
      genehmigungScoringFields['Genehmigung_Wahrscheinlichkeit'] = _genehmigungScoring.genehmigungswahrscheinlichkeit || 0;
      genehmigungScoringFields['Genehmigung_Vollstaendig'] = _genehmigungScoring.isComplete ? 'Ja' : 'Nein';
    }

    // Bauzeitplaner-Scoring Custom Fields
    const bauzeitScoringFields = {};
    if (_bauzeitScoring && funnel.type === 'bauzeit-planung') {
      bauzeitScoringFields['Bauzeit_Total_Score'] = _bauzeitScoring.totalScore || 0;
      bauzeitScoringFields['Bauzeit_Kategorie'] = _bauzeitScoring.category || 'Nicht bewertet';
      bauzeitScoringFields['Bauzeit_Aktion'] = _bauzeitScoring.action || 'Keine Aktion';
      bauzeitScoringFields['Bauzeit_Prioritaet'] = _bauzeitScoring.priority || 'low';
      bauzeitScoringFields['Bauzeit_Response_Time'] = _bauzeitScoring.responseTime || '72h';
      bauzeitScoringFields['Bauzeit_Geschaetzter_Wert'] = _bauzeitScoring.estimatedValue || 0;
      bauzeitScoringFields['Bauzeit_Geschaetzte_Bauzeit'] = _bauzeitScoring.geschaetzteBauzeit || 'Unbekannt';
      bauzeitScoringFields['Bauzeit_Vollstaendig'] = _bauzeitScoring.isComplete ? 'Ja' : 'Nein';
    }

    const specificCustomFields = this.getFunnelSpecificFields(funnel.type, specificData);
    const extendedCustomFields = this.getExtendedCustomFields(funnelData);
    
    return {
      subject: `Balkon-Anfrage: ${contact.firstName} ${contact.lastName} (${funnel.name})`,
      description: this.generateTicketDescription(funnelData),
      priority: this.mapPriority(leadScore?.priority || 'P4'),
      status: 'Open',
      departmentId: this.getDepartmentId(funnel.type),
      assigneeId: this.getAssigneeId(funnel.type, leadScore),
      customFields: { 
        ...baseCustomFields, 
        ...specificCustomFields, 
        ...extendedCustomFields, 
        ...partnerScoringFields, 
        ...kalkulatorScoringFields, 
        ...planerScoringFields, 
        ...genehmigungScoringFields, 
        ...bauzeitScoringFields 
      },
      tags: [
        'balkonfuchs',
        funnel.type,
        `lead-score-${leadScore?.totalScore || 0}`,
        `category-${leadScore?.category || 'cold'}`,
        contact.zipCode || company?.zipCode ? `plz-${contact.zipCode || company?.zipCode}` : 'plz-unbekannt',
        ...(partnerScoringFields['Partner_Kategorie'] ? [`partner-${partnerScoringFields['Partner_Kategorie'].toLowerCase().replace(/\s+/g, '-')}`] : []),
        ...(partnerScoringFields['Partner_Status'] ? [`status-${partnerScoringFields['Partner_Status']}`] : []),
        ...(kalkulatorScoringFields['Kalkulator_Kategorie'] ? [`kalkulator-${kalkulatorScoringFields['Kalkulator_Kategorie'].toLowerCase().replace(/\s+/g, '-')}`] : []),
        ...(kalkulatorScoringFields['Kalkulator_Nurturing_Sequence'] ? [`nurturing-${kalkulatorScoringFields['Kalkulator_Nurturing_Sequence']}`] : []),
        ...(planerScoringFields['Planer_Kategorie'] ? [`planer-${planerScoringFields['Planer_Kategorie'].toLowerCase().replace(/\s+/g, '-')}`] : []),
        ...(planerScoringFields['Planer_Beratungs_Readiness'] ? [`readiness-${planerScoringFields['Planer_Beratungs_Readiness']}`] : []),
        ...(genehmigungScoringFields['Genehmigung_Kategorie'] ? [`genehmigung-${genehmigungScoringFields['Genehmigung_Kategorie'].toLowerCase().replace(/\s+/g, '-')}`] : []),
        ...(genehmigungScoringFields['Genehmigung_Wahrscheinlichkeit'] ? [`wahrscheinlichkeit-${genehmigungScoringFields['Genehmigung_Wahrscheinlichkeit']}%`] : []),
        ...(bauzeitScoringFields['Bauzeit_Kategorie'] ? [`bauzeit-${bauzeitScoringFields['Bauzeit_Kategorie'].toLowerCase().replace(/\s+/g, '-')}`] : []),
        ...(bauzeitScoringFields['Bauzeit_Geschaetzte_Bauzeit'] ? [`bauzeit-${bauzeitScoringFields['Bauzeit_Geschaetzte_Bauzeit'].replace(/\s+/g, '-')}`] : [])
      ]
    };
  }

  /**
   * Holt erweiterte Custom Fields für alle Funnel-Typen
   */
  getExtendedCustomFields(funnelData) {
    const { funnelData: specificData, contact, company } = funnelData;
    const fields = {};
    
    if (specificData?.projektort) {
      fields['Projektort'] = specificData.projektort;
    }
    if (specificData?.projektadresse) {
      fields['Projektadresse'] = specificData.projektadresse;
    }
    if (specificData?.projektname) {
      fields['Projektname'] = specificData.projektname;
    }
    if (specificData?.projekttyp) {
      fields['Gebaeudetyp'] = specificData.projekttyp;
    }
    const anzahlBalkone = specificData?.anzahlBalkone || specificData?.anzahlEinheiten;
    if (anzahlBalkone) {
      fields['Anzahl_Balkone'] = anzahlBalkone;
    }
    if (specificData?.budgetFreitext) {
      fields['Exaktes_Budget'] = specificData.budgetFreitext;
    }
    if (specificData?.budgetrahmen) {
      fields['Budget_Range'] = specificData.budgetrahmen;
    }
    if (specificData?.startMonat && specificData?.startJahr) {
      fields['Exakter_Starttermin'] = `${specificData.startMonat}/${specificData.startJahr}`;
    }
    if (specificData?.endMonat && specificData?.endJahr) {
      fields['Exakter_Endtermin'] = `${specificData.endMonat}/${specificData.endJahr}`;
    }
    if (specificData?.zeitrahmen) {
      fields['Zeitrahmen_Range'] = specificData.zeitrahmen;
    }
    if (specificData?.balkontyp && Array.isArray(specificData.balkontyp)) {
      fields['Balkontyp_Details'] = specificData.balkontyp.join(', ');
    }
    if (specificData?.ansprechpartner) {
      fields['Ansprechpartner'] = specificData.ansprechpartner;
    }
    if (specificData?.position) {
      fields['Position'] = specificData.position;
    }
    if (specificData?.projektleiter) {
      fields['Projektleiter'] = specificData.projektleiter;
    }
    if (company?.name) {
      fields['Unternehmensname'] = company.name;
    }
    if (company?.legalForm) {
      fields['Rechtsform'] = company.legalForm;
    }
    if (company?.employeeCount) {
      fields['Mitarbeiterzahl'] = company.employeeCount;
    }
    if (specificData?.nachricht) {
      fields['Zusaetzliche_Nachricht'] = specificData.nachricht;
    }
    
    return fields;
  }

  /**
   * Holt funnel-spezifische Custom Fields
   */
  getFunnelSpecificFields(funnelType, specificData) {
    const fields = {};
    
    switch (funnelType) {
      case 'calculator':
      case 'kalkulator':
        fields['Balkon_Typ'] = specificData?.balconyType || 'Nicht angegeben';
        fields['Balkon_Groesse'] = specificData?.balconySize ? 
          `${specificData.balconySize.width}x${specificData.balconySize.depth}` : 
          `${specificData?.balconyWidth || 0}x${specificData?.balconyDepth || 0}`;
        fields['Balkon_Anzahl'] = specificData?.balconyCount || specificData?.floors || 1;
        fields['Extras'] = specificData?.extras?.join(', ') || 'Keine';
        fields['Basispreis'] = specificData?.basePrice || specificData?.calculation || 0;
        fields['PLZ'] = specificData?.plz || 'Nicht angegeben';
        fields['Stadt'] = specificData?.city || 'Nicht angegeben';
        
        if (specificData?.balconyWidth && specificData?.balconyDepth) {
          const area = parseFloat(specificData.balconyWidth) * parseFloat(specificData.balconyDepth);
          fields['Balkon_Flaeche'] = Math.round(area * 100) / 100 + ' m²';
        }
        
        if (specificData?.extras && specificData.extras.length > 0) {
          fields['Balkontuer'] = specificData.extras.includes('balkontuer') ? 'Ja' : 'Nein';
          fields['Treppe'] = specificData.extras.includes('treppe') ? 'Ja' : 'Nein';
          fields['Genehmigung'] = specificData.extras.includes('genehmigung') ? 'Ja' : 'Nein';
          fields['Komplettservice'] = specificData.extras.includes('komplettservice') ? 'Ja' : 'Nein';
        }
        break;
        
      case 'planer':
        fields['Projekt_Status'] = specificData?.projectStatus || 'Nicht angegeben';
        fields['Zeitrahmen'] = specificData?.timeframe || 'Nicht angegeben';
        fields['Budget_Range'] = specificData?.budget || 'Nicht angegeben';
        fields['Eigentuemer'] = specificData?.ownership || 'Nicht angegeben';
        break;
        
      case 'express-angebot':
        fields['Dringlichkeitsstufe'] = specificData?.urgencyLevel || 'Nicht angegeben';
        fields['Genehmigungsstatus'] = specificData?.approvalStatus || 'Nicht angegeben';
        break;
        
      case 'genehmigung':
        fields['Bundesland'] = specificData?.bundesland || 'Nicht angegeben';
        fields['Projekttyp'] = specificData?.projekttyp || 'Nicht angegeben';
        fields['Grenzabstand'] = specificData?.grenzabstand || 'Nicht angegeben';
        fields['Balkon_Groesse'] = specificData?.groesse && specificData?.tiefe ? 
          `${specificData.groesse}m x ${specificData.tiefe}m` : 'Nicht angegeben';
        fields['Genehmigungsstatus'] = specificData?.ergebnis?.status || 'Unbekannt';
        break;
        
      case 'bauzeit-planung':
        fields['Wunschtermin'] = specificData?.targetMonth && specificData?.targetYear ? 
          `${specificData.targetMonth}/${specificData.targetYear}` : 'Nicht angegeben';
        fields['Projektphase'] = specificData?.projectPhase || 'Nicht angegeben';
        fields['Starttermin'] = specificData?.calculation || 'Nicht berechnet';
        break;
        
      case 'partner':
        fields['Partner_Typ'] = specificData?.partnerType || 'Nicht angegeben';
        fields['Erfahrung'] = specificData?.experience || 'Nicht angegeben';
        fields['Spezialisierungen'] = specificData?.specialties?.join(', ') || 'Keine';
        fields['Arbeitsgebiet'] = specificData?.workingArea || 'Nicht angegeben';
        fields['Versicherungsstatus'] = specificData?.insuranceStatus || 'Nicht angegeben';
        fields['Referenzen_Anzahl'] = specificData?.references?.filter(r => r.description).length || 0;
        fields['Dokumente_Anzahl'] = Object.values(specificData?.documents || {}).filter(Boolean).length || 0;
        break;
        
      case 'gewerbe':
        fields['Projektart'] = specificData?.projectType || 'Nicht angegeben';
        fields['Anzahl_Einheiten'] = specificData?.numberOfUnits || 'Nicht angegeben';
        fields['Gewuenschte_Balkontypen'] = specificData?.balconyTypes?.join(', ') || 'Nicht angegeben';
        fields['Projektstart_Geplant'] = specificData?.projectStart || 'Nicht angegeben';
        fields['Projektdauer_Gewuenscht'] = specificData?.projectDuration || 'Nicht angegeben';
        fields['Budget_Range_Gewerbe'] = specificData?.budgetRange || 'Nicht angegeben';
        fields['Budget_Freigegeben'] = specificData?.budgetApproved ? 'Ja' : 'Nein';
        fields['Unternehmenstyp'] = specificData?.companyType || 'Nicht angegeben';
        fields['Projektverantwortlicher'] = specificData?.projectManager || 'Nicht angegeben';
        fields['Genehmigungen_Vorhanden'] = specificData?.permitsAvailable ? 'Ja' : 'Nein';
        fields['Plaene_Vorhanden'] = specificData?.plansAvailable ? 'Ja' : 'Nein';
        fields['Besondere_Anforderungen'] = specificData?.specialRequirements || 'Keine';
        break;
        case 'partner-werden':
        fields['Unternehmensname'] = specificData?.companyName || 'Nicht angegeben';
        fields['Rechtsform'] = specificData?.legalForm || 'Nicht angegeben';
        fields['Gruendungsjahr'] = specificData?.foundedYear || 'Nicht angegeben';
        fields['Mitarbeiterzahl'] = specificData?.employeeCount || 'Nicht angegeben';
        fields['Website'] = specificData?.website || 'Nicht angegeben';
        fields['Stadt'] = specificData?.city || 'Nicht angegeben';
        fields['PLZ'] = specificData?.zipCode || 'Nicht angegeben';
        fields['Adresse'] = specificData?.address || 'Nicht angegeben';
        fields['Partner_Typ'] = specificData?.partnerType || 'Nicht angegeben';
        fields['Erfahrung'] = specificData?.experience || 'Nicht angegeben';
        fields['Spezialisierungen'] = specificData?.specialties?.join(', ') || 'Keine';
        fields['Arbeitsgebiet'] = specificData?.workingArea || 'Nicht angegeben';
        fields['Versicherungsstatus'] = specificData?.insuranceStatus || 'Nicht angegeben';
        fields['Referenzen_Anzahl'] = specificData?.references?.filter(r => r.description).length || 0;
        fields['Dokumente_Anzahl'] = Object.values(specificData?.documents || {}).filter(Boolean).length || 0;
        
        if (specificData?.references && specificData.references.length > 0) {
          specificData.references.forEach((ref, index) => {
            if (ref.description) {
              fields[`Referenz_${index + 1}_Beschreibung`] = ref.description;
              fields[`Referenz_${index + 1}_Ort`] = ref.location || 'Nicht angegeben';
              fields[`Referenz_${index + 1}_Jahr`] = ref.year || 'Nicht angegeben';
              fields[`Referenz_${index + 1}_Wert`] = ref.value || 'Nicht angegeben';
            }
          });
        }
        
        if (specificData?.lighthouseProject?.description) {
          fields['Leuchtturm_Beschreibung'] = specificData.lighthouseProject.description;
          fields['Leuchtturm_Ort'] = specificData.lighthouseProject.location || 'Nicht angegeben';
          fields['Leuchtturm_Jahr'] = specificData.lighthouseProject.year || 'Nicht angegeben';
          fields['Leuchtturm_Wert'] = specificData.lighthouseProject.value || 'Nicht angegeben';
          fields['Leuchtturm_Besonderheit'] = specificData.lighthouseProject.special || 'Nicht angegeben';
        }
        
        if (specificData?.documents) {
          fields['Gewerbeschein'] = specificData.documents.businessLicense ? 'Ja' : 'Nein';
          fields['Versicherungsnachweis'] = specificData.documents.insurance ? 'Ja' : 'Nein';
          fields['Meisterbrief'] = specificData.documents.masterCertificate ? 'Ja' : 'Nein';
          fields['Diplom'] = specificData.documents.diploma ? 'Ja' : 'Nein';
          fields['Ausbilderschein'] = specificData.documents.instructorLicense ? 'Ja' : 'Nein';
          fields['Referenzen_Dokumente'] = specificData.documents.references ? 'Ja' : 'Nein';
          fields['Portfolio'] = specificData.documents.portfolio ? 'Ja' : 'Nein';
        }
        break;
        
      case 'empfehlungen':
        fields['Projektziel'] = specificData?.projectGoal || 'Nicht angegeben';
        fields['Wohnsituation'] = specificData?.currentSituation || 'Nicht angegeben';
        fields['Prioritaeten_Anzahl'] = specificData?.priorities?.length || 0;
        fields['Bedenken_Anzahl'] = specificData?.concerns?.length || 0;
        break;
        
      case 'erfahrungen':
        fields['Feedback_Typ'] = specificData?.feedbackType || 'Nicht angegeben';
        fields['Bewertung'] = specificData?.overallRating || 'Nicht angegeben';
        fields['Projekttyp'] = specificData?.projectType || 'Nicht angegeben';
        fields['Veröffentlichung'] = specificData?.publishPermission || 'Nicht angegeben';
        break;
    }
    
    return fields;
  }

  /**
   * Formatiert Funnel-Daten für ZOHO CRM Lead
   */
  formatLeadData(funnelData) {
    const { contact, funnel, leadScore } = funnelData;
    
    return {
      First_Name: contact.firstName,
      Last_Name: contact.lastName,
      Email: contact.email,
      Phone: contact.phone || '',
      Lead_Source: `BALKONFUCHS ${funnel.type}`,
      Lead_Status: 'Not Contacted',
      Company: 'Privatperson',
      Industry: 'Bauwesen',
      Annual_Revenue: funnelData.estimatedPrice || 0,
      Description: this.generateLeadDescription(funnelData),
      Street: contact.address || '',
      Zip_Code: contact.zipCode || '',
      City: contact.city || '',
      Country: 'Deutschland',
      customFields: {
        'Funnel_Typ': funnel.type,
        'Lead_Score': leadScore?.score || 0,
        'Zeitrahmen': funnelData.timeline || 'Nicht angegeben',
        'Newsletter_Anmeldung': contact.newsletter ? 'Ja' : 'Nein',
        'Datenschutz_Zugestimmt': contact.privacy ? 'Ja' : 'Nein'
      }
    };
  }

  /**
   * Formatiert Funnel-Daten für ZOHO CRM Kontakt
   */
  formatContactData(funnelData) {
    const { contact, funnel } = funnelData;
    
    return {
      First_Name: contact.firstName,
      Last_Name: contact.lastName,
      Email: contact.email,
      Phone: contact.phone || '',
      Account_Name: 'BALKONFUCHS Kunden',
      Description: `Kontakt aus ${funnel.type} Funnel`,
      Mailing_Street: contact.address || '',
      Mailing_Zip: contact.zipCode || '',
      Mailing_City: contact.city || '',
      Mailing_Country: 'Deutschland',
      customFields: {
        'Funnel_Typ': funnel.type,
        'Newsletter_Anmeldung': contact.newsletter ? 'Ja' : 'Nein',
        'Datenschutz_Zugestimmt': contact.privacy ? 'Ja' : 'Nein'
      }
    };
  }

  /**
   * Generiert Ticket-Beschreibung
   */
  generateTicketDescription(funnelData) {
    const { contact, funnel, leadScore, funnelData: specificData, company, _partnerScoring, _kalkulatorScoring, _planerScoring, _genehmigungScoring, _bauzeitScoring, contactPerson } = funnelData;
    
    let description = `Neue Balkon-Anfrage über den ${funnel.name} Funnel:\n\n`;
    
    if (funnel.type === 'calculator' || funnel.type === 'kalkulator') {
      description += `Balkon-Details:\n`;
      description += `- Typ: ${specificData?.balconyType || 'Nicht angegeben'}\n`;
      description += `- Größe: ${specificData?.balconySize?.width || specificData?.balconyWidth || 'N/A'}m × ${specificData?.balconySize?.depth || specificData?.balconyDepth || 'N/A'}m\n`;
      description += `- Anzahl: ${specificData?.balconyCount || specificData?.floors || 1}\n`;
      description += `- Extras: ${specificData?.extras?.join(', ') || 'Keine'}\n`;
      description += `- PLZ: ${specificData?.plz || 'Nicht angegeben'}\n`;
      description += `- Stadt: ${specificData?.city || 'Nicht angegeben'}\n`;
      
      if (specificData?.balconyWidth && specificData?.balconyDepth) {
        const area = parseFloat(specificData.balconyWidth) * parseFloat(specificData.balconyDepth);
        description += `- Balkonfläche: ${Math.round(area * 100) / 100} m²\n`;
      }
    } else if (funnel.type === 'planer') {
      description += `Planer-Details:\n`;
      description += `- Projekt-Status: ${specificData?.projectStatus || 'Nicht angegeben'}\n`;
      description += `- Zeitrahmen: ${specificData?.timeframe || 'Nicht angegeben'}\n`;
      description += `- Budget: ${specificData?.budget || 'Nicht angegeben'}\n`;
      description += `- Eigentümer: ${specificData?.ownership || 'Nicht angegeben'}\n`;
    } else if (funnel.type === 'express-angebot') {
      description += `Express-Angebot Details:\n`;
      description += `- Dringlichkeitsstufe: ${specificData?.urgencyLevel || 'Nicht angegeben'}\n`;
      description += `- Genehmigungsstatus: ${specificData?.approvalStatus || 'Nicht angegeben'}\n`;
    } else if (funnel.type === 'genehmigung') {
      description += `Genehmigungscheck Details:\n`;
      description += `- Bundesland: ${specificData?.bundesland || 'Nicht angegeben'}\n`;
      description += `- Projekttyp: ${specificData?.projekttyp || 'Nicht angegeben'}\n`;
      description += `- Größe: ${specificData?.groesse || 'N/A'}m × ${specificData?.tiefe || 'N/A'}m\n`;
      description += `- Grenzabstand: ${specificData?.grenzabstand || 'Nicht angegeben'}\n`;
      description += `- Genehmigungsstatus: ${specificData?.ergebnis?.status || 'Unbekannt'}\n`;
    } else if (funnel.type === 'bauzeit-planung') {
      description += `Bauzeitplaner Details:\n`;
      description += `- Wunschtermin: ${specificData?.targetMonth || 'N/A'}/${specificData?.targetYear || 'N/A'}\n`;
      description += `- Projektphase: ${specificData?.projectPhase || 'Nicht angegeben'}\n`;
      description += `- Berechneter Starttermin: ${specificData?.calculation || 'Nicht berechnet'}\n`;
    } else if (funnel.type === 'partner-werden') {
      description += `Partner-Bewerbung Details:\n\n`;
      
      description += `🏢 UNTERNEHMENSDATEN:\n`;
      description += `- Unternehmensname: ${specificData?.companyName || 'Nicht angegeben'}\n`;
      description += `- Rechtsform: ${specificData?.legalForm || 'Nicht angegeben'}\n`;
      description += `- Gründungsjahr: ${specificData?.foundedYear || 'Nicht angegeben'}\n`;
      description += `- Mitarbeiterzahl: ${specificData?.employeeCount || 'Nicht angegeben'}\n`;
      description += `- Website: ${specificData?.website || 'Nicht angegeben'}\n`;
      description += `- Adresse: ${specificData?.address || 'Nicht angegeben'}\n`;
      description += `- PLZ: ${specificData?.zipCode || 'Nicht angegeben'}\n`;
      description += `- Stadt: ${specificData?.city || 'Nicht angegeben'}\n\n`;
      
      description += `🤝 PARTNER-DATEN:\n`;
      description += `- Partner-Typ: ${specificData?.partnerType || 'Nicht angegeben'}\n`;
      description += `- Erfahrung: ${specificData?.experience || 'Nicht angegeben'}\n`;
      description += `- Spezialisierungen: ${specificData?.specialties?.join(', ') || 'Keine'}\n`;
      description += `- Arbeitsgebiet: ${specificData?.workingArea || 'Nicht angegeben'}\n`;
      description += `- Versicherungsstatus: ${specificData?.insuranceStatus || 'Nicht angegeben'}\n\n`;
      
      if (specificData?.references && specificData.references.some(r => r.description)) {
        description += `📋 REFERENZ-PROJEKTE:\n`;
        specificData.references.forEach((ref, index) => {
          if (ref.description) {
            description += `  Projekt ${index + 1}:\n`;
            description += `  - Beschreibung: ${ref.description}\n`;
            description += `  - Ort: ${ref.location || 'Nicht angegeben'}\n`;
            description += `  - Jahr: ${ref.year || 'Nicht angegeben'}\n`;
            description += `  - Wert: ${ref.value || 'Nicht angegeben'}\n`;
          }
        });
        description += `\n`;
      }
      
      if (specificData?.lighthouseProject?.description) {
        description += `🏆 LEUCHTTURM-PROJEKT:\n`;
        description += `- Beschreibung: ${specificData.lighthouseProject.description}\n`;
        description += `- Ort: ${specificData.lighthouseProject.location || 'Nicht angegeben'}\n`;
        description += `- Jahr: ${specificData.lighthouseProject.year || 'Nicht angegeben'}\n`;
        description += `- Wert: ${specificData.lighthouseProject.value || 'Nicht angegeben'}\n`;
        description += `- Besonderheit: ${specificData.lighthouseProject.special || 'Nicht angegeben'}\n\n`;
      }
      
      if (specificData?.documents) {
        description += `📄 DOKUMENTE:\n`;
        const docList = [];
        if (specificData.documents.businessLicense) docList.push('Gewerbeschein');
        if (specificData.documents.insurance) docList.push('Versicherungsnachweis');
        if (specificData.documents.masterCertificate) docList.push('Meisterbrief');
        if (specificData.documents.diploma) docList.push('Diplom');
        if (specificData.documents.instructorLicense) docList.push('Ausbilderschein');
        if (specificData.documents.references) docList.push('Referenzen');
        if (specificData.documents.portfolio) docList.push('Portfolio');
        
        if (docList.length > 0) {
          description += `- Verfügbare Dokumente: ${docList.join(', ')}\n`;
        } else {
          description += `- Keine Dokumente angegeben\n`;
        }
        description += `\n`;
      }
      
      if (contactPerson?.firstName) {
        description += `👤 ZUSÄTZLICHER ANSPRECHPARTNER:\n`;
        description += `- Name: ${contactPerson.firstName} ${contactPerson.lastName}\n`;
        description += `- Funktion: ${contactPerson.function || 'Nicht angegeben'}\n`;
        description += `- Mobil: ${contactPerson.mobile || 'Nicht angegeben'}\n\n`;
      }
    } else if (funnel.type === 'partner') {
      description += `Partner-Bewerbung Details:\n`;
      description += `- Partner-Typ: ${specificData?.partnerType || 'Nicht angegeben'}\n`;
      description += `- Unternehmen: ${company?.name || 'Nicht angegeben'}\n`;
      description += `- Rechtsform: ${company?.legalForm || 'Nicht angegeben'}\n`;
      description += `- Mitarbeiter: ${company?.employeeCount || 'Nicht angegeben'}\n`;
      description += `- Erfahrung: ${specificData?.experience || 'Nicht angegeben'}\n`;
      description += `- Spezialisierungen: ${specificData?.specialties?.join(', ') || 'Keine'}\n`;
      description += `- Arbeitsgebiet: ${specificData?.workingArea || 'Nicht angegeben'}\n`;
      description += `- Versicherungsstatus: ${specificData?.insuranceStatus || 'Nicht angegeben'}\n`;
      description += `- Referenzen: ${specificData?.references?.filter(r => r.description).length || 0} angegeben\n`;
      description += `- Dokumente: ${Object.values(specificData?.documents || {}).filter(Boolean).length || 0} verfügbar\n`;
    } else if (funnel.type === 'gewerbe') {
      description += `Gewerbe-Anfrage Details:\n\n`;
      
      description += `🏢 PROJEKTINFORMATIONEN:\n`;
      description += `- Projektart: ${specificData?.projectType || 'Nicht angegeben'}\n`;
      description += `- Anzahl Einheiten: ${specificData?.numberOfUnits || 'Nicht angegeben'}\n`;
      description += `- Gewünschte Balkontypen: ${specificData?.balconyTypes?.join(', ') || 'Nicht angegeben'}\n\n`;
      
      description += `📅 ZEITRAHMEN:\n`;
      description += `- Geplanter Projektstart: ${specificData?.projectStart || 'Nicht angegeben'}\n`;
      description += `- Gewünschte Projektdauer: ${specificData?.projectDuration || 'Nicht angegeben'}\n\n`;
      
      description += `💰 BUDGET:\n`;
      description += `- Budget-Range: ${specificData?.budgetRange || 'Nicht angegeben'}\n`;
      description += `- Budget freigegeben: ${specificData?.budgetApproved ? 'Ja' : 'Nein'}\n\n`;
      
      description += `🏗️ PROJEKTSTATUS:\n`;
      description += `- Genehmigungen vorhanden: ${specificData?.permitsAvailable ? 'Ja' : 'Nein'}\n`;
      description += `- Pläne vorhanden: ${specificData?.plansAvailable ? 'Ja' : 'Nein'}\n`;
      description += `- Besondere Anforderungen: ${specificData?.specialRequirements || 'Keine'}\n\n`;
      
      description += `🏢 UNTERNEHMEN:\n`;
      description += `- Unternehmenstyp: ${specificData?.companyType || 'Nicht angegeben'}\n`;
      description += `- Projektverantwortlicher: ${specificData?.projectManager || 'Nicht angegeben'}\n`;
    }
    
    description += `\nGeschätzter Wert: ${funnelData.estimatedPrice ? funnelData.estimatedPrice.toLocaleString('de-DE') + '€' : 'Nicht berechnet'}\n`;
    description += `Lead Score: ${leadScore?.totalScore || 0} (${leadScore?.priority || 'P4'})\n`;
    description += `Kategorie: ${leadScore?.category || 'cold'}\n`;
    description += `Dringlichkeit: ${leadScore?.urgency || 'low'}\n`;
    
    if (_partnerScoring && (funnel.type === 'partner' || funnel.type === 'partner-werden')) {
      description += `\n🎯 PARTNER-SCORING (Hybrid-Ansatz):\n`;
      description += `- Partner-Kategorie: ${_partnerScoring.category || 'Nicht bewertet'}\n`;
      description += `- Status: ${_partnerScoring.status || 'unbekannt'}\n`;
      description += `- Basis-Score: ${_partnerScoring.baseScore || 0}/100\n`;
      description += `- Qualitäts-Multiplikator: ${_partnerScoring.qualityMultiplier ? (_partnerScoring.qualityMultiplier * 100).toFixed(0) + '%' : '100%'}\n`;
      description += `- Final-Score: ${_partnerScoring.finalScore || 0}/100\n`;
      description += `- Empfohlene Aktion: ${_partnerScoring.action || 'Keine Aktion'}\n`;
      
      if (_partnerScoring.warnings && _partnerScoring.warnings.length > 0) {
        description += `- Identifizierte Risikofaktoren (${_partnerScoring.warnings.length}):\n`;
        _partnerScoring.warnings.forEach((warning, index) => {
          description += `  ${index + 1}. ${warning}\n`;
        });
      }
    }
    
    if (_kalkulatorScoring && (funnel.type === 'kalkulator' || funnel.type === 'calculator')) {
      description += `\n🎯 KALKULATOR-SCORING (Nurturing-Ansatz):\n`;
      description += `- Kategorie: ${_kalkulatorScoring.category || 'Nicht bewertet'}\n`;
      description += `- Basis-Score: ${_kalkulatorScoring.baseScore || 0}/35\n`;
      description += `- Completion Bonus: ${_kalkulatorScoring.completionBonus || 0}/5\n`;
      description += `- Final-Score: ${_kalkulatorScoring.finalScore || 0}/40\n`;
      description += `- Empfohlene Aktion: ${_kalkulatorScoring.action || 'Keine Aktion'}\n`;
      description += `- Nurturing-Sequenz: ${_kalkulatorScoring.nurturingSequence || 'standard-nurturing'}\n`;
      description += `- Priorität: ${_kalkulatorScoring.priority || 'low'}\n`;
      description += `- Geschätzter Wert: ${_kalkulatorScoring.estimatedValue || 0}€\n`;
      description += `- Vollständig: ${_kalkulatorScoring.isComplete ? 'Ja' : 'Nein'}\n`;
    }
    
    if (_genehmigungScoring && funnel.type === 'genehmigung') {
      description += `\n🎯 GENEHMIGUNGS-CHECK-SCORING:\n`;
      description += `- Kategorie: ${_genehmigungScoring.category || 'Nicht bewertet'}\n`;
      description += `- Final-Score: ${_genehmigungScoring.totalScore || 0}/140\n`;
      description += `- Empfohlene Aktion: ${_genehmigungScoring.action || 'Keine Aktion'}\n`;
      description += `- Priorität: ${_genehmigungScoring.priority || 'low'}\n`;
      description += `- Genehmigungswahrscheinlichkeit: ${_genehmigungScoring.genehmigungswahrscheinlichkeit || 0}%\n`;
    }
    
    if (_bauzeitScoring && funnel.type === 'bauzeit-planung') {
      description += `\n🎯 BAUZEITPLANER-SCORING:\n`;
      description += `- Kategorie: ${_bauzeitScoring.category || 'Nicht bewertet'}\n`;
      description += `- Final-Score: ${_bauzeitScoring.totalScore || 0}/95\n`;
      description += `- Empfohlene Aktion: ${_bauzeitScoring.action || 'Keine Aktion'}\n`;
      description += `- Geschätzte Bauzeit: ${_bauzeitScoring.geschaetzteBauzeit || 'Unbekannt'}\n`;
    }
    
    description += `\n📞 KONTAKTDATEN:\n`;
    description += `- Name: ${contact.firstName} ${contact.lastName}\n`;
    description += `- E-Mail: ${contact.email}\n`;
    description += `- Telefon: ${contact.phone || 'Nicht angegeben'}\n`;
    description += `- PLZ: ${contact.zipCode || company?.zipCode || 'Nicht angegeben'}\n`;
    description += `- Stadt: ${contact.city || company?.city || 'Nicht angegeben'}\n`;
    description += `- Newsletter: ${contact.newsletter ? 'Ja' : 'Nein'}\n`;
    description += `- Datenschutz: ${contact.privacy ? 'Zugestimmt' : 'Nicht zugestimmt'}\n`;
    
    return description;
  }

  /**
   * Generiert Lead-Beschreibung
   */
  generateLeadDescription(funnelData) {
    const { funnel, leadScore } = funnelData;
    
    let description = `Lead aus ${funnel.type} Funnel\n\n`;
    description += `Lead Score: ${leadScore?.score || 0}\n`;
    description += `Priorität: ${leadScore?.priority || 'P4'}\n`;
    description += `Geschätzter Wert: ${funnelData.estimatedPrice || 0}€\n`;
    
    if (funnel.type === 'partner') {
      description += `\nPartner-Details:\n`;
      description += `- Partner-Typ: ${funnelData.partnerDetails?.partnerType || 'Nicht angegeben'}\n`;
      description += `- Erfahrung: ${funnelData.partnerDetails?.experience || 'Nicht angegeben'}\n`;
      description += `- Spezialisierungen: ${funnelData.partnerDetails?.specialties?.join(', ') || 'Keine'}\n`;
      description += `- Arbeitsgebiet: ${funnelData.partnerDetails?.workingArea || 'Nicht angegeben'}\n`;
      description += `- Referenzen: ${funnelData.partnerDetails?.references?.filter(r => r.description).length || 0} angegeben\n`;
    }
    
    return description;
  }

  /**
   * Mappt Lead-Score Priorität zu ZOHO Desk Priorität
   */
  mapPriority(priority) {
    const priorityMap = {
      'P1': 'High',
      'P2': 'Medium', 
      'P3': 'Medium',
      'P4': 'Low'
    };
    return priorityMap[priority] || 'Low';
  }

  /**
   * Bestimmt Department ID basierend auf Funnel-Typ
   */
  getDepartmentId(funnelType) {
    const departmentMap = {
      'kalkulator': process.env.ZOHO_DEPT_KALKULATOR,
      'express-angebot': process.env.ZOHO_DEPT_EXPRESS,
      'planer': process.env.ZOHO_DEPT_PLANER,
      'genehmigung': process.env.ZOHO_DEPT_GENEHMIGUNG,
      'bauzeit-planung': process.env.ZOHO_DEPT_BAUZEIT,
      'partner-werden': process.env.ZOHO_DEPT_PARTNER || process.env.ZOHO_DEPT_DEFAULT,
      'gewerbe': process.env.ZOHO_DEPT_GEWERBE || process.env.ZOHO_DEPT_DEFAULT
    };
    return departmentMap[funnelType] || process.env.ZOHO_DEPT_DEFAULT || process.env.ZOHO_DEPARTMENT_ID;
  }

  /**
   * Bestimmt Assignee ID basierend auf Funnel-Typ und Lead-Score
   */
  getAssigneeId(funnelType, leadScore) {
    if (leadScore?.priority === 'P1' || leadScore?.priority === 'P2') {
      return process.env.ZOHO_ASSIGNEE_SENIOR;
    }
    
    const assigneeMap = {
      'kalkulator': process.env.ZOHO_ASSIGNEE_KALKULATOR,
      'express-angebot': process.env.ZOHO_ASSIGNEE_EXPRESS,
      'planer': process.env.ZOHO_ASSIGNEE_PLANER,
      'genehmigung': process.env.ZOHO_ASSIGNEE_GENEHMIGUNG,
      'bauzeit-planung': process.env.ZOHO_ASSIGNEE_BAUZEIT,
      'partner-werden': process.env.ZOHO_ASSIGNEE_PARTNER || process.env.ZOHO_ASSIGNEE_DEFAULT,
      'gewerbe': process.env.ZOHO_ASSIGNEE_GEWERBE || process.env.ZOHO_ASSIGNEE_DEFAULT
    };
    
    return assigneeMap[funnelType] || process.env.ZOHO_ASSIGNEE_DEFAULT;
  }

  /**
   * Verarbeitet komplette Funnel-Daten und erstellt alle ZOHO-Einträge
   */
  async processFunnelData(funnelData) {
    try {
      const results = {
        desk: null,
        crmLead: null,
        crmContact: null,
        errors: []
      };

      try {
        results.desk = await this.createDeskTicket(funnelData);
        console.log('ZOHO Desk ticket created:', results.desk.ticketId);
      } catch (error) {
        results.errors.push({ type: 'desk', error: error.message });
      }

      try {
        results.crmLead = await this.createCRMLead(funnelData);
        console.log('ZOHO CRM lead created:', results.crmLead.leadId);
      } catch (error) {
        results.errors.push({ type: 'crmLead', error: error.message });
      }

      try {
        results.crmContact = await this.createCRMContact(funnelData);
        console.log('ZOHO CRM contact created:', results.crmContact.contactId);
      } catch (error) {
        results.errors.push({ type: 'crmContact', error: error.message });
      }

      return {
        success: results.errors.length === 0,
        results,
        message: results.errors.length === 0 
          ? 'Alle ZOHO-Einträge erfolgreich erstellt'
          : `ZOHO-Integration teilweise erfolgreich. Fehler: ${results.errors.length}`
      };

    } catch (error) {
      console.error('Error processing funnel data:', error);
      throw error;
    }
  }
}

export default ZohoIntegration;