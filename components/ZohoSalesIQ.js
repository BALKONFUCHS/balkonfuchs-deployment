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

      // Warten bis das DOM vollständig geladen ist
      const loadSalesIQ = () => {
        // Prüfen ob das Script bereits geladen ist
        if (document.getElementById('zsiqscript') || window.$zoho?.salesiq?.widgetcode) {
          console.log('ZOHO Sales IQ already loaded');
          return;
        }

        // Globalen Flag setzen
        window.zohoSalesIQLoaded = true;

        console.log('Loading ZOHO Sales IQ widget...');

        // ZOHO Sales IQ Konfiguration - Standard Widget Integration
        window.$zoho = window.$zoho || {};
        window.$zoho.salesiq = window.$zoho.salesiq || {
          widgetcode: 'siq173575c67f7c85d984f3967818623fb6b9c294d4867f05',
          values: {},
          ready: function() {
            console.log('ZOHO Sales IQ widget ready');
            
            // Widget-Konfiguration
            try {
              if (window.$zoho?.salesiq?.floatwindow) {
                window.$zoho.salesiq.floatwindow.visible('show');
                console.log('ZOHO Sales IQ floatwindow shown');
              }
              
              // Alternative Widget-API
              if (window.$zoho?.salesiq?.widget) {
                window.$zoho.salesiq.widget.set({
                  position: 'bottomright',
                  theme: 'light',
                  showOnLoad: true,
                  hideOffline: false
                });
                console.log('ZOHO Sales IQ widget configured');
              }
            } catch (error) {
              console.log('ZOHO Sales IQ widget configuration error:', error);
            }
            
            // Widget explizit anzeigen nach kurzer Verzögerung
            setTimeout(() => {
              try {
                if (window.$zoho?.salesiq?.floatwindow) {
                  window.$zoho.salesiq.floatwindow.visible('show');
                  console.log('ZOHO Sales IQ widget shown via floatwindow');
                }
                if (window.$zoho?.salesiq?.show) {
                  window.$zoho.salesiq.show();
                  console.log('ZOHO Sales IQ widget shown');
                }
              } catch (error) {
                console.log('ZOHO Sales IQ widget show error:', error);
              }
            }, 1000);
          }
        };

        // Hauptscript laden - Standard Zoho SalesIQ Integration
        const script = document.createElement('script');
        script.id = 'zsiqscript';
        script.src = 'https://salesiq.zohopublic.eu/widget?wc=siq173575c67f7c85d984f3967818623fb6b9c294d4867f05';
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

        // Fallback: Widget nach 3 Sekunden nochmal prüfen und anzeigen
        setTimeout(() => {
          try {
            if (window.$zoho?.salesiq?.floatwindow) {
              window.$zoho.salesiq.floatwindow.visible('show');
              console.log('ZOHO Sales IQ widget shown in fallback');
            } else if (window.$zoho?.salesiq?.show) {
              window.$zoho.salesiq.show();
              console.log('ZOHO Sales IQ widget shown in fallback (alternative)');
            } else if (!document.getElementById('zsiqscript')) {
              // Script nochmal laden falls es fehlgeschlagen ist
              console.log('ZOHO Sales IQ fallback: reloading script...');
              const fallbackScript = document.createElement('script');
              fallbackScript.id = 'zsiqscript-fallback';
              fallbackScript.src = 'https://salesiq.zohopublic.eu/widget?wc=siq173575c67f7c85d984f3967818623fb6b9c294d4867f05';
              fallbackScript.defer = true;
              fallbackScript.async = true;
              document.head.appendChild(fallbackScript);
              console.log('ZOHO Sales IQ fallback script loaded');
            }
          } catch (error) {
            console.log('ZOHO Sales IQ fallback error:', error);
          }
        }, 3000);
      };

      // Widget laden sofort (keine Verzögerung mehr)
      loadSalesIQ();

    // Cleanup-Funktion
    return () => {
      // Scripts entfernen nur wenn alle Komponenten unmounten
      // window.zohoSalesIQLoaded = false; // Nicht zurücksetzen, da andere Seiten das Widget brauchen
      // Scripts bleiben geladen für andere Seiten
    };
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
