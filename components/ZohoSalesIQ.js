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
  // WICHTIG: Das Widget wird jetzt direkt in _document.js geladen (wie in homepage.html)
  // Diese Komponente dient nur noch als Placeholder für Seiten, die sie verwenden
  // Das Script lädt synchron im HTML, nicht erst nach React-Rendering
  return null;
};

export default ZohoSalesIQ;
