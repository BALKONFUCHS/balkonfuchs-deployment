import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonAngebotExpressRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual express offer page
    router.replace('/express-angebot/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Express-Angebot</title>
        <meta name="description" content="Schnelle Angebote für Ihren Balkonbau. Express-Angebot in nur 24 Stunden von zertifizierten Balkonbauern." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/express-angebot/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h1>Weiterleitung zum Express-Angebot...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/express-angebot/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
