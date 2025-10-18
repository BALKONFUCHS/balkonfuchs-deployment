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
 */

const axios = require('axios');

exports.handler = async (event, context) => {
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
    const { funnelData } = body;

    // Validierung der eingehenden Daten
    if (!funnelData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Funnel-Daten fehlen',
        }),
      };
    }

    // Umgebungsvariablen prüfen
    const orgId = process.env.ZOHO_ORG_ID;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;

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
    const deskResult = await createZohoDeskTicket(funnelData, orgId, accessToken);
    
    // Zoho CRM Lead erstellen
    const crmResult = await createZohoCRMLead(funnelData, accessToken);

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
      scope: 'ZohoCRM.modules.ALL'
    });
    
    const response = await axios.post(
      'https://accounts.zoho.eu/oauth/v2/token',
      new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        scope: 'ZohoCRM.modules.ALL'
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
async function createZohoDeskTicket(funnelData, orgId, accessToken) {
  try {
    const ticketData = {
      subject: `Balkon-Anfrage von ${funnelData.name || 'Unbekannt'}`,
      description: formatTicketDescription(funnelData),
      priority: 'Medium',
      status: 'Open',
      channel: 'Web',
      contact: {
        firstName: funnelData.name?.split(' ')[0] || 'Unbekannt',
        lastName: funnelData.name?.split(' ').slice(1).join(' ') || '',
        email: funnelData.email,
        phone: funnelData.phone || '',
      },
      customFields: {
        'Balkon_Fläche': funnelData.balkonFlaeche || '',
        'Balkon_Typ': funnelData.balkonTyp || '',
        'Budget': funnelData.budget || '',
        'Zeitplan': funnelData.zeitplan || '',
        'Funnel_Quelle': funnelData.source || 'Website',
      },
    };

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
    console.error('Zoho Desk Fehler:', error.response?.data || error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Erstellt einen Lead in Zoho CRM
 */
async function createZohoCRMLead(funnelData, accessToken) {
  try {
    const leadData = {
      data: [{
        First_Name: funnelData.name?.split(' ')[0] || 'Unbekannt',
        Last_Name: funnelData.name?.split(' ').slice(1).join(' ') || '',
        Email: funnelData.email,
        Phone: funnelData.phone || '',
        Lead_Source: 'Website',
        Company: funnelData.company || '',
        Description: formatLeadDescription(funnelData),
        Custom_Fields: {
          'Balkon_Fläche': funnelData.balkonFlaeche || '',
          'Balkon_Typ': funnelData.balkonTyp || '',
          'Budget': funnelData.budget || '',
          'Zeitplan': funnelData.zeitplan || '',
          'Funnel_Quelle': funnelData.source || 'Website',
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
function formatTicketDescription(funnelData) {
  return `
Neue Balkon-Anfrage über Website:

Kontaktdaten:
- Name: ${funnelData.name || 'Nicht angegeben'}
- E-Mail: ${funnelData.email || 'Nicht angegeben'}
- Telefon: ${funnelData.phone || 'Nicht angegeben'}
- Firma: ${funnelData.company || 'Nicht angegeben'}

Balkon-Details:
- Balkon-Typ: ${funnelData.balkonTyp || 'Nicht angegeben'}
- Balkon-Fläche: ${funnelData.balkonFlaeche || 'Nicht angegeben'}
- Budget: ${funnelData.budget || 'Nicht angegeben'}
- Zeitplan: ${funnelData.zeitplan || 'Nicht angegeben'}

Zusätzliche Informationen:
- Quelle: ${funnelData.source || 'Website'}
- Zeitstempel: ${new Date().toISOString()}
- Nachricht: ${funnelData.message || 'Keine zusätzliche Nachricht'}
  `.trim();
}

/**
 * Formatiert die Lead-Beschreibung
 */
function formatLeadDescription(funnelData) {
  return `
Balkon-Projekt Anfrage:
- Balkon-Typ: ${funnelData.balkonTyp || 'Nicht angegeben'}
- Balkon-Fläche: ${funnelData.balkonFlaeche || 'Nicht angegeben'}
- Budget: ${funnelData.budget || 'Nicht angegeben'}
- Zeitplan: ${funnelData.zeitplan || 'Nicht angegeben'}
- Quelle: ${funnelData.source || 'Website'}
- Nachricht: ${funnelData.message || 'Keine zusätzliche Nachricht'}
  `.trim();
}