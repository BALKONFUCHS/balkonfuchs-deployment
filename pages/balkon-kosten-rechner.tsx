import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonKostenRechnerRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual calculator page
    router.replace('/kalkulator/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Kosten Rechner</title>
        <meta name="description" content="Kalkulieren Sie die Kosten für Ihren Balkon in nur 2 Minuten. Kostenloser Balkon-Kostenrechner mit regionalen Preisen." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/kalkulator/" />
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
          <h1>Weiterleitung zum Balkon-Kostenrechner...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/kalkulator/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
