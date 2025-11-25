import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // Widget-Code aus Zoho SalesIQ Dashboard
  const WIDGET_CODE = 'siq173575c67f7c8b4a6c63f3aa6f0affe5d984f3967818623fb6b9c294d4867f05';

  return (
    <Html lang="de">
      <Head>
        <base href="/" />
        {/* Google Fonts - direkt laden statt über CSS @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* ZOHO Sales IQ Widget - Direkt im HTML für frühes Visitor-Tracking */}
        {/* WICHTIG: Muss VOR dem schließenden </body> Tag sein für korrektes Visitor-Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Nur auf registrierter Domain laden
                var hostname = window.location.hostname;
                var isRegisteredDomain = hostname === 'balkonfuchs.de' || hostname === 'www.balkonfuchs.de';
                var isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('local');
                
                if (isLocalhost || !isRegisteredDomain) {
                  return; // Widget nicht auf localhost oder nicht-registrierten Domains laden
                }
                
                // KRITISCH: Initialisierung MUSS VOR dem Widget-Script erfolgen für Visitor-Tracking
                window.$zoho = window.$zoho || {};
                window.$zoho.salesiq = window.$zoho.salesiq || {
                  widgetcode: "${WIDGET_CODE}",
                  values: {},
                  ready: function() {
                    console.log('ZOHO Sales IQ ready - Visitor tracking aktiviert');
                  }
                };
                
                // Widget-Script laden (OHNE defer für frühes Tracking)
                if (!document.getElementById('zsiqscript')) {
                  var script = document.createElement('script');
                  script.id = 'zsiqscript';
                  script.src = 'https://salesiq.zohopublic.eu/widget?wc=${WIDGET_CODE}';
                  script.async = true;
                  document.body.appendChild(script);
                }
              })();
            `.replace(/\$\{WIDGET_CODE\}/g, WIDGET_CODE),
          }}
        />
      </body>
    </Html>
  )
}