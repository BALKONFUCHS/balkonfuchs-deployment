/**
 * ZOHO DESK & CRM INTEGRATION API
 * 
 * Diese API empfängt Funnel-Daten und überträgt sie an Zoho Desk (Tickets) und Zoho CRM (Leads/Kontakte)
 */

import ZohoIntegration from '../../lib/zoho-integration';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS Request für CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Nur POST erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { funnelData } = req.body;

    // Validierung der eingehenden Daten
    if (!funnelData) {
      return res.status(400).json({
        success: false,
        error: 'Funnel-Daten fehlen'
      });
    }

    // ZohoIntegration-Instanz erstellen
    const zohoIntegration = new ZohoIntegration();

    // Daten an Zoho übertragen
    const results = await zohoIntegration.processFunnelData(funnelData);

    // Erfolgreiche Antwort
    return res.status(200).json({
      success: true,
      message: 'Daten erfolgreich an Zoho übertragen',
      results: results.results,
      errors: results.errors,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Zoho API Fehler:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Interner Server-Fehler',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}