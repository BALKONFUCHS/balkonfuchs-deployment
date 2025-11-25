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

    // Prüfen ob wir auf der registrierten Domain sind
    // Widget läuft nur auf balkonfuchs.de (Domain muss in Zoho SalesIQ Dashboard registriert sein)
    const hostname = window.location.hostname;
    const isRegisteredDomain = hostname === 'balkonfuchs.de' || 
                               hostname === 'www.balkonfuchs.de';
    
    // Localhost-Prüfung
    const isLocalhost = hostname === 'localhost' || 
                       hostname === '127.0.0.1' ||
                       hostname.includes('local');
    
    if (isLocalhost) {
      console.log('ZOHO SalesIQ skipped on localhost - will load on production domain');
      return;
    }
    
    if (!isRegisteredDomain) {
      console.log(`ZOHO SalesIQ skipped on ${hostname} - only loads on balkonfuchs.de (must be registered in Zoho SalesIQ Dashboard)`);
      return;
    }

    console.log('ZOHO SalesIQ loading on registered domain:', hostname);

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

    // KRITISCH: Initialisierung MUSS SYNCHRON erfolgen, BEVOR das Widget-Script geladen wird
    // WICHTIG: widgetcode und values sind ESSENTIELL für Visitor-Tracking!
    // Diese Initialisierung muss VOR dem Script-Tag gesetzt werden, damit Zoho SalesIQ
    // die Besucher korrekt tracken kann
    if (!window.$zoho) {
      window.$zoho = {};
    }
    if (!window.$zoho.salesiq) {
      window.$zoho.salesiq = {
        widgetcode: WIDGET_CODE,
        values: {},
        ready: function() {
          console.log('ZOHO Sales IQ ready - Visitor tracking aktiviert');
        }
      };
    } else {
      // Falls bereits initialisiert, widgetcode und values sicherstellen
      if (!window.$zoho.salesiq.widgetcode) {
        window.$zoho.salesiq.widgetcode = WIDGET_CODE;
      }
      if (!window.$zoho.salesiq.values) {
        window.$zoho.salesiq.values = {};
      }
    }

    console.log('ZOHO Sales IQ initialization completed with widgetcode for visitor tracking');

    // Widget-Script laden (OHNE defer, damit es sofort geladen wird und die Initialisierung nutzt)
    const widgetScript = document.createElement('script');
    widgetScript.id = 'zsiqscript';
    widgetScript.src = `https://salesiq.zohopublic.eu/widget?wc=${WIDGET_CODE}`;
    // WICHTIG: Kein defer - das Script muss die bereits gesetzte Initialisierung nutzen
    
    widgetScript.onload = () => {
      console.log('ZOHO Sales IQ script loaded successfully');
      
      // Widget-Verfügbarkeit prüfen (nur für Debugging, keine automatische Öffnung)
      setTimeout(() => {
        try {
          console.log('ZOHO Sales IQ full object check:', {
            hasZoho: !!window.$zoho,
            hasSalesIQ: !!window.$zoho?.salesiq,
            hasFloatWindow: !!window.$zoho?.salesiq?.floatwindow,
            hasShow: !!window.$zoho?.salesiq?.show,
            salesIQ: window.$zoho?.salesiq
          });
          
          // Widget ist geladen und als Icon sichtbar - öffnet sich nur bei User-Klick
          if (window.$zoho?.salesiq?.floatwindow) {
            console.log('ZOHO Sales IQ: floatwindow API available - Widget wird nur bei User-Klick geöffnet');
          }
          if (window.$zoho?.salesiq?.show) {
            console.log('ZOHO Sales IQ: show API available - Widget wird nur bei User-Klick geöffnet');
          }
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
    
    // Script zum Body hinzufügen (wie Zoho empfiehlt - vor </body>)
    document.body.appendChild(widgetScript);
    console.log('ZOHO Sales IQ widget script added to body');

    // Cleanup-Funktion
    return () => {
      // Scripts bleiben geladen für andere Seiten
    };
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
