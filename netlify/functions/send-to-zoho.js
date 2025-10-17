/**
 * NETLIFY FUNCTION: ZOHO DESK & CRM INTEGRATION
 * 
 * Diese Netlify Function empfängt Funnel-Daten und überträgt sie an Zoho Desk (Tickets) und Zoho CRM (Leads/Kontakte)
 * 
 * Umgebungsvariablen:
 * - ZOHO_ORG_ID: Zoho Organization ID
 * - ZOHO_ACCESS_TOKEN: Zoho Access Token
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
    const accessToken = process.env.ZOHO_ACCESS_TOKEN;

    if (!orgId || !accessToken) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Zoho-Konfiguration fehlt. ZOHO_ORG_ID und ZOHO_ACCESS_TOKEN müssen gesetzt sein.',
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
