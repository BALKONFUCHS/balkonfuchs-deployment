/**
 * NETLIFY FUNCTION: ZOHO DESK & CRM INTEGRATION
 * 
 * Diese Netlify Function empfängt Funnel-Daten und überträgt sie an Zoho Desk (Tickets) und Zoho CRM (Leads/Kontakte)
 * 
 * Umgebungsvariablen:
 * - ZOHO_ORG_ID: Zoho Organization ID
 * - ZOHO_REFRESH_TOKEN: Zoho Refresh Token
 * - ZOHO_CLIENT_ID: Zoho Client ID
 * - ZOHO_CLIENT_SECRET: Zoho Client Secret
 * - ZOHO_DEPARTMENT_ID: Zoho Department ID (optional)
 */

const axios = require('axios');
const { calculatePlanerPrice } = require('./send-to-zoho-regional-helpers');

exports.handler = async (event, context) => {
  // Logging des Raw Requests
  console.log('=== RAW REQUEST ===');
  console.log('Body:', event.body);
  console.log('Parsed data:', JSON.parse(event.body));

  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // OPTIONS Request für CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Nur POST erlauben
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed. Use POST.',
      }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');

    // Express-Angebot: eingehendes Payload in Standardform normalisieren
    if (body.funnel === 'express-angebot' && body.data) {
      const d = body.data || {};
      body.contact = {
        firstName: d.contact?.firstName || '',
        lastName: d.contact?.lastName || '',
        salutation: d.contact?.salutation || '',
        email: d.contact?.email || '',
        phone: d.contact?.phone || '',
        address: d.contact?.address || '',
        city: d.contact?.city || '',
        zipCode: d.contact?.zipCode || ''
      };
      body.funnel = { type: 'express-angebot', name: 'Express-Angebot' };
      body.funnelType = 'Express-Angebot';
      body.source = 'BALKONFUCHS Express-Angebot';
      body.funnelData = {
        approvalStatus: d.approvalStatus,
        timeframe: d.timeframe,
        projectData: d.projectData,
        budget: d.budget,
        balconyType: d.balconyDetails?.type,
        balconyWidth: d.balconyDetails?.size?.width,
        balconyDepth: d.balconyDetails?.size?.depth,
        balconyCount: d.balconyDetails?.count,
        extras: d.execution || d.extras || [],
        additionalInfo: d.additionalInfo,
        offerCount: d.offerPreferences?.count,
        offerRegion: d.offerPreferences?.region,
        contactPreference: d.contactPreference,
        city: d.contact?.city,
        plz: d.contact?.zipCode
      };
      // Stelle sicher, dass zusätzliche Info als Nachricht in Zoho angezeigt wird
      if (!body.message && d.additionalInfo) {
        body.message = String(d.additionalInfo);
      }
    }

    // Gewerbe-Funnel: eingehendes Payload in Standardform normalisieren
    if (body.funnelData && body.funnelData.funnelType === 'gewerbe' && body.funnelData.contact) {
      const gw = body.funnelData;
      // Extract contact from nested structure
      if (gw.contact) {
        body.contact = {
          firstName: gw.contact.firstName || '',
          lastName: gw.contact.lastName || '',
          salutation: gw.contact.salutation || '',
          email: gw.contact.email || '',
          phone: gw.contact.phone || '',
          address: gw.contact.address || '',
          city: gw.contact.city || '',
          zipCode: gw.contact.zipCode || ''
        };
      }
      // Extract funnelData from nested structure (always overwrite if nested)
      if (gw.funnelData) {
        body.funnelData = {
          projekttyp: gw.funnelData.projekttyp || '',
          projektname: gw.funnelData.projektname || '',
          projektort: gw.funnelData.projektort || '',
          projektadresse: gw.funnelData.projektadresse || '',
          anzahlEinheiten: gw.funnelData.anzahlEinheiten || '',
          balkontyp: gw.funnelData.balkontyp || [],
          zeitrahmen: gw.funnelData.zeitrahmen || '',
          budgetrahmen: gw.funnelData.budgetrahmen || '',
          budgetFreitext: gw.funnelData.budgetFreitext || '',
          startMonat: gw.funnelData.startMonat || '',
          startJahr: gw.funnelData.startJahr || '',
          endMonat: gw.funnelData.endMonat || '',
          endJahr: gw.funnelData.endJahr || '',
          firmenname: gw.funnelData.firmenname || '',
          ansprechpartner: gw.funnelData.ansprechpartner || '',
          position: gw.funnelData.position || '',
          projektleiter: gw.funnelData.projektleiter || '',
          nachricht: gw.funnelData.nachricht || ''
        };
      }
      // Extract company from nested structure
      if (gw.company) {
        body.company = {
          name: gw.company.name || '',
          legalForm: gw.company.legalForm || '',
          employeeCount: gw.company.employeeCount || '',
          website: gw.company.website || '',
          address: gw.company.address || '',
          zipCode: gw.company.zipCode || '',
          city: gw.company.city || ''
        };
      }
      // Set funnel metadata
      if (!body.funnel) {
        body.funnel = { type: 'gewerbe', name: 'Gewerbeprojekte Funnel' };
      }
      if (!body.funnelType) {
        body.funnelType = 'gewerbe';
      }
      if (!body.source) {
        body.source = 'BALKONFUCHS Gewerbeprojekte';
      }
      // Extract leadScore and estimatedPrice if available
      if (gw.leadScore) {
        body.leadScore = gw.leadScore;
      }
      if (gw.estimatedPrice !== undefined) {
        body.estimatedPrice = gw.estimatedPrice;
      }
      // Ensure additional message is set
      if (!body.message && gw.funnelData?.nachricht) {
        body.message = String(gw.funnelData.nachricht);
      }
    }

    // WICHTIG: contact, funnelData etc. NACH der Normalisierung extrahieren!
    const { contact, funnelData, funnel, source, funnelType, calculation } = body;

    // Preisberechnung für Planer-Funnel (wenn noch nicht vorhanden)
    if ((funnelType === 'planer' || funnel?.type === 'planer') && !body.priceCalculation) {
      const planerPriceCalc = calculatePlanerPrice(funnelData, contact);
      if (planerPriceCalc) {
        body.priceCalculation = planerPriceCalc;
      }
    }

    // Sicherstellen, dass wichtige Preisberechnungswerte für das Zoho-Mapping bereitstehen
    // Viele Custom Fields erwarten aktuell Werte aus body.mappedData.*
    // Wir spiegeln daher fehlende Werte aus priceCalculation hinein, falls vorhanden
    const priceCalc = body.priceCalculation || {};
    body.mappedData = body.mappedData || {};
    if (priceCalc.basePrice !== undefined && body.mappedData.basispreis === undefined) {
      body.mappedData.basispreis = priceCalc.basePrice;
    }
    if (priceCalc.regionalFactor !== undefined && body.mappedData.regionalfaktor === undefined) {
      body.mappedData.regionalfaktor = `${priceCalc.regionalFactor}x`;
    }
    if (priceCalc.regionalCategory !== undefined && body.mappedData.regionalCategory === undefined) {
      body.mappedData.regionalCategory = priceCalc.regionalCategory;
    }
    if (priceCalc.regionalRegion !== undefined && body.mappedData.regionalRegion === undefined) {
      body.mappedData.regionalRegion = priceCalc.regionalRegion;
    }
    if (priceCalc.regionalBundesland !== undefined && body.mappedData.regionalBundesland === undefined) {
      body.mappedData.regionalBundesland = priceCalc.regionalBundesland;
    }

    // Validierung der eingehenden Daten
    if (!contact && !funnelData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Kontakt- oder Funnel-Daten fehlen',
        }),
      };
    }

    // Kombiniere alle verfügbaren Daten für Zoho
    const combinedData = {
      // Kontaktdaten
      name: contact ? `${contact.firstName} ${contact.lastName}`.trim() : 'Unbekannt',
      email: contact?.email || '',
      phone: contact?.phone || '',
      company: contact?.company || '',
      plz: contact?.plz || funnelData?.plz || '',
      city: contact?.city || funnelData?.city || '',
      
      // Funnel-Daten
      balkonTyp: funnelData?.balconyType || funnelData?.balkonTyp || 'Nicht angegeben',
      balkonFlaeche: funnelData?.balconyWidth && funnelData?.balconyDepth 
        ? `${funnelData.balconyWidth} x ${funnelData.balconyDepth} m` 
        : 'Nicht angegeben',
      budget: funnelData?.budget || '',
      zeitplan: funnelData?.zeitplan || '',
      source: source || funnelType || 'Website',
      message: funnelData?.message || body?.message || 'Keine zusätzliche Nachricht',
      // Verwende, wenn vorhanden, den endgültigen Gesamtpreis aus der Preisberechnung
      // Fallback: bisheriger calculation-Wert
      calculation: (body?.priceCalculation?.finalPrice ?? calculation) || null,
      
      // Zusatzausstattung/Sonderleistungen (vereinheitlicht + gemappt)
      zusatzausstattung: (() => {
        const rawExtras = Array.isArray(funnelData?.extras) ? funnelData.extras.slice() : [];
        const mappedExtras = Array.isArray(body?.mappedData?.zusatzleistungen)
          ? body.mappedData.zusatzleistungen
          : [];
        const all = Array.from(new Set([...(rawExtras || []), ...(mappedExtras || [])]));
        if (all.length === 0) return 'Keine';
        const labels = {
          standard_gelaender: 'Standard-Geländer',
          premium_gelaender: 'Premium-Geländer',
          seitenschutz: 'Seitlicher Windschutz',
          bodenbelag: 'Bodenbelag',
          balkontuer: 'Balkontür',
          treppe: 'Treppe',
          ueberdachung: 'Überdachung'
        };
        return all.map(k => labels[k] || k).join(', ');
      })(),
      
      // Genehmigungsfunnel-spezifische Daten
      bundesland: funnelData?.bundesland || '',
      projekttyp: funnelData?.projekttyp || '',
      groesse: funnelData?.groesse || '',
      tiefe: funnelData?.tiefe || '',
      grenzabstand: funnelData?.grenzabstand || '',
      genehmigungsstatus: funnelData?.ergebnis?.status || '',
      genehmigungsverfahren: funnelData?.ergebnis?.verfahrenstyp || '',
      genehmigungsgrund: funnelData?.ergebnis?.grund || '',
      genehmigungskosten: funnelData?.ergebnis?.kosten || '',
      genehmigungsdauer: funnelData?.ergebnis?.dauer || '',
      genehmigungsnaechsteSchritte: funnelData?.ergebnis?.naechsteSchritte ? funnelData.ergebnis.naechsteSchritte.join(', ') : '',
      
      // Planer-spezifische Daten
      projectStatus: funnelData?.projectStatus || '',
      timeframe: funnelData?.timeframe || '',
      ownership: funnelData?.ownership || '',
      balconyType: funnelData?.balconyType || '',
      balconyCount: funnelData?.balconyCount || '',
      wallMaterial: funnelData?.wallMaterial || '',
      basement: funnelData?.basement || '',
      floor: funnelData?.floor || '',
      size: funnelData?.size ? `${funnelData.size.width}x${funnelData.size.depth}` : '',
      accessibility: funnelData?.accessibility || '',
      balconyFloor: funnelData?.balconyFloor || '',
      railing: funnelData?.railing || '',
      surface: funnelData?.surface || '',
      documents: funnelData?.documents ? funnelData.documents.join(', ') : '',
      additionalInfo: funnelData?.additionalInfo || '',
      offerCount: funnelData?.offerPreferences?.count || '',
      offerRegion: funnelData?.offerPreferences?.region || '',
      
      // Gewerbefunnel-spezifische Daten
      projekttyp: funnelData?.projekttyp || '',
      projektname: funnelData?.projektname || '',
      projektort: funnelData?.projektort || '',
      projektadresse: funnelData?.projektadresse || '',
      anzahlEinheiten: funnelData?.anzahlEinheiten || '',
      balkontyp: funnelData?.balkontyp ? funnelData.balkontyp.join(', ') : '',
      zeitrahmen: funnelData?.zeitrahmen || '',
      budgetrahmen: funnelData?.budgetrahmen || '',
      budgetFreitext: funnelData?.budgetFreitext || '',
      startMonat: funnelData?.startMonat || '',
      startJahr: funnelData?.startJahr || '',
      endMonat: funnelData?.endMonat || '',
      endJahr: funnelData?.endJahr || '',
      firmenname: funnelData?.firmenname || '',
      ansprechpartner: funnelData?.ansprechpartner || '',
      position: funnelData?.position || '',
      projektleiter: funnelData?.projektleiter || '',
      nachricht: funnelData?.nachricht || '',
      
      // Checkbox-Zustände
      datenschutzConsent: funnelData?.datenschutzConsent || false,
      newsletterConsent: funnelData?.newsletterConsent || false,
      
      // Preisberechnung (falls vorhanden)
      priceCalculation: body?.priceCalculation || null,
      
      // Funnel-spezifische Zusammenfassung erstellen
      funnelSummary: createFunnelSummary(funnelType || funnel?.type, funnelData, contact, body, calculation),
      
      // Lead Score aus verschiedenen Scoring-Systemen extrahieren
      // WICHTIG: Gewerbe-Funnel hat leadScore bereits in body.leadScore oder body.funnelData.leadScore
      // Diese haben Priorität vor extractLeadScore/extractCategory/extractPriority
      leadScore: body.leadScore?.totalScore || body.funnelData?.leadScore?.totalScore || extractLeadScore(body),
      category: body.leadScore?.category || body.funnelData?.leadScore?.category || extractCategory(body),
      priority: body.leadScore?.priority || body.funnelData?.leadScore?.priority || extractPriority(body),
      
      // Funnel-spezifische Scoring-Daten
      funnelScoring: extractFunnelScoring(funnelType || funnel?.type, body),
      // Geschätzter Wert aus funnel-spezifischem Scoring extrahieren
      estimatedValue: extractEstimatedValue(body, funnelType || funnel?.type),
      
      // Mapped Data für zusätzliche Informationen
      mappedData: body.mappedData || {},
    };
    
    // Normalisiere funnelType für PDF-Generierung
    const normalizedFunnelType = ((funnelType || funnel?.type) || '').toLowerCase();

    // Umgebungsvariablen prüfen
    const orgId = process.env.ZOHO_ORG_ID;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const departmentId = process.env.ZOHO_DEPARTMENT_ID;

    if (!orgId || !refreshToken || !clientId || !clientSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Zoho-Konfiguration fehlt. ZOHO_ORG_ID, ZOHO_REFRESH_TOKEN, ZOHO_CLIENT_ID und ZOHO_CLIENT_SECRET müssen gesetzt sein.',
        }),
      };
    }

    // Log combinedData für Debugging
    console.log('=== COMBINED DATA ===');
    console.log('Combined Data:', combinedData);
    console.log('=== CALCULATION DETAILS ===');
    console.log('Calculation:', calculation);
    console.log('Estimated Value:', body._kalkulatorScoring?.estimatedValue);
    console.log('Lead Score:', body._internalScoring?.leadScore);
    console.log('Final Score:', body._kalkulatorScoring?.finalScore);
    console.log('=== CONTACT DETAILS ===');
    console.log('Contact:', contact);
    console.log('Email:', contact?.email);
    console.log('Phone:', contact?.phone);
    console.log('=== CUSTOM FIELDS MAPPING ===');
    console.log('E-Mail Field:', combinedData.email);
    console.log('Tel. Field:', combinedData.phone);
    console.log('Postleitzahl:', combinedData.plz);
    console.log('=== MAPPED DATA ===');
    console.log('Mapped Data:', body.mappedData);
    console.log('Extras:', funnelData?.extras);

    // Access Token mit Refresh Token generieren
    const accessToken = await refreshAccessToken(refreshToken, clientId, clientSecret);
    
    if (!accessToken) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Fehler beim Generieren des Access Tokens',
        }),
      };
    }

    // Zoho Desk Ticket erstellen
    let deskResult = null;
    console.log('=== STARTING ZOHO DESK TICKET CREATION ===');
    console.log('Org ID:', orgId);
    console.log('Department ID:', departmentId);
    console.log('Has Access Token:', !!accessToken);
    
    try {
      deskResult = await createZohoDeskTicket(combinedData, orgId, accessToken, departmentId, body, funnelData, normalizedFunnelType, contact);
      console.log('=== DESK RESULT ===');
      console.log('Desk Result Success:', deskResult?.success);
      console.log('Desk Result Ticket ID:', deskResult?.ticketId);
      console.log('Full Desk Result:', JSON.stringify(deskResult, null, 2));
      
      if (!deskResult?.success) {
        console.error('=== DESK RESULT FAILED ===');
        console.error('Desk Result Error:', deskResult?.error);
        console.error('Desk Result Details:', deskResult?.details);
        console.error('Desk Result Status:', deskResult?.status);
      }
      
      // PDF-Generierung vorübergehend deaktiviert (Zoho Desk Upload-API noch nicht implementiert)
      // TODO: Implementiere PDF-Anhang-Funktionalität mit Zoho Desk Upload-API
    } catch (deskError) {
      console.error('=== DESK ERROR ===');
      console.error('Desk Error:', deskError);
      deskResult = {
        success: false,
        error: deskError.message,
        details: deskError
      };
    }
    
    // Zoho CRM Lead erstellen
    let crmResult = null;
    try {
      crmResult = await createZohoCRMLead(combinedData, accessToken, body, contact, funnelData);
      console.log('=== CRM RESULT ===');
      console.log('CRM Result:', crmResult);
    } catch (crmError) {
      console.error('=== CRM ERROR ===');
      console.error('CRM Error:', crmError);
      crmResult = {
        success: false,
        error: crmError.message,
        details: crmError
      };
    }

    // Erfolgreiche Antwort
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Daten erfolgreich an Zoho übertragen',
        results: {
          desk: deskResult,
          crm: crmResult,
        },
        timestamp: new Date().toISOString(),
      }),
    };

  } catch (error) {
    console.error('Zoho API Fehler:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Interner Server-Fehler',
        message: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

/**
 * Generiert einen neuen Access Token mit dem Refresh Token
 */
async function refreshAccessToken(refreshToken, clientId, clientSecret) {
  try {
    console.log('=== ZOHO TOKEN REFRESH REQUEST ===');
    console.log('URL:', 'https://accounts.zoho.eu/oauth/v2/token');
    console.log('Headers:', {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log('Body:', {
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: '[HIDDEN]',
      grant_type: 'refresh_token',
      scope: 'Desk.tickets.ALL Desk.contacts.ALL ZohoCRM.modules.ALL ZohoCRM.users.ALL'
    });
    
    const response = await axios.post(
      'https://accounts.zoho.eu/oauth/v2/token',
      new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        scope: 'Desk.tickets.ALL Desk.contacts.ALL ZohoCRM.modules.ALL ZohoCRM.users.ALL'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('=== ZOHO TOKEN REFRESH RESPONSE ===');
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    if (response.data && response.data.access_token) {
      console.log('Access Token erfolgreich generiert');
      return response.data.access_token;
    } else {
      throw new Error('Keine Access Token in der Antwort');
    }
  } catch (error) {
    console.error('Fehler beim Generieren des Access Tokens:', error.response?.data || error.message);
    throw new Error(`Token-Generierung fehlgeschlagen: ${error.message}`);
  }
}

/**
 * Erstellt ein Ticket in Zoho Desk
 */
async function createZohoDeskTicket(combinedData, orgId, accessToken, departmentId, body, funnelData, funnelType, contact) {
  try {
    const clean = (val) => (val || '').toString().replace(/\s+/g, ' ').replace(/[\s,.]+$/g, '').trim();
    const street = clean(contact?.address);
    const zip = clean((contact?.zipCode || combinedData.plz || '').toString().replace(/[^0-9]/g, ''));
    const city = clean(contact?.city || combinedData.city);
    const cityLine = [zip, city].filter(Boolean).join(' ').trim();
    const deliveryAddress = [street, cityLine].filter(Boolean).join(', ');
    
    // Normalisiere funnelType für cf_lieferadresse Check
    const normalizedFunnelType = ((funnelType || body.funnel?.type) || '').toLowerCase();

    const ticketData = {
      subject: `Balkon-Anfrage von ${combinedData.name || 'Unbekannt'}`,
      description: combinedData.funnelSummary || formatTicketDescription(combinedData, body.priceCalculation),
      priority: 'Medium',
      status: 'Open',
      channel: 'Web',
      contact: {
        firstName: (contact?.firstName || combinedData.name?.split(' ')[0] || 'Unbekannt').trim(),
        lastName: (contact?.lastName || combinedData.name?.split(' ').slice(1).join(' ') || (combinedData.email ? 'Kunde' : '')).trim() || 'Kunde',
        email: (contact?.email || combinedData.email || '').trim() || 'kunde@balkonfuchs.de',
        phone: (contact?.phone || combinedData.phone || '').trim() || '',
      },
      customFields: {
        // Basis-Felder (korrekte API-Namen aus cf-Objekt)
        'cf_geschatzter_projektwerk': combinedData.estimatedValue || combinedData.calculation || '',
        'cf_funnel_typ': funnelType || body.funnel?.type || 'Unbekannt',
        'cf_begrussung': contact?.salutation || '',
        'cf_vorname': contact?.firstName || '',
        'cf_nachname': contact?.lastName || '',
        'cf_email': contact?.email || combinedData.email || '',
        'cf_telefon': contact?.phone || combinedData.phone || '',
        'cf_mobil': contact?.phone || combinedData.phone || '',
        'cf_produkt_name': 'Balkon',
        // Temporär: Lieferadresse für Express-Angebot, Planer- und Gewerbe-Funnel nicht senden (Zoho-CF-Validierung)
        ...(normalizedFunnelType !== 'express-angebot' && normalizedFunnelType !== 'planer' && normalizedFunnelType !== 'gewerbe' && deliveryAddress
          ? { 'cf_lieferadresse': deliveryAddress }
          : {}),
        'cf_lead_score': combinedData.leadScore || '',
        'cf_lead_kategorie': combinedData.category || '',
        'cf_dringlichkeit': combinedData.priority || '',
        'cf_geschatzter_wert': combinedData.estimatedValue || '',
        
        // Funnel-spezifische Scoring-Details
        'cf_funnel_scoring_details': JSON.stringify(combinedData.funnelScoring || {}),
        
        // Kalkulator-spezifische Scoring-Felder
        'cf_kalkulator_basis_score': combinedData.funnelScoring?.baseScore || '',
        'cf_kalkulator_completion_bonus': combinedData.funnelScoring?.completionBonus || '',
        'cf_kalkulator_nurturing_sequence': combinedData.funnelScoring?.nurturingSequence || '',
        'cf_kalkulator_action': combinedData.funnelScoring?.action || '',
        
        // Planer-spezifische Scoring-Felder
        'cf_planer_block1_score': combinedData.funnelScoring?.block1Score || '',
        'cf_planer_block2_score': combinedData.funnelScoring?.block2Score || '',
        'cf_planer_block3_score': combinedData.funnelScoring?.block3Score || '',
        'cf_planer_block4_score': combinedData.funnelScoring?.block4Score || '',
        'cf_planer_response_time': combinedData.funnelScoring?.responseTime || '',
        'cf_planer_beratungs_readiness': combinedData.funnelScoring?.beratungsReadiness || '',
        
        // Bauzeit-Planung-spezifische Scoring-Felder
        'cf_bauzeit_geschatzte_bauzeit': combinedData.funnelScoring?.geschaetzteBauzeit || '',
        
        // Genehmigungscheck-spezifische Scoring-Felder
        'cf_genehmigung_wahrscheinlichkeit': combinedData.funnelScoring?.genehmigungswahrscheinlichkeit || '',
        
        // Gewerbefunnel-spezifische Felder
        'cf_projekttyp': combinedData.projekttyp || '',
        'cf_projektname': combinedData.projektname || '',
        'cf_projektort': combinedData.projektort || '',
        'cf_projektadresse': combinedData.projektadresse || '',
        'cf_anzahl_einheiten': combinedData.anzahlEinheiten || '',
        'cf_balkontyp': combinedData.balkontyp || '',
        'cf_zeitrahmen': combinedData.zeitrahmen || '',
        'cf_budgetrahmen': combinedData.budgetrahmen || '',
        'cf_budget_freitext': combinedData.budgetFreitext || '',
        'cf_start_monat': combinedData.startMonat || '',
        'cf_start_jahr': combinedData.startJahr || '',
        'cf_end_monat': combinedData.endMonat || '',
        'cf_end_jahr': combinedData.endJahr || '',
        'cf_firmenname': combinedData.firmenname || '',
        'cf_ansprechpartner': combinedData.ansprechpartner || '',
        'cf_position': combinedData.position || '',
        'cf_projektleiter': combinedData.projektleiter || '',
        'cf_nachricht': combinedData.nachricht || '',
        
        // Balkon-spezifische Felder (neue cf-Felder)
        'cf_balkon_flaeche': combinedData.balkonFlaeche || '',
        'cf_balkon_typ': combinedData.balkonTyp || '',
        'cf_anzahl_balkone': funnelData?.balconyCount || 1,
        'cf_breite': funnelData?.balconyWidth || '',
        'cf_tiefe': funnelData?.balconyDepth || '',
        
        // Extras/Zusatzleistungen
        'cf_standard_gelaender': funnelData?.extras?.includes('standard_gelaender') ? 'Ja' : 'Nein',
        'cf_premium_gelaender': funnelData?.extras?.includes('premium_gelaender') ? 'Ja' : 'Nein',
        'cf_seitenschutz': funnelData?.extras?.includes('seitenschutz') ? 'Ja' : 'Nein',
        'cf_bodenbelag': funnelData?.extras?.includes('bodenbelag') ? 'Ja' : 'Nein',
        'cf_balkontuer': funnelData?.extras?.includes('balkontuer') ? 'Ja' : 'Nein',
        'cf_treppe': funnelData?.extras?.includes('treppe') ? 'Ja' : 'Nein',
        
        // Berechnungen (korrigiert - verwende priceCalculation falls vorhanden)
        'cf_gesamtpreis': body.priceCalculation?.finalPrice || combinedData.calculation || '',
        'cf_basispreis': body.priceCalculation?.basePrice || body.mappedData?.basispreis || '',
        'cf_regionalfaktor': body.priceCalculation?.regionalFactor 
          ? `${body.priceCalculation.regionalFactor}x` 
          : (body.mappedData?.regionalfaktor || '1.0x'),

        // Regionale Details (neue Felder – können in Zoho nachträglich angelegt werden)
        'cf_regionalCategory': body.priceCalculation?.regionalCategory || body.mappedData?.regionalCategory || '',
        'cf_regionalRegion': body.priceCalculation?.regionalRegion || '',
        'cf_regionalBundesland': body.priceCalculation?.regionalBundesland || '',
        
        // Metadaten
        'cf_funnel_quelle': combinedData.source || 'Website',
        'cf_zusammenfassung': combinedData.kalkulatorSummary || combinedData.message || 'Keine zusätzliche Nachricht',
        'cf_kalkulator_ergebnis': combinedData.calculation || '',
        
        // Budget und Zeitplan (falls vorhanden)
        'cf_budget': combinedData.budget || '',
        'cf_zeitplan': combinedData.zeitplan || '',
        
        // Zusatzausstattung/Sonderleistungen
        'cf_zusatzausstattung': combinedData.zusatzausstattung || (Array.isArray(funnelData?.extras) && funnelData.extras.length ? funnelData.extras.join(', ') : 'Keine'),
        'cf_standard_gelaender': funnelData?.extras?.includes('standard_gelaender') ? 'Ja' : 'Nein',
        'cf_premium_gelaender': funnelData?.extras?.includes('premium_gelaender') ? 'Ja' : 'Nein',
        'cf_seitenschutz': funnelData?.extras?.includes('seitenschutz') ? 'Ja' : 'Nein',
        'cf_bodenbelag': funnelData?.extras?.includes('bodenbelag') ? 'Ja' : 'Nein',
        'cf_ueberdachung': funnelData?.extras?.includes('ueberdachung') ? 'Ja' : 'Nein',
        
        // Einwilligungen
        'cf_datenschutz_zustimmung': combinedData.datenschutzConsent ? 'Ja' : 'Nein',
        'cf_balkonbrief_bestellung': combinedData.newsletterConsent ? 'Ja' : 'Nein',
        
        // Funnel-spezifische Custom Fields
        'cf_funnel_zusammenfassung': combinedData.funnelSummary || '',
        
        // Genehmigungscheck-spezifische Felder
        'cf_bundesland': funnelData?.bundesland || '',
        'cf_projekttyp': funnelData?.projekttyp || '',
        'cf_groesse': funnelData?.groesse || '',
        'cf_tiefe': funnelData?.tiefe || '',
        'cf_grenzabstand': funnelData?.grenzabstand || '',
        'cf_genehmigung_ergebnis': funnelData?.ergebnis || '',
        
        // Planer-spezifische Felder
        'cf_projektstatus': combinedData.projectStatus || funnelData?.projectStatus || '',
        'cf_zeitrahmen': combinedData.timeframe || funnelData?.timeframe || '',
        'cf_eigentum': combinedData.ownership || funnelData?.ownership || '',
        'cf_wandmaterial': combinedData.wallMaterial || funnelData?.wallMaterial || '',
        'cf_balkontyp_planer': combinedData.balconyType || funnelData?.balconyType || '',
        'cf_groesse_planer': combinedData.size || funnelData?.size || '',
        'cf_budget': combinedData.budget || funnelData?.budget || '',
        'cf_keller': funnelData?.basement || '',
        'cf_etage': funnelData?.floor || '',
        'cf_zugaenglichkeit': funnelData?.accessibility || '',
        'cf_balkon_etage': funnelData?.balconyFloor || '',
        'cf_gelaender': funnelData?.railing || '',
        'cf_oberflaeche': funnelData?.surface || '',
        'cf_dokumente': funnelData?.documents || '',
        'cf_zusaetzliche_info': funnelData?.additionalInfo || '',
        
        // Bauzeit-Planung-spezifische Felder
        'cf_zielmonat': funnelData?.targetMonth || '',
        'cf_zieljahr': funnelData?.targetYear || '',
        'cf_projektphase': funnelData?.projectPhase || '',
        'cf_berechnetes_startdatum': funnelData?.calculation || '',
        
        // Partner-spezifische Felder
        'cf_firmenname': body.company?.name || '',
        'cf_rechtsform': body.company?.legalForm || '',
        'cf_gruendungsjahr': body.company?.foundedYear || '',
        'cf_mitarbeiteranzahl': body.company?.employeeCount || '',
        'cf_firmenstadt': body.company?.city || '',
        'cf_partner_typ': body.partnerDetails?.partnerType || '',
        'cf_erfahrung': body.partnerDetails?.experience || '',
        'cf_spezialitaeten': body.partnerDetails?.specialties?.join(', ') || '',
        'cf_arbeitsgebiet': body.partnerDetails?.workingArea || '',
        'cf_versicherungsstatus': body.partnerDetails?.insuranceStatus || '',
        'cf_referenzen': body.partnerDetails?.references || '',
        'cf_leuchtturmprojekt': body.partnerDetails?.lighthouseProject || '',
      },
    };

    // DepartmentId nur hinzufügen, wenn es gesetzt ist
    if (departmentId) {
      ticketData.departmentId = departmentId;
    }

    // Log Custom Fields für Debugging
    console.log('=== CUSTOM FIELDS DEBUG ===');
    console.log('cf_email Field Value:', ticketData.customFields['cf_email']);
    console.log('cf_telefon Field Value:', ticketData.customFields['cf_telefon']);
    console.log('cf_lieferadresse Field Value:', ticketData.customFields['cf_lieferadresse']);
    console.log('cf_funnel_typ Field Value:', ticketData.customFields['cf_funnel_typ']);
    console.log('cf_geschatzter_projektwerk Field Value:', ticketData.customFields['cf_geschatzter_projektwerk']);
    console.log('cf_regionalfaktor Field Value:', ticketData.customFields['cf_regionalfaktor']);
    console.log('cf_basispreis Field Value:', ticketData.customFields['cf_basispreis']);
    console.log('cf_zusammenfassung Field Value:', ticketData.customFields['cf_zusammenfassung']?.substring(0, 100) + '...');
    console.log('cf_zusatzausstattung Field Value:', ticketData.customFields['cf_zusatzausstattung']);
    console.log('cf_datenschutz_zustimmung Field Value:', ticketData.customFields['cf_datenschutz_zustimmung']);
    console.log('cf_balkonbrief_bestellung Field Value:', ticketData.customFields['cf_balkonbrief_bestellung']);
    console.log('Department ID:', departmentId);
    console.log('Org ID:', orgId);

    // Detailliertes Logging vor dem API Call
    console.log('=== ZOHO DESK REQUEST ===');
    console.log('URL:', 'https://desk.zoho.eu/api/v1/tickets');
    console.log('Headers:', {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
      'orgId': orgId,
    });
    console.log('Body:', ticketData);

    const response = await axios.post(
      `https://desk.zoho.eu/api/v1/tickets`,
      ticketData,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
          'orgId': orgId,
        },
      }
    );

    // Detailliertes Logging nach dem API Call
    console.log('=== ZOHO DESK RESPONSE ===');
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    return {
      success: true,
      ticketId: response.data.id,
      message: 'Ticket erfolgreich erstellt',
    };
  } catch (error) {
    console.error('=== ZOHO DESK ERROR DETAILS ===');
    console.error('Error Message:', error.message);
    console.error('Error Response:', error.response?.data);
    console.error('Error Status:', error.response?.status);
    console.error('Error Headers:', error.response?.headers);
    console.error('Full Error:', error);
    return {
      success: false,
      error: error.message,
      details: error.response?.data,
      status: error.response?.status,
    };
  }
}

/**
 * Erstellt einen Lead in Zoho CRM
 */
async function createZohoCRMLead(combinedData, accessToken, body, contact, funnelData) {
  try {
    const leadData = {
      data: [{
        First_Name: contact?.firstName || combinedData.name?.split(' ')[0] || 'Unbekannt',
        Last_Name: contact?.lastName || combinedData.name?.split(' ').slice(1).join(' ') || '',
        Email: contact?.email || combinedData.email,
        Phone: contact?.phone || combinedData.phone || '',
        Lead_Source: 'BALKONFUCHS Website',
        Company: contact?.company || combinedData.company || '',
        Mailing_City: contact?.city || funnelData?.city || '',
        Mailing_Code: contact?.plz || contact?.zipCode || combinedData.plz || '',
        Description: `Funnel-Details:\n${combinedData.funnelSummary || formatLeadDescription(combinedData, body.priceCalculation)}`,
        Custom_Fields: {
          'Lead_Score': combinedData.leadScore || '',
          'Geschätzter_Projektwert': combinedData.calculation || combinedData.budget || '',
          'Funnel_Typ': combinedData.funnelType || 'Unbekannt',
          'Balkon_Fläche': combinedData.balkonFlaeche || '',
          'Balkon_Typ': combinedData.balkonTyp || '',
          'Budget': combinedData.budget || '',
          'Zeitplan': combinedData.zeitplan || '',
          'Funnel_Quelle': combinedData.source || 'Website',
          'Dringlichkeit': combinedData.priority || 'P3',
          'Kategorie': combinedData.category || '',
        },
      }],
    };

    // Detailliertes Logging vor dem API Call
    console.log('=== ZOHO CRM REQUEST ===');
    console.log('URL:', 'https://www.zohoapis.eu/crm/v2/Leads');
    console.log('Headers:', {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    });
    console.log('Body:', leadData);

    const response = await axios.post(
      'https://www.zohoapis.eu/crm/v2/Leads',
      leadData,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Detailliertes Logging nach dem API Call
    console.log('=== ZOHO CRM RESPONSE ===');
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    return {
      success: true,
      leadId: response.data.data[0].details.id,
      message: 'Lead erfolgreich erstellt',
    };
  } catch (error) {
    console.error('Zoho CRM Fehler:', error.response?.data || error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Extrahiert den Lead Score aus verschiedenen Scoring-Systemen
 */
function extractLeadScore(body) {
  // Priorität: Neues System > Legacy System
  // Gewerbe-Funnel: leadScore kommt direkt aus body.leadScore oder body.funnelData.leadScore
  let baseScore = body.leadScore?.totalScore ||
         body.funnelData?.leadScore?.totalScore ||
         body._kalkulatorScoring?.finalScore ||
         body._partnerScoring?.finalScore ||
         body._planerScoring?.finalScore ||
         body._bauzeitScoring?.totalScore ||
         body._genehmigungScoring?.totalScore ||
         body._internalScoring?.leadScore ||
         body._internalScoring?.totalScore ||
         null;
  
  // Aggressiver Boost für seeking/approved Kunden im Planer-Funnel
  if (body.funnelData?.projectStatus === 'seeking' || body.funnelData?.projectStatus === 'approved') {
    // Wenn Kunde bereits Angebot will + ASAP, dann definitiv Hot Lead
    if (body.funnelData?.timeframe === 'asap' || body.funnelData?.timeframe === '3months') {
      baseScore = Math.max(baseScore || 0, 85); // Mindestens 85 für seeking + asap/3months
    } else {
      // Mindestens Warm Lead für seeking/approved
      baseScore = Math.max(baseScore || 0, 75);
    }
  }
  
  return baseScore;
}

/**
 * Extrahiert die Kategorie aus verschiedenen Scoring-Systemen
 */
function extractCategory(body) {
  // Gewerbe-Funnel: category kommt direkt aus body.leadScore oder body.funnelData.leadScore
  let category = body.leadScore?.category ||
         body.funnelData?.leadScore?.category ||
         body._kalkulatorScoring?.category ||
         body._partnerScoring?.category ||
         body._planerScoring?.category ||
         body._bauzeitScoring?.category ||
         body._genehmigungScoring?.category ||
         body._internalScoring?.category ||
         null;
  
  // Upgrade für seeking/approved Kunden im Planer-Funnel
  if (body.funnelData?.projectStatus === 'seeking' || body.funnelData?.projectStatus === 'approved') {
    // Wenn asap oder 3months Zeitrahmen, dann Hot Lead
    if (body.funnelData?.timeframe === 'asap' || body.funnelData?.timeframe === '3months') {
      category = 'Hot Lead';
    } else if (category && (category.toLowerCase().includes('cold') || category.toLowerCase() === 'cold lead')) {
      // Ansonsten mindestens Warm Lead
      category = 'Warm Lead';
    }
  }
  
  return category;
}

/**
 * Extrahiert die Priorität aus verschiedenen Scoring-Systemen
 */
function extractPriority(body) {
  // Gewerbe-Funnel: priority kommt direkt aus body.leadScore oder body.funnelData.leadScore
  let priority = body.leadScore?.priority ||
         body.funnelData?.leadScore?.priority ||
         body._kalkulatorScoring?.priority ||
         body._partnerScoring?.status ||
         body._planerScoring?.priority ||
         body._bauzeitScoring?.priority ||
         body._genehmigungScoring?.priority ||
         body._internalScoring?.priority ||
         null;
  
  // Konvertiere Genehmigungs-Priorität von 'high', 'medium', 'low' zu 'P1', 'P2', 'P3'
  if (body._genehmigungScoring?.priority) {
    const genehmigungPriority = body._genehmigungScoring.priority;
    if (genehmigungPriority === 'high') priority = 'P1';
    else if (genehmigungPriority === 'medium') priority = 'P2';
    else if (genehmigungPriority === 'low') priority = 'P3';
  }
  
  // Upgrade für seeking/approved Kunden im Planer-Funnel
  if (body.funnelData?.projectStatus === 'seeking' || body.funnelData?.projectStatus === 'approved') {
    // Wenn asap oder 3months, dann hohe Priorität
    if (body.funnelData?.timeframe === 'asap' || body.funnelData?.timeframe === '3months') {
      priority = 'P1'; // High priority für seeking + asap customers
    } else if (priority && (priority.toLowerCase().includes('low') || priority === 'P3' || priority === 'P4')) {
      priority = 'P2'; // Medium priority für seeking customers
    }
  }
  
  return priority;
}

/**
 * Extrahiert den geschätzten Wert aus funnel-spezifischem Scoring
 */
function extractEstimatedValue(body, funnelType) {
  if (!funnelType) return null;
  const normalizedType = (funnelType || '').toLowerCase();
  
  switch (normalizedType) {
    case 'kalkulator':
      return body._kalkulatorScoring?.estimatedValue || null;
    case 'planer':
      return body._planerScoring?.estimatedValue || null;
    case 'bauzeit-planung':
      return body._bauzeitScoring?.estimatedValue || null;
    case 'genehmigung':
      return body._genehmigungScoring?.estimatedValue || null;
    default:
      return body._kalkulatorScoring?.estimatedValue || 
             body._planerScoring?.estimatedValue || 
             null;
  }
}

/**
 * Extrahiert funnel-spezifische Scoring-Daten
 */
function extractFunnelScoring(funnelType, body) {
  switch (funnelType) {
    case 'kalkulator':
      return {
        baseScore: body._kalkulatorScoring?.baseScore,
        completionBonus: body._kalkulatorScoring?.completionBonus,
        estimatedValue: body._kalkulatorScoring?.estimatedValue,
        nurturingSequence: body._kalkulatorScoring?.nurturingSequence,
        action: body._kalkulatorScoring?.action
      };
    
    case 'partner':
      return {
        baseScore: body._partnerScoring?.baseScore,
        qualityMultiplier: body._partnerScoring?.qualityMultiplier,
        status: body._partnerScoring?.status,
        action: body._partnerScoring?.action,
        warnings: body._partnerScoring?.warnings
      };
    
    case 'planer':
      return {
        block1Score: body._planerScoring?.block1Score,
        block2Score: body._planerScoring?.block2Score,
        block3Score: body._planerScoring?.block3Score,
        block4Score: body._planerScoring?.block4Score,
        completionBonus: body._planerScoring?.completionBonus,
        estimatedValue: body._planerScoring?.estimatedValue,
        responseTime: body._planerScoring?.responseTime,
        beratungsReadiness: body._planerScoring?.beratungsReadiness
      };
    
    case 'bauzeit-planung':
      return {
        estimatedValue: body._bauzeitScoring?.estimatedValue,
        geschaetzteBauzeit: body._bauzeitScoring?.geschaetzteBauzeit
      };
    
    case 'genehmigung':
      return {
        estimatedValue: body._genehmigungScoring?.estimatedValue,
        genehmigungswahrscheinlichkeit: body._genehmigungScoring?.genehmigungswahrscheinlichkeit
      };
    
    default:
      return body._internalScoring || {};
  }
}

/**
 * Generiert eine detaillierte Partner-Empfehlung basierend auf dem Scoring
 */
function getPartnerRecommendation(scoringData) {
  if (!scoringData) {
    return '❌ Keine Scoring-Daten verfügbar';
  }

  const finalScore = scoringData.finalScore || scoringData.leadScore || 0;
  const category = scoringData.category || 'Unbekannt';
  const status = scoringData.status || 'unknown';
  const warnings = scoringData.warnings || [];

  let recommendation = '';
  let emoji = '';
  let priority = '';

  // Emoji und Priorität basierend auf Score
  if (finalScore >= 80) {
    emoji = '🟢';
    priority = 'HOCH';
    recommendation = '✅ SOFORTIGE FREIGABE EMPFOHLEN\n- Premium Partner-Qualität\n- Sofortiges Onboarding möglich\n- Hohe Erfolgswahrscheinlichkeit';
  } else if (finalScore >= 60) {
    emoji = '🟡';
    priority = 'MITTEL';
    recommendation = '✅ FREIGABE EMPFOHLEN\n- Standard Partner-Qualität\n- Standard-Onboarding durchführen\n- Gute Erfolgswahrscheinlichkeit';
  } else if (finalScore >= 40) {
    emoji = '🟠';
    priority = 'NIEDRIG';
    recommendation = '⚠️ MANUELLE PRÜFUNG ERFORDERLICH\n- Review-Status empfohlen\n- Rückfragen an Bewerber stellen\n- Zusätzliche Dokumente anfordern';
  } else if (finalScore >= 25) {
    emoji = '🔴';
    priority = 'SEHR NIEDRIG';
    recommendation = '⚠️ BEDINGTE ZULASSUNG\n- Nur mit Probeauftrag\n- Engmaschige Begleitung erforderlich\n- Risiko-Monitoring aktivieren';
  } else {
    emoji = '❌';
    priority = 'ABGELEHNT';
    recommendation = '❌ ABLEHNUNG EMPFOHLEN\n- Nicht qualifiziert als Partner\n- Verbesserungsvorschläge senden\n- Nach 6 Monaten erneut prüfen';
  }

  // Warnungen hinzufügen
  let warningText = '';
  if (warnings.length > 0) {
    warningText = '\n\n🚨 WARNUNGEN:\n' + warnings.map(w => `- ${w}`).join('\n');
  }

  return `${emoji} EMPFEHLUNG: ${priority}\n\n${recommendation}${warningText}\n\n📊 SCORE-DETAILS:\n- Final Score: ${finalScore}/100\n- Kategorie: ${category}\n- Status: ${status}`;
}

/**
 * Übersetzt Planer-Daten ins Deutsche
 */
function translatePlanerData(funnelData) {
  const translations = {
    // Projekt-Status
    'erste_ideen': 'Erste Ideen',
    'machbarkeit_pruefen': 'Machbarkeit prüfen',
    'bauantrag_laeuft': 'Bauantrag läuft',
    'genehmigung_da': 'Genehmigung liegt vor',
    'suche_firma': 'Suche nach Firma',
    
    // Zeitrahmen
    'unklar': 'Noch unklar',
    '6_monate': '6 Monate',
    '3_monate': '3 Monate',
    'asap': 'Möglichst schnell',
    
    // Eigentum
    'miete': 'Miete',
    'eigentuemer_gemeinschaft': 'Eigentümergemeinschaft',
    'verwalter': 'Verwalter',
    'eigentum': 'Eigentum',
    
    // Balkontyp
    'hochterrasse': 'Hochterrasse',
    'haengebalkon': 'Hängebalkon',
    'anlehnbalkon': 'Anlehnbalkon',
    'vorstellbalkon': 'Vorstellbalkon',
    
    // Wandmaterial
    'unbekannt': 'Unbekannt',
    'holzstaender': 'Holzständer',
    'hlz': 'HLZ',
    'stahlbeton': 'Stahlbeton',
    'mauerwerk': 'Mauerwerk',
    
    // Unterkellert
    'nein': 'Nein',
    'ja': 'Ja',
    
    // Budget
    '0-10000': '0 - 10.000€',
    '10000-20000': '10.000 - 20.000€',
    '20000-30000': '20.000 - 30.000€',
    '30000+': '30.000€+',
    
    // Barrierefreiheit
    'nicht_benoetigt': 'Nicht benötigt',
    'barrierefrei': 'Barrierefrei',
    
    // Bodenbelag
    'fliesen': 'Fliesen',
    'holz': 'Holz',
    'terrassendielen': 'Terrassendielen',
    'kies': 'Kies',
    'wiese': 'Wiese',
    
    // Geländer
    'glas': 'Glas',
    'stahl': 'Stahl',
    'holz': 'Holz',
    'kombination': 'Kombination',
    
    // Oberfläche
    'gruen': 'Grün',
    'blau': 'Blau',
    'beige': 'Beige',
    'schwarz': 'Schwarz'
  };
  
  return {
    projectStatus: translations[funnelData?.projectStatus] || funnelData?.projectStatus || 'Nicht angegeben',
    timeframe: translations[funnelData?.timeframe] || funnelData?.timeframe || 'Nicht angegeben',
    ownership: translations[funnelData?.ownership] || funnelData?.ownership || 'Nicht angegeben',
    balconyType: translations[funnelData?.balconyType] || funnelData?.balconyType || 'Nicht angegeben',
    wallMaterial: translations[funnelData?.wallMaterial] || funnelData?.wallMaterial || 'Nicht angegeben',
    basement: translations[funnelData?.basement] || funnelData?.basement || 'Nicht angegeben',
    budget: translations[funnelData?.budget] || funnelData?.budget || 'Nicht angegeben',
    accessibility: translations[funnelData?.accessibility] || funnelData?.accessibility || 'Nicht angegeben',
    balconyFloor: translations[funnelData?.balconyFloor] || funnelData?.balconyFloor || 'Nicht angegeben',
    railing: translations[funnelData?.railing] || funnelData?.railing || 'Nicht angegeben',
    surface: translations[funnelData?.surface] || funnelData?.surface || 'Nicht angegeben'
  };
}

/**
 * Erstellt eine funnel-spezifische Zusammenfassung
 */
function createFunnelSummary(funnelType, funnelData, contact, body, calculation) {
  // Normalisiere funnelType zu Kleinbuchstaben für case-insensitive Vergleich
  const normalizedFunnelType = (funnelType || '').toLowerCase();
  
  const baseInfo = `
=== KONTAKTDATEN ===
- Name: ${contact?.firstName || ''} ${contact?.lastName || ''}
- E-Mail: ${contact?.email || 'Nicht angegeben'}
- Telefon: ${contact?.phone || 'Nicht angegeben'}
- Postleitzahl: ${contact?.plz || contact?.zipCode || 'Nicht angegeben'}

=== FUNNEL-DETAILS ===
- Funnel-Typ: ${funnelType || 'Unbekannt'}
- Zeitstempel: ${new Date().toISOString()}
`;

  switch (normalizedFunnelType) {
    case 'kalkulator':
      return baseInfo + `
=== KALKULATOR-DATEN ===
- Balkontyp: ${funnelData?.balconyType || 'Nicht angegeben'}
- Anzahl Balkone: ${funnelData?.balconyCount || 1}
- Breite: ${funnelData?.balconyWidth || 'Nicht angegeben'}m
- Tiefe: ${funnelData?.balconyDepth || 'Nicht angegeben'}m
- Zusatzausstattung: ${funnelData?.extras?.join(', ') || 'Keine'}
- Datenschutz-Zustimmung: ${funnelData?.datenschutzConsent ? 'Ja' : 'Nein'}
- Balkonbrief-Bestellung: ${funnelData?.newsletterConsent ? 'Ja' : 'Nein'}

=== REGIONALE ANPASSUNG ===
- Kategorie: ${body?.priceCalculation?.regionalCategory || 'Standard'}
- Region: ${body?.priceCalculation?.regionalRegion || 'Nicht verfügbar'}
- Bundesland: ${body?.priceCalculation?.regionalBundesland || 'Nicht verfügbar'}
- Regionalfaktor: ${body?.priceCalculation?.regionalFactor ?? '1.0'}x

=== PREIS ===
- Basispreis: ${body?.priceCalculation?.basePrice ?? 'Nicht verfügbar'}€
- Gesamtpreis: ${body?.priceCalculation?.finalPrice ?? 'Nicht verfügbar'}€

=== LEAD SCORING ===
- Lead Score: ${body._kalkulatorScoring?.finalScore || body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${body._kalkulatorScoring?.category || body._internalScoring?.category || 'Nicht verfügbar'}
- Priorität: ${body._kalkulatorScoring?.priority || body._internalScoring?.priority || 'Nicht verfügbar'}
- Geschätzter Wert: ${body._kalkulatorScoring?.estimatedValue || 'Nicht verfügbar'}€
- Nurturing-Sequenz: ${body._kalkulatorScoring?.nurturingSequence || 'Nicht verfügbar'}
- Empfohlene Aktion: ${body._kalkulatorScoring?.action || 'Nicht verfügbar'}
`;

    case 'express-angebot':
      return baseInfo + `
=== EXPRESS-ANGEBOT-DATEN ===
- Genehmigungsstatus: ${funnelData?.approvalStatus || 'Nicht angegeben'}
- Zeitrahmen: ${funnelData?.timeframe || 'Nicht angegeben'}
- Projekttyp: ${funnelData?.projectData || 'Nicht angegeben'}
- Budget: ${funnelData?.budget || 'Nicht angegeben'}
- Balkon-Typ: ${funnelData?.balconyType || 'Nicht angegeben'}
- Anzahl Balkone: ${funnelData?.balconyCount || 'Nicht angegeben'}
- Maße pro Balkon: ${(funnelData?.balconyWidth && funnelData?.balconyDepth) ? `${funnelData.balconyWidth} x ${funnelData.balconyDepth} m` : 'Nicht angegeben'}
- Angebotsanzahl: ${funnelData?.offerCount || 'Nicht angegeben'}
- Einzugsgebiet: ${funnelData?.offerRegion || 'Nicht angegeben'}
- Kontaktpräferenz: ${funnelData?.contactPreference || 'Nicht angegeben'}
- Ausführung/Extras: ${(Array.isArray(funnelData?.extras) && funnelData.extras.length) ? funnelData.extras.join(', ') : 'Keine'}
- Zusätzliche Infos: ${funnelData?.additionalInfo || 'Keine'}

=== LEAD SCORING ===
- Lead Score: ${body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${body._internalScoring?.category || 'Nicht verfügbar'}
- Priorität: ${body._internalScoring?.priority || 'Nicht verfügbar'}
`;

    case 'genehmigung':
      return baseInfo + `
=== GENEHMIGUNGSCHECK-DATEN ===
- Bundesland: ${funnelData?.bundesland || 'Nicht angegeben'}
- Projekttyp: ${funnelData?.projekttyp || 'Nicht angegeben'}
- Größe: ${funnelData?.groesse || 'Nicht angegeben'}m²
- Tiefe: ${funnelData?.tiefe || 'Nicht angegeben'}m
- Grenzabstand: ${funnelData?.grenzabstand || 'Nicht angegeben'}

=== GENEHMIGUNGSERGEBNIS ===
- Status: ${funnelData?.ergebnis?.status || 'Nicht verfügbar'}
- Verfahrenstyp: ${funnelData?.ergebnis?.verfahrenstyp || 'Nicht verfügbar'}
- Grund: ${funnelData?.ergebnis?.grund || 'Nicht verfügbar'}
- Geschätzte Kosten: ${funnelData?.ergebnis?.kosten || 'Nicht verfügbar'}
- Verfahrensdauer: ${funnelData?.ergebnis?.dauer || 'Nicht verfügbar'}
- Nächste Schritte: ${funnelData?.ergebnis?.naechsteSchritte?.join(', ') || 'Nicht verfügbar'}

=== LEAD SCORING ===
- Lead Score: ${extractLeadScore(body) || body._genehmigungScoring?.totalScore || body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${extractCategory(body) || body._genehmigungScoring?.category || body._internalScoring?.category || 'Nicht verfügbar'}
- Priorität: ${extractPriority(body) || body._genehmigungScoring?.priority || body._internalScoring?.priority || 'Nicht verfügbar'}
- Geschätzter Wert: ${extractEstimatedValue(body, 'genehmigung') || body._genehmigungScoring?.estimatedValue || 'Nicht verfügbar'}€
- Genehmigungswahrscheinlichkeit: ${body._genehmigungScoring?.genehmigungswahrscheinlichkeit || 'Nicht verfügbar'}
`;

    case 'planer':
      const translatedPlanerData = translatePlanerData(funnelData);
      const offerCountLabel = funnelData?.offerPreferences?.count === 'mehr' ? '5 oder mehr' : (funnelData?.offerPreferences?.count || 'Nicht angegeben');
      const offerRegionLabel = funnelData?.offerPreferences?.region === 'regional' ? 'Regional' : 
                               funnelData?.offerPreferences?.region === 'overregional' ? 'Überregional' :
                               funnelData?.offerPreferences?.region === 'bundesweit' ? 'Bundesweit' : 'Nicht angegeben';
      return baseInfo + `
=== PLANER-DATEN ===
- Projektstatus: ${translatedPlanerData.projectStatus}
- Zeitrahmen: ${translatedPlanerData.timeframe}
- Eigentum: ${translatedPlanerData.ownership}
- Balkontyp: ${translatedPlanerData.balconyType}
- Anzahl Balkone: ${funnelData?.balconyCount || 'Nicht angegeben'}
- Wandmaterial: ${translatedPlanerData.wallMaterial}
- Budget: ${translatedPlanerData.budget}
- Größe: ${funnelData?.size ? `${funnelData.size.width}x${funnelData.size.depth}` : 'Nicht angegeben'}
- Etage: ${funnelData?.floor || 'Nicht angegeben'}
- Barrierefreiheit: ${translatedPlanerData.accessibility}
- Bodenbelag: ${translatedPlanerData.balconyFloor}
- Geländer: ${translatedPlanerData.railing}
- Oberfläche: ${translatedPlanerData.surface}
- Dokumente: ${funnelData?.documents ? funnelData.documents.join(', ') : 'Keine'}
${funnelData?.offerPreferences?.count ? `- Angebotsanzahl: ${offerCountLabel}` : ''}
${funnelData?.offerPreferences?.region ? `- Einzugsgebiet: ${offerRegionLabel}` : ''}
- Zusätzliche Infos: ${funnelData?.additionalInfo || 'Keine'}

=== PREISBERECHNUNG ===
- Basispreis (ohne Regionalfaktor): ${body.priceCalculation?.basePrice || 'Nicht verfügbar'}€
- Regionalfaktor: ${body.priceCalculation?.regionalFactor ? `${body.priceCalculation.regionalFactor}x` : '1.0x'} (${body.priceCalculation?.regionalCategory || 'Standard'})
- Region: ${body.priceCalculation?.regionalRegion || 'Nicht verfügbar'}
- Bundesland: ${body.priceCalculation?.regionalBundesland || 'Nicht verfügbar'}
- Gesamtpreis (mit Regionalfaktor): ${body.priceCalculation?.finalPrice || 'Nicht verfügbar'}€
${body.priceCalculation?.savings ? `- Preisunterschied: ${body.priceCalculation.savings > 0 ? '+' : ''}${body.priceCalculation.savings}€` : ''}

=== LEAD SCORING ===
- Lead Score: ${extractLeadScore(body) || body._planerScoring?.finalScore || body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${extractCategory(body) || body._planerScoring?.category || body._internalScoring?.category || 'Nicht verfügbar'}
- Priorität: ${extractPriority(body) || body._planerScoring?.priority || body._internalScoring?.priority || 'Nicht verfügbar'}
- Geschätzter Wert: ${extractEstimatedValue(body, 'planer') || body._planerScoring?.estimatedValue || 'Nicht verfügbar'}€
- Response Time: ${body._planerScoring?.responseTime || 'Nicht verfügbar'}
- Beratungsbereitschaft: ${body._planerScoring?.beratungsReadiness || 'Nicht verfügbar'}
`;

    case 'bauzeit-planung':
      return baseInfo + `
=== BAUZEIT-PLANUNG-DATEN ===
- Zielmonat: ${funnelData?.targetMonth || 'Nicht angegeben'}
- Zieljahr: ${funnelData?.targetYear || 'Nicht angegeben'}
- Projektphase: ${funnelData?.projectPhase || 'Nicht angegeben'}
- Berechnetes Startdatum: ${funnelData?.calculation || 'Nicht verfügbar'}

=== LEAD SCORING ===
- Lead Score: ${body._bauzeitScoring?.totalScore || body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${body._bauzeitScoring?.category || body._internalScoring?.category || 'Nicht verfügbar'}
- Priorität: ${body._bauzeitScoring?.priority || body._internalScoring?.priority || 'Nicht verfügbar'}
- Geschätzter Wert: ${body._bauzeitScoring?.estimatedValue || 'Nicht verfügbar'}€
- Geschätzte Bauzeit: ${body._bauzeitScoring?.geschaetzteBauzeit || 'Nicht verfügbar'}
`;

    case 'partner':
      return baseInfo + `
=== PARTNER-DATEN ===
- Firmenname: ${body.company?.name || 'Nicht angegeben'}
- Rechtsform: ${body.company?.legalForm || 'Nicht angegeben'}
- Gründungsjahr: ${body.company?.foundedYear || 'Nicht angegeben'}
- Mitarbeiteranzahl: ${body.company?.employeeCount || 'Nicht angegeben'}
- Stadt: ${body.company?.city || 'Nicht angegeben'}
- Partner-Typ: ${body.partnerDetails?.partnerType || 'Nicht angegeben'}
- Erfahrung: ${body.partnerDetails?.experience || 'Nicht angegeben'}
- Spezialitäten: ${body.partnerDetails?.specialties?.join(', ') || 'Keine'}
- Arbeitsgebiet: ${body.partnerDetails?.workingArea || 'Nicht angegeben'}
- Versicherungsstatus: ${body.partnerDetails?.insuranceStatus || 'Nicht angegeben'}
- Referenzen: ${body.partnerDetails?.references?.length || 0} Projekte
- Leuchtturmprojekt: ${body.partnerDetails?.lighthouseProject?.description || 'Nicht angegeben'}

=== PARTNER-SCORING & EMPFEHLUNG ===
- Basis-Score: ${body._partnerScoring?.baseScore || body._internalScoring?.baseScore || 'Nicht verfügbar'}/100
- Qualitäts-Multiplikator: ${body._partnerScoring?.qualityMultiplier || 'Nicht verfügbar'}
- Final Score: ${body._partnerScoring?.finalScore || body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${body._partnerScoring?.category || body._internalScoring?.category || 'Nicht verfügbar'}
- Status: ${body._partnerScoring?.status || 'Nicht verfügbar'}
- Empfehlung: ${body._partnerScoring?.action || 'Nicht verfügbar'}
- Warnungen: ${body._partnerScoring?.warnings?.join(', ') || 'Keine'}

=== PARTNER-BEWERTUNG ===
${getPartnerRecommendation(body._partnerScoring || body._internalScoring)}
`;

    case 'gewerbe':
      return baseInfo + `
=== GEWERBEFUNNEL-DATEN ===
- Projekttyp: ${funnelData?.projekttyp || 'Nicht angegeben'}
- Projektname: ${funnelData?.projektname || 'Nicht angegeben'}
- Projektort: ${funnelData?.projektort || 'Nicht angegeben'}
- Projektadresse: ${funnelData?.projektadresse || 'Nicht angegeben'}
- Anzahl Einheiten: ${funnelData?.anzahlEinheiten || 'Nicht angegeben'}
- Balkontypen: ${funnelData?.balkontyp ? funnelData.balkontyp.join(', ') : 'Keine'}
- Zeitrahmen: ${funnelData?.zeitrahmen || 'Nicht angegeben'}
- Budgetrahmen: ${funnelData?.budgetrahmen || 'Nicht angegeben'}
- Budget Freitext: ${funnelData?.budgetFreitext || 'Keine'}
- Start: ${funnelData?.startMonat || ''} ${funnelData?.startJahr || ''}
- Ende: ${funnelData?.endMonat || ''} ${funnelData?.endJahr || ''}

=== UNTERNEHMENSDATEN ===
- Firmenname: ${funnelData?.firmenname || 'Nicht angegeben'}
- Ansprechpartner: ${funnelData?.ansprechpartner || 'Nicht angegeben'}
- Position: ${funnelData?.position || 'Nicht angegeben'}
- Projektleiter: ${funnelData?.projektleiter || 'Nicht angegeben'}

=== ZUSÄTZLICHE INFOS ===
- Nachricht: ${funnelData?.nachricht || 'Keine'}

=== LEAD SCORING ===
- Lead Score: ${body.leadScore?.totalScore || body._internalScoring?.leadScore || 'Nicht verfügbar'}/100
- Kategorie: ${body.leadScore?.category || body._internalScoring?.category || 'Nicht verfügbar'}
- Priorität: ${body.leadScore?.priority || body._internalScoring?.priority || 'Nicht verfügbar'}
- Geschätzter Wert: ${body.leadScore?.estimatedPrice || body._internalScoring?.estimatedValue || 'Nicht verfügbar'}€
- Response Time: ${body.leadScore?.followUpHours || 'Nicht verfügbar'} Stunden
`;

    default:
      return baseInfo + `
=== ALLGEMEINE FUNNEL-DATEN ===
- Funnel-spezifische Daten: ${JSON.stringify(funnelData, null, 2)}
`;
  }
}

/**
 * Formatiert die Ticket-Beschreibung
 */
function formatTicketDescription(combinedData, priceCalculation = null) {
  return `
Neue Balkon-Anfrage über Website:

Kontaktdaten:
- Name: ${combinedData.name || 'Nicht angegeben'}
- E-Mail: ${combinedData.email || 'Nicht angegeben'}
- Telefon: ${combinedData.phone || 'Nicht angegeben'}
- Firma: ${combinedData.company || 'Nicht angegeben'}

Balkon-Details:
- Balkon-Typ: ${combinedData.balkonTyp || 'Nicht angegeben'}
- Balkon-Fläche: ${combinedData.balkonFlaeche || 'Nicht angegeben'}
- Zusatzausstattung: ${combinedData.zusatzausstattung || 'Keine'}
${combinedData.budget ? `- Budget: ${combinedData.budget}` : ''}
${combinedData.zeitplan ? `- Zeitplan: ${combinedData.zeitplan}` : ''}

Einwilligungen:
- Datenschutz-Zustimmung: ${combinedData.datenschutzConsent ? 'Ja' : 'Nein'}
- Balkonbrief-Bestellung: ${combinedData.newsletterConsent ? 'Ja' : 'Nein'}

Preisberechnung:
- Basispreis: ${priceCalculation?.basePrice || combinedData.calculation || 'Nicht verfügbar'}€
- Regionalfaktor: ${priceCalculation?.regionalFactor || '1.0x'}
- Gesamtpreis: ${priceCalculation?.finalPrice || combinedData.calculation || 'Nicht verfügbar'}€

Zusätzliche Informationen:
- Quelle: ${combinedData.source || 'Website'}
- Zeitstempel: ${new Date().toISOString()}
- Nachricht: ${combinedData.message || 'Keine zusätzliche Nachricht'}
  `.trim();
}

/**
 * Formatiert die Lead-Beschreibung
 */
function formatLeadDescription(combinedData, priceCalculation = null) {
  return `
Balkon-Projekt Anfrage:
- Balkon-Typ: ${combinedData.balkonTyp || 'Nicht angegeben'}
- Balkon-Fläche: ${combinedData.balkonFlaeche || 'Nicht angegeben'}
- Zusatzausstattung: ${combinedData.zusatzausstattung || 'Keine'}
${combinedData.budget ? `- Budget: ${combinedData.budget}` : ''}
${combinedData.zeitplan ? `- Zeitplan: ${combinedData.zeitplan}` : ''}
- Datenschutz-Zustimmung: ${combinedData.datenschutzConsent ? 'Ja' : 'Nein'}
- Balkonbrief-Bestellung: ${combinedData.newsletterConsent ? 'Ja' : 'Nein'}
- Basispreis: ${priceCalculation?.basePrice || combinedData.calculation || 'Nicht verfügbar'}€
- Gesamtpreis: ${priceCalculation?.finalPrice || combinedData.calculation || 'Nicht verfügbar'}€
- Quelle: ${combinedData.source || 'Website'}
- Nachricht: ${combinedData.message || 'Keine zusätzliche Nachricht'}
  `.trim();
}