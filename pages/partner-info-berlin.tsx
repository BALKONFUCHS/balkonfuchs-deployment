import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PartnerInfoBerlinRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Permanent redirect to unified city page
    router.replace('/partner/berlin/');
  }, [router]);

  return (
    <>
      <Head>
        <title>Weiterleitung...</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://balkonfuchs.de/partner/berlin/" />
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#111827',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <p>Weiterleitung zu /partner/berlin/...</p>
          <p style={{ marginTop: '1rem' }}>
            <a href="/partner/berlin/" style={{ color: '#f97316' }}>Falls die Weiterleitung nicht automatisch funktioniert, klicken Sie hier</a>
          </p>
        </div>
      </div>
    </>
  );
}
