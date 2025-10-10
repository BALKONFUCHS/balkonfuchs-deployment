// API Route für E-Mail-Bestätigung
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_EMAIL || 'partner@balkonfuchs.de',
    pass: process.env.ZOHO_EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ 
        error: 'Bestätigungstoken fehlt' 
      });
    }

    // TODO: Hier Token aus Datenbank/Zoho CRM validieren
    // Für jetzt simulieren wir eine erfolgreiche Bestätigung
    
    // Lead-Daten aus Token abrufen (simuliert)
    const leadData = {
      name: 'Max Mustermann', // Aus Token/DB abrufen
      email: 'max@beispiel.de',
      company: 'Mustermann GmbH'
    };

    // Erfolgs-E-Mail mit PDF senden
    const successEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Willkommen im BALKONFUCHS Partner-Programm</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #E97B39, #FF6B35); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #E97B39; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Willkommen, ${leadData.name}!</h1>
            <h2>BALKONFUCHS Partner-Programm 2026</h2>
          </div>
          
          <div class="content">
            <p>Herzlichen Glückwunsch! Ihre E-Mail-Adresse wurde erfolgreich bestätigt.</p>
            
            <div class="highlight">
              <h3>📄 Ihr Erfolgs-Leitfaden ist bereit!</h3>
              <p>Im Anhang finden Sie den vollständigen 8-seitigen Erfolgs-Leitfaden mit:</p>
              <ul>
                <li>✅ Detaillierte ROI-Berechnungen für alle Pakete</li>
                <li>✅ 6-Städte-Vergleich (Berlin, München, Hamburg, Frankfurt, Stuttgart, Köln)</li>
                <li>✅ Methodik und Datenbasis der Berechnungen</li>
                <li>✅ Berlin-Startphase bis 31.12.2025</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://balkonfuchs.de/partner/" class="button">
                🚀 Jetzt Partner werden
              </a>
            </div>

            <h3>📞 Nächste Schritte:</h3>
            <ol>
              <li><strong>Leitfaden studieren:</strong> Analysieren Sie die ROI-Berechnungen</li>
              <li><strong>Partnerbewerbung:</strong> Füllen Sie unser Bewerbungsformular aus</li>
              <li><strong>Beratungstermin:</strong> Wir vereinbaren ein unverbindliches Gespräch</li>
              <li><strong>Berlin-Startphase:</strong> Sichern Sie sich vergünstigte Konditionen</li>
            </ol>

            <p><strong>Haben Sie Fragen?</strong><br>
            Kontaktieren Sie uns jederzeit:<br>
            📧 partner-werden@balkonfuchs.de<br>
            🌐 www.balkonfuchs.de/partner-werden</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // E-Mail mit PDF-Link senden
    const emailData = {
      from: `"${process.env.FROM_NAME || 'BALKONFUCHS'}" <${process.env.FROM_EMAIL || 'partner@balkonfuchs.de'}>`,
      to: leadData.email,
      subject: '🎉 Willkommen! Ihr BALKONFUCHS Erfolgs-Leitfaden ist da',
      html: successEmailTemplate
    };

    await transporter.sendMail(emailData);

    // Lead in Zoho CRM als bestätigt markieren
    console.log('Lead bestätigt und PDF gesendet:', {
      ...leadData,
      token,
      confirmedAt: new Date().toISOString(),
      status: 'confirmed'
    });

    res.status(200).json({ 
      success: true,
      message: 'E-Mail erfolgreich bestätigt. Der Erfolgs-Leitfaden wurde per E-Mail gesendet.'
    });

  } catch (error) {
    console.error('Fehler bei der E-Mail-Bestätigung:', error);
    res.status(500).json({ 
      error: 'Fehler bei der Bestätigung. Bitte versuchen Sie es erneut.' 
    });
  }
}
