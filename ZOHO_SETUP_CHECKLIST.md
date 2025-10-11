# ✅ ZOHO DESK SETUP - SCHNELLCHECKLISTE

## **🎯 PRIORITÄT 1: SOFORT BENÖTIGT**

### **✅ 1. CUSTOM FIELDS ERSTELLEN (118+ Felder)**
```
Zoho Desk → Setup → Tickets → Custom Fields → Create Field

🔴 PRIORITÄT 1: KRITISCHE FELDER (27 Felder)
- Alle Basis-Funnel-Felder (10 Felder)
- Alle Standort-Felder (4 Felder)  
- Alle Kontakt-Felder (8 Felder)
- Alle rechtlichen Felder (5 Felder)

🟡 PRIORITÄT 2: FUNNEL-SPEZIFISCHE FELDER (34 Felder)
- Kalkulator-Funnel (5 Felder)
- Planer-Funnel (14 Felder)
- Express-Angebot-Funnel (9 Felder)
- Genehmigungscheck-Funnel (6 Felder)

🟢 PRIORITÄT 3: ERWEITERTE FELDER (57+ Felder)
- Gewerbe-Funnel (17 Felder)
- Bauzeit-Planung-Funnel (5 Felder)
- Partner-werden-Funnel (35+ Felder)

📋 VOLLSTÄNDIGE LISTE: ZOHO_COMPLETE_CUSTOM_FIELDS.md
```

### **✅ 2. DEPARTMENTS EINRICHTEN (8 Departments)**
```
Zoho Desk → Setup → Departments → Create Department

- Gewerbe
- Kalkulator  
- Planer
- Express
- Genehmigung
- Bauzeit
- Partner
- Default
```

### **✅ 3. ASSIGNEES EINRICHTEN (9 Agents)**
```
Zoho Desk → Setup → Agents → Create Agent

- Senior Team (für P1/P2 Leads)
- Gewerbe Team
- Kalkulator Team
- Planer Team
- Express Team
- Genehmigung Team
- Bauzeit Team
- Partner Team
- Default Team
```

---

## **🔑 PRIORITÄT 2: API SETUP**

### **✅ 4. ZOHO CLIENT ERSTELLEN**
```
1. api-console.zoho.com → Add Client
2. Server-based Application
3. Scopes: ZohoDesk.tickets.ALL, ZohoCRM.modules.ALL
4. Client ID & Secret notieren
```

### **✅ 5. ACCESS TOKEN GENERIEREN**
```
1. Authorization URL aufrufen
2. Code erhalten
3. Token generieren
4. Access Token & Refresh Token notieren
```

### **✅ 6. ORGANIZATION ID FINDEN**
```
API Call: GET /organizations
Organization ID notieren
```

---

## **⚙️ PRIORITÄT 3: NETLIFY KONFIGURATION**

### **✅ 7. ENVIRONMENT VARIABLES SETZEN**
```
Netlify → Site Settings → Environment Variables

ZOHO_ACCESS_TOKEN=...
ZOHO_REFRESH_TOKEN=...
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_ORGANIZATION_ID=...
ZOHO_DEPT_GEWERBE=...
ZOHO_ASSIGNEE_SENIOR=...
(alle 20+ Variablen)
```

---

## **🧪 PRIORITÄT 4: TESTEN**

### **✅ 8. INTEGRATION TESTEN**
```
1. /test-zoho-integration aufrufen
2. "Zoho Verbindung testen" klicken
3. "Gewerbe-Daten senden" klicken
4. Zoho Desk prüfen → Ticket sollte erstellt sein
```

---

## **📊 DROPDOWN-OPTIONEN FÜR CUSTOM FIELDS**

### **Funnel_Typ:**
```
- gewerbe
- kalkulator
- planer
- express-angebot
- genehmigung
- bauzeit-planung
- partner-werden
- partner
```

### **Lead_Kategorie:**
```
- cold
- warm
- hot
```

### **Prioritaet:**
```
- P1
- P2
- P3
- P4
```

### **Dringlichkeit:**
```
- low
- medium
- high
```

### **Gebaeudetyp:**
```
- Mehrfamilienhaus
- Bauträger-Projekt
- Wohnbaugesellschaft
- Investor-Projekt
- Andere
```

### **Budget_Range:**
```
- < 50.000 €
- 50.000 - 100.000 €
- 100.000 - 250.000 €
- 250.000 - 500.000 €
- 500.000 - 1 Mio. €
- > 1 Mio. €
- Steht noch nicht fest
```

### **Zeitrahmen_Range:**
```
- 2024-2025
- 2025-2026
- 2026-2027
- 2027-2028
- Steht noch nicht fest
```

---

## **⏱️ ZEITAUFWAND SCHÄTZUNG**

| **Phase** | **Zeitaufwand** | **Priorität** |
|-----------|----------------|---------------|
| Custom Fields (118+ Felder) | 9-12 Stunden | 🔴 Kritisch |
| Departments | 30 Minuten | 🔴 Kritisch |
| Assignees | 45 Minuten | 🔴 Kritisch |
| API Setup | 1-2 Stunden | 🟡 Wichtig |
| Netlify Config | 30 Minuten | 🟡 Wichtig |
| Testing | 1 Stunde | 🟢 Nice-to-have |

**Gesamt: 12-16 Stunden**

---

## **🚨 HÄUFIGE FEHLER VERMEIDEN**

### **❌ FEHLER:**
- Custom Field Namen nicht exakt
- Leerzeichen in Feldnamen
- Falsche Dropdown-Optionen
- Fehlende Environment Variables
- Falsche Organization ID

### **✅ RICHTIG:**
- Feldnamen exakt aus Liste kopieren
- Keine Leerzeichen verwenden
- Dropdown-Optionen exakt übernehmen
- Alle Environment Variables setzen
- Organization ID korrekt ermitteln

---

## **📞 HILFE BEI PROBLEMEN**

### **🔍 DEBUGGING:**
1. Browser-Konsole öffnen (F12)
2. `/test-zoho-integration` verwenden
3. Netlify-Logs prüfen
4. Zoho-API-Status prüfen

### **📋 CHECKLISTE BEI FEHLERN:**
- [ ] Alle Custom Fields erstellt?
- [ ] Feldnamen exakt?
- [ ] Departments erstellt?
- [ ] Assignees erstellt?
- [ ] API-Token gültig?
- [ ] Environment Variables gesetzt?
- [ ] Organization ID korrekt?

---

**🎯 Nach Abschluss dieser Checkliste ist Ihre Zoho Desk Integration vollständig einsatzbereit!**
