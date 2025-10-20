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
    const { contact, funnelData, funnel, source, funnelType, calculation } = body;

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
      budget: funnelData?.budget || 'Nicht angegeben',
      zeitplan: funnelData?.zeitplan || 'Nicht angegeben',
      source: source || funnelType || 'Website',
      message: funnelData?.message || body?.message || 'Keine zusätzliche Nachricht',
      calculation: calculation || null,
      
      // Vollständige Kalkulator-Zusammenfassung erstellen
      kalkulatorSummary: calculation ? `
VOLLSTÄNDIGE KALKULATOR-ZUSAMMENFASSUNG:

=== KUNDENEINGABEN ===
- Balkontyp: ${funnelData?.balconyType || 'Nicht angegeben'}
- Anzahl Balkone: ${funnelData?.balconyCount || 1}
- Breite: ${funnelData?.balconyWidth || 'Nicht angegeben'}m
- Tiefe: ${funnelData?.balconyDepth || 'Nicht angegeben'}m
- Gesamtfläche: ${funnelData?.balconyWidth && funnelData?.balconyDepth ? `${funnelData.balconyWidth} × ${funnelData.balconyDepth}m` : 'Nicht berechnet'}

=== ZUSATZLEISTUNGEN ===
- Zusatzleistungen: ${funnelData?.extras?.join(', ') || 'Keine'}
- Premium-Geländer: ${funnelData?.extras?.includes('premium_gelaender') ? 'Ja' : 'Nein'}
- Premium-Boden: ${funnelData?.extras?.includes('premium_boden') ? 'Ja' : 'Nein'}
- Seitenschutz: ${funnelData?.extras?.includes('seitenschutz') ? 'Ja' : 'Nein'}

=== STANDORT & REGION ===
- Postleitzahl: ${contact?.plz || funnelData?.plz || 'Nicht angegeben'}
- Stadt: ${contact?.city || funnelData?.city || 'Nicht angegeben'}
- Region: ${body.mappedData?.region || 'Nicht verfügbar'}
- Regionalfaktor: ${body.mappedData?.regionalfaktor || 'Nicht verfügbar'}

=== PREISBERECHNUNG ===
- Basispreis: ${body.mappedData?.basispreis || 'Nicht verfügbar'}€
- Regionalfaktor: ${body.mappedData?.regionalfaktor || '1.0x'}
- Gesamtpreis: ${calculation}€
- Geschätzter Wert: ${body._kalkulatorScoring?.estimatedValue || calculation}€

=== LEAD SCORING ===
- Lead Score: ${body._internalScoring?.leadScore || body._kalkulatorScoring?.finalScore || 'Nicht verfügbar'}
- Kategorie: ${body._internalScoring?.category || body._kalkulatorScoring?.category || 'Nicht verfügbar'}
- Priorität: ${body._internalScoring?.priority || body._kalkulatorScoring?.priority || 'Nicht verfügbar'}
- Geschätzter Wert: ${body._kalkulatorScoring?.estimatedValue || 'Nicht verfügbar'}€

=== FUNNEL-DETAILS ===
- Funnel-Typ: ${funnelType || funnel?.type || 'Unbekannt'}
- Quelle: ${source || 'BALKONFUCHS Kalkulator'}
- Zeitstempel: ${new Date().toISOString()}
- Vollständig: ${body.isComplete ? 'Ja' : 'Nein'}
      `.trim() : 'Keine Kalkulator-Daten verfügbar',
      
      // Zusätzliche Daten
      funnelType: funnelType || funnel?.type || 'Unbekannt',
      leadScore: body._internalScoring?.leadScore || body._kalkulatorScoring?.finalScore || null,
      category: body._internalScoring?.category || body._kalkulatorScoring?.category || null,
      priority: body._internalScoring?.priority || body._kalkulatorScoring?.priority || null,
      estimatedValue: body._kalkulatorScoring?.estimatedValue || null,
      
      // Mapped Data für zusätzliche Informationen
      mappedData: body.mappedData || {},
    };

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
    try {
      deskResult = await createZohoDeskTicket(combinedData, orgId, accessToken, departmentId);
      console.log('=== DESK RESULT ===');
      console.log('Desk Result:', deskResult);
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
      crmResult = await createZohoCRMLead(combinedData, accessToken);
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
async function createZohoDeskTicket(combinedData, orgId, accessToken, departmentId) {
  try {
    const ticketData = {
      subject: `Balkon-Anfrage von ${combinedData.name || 'Unbekannt'}`,
      description: formatTicketDescription(combinedData),
      priority: 'Medium',
      status: 'Open',
      channel: 'Web',
      contact: {
        firstName: combinedData.name?.split(' ')[0] || 'Unbekannt',
        lastName: combinedData.name?.split(' ').slice(1).join(' ') || '',
        email: combinedData.email,
        phone: combinedData.phone || '',
      },
      customFields: {
        'Lead Score': combinedData.leadScore || '',
        'Geschätzter Projektwert': combinedData.calculation || '',
        'Funnel-Typ': combinedData.funnelType || 'Unbekannt',
        'Begrüßung': combinedData.name ? `Hallo ${combinedData.name.split(' ')[0]}` : 'Hallo',
        'Vorname': combinedData.name?.split(' ')[0] || '',
        'E-Mail': combinedData.email || '',
        'Tel.': combinedData.phone || '',
        'Produkt Name': 'Balkon',
        'Postleitzahl': combinedData.plz || '',
        'Balkon-Fläche': combinedData.balkonFlaeche || '',
        'Balkon-Typ': combinedData.balkonTyp || '',
        'Budget': combinedData.budget || '',
        'Zeitplan': combinedData.zeitplan || '',
        'Funnel-Quelle': combinedData.source || 'Website',
        'Dringlichkeit': combinedData.priority || 'P3',
        'Kategorie': combinedData.category || '',
        'Lead Score Kategorie': combinedData.category || '',
        'Geschätzter Wert': combinedData.calculation || '',
        'Funnel Name': combinedData.funnelType || 'Unbekannt',
        'Zusammenfassung': combinedData.kalkulatorSummary || combinedData.message || 'Keine zusätzliche Nachricht',
        'Kalkulator Ergebnis': combinedData.calculation || '',
        'Gesamtpreis': combinedData.calculation || '',
        'Postleitzahl': combinedData.plz || '',
        'Regionalfaktor': body.mappedData?.regionalfaktor || '1.0x',
        'Basispreis': body.mappedData?.basispreis || '',
        'Premium Geländer': funnelData?.extras?.includes('premium_gelaender') ? 'Ja' : 'Nein',
        'Premium Boden': funnelData?.extras?.includes('premium_boden') ? 'Ja' : 'Nein',
        'Seitenschutz': funnelData?.extras?.includes('seitenschutz') ? 'Ja' : 'Nein',
        'Anzahl Balkone': funnelData?.balconyCount || 1,
        'Breite': funnelData?.balconyWidth || '',
        'Tiefe': funnelData?.balconyDepth || '',
      },
    };

    // DepartmentId nur hinzufügen, wenn es gesetzt ist
    if (departmentId) {
      ticketData.departmentId = departmentId;
    }

    // Log Custom Fields für Debugging
    console.log('=== CUSTOM FIELDS DEBUG ===');
    console.log('Custom Fields:', ticketData.customFields);
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
async function createZohoCRMLead(combinedData, accessToken) {
  try {
    const leadData = {
      data: [{
        First_Name: combinedData.name?.split(' ')[0] || 'Unbekannt',
        Last_Name: combinedData.name?.split(' ').slice(1).join(' ') || '',
        Email: combinedData.email,
        Phone: combinedData.phone || '',
        Lead_Source: 'Website',
        Company: combinedData.company || '',
        Description: formatLeadDescription(combinedData),
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
 * Formatiert die Ticket-Beschreibung
 */
function formatTicketDescription(combinedData) {
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
- Budget: ${combinedData.budget || 'Nicht angegeben'}
- Zeitplan: ${combinedData.zeitplan || 'Nicht angegeben'}

Zusätzliche Informationen:
- Quelle: ${combinedData.source || 'Website'}
- Zeitstempel: ${new Date().toISOString()}
- Nachricht: ${combinedData.message || 'Keine zusätzliche Nachricht'}
  `.trim();
}

/**
 * Formatiert die Lead-Beschreibung
 */
function formatLeadDescription(combinedData) {
  return `
Balkon-Projekt Anfrage:
- Balkon-Typ: ${combinedData.balkonTyp || 'Nicht angegeben'}
- Balkon-Fläche: ${combinedData.balkonFlaeche || 'Nicht angegeben'}
- Budget: ${combinedData.budget || 'Nicht angegeben'}
- Zeitplan: ${combinedData.zeitplan || 'Nicht angegeben'}
- Quelle: ${combinedData.source || 'Website'}
- Nachricht: ${combinedData.message || 'Keine zusätzliche Nachricht'}
  `.trim();
}