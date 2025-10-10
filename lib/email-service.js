/**
 * E-Mail-Service für Partner-Bewerbungen
 * Sendet E-Mails an Bewerber und interne Kopien
 */

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  /**
   * Initialisiert den E-Mail-Transporter
   */
  initializeTransporter() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true für 465, false für andere Ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  /**
   * Sendet E-Mail an Bewerber mit allen Bewerbungsdaten
   */
  async sendApplicantEmail(formData, scoringData, funnelType = 'partner') {
    const { contact } = formData;
    
    let subject, htmlContent, textContent;
    
    if (funnelType === 'kalkulator' || funnelType === 'calculator') {
      subject = `Ihre Balkon-Kalkulation bei BALKONFUCHS - Bestätigung`;
      htmlContent = this.generateKalkulatorApplicantEmailHTML(formData, scoringData);
      textContent = this.generateKalkulatorApplicantEmailText(formData, scoringData);
    } else if (funnelType === 'planer') {
      subject = `Ihre Balkon-Planung bei BALKONFUCHS - Bestätigung`;
      htmlContent = this.generatePlanerApplicantEmailHTML(formData, scoringData);
      textContent = this.generatePlanerApplicantEmailText(formData, scoringData);
    } else if (funnelType === 'genehmigung') {
      subject = `Ihr Genehmigungscheck bei BALKONFUCHS - Bestätigung`;
      htmlContent = this.generateGenehmigungApplicantEmailHTML(formData, scoringData);
      textContent = this.generateGenehmigungApplicantEmailText(formData, scoringData);
    } else if (funnelType === 'bauzeit-planung') {
      subject = `Ihre Bauzeitplanung bei BALKONFUCHS - Bestätigung`;
      htmlContent = this.generateBauzeitApplicantEmailHTML(formData, scoringData);
      textContent = this.generateBauzeitApplicantEmailText(formData, scoringData);
    } else {
      // Partner-E-Mail (Legacy)
      subject = `Ihre Partner-Bewerbung bei BALKONFUCHS - Bestätigung`;
      htmlContent = this.generateApplicantEmailHTML(formData, scoringData);
      textContent = this.generateApplicantEmailText(formData, scoringData);
    }

    const mailOptions = {
      from: `"BALKONFUCHS Partner-Team" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: contact.email,
      subject: subject,
      text: textContent,
      html: htmlContent
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Bewerber-E-Mail gesendet:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Fehler beim Senden der Bewerber-E-Mail:', error);
      throw new Error(`Bewerber-E-Mail konnte nicht gesendet werden: ${error.message}`);
    }
  }

  /**
   * Sendet interne Kopie an BALKONFUCHS Team
   */
  async sendInternalEmail(formData, partnerScoring, zohoResults = null) {
    const { contact, company, partnerDetails } = formData;
    
    const subject = `🚀 NEUE PARTNER-BEWERBUNG: ${company.name} (${partnerScoring?.category || 'Unbekannt'})`;
    
    const htmlContent = this.generateInternalEmailHTML(formData, partnerScoring, zohoResults);
    const textContent = this.generateInternalEmailText(formData, partnerScoring, zohoResults);

    const mailOptions = {
      from: `"BALKONFUCHS System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.INTERNAL_EMAIL || 'partner@balkonfuchs.de',
      subject: subject,
      text: textContent,
      html: htmlContent
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Interne E-Mail gesendet:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Fehler beim Senden der internen E-Mail:', error);
      throw new Error(`Interne E-Mail konnte nicht gesendet werden: ${error.message}`);
    }
  }

  /**
   * Generiert HTML-E-Mail für Kalkulator-Benutzer
   */
  generateKalkulatorApplicantEmailHTML(formData, kalkulatorScoring) {
    const { contact, funnelData } = formData;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ihre Balkon-Kalkulation bei BALKONFUCHS</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35; }
        .score-box { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏗️ BALKONFUCHS Kalkulator</h1>
          <p>Vielen Dank für Ihre Anfrage!</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>📋 Kalkulationsbestätigung</h3>
            <p>Hallo ${contact.firstName},</p>
            <p>vielen Dank für Ihr Interesse an einer Balkonlösung von BALKONFUCHS! Wir haben Ihre Kalkulation erfolgreich erhalten und werden diese sorgfältig prüfen.</p>
          </div>

          <div class="section">
            <h3>🏗️ Ihre Balkon-Details</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Balkontyp:</strong><br>
                ${funnelData.balconyType || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Größe:</strong><br>
                ${funnelData.balconyWidth || 0}m × ${funnelData.balconyDepth || 0}m
              </div>
              <div class="info-item">
                <strong>Anzahl:</strong><br>
                ${funnelData.balconyCount || 1} Balkon(e)
              </div>
              <div class="info-item">
                <strong>Standort:</strong><br>
                ${funnelData.plz || 'Nicht angegeben'} ${funnelData.city || 'Nicht angegeben'}
              </div>
            </div>
          </div>

          <div class="section">
            <h3>⚙️ Zusatzausstattung</h3>
            <div class="info-item">
              ${funnelData.extras && funnelData.extras.length > 0 ? 
                funnelData.extras.map(extra => `• ${extra}`).join('<br>') : 
                'Keine Zusatzausstattung gewählt'
              }
            </div>
          </div>

          ${kalkulatorScoring ? `
          <div class="section">
            <h3>🎯 Ihre Bewertung</h3>
            <div class="score-box">
              <h2>${kalkulatorScoring.category || 'Bewertung läuft'}</h2>
              <p>Final-Score: ${kalkulatorScoring.finalScore || 0}/40 Punkte</p>
              <p>Geschätzter Wert: ${kalkulatorScoring.estimatedValue || 0}€</p>
            </div>
            
            <div class="success">
              <strong>📋 Nächste Schritte:</strong><br>
              ${kalkulatorScoring.action || 'Wir werden uns bei Ihnen melden.'}
            </div>
          </div>
          ` : ''}

          <div class="section">
            <h3>📞 Kontaktdaten</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Name:</strong><br>
                ${contact.firstName} ${contact.lastName}
              </div>
              <div class="info-item">
                <strong>E-Mail:</strong><br>
                ${contact.email}
              </div>
              <div class="info-item">
                <strong>Telefon:</strong><br>
                ${contact.phone || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Standort:</strong><br>
                ${contact.plz || 'Nicht angegeben'} ${contact.city || 'Nicht angegeben'}
              </div>
            </div>
          </div>

          <div class="section">
            <h3>⏰ Was passiert als nächstes?</h3>
            <p>Unser Team wird Ihre Kalkulation innerhalb der nächsten 24 Stunden prüfen und sich bei Ihnen melden. Bei Fragen können Sie uns gerne unter <strong>info@balkonfuchs.de</strong> kontaktieren.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Mit freundlichen Grüßen<br>
          Ihr BALKONFUCHS Team</p>
          <p>BALKONFUCHS GmbH | info@balkonfuchs.de | www.balkonfuchs.de</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Generiert Text-E-Mail für Kalkulator-Benutzer
   */
  generateKalkulatorApplicantEmailText(formData, kalkulatorScoring) {
    const { contact, funnelData } = formData;
    
    return `
BALKONFUCHS Kalkulator - Kalkulationsbestätigung

Hallo ${contact.firstName},

vielen Dank für Ihr Interesse an einer Balkonlösung von BALKONFUCHS! 
Wir haben Ihre Kalkulation erfolgreich erhalten und werden diese sorgfältig prüfen.

IHRE BALKON-DETAILS:
- Balkontyp: ${funnelData.balconyType || 'Nicht angegeben'}
- Größe: ${funnelData.balconyWidth || 0}m × ${funnelData.balconyDepth || 0}m
- Anzahl: ${funnelData.balconyCount || 1} Balkon(e)
- Standort: ${funnelData.plz || 'Nicht angegeben'} ${funnelData.city || 'Nicht angegeben'}

ZUSATZAUSSTATTUNG:
${funnelData.extras && funnelData.extras.length > 0 ? 
  funnelData.extras.map(extra => `- ${extra}`).join('\n') : 
  'Keine Zusatzausstattung gewählt'
}

${kalkulatorScoring ? `
IHRE BEWERTUNG:
- Kategorie: ${kalkulatorScoring.category || 'Bewertung läuft'}
- Final-Score: ${kalkulatorScoring.finalScore || 0}/40 Punkte
- Geschätzter Wert: ${kalkulatorScoring.estimatedValue || 0}€

NÄCHSTE SCHRITTE: ${kalkulatorScoring.action || 'Wir werden uns bei Ihnen melden.'}
` : ''}

KONTAKTDATEN:
- Name: ${contact.firstName} ${contact.lastName}
- E-Mail: ${contact.email}
- Telefon: ${contact.phone || 'Nicht angegeben'}
- Standort: ${contact.plz || 'Nicht angegeben'} ${contact.city || 'Nicht angegeben'}

WAS PASSIERT ALS NÄCHSTES?
Unser Team wird Ihre Kalkulation innerhalb der nächsten 24 Stunden prüfen 
und sich bei Ihnen melden. Bei Fragen können Sie uns gerne unter 
info@balkonfuchs.de kontaktieren.

Mit freundlichen Grüßen
Ihr BALKONFUCHS Team

BALKONFUCHS GmbH
info@balkonfuchs.de
www.balkonfuchs.de
    `;
  }

  /**
   * Generiert HTML-E-Mail für Bewerber
   */
  generateApplicantEmailHTML(formData, partnerScoring) {
    const { contact, company, partnerDetails } = formData;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ihre Partner-Bewerbung bei BALKONFUCHS</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35; }
        .score-box { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏗️ BALKONFUCHS Partner-Programm</h1>
          <p>Vielen Dank für Ihre Bewerbung!</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>📋 Bewerbungsbestätigung</h3>
            <p>Hallo ${contact.salutation || ''} ${contact.lastName},</p>
            <p>vielen Dank für Ihr Interesse an einer Partnerschaft mit BALKONFUCHS! Wir haben Ihre Bewerbung erfolgreich erhalten und werden diese sorgfältig prüfen.</p>
          </div>

          <div class="section">
            <h3>🏢 Ihre Unternehmensdaten</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Unternehmensname:</strong><br>
                ${company.name || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Rechtsform:</strong><br>
                ${company.legalForm || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Gründungsjahr:</strong><br>
                ${company.foundedYear || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Mitarbeiterzahl:</strong><br>
                ${company.employeeCount || 'Nicht angegeben'}
              </div>
            </div>
          </div>

          <div class="section">
            <h3>🤝 Partner-Informationen</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Partner-Typ:</strong><br>
                ${partnerDetails.partnerType || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Erfahrung:</strong><br>
                ${partnerDetails.experience || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Arbeitsgebiet:</strong><br>
                ${partnerDetails.workingArea || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Versicherungsstatus:</strong><br>
                ${partnerDetails.insuranceStatus || 'Nicht angegeben'}
              </div>
            </div>
          </div>

          ${partnerScoring ? `
          <div class="section">
            <h3>🎯 Ihre Bewertung</h3>
            <div class="score-box">
              <h2>${partnerScoring.category || 'Bewertung läuft'}</h2>
              <p>Final-Score: ${partnerScoring.finalScore || 0}/100 Punkte</p>
              <p>Status: ${this.getStatusText(partnerScoring.status)}</p>
            </div>
            
            ${partnerScoring.action ? `
            <div class="success">
              <strong>📋 Nächste Schritte:</strong><br>
              ${partnerScoring.action}
            </div>
            ` : ''}
            
            ${partnerScoring.warnings && partnerScoring.warnings.length > 0 ? `
            <div class="warning">
              <strong>⚠️ Hinweise:</strong><br>
              ${partnerScoring.warnings.map(warning => `• ${warning}`).join('<br>')}
            </div>
            ` : ''}
          </div>
          ` : ''}

          <div class="section">
            <h3>📞 Kontaktdaten</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Name:</strong><br>
                ${contact.firstName} ${contact.lastName}
              </div>
              <div class="info-item">
                <strong>E-Mail:</strong><br>
                ${contact.email}
              </div>
              <div class="info-item">
                <strong>Telefon:</strong><br>
                ${contact.phone || contact.mobile || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Position:</strong><br>
                ${contact.position || 'Nicht angegeben'}
              </div>
            </div>
          </div>

          <div class="section">
            <h3>⏰ Was passiert als nächstes?</h3>
            <p>Unser Partner-Team wird Ihre Bewerbung innerhalb der nächsten 24 Stunden prüfen und sich bei Ihnen melden. Bei Fragen können Sie uns gerne unter <strong>partner@balkonfuchs.de</strong> kontaktieren.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Mit freundlichen Grüßen<br>
          Ihr BALKONFUCHS Partner-Team</p>
          <p>BALKONFUCHS GmbH | partner@balkonfuchs.de | www.balkonfuchs.de</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Generiert Text-E-Mail für Bewerber
   */
  generateApplicantEmailText(formData, partnerScoring) {
    const { contact, company, partnerDetails } = formData;
    
    return `
BALKONFUCHS Partner-Programm - Bewerbungsbestätigung

Hallo ${contact.salutation || ''} ${contact.lastName},

vielen Dank für Ihr Interesse an einer Partnerschaft mit BALKONFUCHS! 
Wir haben Ihre Bewerbung erfolgreich erhalten und werden diese sorgfältig prüfen.

IHRE UNTERNEHMENSDATEN:
- Unternehmensname: ${company.name || 'Nicht angegeben'}
- Rechtsform: ${company.legalForm || 'Nicht angegeben'}
- Gründungsjahr: ${company.foundedYear || 'Nicht angegeben'}
- Mitarbeiterzahl: ${company.employeeCount || 'Nicht angegeben'}

PARTNER-INFORMATIONEN:
- Partner-Typ: ${partnerDetails.partnerType || 'Nicht angegeben'}
- Erfahrung: ${partnerDetails.experience || 'Nicht angegeben'}
- Arbeitsgebiet: ${partnerDetails.workingArea || 'Nicht angegeben'}
- Versicherungsstatus: ${partnerDetails.insuranceStatus || 'Nicht angegeben'}

${partnerScoring ? `
IHRE BEWERTUNG:
- Kategorie: ${partnerScoring.category || 'Bewertung läuft'}
- Final-Score: ${partnerScoring.finalScore || 0}/100 Punkte
- Status: ${this.getStatusText(partnerScoring.status)}

${partnerScoring.action ? `NÄCHSTE SCHRITTE: ${partnerScoring.action}` : ''}

${partnerScoring.warnings && partnerScoring.warnings.length > 0 ? `
HINWEISE:
${partnerScoring.warnings.map(warning => `- ${warning}`).join('\n')}
` : ''}
` : ''}

KONTAKTDATEN:
- Name: ${contact.firstName} ${contact.lastName}
- E-Mail: ${contact.email}
- Telefon: ${contact.phone || contact.mobile || 'Nicht angegeben'}
- Position: ${contact.position || 'Nicht angegeben'}

WAS PASSIERT ALS NÄCHSTES?
Unser Partner-Team wird Ihre Bewerbung innerhalb der nächsten 24 Stunden prüfen 
und sich bei Ihnen melden. Bei Fragen können Sie uns gerne unter 
partner@balkonfuchs.de kontaktieren.

Mit freundlichen Grüßen
Ihr BALKONFUCHS Partner-Team

BALKONFUCHS GmbH
partner@balkonfuchs.de
www.balkonfuchs.de
    `;
  }

  /**
   * Generiert HTML-E-Mail für internes Team
   */
  generateInternalEmailHTML(formData, partnerScoring, zohoResults = null) {
    const { contact, company, partnerDetails } = formData;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Neue Partner-Bewerbung - ${company.name}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ff6b35; }
        .score-box { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .zoho-status { background: #e3f2fd; border: 1px solid #bbdefb; padding: 15px; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 NEUE PARTNER-BEWERBUNG</h1>
          <h2>${company.name || 'Unbekanntes Unternehmen'}</h2>
          <p>${partnerScoring?.category || 'Bewertung läuft'} | Score: ${partnerScoring?.finalScore || 0}/100</p>
        </div>
        
        <div class="content">
          ${zohoResults ? `
          <div class="section">
            <h3>🔗 Zoho-Integration Status</h3>
            <div class="zoho-status">
              ${zohoResults.success ? `
                <div class="success">
                  <strong>✅ Zoho-Integration erfolgreich</strong><br>
                  ${zohoResults.deskTicket ? `Desk Ticket: ${zohoResults.deskTicket.ticketId || 'Erstellt'}` : ''}<br>
                  ${zohoResults.crmLead ? `CRM Lead: ${zohoResults.crmLead.leadId || 'Erstellt'}` : ''}<br>
                  ${zohoResults.crmContact ? `CRM Kontakt: ${zohoResults.crmContact.contactId || 'Erstellt'}` : ''}
                </div>
              ` : `
                <div class="error">
                  <strong>❌ Zoho-Integration fehlgeschlagen</strong><br>
                  Fehler: ${zohoResults.error || 'Unbekannter Fehler'}<br>
                  <strong>⚠️ Manuelle Verarbeitung erforderlich!</strong>
                </div>
              `}
            </div>
          </div>
          ` : ''}

          <div class="section">
            <h3>🏢 Unternehmensdaten</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Unternehmensname:</strong><br>
                ${company.name || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Rechtsform:</strong><br>
                ${company.legalForm || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Gründungsjahr:</strong><br>
                ${company.foundedYear || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Mitarbeiterzahl:</strong><br>
                ${company.employeeCount || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Website:</strong><br>
                ${company.website || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Adresse:</strong><br>
                ${company.address || 'Nicht angegeben'}<br>
                ${company.zipCode || ''} ${company.city || ''}
              </div>
            </div>
          </div>

          <div class="section">
            <h3>🤝 Partner-Informationen</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Partner-Typ:</strong><br>
                ${partnerDetails.partnerType || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Erfahrung:</strong><br>
                ${partnerDetails.experience || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Spezialisierungen:</strong><br>
                ${partnerDetails.specialties?.join(', ') || 'Keine'}
              </div>
              <div class="info-item">
                <strong>Arbeitsgebiet:</strong><br>
                ${partnerDetails.workingArea || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Versicherungsstatus:</strong><br>
                ${partnerDetails.insuranceStatus || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Referenzen:</strong><br>
                ${partnerDetails.references?.filter(r => r.description).length || 0} angegeben
              </div>
            </div>
          </div>

          ${partnerScoring ? `
          <div class="section">
            <h3>🎯 Partner-Scoring</h3>
            <div class="score-box">
              <h2>${partnerScoring.category || 'Bewertung läuft'}</h2>
              <p>Basis-Score: ${partnerScoring.baseScore || 0}/100 | Final-Score: ${partnerScoring.finalScore || 0}/100</p>
              <p>Qualitäts-Multiplikator: ${partnerScoring.qualityMultiplier ? (partnerScoring.qualityMultiplier * 100).toFixed(0) + '%' : '100%'}</p>
              <p>Status: ${this.getStatusText(partnerScoring.status)}</p>
            </div>
            
            ${partnerScoring.action ? `
            <div class="success">
              <strong>📋 Empfohlene Aktion:</strong><br>
              ${partnerScoring.action}
            </div>
            ` : ''}
            
            ${partnerScoring.warnings && partnerScoring.warnings.length > 0 ? `
            <div class="warning">
              <strong>⚠️ Identifizierte Risikofaktoren:</strong><br>
              ${partnerScoring.warnings.map(warning => `• ${warning}`).join('<br>')}
            </div>
            ` : ''}
          </div>
          ` : ''}

          <div class="section">
            <h3>📞 Kontaktdaten</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Name:</strong><br>
                ${contact.salutation || ''} ${contact.firstName} ${contact.lastName}
              </div>
              <div class="info-item">
                <strong>E-Mail:</strong><br>
                ${contact.email}
              </div>
              <div class="info-item">
                <strong>Telefon:</strong><br>
                ${contact.phone || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Mobil:</strong><br>
                ${contact.mobile || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Position:</strong><br>
                ${contact.position || 'Nicht angegeben'}
              </div>
              <div class="info-item">
                <strong>Kontaktpräferenz:</strong><br>
                ${contact.preferredContact || 'Nicht angegeben'}
              </div>
            </div>
          </div>

          ${partnerDetails.references && partnerDetails.references.some(r => r.description) ? `
          <div class="section">
            <h3>📋 Referenz-Projekte</h3>
            ${partnerDetails.references.map((ref, index) => {
              if (!ref.description) return '';
              return `
              <div class="info-item">
                <strong>Projekt ${index + 1}:</strong><br>
                Beschreibung: ${ref.description}<br>
                Ort: ${ref.location || 'Nicht angegeben'}<br>
                Jahr: ${ref.year || 'Nicht angegeben'}<br>
                Wert: ${ref.value || 'Nicht angegeben'}
              </div>
              `;
            }).join('')}
          </div>
          ` : ''}

          ${partnerDetails.lighthouseProject?.description ? `
          <div class="section">
            <h3>🏆 Leuchtturm-Projekt</h3>
            <div class="info-item">
              <strong>Beschreibung:</strong> ${partnerDetails.lighthouseProject.description}<br>
              <strong>Ort:</strong> ${partnerDetails.lighthouseProject.location || 'Nicht angegeben'}<br>
              <strong>Jahr:</strong> ${partnerDetails.lighthouseProject.year || 'Nicht angegeben'}<br>
              <strong>Wert:</strong> ${partnerDetails.lighthouseProject.value || 'Nicht angegeben'}<br>
              <strong>Besonderheit:</strong> ${partnerDetails.lighthouseProject.special || 'Nicht angegeben'}
            </div>
          </div>
          ` : ''}

          <div class="section">
            <h3>📄 Dokumente</h3>
            <div class="info-item">
              ${partnerDetails.documents ? Object.entries(partnerDetails.documents).map(([key, value]) => 
                `<strong>${this.getDocumentName(key)}:</strong> ${value ? '✅ Vorhanden' : '❌ Nicht vorhanden'}<br>`
              ).join('') : 'Keine Dokumente angegeben'}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Diese E-Mail wurde automatisch generiert am ${new Date().toLocaleString('de-DE')}</p>
          <p>BALKONFUCHS Partner-Management System</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  /**
   * Generiert Text-E-Mail für internes Team
   */
  generateInternalEmailText(formData, partnerScoring, zohoResults = null) {
    const { contact, company, partnerDetails } = formData;
    
    return `
NEUE PARTNER-BEWERBUNG - ${company.name || 'Unbekanntes Unternehmen'}

${zohoResults ? `
ZOHO-INTEGRATION STATUS:
${zohoResults.success ? 
  `✅ Zoho-Integration erfolgreich
   Desk Ticket: ${zohoResults.deskTicket?.ticketId || 'Erstellt'}
   CRM Lead: ${zohoResults.crmLead?.leadId || 'Erstellt'}
   CRM Kontakt: ${zohoResults.crmContact?.contactId || 'Erstellt'}` :
  `❌ Zoho-Integration fehlgeschlagen
   Fehler: ${zohoResults.error || 'Unbekannter Fehler'}
   ⚠️ Manuelle Verarbeitung erforderlich!`
}

` : ''}

UNTERNEHMENSDATEN:
- Unternehmensname: ${company.name || 'Nicht angegeben'}
- Rechtsform: ${company.legalForm || 'Nicht angegeben'}
- Gründungsjahr: ${company.foundedYear || 'Nicht angegeben'}
- Mitarbeiterzahl: ${company.employeeCount || 'Nicht angegeben'}
- Website: ${company.website || 'Nicht angegeben'}
- Adresse: ${company.address || 'Nicht angegeben'}
- PLZ/Stadt: ${company.zipCode || ''} ${company.city || ''}

PARTNER-INFORMATIONEN:
- Partner-Typ: ${partnerDetails.partnerType || 'Nicht angegeben'}
- Erfahrung: ${partnerDetails.experience || 'Nicht angegeben'}
- Spezialisierungen: ${partnerDetails.specialties?.join(', ') || 'Keine'}
- Arbeitsgebiet: ${partnerDetails.workingArea || 'Nicht angegeben'}
- Versicherungsstatus: ${partnerDetails.insuranceStatus || 'Nicht angegeben'}
- Referenzen: ${partnerDetails.references?.filter(r => r.description).length || 0} angegeben

${partnerScoring ? `
PARTNER-SCORING:
- Kategorie: ${partnerScoring.category || 'Bewertung läuft'}
- Basis-Score: ${partnerScoring.baseScore || 0}/100
- Final-Score: ${partnerScoring.finalScore || 0}/100
- Qualitäts-Multiplikator: ${partnerScoring.qualityMultiplier ? (partnerScoring.qualityMultiplier * 100).toFixed(0) + '%' : '100%'}
- Status: ${this.getStatusText(partnerScoring.status)}

${partnerScoring.action ? `EMPFOHLENE AKTION: ${partnerScoring.action}` : ''}

${partnerScoring.warnings && partnerScoring.warnings.length > 0 ? `
IDENTIFIZIERTE RISIKOFAKTOREN:
${partnerScoring.warnings.map(warning => `- ${warning}`).join('\n')}
` : ''}
` : ''}

KONTAKTDATEN:
- Name: ${contact.salutation || ''} ${contact.firstName} ${contact.lastName}
- E-Mail: ${contact.email}
- Telefon: ${contact.phone || 'Nicht angegeben'}
- Mobil: ${contact.mobile || 'Nicht angegeben'}
- Position: ${contact.position || 'Nicht angegeben'}
- Kontaktpräferenz: ${contact.preferredContact || 'Nicht angegeben'}

${partnerDetails.references && partnerDetails.references.some(r => r.description) ? `
REFERENZ-PROJEKTE:
${partnerDetails.references.map((ref, index) => {
  if (!ref.description) return '';
  return `
Projekt ${index + 1}:
- Beschreibung: ${ref.description}
- Ort: ${ref.location || 'Nicht angegeben'}
- Jahr: ${ref.year || 'Nicht angegeben'}
- Wert: ${ref.value || 'Nicht angegeben'}`;
}).join('\n')}
` : ''}

${partnerDetails.lighthouseProject?.description ? `
LEUCHTTURM-PROJEKT:
- Beschreibung: ${partnerDetails.lighthouseProject.description}
- Ort: ${partnerDetails.lighthouseProject.location || 'Nicht angegeben'}
- Jahr: ${partnerDetails.lighthouseProject.year || 'Nicht angegeben'}
- Wert: ${partnerDetails.lighthouseProject.value || 'Nicht angegeben'}
- Besonderheit: ${partnerDetails.lighthouseProject.special || 'Nicht angegeben'}
` : ''}

DOKUMENTE:
${partnerDetails.documents ? Object.entries(partnerDetails.documents).map(([key, value]) => 
  `${this.getDocumentName(key)}: ${value ? '✅ Vorhanden' : '❌ Nicht vorhanden'}`
).join('\n') : 'Keine Dokumente angegeben'}

---
Diese E-Mail wurde automatisch generiert am ${new Date().toLocaleString('de-DE')}
BALKONFUCHS Partner-Management System
    `;
  }

  /**
   * Hilfsfunktionen
   */
  getStatusText(status) {
    const statusMap = {
      'approved': 'Genehmigt',
      'review': 'Prüfung erforderlich',
      'conditional': 'Bedingte Zulassung',
      'rejected': 'Nicht qualifiziert'
    };
    return statusMap[status] || status;
  }

  getDocumentName(key) {
    const docMap = {
      'businessLicense': 'Gewerbeschein',
      'insurance': 'Versicherungsnachweis',
      'masterCertificate': 'Meisterbrief',
      'diploma': 'Diplom',
      'instructorLicense': 'Ausbilderschein',
      'references': 'Referenzen',
      'portfolio': 'Portfolio'
    };
    return docMap[key] || key;
  }
}

module.exports = EmailService;
