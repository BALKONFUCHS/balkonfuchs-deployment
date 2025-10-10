/**
 * ZOHO Sales IQ Widget Component
 * 
 * Diese Komponente integriert das ZOHO Sales IQ Chat-Widget
 * auf allen Seiten der BALKONFUCHS-Website
 */

import { useEffect } from 'react';

const ZohoSalesIQ = () => {
  useEffect(() => {
    // Nur auf dem Client ausführen
    if (typeof window === 'undefined') return;

    // Prüfen ob wir auf der echten Domain sind (nicht localhost)
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('local');
    
    const isNetlifyDomain = window.location.hostname.includes('netlify.app');
    
    if (isLocalhost) {
      console.log('ZOHO Sales IQ skipped on localhost - will load on production domain');
      return;
    }
    
    // Lade auch auf Netlify-Domains für Testing
    if (isNetlifyDomain) {
      console.log('ZOHO Sales IQ loading on Netlify domain:', window.location.hostname);
    }

    // Warten bis das DOM vollständig geladen ist
    const loadSalesIQ = () => {
      // Prüfen ob das Script bereits geladen ist
      if (document.getElementById('zsiqscript') || window.$zoho?.salesiq) {
        console.log('ZOHO Sales IQ already loaded');
        return;
      }

      console.log('Loading ZOHO Sales IQ widget...');

      // ZOHO Sales IQ Konfiguration
      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { 
        ready: function() {
          console.log('ZOHO Sales IQ widget ready');
          // Widget explizit anzeigen
          setTimeout(() => {
            if (window.$zoho?.salesiq?.show) {
              window.$zoho.salesiq.show();
              console.log('ZOHO Sales IQ widget shown');
            }
          }, 1000);
        }
      };

      // Erstes Script (Initialisierung)
      const initScript = document.createElement('script');
      initScript.innerHTML = 'window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}';
      document.head.appendChild(initScript);

      // Hauptscript laden
      const script = document.createElement('script');
      script.id = 'zsiqscript';
      script.src = 'https://salesiq.zohopublic.eu/widget?wc=siq173575c67f7c8b4a6c63f3aa6f0affe5d984f3967818623fb6b9c294d4867f05';
      script.defer = true;
      script.async = true;
      
      script.onload = () => {
        console.log('ZOHO Sales IQ script loaded successfully');
      };
      
      script.onerror = (error) => {
        console.error('Error loading ZOHO Sales IQ script:', error);
      };
      
      // Script zum Head hinzufügen
      document.head.appendChild(script);

      // Fallback: Widget nach 3 Sekunden nochmal versuchen
      setTimeout(() => {
        if (!window.$zoho?.salesiq) {
          console.log('ZOHO Sales IQ fallback loading...');
          // Widget nochmal versuchen
        }
      }, 3000);
    };

    // Widget laden mit Verzögerung
    const timer = setTimeout(loadSalesIQ, 1000);

    // Cleanup-Funktion
    return () => {
      clearTimeout(timer);
      const existingScript = document.getElementById('zsiqscript');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
