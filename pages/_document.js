import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // Widget-Code aus Zoho SalesIQ Dashboard
  const WIDGET_CODE = 'siq173575c67f7c8b4a6c63f3aa6f0affe5d984f3967818623fb6b9c294d4867f05';

  return (
    <Html lang="de">
      <Head>
        <base href="/" />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1f2937" />
        
        {/* Google Fonts - direkt laden statt über CSS @import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* ZOHO Sales IQ Widget - Direkt im HTML wie in homepage.html für Visitor-Tracking */}
        {/* WICHTIG: Muss EXAKT wie in homepage.html sein - direkt im HTML, nicht in React */}
        {/* Initialisierung MUSS VOR dem Widget-Script sein */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.$zoho = window.$zoho || {};
                window.$zoho.salesiq = window.$zoho.salesiq || {
                  widgetcode: "${WIDGET_CODE}",
                  values: {},
                  ready: function() {
                    console.log('Zoho SalesIQ loaded - Visitor tracking aktiviert');
                  }
                };
              })();
            `,
          }}
        />
        {/* Widget-Script - OHNE defer für frühes Visitor-Tracking */}
        <script
          id="zsiqscript"
          src={`https://salesiq.zohopublic.eu/widget?wc=${WIDGET_CODE}`}
        />
      </body>
    </Html>
  )
}