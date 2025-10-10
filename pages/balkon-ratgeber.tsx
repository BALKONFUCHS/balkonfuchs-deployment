import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonRatgeberRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ratgeber/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Ratgeber</title>
        <meta name="description" content="Umfassender Ratgeber für Ihren Balkonbau. Tipps, Tricks und wichtige Informationen rund um den Balkonbau." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/ratgeber/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h1>Weiterleitung zum Ratgeber...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/ratgeber/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
