/**
 * ZOHO Sales IQ Widget Component
 * 
 * Diese Komponente integriert das ZOHO Sales IQ Chat-Widget
 * auf allen Seiten der BALKONFUCHS-Website
 * 
 * Offizieller Zoho Code:
 * <script>window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}</script>
 * <script id="zsiqscript" src="https://salesiq.zohopublic.eu/widget?wc=siq173575c67f7c8b4a6c63f3aa6f0affe5d984f3967818623fb6b9c294d4867f05" defer></script>
 */

import { useEffect } from 'react';

// Widget-Code aus Zoho SalesIQ Dashboard
const WIDGET_CODE = 'siq173575c67f7c8b4a6c63f3aa6f0affe5d984f3967818623fb6b9c294d4867f05';

const ZohoSalesIQ = () => {
  useEffect(() => {
    // Nur auf dem Client ausführen
    if (typeof window === 'undefined') return;

    // WICHTIG: Das Widget wird jetzt direkt in _document.js geladen für frühes Visitor-Tracking
    // Diese Komponente dient nur noch als Fallback/Placeholder
    // Prüfen ob das Widget bereits geladen wurde (aus _document.js)
    if (document.getElementById('zsiqscript')) {
      console.log('ZOHO Sales IQ already loaded from _document.js');
      return;
    }

    // Fallback: Falls das Script aus _document.js nicht geladen wurde, hier laden
    // (sollte normalerweise nicht passieren)
    const hostname = window.location.hostname;
    const isRegisteredDomain = hostname === 'balkonfuchs.de' || 
                               hostname === 'www.balkonfuchs.de';
    const isLocalhost = hostname === 'localhost' || 
                       hostname === '127.0.0.1' ||
                       hostname.includes('local');
    
    if (isLocalhost || !isRegisteredDomain) {
      return;
    }

    console.log('ZOHO SalesIQ: Fallback loading (should not happen if _document.js works)');

    // Fallback-Initialisierung
    if (!window.$zoho) {
      window.$zoho = {};
    }
    if (!window.$zoho.salesiq) {
      window.$zoho.salesiq = {
        widgetcode: WIDGET_CODE,
        values: {},
        ready: function() {
          console.log('ZOHO Sales IQ ready (fallback)');
        }
      };
    }

    const widgetScript = document.createElement('script');
    widgetScript.id = 'zsiqscript';
    widgetScript.src = `https://salesiq.zohopublic.eu/widget?wc=${WIDGET_CODE}`;
    widgetScript.async = true;
    document.body.appendChild(widgetScript);
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
