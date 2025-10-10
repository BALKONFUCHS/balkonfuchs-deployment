import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonFoerderungRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/foerderung/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Förderung</title>
        <meta name="description" content="Förderungen und Zuschüsse für Ihren Balkonbau. Alle aktuellen Förderprogramme und Antragsmöglichkeiten." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/foerderung/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
          <h1>Weiterleitung zur Förderung...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/foerderung/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
