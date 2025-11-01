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
    
    // Auch auf Netlify-Domains laden für Tests
    const isNetlifyDomain = window.location.hostname.includes('netlify.app');
    
    if (isLocalhost) {
      console.log('ZOHO SalesIQ skipped on localhost - will load on production domain');
      return;
    }

    console.log('ZOHO SalesIQ loading on domain:', window.location.hostname, 'isNetlify:', isNetlifyDomain);

    // Globaler Flag um mehrfaches Laden zu verhindern
    if (window.zohoSalesIQLoaded) {
      console.log('ZOHO Sales IQ already loaded globally');
      return;
    }

    // Warten bis das DOM vollständig geladen ist
    const loadSalesIQ = () => {
      // Prüfen ob das Script bereits geladen ist
      if (document.getElementById('zsiqscript') || window.$zoho?.salesiq) {
        console.log('ZOHO Sales IQ already loaded');
        return;
      }

      // Globalen Flag setzen
      window.zohoSalesIQLoaded = true;

      console.log('Loading ZOHO Sales IQ widget...');

      // ZOHO Sales IQ Konfiguration
      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { 
        ready: function() {
          console.log('ZOHO Sales IQ widget ready');
          
          // Widget-Konfiguration
          try {
            if (window.$zoho?.salesiq?.widget) {
              // Widget-Einstellungen
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
          
          // Widget explizit anzeigen
          setTimeout(() => {
            try {
              if (window.$zoho?.salesiq?.show) {
                window.$zoho.salesiq.show();
                console.log('ZOHO Sales IQ widget shown');
              }
              
              // Zusätzlicher Fallback
              if (window.$zoho?.salesiq?.widget?.show) {
                window.$zoho.salesiq.widget.show();
                console.log('ZOHO Sales IQ widget shown via widget API');
              }
            } catch (error) {
              console.log('ZOHO Sales IQ widget show error:', error);
            }
          }, 2000);
        }
      };

      // Erstes Script (Initialisierung)
      const initScript = document.createElement('script');
      initScript.innerHTML = 'window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}';
      document.head.appendChild(initScript);

      // Hauptscript laden
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
        
        // Fallback: Versuche alternative Widget-URL
        console.log('Trying alternative ZOHO SalesIQ loading method...');
        const fallbackScript = document.createElement('script');
        fallbackScript.id = 'zsiqscript-fallback';
        fallbackScript.innerHTML = `
          window.$zoho = window.$zoho || {};
          window.$zoho.salesiq = window.$zoho.salesiq || {
            ready: function() {
              console.log('ZOHO Sales IQ fallback ready');
              setTimeout(() => {
                try {
                  if (window.$zoho?.salesiq?.show) {
                    window.$zoho.salesiq.show();
                    console.log('ZOHO Sales IQ fallback widget shown');
                  }
                } catch (e) {
                  console.log('ZOHO Sales IQ fallback show error:', e);
                }
              }, 2000);
            }
          };
        `;
        document.head.appendChild(fallbackScript);
      };
      
      // Script zum Head hinzufügen
      document.head.appendChild(script);

      // Fallback: Widget nach 5 Sekunden nochmal versuchen
      setTimeout(() => {
        if (!window.$zoho?.salesiq) {
          console.log('ZOHO Sales IQ fallback loading...');
          // Script nochmal laden falls es fehlgeschlagen ist
          if (!document.getElementById('zsiqscript')) {
            const fallbackScript = document.createElement('script');
            fallbackScript.id = 'zsiqscript';
            fallbackScript.src = 'https://salesiq.zohopublic.eu/widget?wc=siq173575c67f7c85d984f3967818623fb6b9c294d4867f05';
            fallbackScript.defer = true;
            fallbackScript.async = true;
            document.head.appendChild(fallbackScript);
            console.log('ZOHO Sales IQ fallback script loaded');
          }
        } else {
          // Widget ist geladen, aber vielleicht nicht sichtbar
          try {
            if (window.$zoho?.salesiq?.show) {
              window.$zoho.salesiq.show();
              console.log('ZOHO Sales IQ widget shown in fallback');
            }
          } catch (error) {
            console.log('ZOHO Sales IQ fallback show error:', error);
          }
        }
      }, 5000);
    };

    // Widget laden mit Verzögerung
    const timer = setTimeout(loadSalesIQ, 1000);

    // Cleanup-Funktion
    return () => {
      clearTimeout(timer);
      // Scripts entfernen
      const existingScript = document.getElementById('zsiqscript');
      if (existingScript) {
        existingScript.remove();
      }
      // Init-Script entfernen
      const initScripts = document.querySelectorAll('script');
      initScripts.forEach(script => {
        if (script.innerHTML && script.innerHTML.includes('$zoho.salesiq')) {
          script.remove();
        }
      });
      // Globalen Flag zurücksetzen nur wenn alle Komponenten unmounten
      // window.zohoSalesIQLoaded = false; // Nicht zurücksetzen, da andere Seiten das Widget brauchen
    };
  }, []);

  return null; // Diese Komponente rendert nichts sichtbares
};

export default ZohoSalesIQ;
