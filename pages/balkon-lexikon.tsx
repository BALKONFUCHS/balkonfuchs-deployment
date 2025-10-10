import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BalkonLexikonRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/lexikon/');
  }, [router]);

  return (
    <>
      <Head>
        <title>BALKONFUCHS - Balkon Lexikon</title>
        <meta name="description" content="Umfassendes Lexikon rund um den Balkonbau. Fachbegriffe, Materialien und Techniken erklärt." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/lexikon/" />
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
          <h1>Weiterleitung zum Lexikon...</h1>
          <p>Falls die Weiterleitung nicht automatisch funktioniert, <a href="/lexikon/" style={{ color: '#f97316' }}>klicken Sie hier</a>.</p>
        </div>
      </div>
    </>
  );
}
