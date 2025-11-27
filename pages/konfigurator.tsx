import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function KonfiguratorRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Automatischer Redirect zur neuen URL
    router.replace('/balkon-konfigurator/');
  }, [router]);

  return (
    <>
      <Head>
        <title>Weiterleitung... | BALKONFUCHS</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="refresh" content="0; url=/balkon-konfigurator/" />
        <link rel="canonical" href="https://balkonfuchs.de/balkon-konfigurator/" />
      </Head>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Weiterleitung zum Balkon-Konfigurator...</p>
          <p className="text-gray-400 mt-4">
            Falls die Weiterleitung nicht automatisch funktioniert,{' '}
            <a href="/balkon-konfigurator/" className="text-orange-400 hover:underline">
              klicken Sie hier
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
