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
        
        {/* ZOHO Sales IQ Widget wird über die ZohoSalesIQ Komponente geladen */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}