/**
 * ZOHO CONNECTION TEST API
 * 
 * Testet die Verbindung zu Zoho Desk und CRM
 */

const ZohoIntegration = require('../../lib/zoho-integration');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use GET.' 
    });
  }

  try {
    const zohoIntegration = new ZohoIntegration();

    // Test-Daten erstellen
    const testFunnelData = {
      funnel: {
        type: 'kalkulator',
        name: 'Balkon-Kalkulator Test'
      },
      contact: {
        salutation: 'herr',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@balkonfuchs.de',
        phone: '+49123456789',
        zipCode: '10115',
        city: 'Berlin',
        newsletter: true,
        privacy: true,
        agb: true,
        disclaimer: true
      },
      funnelData: {
        balconyType: 'Standbalkon',
        balconyWidth: '3.5',
        balconyDepth: '1.2',
        balconyCount: 1,
        extras: ['balkontuer', 'treppe'],
        plz: '10115',
        city: 'Berlin'
      },
      leadScore: {
        totalScore: 75,
        category: 'warm',
        priority: 'P2',
        urgency: 'medium',
        complexity: 'medium',
        budget: 'medium',
        timeline: 'urgent',
        followUpHours: 24
      },
      estimatedPrice: 25000,
      timestamp: new Date().toISOString(),
      source: 'website-test'
    };

    console.log('Testing Zoho connection with data:', testFunnelData);

    // Zoho-Verbindung testen
    const results = await zohoIntegration.processFunnelData(testFunnelData);

    res.status(200).json({
      success: true,
      message: 'Zoho-Verbindung erfolgreich getestet',
      results: results.results,
      errors: results.errors,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Zoho Test Fehler:', error);
    
    res.status(500).json({
      success: false,
      error: 'Zoho-Verbindung fehlgeschlagen',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
