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
      </body>
    </Html>
  )
}