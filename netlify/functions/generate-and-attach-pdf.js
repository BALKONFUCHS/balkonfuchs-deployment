const puppeteer = require('puppeteer');
const axios = require('axios');

/**
 * NETLIFY FUNCTION: GENERATE PDF AND ATTACH TO ZOHO DESK TICKET
 * 
 * Diese Funktion generiert automatisch ein PDF aus den Funnel-Daten und
 * hängt es an das entsprechenden Zoho Desk Ticket an.
 */

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

  try {
    const body = JSON.parse(event.body || '{}');
    const { ticketId, projectData, contact, funnelType } = body;
    
    console.log('=== GENERATE PDF FOR TICKET ===');
    console.log('Ticket ID:', ticketId);
    console.log('Funnel Type:', funnelType);
    
    if (!ticketId || !projectData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Ticket ID und Projekt-Daten sind erforderlich',
        }),
      };
    }

    // HTML-Template für das PDF erstellen
    const htmlContent = generateHTMLTemplate(projectData, contact, funnelType);
    
    // PDF mit Puppeteer generieren
    const pdfBuffer = await generatePDFFromHTML(htmlContent);
    
    // PDF an Zoho Desk Ticket anhängen
    const attachmentResult = await attachPDFToZohoDeskTicket(ticketId, pdfBuffer, contact);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'PDF erfolgreich generiert und angehängt',
        attachmentId: attachmentResult.id
      }),
    };
  } catch (error) {
    console.error('Fehler beim Generieren des PDFs:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};

/**
 * Generiert ein HTML-Template für das PDF
 */
function generateHTMLTemplate(projectData, contact, funnelType) {
  // Übersetze Daten für Anzeige
  const translateValue = (key, value) => {
    const translations = {
      projectStatus: {
        'feasibility': 'Machbarkeit prüfen',
        'approved': 'Genehmigung vorhanden',
        'seeking': 'Sucht Partner',
        'submitted': 'Bauantrag eingereicht'
      },
      timeframe: {
        'asap': 'So schnell wie möglich',
        '3months': '3 Monate',
        '6months': '6 Monate'
      },
      ownership: {
        'owner': 'Eigentum',
        'condo': 'Eigentümergemeinschaft',
        'manager': 'Verwaltet',
        'rent': 'Miete'
      },
      balconyType: {
        'hanging': 'Hängebalkon',
        'standing': 'Vorstellbalkon',
        'leaning': 'Anlehnbalkon',
        'high_terrace': 'Hochterrasse'
      },
      wallMaterial: {
        'masonry': 'Mauerwerk',
        'concrete': 'Stahlbeton',
        'hlz': 'HLZ',
        'wood_frame': 'Holzständer'
      },
      budget: {
        '10k': 'Bis 10.000€',
        '10_20k': '10.000€ - 20.000€',
        '20_30k': '20.000€ - 30.000€',
        '30k_plus': 'Über 30.000€'
      },
      balconyFloor: {
        'wood': 'Holz',
        'plastic': 'Kunststoff (WPC)',
        'aluminum': 'Aluminium',
        'stone': 'Steinbelag'
      },
      railing: {
        'full_glass': 'Ganzglas',
        'glass': 'Glas',
        'bars': 'Stab',
        'closed': 'Geschlossen'
      }
    };
    
    return translations[key]?.[value] || value || 'Nicht gewählt';
  };
  
  const area = projectData.size?.width && projectData.size?.depth 
    ? `${(parseFloat(projectData.size.width) * parseFloat(projectData.size.depth)).toFixed(1)}` 
    : 'N/A';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      color: #fff;
      padding: 40px;
      margin: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #1f2937;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 {
      color: #ff6b35;
      margin: 0 0 10px 0;
      font-size: 32px;
    }
    .summary-box {
      background: #374151;
      border-radius: 8px;
      padding: 30px;
      margin-bottom: 30px;
    }
    .summary-box h2 {
      color: #ff6b35;
      margin-top: 0;
      font-size: 24px;
      border-bottom: 2px solid #ff6b35;
      padding-bottom: 10px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    .summary-item {
      padding: 8px 0;
      border-bottom: 1px solid #4b5563;
    }
    .summary-label {
      color: #ff6b35;
      font-weight: bold;
      margin-right: 10px;
    }
    .summary-value {
      color: #fff;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #9ca3af;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Projektübersicht</h1>
      <p>Vielen Dank, ${contact?.firstName || ''}!</p>
    </div>
    
    <div class="summary-box">
      <h2>📋 Ihr Projekt im Überblick</h2>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-label">Status:</span>
          <span class="summary-value">${translateValue('projectStatus', projectData.projectStatus)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Zeitrahmen:</span>
          <span class="summary-value">${translateValue('timeframe', projectData.timeframe)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Eigentum:</span>
          <span class="summary-value">${translateValue('ownership', projectData.ownership)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Balkontyp:</span>
          <span class="summary-value">${translateValue('balconyType', projectData.balconyType)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Wandmaterial:</span>
          <span class="summary-value">${translateValue('wallMaterial', projectData.wallMaterial)}</span>
        </div>
        ${projectData.size?.width && projectData.size?.depth ? `
        <div class="summary-item">
          <span class="summary-label">Größe:</span>
          <span class="summary-value">${projectData.size.width}×${projectData.size.depth}m (${area}m²)</span>
        </div>
        ` : ''}
        <div class="summary-item">
          <span class="summary-label">Budget:</span>
          <span class="summary-value">${translateValue('budget', projectData.budget)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Bodenbelag:</span>
          <span class="summary-value">${translateValue('balconyFloor', projectData.balconyFloor)}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Geländer:</span>
          <span class="summary-value">${translateValue('railing', projectData.railing)}</span>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>BALKONFUCHS - Deutschlands führende Plattform für Balkon-Projekte</p>
      <p>Erstellt am ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generiert ein PDF aus HTML mit Puppeteer
 */
async function generatePDFFromHTML(htmlContent) {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    return pdf;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Hängt das PDF an ein Zoho Desk Ticket an
 */
async function attachPDFToZohoDeskTicket(ticketId, pdfBuffer, contact) {
  // TODO: Implementiere Zoho Desk API-Anhang
  // Dies erfordert:
  // 1. Access Token von Zoho Desk
  // 2. API-Call für Ticket-Anhang
  // 3. Basierend auf ticketId
  
  console.log('PDF würde an Ticket angehängt:', ticketId);
  console.log('Kontakt:', contact);
  
  // Placeholder - dies muss implementiert werden
  return { id: 'placeholder' };
}

