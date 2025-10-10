import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonErfahrungenRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual experiences page
    router.replace('/erfahrungen/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Erfahrungen</title>
        <meta name="description" content="Echte Erfahrungsberichte von Balkonbau-Projekten. Lesen Sie Bewertungen und Erfahrungen von Kunden." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/erfahrungen/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h1>Weiterleitung zu den Erfahrungen...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/erfahrungen/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
