import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <base href="/" />
        {/* Google Fonts - direkt laden statt über CSS @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        
        {/* ZOHO Sales IQ Widget - mit Fehlerbehandlung */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(){
              try {
                // Für Tests auch auf Netlify-Domain laden
                var host = window.location.hostname;
                var isPrimary = host === 'balkonfuchs.de' || host === 'www.balkonfuchs.de' || host === 'balkonfuchs-funnel.netlify.app' || host === '7funnel.balkonfuchs.de' || host === '7funnel.balkonfuchs.de.w01cfc79.kasserver.com';
                if (!isPrimary) { 
                  console.log('ZOHO SalesIQ skipped on host:', host); 
                  return; 
                }
                
                window.$zoho = window.$zoho || {};
                $zoho.salesiq = $zoho.salesiq || {
                  ready: function(){
                    try {
                      console.log('ZOHO Sales IQ ready from _document.js');
                      // Widget nach 2 Sekunden anzeigen
                      setTimeout(function() {
                        try {
                          if ($zoho.salesiq && $zoho.salesiq.show) {
                            $zoho.salesiq.show();
                            console.log('ZOHO Sales IQ shown from _document.js');
                          }
                        } catch(e) {
                          console.warn('ZOHO SalesIQ show error:', e);
                        }
                      }, 2000);
                    } catch(e) {
                      console.warn('ZOHO SalesIQ ready error:', e);
                    }
                  }
                };
                
                // Script dynamisch laden mit Fehlerbehandlung
                var script = document.createElement('script');
                script.id = 'zsiqscript';
                script.src = 'https://salesiq.zohopublic.eu/widget?wc=siq173575c67f7c8b4a6c63f3aa6f0affe5d984f3967818623fb6b9c294d4867f05';
                script.defer = true;
                script.onerror = function() {
                  console.warn('ZOHO SalesIQ script failed to load');
                };
                document.head.appendChild(script);
              } catch(e) {
                console.warn('ZOHO SalesIQ initialization error:', e);
              }
            })();
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}