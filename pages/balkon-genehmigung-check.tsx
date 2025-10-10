import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonGenehmigungCheckRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual approval check page
    router.replace('/genehmigung/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Genehmigungscheck</title>
        <meta name="description" content="Prüfen Sie die Genehmigungspflicht für Ihr Balkonbau-Projekt. Kostenloser Genehmigungscheck mit rechtlicher Beratung." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/genehmigung/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h1>Weiterleitung zum Genehmigungscheck...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/genehmigung/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
