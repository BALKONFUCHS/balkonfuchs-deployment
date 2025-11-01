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

    // Prüfen ob wir auf localhost sind (dort nicht laden)
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('local');
    
    if (isLocalhost) {
      console.log('ZOHO SalesIQ skipped on localhost - will load on production domain');
      return;
    }

    console.log('ZOHO SalesIQ loading on domain:', window.location.hostname);

    // Prüfen ob das Widget bereits geladen ist
    if (document.getElementById('zsiqscript')) {
      console.log('ZOHO Sales IQ already loaded');
      return;
    }

    // Prüfen ob bereits global geladen
    if (window.zohoSalesIQLoaded) {
      console.log('ZOHO Sales IQ already loaded globally');
      return;
    }

    // Globalen Flag setzen
    window.zohoSalesIQLoaded = true;

    console.log('Loading ZOHO Sales IQ widget with code:', WIDGET_CODE);

    // Erste Script: Initialisierung (exakt wie im offiziellen Zoho Code)
    // Dieses Script muss ZUERST geladen werden, bevor das Widget-Script geladen wird
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function() {} };

    // Initialisierungs-Script hinzufügen
    const initScript = document.createElement('script');
    initScript.type = 'text/javascript';
    initScript.innerHTML = 'window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}';
    document.head.appendChild(initScript);
    console.log('ZOHO Sales IQ initialization script added');

    // Zweite Script: Haupt-Widget laden (exakt wie im offiziellen Zoho Code)
    const widgetScript = document.createElement('script');
    widgetScript.id = 'zsiqscript';
    widgetScript.src = `https://salesiq.zohopublic.eu/widget?wc=${WIDGET_CODE}`;
    widgetScript.defer = true;
    
    widgetScript.onload = () => {
      console.log('ZOHO Sales IQ script loaded successfully');
      
      // Widget nach kurzer Verzögerung prüfen
      setTimeout(() => {
        try {
          if (window.$zoho?.salesiq?.floatwindow) {
            console.log('ZOHO Sales IQ: floatwindow API available');
          }
          if (window.$zoho?.salesiq?.show) {
            console.log('ZOHO Sales IQ: show API available');
          }
          console.log('ZOHO Sales IQ object:', window.$zoho?.salesiq);
        } catch (error) {
          console.log('ZOHO Sales IQ widget check error:', error);
        }
      }, 2000);
    };
    
    widgetScript.onerror = (error) => {
      console.error('Error loading ZOHO Sales IQ script:', error);
      console.error('Please check if the widget code is correct:', WIDGET_CODE);
      window.zohoSalesIQLoaded = false; // Reset flag on error
    };
    
    // Script zum Head hinzufügen
    document.head.appendChild(widgetScript);
    console.log('ZOHO Sales IQ widget script added to head');

    // Cleanup-Funktion
    return () => {
      // Scripts bleiben geladen für andere Seiten
    };
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
