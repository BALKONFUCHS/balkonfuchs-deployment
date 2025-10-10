import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonBaustartPlanerRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual construction planning page
    router.replace('/bauzeit-planung/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Bauzeit-Planung</title>
        <meta name="description" content="Planen Sie die Bauzeit für Ihr Balkonbau-Projekt. Zeitplanung und Terminkoordination mit Balkonbauern." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/bauzeit-planung/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
          <h1>Weiterleitung zur Bauzeit-Planung...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/bauzeit-planung/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
