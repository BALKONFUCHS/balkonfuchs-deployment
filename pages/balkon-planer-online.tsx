import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonPlanerOnlineRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual planner page
    router.replace('/planer/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Planer Online</title>
        <meta name="description" content="Planen Sie Ihren Balkon Schritt für Schritt. Detaillierter Online-Balkon-Planer mit Konfigurator." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/planer/" />
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
          <h1>Weiterleitung zum Balkon-Planer...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/planer/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
