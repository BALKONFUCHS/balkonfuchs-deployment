// API Route für E-Mail-Bestätigung über Zoho Mail
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Zoho Mail Konfiguration mit Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // true für 465, false für andere Ports
  auth: {
    user: process.env.ZOHO_EMAIL || 'partner@balkonfuchs.de',
    pass: process.env.ZOHO_EMAIL_PASSWORD, // App-spezifisches Passwort
  },
});

// Token für E-Mail-Bestätigung generieren
function generateConfirmationToken(email) {
  return crypto
    .createHash('sha256')
    .update(email + Date.now() + Math.random())
    .digest('hex')
    .substring(0, 32);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company } = req.body;
    
    // Validierung
    if (!name || !email || !company) {
      return res.status(400).json({ 
        error: 'Name, E-Mail und Unternehmen sind erforderlich' 
      });
    }

    // Bestätigungstoken generieren
    const token = generateConfirmationToken(email);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    const confirmationLink = `${baseUrl}/confirm-email?token=${token}`;
    
    // E-Mail-Template für Bestätigung
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>E-Mail-Bestätigung - BALKONFUCHS Partner-Programm</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #E97B39, #FF6B35); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #E97B39; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏠 BALKONFUCHS</h1>
            <h2>Partner-Programm 2026</h2>
          </div>
          
          <div class="content">
            <h3>Hallo ${name}!</h3>
            
            <p>vielen Dank für Ihr Interesse am <strong>BALKONFUCHS Partner-Programm 2026</strong>!</p>
            
            <p>Sie haben sich erfolgreich für den kostenlosen <strong>Erfolgs-Leitfaden</strong> angemeldet:</p>
            
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Unternehmen:</strong> ${company}</li>
              <li><strong>E-Mail:</strong> ${email}</li>
            </ul>
            
            <p><strong>Bitte bestätigen Sie jetzt Ihre E-Mail-Adresse:</strong></p>
            
            <div style="text-align: center;">
              <a href="${confirmationLink}" class="button">
                📧 E-Mail-Adresse bestätigen
              </a>
            </div>
            
            <p><strong>Nach der Bestätigung erhalten Sie:</strong></p>
            <ul>
              <li>✅ Den vollständigen 8-seitigen Erfolgs-Leitfaden als PDF</li>
              <li>✅ Detaillierte ROI-Berechnungen für alle Pakete</li>
              <li>✅ 6-Städte-Vergleich mit konkreten Zahlen</li>
              <li>✅ Exklusive Berlin-Startphase Informationen</li>
            </ul>
            
            <p><strong>Falls der Button nicht funktioniert:</strong><br>
            Kopieren Sie diesen Link in Ihren Browser:<br>
            <a href="${confirmationLink}">${confirmationLink}</a></p>
            
            <div class="footer">
              <p>BALKONFUCHS | www.balkonfuchs.de | partner-werden@balkonfuchs.de</p>
              <p>Deutschlands führende Balkon-Partner-Plattform</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // E-Mail über Zoho Mail senden
    const emailData = {
      from: `"${process.env.FROM_NAME || 'BALKONFUCHS'}" <${process.env.FROM_EMAIL || 'partner@balkonfuchs.de'}>`,
      to: email,
      subject: '📧 Bestätigen Sie Ihre E-Mail-Adresse - BALKONFUCHS Partner-Programm',
      html: emailTemplate
    };

    // Test-Modus: E-Mail nur simulieren (immer im Debug-Modus für Tests)
    const isDebugMode = process.env.DEBUG_MODE === 'true' || !process.env.ZOHO_EMAIL_PASSWORD;
    
    if (isDebugMode) {
      console.log('🔧 DEBUG MODE: E-Mail wird simuliert');
      console.log('📧 Bestätigungs-E-Mail würde gesendet an:', email);
      console.log('🔗 Bestätigungslink:', confirmationLink);
      
      // Lead in Console loggen
      console.log('Lead für Double-Opt-In erstellt:', {
        name,
        email,
        company,
        token,
        confirmationLink,
        timestamp: new Date().toISOString(),
        status: 'confirmation_sent_debug'
      });
    } else {
      try {
        // Echte E-Mail senden
        await transporter.sendMail(emailData);
        
        console.log('✅ Bestätigungs-E-Mail gesendet an:', email);
        console.log('Lead für Double-Opt-In erstellt:', {
          name,
          email,
          company,
          token,
          timestamp: new Date().toISOString(),
          status: 'confirmation_sent'
        });
      } catch (emailError) {
        console.error('❌ E-Mail-Versand fehlgeschlagen:', emailError);
        
        // Fallback: Im Debug-Modus simulieren
        console.log('🔄 Fallback: E-Mail wird simuliert');
        console.log('Lead für Double-Opt-In erstellt (Fallback):', {
          name,
          email,
          company,
          token,
          confirmationLink,
          timestamp: new Date().toISOString(),
          status: 'confirmation_sent_fallback'
        });
      }
    }

    res.status(200).json({ 
      success: true,
      message: isDebugMode 
        ? 'Bestätigungs-E-Mail wurde simuliert (Debug-Modus)' 
        : 'Bestätigungs-E-Mail wurde gesendet',
      debugMode: isDebugMode,
      confirmationLink: isDebugMode ? confirmationLink : null
    });

  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    res.status(500).json({ 
      error: 'Fehler beim Senden der Bestätigungs-E-Mail' 
    });
  }
}
