/**
 * ZOHO Sales IQ Widget Component
 * 
 * Diese Komponente integriert das ZOHO Sales IQ Chat-Widget
 * auf allen Seiten der BALKONFUCHS-Website
 * 
 * WICHTIG: Bitte den korrekten Widget-Code in der Variable WIDGET_CODE unten eintragen!
 * Den Widget-Code findest du in deinem Zoho SalesIQ Dashboard unter:
 * Settings → Widget Setup → Website Integration → Embed Code
 */

import { useEffect } from 'react';

// HIER DEN KORREKTEN WIDGET-CODE EINTRAGEN
// Format: siqXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (lange Zeichenfolge)
// Vollständiger Code aus Zoho SalesIQ Dashboard
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

    // Globaler Flag um mehrfaches Laden zu verhindern
    if (window.zohoSalesIQLoaded) {
      console.log('ZOHO Sales IQ already loaded globally');
      return;
    }

    // Widget-Code validieren
    if (!WIDGET_CODE || !WIDGET_CODE.startsWith('siq')) {
      console.error('ZOHO SalesIQ: Invalid widget code! Please update WIDGET_CODE in ZohoSalesIQ.js');
      return;
    }

    const loadSalesIQ = () => {
      // Prüfen ob das Script bereits geladen ist
      if (document.getElementById('zsiqscript') || window.$zoho?.salesiq?.widgetcode) {
        console.log('ZOHO Sales IQ already loaded');
        return;
      }

      // Globalen Flag setzen
      window.zohoSalesIQLoaded = true;

      console.log('Loading ZOHO Sales IQ widget with code:', WIDGET_CODE);

      // Erste Script: Initialisierung (wie im offiziellen Zoho Code)
      // window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}
      const initScript = document.createElement('script');
      initScript.innerHTML = 'window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}';
      document.head.appendChild(initScript);
      console.log('ZOHO Sales IQ initialization script added');

      // ZOHO Sales IQ Standard Integration - wie im Zoho Dashboard empfohlen
      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || {
        ready: function() {
          console.log('ZOHO Sales IQ widget ready');
          
          // Widget automatisch anzeigen (Zoho Standard-Verhalten)
          try {
            // Standard-Zoho Methode
            if (window.$zoho?.salesiq?.floatwindow) {
              window.$zoho.salesiq.floatwindow.visible('show');
              console.log('ZOHO Sales IQ floatwindow shown');
            }
          } catch (error) {
            console.log('ZOHO Sales IQ widget configuration error:', error);
          }
        }
      };

      // Zweite Script: Haupt-Widget laden (wie im offiziellen Zoho Code)
      // <script id="zsiqscript" src="https://salesiq.zohopublic.eu/widget?wc=..." defer></script>
      const script = document.createElement('script');
      script.id = 'zsiqscript';
      script.src = `https://salesiq.zohopublic.eu/widget?wc=${WIDGET_CODE}`;
      script.defer = true;
      
      script.onload = () => {
        console.log('ZOHO Sales IQ script loaded successfully');
      };
      
      script.onerror = (error) => {
        console.error('Error loading ZOHO Sales IQ script:', error);
        console.error('Please check if the widget code is correct:', WIDGET_CODE);
      };
      
      // Script zum Head hinzufügen
      document.head.appendChild(script);

      // Fallback: Widget nach 3 Sekunden nochmal prüfen
      setTimeout(() => {
        try {
          if (window.$zoho?.salesiq?.floatwindow) {
            window.$zoho.salesiq.floatwindow.visible('show');
            console.log('ZOHO Sales IQ widget shown in fallback');
          }
        } catch (error) {
          console.log('ZOHO Sales IQ fallback error:', error);
        }
      }, 3000);
    };

    // Widget laden
    loadSalesIQ();

    // Cleanup-Funktion
    return () => {
      // Scripts bleiben geladen für andere Seiten
    };
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
